import { useFieldArray, useForm } from 'vee-validate';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { defineComponent, watch, watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { createUpdateProductAction } from '@/modules/products/actions';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Este campo es super requerido')
    .min(3, 'Debe tener al menos 3 caracteres'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      data: product,
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdatedSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      // initialValues: product.value,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');
    // const [sizes, sizesAttrs] = defineField('sizes');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');
    const imageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit((values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };

      mutate(formValues);
    });

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFileChanged = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const fileList = fileInput.files as FileList;

      if (!fileList) return;
      if (fileList.length === 0) return;

      for (const imageFile of fileList) {
        imageFiles.value.push(imageFile);
      }
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
        return;
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(isUpdatedSuccess, (value) => {
      if (!value) return;

      toast.success('Producto actualizado correctamente');

      router.replace(`/admin/products/${updatedProduct.value!.id}`);

      resetForm({
        values: updatedProduct.value,
      });

      imageFiles.value = [];
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
    );

    return {
      // prpierties
      values,
      errors,
      meta,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      sizes,
      images,
      imageFiles,

      isPending,

      // getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      // methods
      onSubmit,
      toggleSize,
      onFileChanged,

      hasSize: (size: string) => sizes.value.map((s) => s.value).includes(size),
      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      },
    };
  },
});

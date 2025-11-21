import { useCreateProduct } from "@/hooks/queries/products/useCreateProduct";
import { useDeleteProduct } from "@/hooks/queries/products/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/queries/products/useUpdateProduct";
import { ICategory } from "@/shared/types/category.interface";
import { IColor } from "@/shared/types/color.interface";
import { IProduct, IProductInput } from "@/shared/types/product.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../Store.module.scss";
import { Heading } from "@/components/ui/heading";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload/ImageUpload";

interface ProductFormProps {
  product?: IProduct | null;
  categories: ICategory[];
  colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct();
  const { updateProduct, isLoadingUpdate } = useUpdateProduct();
  const { deleteProduct, isLoadingDelete } = useDeleteProduct();

  const title = product ? "Edit Product" : "Create Product";
  const description = product ? "Edit product's fields." : "Add a new product.";
  const action = product ? "Save Changes" : "Create Product";

  const form = useForm<IProductInput>({
    mode: "onChange",
    values: product
      ? {
          title: product.title || "",
          description: product.description || "",
          images: product.images || [],
          price: product.price || 0,
          categoryId: product.category?.id || categories[0]?.id || "",
          colorId: product.color?.id || colors[0]?.id || "",
        }
      : {
          title: "",
          description: "",
          images: [],
          price: 0,
          categoryId: categories[0]?.id || "",
          colorId: colors[0]?.id || "",
        },
  });

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    data.price = Number(data.price);
    console.log("Form data:", data);

    if (product) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button
              size="icon"
              variant="destructive"
              disabled={isLoadingDelete}
            >
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="images"
            rules={{
              required: "Upload at least one image",
            }}
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    isDisabled={isLoadingCreate || isLoadingUpdate}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <FormItem data-field="title">
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              rules={{
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              }}
              render={({ field }) => (
                <FormItem data-field="price">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              rules={{
                required: "Category is required",
              }}
              render={({ field }) => (
                <FormItem data-field="category">
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              rules={{
                required: "Color is required",
              }}
              render={({ field }) => (
                <FormItem data-field="color">
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            }}
            render={({ field }) => (
              <FormItem data-field="description">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description..."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

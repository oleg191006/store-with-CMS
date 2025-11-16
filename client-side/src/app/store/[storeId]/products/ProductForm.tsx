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

interface ProductFormProps {
  product: IProduct | null;
  categories: ICategory[];
  colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct();
  const { updateProduct, isLoadingUpdate } = useUpdateProduct();
  const { deleteProduct, isLoadingDelete } = useDeleteProduct();

  const title = product ? "Edit Product" : "Create Product";
  const description = product ? "Edit product's fields." : "Add a new product.";
  const action = product ? "Save" : "Create";

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

    if (product) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button size="icon" variant="primary" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Images Upload */}
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "Title is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    disabled={isLoadingCreate || isLoadingUpdate}
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
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Price"
                    disabled={isLoadingCreate || isLoadingUpdate}
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
              <FormItem>
                <FormLabel>Price</FormLabel>
                <Select
                  disabled={isLoadingCreate || isLoadingUpdate}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Product category" />
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
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  disabled={isLoadingCreate || isLoadingUpdate}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Product color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.value}>
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
          <FormField
            control={form.control}
            name="description"
            rules={{
              required: "Description is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Store Description"
                    disabled={isLoadingUpdate}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="primary"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

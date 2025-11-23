import { ICategory, ICategoryInput } from "@/shared/types/category.interface";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/hooks/queries/categories/useCreateCategory";
import { useDeleteCategory } from "@/hooks/queries/categories/useDeleteCategory";
import { useUpdateCategory } from "@/hooks/queries/categories/useUpdateCategory";

interface ProductFormProps {
  category?: ICategory | null;
}

export function CategoryForm({ category }: ProductFormProps) {
  const { createCategory, isLoadingCreate } = useCreateCategory();
  const { updateCategory, isLoadingUpdate } = useUpdateCategory();
  const { deleteCategory, isLoadingDelete } = useDeleteCategory();

  const title = category ? "Edit Category" : "Create Category";
  const description = category
    ? "Edit category's fields."
    : "Add a new category.";
  const action = category ? "Save Changes" : "Create Category";

  const form = useForm<ICategoryInput>({
    mode: "onChange",
    values: category
      ? {
          title: category.title || "",
          description: category.description || "",
        }
      : {
          title: "",
          description: "",
        },
  });

  const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
    if (category) {
      updateCategory(data);
    } else {
      createCategory(data);
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => deleteCategory()}>
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
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <FormItem data-field="title">
                  <FormLabel>Category Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
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
            }}
            render={({ field }) => (
              <FormItem data-field="description">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter category description..."
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

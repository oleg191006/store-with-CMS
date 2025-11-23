import { IColor, IColorInput } from "@/shared/types/color.interface";
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
import { useCreateColor } from "@/hooks/queries/colors/useCreateColor";
import { useUpdateColor } from "@/hooks/queries/colors/useUpdateColor";
import { useDeleteColor } from "@/hooks/queries/colors/useDeleteColor";

interface ColorFormProps {
  color?: IColor | null;
}

export function ColorForm({ color }: ColorFormProps) {
  const { createColor, isLoadingCreate } = useCreateColor();
  const { updateColor, isLoadingUpdate } = useUpdateColor();
  const { deleteColor, isLoadingDelete } = useDeleteColor();

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit color's fields." : "Add a new color.";
  const action = color ? "Save Changes" : "Create color";

  const form = useForm<IColorInput>({
    mode: "onChange",
    values: {
      name: color?.name || "",
      value: color?.value || "",
    },
  });

  const onSubmit: SubmitHandler<IColorInput> = (data) => {
    if (color) {
      updateColor(data);
    } else {
      createColor(data);
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {color && (
          <ConfirmModal handleClick={() => deleteColor()}>
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
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field }) => (
                <FormItem data-field="title">
                  <FormLabel>Color Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter color name"
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
              name="value"
              rules={{
                required: "Value is required",
              }}
              render={({ field }) => (
                <FormItem data-field="price">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="#FFFFFF"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useDeleteStore } from "@/hooks/queries/stores/useDeleteStore";
import { useUpdateStore } from "@/hooks/queries/stores/useUpdateStore";
import { IStoreEdit } from "@/shared/types/store.interface";
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

export function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore();
  const { deleteStore, isLoadingDelete } = useDeleteStore();
  console.log("store in settings", store);

  const form = useForm<IStoreEdit>({
    mode: "onChange",
    values: {
      title: store?.title || "",
      description: store?.description || "",
    },
  });

  const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
    updateStore(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading
          title="Store Settings"
          description="Store settings management"
        />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button size="icon" variant="primary" disabled={isLoadingDelete}>
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Name is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Store Name"
                      disabled={isLoadingUpdate}
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
          <Button variant="primary" disabled={isLoadingUpdate}>
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

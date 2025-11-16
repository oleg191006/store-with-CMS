import { useCreateStore } from "@/hooks/queries/stores/useCreateStore";
import { IStoreCreate } from "@/shared/types/store.interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";

export function CreateStoreModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { createStore, isLoadingCreate } = useCreateStore();

  const form = useForm<IStoreCreate>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
    createStore(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
          <DialogDescription>
            For creating a new store, please provide the store name and other
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Store name is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Store Name"
                      disabled={isLoadingCreate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end ">
              <Button variant="primary" disabled={isLoadingCreate}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

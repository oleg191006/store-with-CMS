import { useCreateReview } from "@/hooks/queries/reviews/useCreateReview";
import { IReviewInput } from "@/shared/types/review.interface";
import { FC, PropsWithChildren, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Form, FormControl, FormField, FormItem } from "../form";
import { Rating } from "react-simple-star-rating";
import { Textarea } from "../textarea";
import { Button } from "../button";

interface IReviewModalProps {
  storeId: string;
}

export const ReviewModal: FC<PropsWithChildren<IReviewModalProps>> = ({
  children,
  storeId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IReviewInput>({
    mode: "onChange",
  });

  const { createReview, isLoadingCreate } = useCreateReview(storeId);

  const onSubmit: SubmitHandler<IReviewInput> = (data) => {
    form.reset();
    createReview(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create review</DialogTitle>
          <DialogDescription>
            For creating a review, please fill out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              rules={{
                required: "Rating is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Rating
                      onClick={field.onChange}
                      initialValue={field.value}
                      SVGstyle={{
                        display: "inline-block",
                      }}
                      size={20}
                      transition
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              rules={{
                required: "Text is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your review here..."
                      disabled={isLoadingCreate}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="primary" disabled={isLoadingCreate}>
                Submit Review
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

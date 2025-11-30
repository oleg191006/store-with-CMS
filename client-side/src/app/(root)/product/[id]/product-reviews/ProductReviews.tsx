import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/ui/modals/ReviewModal";
import { useDeleteReview } from "@/hooks/queries/reviews/useDeleteReview";
import { useProfile } from "@/hooks/useProfile";
import { IProduct } from "@/shared/types/product.interface";
import { Plus, Trash, User } from "lucide-react";
import styles from "./ProductReviews.module.scss";
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

interface ProductReviewsProps {
  product: IProduct;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { user } = useProfile();
  const { deleteReview } = useDeleteReview();

  return (
    <>
      <div className={styles.header}>
        <h1>Reviews</h1>
        {user && (
          <ReviewModal storeId={product.storeId}>
            <Button variant="ghost">
              <Plus />
              Add Review
            </Button>
          </ReviewModal>
        )}
      </div>
      <div className={styles.reviews}>
        {product.reviews.length ? (
          product.reviews.map((review) => (
            <div className={styles.review} key={review.id}>
              <div className={styles.header}>
                <div className={styles.user}>
                  <ReviewAvatar
                    picture={review.user.picture}
                    name={review.user.name}
                  />
                  <span>{review.user.name}</span>
                </div>
                {review.user.id === user?.id && (
                  <ConfirmModal handleClick={() => deleteReview(review.id)}>
                    <button className={styles.delete}>
                      <Trash />
                    </button>
                  </ConfirmModal>
                )}
              </div>
              <Rating
                readonly
                initialValue={review.rating}
                SVGstyle={{
                  display: "inline-block",
                }}
                size={18}
                allowFraction
                transition
              />
              <div className={styles.text}>{review.text}</div>
            </div>
          ))
        ) : (
          <div className={styles.not_found}>No reviews yet.</div>
        )}
      </div>
    </>
  );
}

function ReviewAvatar({ picture, name }: { picture: string; name: string }) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = picture?.trim();
  const shouldShowImage = imageUrl && !imageError;

  if (!shouldShowImage) {
    return (
      <div className={styles.avatarPlaceholder}>
        <User size={20} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      width={40}
      height={40}
      onError={() => setImageError(true)}
    />
  );
}

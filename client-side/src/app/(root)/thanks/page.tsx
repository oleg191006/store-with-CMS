import { Button } from "@/components/ui/button";
import styles from "../hero/Hero.module.scss";
import { PUBLIC_URL } from "@/config/url.config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ThanksPage() {
  return (
    <div className={styles.section}>
      <h1 className={styles.heading}>Thank you for your purchase!</h1>
      <p className={styles.description}>
        We sincerely appreciate your trust in{" "}
        <span className="font-semibold text-gray-900">Vendens</span>. We are
        already working on your order and will do our best to deliver it to you
        as soon as possible.
      </p>
      <Link href={PUBLIC_URL.home()}>
        <Button variant="primary">
          Back to Home <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}

import { SITE_DESCRIPTION } from "@/constants/seo.constants";
import Link from "next/link";
import { PUBLIC_URL } from "@/config/url.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <div className={styles.section}>
      <div className={styles.badge}>
        <Sparkles className="mr-2 size-4 text-primary" />
        <span>New E-commerce Experience</span>
      </div>

      <h1 className={styles.heading}>
        Empower Your Business with{" "}
        <span className={styles.brandName}>Vendens</span>
        <br />
        <span className={styles.subHeading}>
          Seamless Solutions Tailored for You
        </span>
      </h1>

      <p className={styles.description}>{SITE_DESCRIPTION}</p>

      <div className={styles.actions}>
        <Link href={PUBLIC_URL.explorer()}>
          <Button variant="primary" size="lg" className="font-semibold">
            Explore Stores <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

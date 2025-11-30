"use client";

import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/config/api.config";
import { FcGoogle } from "react-icons/fc";

export function Social() {
  return (
    <div className={styles.social}>
      <Button
        variant="outline"
        onClick={() => {
          window.location.href = `${SERVER_URL}/auth/google`;
        }}
      >
        <FcGoogle />
        Continue with Google
      </Button>
    </div>
  );
}

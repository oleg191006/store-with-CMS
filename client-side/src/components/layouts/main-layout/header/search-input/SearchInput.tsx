"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SearchInput.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PUBLIC_URL } from "@/config/url.config";
import { Search } from "lucide-react";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();

  return (
    <div className={styles.form}>
      <Input
        placeholder="Search product"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <Button
        variant="primary"
        onClick={() =>
          router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
        }
      >
        <Search />
      </Button>
    </div>
  );
}

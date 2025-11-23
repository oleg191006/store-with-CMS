"use client";
import { useProfile } from "@/hooks/useProfile";
import styles from "./HeaderMenu.module.scss";
import { HeaderCart } from "../header-cart/HeaderCart";
import Link from "next/link";
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from "@/config/url.config";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { LogOut } from "lucide-react";
import { CreateStoreModal } from "@/components/ui/modals/CreateStoreModal";
import Image from "next/image";

export function HeaderMenu() {
  const { user, isLoading } = useProfile();

  return (
    <div className={styles.header_menu}>
      <HeaderCart />
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Catalog</Button>
      </Link>
      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Favorites</Button>
          </Link>
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="primary">My stores</Button>
            </Link>
          ) : (
            <CreateStoreModal>
              <Button variant="primary">Create Store</Button>
            </CreateStoreModal>
          )}
          <Link href={DASHBOARD_URL.home()}>
            <Image
              src={user.picture.trimEnd() || "/images/default-avatar.jpg"}
              alt={user.name}
              width={42}
              height={42}
              className={styles.avatar}
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant="primary">
            Sign In
            <LogOut className={styles.icon} />
          </Button>
        </Link>
      )}
    </div>
  );
}

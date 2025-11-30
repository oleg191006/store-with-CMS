"use client";

import { useProfile } from "@/hooks/useProfile";
import { saveTokenStorage } from "@/services/auth/auth-token.service";
import { authService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IOrderColumn, orderColumns } from "./OrderColumns";
import { formatDate } from "@/lib/format-date";
import { EnumOrderStatus } from "@/shared/types/order.interface";
import { formatPrice } from "@/utils/string/format-price";
import styles from "./Dashboard.module.scss";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { DataTable } from "@/components/ui/tables/DataTable";

export function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      saveTokenStorage(accessToken);
    }
  }, [searchParams]);

  const { user } = useProfile();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Використовуємо window.location для надійного редіректу після видалення cookies
      setTimeout(() => {
        window.location.href = "/auth";
      }, 100);
    },
  });

  if (!user) {
    return null;
  }

  const formattedOrders: IOrderColumn[] = user.orders.map((order) => ({
    createdAt: formatDate(order.createdAt),
    status: order.status === EnumOrderStatus.PENDING ? "Pending" : "Paid",
    total: formatPrice(order.total),
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Your orders</h1>
        <Button variant="ghost" onClick={() => logout()}>
          <LogOut />
          Sign Out
        </Button>
      </div>
      <DataTable columns={orderColumns} data={formattedOrders} />
    </div>
  );
}

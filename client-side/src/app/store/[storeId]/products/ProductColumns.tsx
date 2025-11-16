import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PUBLIC_URL, STORE_URL } from "@/config/url.config";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ExternalLink,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export interface IProductColumn {
  id: string;
  title: string;
  price: string;
  category: string;
  color: string;
  storeId: string;
}

export const productColumns: ColumnDef<IProductColumn>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-3">
        {row.original.color}
        <div
          className="border rounded-full size-5"
          style={{
            backgroundColor: row.original.color,
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={PUBLIC_URL.product(row.original.id)} target="_blank">
            <DropdownMenuItem>
              <ExternalLink className="mr-2 size-4" />
              Page with product
            </DropdownMenuItem>
          </Link>
          <Link
            href={STORE_URL.productEdit(row.original.storeId, row.original.id)}
            target="_blank"
          >
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" />
              Edit Product
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

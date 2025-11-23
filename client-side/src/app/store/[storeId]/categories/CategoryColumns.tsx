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

export interface ICategoryColumn {
  id: string;
  createdAt: string;
  title: string;
  storeId: string;
}

export const categoryColumns: ColumnDef<ICategoryColumn>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
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
          <Link href={PUBLIC_URL.category(row.original.id)} target="_blank">
            <DropdownMenuItem>
              <ExternalLink className="mr-2 size-4" />
              Page with category
            </DropdownMenuItem>
          </Link>
          <Link
            href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
            target="_blank"
          >
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" />
              Edit Category
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

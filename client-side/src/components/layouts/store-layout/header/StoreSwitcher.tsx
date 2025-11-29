"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CreateStoreModal } from "@/components/ui/modals/CreateStoreModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { STORE_URL } from "@/config/url.config";
import { IStore } from "@/shared/types/store.interface";
import { Check, ChevronsUpDown, Plus, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface StoreSwitcherProps {
  items: IStore[];
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentStoreId = params?.storeId as string;

  const currentStore = useMemo(
    () => items.find((store) => store.id === currentStoreId),
    [items, currentStoreId]
  );

  const onStoreSelect = (storeId: string) => {
    setIsOpen(false);
    router.push(STORE_URL.home(storeId));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className="justify-between w-52"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <StoreIcon className="size-4 shrink-0" />
            <span className="truncate">
              {currentStore?.title || "Select store"}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-52">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {items.map((store) => (
                <CommandItem
                  key={store.id}
                  className="text-sm cursor-pointer"
                  onSelect={() => onStoreSelect(store.id)}
                >
                  <StoreIcon className="mr-2 size-4" />
                  <span className="flex-1 truncate">{store.title}</span>
                  {currentStore?.id === store.id && (
                    <Check className="ml-auto size-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CreateStoreModal>
                <CommandItem className="cursor-pointer">
                  <Plus className="mr-2 size-4" />
                  Create New Store
                </CommandItem>
              </CreateStoreModal>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

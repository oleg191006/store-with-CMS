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
import { ChevronsUpDown, Plus, StoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StoreSwitcherProps {
  items: IStore[];
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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
          className="w-52"
        >
          <StoreIcon className="mr-2 size-4" />
          Current Store
          <ChevronsUpDown className="ml-auto opacity-50 size-4 shrink-50" />
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
                  className="text-sm"
                  onSelect={() => onStoreSelect(store.id)}
                >
                  <StoreIcon className="mr-2 size-4" />
                  <div className="line-clamp-1">{store.title}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CreateStoreModal>
                <CommandItem>
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

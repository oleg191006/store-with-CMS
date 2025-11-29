import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function HeaderCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Cart</Button>
      </SheetTrigger>
      <SheetTitle></SheetTitle>
      <SheetContent>
        <Heading
          title="Shopping Cart"
          description="Your selected items"
          className="text-xl"
        />
      </SheetContent>
    </Sheet>
  );
}

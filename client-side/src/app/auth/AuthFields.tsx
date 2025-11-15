import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validEmail } from "@/shared/regex";
import { IAuthForm } from "@/shared/types/auth.interface";
import { UseFormReturn } from "react-hook-form";

interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm, undefined>;
  isPending: boolean;
  isReg?: boolean;
}

export function AuthFields({
  form,
  isPending,
  isReg = false,
}: AuthFieldsProps) {
  return (
    <>
      {isReg && (
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="John" disabled={isPending} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: validEmail,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="john@example.com"
                type="email"
                disabled={isPending}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="******"
                type="password"
                disabled={isPending}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

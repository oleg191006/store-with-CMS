"use client";

import { useState } from "react";
import { useAuthForm } from "./useAuthForm";
import styles from "./Auth.module.scss";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthFields } from "./AuthFields";
import { Social } from "./Social";

export function Auth() {
  const [isReg, setIsReg] = useState(false);
  const { onSubmit, form, isPending } = useAuthForm(isReg);
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image
          src="/images/auth.svg"
          alt="Vendly shop"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>
              {isReg ? "Create an account" : "Log in to your account"}
            </CardTitle>
            <CardDescription>
              Log in or create an account to access exclusive features
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Auth fields */}
                <AuthFields form={form} isPending={isPending} isReg={isReg} />
                <Button disabled={isPending} >Continue</Button>
              </form>
            </Form>
            <Social />
          </CardContent>
          <CardFooter className={styles.footer}>
            {isReg ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => setIsReg(!isReg)}>
              {isReg ? "Log in" : "Sign up"}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

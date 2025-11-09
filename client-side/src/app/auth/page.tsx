import { Metadata } from "next";
import { Auth } from "./Auth";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthPage() {
  return <Auth />;
}

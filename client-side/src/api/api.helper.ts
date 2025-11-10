import { AxiosError } from "axios";
export const getContentType = () => ({
  "Content-Type": "application/json",
});

export const errorCatch = (error: unknown): string => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message?: string | string[] }>;
    const message = axiosError.response?.data?.message;
    if (Array.isArray(message)) return message[0];
    if (typeof message === "string") return message;
  }
  if (error instanceof Error) return error.message;
  return "Unknown error";
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function csx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
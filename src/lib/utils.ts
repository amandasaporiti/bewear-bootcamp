import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCentsToBRL(value: number) {
  return new Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  }).format(value)
}

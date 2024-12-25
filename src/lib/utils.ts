import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export { cn, axiosInstance };

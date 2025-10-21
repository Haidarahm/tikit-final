import axios from "axios";

// Normalize base URL from Vite env to avoid trailing slashes and index.php suffixes
const resolveBaseUrl = (): string => {
  const raw: string = ((import.meta as any).env?.VITE_BASE_URL as string) || "";
  if (!raw) return "";

  // Remove a trailing `/index.php` (with or without trailing slash)
  const withoutIndexPhp = raw.replace(/\/index\.php\/?$/i, "");
  // Trim trailing slashes
  const trimmed = withoutIndexPhp.replace(/\/+$/g, "");
  return trimmed;
};

export const BASE_URL: string = resolveBaseUrl();

// Preconfigured Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});



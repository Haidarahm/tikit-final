import axios from "axios";

// Normalize base URL from Vite env to avoid trailing slashes and index.php suffixes
const resolveBaseUrl = () => {
  const raw = import.meta.env?.VITE_BASE_URL || "";
  if (!raw) return "";

  // Remove a trailing `/index.php` (with or without trailing slash)
  const withoutIndexPhp = raw.replace(/\/index\.php\/?$/i, "");
  // Trim trailing slashes
  const trimmed = withoutIndexPhp.replace(/\/+$/g, "");
  return trimmed;
};

export const BASE_URL = resolveBaseUrl();

// Preconfigured Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

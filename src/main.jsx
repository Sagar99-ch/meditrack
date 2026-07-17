import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
console.log("Convex URL:", import.meta.env.VITE_CONVEX_URL);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
      <Toaster richColors position="top-right" />
    </ConvexProvider>
  </StrictMode>
);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload critical images immediately on app start
import fractionlIcon from "@/assets/fractionl-icon.png";
import fractionlLogo from "@/assets/fractionl-logo.png";

const preloadImages = [fractionlIcon, fractionlLogo];
preloadImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);

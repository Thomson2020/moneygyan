import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize default theme state on load if stored in local storage
const urlTheme = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("theme") : null;
const savedTheme = urlTheme || localStorage.getItem("theme") || "dark";
document.documentElement.classList.toggle("light", savedTheme === "light");
document.documentElement.setAttribute("data-theme", savedTheme);
if (document.body) {
  document.body.setAttribute("data-theme", savedTheme);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
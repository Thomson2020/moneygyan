import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly snaps the window viewport back to the absolute top coordinates
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every single time the route path switches

  return null;
}
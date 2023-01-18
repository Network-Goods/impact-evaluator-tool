import { RefObject, useEffect } from "react";

type ClickEvent = MouseEvent | TouchEvent;

export const useClickOutside = (
  ref: RefObject<HTMLInputElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (e: ClickEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref?.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [handler, ref]);
};

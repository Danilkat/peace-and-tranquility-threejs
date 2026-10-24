import { useEffect, useState } from "react";
type Size = {
  width: number;
  height: number;
};

export function useResizeObserver<T extends HTMLElement>(element: T | null) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return { ...size };
}

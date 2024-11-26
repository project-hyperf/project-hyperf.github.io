import { useEffect, useState } from "react";

export const useWindow = () => {
  const [rect, setRect] = useState<{
    height: number;
    width: number;
  } | null>(null);
  const [basePathIsInitialized, setBasePathIsInitialized] = useState(false);
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setRect({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const basePath = window?.["basePath" as any] as unknown as
      | string
      | undefined;
    setBasePath(basePath ?? "");
    setBasePathIsInitialized(true);
  }, []);

  return { rect, basePath, basePathIsInitialized };
};

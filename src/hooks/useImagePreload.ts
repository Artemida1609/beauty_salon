import { useEffect, useRef, useState, useCallback } from "react";

interface UseImagePreloadOptions {
  priority?: string[];
  delay?: number;
}

export function useImagePreload(
  images: string[],
  options: UseImagePreloadOptions = {}
) {
  const { priority = [], delay = 0 } = options;
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const loadedRef = useRef(new Set<string>());

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (loadedRef.current.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedRef.current.add(src);
        setLoaded((prev) => new Set(prev).add(src));
        resolve();
      };
      img.onerror = () => {
        loadedRef.current.add(src);
        resolve();
      };
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const preloadAll = async () => {
      // Preload priority images first
      if (priority.length > 0) {
        await Promise.all(priority.map(preloadImage));
        if (isMounted) setReady(true);
      }

      // Wait for delay if specified
      if (delay > 0) {
        await new Promise((r) => setTimeout(r, delay));
      }

      // Preload remaining images
      const remaining = images.filter((img) => !priority.includes(img));
      await Promise.all(remaining.map(preloadImage));
    };

    preloadAll();

    return () => {
      isMounted = false;
    };
  }, [images, priority, delay, preloadImage]);

  return { loaded, ready, preloadImage };
}

// Hook for lazy loading images with intersection observer
export function useLazyImage(
  src: string,
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.1, rootMargin = "50px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return {
    imgRef,
    src: isVisible ? src : undefined,
    isLoaded,
    setIsLoaded,
    isVisible,
  };
}

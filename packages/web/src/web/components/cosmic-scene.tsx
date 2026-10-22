import { useEffect, useRef } from "react";

const TOTAL = 144;

// Adapted from VFSKILL-9937 CosmicScene; original timing and frame order preserved.
export function CosmicScene() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d", { alpha: false });
    if (!element || !ctx) return;
    let alive = true;
    let next = 0;
    let settled = 0;
    let pending = 0;
    let lastFrame = -1;
    let lastWidth = 0;
    let lastHeight = 0;
    const images: (HTMLImageElement | undefined)[] = [];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const folder = window.innerWidth < 768 ? "frames-mobile" : "frames";

    function draw() {
      pending = 0;
      if (!alive || !element || !ctx) return;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = motion.matches ? 0 : Math.max(0, Math.min(1, window.scrollY / Math.max(1, distance)));
      const desired = Math.round(progress * (TOTAL - 1));
      let index = desired;
      if (!images[index]) {
        for (let delta = 1; delta < TOTAL; delta++) {
          if (images[desired - delta]) { index = desired - delta; break; }
          if (images[desired + delta]) { index = desired + delta; break; }
        }
      }
      const image = images[index];
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!image || !width || !height) return;
      if (index === lastFrame && width === lastWidth && height === lastHeight) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(0, 0, width, height);
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
      lastFrame = index;
      lastWidth = width;
      lastHeight = height;
      element.dataset.frame = String(index);
      element.dataset.progress = progress.toFixed(3);
      element.dataset.ready = "true";
    }

    function requestDraw() {
      if (alive && !pending) pending = requestAnimationFrame(draw);
    }

    function loadNext() {
      if (!alive || next >= TOTAL) return;
      const index = next++;
      const image = new Image();
      image.decoding = "async";
      const settle = () => {
        if (!alive) return;
        settled++;
        element!.dataset.loaded = String(settled);
        requestDraw();
        loadNext();
      };
      image.onload = () => {
        if (!alive) return;
        images[index] = image;
        settle();
      };
      image.onerror = () => {
        element!.dataset.loadError = "true";
        settle();
      };
      image.src = `/${folder}/${String(index + 1).padStart(3, "0")}.webp`;
    }

    for (let i = 0; i < 6; i++) loadNext();
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", requestDraw);
    motion.addEventListener("change", requestDraw);
    const observer = new ResizeObserver(requestDraw);
    observer.observe(element);
    requestDraw();
    return () => {
      alive = false;
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", requestDraw);
      motion.removeEventListener("change", requestDraw);
      observer.disconnect();
      images.length = 0;
    };
  }, []);

  return <canvas ref={canvas} className="cosmic-canvas" aria-hidden="true" />;
}
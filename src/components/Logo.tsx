"use client";

import { useEffect, useRef, useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 48 }: LogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const img = new window.Image();
    img.src = "/logo.jpg";
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // The navy background is around #0F2041 (15, 32, 65)
      // We'll remove pixels that are dark and blue-ish
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If it's dark (total brightness < 120) and blue dominant
        // Or if it's within a specific distance from our target navy
        const distance = Math.sqrt(
          Math.pow(r - 15, 2) + 
          Math.pow(g - 32, 2) + 
          Math.pow(b - 65, 2)
        );

        if (distance < 60 || (r < 50 && g < 70 && b < 100)) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL("image/png"));
    };
  }, []);

  if (!dataUrl) {
    // Shimmer or placeholder while processing
    return <div className={`animate-pulse bg-secondary/10 rounded-full ${className}`} style={{ width: size, height: size }} />;
  }

  return (
    <img 
      src={dataUrl} 
      alt="Slice of England" 
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

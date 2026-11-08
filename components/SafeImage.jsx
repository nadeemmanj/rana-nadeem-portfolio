"use client";

import { useEffect, useRef, useState } from "react";

// Image with graceful fallback: tries a plain <img> first (no next/image
// config needed); if the file is missing/broken, renders `fallback` instead.
// Used for /profile.jpg, /about.jpg, /projects/<slug>.jpg placeholders
// until the user adds real photos.
//
// NOTE: onError alone is not enough — if the image 404s BEFORE React
// attaches the handler (first page load), the error is missed and the
// browser shows a broken-image icon. The ref + effect below catches
// that case: an already-failed image has complete=true, naturalWidth=0.
export default function SafeImage({ src, alt, className = "", fallback }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div className={className} role="img" aria-label={alt}>
        {fallback}
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

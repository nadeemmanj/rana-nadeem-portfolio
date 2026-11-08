/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // ✏️ EDIT: Agar site ko apne phone/dusre device se (network IP par) kholo ge
  // to HMR error na aaye is liye apna network IP yahan add karo.
  // Same computer par http://localhost:3000 kholne par is ki zaroorat nahi.
  allowedDevOrigins: ["192.168.0.123"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

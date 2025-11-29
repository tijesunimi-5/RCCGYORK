import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // List the hostnames from which Next.js should allow loading images.
    // The format is an array of strings.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dgpdap1fy/**", // Optionally limit to your specific cloud name path
      },
    ],
    // For older Next.js versions, you might use:
    // domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;

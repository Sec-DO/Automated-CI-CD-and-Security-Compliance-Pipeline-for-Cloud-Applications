import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "t3.ftcdn.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.example.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "media.istockphoto.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;

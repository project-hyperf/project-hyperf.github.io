import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    const svgrQuery = /comp/;

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, svgrQuery],
        }, // exclude if *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: svgrQuery, // *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              replaceAttrValues: {
                "#000": "{props.color ?? 'currentColor'}",
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

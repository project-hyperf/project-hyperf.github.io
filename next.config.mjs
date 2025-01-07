// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: "build",

//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   webpack(config) {
//     // Grab the existing rule that handles SVG imports
//     const fileLoaderRule = config.module.rules.find((rule) =>
//       rule.test?.test?.(".svg"),
//     );

//     const svgrQuery = /comp/;

//     config.module.rules.push(
//       // Reapply the existing rule, but only for svg imports ending in ?url
//       {
//         ...fileLoaderRule,
//         test: /\.svg$/i,
//         resourceQuery: {
//           not: [...fileLoaderRule.resourceQuery.not, svgrQuery],
//         }, // exclude if *.svg?url
//       },
//       // Convert all other *.svg imports to React components
//       {
//         test: /\.svg$/i,
//         issuer: fileLoaderRule.issuer,
//         resourceQuery: svgrQuery, // *.svg?url
//         use: [
//           {
//             loader: "@svgr/webpack",
//             options: {
//               icon: true,
//               replaceAttrValues: {
//                 "#000": "{props.color ?? 'currentColor'}",
//               },
//             },
//           },
//         ],
//       },
//     );

//     // Modify the file loader rule to ignore *.svg, since we have it handled now.
//     fileLoaderRule.exclude = /\.svg$/i;

//     return config;
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  output: "standalone", // Netlify 최적화

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  compress: true, // Gzip 압축 활성화
  poweredByHeader: false, // 보안 및 성능을 위해 헤더 제거

  webpack(config, { isServer }) {
    // 기존 SVG 설정 유지
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    const svgrQuery = /comp/;

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, svgrQuery],
        },
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: svgrQuery,
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

    fileLoaderRule.exclude = /\.svg$/i;

    // 추가 최적화
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;

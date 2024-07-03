const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  stats: { children: true },
  mode: "development",
  output: {
    path: path.join(__dirname, "dist/"),
    clean: true,
  },
  resolve: {
    alias: {
      "@scripts": path.join(__dirname, "src/js"),
      "@styles": path.join(__dirname, "src/css"),
      "@images": path.join(__dirname, "src/images"),
    },
  },

  devtool: "source-map",

  plugins: [
    new HtmlBundlerPlugin({
      entry: [
        {
          import: "./src/views/template.ejs", // template file
          filename: "index.html", // => dist/index.html
          data: {
            title: "Bosco Images Wildlife Photography: Homepage",
          }, // pass variables into template
        },
        {
          import: "./src/views/galleries.ejs",
          filename: "galleries.html",
          data: { title: "Bosco Images Wildlife Photography: Photo Galleries" },
        },
        {
          import: "./src/views/birds-gallery.ejs",
          filename: "birds-gallery.html",
          data: { title: "Bosco Images Wildlife Photography: Birds Gallery" },
        },
        {
          import: "./src/views/insects-gallery.ejs",
          filename: "insects-gallery.html",
          data: {
            title: "Bosco Images Wildlife Photography: Insects Gallery",
          },
        },
        {
          import: "./src/views/small-animals-gallery.ejs",
          filename: "small-animals-gallery.html",
          data: {
            title: "Bosco Images Wildlife Photography: Small Animals Gallery",
          },
        },
        {
          import: "./src/views/about.ejs",
          filename: "about.html",
          data: { title: "About: Bosco Images Wildlife Photography" },
        },
        {
          import: "./src/views/contact.ejs",
          filename: "contact.html",
          data: { title: "Contact: Bosco Images Wildlife Photography" },
        },
      ],
      js: {
        // output filename for JS
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        // output filename for CSS
        filename: "css/[name].[contenthash:8].css",
      },

      preprocessor: "ejs",
      preprocessorOptions: {
        async: false, // defaults 'false'
        // defaults process.cwd(), root path for includes with an absolute path (e.g., /file.html)
        root: path.join(__dirname, "src/views"), // defaults process.cwd()
        // defaults [], an array of paths to use when resolving includes with relative paths
        views: [
          "src/partials", // relative path
          path.join(__dirname, "src/partials"), // absolute path
        ],
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              import: false, // disable @import at-rules handling
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp)$/,
        type: "asset/resource",
        use: {
          loader: "responsive-loader",
          options: {
            // output filename of images, e.g. dist/assets/img/image-640w.png
            name: "./assets/imgs/[name]-[width]w.[ext]",
            sizes: [1400], // max. image size, if 'size' query is not used
          },
        },
      },
      // {
      //   test: /[\\/]images|node_modules[\\/].+(png|jpe?g|webp|ico|svg)$/i,
      //   type: "asset/resource",
      //   generator: {
      //     // keep original directory structure
      //     filename: ({ filename }) => {
      //       const srcPath = "src/assets/imgs";
      //       const regExp = new RegExp(
      //         `[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`
      //       );
      //       const assetPath = path.dirname(
      //         regExp.exec(filename)[1].replace("@", "").replace(/\\/g, "/")
      //       );

      //       return `imgs/${assetPath}/[name].[hash:8][ext]`;
      //     },
      //   },
      // },
    ],
  },

  //enable HMR with live reload
  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },
};

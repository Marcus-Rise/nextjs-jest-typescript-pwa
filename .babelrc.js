module.exports = {
  presets: ["next/babel"],
  plugins: [
    "babel-plugin-parameter-decorator",
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};

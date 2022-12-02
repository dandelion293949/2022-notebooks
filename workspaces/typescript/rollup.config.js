import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/types.ts",
  plugins: [esbuild(), nodeResolve()],
  output: [
    {
      file: "dist/bundle-types.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle-types.es.js",
      format: "es",
    },
  ],
});

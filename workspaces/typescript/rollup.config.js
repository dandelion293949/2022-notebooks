import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/types.ts",
  plugins: [typescript(), nodeResolve()],
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

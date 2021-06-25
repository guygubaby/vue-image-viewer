import { RollupOptions, OutputOptions, Plugin, ModuleFormat } from "rollup";
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const formats: ModuleFormat[] = ["umd", "esm", "cjs"];

const output: OutputOptions[] = formats.map((format) => {
  return {
    file: `dist/index.${format}.js`,
    format,
    name: "vue-image-viewer-mz",
    globals: {
      "vue-demi": "VueDemi",
    },
  };
});

const nodePlugins: Plugin[] = [resolve(), commonjs()];

const input = "src/index.ts";

const configs: RollupOptions[] = [
  {
    input,
    output,
    plugins: [
      ...nodePlugins,
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
    ],
    external: ["vue-demi"],
  },
  {
    input,
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
    external: ["vue-demi"],
  },
];

export default configs;

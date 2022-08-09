import { build } from "esbuild";
import config from "../esconfig.js";

build({
    ...config,
    chunkNames: '/[ext]/[name]-[hash]',
    assetNames: 'assets/[name]-[hash]',
    minify: true,
});

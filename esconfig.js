import htmlPlugin from '@chialab/esbuild-plugin-html'

const devEnv = process.env.NODE_ENV !== 'prod';

const config = {
    entryPoints: ['src/index.html'],
    chunkNames: '/[ext]/[name]',
    assetNames: 'assets/[name]',
    bundle: true,
    sourcemap: devEnv ? true : false,
    minify: devEnv ? false : true,
    outdir: "docs",
    define: {
        "process.env.BASE_NAME": devEnv ? "''" : `"${process.env.npm_package_name}/"`,
    },
    loader: {
        '.png': 'dataurl',
        '.woff': 'file',
    },
    plugins: [
        htmlPlugin({})
    ],
}

export default config

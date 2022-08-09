import { serve } from "esbuild";
import http from 'http';
import config from "../esconfig.js";

serve({
    servedir: 'docs',
}, config)
    .then(result => {
        const { host, port } = result;

        const server = http.createServer((req, res) => {
            const options = {
                hostname: host,
                port: port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            }
            const re = new RegExp('\/(js|css|assets)\/')
            if (req.url === '/' || !re.test(req.url)) {
                options.path = '/assets/index.html'
            }

            // хак, тк html плагин не поддерживает абсолютные пути
            if (re.test(req.url)) {
                const { index } = re.exec(req.url)
                const path = req.url.slice(index)
                options.path = path
            }

            const proxyReq = http.request(options, proxyRes => {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            })

            req.pipe(proxyReq, { end: true })
        })

        server.listen(3000)
        console.log(
            "esbuild serve static: http://localhost:8000"
        )
    });


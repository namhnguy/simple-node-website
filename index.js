const http = require('http')
const fs = require('fs')
const url = require('url')

function createServer() {
    const port = process.env.PORT || 8080

    const server = http.createServer((req, res) => {
        let q = url.parse(req.url, true);
        let filename = '';
        if (q.pathname === '/') {
            filename = './index.html'
        }
        else if (q.pathname === '/about') {
            filename = './about.html'
        }
        else if (q.pathname === '/contact-me') {
            filename = './contact-me.html'
        }
        else {
            filename = './404.html';
        }
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                return res.end('404 Not Found');
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            return res.end();
        })
    })
    server.listen(port, () => {
        console.log(`Server running at port ${port}`)
    })
}

createServer();



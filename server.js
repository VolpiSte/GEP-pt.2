const { createServer } = require('http');
const { readFile } = require('fs');
const { resolve } = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    // Set the content type based on the file extension
    const contentType = {
        'html': 'text/html',
        'js': 'text/javascript',
        'css': 'text/css',
        // Add more content types if necessary
    };

    // Get the path of the requested file
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = resolve(__dirname, '.' + filePath);

    // Read the file
    readFile(filePath, (err, data) => {
        if (err) {
            // If file not found, send 404 response
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File not found');
        } else {
            // Determine the content type based on file extension
            const ext = filePath.split('.').pop();
            const contentTypeHeader = contentType[ext] || 'text/plain';
            
            // Set the appropriate content type header
            res.setHeader('Content-Type', contentTypeHeader);
            // Send the file content as response
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Banda Development Server
 * 
 * A simple Bun server for the demo application.
 */

import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

const PORT = 3000;
const SRC_DIR = join(import.meta.dir, '..');

// MIME types
const MIME_TYPES: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.ts': 'application/javascript', // Bun will transpile
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
};

function getMimeType(path: string): string {
    const ext = path.substring(path.lastIndexOf('.'));
    return MIME_TYPES[ext] || 'application/octet-stream';
}

const server = Bun.serve({
    port: PORT,

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);
        let pathname = url.pathname;

        // Serve index.html for root
        if (pathname === '/' || pathname === '/index.html') {
            pathname = '/demo/index.html';
        }

        // Build file path
        const filePath = join(SRC_DIR, pathname);

        // Check if file exists
        if (!existsSync(filePath)) {
            // Try with .ts extension for imports
            const tsPath = filePath + '.ts';
            if (existsSync(tsPath)) {
                // Transpile TypeScript on the fly
                const file = Bun.file(tsPath);
                const transpiler = new Bun.Transpiler({ loader: 'ts' });
                const source = await file.text();
                const code = await transpiler.transform(source);

                return new Response(code, {
                    headers: { 'Content-Type': 'application/javascript' },
                });
            }

            return new Response('Not Found', { status: 404 });
        }

        // Handle TypeScript files
        if (pathname.endsWith('.ts')) {
            const file = Bun.file(filePath);
            const transpiler = new Bun.Transpiler({ loader: 'ts' });
            const source = await file.text();
            const code = await transpiler.transform(source);

            return new Response(code, {
                headers: { 'Content-Type': 'application/javascript' },
            });
        }

        // Serve static files
        const file = Bun.file(filePath);
        const mimeType = getMimeType(pathname);

        return new Response(file, {
            headers: { 'Content-Type': mimeType },
        });
    },
});

console.log(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   🎸 Banda Development Server            ║
  ║                                          ║
  ║   Local:   http://localhost:${PORT}         ║
  ║                                          ║
  ║   Press Ctrl+C to stop                   ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
`);

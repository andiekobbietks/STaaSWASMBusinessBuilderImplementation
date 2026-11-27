import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const localChatApi = (): Plugin => ({
  name: 'staas-local-chat-api',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res, next) => {
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const rawBody = Buffer.concat(chunks).toString('utf8');
        const body = rawBody ? JSON.parse(rawBody) : {};
        const response = {
          status(code: number) {
            res.statusCode = code;
            return response;
          },
          json(payload: unknown) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          },
          setHeader(name: string, value: string) {
            res.setHeader(name, value);
          },
          write(chunk: Buffer) {
            res.write(chunk);
          },
          end() {
            res.end();
          },
        };
        const chatModule = await server.ssrLoadModule('/api/chat.ts') as {
          default: (
            request: { method?: string; body?: { messages?: Array<{ role: string; parts?: Array<{ type: string; text?: string }> }> } },
            response: typeof response,
          ) => Promise<void>;
        };
        await chatModule.default({ method: req.method, body }, response);
      } catch (error) {
        next(error);
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localChatApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

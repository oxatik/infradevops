import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

function createApp() {
  const app = express();

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}

async function startServer() {
  const app = createApp();
  const server = createServer(app);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

// Cloudflare Workers loads the bundled entrypoint as an ES module. The
// Express app remains available for the Node-compatible local server above,
// while this default export gives Wrangler the module-worker contract it
// requires during deployment.
export default {
  fetch(
    request: Request,
    _env: Record<string, unknown>,
    _ctx: WorkerExecutionContext,
  ): Promise<Response> {
    const app = createApp();

    return new Promise((resolve, reject) => {
      (app as any)(request as any, {} as any, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else if (response instanceof Response) {
          resolve(response);
        } else {
          resolve(new Response("Request handled by Express."));
        }
      });
    });
  },
};

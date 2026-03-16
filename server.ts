import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy endpoint to bypass CORS
  app.post("/api/submit-onboarding", async (req, res) => {
    const WEBHOOK_URL = 'https://icad-n8n.ltubgr.easypanel.host/webhook/mariana-onboarding';
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();
      
      if (response.ok) {
        res.status(200).send(data);
      } else {
        console.error('Webhook error:', response.status, data);
        res.status(response.status).send(data);
      }
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Failed to connect to webhook' });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

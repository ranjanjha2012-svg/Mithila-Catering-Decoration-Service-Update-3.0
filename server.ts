import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Use custom to handle HTML serving
    });
    app.use(vite.middlewares);

    const pages = ["services", "gallery", "enquiry", "contact", "tiffin"];

    pages.forEach((page) => {
      app.get(`/${page}`, async (req, res, next) => {
        try {
          const html = await fs.readFile(path.resolve(__dirname, `${page}.html`), "utf-8");
          res.status(200).set({ "Content-Type": "text/html" }).end(await vite.transformIndexHtml(req.originalUrl, html));
        } catch (e) {
          next(e);
        }
      });
    });

    app.get("/", async (req, res, next) => {
      try {
        const html = await fs.readFile(path.resolve(__dirname, "index.html"), "utf-8");
        res.status(200).set({ "Content-Type": "text/html" }).end(await vite.transformIndexHtml(req.originalUrl, html));
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    const pages = ["services", "gallery", "enquiry", "contact", "tiffin"];
    pages.forEach((page) => {
      app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(distPath, `${page}.html`));
      });
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

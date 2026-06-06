import "dotenv/config";
import express from "express";
import cors from "cors";

import fs from "node:fs";
import path from "node:path";

import * as Sentry from "@sentry/node";

import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";
import keepAliveCron from "./lib/cron";

import productRouter from "./routes/productRouter";
import meRouter from "./routes/meRouter";
import streamRouter from "./routes/streamRouter"


const env = getEnv();
const app = express();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

// it's important that you don't parse the webhook event data, it should be in the raw format
app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});


app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
// we are not using req = _req
app.get("/health",(_req,res)=>{
  res.json({ok:true})
})

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/me",meRouter)
app.use("/api/products",productRouter)
app.use("/api/stream",streamRouter)

const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(env.PORT,()=>{
  console.log("Listening on port:",env.PORT)
  if(env.NODE_ENV === "production"){
    keepAliveCron.start()
  }
})
// Binds to PORT - Server listens on that port (e.g., 3000)
// Keeps process alive - Node.js doesn't exit (stays running)
// Accepts requests - Ready to receive HTTP requests
// Callback executes - Runs setup code (like starting cron jobs)

// sentry will be attached to the response object
Sentry.setupExpressErrorHandler(app);

app.use(
  (_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const sentryId = (res as express.Response & { sentry?: string }).sentry;

    res.status(500).json({
      error: "Internal server error",
      ...(sentryId !== undefined && { sentryId }),
    });
  },
);

// ✅ Start the server
const PORT = env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
}
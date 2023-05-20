import express from "express";
import cors from "cors";
import {
    healthCheck,
    createShortenUrl,
    redirectToDestination,
    getShortenedUrls,
} from "./controller/controller";
import validateRequest from "./middleware/validateRequest";
import createShortenUrlSchema from "./schemas/createShortenUrl.schema";

const PORT = 3001;

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.get("/api/health", healthCheck);

app.put("/api/url", validateRequest(createShortenUrlSchema), createShortenUrl);

app.get("/:urlId", redirectToDestination);

app.get("/api/urls", getShortenedUrls);

app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});

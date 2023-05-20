import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import sessionStorage from "./sessionStorage";

const nanoid = customAlphabet("1234567890abcdef", 10);

const getTimestamp = () => {
    const currentTime = new Date();
    return currentTime.toISOString();
};

const healthCheck = (req: Request, res: Response) => res.send("OK");

const createShortenUrl = (req: Request, res: Response) => {
    const { destination } = req.body;

    const isExist = sessionStorage.urls.find(
        ({ destination: existDestination }) => existDestination === destination
    );

    if (isExist) return res.status(409).send("url already exist");

    const newUrl = {
        id: nanoid(),
        destination: destination,
        created_at: getTimestamp(),
    };

    sessionStorage.urls.push(newUrl);

    return res.send(newUrl);
};

const redirectToDestination = (req: Request, res: Response) => {
    const { urlId } = req.params;

    const shortenedUrl = sessionStorage.urls.find(({ id }) => id === urlId);

    if (!shortenedUrl)
        return res.status(404).send("shortened url does not exist");

    return res.redirect(shortenedUrl.destination);
};

const getShortenedUrls = (req: Request, res: Response) =>
    res.json(sessionStorage.urls);

export {
    healthCheck,
    createShortenUrl,
    redirectToDestination,
    getShortenedUrls,
};

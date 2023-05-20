import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

const validateRequest =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error);
        next();
    };
export default validateRequest;
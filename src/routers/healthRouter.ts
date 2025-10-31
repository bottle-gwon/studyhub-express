import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", async (_req, res) => {
    res.status(200).send("---- Welcome!");
});

healthRouter.get("/checkhealth", async (_req, res) => {
    res.status(200).json({ message: "----- health good" });
});

export default healthRouter;

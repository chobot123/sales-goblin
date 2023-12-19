import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import nacl from "tweetnacl";

export const authenticateInteraction = (req: Request, res: Response, next: NextFunction) => {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");
    const publicKey = process.env.PUBLIC_KEY;

    if (_.isUndefined(signature) ||
        _.isUndefined(timestamp) ||
        _.isUndefined(publicKey)
    ) {
        return res.status(401).send("Undefined signature/timestamp/public key.");
    }

    const isSignatureValid = nacl.sign.detached.verify(
        Buffer.from(timestamp + JSON.stringify(req.body)),
        Buffer.from(signature, "hex"),
        Buffer.from(publicKey, "hex")
    );

    if (!isSignatureValid) {
        return res.status(401).send("Invalid request signature. See Timestamp/signature/public key.");
    }

    return next();
}
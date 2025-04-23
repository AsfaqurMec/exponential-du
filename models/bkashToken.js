/* eslint-disable import/no-anonymous-default-export */
import { connectDB } from "../lib/connectDB";

export async function findBkashToken() {
    const db = await connectDB();
    return await db.collection("bkash_tokens").findOne({});
}

export async function saveBkashToken(auth_token) {
    const db = await connectDB();
    const existingToken = await findBkashToken();

    if (existingToken) {
        return await db.collection("bkash_tokens").updateOne(
            { _id: existingToken._id },
            { $set: { auth_token, updatedAt: new Date() } }
        );
    } else {
        return await db.collection("bkash_tokens").insertOne({
            auth_token,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
export default { findBkashToken, saveBkashToken };

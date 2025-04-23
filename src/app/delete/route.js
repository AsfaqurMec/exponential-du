import { connectDB } from "../../../lib/connectDB";
import { ObjectId } from "mongodb"; // Make sure to import this

export async function POST(req) {
  try {
    const { id } = await req.json();
   // console.log(id, status);

    if (!id) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }

    // Connect to MongoDB
    const db = await connectDB();
    const userCollection = db.collection("users");

    const query = { _id: new ObjectId(id) }
    const result = await userCollection.deleteOne(query);

    return new Response(JSON.stringify({ message: "Status updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return new Response(JSON.stringify({ message: "Failed to update user status" }), {
      status: 500,
    });
  }
}


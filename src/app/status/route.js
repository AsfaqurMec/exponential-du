import { connectDB } from "../../../lib/connectDB";
import { ObjectId } from "mongodb"; // Make sure to import this

export async function POST(req) {
  try {
    const { id, status } = await req.json();
   // console.log(id, status);

    if (!id || !status) {
      return new Response(JSON.stringify({ message: "User ID and status are required" }), {
        status: 400,
      });
    }

    // Connect to MongoDB
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Convert id to ObjectId if needed
    let query = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (err) {
      return new Response(JSON.stringify({ message: "Invalid user ID format" }), {
        status: 400,
      });
    }

    // Find user
    const user = await userCollection.findOne(query);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Update status
    const updatedUser = await userCollection.updateOne(query, {
      $set: { status },
    });

    if (updatedUser.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: "User not found or status unchanged" }),
        { status: 404 }
      );
    }

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


























// import { connectDB } from "../../../lib/connectDB"; // Import MongoDB connection
//  // Import User model

// export async function POST(req) {
  
  
//   try {
//     const { id, status } = await req.json();
//     console.log(id, status);
    
//     if (!id || !status) {
//       return new Response(JSON.stringify({ message: "Email and new role are required" }), { status: 400 });
//     }

//     // Connect to MongoDB
//     const db = await connectDB()
//     const userCollection = db.collection('users')
//     // Find user by email
//     const user = await userCollection.findOne({ id });

//     if (!user) {
      
      
//       return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
//     }

//     // Store the new password directly (Not Secure)
//     const updatedUser = await userCollection.updateOne({ id }, { $set: { status: status } });
//     if (updatedUser.modifiedCount === 0) {
//         return new Response(JSON.stringify({ message: "User not found or role unchanged" }), { status: 404 });
//       }
//     return new Response(JSON.stringify({ message: "Role updated successfully" }), { status: 200 });
//   } catch (error) {
//     console.error("Role update error:", error);
//     return new Response(JSON.stringify({ message: "Failed to update user role" }), { status: 500 });
//   }
// }

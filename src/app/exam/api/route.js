import { connectDB } from "../../../../lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async (request) => {
  
    
    const db =await connectDB()
    const servicesCollection = db.collection('exams')
    try {
       
       const service = await servicesCollection.find().toArray();
        
       // console.log(service);
        
        return NextResponse.json({service})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}
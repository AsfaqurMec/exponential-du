"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
// import SocialSignin from "@/components/shared/SocialSignin";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../../context/UserContext";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";; // Import useRouter
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa6";


const SignUpPage = () => {

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imagePath, setImagePath] = useState('');
  // Initialize the router
  const { user } = useUser(); // Access user data from context
  const { setUser } = useUser(); // Access setUser from context
  const router = useRouter(); // Initialize the router

  const [imageUrl, setImageUrl] = useState(null);

   
  useEffect(() => {
    Swal.fire({
      title: '<h1 class="text-3xl font-bold mb-4">পেমেন্ট করার পদ্ধতি</h1>',
      html: `
        <div class="text-left space-y-2 text-[16px] leading-relaxed">
          <p><strong>ধাপ - ১:</strong> মোবাইলের বিকাশ/নগদ অ্যাপে গিয়ে সেন্ড মানি অপশনে ক্লিক করুন।</p>
          <p><strong>ধাপ - ২:</strong> <strong>০১৫৭৫৭১৭১৬৪</strong>(বিকাশ) / <strong>০১৯৮৯৬১৩৪৩৬</strong> (নগদ) নাম্বারটি ডায়াল করুন।</p>
          <p><strong>ধাপ - ৩:</strong> পরিমাণে <strong>১২০tk</strong> এবং এগিয়ে যান - এ ক্লিক করুন।</p>
          <p><strong>ধাপ - ৪:</strong> রেফারেন্স এ <strong>exponential</strong> লিখুন এবং পিন নাম্বার লিখুন।</p>
          <p><strong>ধাপ - ৫:</strong> Next এ ক্লিক করে, সেন্ড মানি করতে ট্যাপ করে ধরে রাখুন।</p>
          <p class="font-semibold text-red-500">ধাপ - ৬: সেন্ড মানি হওয়ার পর ট্রানজেকশন ID কপি করে বা Screenshot নিয়ে আমাদের পেজের মেসেজ অপশন এ সেন্ড করুন।</p>
        </div>
      `,
      confirmButtonText: 'ঠিক আছে',
      width: '600px',
    });
  }, []);







  const handleDebug = () => {
    console.log('Widget opened');
  };


  const handleUploadComplete = (result) => {
    if (result?.event === 'success') {
      setImageUrl(result?.info.secure_url);
     // console.log('Upload successful:', result?.info);
    } else {
      console.error('Upload failed or canceled:', result);
    }
  };
 

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file directly
    if (!file) {
      setMessage('No file selected');
      return;
    }
  
    setImage(file); // Update state if you need it elsewhere
  
    const formData = new FormData();
    formData.append('image', file); // Use the file directly
  
    try {
      const res = await fetch(' http://localhost:3000/upload/api', {
        method: 'POST',
        body: formData, // Send the FormData directly
      });
  
      if (res.ok) {
        const data = await res.json();
        setMessage('Upload Successfully');
        setImagePath(data.filePath); 
        console.log(imagePath);
        // Use the file path from the server response
      } else {
        const error = await res.json();
        console.error('Upload failed', error);
        setMessage('Upload failed');
      }
    } catch (err) {
      console.error('An error occurred during upload:', err);
      setMessage('Upload failed');
    }
  };
  


  const handleSignUp = async (event) => {
    
    event.preventDefault();

    
    const newUser = {
      name: event.target.name.value,
      zilla: event.target.zilla.value,
      number: event.target.number.value,
      email: event.target.email.value,
      password: event.target.password.value,
      image: imageUrl,
      status: 'block'
    };
    const resp = await fetch(" http://localhost:3000/enroll/api", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });

    if (resp.status === 200) {
      setUser(newUser); // Save the user details in context
      toast.success("Course Purchase Successfully");
      //console.log(newUser);
      setImageUrl(null);
      event.target.reset();

     // Redirect after 2 seconds
     setTimeout(() => {
      router.push("/");
    }, 2000); // 2000 milliseconds = 2 seconds


    }else {
      toast.error("Something went Wrong");
    }
  };


  const handlePayment = async (event) => {


    const paynetData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      image: imageUrl
    };

    try {
      const { data } = await axios.post("http://localhost:3000/make-payment/api", paynetData);
      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }


//console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  return (
    <div className="container  px-5 lg:px-24 mx-auto py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
       
        <div className="border-2 bg-violet-100 px-12 py-5 border-violet-400 rounded-md">
          <h6 className="text-5xl font-semibold text-[#1a1357] text-center mb-8">
            Enrollment
          </h6>


          <form onSubmit={handleSignUp} action="">

           <div className="mb-5 shadow-md shadow-blue-500 p-5 rounded-sm">
      <h1 className="mb-3 font-semibold">Upload Profile Image</h1>
      <div className="flex justify-between">

    <CldUploadWidget 
       cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dzmglrehf"}
      uploadPreset="electro"
      onSuccess={(result) => handleUploadComplete(result)}
      onWidgetOpen={handleDebug}
      >
  {({ open }) => {
    return (
      <button className="border-2 border-back p-2 rounded-md bg-blue-300 hover:bg-blue-500 hover:text-white" onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
         {imageUrl && (
        <div className="flex gap-3 flex-col">
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100px' }} />
          {/* <h1>{imageUrl}</h1> */}
        </div>
      )}






        {/* <input type="file" className="" onChange={handleFileChange} required />
        <img src={imagePath} alt="" className="w-20 h-18 rounded-md"/> */}
      </div>
      {/* {message && <p>{message}</p>} */}
      
    </div>                                                                                                          

            <label className="text-black" htmlFor="email">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="w-full px-3 py-2 border-b-[#2527b1] rounded-md border-b-2 focus:border-2 focus:border-[#18100c] focus:outline-none bg-transparent text-black text-lg"
               required />
            <br /> <br />

            <label className="text-black" htmlFor="zilla">Your Zilla</label> <br />
            <input
              type="text"
              name="zilla"
              placeholder="Enter your zilla"
              className="w-full px-3 py-2 border-b-[#2527b1] rounded-md border-b-2 focus:border-2 focus:border-[#18100c] focus:outline-none bg-transparent text-black text-lg"
               required />
            <br /> <br />
            <label className="text-black" htmlFor="number">Your Number</label> <br />
            <input
              type="text"
              name="number"
              placeholder="your number"
              className="w-full px-3 py-2 border-b-[#2527b1] rounded-md border-b-2 focus:border-2 focus:border-[#18100c] focus:outline-none bg-transparent text-black text-lg "
               required />
            <br /> <br />

            <label className="text-black" htmlFor="email">Email</label> <br />
            <input
              type="text"
              name="email"
              placeholder="your email"
              className="w-full px-3 py-2 border-b-[#2527b1] rounded-md border-b-2 focus:border-2 focus:border-[#18100c] focus:outline-none bg-transparent text-black text-lg"
               required />
            <br /> <br />
            <label className="text-black" htmlFor="password">Password</label> <br />
            <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="your password"
              className=" w-full px-3 py-2 border-b-[#2527b1] rounded-md border-b-2 focus:border-2 focus:border-[#18100c] focus:outline-none bg-transparent text-black text-lg"
              required />
              <span className="absolute top-4 right-2 cursor-pointer" onClick={()=> setShow(!show)}>
                  {
                         show ?  <FaEye className="w-8 h-6"></FaEye> : <FaEyeSlash className="w-8 h-6"></FaEyeSlash> 
                  }
                  </span>
                  </div>
            <br />
            <button
              type="submit"
              className="w-full btn btn-primary bg-[#2527b1] hover:bg-[#7b25b1] mt-8 text-lg border-none"
            >
              Enroll
            </button>
          </form>
          <div>
           
            <h6 className="mt-5 mb-5 text-center text-black">
              Already have course ?{" "}
              <Link className="text-[#3b4ce8] font-semibold text-xl ml-2 underline" href={"/login"}>
                Login
              </Link>
            </h6>
          </div>
        </div>

        <div className="text-center flex flex-col justify-center items-center gap-5">
                          <h1 className="text-6xl mt-5 text-black text-center font-bold pb-1">Login!</h1>
                          <p>Welcome to <strong>Exponential!</strong>. A reliable and authenticate platform for all kind of help for DU Tech. Unit Admission. Here we have all Subjects live or recorded classes.
                          </p>
                          <Link href={"/login"}><button className="btn hover:bg-white hover:text-black hover:border-2  bg-black text-white font-semibold text-xl">Login</button></Link>
                          
                      </div>

      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default SignUpPage;
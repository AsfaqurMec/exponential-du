"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState }  from "react";
 import { signIn, useSession } from "next-auth/react";
 import { FaEye } from 'react-icons/fa';
 import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

 const [show, setShow] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
   // console.log(resp);
    
  };

  return (

<div className='hero h-full rounded-lg bg-white '>
                  <div className="w-full hero-content flex-col gap-14 lg:gap-28 lg:flex-row-reverse">
                      <div className="text-center flex flex-col justify-center items-center gap-5">
                          <h1 className="text-6xl mt-5 text-black text-center font-bold pb-1">Exponential!</h1>
                          <p>Welcome to <strong>Exponential!</strong>. A reliable and authenticate platform for all kind of help for DU Tech. Unit Admission. Here we have all Subjects live or recorded classes.
                          </p>
                          <Link href={"/enroll"}><button className="btn hover:bg-white hover:text-black hover:border-2  bg-black text-white font-semibold text-xl">Enroll Now</button></Link>
                          
                      </div>
                      <div data-aos="zoom-out-up" data-aos-duration="1000" className="card flex-shrink-0 w-full lg:w-1/2 rounded-none bg-[#ffffff] lg:border-r-2 border-r-black">
                        
                        
                          <form  onSubmit={handleLogin} className="card-body gap-1">
                          <div className='w-full flex flex-col justify-center items-center gap-2'>
                          <h1 className='font-semibold text-teal-900 text-3xl'>Login to your <span className='text-purple-500'>account</span></h1>
                          
                              </div> 

                  <div className="form-control mt-16">
                              <label className="text-xl text-[#d38303]" htmlFor="email">Email</label> <br />
               <input
                 type="text"
                 name="email"
                 placeholder="your email"
                 className="w-full px-3 py-3  border-[#090a11] rounded-md border-[3px] focus:border-b-2 focus:border-b-[#e2b29d] focus:outline-none bg-transparent text-xl text-black"
               />
               </div>
               <div className="form-control mt-5 ">
               <label className="text-[#d38303] text-xl" htmlFor="password">Password</label> <br />
               <div className="relative">
               <input
                  type={show ? "text" : "password"}
                 name="password"
                 placeholder="your password"
                 className="w-full px-3 py-3 border-[#000000] rounded-md border-[3px] focus:border-b-2 focus:border-b-[#e2b29d] focus:outline-none bg-transparent text-xl text-black"
               />
               <span className="absolute top-4 right-2 cursor-pointer" onClick={()=> setShow(!show)}>
                                 {
                                        show ?  <FaEye className="w-8 h-6"></FaEye> : <FaEyeSlash className="w-8 h-6"></FaEyeSlash> 
                                 }
                                 </span>
               </div>
                </div>


               <div className="form-control mt-2 p-0">
               <button
                 type="submit"
                 className="w-full btn btn-primary border-none bg-[#551a01] mt-12 text-lg"
               >
                 Login
               </button>
               </div>
    
                          </form>
                          
                              
                      </div>
                  </div>
                  
              </div>

  );
};

export default Page;

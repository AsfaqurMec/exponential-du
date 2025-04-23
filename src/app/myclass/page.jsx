"use client";
import React, { useEffect, useState } from "react";
import physics from "../../../public/physics.png";
import chemistry from "../../../public/chemistry-logo-template-illustration-free-vector.jpg";
import hmath from "../../../public/istockphoto-2180374705-612x612.jpg";
import math from "../../../public/cartoon-maths-elements-background-education-logo-vector.jpg";
import eng from "../../../public/language-english-translation-discipline-education-outline-icon-logo-illustration-222388082.jpg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUser } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useUser(); // Access user data from context

  const [access, setAccess] = useState([]);
  const isLoggedIn = session?.user?.email || user?.email;
  // 🔐 Redirect logic
  // useEffect(() => {
  //   const isLoggedIn = session?.user?.email || user?.email;

  //   if (
  //     (status === "unauthenticated" && !isLoggedIn) ||
  //     (status === "authenticated" && !isLoggedIn)
  //   ) {
  //     router.push("/login");
  //   }
  // }, [session, status, router, user?.email]);

  // 🔄 Fetch access data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `/access?email=${session?.user?.email || user?.email}`
        );
        setAccess(data.service);
      } catch (error) {
        console.error("Error fetching access:", error);
      }
    };
    getData();
  }, [session?.user?.email, user?.email]);

  // 🕒 Loading state
  if (status === "loading") {
    return (
      <p className="text-current my-10 w-full font-semibold text-xl">
        Authenticating... Please Wait
      </p>
    );
  }

  // 🚫 Blocked access
  if (access[0]?.status === "block" || !isLoggedIn) {
    return (
      <p className="text-center my-10 w-full font-semibold text-xl">
        Classes will be upload soon!!!
      </p>
    );
  }

  // ✅ Subjects
  const Physics = "Physics";
  const Chemistry = "Chemistry";
  const HigherMath = "HigherMath";
  const English = "English";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3 px-5 md:px-10 py-5 bg-blue-200 my-2">
        <h1 className="text-xl font-semibold text-center">
          # যেকোনো নোটিশ এর জন্য আমাদের{" "}
          <strong>Whatsapp Student Community Group</strong> "Join" করুন ।
        </h1>
        <Link
          className="flex justify-center"
          href={"https://chat.whatsapp.com/GiJ0LVEnzqnK0PsBJU4jAi"}
          target="_blank"
        >
          <button className="btn bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-500 hover:border-white text-blue-500 px-4 md:px-8 text-lg md:text-2xl w-32 md:w-52">
            Join Now
          </button>
        </Link>
      </div>

      {/* Our Subjects */}
      <div className="mb-20">
        <h1 className="text-center text-3xl my-16 font-extrabold underline">
          ক্লাস সমুহ{" "}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-3 justify-center items-center px-3 md:px-20 lg:px-60">
          <Link href={`/myclass/${Physics}`}>
            <div className="flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black">
              <Image
                src={physics}
                alt=""
                className="rounded-full w-36 h-24"
                width={100}
                height={70}
              />
              <h1 className="text-2xl font-bold">পদার্থবিজ্ঞান</h1>
            </div>
          </Link>

          <Link href={`/myclass/${Chemistry}`}>
            <div className="flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black">
              <Image
                src={chemistry}
                alt=""
                className="rounded-full w-32 h-24"
                width={96}
                height={70}
              />
              <h1 className="text-2xl font-bold">রসায়ন</h1>
            </div>
          </Link>

          <Link href={`/myclass/${HigherMath}`}>
            <div className="flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black">
              <Image
                src={hmath}
                alt=""
                className="rounded-full w-32 h-24"
                width={96}
                height={70}
              />
              <h1 className="text-2xl font-bold">উচ্চতর গণিত</h1>
            </div>
          </Link>

          <Link href={`/myclass/${English}`}>
            <div className="flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black">
              <Image
                src={eng}
                alt=""
                className="rounded-full w-32 h-24"
                width={96}
                height={70}
              />
              <h1 className="text-2xl font-bold">ইংরেজি</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;


// "use client"
// import React, { useState } from 'react';
// import physics from '../../../public/physics.png'
// import chemistry from '../../../public/chemistry-logo-template-illustration-free-vector.jpg'
// import hmath from '../../../public/istockphoto-2180374705-612x612.jpg'
// import math from '../../../public/cartoon-maths-elements-background-education-logo-vector.jpg'
// import eng from '../../../public/language-english-translation-discipline-education-outline-icon-logo-illustration-222388082.jpg'
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import { useUser } from '../../../context/UserContext';
// import { useRouter } from 'next/navigation';
// import { useEffect } from "react";
// import axios from 'axios';

// const page = () => {



//     const router = useRouter();
//     const { data: session, status } = useSession();
//  //console.log(session);
 
//   const { user } = useUser(); // Access user data from context


//   useEffect(() => {
//     // if(session?.user?.status || user?.status === 'block'){
//     //   router.push("/login"); 
//     // }
//     if (status === "unauthenticated" && !session?.user?.email || user?.email) {
//       router.push("/login"); // Redirect only if no user is found after loading
//     } 
//     if (status === "authenticated" && !session?.user?.email || user?.email) {
//       router.push("/login"); // Redirect only if no user is found after loading
//     }
//   }, [session, status, router]); // Depend on session and router

//   // if (!session) return <p>Redirecting to login...</p>;
//   const [access, setAccess] = useState([]);
//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get(
//         ` http://localhost:3000/access?email=${session?.user?.email || user?.email}`
//       )

//       setAccess(data.service)
//       //console.log('jefj',access);
      
//     }
//     getData();

//   }, [session?.user?.email,user?.email]);


//     const Physics = 'Physics';
//     const Chemistry = 'Chemistry';
//     const HigherMath = 'HigherMath';
    
//     const English = 'English';
//     if (status === "loading") {
//       return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>; // Prevent rendering hooks while loading
//     }
//     if (access[0]?.status === "block" ) {
//      // console.log(session?.user?.status,user?.status );
      
//       return <p className="text-center my-10 w-full font-semibold text-xl">Classes will be upload soon!!!</p>; // Prevent rendering hooks while loading
//     }

//     return (
//         <div>
            
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3 px-5 md:px-10 py-5 bg-blue-200 my-2'>
//                 <h1 className='text-xl font-semibold text-center'># যেকোনো নোটিশ এর জন্য আমাদের <strong>Whatsapp Student Community Group</strong> "Join" করুন ।</h1>
//                 <Link className='flex justify-center' href={'https://chat.whatsapp.com/GiJ0LVEnzqnK0PsBJU4jAi'} target='_blank'><button className='btn bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-500 hover:border-white text-blue-500 px-4 md:px-8 text-lg md:text-2xl w-32 md:w-52'>Join Now</button></Link>
//              </div>

//             {/* Our Subjects */}
            
//                     <div className='mb-20'>
//                     <h1 className='text-center text-3xl my-16 font-extrabold underline'>ক্লাস সমুহ </h1>
                         
//                     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-3 justify-center items-center px-3 md:px-20 lg:px-60'>
//                             <Link href={`/myclass/${Physics}`}><div className='flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black'>
//                                 <Image src={physics} alt='' className='rounded-full w-36 h-24' width={100} height={70}></Image>
//                                 <h1 className='text-2xl font-bold'>পদার্থবিজ্ঞান</h1>
//                             </div></Link>
            
//                             <Link href={`/myclass/${Chemistry}`}><div className='flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black'>
//                                 <Image src={chemistry} alt='' className='rounded-full w-32 h-24' width={96} height={70}></Image>
//                                 <h1 className='text-2xl font-bold'>রসায়ন</h1>
//                             </div></Link>
            
//                             <Link href={`/myclass/${HigherMath}`}><div className='flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black'>
//                                 <Image src={hmath} alt='' className='rounded-full w-32 h-24' width={96} height={70}></Image>
//                                 <h1 className='text-2xl font-bold'>উচ্চতর গণিত</h1>
//                             </div></Link>
            
//                             <Link href={`/myclass/${English}`}><div className='flex flex-col justify-between items-center shadow-2xl py-5 rounded-lg border-blue-100 border-2 shadow-black'>
//                                 <Image src={eng} alt='' className='rounded-full w-32 h-24' width={96} height={70}></Image>
//                                 <h1 className='text-2xl font-bold'>ইংরেজি</h1>
//                             </div></Link>
            
                           
//                          </div>
            
            
//                     </div>
//         </div>
//     );
// };

// export default page;
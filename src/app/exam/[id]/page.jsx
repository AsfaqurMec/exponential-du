"use client";
import { useEffect, useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useUser } from '../../../../context/UserContext';
import { useRouter } from 'next/navigation';


const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useUser();
  const params = useParams();

  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     // Disable right-click
//     const handleContextMenu = (event) => event.preventDefault();
//     document.addEventListener("contextmenu", handleContextMenu);

//     // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, etc.
//     const handleKeyDown = (event) => {
//       if (
//         event.key === "F12" ||
//         (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J"))
//       ) {
//         event.preventDefault();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//      useEffect(() => {
//     // Dynamic Watermark
//     const watermarkText = session?.data?.user?.email || user?.email || "Protected Content";
//     document.body.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="24" fill="rgba(0,0,0,0.1)" transform="rotate(-45, 100, 100)" text-anchor="middle">${watermarkText}</text></svg>')`;

//   }, [session?.data?.user?.email, user?.email]);

//   useEffect(() => {
//     // Detect Print Screen key and blur content
//     const handlePrintScreen = (event) => {
//       if (event.key === "PrintScreen") {
//         document.body.style.filter = "blur(50px)";
//         setTimeout(() => {
//           document.body.style.filter = "none";
//         }, 2000);
//       }
//     };

//     document.addEventListener("keyup", handlePrintScreen);
//     return () => {
//       document.removeEventListener("keyup", handlePrintScreen);
//     };
//   }, []);

//   useEffect(() => {
//     // Hide content when the tab is inactive (for some screenshot tools)
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         document.body.style.display = "none";
//       } else {
//         document.body.style.display = "block";
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   useEffect(() => {
//     // Hide content when window loses focus (for mobile screenshots)
//     const handleBlur = () => {
//       document.body.style.opacity = "0"; // Hide content when tab is not active
//     };

//     const handleFocus = () => {
//       document.body.style.opacity = "1"; // Show content when tab is active
//     };

//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("focus", handleFocus);

//     return () => {
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("focus", handleFocus);
//     };
//   }, []);


  useEffect(() => {
    // if(session?.user?.status || user?.status === 'block'){
    //   router.push("/login"); 
    // }
    if (status === "unauthenticated" && !session?.user?.email || user?.email) {
      router.push("/login"); // Redirect only if no user is found after loading
    } 
    if (status === "authenticated" && !session?.user?.email || user?.email) {
      router.push("/login"); // Redirect only if no user is found after loading
    }
  }, [session, status, router]);



  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/exam/api`
      );
      setLatest(data.service);
      setLoading(false);
    };

    getData();
  }, [params.subject]);

  const classes = latest.filter((item) => item._id === params.id);

  if (status === "loading") {
    return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>;
  }

  const [access, setAccess] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` http://localhost:3000/access?email=${session?.user?.email || user?.email}`
      )

      setAccess(data.service)
      //console.log('jefj',access);
      
    }
    getData();

  }, [session?.user?.email,user?.email]);

  if (access[0]?.status === "block") {
    return <p className="text-center my-10 w-full font-semibold text-xl">Exams will be upload soon!!!</p>;
  }

  return (
    <div>
      <section className=''>
    
        {loading ? (
          <div className="loader w-28 h-28 mx-auto my-20">
            <h1 className="text-center text-2xl font-medium my-10">Loading.....</h1>
          </div>
        ) : (
          <div className=''>

           <div className='w-full min-h-screen p-1'>
                 <iframe src={classes[0]?.link} className='w-full min-h-screen' frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
         </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
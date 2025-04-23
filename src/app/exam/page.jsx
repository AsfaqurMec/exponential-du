"use client"
import { use, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useUser } from '../../../context/UserContext';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";


export default function ExamPage() {
   const router = useRouter();
        const { data: session, status } = useSession();
        console.log(session);
     //console.log(session);
     
      const { user } = useUser(); // Access user data from context
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
  
      
  
        // if (!session) return <p>Redirecting to login...</p>;
    // const  services =await getServicesCategory(params.category);
    const [latest, setLatest] = useState([]);
    // console.log('search = ',params.category);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getData = async () => {
        const { data } = await axios.get(
          ` http://localhost:3000/exam/api`
        )
  
        setLatest(data.service)
        setLoading(false);
      }
      getData();
  
    }, []);
  
    useEffect(() => {
      // Disable right-click
      const handleContextMenu = (event) => event.preventDefault();
      document.addEventListener("contextmenu", handleContextMenu);
  
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, etc.
      const handleKeyDown = (event) => {
        if (
          event.key === "F12" ||
          (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J"))
        ) {
          event.preventDefault();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  
       useEffect(() => {
      // Dynamic Watermark
      const watermarkText = session?.data?.user?.email || user?.email || "Protected Content";
      document.body.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="24" fill="rgba(0,0,0,0.1)" transform="rotate(-45, 100, 100)" text-anchor="middle">${watermarkText}</text></svg>')`;
  
  
      // Detect visibility change
      // const handleVisibilityChange = () => {
      //   if (document.hidden) {
      //     alert("Please do not take screenshots or switch tabs.");
      //     const video = document.querySelector("video");
      //     if (video) video.pause();
      //   }
      // };
      // document.addEventListener("visibilitychange", handleVisibilityChange);
  
      // return () => {
      //   document.body.style.backgroundImage = "";
      //   document.removeEventListener("visibilitychange", handleVisibilityChange);
      // };
    }, [session?.data?.user?.email, user?.email]);
  
    useEffect(() => {
      // Detect Print Screen key and blur content
      const handlePrintScreen = (event) => {
        if (event.key === "PrintScreen") {
          document.body.style.filter = "blur(50px)";
          setTimeout(() => {
            document.body.style.filter = "none";
          }, 2000);
        }
      };
  
      document.addEventListener("keyup", handlePrintScreen);
      return () => {
        document.removeEventListener("keyup", handlePrintScreen);
      };
    }, []);
  
    useEffect(() => {
      // Hide content when the tab is inactive (for some screenshot tools)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          document.body.style.display = "none";
        } else {
          document.body.style.display = "block";
        }
      };
  
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);
  
    useEffect(() => {
      // Hide content when window loses focus (for mobile screenshots)
      const handleBlur = () => {
        document.body.style.opacity = "0"; // Hide content when tab is not active
      };
  
      const handleFocus = () => {
        document.body.style.opacity = "1"; // Show content when tab is active
      };
  
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);
  
      return () => {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("focus", handleFocus);
      };
    }, []);
  
    useEffect(() => {
      const detectScreenshot = () => {
        if (document.hidden) {
          alert("Screenshot is not allowed!");
        }
      };
  
      document.addEventListener("visibilitychange", detectScreenshot);
  
      return () => {
        document.removeEventListener("visibilitychange", detectScreenshot);
      };
    }, []);
  
    if (status === "loading") {
      return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>; // Prevent rendering hooks while loading
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

    <section className='pt-2'>
     
      {loading ? (
        <div className="loader w-28 h-28 mx-auto my-20"> <h1 className="text-center text-2xl font-medium my-10">Loading.....</h1></div>
      ) :
      <>
      {latest.length > 0 ? 
          
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 py-5'>
             {latest?.map(latest => (
                    <Link key={latest._id} href={`/exam/${latest?._id}`}>
                        <div className="flex flex-col items-start gap-2 border-2 rounded-md p-3 shadow-2xl border-blue-100">
                 
                        <img className="w-full h-[300px]" src={latest?.image} alt="image" />
                 <div className="w-full">
                <h1 className="text-xl font-semibold ">{latest?.title}</h1>
                <h1 className="text-md font-semibold mt-3">{latest?.topic}</h1>

                <button className=' mt-2 btn bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-500 hover:border-white text-blue-500 px-4 md:px-8 text-lg md:text-2xl w-full'>Give Exam</button>
                </div> 
                  </div>
                    </Link>
                     ))}
        </div> 
    
       :
      <h1 className="text-center text-2xl font-medium my-10">No Exams</h1>
     }
     </>
      }
    </section>

  </div>


    // <div className='w-full min-h-screen p-1'>
    //   <iframe src="https://quilgo.com/t/tPlotzVQ0w1ab5zU" className='w-full min-h-screen' frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
    // </div>

  );
}

// https://docs.google.com/forms/d/e/1FAIpQLSdXIwhx_C899YnRJnK48pxRNk_NfoLtUwO_vvrehPPlXKxuVA/viewform?embedded=true
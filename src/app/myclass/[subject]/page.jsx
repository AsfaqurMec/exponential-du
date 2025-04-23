
"use client"
import { use, useEffect, useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useUser } from '../../../../context/UserContext';
import { useParams, useRouter } from 'next/navigation';
import PreventScreenshot from "../../../Components/prevent";
import { FaVideo } from "react-icons/fa";

const page = () => {

  const { subject, category } = useParams();

//console.log('gg',subjects);


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
  const [access, setAccess] = useState([]);
  // console.log('search = ',params.category);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` http://localhost:3000/myclass/api?subject=${subject}`
      )

      setLatest(data.service)
      setLoading(false);
    }
    getData();

  }, [subject]);

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


  if (status === "loading") {
    return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>; // Prevent rendering hooks while loading
  }

  if (access[0]?.status === "block" ) {
   // console.log(session?.user?.status,user?.status );
    
    return <p className="text-center my-10 w-full font-semibold text-xl">Classes will be upload soon!!!</p>; // Prevent rendering hooks while loading
  }
  return (
    <div>

      <section className='pt-2'>
        <h2 className='text-center font-semibold text-5xl mb-3'>{category}</h2>

        {loading ? (
          <div className="loader w-28 h-28 mx-auto my-20"> <h1 className="text-center text-2xl font-medium my-10">Loading.....</h1></div>
        ) :
        <>
        {latest.length > 0 ? 
            
          <div className='flex flex-col lg:flex-row gap-5 px-5 py-5'>
            <div className="w-full lg:w-[60%] relative">
               {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="flex gap-2 items-center pb-2 ">
                <HiArrowCircleRight className="w-10 h-10"/>
                <h1 className="text-xl font-semibold">{latest[0]?.title}</h1>
                </div>
                <PreventScreenshot />
  
                <video src={latest[0]?.video} className="w-full" controls controlsList="nodownload">
                      <source src={latest[0]?.video} type="video/mp4"/>
                </video>
                </div>
                <div className="w-full lg:w-[40%] space-y-5 flex flex-col pt-5 lg:pt-14">
                    <h1 className="text-xl font-semibold">Other Classes :</h1>
                {latest?.map(latest => (
                    <Link key={latest._id} href={`/myclass/${latest?.subject}/${latest?._id}`}>
                        <div className="flex gap-2 border-2 rounded-md p-2 shadow-2xl border-blue-100">
                  <video src={latest?.video} className="w-[55%] rounded-md h-36"  controlsList="nodownload">
                      <source src={latest[0]?.video} type="video/mp4"/>
                </video>
              

                 <div className="w-[45%]">
                <h1 className="text-xl font-semibold ">{latest?.title}</h1>
                <h1 className="text-md font-semibold mt-3">{latest?.subject}</h1>
                </div> 
                  </div>
                    </Link>
                     ))}
                </div>
          </div> 
      
         :
        <h1 className="text-center text-2xl font-medium my-10">No Classes</h1>
       }
       </>
        }
      </section>

    </div>
  );
};

export default page;

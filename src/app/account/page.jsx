/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const { user } = useUser();

  const drawerRef = useRef(null);

  const generateCode = () =>
    Math.floor(10000 + Math.random() * 90000).toString();

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  const sendCodeToEmail = async () => {
    const code = generateCode();

    try {
      const response = await fetch("http://localhost:3000/email/api/", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email || user?.email,
          code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("OTP sent to email successfully.");

        const { value: otp } = await Swal.fire({
          title: "Enter the OTP sent to your email",
          input: "text",
          inputLabel: "OTP Code",
          inputPlaceholder: "Enter the code",
          showCancelButton: true,
          confirmButtonText: "Verify",
        });

        if (otp === code) {
          const { value: newPass } = await Swal.fire({
            title: "Enter New Password",
            input: "password",
            inputLabel: "New Password",
            inputPlaceholder: "Enter new password",
            showCancelButton: true,
            confirmButtonText: "Update",
          });

          if (newPass) {
            updatePassword(newPass);
          }
        } else if (otp) {
          Swal.fire("Error", "Incorrect OTP. Please try again.", "error");
        }
      } else {
        Swal.fire("Error", "Failed to send code. Try again.", "error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const updatePassword = async (password) => {
    try {
      const response = await fetch("http://localhost:3000/update/api/", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email || user?.email,
          newPassword: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Password updated successfully!");
      } else {
        Swal.fire("Error", "Failed to update password.", "error");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className=" w-32 md:w-64 bg-white shadow-lg p-1 mt-2 md:p-6">
        <div className="text-lg md:text-xl font-bold mb-8">My Account</div>
        <ul>
          <li className="mb-4 text-sm md:text-md">
            <a href="" className="flex items-center text-orange-500 font-semibold">
              <span className="mr-2">&#128100;</span> Account Info
            </a>
          </li>
          {session?.data?.user?.role === "admin" && (
            <li className="mb-4 hover:bg-amber-100">
              <Link href={"/dashboard"}>
                <button className="flex items-center text-gray-600 hover:text-orange-500">
                  <span className="mr-2">&#128682;</span> Dashboard
                </button>
              </Link>
            </li>
          )}
          <li className="mb-4 hover:bg-amber-100">
            <a href="/myclass" className="flex items-center text-gray-600 hover:text-orange-500">
              <span className="mr-2">&#128203;</span> My classes
            </a>
          </li>
          <li className="mb-4 hover:bg-amber-100">
            <a href="/exam" className="flex items-center text-gray-600 hover:text-orange-500">
              <span className="mr-2">&#128203;</span> My Exams
            </a>
          </li>
          {session?.data?.user?.email || user?.email ? (
            <li onClick={() => signOut({ callbackUrl: "/" })}>
              <button className="flex items-center text-gray-600 hover:text-orange-500 hover:bg-amber-100">
                <span className="mr-2">&#128682;</span> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href={"/login"}>
                <button className="flex items-center text-gray-600 hover:text-orange-500 hover:bg-amber-100">
                  <span className="mr-2">&#128682;</span> Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 md:px-10 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Hello{" "}
            <span className="text-xl font-medium text-orange-600">
              {session?.data?.user?.name || user?.name}
            </span>
          </h2>
        </div>

        {/* Account Details Form */}
        <div className="bg-white p-2 md:p-8 shadow-lg rounded-lg max-w-4xl">
          <h3 className="text-lg font-bold mb-4">Account Details</h3>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={session?.data?.user?.name || user?.name}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={session?.data?.user?.email || user?.email}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
            </div>
            <h1 className="mb-3">User Status : {session?.data?.user?.status || user?.status}</h1>
            <button
              type="button"
              className="btn hover:bg-blue-300"
              onClick={sendCodeToEmail}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;




// "use client";
// import { signOut, useSession } from "next-auth/react";
// import React, { useRef, useState } from "react";
// import { useUser } from "../../../context/UserContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Page = () => {
//   const router = useRouter();
//   const session = useSession();
//   const { user } = useUser();

//   // State for managing modals
//   const [showCodePopup, setShowCodePopup] = useState(false);
//   const [showPasswordPopup, setShowPasswordPopup] = useState(false);
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [enteredCode, setEnteredCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//    const drawerRef = useRef(null);

//   const closeDrawer = () => {
//     if (drawerRef.current) {
//       drawerRef.current.checked = false;
//     }
//   };


//   // Function to generate a random 5-digit code
//   const generateCode = () => Math.floor(10000 + Math.random() * 90000).toString();

//   // Function to send the code via API
//   const sendCodeToEmail = async () => {
//     const code = generateCode();
//     setGeneratedCode(code);

//     try {
//       const response = await fetch("http://localhost:3000/email/api/", {
//         method: "POST",
//         body: JSON.stringify({
//           email: session?.data?.user?.email || user?.email,
//           code,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         toast.success('OTP send to email successfully.')
//         setShowCodePopup(true);
//       } else {
//         alert("Failed to send code. Try again.");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

//   // Function to verify the entered code
//   const verifyCode = () => {
//     if (enteredCode === generatedCode) {
//       setShowCodePopup(false);
//       setShowPasswordPopup(true);
//     } else {
//       alert("Incorrect code. Try again.");
//     }
//   };

//   // Function to update the password
//   const updatePassword = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/update/api/", {
//         method: "POST",
//         body: JSON.stringify({
//           email: session?.data?.user?.email || user?.email,
//           newPassword,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         toast.success("Password updated successfully!");
//         setShowPasswordPopup(false);
//       } else {
//         alert("Failed to update password.");
//       }
//     } catch (error) {
//       console.error("Error updating password:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 relative">
//       {/* Sidebar */}

//       <div className=" w-32 md:w-64 bg-white shadow-lg p-1 mt-2 md:p-6">
//         <div className="text-lg md:text-xl font-bold mb-8">My Account</div>
//         <ul>
//           <li className="mb-4 text-sm md:text-md">
//             <a href="" className="flex items-center text-orange-500 font-semibold">
//               <span className="mr-2">&#128100;</span> Account Info
//             </a>
//           </li>
//           {session?.data?.user?.role === "admin" && (
//             <li className="mb-4 hover:bg-amber-100">
//               <Link href={"/dashboard"}>
//                 <button className="flex items-center text-gray-600 hover:text-orange-500">
//                   <span className="mr-2">&#128682;</span> Dashboard
//                 </button>
//               </Link>
//             </li>
//           )}
//           <li className="mb-4 hover:bg-amber-100">
//             <a href="/myclass" className="flex items-center text-gray-600 hover:text-orange-500">
//               <span className="mr-2">&#128203;</span> My classes
//             </a>
//           </li>
//           <li className="mb-4 hover:bg-amber-100">
//             <a href="/exam" className="flex items-center text-gray-600 hover:text-orange-500">
//               <span className="mr-2">&#128203;</span> My Exams
//             </a>
//           </li>
//           {session?.data?.user?.email || user?.email ? (
//             <li onClick={() => signOut({ callbackUrl: "/" })}>
//               <button className="flex items-center text-gray-600 hover:text-orange-500 hover:bg-amber-100">
//                 <span className="mr-2">&#128682;</span> Logout
//               </button>
//             </li>
//           ) : (
//             <li>
//               <Link href={"/login"}>
//                 <button className="flex items-center text-gray-600 hover:text-orange-500 hover:bg-amber-100">
//                   <span className="mr-2">&#128682;</span> Login
//                 </button>
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 px-2 md:px-10 py-10">
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold">
//             Hello{" "}
//             <span className="text-xl font-medium text-orange-600">
//               {session?.data?.user?.name || user?.name}
//             </span>
//           </h2>
//         </div>

//         {/* Account Details Form */}
//         <div className="bg-white p-2 md:p-8 shadow-lg rounded-lg max-w-4xl">
//           <h3 className="text-lg font-bold mb-4">Account Details</h3>

//           <form>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
//               <div className="mb-4">
//                 <label className="block text-gray-600 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   defaultValue={session?.data?.user?.name || user?.name}
//                   className="w-full p-2 border border-gray-300 rounded bg-gray-100"
//                   readOnly
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-600 mb-2">Email</label>
//                 <input
//                   type="email"
//                   defaultValue={session?.data?.user?.email || user?.email}
//                   className="w-full p-2 border border-gray-300 rounded bg-gray-100"
//                   disabled
//                 />
//               </div>
//             </div>
//               <h1 className="mb-3">User Status : {session?.data?.user?.status || user?.status}</h1>
//             <button
//               type="button"
//               className="btn hover:bg-blue-300"
//               onClick={sendCodeToEmail}
//             >
//               Change Password
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Code Verification Popup */}
//       {showCodePopup && (
//         <div className="popup absolute space-y-4 my-44 ml-20 md:ml-36 lg:ml-80 px-10 py-5 w-80 bg-blue-300 rounded-2xl shadow-2xl">
//           <div className="flex justify-end">
//             <h1 onClick={() => setShowCodePopup(false)} className="bg-black text-white px-2 cursor-pointer rounded-md">X</h1>
//           </div>
//           <h3 className="text-center font-bold">Enter the code sent to your email</h3>
//           <input type="text" className="border-2 rounded-lg py-1 w-full" onChange={(e) => setEnteredCode(e.target.value)} />
//           <button className="btn hover:bg-blue-500" onClick={verifyCode}>Verify</button>
//         </div>
//       )}

//       {/* New Password Popup */}
//       {showPasswordPopup && (
//         <div className="popup space-y-4 absolute my-44 ml-56 lg:ml-80 px-10 py-5 w-80 bg-blue-300 rounded-2xl shadow-2xl">
//           <div className="flex justify-end">
//             <h1 onClick={() => setShowPasswordPopup(false)} className="bg-black text-white px-2">X</h1>
//           </div>
//           <h3 className="text-center font-bold">Enter New Password</h3>
//           <input type="password" className="border-2 rounded-lg py-1 w-full" onChange={(e) => setNewPassword(e.target.value)} />
//           <button className="btn hover:bg-blue-500" onClick={updatePassword}>New Password</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;






// "use client"
// import { signOut, useSession } from 'next-auth/react';
// import React, { useState } from 'react';
// import { useUser } from '../../../context/UserContext';
//  // Import the useRouter hook
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';




// const page = () => {
//     const router = useRouter(); // Initialize the router
//     const  session  = useSession();
//    // console.log('session : ',session?.data?.user);
    
//     const { user } = useUser(); // Access user data from context
//  // console.log('USER : ',user);

//      // State to toggle edit mode
//   const [isEditable, setIsEditable] = useState(false);

//   // Function to toggle edit mode
//   const handleEditToggle = () => {
//     setIsEditable((prevState) => !prevState);
//   };

// const handleLogout = async () => {
//     try {
//       await signOut({ callbackUrl: '/' }); // Redirect to home page after sign out
//     } catch (error) {
//       console.error('Failed to sign out:', error);
//     }
//   };
    
//     return (
//         <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className="w-36 md:w-64 bg-white shadow-lg p-2 md:p-6">
//           <div className="text-xl font-bold mb-8">My Account</div>
//           <ul>
//             <li className="mb-4">
//               <a href="" className="flex items-center text-orange-500 font-semibold">
//                 <span className="mr-2">&#128100;</span> Account Info
//               </a>
//             </li>
//             {
//               session?.data?.user?.role === 'admin' ?  <li className="mb-4">
//              <Link href={'/dashboard'}> <button className="flex items-center text-gray-600 hover:text-orange-500">
//                  <span className="mr-2">&#128682;</span> Dashboard
//                </button></Link>
//              </li>
//              :
//              ""
//             }
//             <li className="mb-4">
//               <a href="/myclass" className="flex items-center text-gray-600 hover:text-orange-500">
//                 <span className="mr-2">&#128203;</span> My classes
//               </a>
//             </li>
            
//             {
//               session?.data?.user.email || user?.email ?  <li onClick={handleLogout}>
//               <button className="flex items-center text-gray-600 hover:text-orange-500">
//                  <span className="mr-2">&#128682;</span> Logout
//                </button>
//              </li>
//              :
//              <li>
//              <Link href={'/login'}><button className="flex items-center text-gray-600 hover:text-orange-500">
//              <span className="mr-2">&#128682;</span> Login
//            </button></Link>
//          </li>
            
//             }
//           </ul>
//         </div>
  
//         {/* Main Content */}
//         <div className="flex-1 p-5 md:p-10">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold">Hello <span className='text-xl font-medium text-orange-600 '>{session?.data?.user.name || user?.name}</span></h2>
//           </div>
  
//           {/* Account Details Form */}
//           <div className="bg-white p-2 md:p-8 shadow-lg rounded-lg max-w-4xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Account Details</h3>
//               <button
//                 onClick={handleEditToggle}
//                 className="text-orange-500 hover:text-orange-600 flex items-center"
//               >
//                 <span className="mr-1">&#9998;</span> {isEditable ? 'Cancel' : 'Edit'}
//               </button>
//             </div>
  
//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
//                 {/* Full Name */}
//                 <div className="mb-4">
//                   <label className="block text-gray-600 mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     defaultValue={session?.data?.user.name || user?.name}
//                     className={`w-full p-2 border border-gray-300 rounded ${isEditable ? 'bg-white' : 'bg-gray-100'}`}
//                     readOnly={!isEditable}
//                   />
//                 </div>
  
  
//                 {/* Email */}
//                 <div className="mb-4">
//                   <label className="block text-gray-600 mb-2">Email</label>
//                   <input
//                     type="email"
//                     defaultValue={session?.data?.user.email || user?.email}
//                     className={`w-full p-2 border border-gray-300 rounded ${isEditable ? 'bg-white' : 'bg-gray-100'}`}
//                     disabled
//                   />
//                 </div>
  
                
//               </div>
//               <button className='btn hover:bg-blue-300'>Change Password</button>
//               {isEditable && (
//                 <div className="mt-6">
//                   <button
//                     type="submit"
//                     className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default page;
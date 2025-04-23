/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import Layout from '@/Components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {


  const [latest, setLatest] = useState([]);
     
   
  useEffect(() => {

    fetchUsers();
  
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard/users/api");
      if (response.data) {
        setLatest(response.data.service);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    const handleBlock = async (id)=> {

      const status = 'block';
    
    try {
      
      const response = await fetch("http://localhost:3000/status/", {
        method: "POST",
        body: JSON.stringify({
           id, status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        toast.success("User blocked successfully!");
        await fetchUsers();
      } else {
        alert("Failed to block user status.");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }

    }

    const handleActive = async (id) => {
      const status = 'active';
      try {
      
        const response = await fetch("http://localhost:3000/status/", {
          method: "POST",
          body: JSON.stringify({
             id, status,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          toast.success("User active successfully!");
          await fetchUsers();
        } else {
          alert("Failed to active user status.");
        }
      } catch (error) {
        console.error("Error updating user status:", error);
      }
             
          };


          const handleDelete = async (id)=> {

           // const status = 'block';
          
          try {
            
            const response = await fetch("http://localhost:3000/delete/", {
              method: "POST",
              body: JSON.stringify({
                 id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (response.ok) {
              toast.success("User deleted successfully!");
              await fetchUsers();
            } else {
              alert("Failed to delete user.");
            }
          } catch (error) {
            console.error("Error updating user status:", error);
          }
      
          }

  return (
    <Layout>
    <div className='min-h-screen'>
    <>
<h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Users</h1>
<div className="overflow-x-auto min-h-[46vh]">
    <table className="table rounded-none bg-[#c3b8cbc1]">
        {/* head */}
        <thead>
            <tr>
            <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">Sl No.</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user avator</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user email</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user Password</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user name</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user Zilla</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user number</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">user status</th>
                <th className="px-[5px] md:px-2 text-stone-950 text-lg font-bold">Action</th>
               
            </tr>
      
      </thead>

        <tbody>
            {
             latest.map((user, index )=> 
                <tr key={user?._id}>
                <td className="px-[5px] md:px-2 font-bold text-lg">{index+1}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg"><img className="w-12 h-12" src={user?.image} alt="" /></td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user?.email}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user.password}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user.name}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user?.zilla}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user?.number}</td>
                <td className="px-[5px] md:px-2 font-bold text-lg">{user?.status}</td>
                
                
                <td className="flex  gap-1 flex-row">
                
                  { user?.status  === 'active' ?
                   
                   <button onClick={()=>handleBlock(user?._id)}
                        className="btn md:mr-2 btn-error">Block</button>
                
                 : "" }
                  
                  
                  { user?.status === 'block' ?
                   
                   <button onClick={()=>handleActive(user?._id)}
                        className="btn md:mr-2 btn-success">Pending</button>
                
                 : "" }

                 { user?.role === 'admin' ? "" : 
                      <button onClick={()=>handleDelete(user?._id)}
                      className="btn md:mr-2 btn-info">Delete</button>
                 }
              
                 
               {/* { user.role == 'customer' ?
                    <button onClick={()=>handleAdmin(user?._id)}
                         className="btn md:mr-2 btn-primary">Admin</button>
                 : "" }  */}

                </td>

            </tr>
              )
          }
        </tbody>  
    </table>

    <h1 className='my-3 text-2xl font-semibold'>Total Users : {latest?.length}</h1>
</div>
</>
    </div>
    </Layout>
  );
};

export default page;
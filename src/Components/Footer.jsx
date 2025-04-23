import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { MdAddCall } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

const Footer = () => {

 
  

    return (
        <div className=' bg-[#0b0719] px-5'>
       
           <footer className="w-full px-5 md:px-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-2 grid  bg-[#0c0a1b]  text-white py-10 border-t-[.5px] border-t-gray-600">
  
  <nav className='space-y-2'>
  {/* <Image className='w-12 h-12' src={logo1} alt='photo'></Image> */}
  <h1 className='text-4xl font-semibold'>Exponential</h1>
  <p>A online platform for admission preparation for DU Tech. Unit.</p>
  <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01575717164</p>
  </nav>                                                                                        
  

  <nav className='space-y-3 flex flex-col pl-0 md:pl-20'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">Online Platform</h6>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">About</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Course</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Instructor</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Events</h2></Link>

  </nav>

  <nav className='space-y-3 flex flex-col pl-0 md:pl-20'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">Links</h6>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Contact Us</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Gallery</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Coming Soon</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Sign In</h2></Link>

  </nav>

  <nav className='space-y-3'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">CONTACT US</h6>
    
     <div className='space-y-3'>
      <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01768403433</p>
      <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01989613436</p>
          <p className='font-medium text-lg text-[#ffffff] flex items-center'><span className='mr-2'><MdMarkEmailRead /></span> <span className='mr-2 text-blue-500'>ahmedtafsir0112@gmail.com</span></p>
     </div>
    
  </nav>

</footer> 
<footer className="w-full flex justify-center mx-auto bg-[#0c0a1b]  text-white py-5 px-5 border-t-[.5px] border-t-gray-600">
  
  
  <p className='text-xl mb-0 '>Copyright © {new Date().getFullYear()} - by <strong className='text-[#5e8cf8]'>Exponential</strong>. All right reserved</p>
   
 
  
</footer>


        </div>
    );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
export default Footer;
/* eslint-disable @next/next/no-img-element */
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay} from 'swiper/modules';
import logo from '../../public/logo-r.png';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useEffect } from 'react';

const Banner = () => {

 useEffect(() => {
    Swal.fire({
      title: '<h1 class="text-3xl font-bold mb-4">Exponential DU</h1>',
      html: `
        <div class="text-left space-y-2 text-[16px] leading-relaxed">
          <p><strong> DU-Technology Unit admission ||ঢাবি প্রযুক্তি ইউনিট  এডমিশন টেস্ট-2025।।। Pre-Admission চলছে।</strong></p>
          <p><strong>ক্লাস শুরু-২০/০৪/২০২৫ থেকে।🔥অফার কিন্তু সীমিত!!!</p>
          <p><strong>🎯 শুধুমাত্র ১২০ টাকায় খুবই স্বল্প মূল্যে তোমাদের জন্য Exponential নিয়ে এসেছে DU-Tech Unit(ঢাবি প্রযুক্তি ইউনিট) ভর্তি প্রস্তুতি কোর্স!</p>
         
        </div>
      `,
      showCloseButton: true,
      confirmButtonText: 'এখনই Enroll করে ফেলো',
      width: '600px',
    });
  }, []);


    return (
      <>
      
        <div className='rounded-sm '>
        <div className='flex flex-col lg:flex-row gap-3'>
            <Swiper autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}  modules={[Autoplay]} className="mySwiper w-full lg:w-[100%] rounded-md">
        <SwiperSlide className='rounded-sm w-full h-[40vh] md:h-[90vh] bg-cover bg-center bg-no-repeat banner1'>
           
            <div className='w-full gap-0 h-[40vh] md:h-[90vh] flex flex-row lg:flex-row justify-center items-center bg-[#0b223dcd]'>
          <div className='w-full flex flex-col justify-center items-center space-y-2 md:space-y-3'>  
            <Image src={logo} alt='logo' className='lg:w-40 lg:h-40 w-24 h-24'></Image>
            <h1 className='text-center md:text-left  text-white font-medium tracking-[.12em] text-3xl md:text-7xl'>Exponential</h1>
            <h1 className='text-center md:text-left  text-white font-medium tracking-[.12em] text-base md:text-xl'>A course for the DU Tech. Unit Admission. </h1>
            <div className='flex flex-col gap-3 md:flex-row'>
            
            <Link href={'/enroll'}><button className='btn bg-white hover:bg-blue-500 hover:text-white border-2 border-white text-blue-500 px-4 md:px-8 text-sm md:text-xl w-28 md:w-52'>Enroll Now</button></Link>
            </div>
            </div>

            
            </div>
        </SwiperSlide>
        
        
        
      </Swiper>

      </div>
    </div>

    
        </>
    );
};

export default Banner;
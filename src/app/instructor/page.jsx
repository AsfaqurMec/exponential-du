import React from 'react';
import Image from 'next/image';
import afif from   '../../../public/afif.jpg'
import tafsir from '../../../public/tafsir.jpg'
const page = () => {
    return (
        <div>
             {/* Our Instructors */}
            
                    <div className='py-10'>
                    <h1 className='text-center text-3xl my-10 font-extrabold underline pb-10'>আমাদের প্রশিক্ষকসমুহ </h1>
                         
                         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-3 justify-center items-center px-20 lg:px-60'>
                            <div className='flex flex-col justify-between items-center'>
                                <Image src={afif} alt='' className='rounded-full w-44 h-44'></Image>
                                <h1 className='text-2xl font-bold'>Afif Sayfee</h1>
                                <h1 className='text-xl font-bold'>Instructor</h1>
                                <h1 className='text-lg font-bold'>Physics & Chemistry</h1>
                                <h1 className='text-base font-bold'>EEE-14 Batch, Session-2021-22</h1>
                            </div>
            
                            <div className='flex flex-col justify-between items-center'>
                                <Image src={tafsir} alt='' className='rounded-full w-44 h-44'></Image>
                                <h1 className='text-2xl font-bold'>Md.Tafsir Ahmed</h1>
                                <h1 className='text-xl font-bold'>Instructor</h1>
                                <h1 className='text-lg font-bold'>English</h1>
                                <h1 className='text-lg font-bold'>&</h1>
                                <h1 className='text-base font-bold'>Digital marketing head,DU-Technology Unit Admission</h1>
                                <h1 className='text-base font-bold'>EEE-14 Batch, Session-2021-22</h1>
                            </div>
            
                            
                         </div>
            
            
                    </div>
        </div>
    );
};

export default page;
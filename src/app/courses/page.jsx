import React from 'react';
import course from '../../../public/course.png'
import Image from 'next/image';

const page = () => {
    return (
        <div>
            {/* Course Section */}
                   <div className='my-5'>
                        <h1 className='text-center text-4xl my-10 font-extrabold underline'>কোর্স সমুহ</h1>
           
                        <div className='w-full flex lg:flex-row flex-col gap-3 lg:gap-7 px-10 lg:px-20'>
                           <div className='lg:w-1/2 w-full'>
                             <Image src={course} alt='fe' className='rounded-md h-auto '></Image>
                           </div>
                           <div className='lg:w-1/2 w-full'>
                               <h1 className='text-2xl md:text-4xl font-bold'>এই কোর্স করার সুবিধাসমুহ :</h1>
                               <ul className='text-base lg:text-lg space-y-3 pt-5 font-medium text-blue-500'>
                                   <li>১।নিজেকে অন্যদের থেকে প্রযুক্তি ইউনিটে.৮০-৮৮% এগিয়ে রাখতে একমাত্র আমাদেরই কোর্স দিচ্ছে সর্বোচ্চ সুবিধা।
                                   </li>
                                   <li>২।এই কোর্সের মাধ্যমে আপনারা ঢাবি প্রযুক্তি ইউনিট এর বিগত সবশেষ ৩ বছরের প্রশ্নব্যাংক এর সমাধান পাচ্ছেন একসাথে।
                                   </li>
                                   <li>৩।মোট ১২টি ক্লাসের মাধ্যমে ৪টি বিষয়ের গুরুত্বপূর্ণ প্রায় সকল প্রশ্নের রয়েছে সমাধান।
                                   </li>
                                   <li>৪।সবথেকে বড় অফার হচ্ছে আমরা দিচ্ছি ৩টি মডের টেস্টের মাধ্যমে ভর্তিযুদ্ধে নামার আগে নিজেকে যাচাই করার সুযোগ।
                                   </li>
                                   <li>৫।স্পেশাল শর্টকাট নিয়মের মাধ্যমে খুব কম সময়ে বেশি উত্তর বের করার জন্য র‍য়েছে ট্রিক্স এন্ড টিপস।
                                   </li>
                                   <li>৬।পরীক্ষায় কাটমার্ক সম্বন্ধে গুরুত্বপূর্ণ ধারনা ও ১টি মাস্টারক্লাস।</li>
                               </ul>
                           </div>
                        </div>
                   </div> 
        </div>
    );
};

export default page;
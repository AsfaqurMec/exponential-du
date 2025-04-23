import Image from 'next/image';
import React from 'react';
import course from '../../public/course.png'
import physics from '../../public/physics.png'
import chemistry from '../../public/chemistry-logo-template-illustration-free-vector.jpg'
import hmath from '../../public/istockphoto-2180374705-612x612.jpg'
import math from '../../public/cartoon-maths-elements-background-education-logo-vector.jpg'
import eng from '../../public/language-english-translation-discipline-education-outline-icon-logo-illustration-222388082.jpg'
import afif from '../../public/afif.jpg'
import tafsir from '../../public/tafsir.jpg'
import Link from 'next/link';
import mess from '../../public/mess.png'
import what from '../../public/whatsapp.png'
import hamim from '../../public/IMG_E4927.jpg'

const Home = () => {
    return (
        <>
        {/* Course Section */}
        <div>
             <h1 className='text-center text-4xl my-10 font-extrabold underline'>কোর্স সমুহ</h1>

             <div className='w-full flex lg:flex-row items-center flex-col gap-3 lg:gap-7 px-5 lg:px-20'>
                <div className='lg:w-1/2 w-full h-full'>
                  {/* <Image src={course} alt='fe' className='rounded-md h-auto '></Image> */}
                  <video src='https://res.cloudinary.com/dwcxnljej/video/upload/v1744979162/du-ex-2_1_1_1_cmtuqu.mp4' className="w-full h-full rounded-sm"
  controls controlsList="nodownload">
                      <source src='/du-ex-2.mp4' type="video/mp4"/>
                </video>
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


             <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-3 px-5 md:px-10 py-10 bg-blue-200 my-5'>
                <h1 className='text-xl font-semibold'>#তাই আর দেরি কেন? এখনই আমাদের কোর্সটি মাত্র ১২০ টাকায় কিনে নিজেকে সবার থেকে এগিয়ে রাখুন।</h1>
                <Link className='flex justify-center' href={'/enroll'}><button className='btn bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-500 hover:border-white text-blue-500 px-4 md:px-8 text-lg md:text-2xl w-32 md:w-52'>Enroll Now</button></Link>
             </div>

        {/* Our Subjects */}

        <div className='mb-20'>
        <h1 className='text-center text-3xl my-10 font-extrabold underline'>আমরা যে বিষয়সমুহে ক্লাস নিচ্ছি</h1>
             
             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-6 justify-center items-center px-5 md:px-20 lg:px-60'>
                <div className='flex flex-col justify-between items-center shadow-lg px-5 py-8 shadow-[#00000093] rounded-sm'>
                    <Image src={physics} alt='' className='rounded-full w-36 h-24'></Image>
                    <h1 className='text-2xl font-bold'>পদার্থবিজ্ঞান</h1>
                </div>

                <div className='flex flex-col justify-between items-center shadow-lg px-5 py-8 shadow-[#00000093] rounded-sm'>
                    <Image src={chemistry} alt='' className='rounded-full w-32 h-24'></Image>
                    <h1 className='text-2xl font-bold'>রসায়ন</h1>
                </div>

                <div className='flex flex-col justify-between items-center shadow-lg px-5 py-8 shadow-[#00000093] rounded-sm'>
                    <Image src={hmath} alt='' className='rounded-full w-32 h-24'></Image>
                    <h1 className='text-2xl font-bold'>উচ্চতর গণিত</h1>
                </div>

                <div className='flex flex-col justify-between items-center shadow-lg px-5 py-8 shadow-[#00000093] rounded-sm'>
                    <Image src={eng} alt='' className='rounded-full w-32 h-24'></Image>
                    <h1 className='text-2xl font-bold'>ইংরেজি</h1>
                </div>

                
             </div>


        </div>


        <div className='bg-blue-100 py-10'>
             <h1 className='text-center text-2xl md:text-4xl mt-10 mb-20 font-extrabold underline'>ঢাবি প্রযুক্তি ইউনিট সম্পর্কে বিস্তারিত ধারনাঃ
             </h1>

             <div className='w-full flex lg:flex-row flex-col gap-10 lg:gap-7 px-5 md:px-10 lg:px-20'>
                <div className='lg:w-1/2 w-full'>
                  <h2 className='text-xl font-semibold'>🔹 ঢাকা বিশ্ববিদ্যালয় প্রযুক্তি ইউনিট – প্রযুক্তির পথে এক ধাপ এগিয়ে! 🔹</h2>
                  <h4 className='text-lg font-medium pt-1'>🚀 তোমার স্বপ্নের ক্যারিয়ার শুরু হোক ঢাকা বিশ্ববিদ্যালয়ের প্রযুক্তি ইউনিট থেকে!
                  </h4>
                  <p className='text-base font-medium pt-3'>ঢাকা বিশ্ববিদ্যালয়ের প্রযুক্তি ইউনিট হলো আধুনিক বিজ্ঞান ও প্রযুক্তির এক নতুন দিগন্ত। এখানে শিক্ষার্থীরা পায় যুগোপযোগী শিক্ষা, উন্নত গবেষণার সুযোগ এবং বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলার দক্ষতা।
                  </p>
                  <h1 className='pt-5 text-xl font-bold'>📌 আবেদনের শেষ সময়: ৭ এপ্রিল ২০২৫
                  </h1>
                  <h1 className='pt-2 text-xl font-bold'>📌 ভর্তি পরীক্ষা: ১৭ মে ২০২৫
                  </h1>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold'>✨ প্রযুক্তি ইউনিটে পড়ার বিশেষ কারণ:</h1>
                    <ul className='text-base lg:text-lg space-y-3 pt-5 font-semibold text-blue-700'>
                        <li>✅ ঢাকা বিশ্ববিদ্যালয়ের মর্যাদাপূর্ণ ডিগ্রি
                        </li>
                        <li>✅ সরকারি খরচে ইঞ্জিনিয়ারিং পড়ার শেষ সুযোগ
                        </li>
                        <li>✅ বি.এস.সি ইন ইঞ্জিনিয়ারিং সার্টিফিকেট
                        </li>
                        <li>✅ দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী
                        </li>
                        <li>✅ প্রযুক্তিখাতে উন্নত ক্যারিয়ারের সম্ভাবনা
                        </li>
                        <li>🚀 এখনই আবেদন করো এবং স্বপ্ন পূরণের পথে এগিয়ে যাও!
                        </li>
                    </ul>
                </div>
             </div>
        </div>







        {/* Our Instructors */}

        <div className='py-10 '>
        <h1 className='text-center text-3xl my-10 font-extrabold underline pb-10'>আমাদের প্রশিক্ষকসমুহ </h1>
             
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-3 justify-center items-center px-5 md:px-20 lg:px-60'>
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
                    <h1 className='text-lg font-bold'>English & Math</h1>
                    
                    <h1 className='text-base font-bold'>Digital marketing head,DU-Technology Unit Admission</h1>
                    <h1 className='text-base font-bold'>EEE-14 Batch, Session-2021-22</h1>
                </div>

                
             </div>


        </div>

        {/* payment process */}

        <section className='py-10 px-5 bg-blue-100'>

          <h1 className='text-center text-3xl my-10 font-extrabold underline pb-10'>পেমেন্ট করার পদ্ধতি</h1>

          <div className='flex flex-col lg:flex-row gap-5'>

            <div className='w-full lg:w-[50%] space-y-3 shadow-xl bg-blue-50 shadow-blue-400 p-5 rounded-sm'>
                <h1 className='text-center mb-8 mt-2 text-4xl font-semibold'>বিকাশ</h1>

                <h1 className='text-lg font-medium'>ধাপ - ১ : মোবাইলের বিকাশ অ্যাপে গিয়ে সেন্ড মানি অপশনে ক্লিক করুন ।</h1>
                <h1 className='text-lg font-medium'>ধাপ - ২ : <strong>০১৫৭৫৭১৭১৬৪</strong> নাম্বারটি ডায়াল করুন ।</h1>
                <h1 className='text-lg font-medium'>ধাপ - ৩ : পরিমাণে <strong>১২০tk</strong> এবং এগিয়ে যান - এ ক্লিক করুন ।</h1>
                <h1 className='text-lg font-medium'>ধাপ - ৪ : রেফারেন্স এ exponential লিখুন এবং পিন নাম্বার লিখুন ।</h1>
                <h1 className='text-lg font-medium'>ধাপ - ৫ : Next এ ক্লিক করে, সেন্ড মানি করতে ট্যাপ করে ধরে রাখুন ।</h1>
                <h1 className='text-lg font-medium'>ধাপ - ৬ : ***সেন্ড মানি হওয়ার পর ট্রানজেকশন ID কপি করে বা ScreenShot নিয়ে আমাদের পেজের মেসেজ অপশন এ সেন্ড করুন ।***</h1>
                 <div className='my-2'>
                     <h1 className='text-2xl font-semibold'>মেসেজ অপশন :</h1>
                        <div className='flex items-center gap-5 py-3'>
                            <Link href={'https://m.me/524912924047862?source=qr_link_share'}><Image src={mess} alt='messenger' width={40} height={40}></Image></Link>
                            <Link href={'https://wa.me/message/ZZPRVDRPFPJ2B1'}><Image src={what} alt='wharsapp' className='rounded-full' width={40} height={40}></Image></Link>
                        </div>
                 </div> 
            </div>

            <div className='w-full lg:w-[50%] space-y-3 shadow-xl bg-blue-50 shadow-blue-400 p-5 rounded-sm'>
            <h1 className='text-center mb-8 mt-5 text-4xl font-semibold'>নগদ</h1>

<h1 className='text-lg font-medium'>ধাপ - ১ : মোবাইলের নগদ অ্যাপে গিয়ে সেন্ড মানি অপশনে ক্লিক করুন ।</h1>
<h1 className='text-lg font-medium'>ধাপ - ২ : <strong>০১৯৮৯৬১৩৪৩৬</strong> নাম্বারটি ডায়াল করুন ।</h1>
<h1 className='text-lg font-medium'>ধাপ - ৩ : পরিমাণে <strong>১২০tk</strong> এবং এগিয়ে যান - এ ক্লিক করুন ।</h1>
<h1 className='text-lg font-medium'>ধাপ - ৪ : রেফারেন্স এ exponential লিখুন এবং পিন নাম্বার লিখুন ।</h1>
<h1 className='text-lg font-medium'>ধাপ - ৫ : Next এ ক্লিক করে, সেন্ড মানি করতে ট্যাপ করে ধরে রাখুন ।</h1>
<h1 className='text-lg font-medium'>ধাপ - ৬ : ***সেন্ড মানি হওয়ার পর ট্রানজেকশন ID কপি করে বা ScreenShot নিয়ে আমাদের পেজের মেসেজ অপশন এ সেন্ড করুন ।***</h1>
<div className='my-2'>
                     <h1 className='text-2xl font-semibold'>মেসেজ অপশন :</h1>
                        <div className='flex items-center gap-5 py-3'>
                            <Link href={'https://m.me/524912924047862?source=qr_link_share'}><Image src={mess} alt='messenger' width={40} height={40}></Image></Link>
                            <Link href={'https://wa.me/message/ZZPRVDRPFPJ2B1'}><Image src={what} alt='wharsapp' className='rounded-full' width={40} height={40}></Image></Link>
                        </div>
                 </div>
            </div>

          </div>

        </section>

         
        <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 md:gap-3 px-5 md:px-10 py-5 bg-blue-200 my-5'>
            <div className='flex flex-col lg:flex-row items-center gap-5'>
                <h1 className='text-xl font-semibold'>This website is Developed by :</h1>
                <div className='flex flex-col items-center'>
                <Image src={hamim} className='rounded-xl' alt='image' width={60} height={60}></Image>
                <h1 className='text-lg font-semibold'>Asfaqur Rahman</h1>
                <h1 className='text-lg font-semibold'>Full Stack Developer</h1>
                </div>
                </div>  
                <Link className='flex justify-center' href={'https://my-portfolio-asfaqur-rahman.web.app/'}><button className='btn bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-500 hover:border-white text-blue-500 px-4 py-5 md:px-8 text-lg md:text-3xl w-32 md:w-52'>Contact</button></Link>
             </div>


        </>
    );
};

export default Home;
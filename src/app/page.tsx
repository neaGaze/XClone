import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BsSearch, BsFillBookmarkFill, BsPeople, BsPersonFill, BsX, BsTwitch, BsTwitter, BsThreeDots } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { HiEnvelope } from 'react-icons/hi2';
import { RiFileListFill } from 'react-icons/ri';
import Link from 'next/link';

const NAVIGATION_ITEMS = [
  {
    title: 'X',
    icon: BsTwitter
  },
  {
    title: "Home",
    icon: AiFillHome
  }, {
    title: "Explore",
    icon: BsSearch
  }, {
    title: "Notifications",
    icon: IoNotifications
  }, {
    title: "Messages",
    icon: HiEnvelope
  }, {
    title: "Lists",
    icon: RiFileListFill
  }, {
    title: "Bookmarks",
    icon: BsFillBookmarkFill
  }, {
    title: "Communities",
    icon: BsPeople
  }, {
    title: "Profile",
    icon: BsPersonFill
  }
]
export const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='max-w-screen-lg w-full h-full flex relative'>
        {/* Left side bard for navigation or header */}
        <section className='fixed w-72 h-full flex flex-col items-stretch '>
          <div className='flex flex-col h-full space-y-4 mt-4'>
            {NAVIGATION_ITEMS.map((item) => (
              <Link className='rounded-3xl py-2 px-4  flex items-center justify-start w-fit space-x-4 hover:bg-white/10 transition duration-200 text-xl'
                href={`/${item.title.toLowerCase()}`} key={item.title}>
                <div>
                  <item.icon />
                </div>
                <div>
                  {item.title !== 'X' && item.title}
                </div>
              </Link>
            ))}
            <button className='bg-primary rounded-3xl py-3 px-6 w-full text-l text-center hover:opacity-90 transition duration-200' name='post'>
              Post
            </button>
          </div>

          <button className='rounded-full space-x-2 m-4 p-2 text-center flex items-center bg-transparent hover:bg-white/10 transition duration-200 w-full justify-between'>
            <div className='flex items-center space-x-2'>
              <div className='bg-slate-400 w-10 h-10 rounded-full'>
              </div>
              <div className='font-sm text-left'>
                <div className='font-semibold'>Nigesh Shakya</div>
                <div className='font-xs text-gray-500'>@neaGaze</div>
              </div>
            </div>

            <div> <BsThreeDots/></div>
          </button>

        </section>
        <section></section>
        <section></section>
      </div>
    </div>
  )
}
export default Home
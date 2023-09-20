import React from 'react'
import { LeftSideBar } from '@/components/LeftSideBar';
import { Tweet } from './Tweet';
import { MainComponent } from './MainComponent';
import { BsSearch } from 'react-icons/bs'

export const Home = () => {
  return (
    <div className='w-full h-full flex relative justify-center items-center '>
      <div className='max-w-screen-xl w-full h-full flex relative'>
        {/* Left side bard for navigation or header */}
        <LeftSideBar />
        <MainComponent />

        <section className='fixed ml-[875px]  h-full w-96 pl-10 pt-2 space-y-4 flex flex-col'>
          <div className='sticky top-0 w-full'>
            <div className='relative w-full h-full'>
              <label htmlFor='search' className="absolute left-4 top-0 w-full h-full flex flex-col items-start justify-center">
                <BsSearch className="text-gray-500"></BsSearch>
              </label>

              <input id='search' type='search' placeholder='Search' className='rounded-full w-full max-w-screen-lg px-12 py-3 outline-none border-none bg-secondary text-sm hover:border-2 hover:border-primary'></input>
            </div>
          </div>
          
          <div className='bg-slate-400'></div>
          <div></div>
          <div></div>
        </section>
      </div>
    </div>
  )
}
export default Home
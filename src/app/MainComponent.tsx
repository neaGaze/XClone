import React from 'react';
import { Tweet } from './Tweet';

export const MainComponent = () => {
  return (
    <main className='ml-[275px]  w-[600px] flex flex-col h-full min-h-screen border-l-[0.5px] border-r-[0.5px] border-opacity-80 border-coolGray-500 pl-0 pr-0'>
          <h1 className='p-6 text-xl font-bold border-b-[0.5px] border-opacity-80 border-coolGray-500 pb-5 pl-5 pt-2 backdrop-blur bg-black/50 sticky top-0'>Home</h1>

          {/* Create tweet section */}
          <div className='px-5 flex items-start flex-col border-b-[0.5px] border-opacity-80 border-coolGray-500'>
            <div className='w-full flex items-center py-2'>
              <div className='bg-slate-400 w-10 h-10 rounded-full' />
              <div className='ml-3 w-full'>
                <input type="text" placeholder="What is happening?!" className='w-full h-full bg-transparent text-2xl placeholder:text-opacity-50  placeholder:text-gray-600 border-none outline-none overflow-visible'></input>
              </div>
            </div>

            <div className='flex items-center w-full justify-between my-2'>
              <div className='w-full'>

              </div>
              <div className='w-full max-w-[80px] justify-items-end'>
                <button className='bg-primary rounded-3xl py-2 px-1 w-full text-l text-center hover:opacity-90 transition duration-200 font-bold' name='post'>
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Tweets */}

          {
            Array.from({ length: 5 }).map((_, i) => (
              <Tweet />
            ))
          }

        </main>
  )
}

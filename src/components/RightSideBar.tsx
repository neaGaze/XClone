import React from 'react'
import { BsDot, BsThreeDots, BsSearch } from 'react-icons/bs'

export const RightSideBar = () => {
    return (
        <section className='fixed ml-[875px] overflow-scroll  h-full w-96 pl-10 pt-0 space-y-4 flex flex-col'>
            <div className='sticky top-0 w-full bg-black py-2'>
                <div className='relative w-full h-full'>
                    <input id='search' type='text' placeholder='Search' className='peer rounded-full w-full max-w-screen-lg px-12 py-3 outline-none bg-zinc-800 text-sm focus:border focus:border-primary focus:bg-black'></input>
                    <label htmlFor='search' className="absolute left-4 top-0 w-full h-full flex flex-col items-start justify-center peer-focus:text-primary">
                        <BsSearch></BsSearch>
                    </label>

                </div>
            </div>

            {/** Subscriber to Premium  */}
            <div className='bg-zinc-900 rounded-2xl p-4 flex flex-col'>
                <h3 className='font-bold text-white text-xl'>Subscribe to Premium</h3>
                <h4 className='font-bold text-white py-2 text-sm'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</h4>
                <button className='bg-primary rounded-3xl py-2 px-5 w-fit text-sm text-center hover:opacity-90 transition duration-200 font-bold' name='post'>
                    Subscribe
                </button>
            </div>

            {/* What's happenings */}
            <div className='bg-zinc-900 rounded-2xl flex flex-col'>
                <h3 className='font-bold text-white text-xl p-4'>What’s Happening</h3>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <div className='flex space-y-2 py-2 px-4 items-start hover:bg-neutral-700/10'>
                            <div className='flex flex-col items-start'>
                                <div className='flex text-xs text-gray-400'>MLB <BsDot /> LIVE </div>
                                <div className='font-bold'>Twins at Reds</div>
                                <div className='text-xs text-gray-400'>3,857 posts</div>
                            </div>
                            <BsThreeDots className="text-xs"></BsThreeDots>
                        </div>
                    ))
                }
                <button className='py-4 px-4 text-primary font-xs flex items-start hover:bg-neutral-700/10'>Show more</button>
            </div>

            {/* Who to Follow */}
            <div className='bg-zinc-900 rounded-2xl flex flex-col w-full space-y-0'>
                <h3 className='font-bold text-white text-xl p-4'>Who to follow</h3>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <div className='flex w-full px-4 py-4 hover:bg-neutral-700/10'>
                            <div className='bg-slate-400 w-10 h-10 rounded-full' />
                            <div className='flex flex-col items-start px-4 w-[60%]'>
                                <div className='font-bold'>Emery Wells</div>
                                <div className='text-sm text-gray-400/50'>@emerywells</div>
                            </div>
                            <div className='flex text-sm py-2'>
                                <button className='rounded-full px-4 bg-white text-black'>Follow</button>
                            </div>
                        </div>
                    ))
                }
                <button className='py-4 px-4 text-primary font-xs flex items-start hover:bg-neutral-700/10'>Show more</button>
            </div>
        </section>
    )
}

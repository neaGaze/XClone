import React from 'react'
import { LeftSideBar } from '@/components/LeftSideBar';
import { Tweet } from './Tweet';
import { MainComponent } from './mainComponent';

export const Home = () => {
  return (
    <div className='w-full h-full flex relative justify-center items-center '>
      <div className='max-w-screen-xl w-full h-full flex relative'>
        {/* Left side bard for navigation or header */}
        <LeftSideBar />
        <MainComponent />

        <section></section>
      </div>
    </div>
  )
}
export default Home
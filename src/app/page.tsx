import React from 'react'
import { LeftSideBar } from '@/components/LeftSideBar';
import { Tweet } from '../components/Tweet';
import { MainComponent } from '../components/MainComponent';
import { RightSideBar } from '@/components/RightSideBar';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { Input } from '@/components/ui/input';

export const dynamic = 'force-dynamic'

export const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase.auth.getUser()

  console.log({ data, error })



  return (

    <div className='w-full h-full flex relative justify-center items-center text-black'>
      {/* <Dialog defaultOpen={error?.status === 401}>
        <DialogContent>
          <Input></Input>
        </DialogContent>
      </Dialog> */}

      <div className='max-w-screen-xl w-full h-full flex relative'>
        {/* Left side bard for navigation or header */}
        <LeftSideBar />
        <MainComponent />
        <RightSideBar />
      </div>
    </div>
  )
}
export default Home
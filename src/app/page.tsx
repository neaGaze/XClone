import React from 'react'
import { LeftSideBar } from '@/components/LeftSideBar';
import { Tweet } from '../components/Tweet';
import { MainComponent } from '../components/MainComponent';
import { RightSideBar } from '@/components/RightSideBar';
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { ED } from '@/components/ED';
import { Toaster } from 'sonner';

export const dynamic = 'force-dynamic'

export const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase.auth.getUser()

  // console.log({ data, error })

  return (
    <>
      <Toaster position='top-center' />
      <ED></ED>

      <div className='w-full h-full flex relative justify-center items-center text-black'>
        <div className='max-w-screen-xl w-full h-full flex relative'>
          {/* Left side bard for navigation or header */}
          <LeftSideBar />
          <MainComponent />
          <RightSideBar />
        </div>
      </div>
    </>
  )
}
export default Home
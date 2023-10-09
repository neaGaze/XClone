'use client'
import { TweetProps } from '@/app/types/Props'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { BsDot, BsPatchCheckFill } from 'react-icons/bs'
import dayjs from 'dayjs'
import { CreateTweet } from './CreateTweet'
import { composeTweet } from '@/app/ServerAction/ComposeTweet'
import { toast } from 'sonner'

export const ReplyComponent = ({ tweet, children }: { tweet: TweetProps, children: any }) => {
  
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmitTweet = async (formData: FormData) => {
    const { data, error } = await composeTweet(formData)
    console.log(data, error);

    (data !== null) ? toast.message(data) : toast.error(error.toString());

    if(data) {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px] border-none">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div>
              <Button>Drafts</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between py-2 border-opacity-80">
          <div className='flex items-start'>
            <div className='flex flex-col items-center'>
              <div className='bg-slate-400 w-10 h-10 rounded-full' />
              <hr className='w-10 h-full rotate-90 mt-6'></hr>
            </div>

            <div className='ml-3 w-full flex flex-col space-y-1 justify-center items-start text-white'>
              <div className='flex items-center space-x-1'>
                <div className='font-bold'>{tweet.profiles?.full_name || "Nigesh Shakya"}</div>
                <div><BsPatchCheckFill className='fill-primary' /></div>
                <div className='text-gray-600'> @{tweet.profiles?.username}</div>
                <div><BsDot /></div>
                <div className='text-gray-600'>{dayjs().from(dayjs(tweet.created_at))}</div>
              </div>
              <div className='text-white text-s'>{tweet.text}</div>
              <div className='font-xs text-gray-500'>Replying to @helloworld</div>
            </div>
          </div>
        </div>

        {/* The actual reply component */}
        <div className='px-0 flex items-start flex-col  border-r-accent-foreground'>
          <form action={handleSubmitTweet} className='w-full'>
            <div className='w-full flex items-center py-2'>
              <div className='bg-slate-400 w-10 h-10 rounded-full' />
              <div className='ml-3 w-full'>
                <input type="text" name="tweet" placeholder="Post your Reply" className='w-full h-full bg-transparent text-s text-white placeholder:text-opacity-50 placeholder:text-xl placeholder:text-gray-400 border-none outline-none overflow-visible'></input>
              </div>
            </div>

            <div className='flex items-center w-full justify-between my-2'>
              <div className='w-full'>
                <input name="reply_to_tweet_id" type='text' className='hidden' value={tweet.id} readOnly></input>
              </div>
              <div className='w-full max-w-[80px] justify-items-end'>
                <button className='bg-primary rounded-3xl py-2 px-1 w-full text-l text-center hover:opacity-90 transition duration-200 font-normal' name='post_tweet' type='submit'>
                  Reply
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <DialogFooter>

        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

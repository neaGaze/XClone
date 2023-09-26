'use client'
import { composeTweet } from '@/app/ServerAction/ComposeTweet';
import { PostgrestError } from '@supabase/supabase-js';
import React, { useRef } from 'react'
import { toast } from 'sonner';

export const CreateTweet = () => {

    const ref = useRef<HTMLFormElement>(null)

    const handleSubmitTweet = async (formData: FormData) => {

        ref.current?.reset()

        const { data, error } = await composeTweet(formData)
        console.log(data, error);

        (data !== null) ? toast.message(data) : toast.error(error.toString());
    }

    return (
        <div className='px-5 flex items-start flex-col border-b-[0.5px] border-opacity-80 border-r-accent-foreground border-gray-500/50'>
            <form action={handleSubmitTweet} ref={ref} className='w-full'>
                <div className='w-full flex items-center py-2'>
                    <div className='bg-slate-400 w-10 h-10 rounded-full' />
                    <div className='ml-3 w-full'>
                        <input type="text" name="tweet" placeholder="What is happening?!" className='w-full h-full bg-transparent text-2xl placeholder:text-opacity-50  placeholder:text-gray-600 border-none outline-none overflow-visible'></input>
                    </div>
                </div>

                <div className='flex items-center w-full justify-between my-2'>
                    <div className='w-full'>

                    </div>
                    <div className='w-full max-w-[80px] justify-items-end'>
                        <button className='bg-primary rounded-3xl py-2 px-1 w-full text-l text-center hover:opacity-90 transition duration-200 font-normal' name='post_tweet' type='submit'>
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

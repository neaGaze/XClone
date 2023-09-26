import React from 'react';
import { Tweet } from './Tweet';
// import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { composeTweet } from '@/app/ServerAction/ComposeTweet';
import { PostgrestError } from '@supabase/supabase-js';
import { CreateTweet } from './CreateTweet';

export const MainComponent = () => {

  return (
    <main className='ml-[275px]  w-[600px] flex flex-col h-full min-h-screen border-l-[0.5px] border-r-[0.5px] border-opacity-80 border-gray-500/50 pl-0 pr-0 text-white'>
      <h1 className='p-6 text-xl font-bold border-b-[0.5px] border-opacity-80 border-gray-500/50 pb-5 pl-5 pt-2 backdrop-blur bg-black/50 sticky top-0'>Home</h1>

      {/* Create tweet section */}
      <CreateTweet/>

      {/* Tweets */}

      {
        Array.from({ length: 5 }).map((_, i) => (
          <Tweet />
        ))
      }

    </main>
  )
}

'use client'
import { fetchTweet } from '@/app/services/fetchTweet'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Tweet } from './Tweet'
import { TweetsProps } from '@/app/types/Props'



export const DisplayTweet = async ({ tweets }: TweetsProps) => {

    return (
        <>
            {
                tweets?.map((tweet, i) => (
                    <Tweet key={i} tweet={tweet}/>
                ))
            }
        </>
    )
}

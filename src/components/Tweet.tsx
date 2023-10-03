'use client'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { FaRegComment, FaRetweet } from 'react-icons/fa6'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { IoShareOutline, IoStatsChart } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { VscGraph } from 'react-icons/vsc'
import { BsPatchCheckFill } from 'react-icons/bs'
import { TweetLikeProps, TweetProps } from '@/app/types/Props'
import dayjs from 'dayjs'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { likeTweet } from '@/app/services/mutation'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const TWEET_INTERACTIONS = [
    {
        icon: FaRegComment,
        value: "3",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" }
    },
    {
        icon: AiOutlineRetweet,
        value: "77",
        styles: { text_hover: "group-hover:text-green-500", icon_bg_hover: "group-hover:bg-green-500/25" }
    },
    {
        icon: AiOutlineHeart,
        value: "300",
        styles: { text_hover: "group-hover:text-red-500", icon_bg_hover: "group-hover:bg-red-500/25" }
    },
    {
        icon: IoStatsChart,
        value: "51.1K",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" }
    },
    {
        icon: IoShareOutline,
        value: "",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" }
    }
]

export const Tweet = ({ tweet }: TweetProps) => {

    // const [optimisticMessages, addOptimisticMessage] = useOptimistic<TweetLikeProps>(
        
    // )

    return (
        <div className='flex justify-between py-2 px-5 border-b-[0.5px] border-opacity-80 border-gray-500/50'>
            <div className='flex items-start w-full'>
                <div className='bg-slate-400 w-10 h-10 rounded-full' />
                <div className='ml-3 w-full flex flex-col space-y-1 justify-center items-start text-white'>
                    <div className='flex items-center space-x-1'>
                        <div className='font-bold'>{tweet.profiles.name || "Nigesh Shakya"}</div>
                        <div><BsPatchCheckFill className='fill-primary' /></div>
                        <div className='text-gray-600'> @{tweet.profiles.username}</div>
                        <div><BsDot /></div>
                        <div className='text-gray-600'>{dayjs().from(dayjs(tweet.created_at))}</div>
                    </div>
                    <div className='text-white text-s'>{tweet.text}</div>
                    <div className='bg-slate-400 aspect-square w-full h-96 rounded-xl'>

                    </div>
                    <div className='w-full mt-2 flex items-center space-x-0 justify-between from-neutral-50 text-gray-500'>
                        {TWEET_INTERACTIONS.map((item) => (
                            <form>
                                <button type='submit' className='flex space-x-0 items-center group'>
                                    <div className={`${item.styles.text_hover} ${item.styles.icon_bg_hover} w-8 h-8 flex items-center justify-center mr-2 rounded-full `}> <item.icon /> </div>
                                    <div> <text className={`w-2 h-2 text-xs font-bold ${item.styles.text_hover}`}>{item.value}</text></div>
                                </button>
                            </form>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
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
import { likeTweet } from '@/app/ServerAction/LikeTweet'
import supabase from '@/app/common/supabase'
import { getLoggedInUser } from '@/app/services/fetchTweet'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const TWEET_INTERACTIONS = [
    {
        name: "comment",
        icon: FaRegComment,
        value: () => "3",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" },
        action: () => {}
    },
    {
        name: "retweet",
        icon: AiOutlineRetweet,
        value: () => "77",
        styles: { text_hover: "group-hover:text-green-500", icon_bg_hover: "group-hover:bg-green-500/25" },
        action: () => {}
    },
    {
        name: "like",
        icon: AiOutlineHeart,
        value: (likes: []) => likes.length > 0 ? likes.length : "",
        styles: { text_hover: "group-hover:text-red-500", icon_bg_hover: "group-hover:bg-red-500/25" },
        action: likeTweet
    },
    {
        name: "stats",
        icon: IoStatsChart,
        value: () => "51.1K",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" },
        action: () => {}
    },
    {
        name: "share",
        icon: IoShareOutline,
        value: () => "",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25" },
        action: () => {}
    }
]

export const Tweet = ({ tweet, user }: { tweet: TweetProps, user: any }) => {

    // const [optimisticMessages, addOptimisticMessage] = useOptimistic<TweetLikeProps>(
    // )
    const [likeToggle, setLikeToggle] = useState(false);

    useEffect(() => {
        console.log("Logged In User: ", JSON.stringify(user));
    })

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
                            <form name={item.name} action={item.action}>
                                <input type='checkbox' name="likeCheckbox" className='hidden' checked={likeToggle} onChange={() => setLikeToggle(!likeToggle)}/>
                                <input type="text" name="like_value" className='hidden' readOnly value={ !(tweet.likes.map((like: TweetLikeProps) => like.user_id).includes(user.id)) }/>
                                <input type="text" name="tweet_id" className='hidden' readOnly value={tweet.id} />
                                <button type='submit' name="likeunlikebutton" className='flex space-x-0 items-center group'>
                                    <div className={`${item.styles.text_hover} ${item.styles.icon_bg_hover} w-8 h-8 flex items-center justify-center mr-2 rounded-full `}> <item.icon /> </div>
                                    <div> <text className={`w-2 h-2 text-xs font-bold ${item.styles.text_hover}`}>{ item.value(tweet.likes) }</text></div>
                                </button>
                            </form>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

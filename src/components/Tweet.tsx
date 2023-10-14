'use client'
import React, { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import { FaCommentAlt } from 'react-icons/fa'
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { IoShareOutline, IoStatsChart } from 'react-icons/io5'
import { BsPatchCheckFill } from 'react-icons/bs'
import { TweetLikeProps, TweetProps } from '@/app/types/Props'
import dayjs from 'dayjs'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { likeTweet } from '@/app/ServerAction/LikeTweet'
import { ReplyComponent } from './ReplyComponent'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const TWEET_INTERACTIONS = [
    {
        name: "comment",
        icon: { fill_icon: FaCommentAlt, empty_icon: FaRegComment },
        value: (replies: []) => replies.length > 0 ? replies.length : "",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25", icon_fill_color: "text-blue-500" },
        action: () => { }
    },
    {
        name: "retweet",
        icon: { fill_icon: AiOutlineRetweet, empty_icon: AiOutlineRetweet },
        value: () => "",
        styles: { text_hover: "group-hover:text-green-500", icon_bg_hover: "group-hover:bg-green-500/25", icon_fill_color: "text-green-500" },
        action: () => { }
    },
    {
        name: "like",
        icon: { fill_icon: AiFillHeart, empty_icon: AiOutlineHeart },
        value: (likes: []) => likes.length > 0 ? likes.length : "",
        styles: { text_hover: "group-hover:text-red-500", icon_bg_hover: "group-hover:bg-red-500/25", icon_fill_color: "text-red-500" },
        action: likeTweet
    },
    {
        name: "stats",
        icon: { fill_icon: IoStatsChart, empty_icon: IoStatsChart },
        value: () => "",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25", icon_fill_color: "text-blue-500" },
        action: () => { }
    },
    {
        name: "share",
        icon: { fill_icon: IoShareOutline, empty_icon: IoShareOutline },
        value: () => "",
        styles: { text_hover: "group-hover:text-blue-500", icon_bg_hover: "group-hover:bg-blue-500/25", icon_fill_color: "text-blue-500" },
        action: () => { }
    }
]
/**
 * To select a style based on the logic required
 * 
 * @param predicate The logic to use to determine whether to show the style or no
 * @param item the item inside the TWEET_INTERACTION
 * @param tweet the Tweet component itself
 */
const style_picker = (likePredicate: boolean, replyPredicate: boolean, item: any, tweet: TweetProps) => {
    if (item.name === "like") {
        return likePredicate ? <item.icon.fill_icon className={`${item.styles.icon_fill_color}`} /> : <item.icon.empty_icon className="text-gray-500" />
    } else if (item.name === 'comment') {
        return (
            <ReplyComponent tweet={tweet}>
                {replyPredicate ? <item.icon.fill_icon className={`${item.styles.icon_fill_color}`} /> : <item.icon.empty_icon className="text-gray-500" />}
            </ReplyComponent>)
    }

    return <item.icon.empty_icon className="text-gray-500" />
}

export const Tweet = ({ tweet, user }: { tweet: TweetProps, user: any }) => {

    const [tweetLikes, setTweetLikes] = useState([])
    const [tweetReplied, setTweetReplied] = useState("")
    const [likeToggle, setLikeToggle] = useState("");

    const [optimisticTweetLike, addOptimisticTweetLike] = useOptimistic<TweetLikeProps[]>(
        tweetLikes,
        (state: TweetLikeProps[], new_tweet_like: TweetLikeProps) => [...state, new_tweet_like]
    )

    useEffect(() => {
        // console.log("Logged In User: ", JSON.stringify(user.user));
        // console.log(`TWEET LIKES DISPLAY: ${JSON.stringify(tweetLikes.map((like: TweetLikeProps) => like.user_id))}`)
        // console.log(`LikeToggle status: ${(tweetLikes.map((like: TweetLikeProps) => like.user_id).includes(user.user.id))}`)

        console.log(`TWEET: ${JSON.stringify(tweet)}`)
        setTweetLikes(tweet.likes);
        setTweetReplied((tweet.replies.length > 0) ? `${tweet.replies.length}` :  "")
        setLikeToggle((tweetLikes.length > 0 && (!!tweetLikes.some((like: TweetLikeProps) => like?.user_id == user.user.id)) ) ? tweetLikes[0].id : "");
    }, [tweet, user, tweetLikes, tweetReplied, likeToggle, setTweetLikes, setTweetReplied, setLikeToggle])

    return (
        <div className='flex justify-between py-2 px-5 border-b-[0.5px] border-opacity-80 border-gray-500/50'>
            <div className='flex items-start w-full'>
                <div className='bg-slate-400 w-10 h-10 rounded-full' />
                <div className='ml-3 w-full flex flex-col space-y-1 justify-center items-start text-white'>
                    <div className='flex items-center space-x-1'>
                        <div className='font-bold'>{tweet.profiles?.full_name || "Nigesh Shakya"}</div>
                        <div><BsPatchCheckFill className='fill-primary' /></div>
                        <div className='text-gray-600'> @{tweet.profiles?.username}</div>
                        <div><BsDot /></div>
                        <div className='text-gray-600'>{dayjs().from(dayjs(tweet.created_at))}</div>
                    </div>
                    <div className='text-white text-s'>{tweet.text}</div>
                    <div className='bg-slate-400 aspect-square w-full h-96 rounded-xl'>

                    </div>
                    <div className='w-full mt-2 flex items-center space-x-0 justify-between from-neutral-50 text-gray-500'>
                        {TWEET_INTERACTIONS.map((item, i) => (
                            <form key={i} name={item.name} action={item.action}>
                                <input type='checkbox' name="likeCheckbox" className='hidden' checked={!!likeToggle} onChange={() => setLikeToggle(!likeToggle)} />
                                <input type="text" name="like_value" className='hidden' readOnly value={likeToggle} />
                                <input type="text" name="tweet_id" className='hidden' readOnly value={tweet.id} />
                                <button type='submit' name="likeunlikebutton" className='flex space-x-0 items-center group'>
                                    <div className={`${item.styles.text_hover} ${item.styles.icon_bg_hover} w-8 h-8 flex items-center justify-center mr-2 rounded-full`}>
                                        {
                                            style_picker(!!likeToggle, !!tweetReplied, item, tweet)
                                        }
                                    </div>
                                    <div>
                                        <text className={`w-2 h-2 text-xs font-bold ${item.styles.text_hover} ${(item.name === 'like' && likeToggle) ? item.styles.icon_fill_color : 'text-gray-500'}`}>{item.value(tweetLikes)}</text>
                                    </div>
                                </button>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
import { Tweet } from './Tweet'
import { TweetLikeProps, TweetProps, TweetUpdateProps, TweetsProps } from '@/app/types/Props'
import supabase from '@/app/common/supabase'
import { experimental_useOptimistic as useOptimistic } from 'react'


const update_state = (tweets: TweetProps[], new_tweet: TweetUpdateProps) => {
    const new_tweets: TweetProps[] = []

    tweets.forEach((tweet) => {
        if (tweet.id === new_tweet.id) {
            tweet.text = new_tweet.text
        }
        new_tweets.push(tweet)
    })
    console.log("Updating the tweets")
    return new_tweets;
}

const update_tweet_likes = (tweets: TweetProps[], payload: { new: TweetLikeProps, old: TweetLikeProps }, event_type: string) => {
    // console.log(`NEW LIKE: ${JSON.stringify(new_like)}`)
    const new_like = payload.new
    const old_like = payload.old

    const new_tweets: TweetProps[] = []

    tweets.forEach(tweet => {
        if(new_like.tweet_id === tweet.id) {
            if(event_type === "INSERT") {
                tweet.likes.push(new_like)
            }
        }

        if(event_type === "DELETE") {
            console.log(`Like ID to delete found at ${tweet.likes.findIndex(l => l.id === old_like.id)}`)
            tweet.likes.splice(tweet.likes.findIndex(l => l.id === old_like.id))
        }
        
        new_tweets.push(tweet)
    })
    console.log(`Updating tweets state due to like subscriber change as ${JSON.stringify(tweets)}`)
    return new_tweets;
}

export const DisplayTweet = ({ tweets, user }: { tweets: TweetProps[], user: any }) => {

    const [tweetMessages, setTweetMessages] = useState(tweets)

    // const [optimisticTweets, addOptimisticTweets] = useOptimistic<TweetProps[]>(
    //     tweets,
    //     (state, new_tweet: TweetProps) => {
    //         return [..., new_tweet]
    //     }
    // )
    
    useEffect(() => {
        // console.log(`Logged in User in client: ${JSON.stringify(user)}`)

        const tweet_subscriber_channel = supabase
            .channel('realtime_tweet_subscription')
            .on('postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'tweets',
                    filter: `id=in.(${tweets?.map((t: any) => t.id)})`
                },
                (payload: any) => {
                    console.log(`payload on realtime change: ${JSON.stringify(payload)}`)
                    setTweetMessages(update_state(tweetMessages, payload.new as TweetUpdateProps))
                }).subscribe()

        const likes_subscriber_channel = supabase
            .channel('realtime_like_subscription')
            .on('postgres_changes',
                {
                    event: "*",
                    schema: "public",
                    table: "likes",
                    filter: `tweet_id=in.(${tweets.map((t: any) => t.id)})`
                },
                (payload: any) => {
                    console.log(`payload on realtime like subscription change: ${JSON.stringify(payload)}`)
                    setTweetMessages(update_tweet_likes(tweetMessages, payload as { new: TweetLikeProps, old: TweetLikeProps }, payload.eventType))
                }
            ).subscribe()

        return () => {
            supabase.removeChannel(tweet_subscriber_channel);
            supabase.removeChannel(likes_subscriber_channel);
        }
    }, [supabase, tweetMessages, setTweetMessages])

    return (
        <>
            {
                tweetMessages?.map((tweet, i) => (
                    <Tweet key={i} tweet={tweet} user={user} />
                ))
            }
        </>
    )
}

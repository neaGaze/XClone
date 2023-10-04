'use client'
import React, { useEffect, useState } from 'react'
import { Tweet } from './Tweet'
import { TweetProps, TweetUpdateProps, TweetsProps } from '@/app/types/Props'
import supabase from '@/app/common/supabase'


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

export const DisplayTweet = ({ tweets }: { tweets: TweetProps[] }) => {

    const [tweetMessages, setTweetMessages] = useState(tweets)

    useEffect(() => {

        const channel = supabase
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

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, tweetMessages, setTweetMessages])

    return (
        <>
            {
                tweetMessages?.map((tweet, i) => (
                    <Tweet key={i} tweet={tweet} />
                ))
            }
        </>
    )
}

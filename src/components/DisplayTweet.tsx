'use client'
import React, { useEffect, useState } from 'react'
import { Tweet } from './Tweet'
import { TweetLikeProps, TweetProps, TweetReplyProps, TweetUpdateProps, TweetsProps } from '@/app/types/Props'
import supabase from '@/app/common/supabase'
import { Button } from './ui/button'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

const TweetSelector = 
`
id,
text,
created_at,
profiles (
  username,
  full_name
),
likes (
  id,
  user_id
),
replies!tweet_id (
  id,
  user_id,
  reply_id
)
`

const fetchTweetById = async (supabase: SupabaseClient, tweetId: string) => {
    const { data, error } = await supabase.from('tweets')
      .select(TweetSelector)
      .eq('id', tweetId)
      .order('created_at', { ascending: false })
      .returns<TweetProps[]>()
  
    if (error) {
      console.error(`Error fetching tweets: ${error?.message}`)
      return []
    }
  
    if(data.length === 0) {
      console.error(`Empty result given by server. The tweet with ID ${tweetId} is not found.`)
      return []
    }
    
    console.log("TWEET By ID: ", data)
    return data
  }

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

    console.log(`BEFORE >> Updating tweets state due to like subscriber change as ${JSON.stringify(tweets)}`)
    tweets.forEach(tweet => {
        if (new_like.tweet_id === tweet.id) {
            if (event_type === "INSERT") {
                tweet.likes.push(new_like)
            }
        }

        if (event_type === "DELETE") {
            console.log(`Like ID to delete found at ${tweet.likes.findIndex(l => l.id === old_like.id)}`)
            // tweet.likes.splice(tweet.likes.findIndex(l => l.id === old_like.id))
            tweet.likes = tweet.likes.filter((l, i) => l.id !== old_like.id)
        }

        new_tweets.push(tweet)
    })
    console.log(`AFTER >> Updating tweets state due to like subscriber change as ${JSON.stringify(new_tweets)}`)
    return new_tweets;
}

const mergeTweets = (tweetMessages: TweetProps[], outstandingTweetMessages: TweetProps[]) : TweetProps[] => {
    
    const merged_tweets = [...outstandingTweetMessages] as TweetProps[]
    const hash_tweet_ids: Record<string, TweetProps> = {};
    outstandingTweetMessages.forEach(tweetMessage => { 
        hash_tweet_ids[tweetMessage.id] = tweetMessage;
    })
    tweetMessages.forEach(m => {
        if(!(m.id in hash_tweet_ids)) {
            merged_tweets.push(m)
        }
    })
    const sorted_merged_tweets = merged_tweets.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    // [...tweetMessages, ...outstandingTweetMessages].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as TweetProps[]
    
    return sorted_merged_tweets
}

export const DisplayTweet = ({ tweets, user }: { tweets: TweetProps[], user: any }) => {

    const [tweetMessages, setTweetMessages] = useState(tweets)
    const [outstandingTweetMessages, setOutstandingTweetMessages] = useState([] as TweetProps[])

    // const [optimisticTweets, addOptimisticTweets] = useOptimistic<TweetProps[]>(
    //     tweets,
    //     (state, new_tweet: TweetProps) => {
    //         return [..., new_tweet]
    //     }
    // )

    const resetOutstandingTweets = (e: any) => setOutstandingTweetMessages([] as TweetProps[]);

    useEffect(() => {
        // console.log(`Logged in User in client: ${JSON.stringify(user)}`)

        const tweet_update_subscriber_channel = supabase
            .channel('realtime_tweet_update_subscription')
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

        const tweet_create_subscriber_channel = supabase
            .channel('realtime_tweet_create_subscription')
            .on('postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'tweets'
                },
                async (payload) => {
                    console.log(`payload on TWEET CREATE realtime change: ${JSON.stringify(payload)}`)
                    const new_tweet = payload.new as TweetUpdateProps;
                    const updated_new_tweets = await fetchTweetById(supabase, new_tweet?.id) 
                    if(updated_new_tweets.length > 0) {
                        console.log(`Found the tweet from DB after realtime update fetch: ${JSON.stringify(updated_new_tweets)}`)
                        setOutstandingTweetMessages([...outstandingTweetMessages, updated_new_tweets[0]])
                    } else console.error(`Expected the db to have tweetID: ${new_tweet?.id} but wasn't found`);
                }).subscribe()

            const tweet_replies_subscriber_channel = supabase
                .channel('realtime_tweet_replies_subscription')
                .on('postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'replies',
                        filter: `tweet_id=in.(${tweets.map((t: any) => t.id)})`
                    },
                    async (payload) => {
                        console.log(`payload on TWEET REPLIES realtime change: ${JSON.stringify(payload)}`)
                        const new_reply = payload.new as TweetReplyProps;
                        const updated_new_replies = await fetchTweetById(supabase, new_reply?.tweet_id) 
                        if(updated_new_replies.length > 0) {
                            console.log(`Found the tweet replies from DB after realtime update fetch: ${JSON.stringify(updated_new_replies)}`)
                            setOutstandingTweetMessages([...outstandingTweetMessages, updated_new_replies[0]])
                        } else console.error(`Expected the db to have tweetID: ${new_reply?.tweet_id} but wasn't found`);
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

        // Resets the outstanding tweets
        window.addEventListener("beforeunload", resetOutstandingTweets)

        return () => {
            supabase.removeChannel(tweet_update_subscriber_channel);
            supabase.removeChannel(tweet_create_subscriber_channel);
            supabase.removeChannel(tweet_replies_subscriber_channel);
            supabase.removeChannel(likes_subscriber_channel);
            window.removeEventListener("beforeunload", resetOutstandingTweets)
        }
    }, [tweets, tweetMessages, outstandingTweetMessages, setTweetMessages, setOutstandingTweetMessages])

    return (
        <>
            {
                (outstandingTweetMessages.length > 0) ?
                    (<Button onClick={(e) => {
                        setTweetMessages(mergeTweets(tweetMessages, outstandingTweetMessages))
                        resetOutstandingTweets(e)
                    }} className='text-primary bg-transparent border-y-[0.5px] border-opacity-80 border-gray-500/50 py-6 text-sm font-normal hover:bg-transparent'>Show {outstandingTweetMessages.length} posts</Button>)
                    : <></>
            }
            {
                tweetMessages?.map((tweet, i) => (
                    <Tweet key={i} tweet={tweet} user={user} />
                ))
            }
        </>
    )
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { TweetProps, TweetsProps } from "../types/Props"

export const fetchTweet = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.from('tweets').select(`
      id,
      text,
      created_at,
      profiles (
        username,
        full_name
      ),
      likes (
        user_id
      )
    `)
    .order('created_at', { ascending: false })
    .returns<TweetProps[]>()

    console.log("TWEETS: ", data)
    return data
}

export const likesSubscriber = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: likes, error } = await supabase.from('likes').on('INSERT', (payload) => {

  }).subscribe()
}

export const tweetSubscriber = async () => {
  const supabase = createServerComponentClient({ cookies })
  const channel = await supabase
  .channel('realtime_tweet_subscription')
  .on('postgres_changes', 
  {
      event: 'INSERT',
      schema: 'public',
      table: 'tweets'
  }, 
  (payload: any) => {
      console.log(`payload on realtime change 2 in server: ${payload}`)
  }).subscribe()
}
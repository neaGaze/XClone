import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { TweetProps, TweetsProps } from "../types/Props"
import { Database } from "@/lib/database.types"

export const getLoggedInUser = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase.auth.getUser()
  return data
}


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

export const fetchAllTweet = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('tweets').select(TweetSelector)
    .order('created_at', { ascending: false })
    .returns<TweetProps[]>()

  if (error) {
    console.error(`Error fetching tweets: ${error?.message}`)
    return []
  }
  console.log("TWEETS: ", data)
  return data
}

export const fetchTweetById = async (tweetId: string) => {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('tweets')
    .select(TweetSelector)
    .eq('id', tweetId)
    .order('created_at', { ascending: false })
    .returns<TweetProps[]>()

  if (error) {
    console.error(`Error fetching tweets: ${error?.message}`)
    return []
  }
  console.log("TWEET By ID: ", data)
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
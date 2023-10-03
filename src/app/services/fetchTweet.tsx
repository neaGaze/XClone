import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { TweetProps, TweetsProps } from "../types/Props"

export const fetchTweet = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.from('tweets').select(`
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
    .returns<TweetsProps>()

    console.log("TWEETS: ", data)
    return data
}

export const likesSubscriber = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: likes, error } = await supabase.from('likes').on('INSERT', (payload) => {

  }).subscribe()
}
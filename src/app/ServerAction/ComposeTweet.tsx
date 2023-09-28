'use server'
import { Database } from '@/lib/database.types'
import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { toast } from 'sonner'

// const supabase = createServerActionClient<Database>({ cookies })


export async function composeTweet(formData: FormData) {
  const tweet = formData.get('tweet')
  // const supabase = createRouteHandlerClient({ cookies })
  const supabase = createServerComponentClient({ cookies })

  const user = await supabase.auth.getUser()
  const profile = user.data.user
  console.log("supabase client: ", profile?.email)

  if (!tweet) {
    return { data: null, error: "Tweet couldn't be found" }
  }

  const { data, error } = await supabase.from('tweets').insert({ id: randomUUID(), user_id: profile?.id, text: tweet })
  console.log("Sending ", tweet, " by ", profile?.email)
  if (error) {
    return { data: null, error: error }
  }

  revalidatePath('/');

  return { data: "Tweet successfully sent" }
}
export type UserProps = {
    username: string;
    full_name: string | null;
}

export type TweetProps = {
    text: string;
    created_at: string;
    profiles: UserProps;
}

export type TweetsProps = {
    tweets: TweetProps[] | null;
}

export type TweetLikeProps = {
    user_id: number;
    tweet_id: number
}
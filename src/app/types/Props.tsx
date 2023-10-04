export type UserProps = {
    username: string;
    full_name: string | null;
}

export type TweetProps = {
    id: string,
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

export type TweetUpdateProps = {
    created_at: Date,
    updated_at: Date,
    text: string,
    user_id: string,
    id: string
}
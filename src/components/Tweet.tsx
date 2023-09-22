import React from 'react'
import { BsDot } from 'react-icons/bs'
import { FaRegComment, FaRetweet } from 'react-icons/fa6'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { IoShareOutline, IoStatsChart } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { VscGraph } from 'react-icons/vsc'
import { BsPatchCheckFill } from 'react-icons/bs'

const TWEET_INTERACTIONS = [
    {
        icon: FaRegComment,
        value: "3"
    },
    {
        icon: AiOutlineRetweet,
        value: "77"
    },
    {
        icon: AiOutlineHeart,
        value: "300"
    },
    {
        icon: IoStatsChart,
        value: "51.1K"
    },
    {
        icon: IoShareOutline,
        value: ""
    }
]

export const Tweet = () => {
    return (
        <div className='flex justify-between py-2 px-5 border-b-[0.5px] border-opacity-80 border-coolGray-500'>
            <div className='flex items-start'>
                <div className='bg-slate-400 w-10 h-10 rounded-full' />
                <div className='ml-3 w-full flex flex-col space-y-1 justify-center items-start'>
                    <div className='flex items-center space-x-1'>
                        <div className='font-bold'>Dr Jordan Peterson</div>
                        <div><BsPatchCheckFill className='fill-primary' /></div>
                        <div className='text-gray-600'> @jordanbpeterson</div>
                        <div><BsDot /></div>
                        <div className='text-gray-600'>11m</div>
                    </div>
                    <div className='text-white text-s'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, repellat aliquid quas odit dolore eaque recusandae inventore ex, facilis culpa fugiat aspernatur deleniti omnis atque totam debitis dolor maxime, nobis fuga eius iure. Corrupti provident, iure veritatis eius ea facilis debitis sequi quis aspernatur in ad odit cupiditate autem veniam impedit. Omnis nostrum mollitia unde sapiente nihil nobis nam placeat sunt est, aliquid autem earum voluptatibus molestias neque sit, blanditiis soluta ab in. Libero voluptatem cupiditate deserunt cum eum repellendus dolore, aperiam eos. Omnis adipisci dolorem, atque magni culpa in iste sint ratione voluptate rerum labore, eligendi molestiae, quas veniam.</div>
                    <div className='bg-slate-400 aspect-square w-full h-96 rounded-xl'>

                    </div>
                    <div className='w-full mt-2 flex items-center space-x-0 justify-between from-neutral-50 text-gray-500'>
                        {
                            TWEET_INTERACTIONS.map((item) => (
                                <div className='flex space-x-0 items-center'>
                                    <div className='w-6 h-6 flex items-center mr-2'> <item.icon /> </div>
                                    <div> <text className='w-2 h-2 text-xs font-bold'>{item.value}</text></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

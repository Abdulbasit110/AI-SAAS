import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

export const BotAvatar = () => {
    return (
        <Avatar className='w-9 h-8'>
            <AvatarImage className='p-1' src='/logo.png' />
        </Avatar>
    )
};


import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from './button'
import { Input } from './input'

export const PasswordWithReveal = (props: React.HTMLAttributes<HTMLInputElement>) => {
    const [revealPassword, setRevealPassword] = useState(false)

    return (
        <div className='relative'>
            <Input
                {...props}
                id='password'
                type={revealPassword ? 'text' : 'password'}
                placeholder='••••••••'
                className='pr-10'
            />
            <Button
                onClick={() => setRevealPassword(!revealPassword)}
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-4 top-1/2 size-8 -translate-y-1/2'
            >
                {revealPassword ? (
                    <EyeIcon className='size-4' />
                ) : (
                    <EyeOffIcon className='size-4' />
                )}
                <span className='sr-only'>Перемкнути видимість паролю</span>
            </Button>
        </div>
    )
}

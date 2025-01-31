import { Check } from 'lucide-react'

export const InCartIndicator = () => {
    return (
        <div className='absolute left-1 top-1 flex size-4 animate-pop-in items-center justify-center rounded-full bg-accent text-primary'>
            <Check className='size-3' />
        </div>
    )
}

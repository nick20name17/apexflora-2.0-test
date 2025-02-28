import type { Color } from '@/api/colors/colors.types'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

interface ColorCellProps {
    colors: Color[]
}

export const ColorsCell = ({ colors }: ColorCellProps) => {
    if (colors.length === 0) return '-'

    return (
        <div className='flex flex-wrap gap-x-1'>
            {colors?.map((color) => (
                <TooltipProvider key={color.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className='size-4 rounded-full border border-[#D0D0D0]'
                                style={{ backgroundColor: color.hex }}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{color.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    )
}

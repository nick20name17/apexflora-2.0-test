import { useQuery } from 'react-query'

import { AddBonusProgramModal } from '../../bonus-program/components/modals'

import { getBonusPrograms } from '@/api/bonuses/bonuses'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface BonusSelecttProps {
    bonusProgram: string
    setBonusProgram: (bonusProgram: string) => void
}
export const BonusSelect = ({ bonusProgram, setBonusProgram }: BonusSelecttProps) => {
    const { data: bonusPrograms } = useQuery({
        queryKey: ['bonusPrograms'],
        queryFn: async () => {
            const res = await getBonusPrograms({ limit: 100 })
            return res
        }
    })

    const bonusProgramsOptions =
        bonusPrograms?.results?.map((bonusProgram) => ({
            label: bonusProgram.title,
            value: bonusProgram.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <Select
                defaultValue={bonusProgram}
                onValueChange={setBonusProgram}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть бонусну програму' />
                </SelectTrigger>
                <SelectContent>
                    {bonusProgramsOptions?.map((bonusProgram) => (
                        <SelectItem
                            key={bonusProgram.value}
                            value={bonusProgram.value}
                        >
                            {bonusProgram.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <AddBonusProgramModal size='icon' />
        </div>
    )
}

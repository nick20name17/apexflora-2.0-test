import { useQuery } from 'react-query'

import { getUsers } from '@/api/users/users'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface ManagerSelecttProps {
    manager: string
    setManager: (manager: string) => void
}
export const ManagerSelect = ({ manager, setManager }: ManagerSelecttProps) => {
    const { data: managers } = useQuery({
        queryKey: ['managers'],
        queryFn: async () => {
            const res = await getUsers({
                role: 'manager,admin'
            })
            return res
        }
    })

    const managersOptions =
        managers?.results?.map((manager) => ({
            label: manager.first_name + ' ' + manager.last_name,
            value: manager.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <Select
                defaultValue={manager}
                onValueChange={setManager}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть відповідального менеджера' />
                </SelectTrigger>
                <SelectContent>
                    {managersOptions?.map((manager) => (
                        <SelectItem
                            key={manager.value}
                            value={manager.value}
                        >
                            {manager.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

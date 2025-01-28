import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { roles } from '@/constants/user'

export const RoleFilter = () => {
    const [role, setRole] = useQueryState('role', {
        defaultValue: 'all'
    })

    return (
        <Select
            defaultValue={role!}
            onValueChange={setRole}
        >
            <SelectTrigger className='w-60'>
                <SelectValue placeholder='Оберіть роль' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі ролі</SelectItem>
                {roles.map((role) => (
                    <SelectItem
                        key={role.value}
                        value={role.value}
                    >
                        {role.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

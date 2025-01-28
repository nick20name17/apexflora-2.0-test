import type { Roles } from '@/api/users/users.types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { roles } from '@/constants/user'

interface RoleSelectProps {
    role: Roles
    setRole: (role: Roles) => void
}

export const RoleSelect = ({ role, setRole }: RoleSelectProps) => {
    return (
        <Select
            defaultValue={role}
            onValueChange={setRole}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть роль' />
            </SelectTrigger>
            <SelectContent>
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

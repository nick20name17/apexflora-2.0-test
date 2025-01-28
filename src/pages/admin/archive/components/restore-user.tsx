import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

import { updateUser } from '@/api/users/users'
import type { User } from '@/api/users/users.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

interface RestoreUserCellProps {
    user: User
}

export const RestoreUserCell = ({ user }: RestoreUserCellProps) => {
    const [open, setOpen] = useState(false)
    const patchUserMutation = useMutation({
        mutationFn: () => updateUser(user.id, { is_deleted: false }),
        onSuccess: () => {
            setOpen(false)
            toast.success(
                `Користувача ${user.first_name} ${user.last_name} успішно відновлено`
            )
        }
    })

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger>
                <Button
                    variant='outline'
                    size='sm'
                >
                    Відновити
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Відновити користувача{' '}
                        <span className='text-primary'>
                            {user.first_name + ' ' + user.last_name}
                        </span>
                        ?
                    </DialogTitle>
                </DialogHeader>
                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={patchUserMutation.isLoading}
                        onClick={() => patchUserMutation.mutate()}
                        size='sm'
                        className='flex w-24 items-center gap-x-1.5'
                    >
                        {patchUserMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Відновити'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

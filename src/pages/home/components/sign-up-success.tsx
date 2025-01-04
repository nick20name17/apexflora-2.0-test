import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

export const SignUpSuccess = () => {
    const location = useLocation()

    const [open, setOpen] = useState(location.state?.isSignUp)

    useEffect(() => {
        if (open === false) {
            window.history.replaceState({}, '')
        }
    }, [open])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Дякуємо за реєстрацію!</DialogTitle>
                    <DialogDescription>
                        З вами зв'яжеться менеджер і надасть доступ до сервісу
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

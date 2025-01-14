import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

export const OrderSuccess = () => {
    const location = useLocation()

    const [open, setOpen] = useState(location.state?.isOrdered)

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
                    <DialogTitle>Ваше замовлення успішно оформлено</DialogTitle>
                    <DialogDescription>
                        Для остаточного підтвердження замовлення, найближчим часом, з вами
                        зв'яжеться наш менеджер.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

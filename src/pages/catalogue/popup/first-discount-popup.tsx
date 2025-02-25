import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'

export const FirstDiscountPopup = () => {
    const { currentUser } = useAuth()

    const firstDiscount = currentUser?.first_discount

    if (!firstDiscount) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='fixed bottom-10 left-10 z-20 size-12 animate-bounce rounded-full'
                    variant='accent'
                    size='icon'
                >
                    -{firstDiscount}%
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Знижка на перше замовлення</DialogTitle>
                    <DialogDescription>
                        Ви отримали знижку {firstDiscount}% на перше замовлення
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

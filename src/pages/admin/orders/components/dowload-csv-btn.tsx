import { format } from 'date-fns'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

// Assuming you have this Axios function
import { getPreordersCSV } from '@/api/orders/orders'
import { Button } from '@/components/ui/button'

export const DownloadCSVBtn = () => {
    const [isLoading, setIsLoading] = useState(false)

    const getCSV = async () => {
        setIsLoading(true)
        try {
            const res = await getPreordersCSV()

            const url = window.URL.createObjectURL(new Blob([res], { type: 'text/csv' }))

            const formattedDateTime = format(new Date(), 'yyyy-MM-dd-HH-mm')

            const a = document.createElement('a')
            a.href = url
            a.download = `Передзамовлення-${formattedDateTime}.csv`
            a.click()
        } catch {
            toast.error('Помилка завантаження передзамовлення')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            disabled={isLoading}
            onClick={getCSV}
            variant='accent'
            size='sm'
            className='w-56'
        >
            {isLoading ? (
                <Loader2 className='animate-spin' />
            ) : (
                <>
                    <Download />
                    Передзамовлення.csv
                </>
            )}
        </Button>
    )
}

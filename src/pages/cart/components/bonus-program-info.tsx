import { formatPrice } from '@/hooks/use-catalogue-operations'
import { useAuth } from '@/providers/auth-provider'

interface BonusProgramInfoProps {
    totalPrice: number
}

export const BonusProgramInfo = ({ totalPrice }: BonusProgramInfoProps) => {
    const { currentUser } = useAuth()

    const calculateBonusInfo = () => {
        if (!currentUser?.bonus_program?.limits?.length) {
            return null
        }

        const limits = [...currentUser.bonus_program.limits].sort(
            (a, b) => a.accumulation_limit - b.accumulation_limit
        )

        const currentTier = limits.reduce((prev, current) => {
            if (totalPrice >= current.accumulation_limit) {
                return current
            }
            return prev
        }, limits[0])

        const nextTierIndex = limits.findIndex((limit) => limit.id === currentTier.id) + 1
        const nextTier = limits[nextTierIndex]

        const remaining = nextTier
            ? Math.max(0, nextTier.accumulation_limit - totalPrice)
            : 0

        const progress = nextTier
            ? ((totalPrice - currentTier.accumulation_limit) /
                  (nextTier.accumulation_limit - currentTier.accumulation_limit)) *
              100
            : 100

        return {
            currentDiscount: currentTier.discount,
            nextDiscount: nextTier?.discount,
            remaining,
            progress: Math.min(100, Math.max(0, progress))
        }
    }

    const bonusInfo = calculateBonusInfo()

    if (!bonusInfo) {
        return null
    }

    return (
        <div className='rounded-xs bg-accent/20 px-2 py-1 text-xs'>
            🔥 Ваша поточна знижка:{' '}
            <span className='font-medium text-primary'>
                {bonusInfo.currentDiscount}%.{' '}
            </span>
            {bonusInfo.nextDiscount && (
                <>
                    Для отримання знижки{' '}
                    <span className='font-medium text-primary'>
                        {bonusInfo.nextDiscount}%
                    </span>{' '}
                    необхідно замовити ще на{' '}
                    <span className='font-medium text-primary'>
                        {formatPrice(bonusInfo.remaining)}₴
                    </span>
                </>
            )}
        </div>
    )
}

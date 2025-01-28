import { useQueryState } from 'nuqs'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export const AllPreOrdersSwitch = () => {
    const [allPreorders, setAllPreorders] = useQueryState('all-preorders', {
        parse: Boolean,
        defaultValue: false
    })

    return (
        <div className='flex items-center space-x-2'>
            <Switch
                checked={allPreorders}
                onCheckedChange={setAllPreorders}
                id='all-preorders'
            />
            <Label htmlFor='all-preorders'>Усі передзамовлення</Label>
        </div>
    )
}

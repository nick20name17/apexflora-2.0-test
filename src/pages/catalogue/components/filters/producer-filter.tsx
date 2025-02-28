import { useQueryState } from 'nuqs'

import type { Producer } from '@/api/producers/producers.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const ProducerFilter = ({ producers }: { producers: Producer[] }) => {
    const [producerParam, setProducerParam] = useQueryState('producer', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const selectedProducer = producerParam ? producerParam.split(',') : []

    const onProducerChange = (producer: string) => {
        let updatedProducer = [...selectedProducer]

        if (updatedProducer.includes(producer.toString())) {
            updatedProducer = updatedProducer.filter((c) => c !== producer.toString())
        } else {
            updatedProducer.push(producer.toString())
        }

        setProducerParam(updatedProducer.length > 0 ? updatedProducer.join(',') : null)
        setOffset(0)
    }

    return (
        <>
            {producers?.map((producer) => (
                <div
                    key={producer.id?.toString()}
                    className='flex items-center gap-x-3'
                >
                    <Checkbox
                        id={producer.id?.toString()}
                        checked={selectedProducer.includes(producer.id?.toString())}
                        onCheckedChange={() => onProducerChange(producer.id?.toString())}
                    />
                    <Label
                        htmlFor={producer.id?.toString()}
                        className='flex items-center gap-x-1.5 text-muted'
                    >
                        {producer.name}
                    </Label>
                </div>
            ))}
        </>
    )
}

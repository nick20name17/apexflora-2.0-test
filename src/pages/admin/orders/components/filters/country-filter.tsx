import { useQueryState } from 'nuqs'

import type { Producer } from '@/api/producers/producers.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const CountriesFilter = ({ producers }: { producers: Producer[] }) => {
    const uniqueCountries = producers
        ?.map((item) => item.country)
        .filter(
            (country, index, self) =>
                index === self.findIndex((c) => c.code === country.code)
        )

    const [countriesParam, setCountriesParam] = useQueryState('countries', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const selectedCountries = countriesParam ? countriesParam.split(',') : []

    const onCountryChange = (country: string) => {
        let updatedCountries = [...selectedCountries]

        if (updatedCountries.includes(country.toString())) {
            updatedCountries = updatedCountries.filter((c) => c !== country.toString())
        } else {
            updatedCountries.push(country.toString())
        }

        setCountriesParam(updatedCountries.length > 0 ? updatedCountries.join(',') : null)
        setOffset(0)
    }

    return (
        <>
            {uniqueCountries?.map((country) => (
                <div
                    key={country.code}
                    className='flex items-center gap-x-3'
                >
                    <Checkbox
                        id={country.code}
                        checked={selectedCountries.includes(country.code)}
                        onCheckedChange={() => onCountryChange(country.code)}
                    />
                    <Label
                        htmlFor={country.code}
                        className='flex items-center gap-x-1.5 text-muted'
                    >
                        <img
                            src={country.flag}
                            alt={country.name}
                            className='size-4 rounded-sm'
                        />
                        {country.name}
                    </Label>
                </div>
            ))}
        </>
    )
}

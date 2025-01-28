import axios from 'axios'

import type { CitiesQueryParams, CitiesResponse } from './cities.types'
import { defaultComboboxLimit } from '@/constants/table'

const API_KEY = '6b6fd19c1eef6e59f9f02090423fab01'

export const getCities = async (queryParams: Partial<CitiesQueryParams>) => {
    const response = await axios.post<CitiesResponse>(
        'https://api.novaposhta.ua/v2.0/json/',
        {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
                FindByString: queryParams.search,
                Limit: defaultComboboxLimit
            }
        }
    )

    return response.data
}

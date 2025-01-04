import axios from 'axios'

import type { CitiesQueryParams, CitiesResponse } from './cities.types'

const DEFAULT_LIMIT = 140

const API_KEY = '6b6fd19c1eef6e59f9f02090423fab01'

// export const city = createApi({
//     reducerPath: 'city',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://api.novaposhta.ua/v2.0/json' }),
//     endpoints: (build) => ({
//         getCities: build.query<CitiesResponse, Partial<CitiesQueryParams>>({
//             query: (queryParams) => {
//                 return {
//                     url: '/',
//                     method: 'POST',
//                     body: {
//                         apiKey: apiKey,
//                         modelName: 'Address',
//                         calledMethod: 'getCities',
//                         methodProperties: {
//                             FindByString: queryParams.search,
//                             Limit: defaultLimit
//                         }
//                     }
//                 }
//             }
//         })
//     }),
//     tagTypes: ['Cities']
// })

export const getCities = async (queryParams: Partial<CitiesQueryParams>) => {
    const response = await axios.post<CitiesResponse>(
        'https://api.novaposhta.ua/v2.0/json/',
        {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
                FindByString: queryParams.search,
                Limit: DEFAULT_LIMIT
            }
        }
    )

    return response.data
}

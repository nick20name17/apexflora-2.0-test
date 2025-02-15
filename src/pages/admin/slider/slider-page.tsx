
import { getProfiles } from '@/api/profile/profile'
import { useQuery } from 'react-query'
import { DataPageLayout } from '../components/data-page-layout'
import { AdminCarousel } from './components/carousel'
import { AddProfileModal } from './components/modals'


const SliderPage = () => {
    const { data: profiles, isLoading } = useQuery({
        queryKey: ['profiles'],
        queryFn: () => getProfiles({})
    })

    return (
        <DataPageLayout
            title='Слайдер'
            isLoading={isLoading}
            actionComponent={<AddProfileModal />}
        >

            <AdminCarousel isLoading={isLoading} profiles={profiles} />

        </DataPageLayout>
    )
}

export default SliderPage

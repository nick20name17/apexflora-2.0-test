import Helmet from 'react-helmet'

import { app } from '@/constants/app'

interface MetaHeadProps {
    title: string
    desctiption?: string
}

export const MetaHead = ({
    title = app.name,
    desctiption = app.description
}: MetaHeadProps) => {
    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>{title}</title>
            <meta
                name='description'
                content={desctiption}
            />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
        </Helmet>
    )
}

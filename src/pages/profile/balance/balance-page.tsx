import { Link } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { routes } from '@/config/routes'

export const BalancePage = () => {
    return (
        <div className='size-full rounded-xl border bg-background p-6'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.home}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Баланс</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className='py-4 text-2xl'>Баланс</h1>
            <div className='border-t border-t-muted pt-4'>
                <p className='text-lg text-muted'>
                    Цей блок знаходиться на стадії розробки
                </p>
            </div>
        </div>
    )
}

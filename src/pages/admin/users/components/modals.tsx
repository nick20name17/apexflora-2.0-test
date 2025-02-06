import type { UseFormReturn } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import { BonusSelect } from './bonus-select'
import { ManagerSelect } from './manager-select'
import { RoleSelect } from './role-select'
import { getBonusPrograms } from '@/api/bonuses/bonuses'
import { createUser, getUsers, removeUser, updateUser } from '@/api/users/users'
import type { User } from '@/api/users/users.types'
import { CitySelect } from '@/components/city-select'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { emailSchema, passwordShape } from '@/config/schemas'

const userSchema = z.object({
    ...emailSchema.shape,
    first_name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    last_name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    position: z.string({
        required_error: "Це поле є обов'язковим"
    }),
    company: z.string({
        required_error: "Це поле є обов'язковим"
    }),
    phone_number: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    role: z.union([z.literal('admin'), z.literal('manager'), z.literal('client')]),
    code_1c: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    bonus_program: z.coerce
        .number({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
        .optional(),
    service_manager: z.coerce
        .number({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
        .optional(),
    city: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    password: passwordShape.password
})

const editUserSchema = userSchema.omit({
    password: true
})

type EditUserModalProps =
    | {
          form: UseFormReturn<z.infer<any>>
          isEditForm: false
      }
    | {
          form: UseFormReturn<z.infer<typeof editUserSchema>>
          isEditForm: true
      }

const userFormFields = ({ form, isEditForm }: EditUserModalProps) => (
    <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
        <div className='grid grid-cols-1 gap-4 border-b border-b-primary py-2 md:grid-cols-2 md:py-4 lg:grid-cols-3'>
            <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Ім'я</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Андрій'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Прізвище</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Степаненко'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Роль</FormLabel>
                        <FormControl>
                            <RoleSelect
                                role={field.value}
                                setRole={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='grid grid-cols-1 gap-4 border-b border-b-primary py-2 md:grid-cols-2 md:py-4 lg:grid-cols-3'>
            <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Номер телефону</FormLabel>
                        <FormControl>
                            <Input
                                type='tel'
                                inputMode='tel'
                                placeholder='38 067 999 95 69'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Електронна пошта</FormLabel>
                        <FormControl>
                            <Input
                                type='email'
                                inputMode='email'
                                placeholder='nickname@gmail.com'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Місто</FormLabel>
                        <FormControl>
                            <CitySelect
                                className='h-10 w-full'
                                city={field.value}
                                setCity={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='grid grid-cols-1 gap-4 border-b border-b-primary py-2 md:grid-cols-2 md:py-4 lg:grid-cols-3'>
            <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Компанія</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Flowers Shop'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Посада</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Менеджер'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='code_1c'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Код 1С</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='ss-4-b-13'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='grid grid-cols-1 gap-4 border-b border-b-primary py-2 md:grid-cols-2 md:py-4 lg:grid-cols-3'>
            <FormField
                control={form.control}
                name='bonus_program'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Бонусна програма</FormLabel>
                        <FormControl>
                            <BonusSelect
                                bonusProgram={field.value?.toString()}
                                setBonusProgram={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='service_manager'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Менеджер</FormLabel>
                        <FormControl>
                            <ManagerSelect
                                manager={field.value?.toString()}
                                setManager={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {isEditForm ? null : (
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <PasswordWithReveal {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    </div>
)

export const AddUserModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => {
    const { data: bonusPrograms } = useQuery({
        queryKey: ['bonusPrograms'],
        queryFn: async () => {
            const res = await getBonusPrograms({ limit: 100 })
            return res
        }
    })

    const { data: managers } = useQuery({
        queryKey: ['managers'],
        queryFn: async () => {
            const res = await getUsers({
                role: 'manager,admin'
            })
            return res
        }
    })

    return (
        <CreateModal
            title='Користувача'
            schema={userSchema}
            defaultValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                company: '',
                position: '',
                role: 'client',
                bonus_program: bonusPrograms?.results.find(
                    (item) => item.title === 'default'
                )?.id!,
                service_manager: managers?.results?.[0]?.id!,
                code_1c: '',
                password: '',
                city: ''
            }}
            mutation={createUser}
            queryKey='users'
            renderFields={(form) => userFormFields({ form, isEditForm: false })}
            size={size}
        />
    )
}

export const EditUserModal = ({ user }: { user: User }) => (
    <EditModal
        title='Користувача'
        data={user}
        transformDefaultValues={() => {
            return {
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                phone_number: user?.phone_number,
                company: user?.company || '',
                position: user?.position || '',
                role: user?.role,
                bonus_program: user?.bonus_program?.id || undefined,
                service_manager: user?.service_manager?.id || undefined,
                code_1c: user?.code_1c || '',
                city: user?.city
            }
        }}
        schema={editUserSchema}
        mutation={updateUser}
        queryKey='users'
        renderFields={(form) => userFormFields({ form, isEditForm: true })}
    />
)

export const RemoveUserModal = ({ user }: { user: User }) => (
    <DeleteModal
        title='Користувача'
        data={user}
        mutation={removeUser}
        queryKey='users'
    />
)

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-b', className)}
        {...props}
    />
))
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    iconType?: 'chevron' | 'plus-minus'
}

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(({ className, children, iconType = 'chevron', ...props }, ref) => (
    <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'group flex flex-1 items-center justify-between py-6 transition-all',
                className
            )}
            {...props}
        >
            {children}
            {iconType === 'chevron' && (
                <ChevronDown
                    className={cn(
                        'size-4 shrink-0 transition-transform duration-200',
                        'group-data-[state=open]:rotate-180'
                    )}
                />
            )}
            {iconType === 'plus-minus' && (
                <>
                    <Plus className='size-6 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden' />
                    <Minus className='size-6 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden' />
                </>
            )}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            'overflow-hidden font-book text-sm transition-all',
            'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            className
        )}
        {...props}
    >
        <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

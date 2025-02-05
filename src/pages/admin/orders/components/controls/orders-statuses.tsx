"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQueryState } from "nuqs"

export const OrderStatuses = () => {
    const [status, setStatus] = useQueryState("status", {
        defaultValue: "orders",
    })

    const [, setOffset] = useQueryState("offset", {
        parse: Number,
        defaultValue: 0,
    })

    const [, setAllPreorders] = useQueryState("all-preorders", {
        parse: Boolean,
        defaultValue: false,
    })

    const handleStatusChange = (status: string) => {
        if (status !== "pre-orders") {
            setAllPreorders(null)
        }
        setStatus(status)
        setOffset(0)
    }

    return (
        <Tabs className="w-full" defaultValue={status} onValueChange={handleStatusChange}>
            <TabsList className="max-md:flex-col max-md:h-auto h-10 md:h-12 w-full md:bg-secondary bg-transparent max-md:border">
                <TabsTrigger
                    className="max-md:w-full md:h-full h-10 md:flex-1 max-md:justify-start text-primary data-[state=active]:bg-primary data-[state=active]:text-background"
                    value="orders"
                >
                    Замовлення
                </TabsTrigger>
                <TabsTrigger
                    className="max-md:w-full md:h-full h-10 md:flex-1 max-md:justify-start text-primary data-[state=active]:bg-primary data-[state=active]:text-background"
                    value="pre-orders"
                >
                    Передзамовлення
                </TabsTrigger>
                <TabsTrigger
                    className="max-md:w-full md:h-full h-10 md:flex-1 max-md:justify-start text-primary data-[state=active]:bg-primary data-[state=active]:text-background"
                    value="supplier"
                >
                    Надхоження
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}


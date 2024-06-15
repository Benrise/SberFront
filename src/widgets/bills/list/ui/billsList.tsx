import { TableModel } from "@/entities/table"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useEffect } from "react"

export const BillsList: React.FunctionComponent = () => {
    const tableStore = TableModel.tableStore

    useEffect(() => {
        tableStore.fetchBills()
    }, [tableStore])

    return (
        <ScrollArea className="h-full w-full">
            <div className="bills-list">
                <div className="bills-list__items">
                    {tableStore.bills.map((bill) => (
                        <div className="bills-list__item" key={bill.id}>
                            {bill.name}
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}
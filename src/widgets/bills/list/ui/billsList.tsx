import { TableModel } from "@/entities/table";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import IconLoadingCircle from '~icons/eos-icons/bubble-loading?width=48px&height=48px';

import './styles.scss';
import { UploadForm } from "@/features/upload/ui";

export const BillsList: React.FunctionComponent = observer(() => {
    const tableStore = TableModel.tableStore;

    useEffect(() => {
        tableStore.fetchBills();
    }, [tableStore]);

    return (
        <div className="bills-list">
            {tableStore.isLoading ? (
                <div className="bills-list__fallback">
                    <IconLoadingCircle className="text-primary"/>
                </div>
            ) : tableStore.bills.length === 0 ? (
                <div className="bills-list__fallback">
                    <img className="w-[128px] opacity-90" src="/images/png/empty-box.png" alt="Empty List" />
                    <div>Список счетов пуст</div>
                </div>
            ) : (
                <ScrollArea className="h-full w-full">
                    <div className="bills-list__items">
                        {tableStore.bills.map((bill) => (
                            <div className="bills-list__item" key={bill.id}>
                                {bill.name}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
            <UploadForm />
        </div>
    );
});

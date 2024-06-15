import { Bill, TableModel } from "@/entities/table";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import IconLoadingCircle from '~icons/eos-icons/bubble-loading';

import './styles.scss';
import { UploadForm } from "@/features/upload/ui";
import { useReactTable } from "@tanstack/react-table";

export const BillsList: React.FunctionComponent = observer(() => {
    const tableStore = TableModel.tableStore;

    useEffect(() => {
        tableStore.fetchBills();
    }, [tableStore]);

    return (
        <div className="bills-list">
            {tableStore.loading.list ? (
                <div className="bills-list__fallback">
                    <IconLoadingCircle className="text-primary" width={36} height={36}/>
                </div>
            ) : tableStore.bills.length === 0 ? (
                <div className="bills-list__fallback">
                    <img className="w-[128px] opacity-90" src="/images/png/empty-box.png" alt="Empty List" />
                    <div>Список счетов пуст</div>
                </div>
            ) : (
                <div className="bills-list__items">
                    {tableStore.bills.map((bill) => (
                        <Bill key={bill.id} bill={bill}/>
                    ))}
                </div>
            )}
            <UploadForm store={tableStore} />
        </div>
    );
});

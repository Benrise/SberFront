import { Bill, TableModel } from "@/entities/table";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import IconLoadingCircle from '~icons/eos-icons/bubble-loading';

import './styles.scss';
import { UploadForm } from "@/features/upload/ui";
import { useReactTable } from "@tanstack/react-table";
import { motion } from "framer-motion";

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
            ) : tableStore.bills?.length === 0 ? (
                <div className="bills-list__fallback">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <img className="w-[128px] opacity-90" src="/images/png/empty-box.png" alt="Empty List" />
                    </motion.div>
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

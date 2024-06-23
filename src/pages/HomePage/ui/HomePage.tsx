import { Content, ContentProps } from "@/shared/ui/content"
import { BillsList } from "@/widgets/bills/list"
import { DataTable } from "@/features/datatable"
import { DataframeNamesEnum } from "@/entities/table/model"

import IconRefresh from '~icons/flowbite/refresh-outline';

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import { TableModel } from "@/entities/table"

import "./styles.scss"

export const HomePage = () => {
    const tableStore = TableModel.tableStore;

    const fetchTable = async () => {
        await tableStore.getTable(DataframeNamesEnum.BILLS);
    };

    const fetchBills = async () => {
        await tableStore.fetchBills();
    }

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Объекты распределения",
                description: "Все загруженные файлы в систему"
            },
            toolbarButtons: [
                <Button disabled={tableStore.loading.item} onClick={() => fetchTable()} variant={'secondary'}>
                    <IconRefresh className={'mr-2' + (tableStore.loading.item ? ' animate-spin' : '')}/>
                    Обновить
                </Button>
            ],
            body: <DataTable dfName={DataframeNamesEnum.BILLS}/>
        },
        additionalPanel: {
            text: {
                title: "Счета на оплату",
                description: "Загружнные файлы счетов на оплату"
            },
            toolbarButtons: [
                <Button size="icon" disabled={tableStore.loading.item} onClick={() => fetchBills()} variant={'secondary'}>
                    <IconRefresh className={(tableStore.loading.item ? ' animate-spin' : '')}/>
                </Button>
            ],
            body: <BillsList/>
        },
    }

    return (
        <motion.div className="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="home__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                />
            </div>
        </motion.div>
    )
}
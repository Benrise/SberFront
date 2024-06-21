import { useEffect } from "react"

import { Content, ContentProps } from "@/shared/ui/content"
import { BillsList } from "@/widgets/bills/list"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"
import { DataframeNamesEnum } from "@/entities/table/model"

import "./styles.scss"
import { motion } from "framer-motion"

export const HomePage = () => {

    const tableStore = TableModel.tableStore;

    const startPreload = async () => {
        await tableStore.preloadTable();
    }

    useEffect(() => {
        startPreload();
    }, []);

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Объекты распределения",
                description: "Все загруженные файлы в систему"
            },
            body: <DataTable dfName={DataframeNamesEnum.BILLS}/>
        },
        additionalPanel: {
            text: {
                title: "Счета на оплату",
                description: "Загружнные файлы счетов на оплату"
            },
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
import { useEffect } from "react"

import { Content, ContentProps } from "@/shared/ui/content"
import { BillsList } from "@/widgets/bills/list"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"
import { DataframeNamesEnum } from "@/entities/table/model"

import "./styles.scss"

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
                description: "Список объектов распределения"
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
        <div className="home">
            <div className="home__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                />
            </div>
        </div>
    )
}
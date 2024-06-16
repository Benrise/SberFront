import { useEffect, useState } from "react"

import { Content, ContentProps } from "@/shared/ui/content"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"
import { DataframeNamesEnum } from "@/entities/table/model"
import { Button } from "@/shared/ui/button"
import { Constructor } from "@/widgets/constructor"

import IconRefresh from '~icons/flowbite/refresh-outline';

import "./styles.scss"

export const PreprocessingPage = () => {
    const tableStore = TableModel.tableStore;

    const startPreload = async () => {
        await tableStore.preloadTable();
    }

    const refreshTable = async () => {
        await tableStore.getTable(DataframeNamesEnum.FILTER);
    };

    useEffect(() => {
        startPreload();
    }, []);

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Объекты предобработки",
                description: "Список объектов предобработки"
            },
            toolbarButtons: [
                <Button onClick={() => refreshTable()} variant={'secondary'} size={'icon'}><IconRefresh/></Button>
            ],
            body: <DataTable dfName={DataframeNamesEnum.BILLS} />
        },
        additionalPanel: {
            extraAction: <Button>Произвести отчёт</Button>,
            body: <Constructor/>
        },
        reversed: true
    }

    return (
        <div className="home">
            <div className="home__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                    reversed={contentProps.reversed}
                />
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"

import { Content, ContentProps } from "@/shared/ui/content"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"
import { DataframeNamesEnum } from "@/entities/table/model"
import { Button } from "@/shared/ui/button"
import { Constructor } from "@/widgets/constructor"

import IconRefresh from '~icons/flowbite/refresh-outline';

import "./styles.scss"

import { observer } from "mobx-react"
import { DistributionModel } from "@/entities/distribution"
import { useToast } from "@/shared/ui/use-toast"
import { motion } from "framer-motion"

export const PreprocessingPage = observer(() => {
    const tableStore = TableModel.tableStore;
    const distributionStore = DistributionModel.distributionStore;
    const { toast } = useToast();

    const refreshTable = async () => {
        await tableStore.getTable(DataframeNamesEnum.FILTER);
    };

    const startDistribution = async () => {
        try {
            const response = await distributionStore.start(tableStore.configurations);
            if (!!response) {
                toast({
                    variant: 'success',
                    title: `Операция успешно зарегистрирована`,
                    description: `Статусы обработки операций отображается в истории`,
                });
            }
        }
        catch (e) {
            toast({
                variant: 'destructive',
                title: `Непредвиденная ошибка`,
                description: `Ошибка при отправке запроса. Попробуйте повторить операцию.`,
            });
        }
    }

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Объекты предобработки",
                description: "Список объектов манипуляции"
            },
            toolbarButtons: [
                <Button disabled={tableStore.loading.item} onClick={() => refreshTable()} variant={'secondary'}>
                    <IconRefresh className={'mr-2' + (tableStore.loading.item ? ' animate-spin' : '')}/>
                    Обновить
                </Button>
            ],
            body: <DataTable dfName={DataframeNamesEnum.BILLS} editable/>
        },
        additionalPanel: {
            extraAction: <Button loading={distributionStore.loading.item} onClick={() => startDistribution()}>Начать распределение</Button>,
            body: <Constructor/>
        },
        reversed: true
    }

    return (
        <motion.div className="preprocessing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="preprocessing__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                    reversed={contentProps.reversed}
                />
            </div>
        </motion.div>
    )
})
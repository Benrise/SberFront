import { Content, ContentProps } from "@/shared/ui/content"
import { Constructor } from "@/widgets/constructor"
import { Button } from "@/shared/ui/button"
import { DataframeNamesEnum } from "@/entities/table/model"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"

import { DistributionModel } from "@/entities/distribution"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "@formkit/tempo"
import { DistributionStatusEnum } from "@/entities/distribution/model"

import IconRefresh from '~icons/flowbite/refresh-outline';

import IconLoadingCircle from '~icons/eos-icons/bubble-loading'
import { observer } from "mobx-react-lite"

import './styles.scss'
import { useToast } from "@/shared/ui/use-toast"


export const DistributionPage = observer(() => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(DistributionStatusEnum.PENDING);
    const { id } = useParams<{ id: string }>();
    const distributionStore = DistributionModel.distributionStore;
    const tableStore = TableModel.tableStore;
    const item = distributionStore.item;
    const { toast } = useToast();

    const fetchDistributions = async () => {
        await tableStore.history();
        const lastDistributionId = tableStore.distributions[tableStore.distributions.length - 1].config_id;
        if (lastDistributionId) {
            try {
                await distributionStore.get(lastDistributionId);
            }
            catch {
                toast({
                    variant: 'destructive',
                    title: 'Непредвиденная ошибка',
                    description: 'Не удалось загрузить распределение',
                  });
                setStatus(DistributionStatusEnum.FAILURE);
            }
        }
    }

    const fetchItem = async (id: string | undefined) => {
        if (id) {
            try {
                await distributionStore.get(id);
                setStatus(DistributionStatusEnum.SUCCESS);
            }
            catch (e) {
                toast({
                    variant: 'destructive',
                    title: 'Непредвиденная ошибка',
                    description: 'Не удалось загрузить распределение',
                  });
                setStatus(DistributionStatusEnum.FAILURE);
            }
        }
        else {
            fetchDistributions();
        }
    }

    useEffect(() => {
        fetchItem(id);
    },[distributionStore]);

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: id ? 'Распределение' : 'Последнее расчитанное распределение',
                description: item?.create_at ?  "От " + format(item?.create_at) : ''
            },
            toolbarButtons: [
                <Button disabled={tableStore.loading.item} onClick={() => fetchItem(id)} variant={'secondary'}>
                    <IconRefresh className={'mr-2' + (tableStore.loading.item ? ' animate-spin' : '')}/>
                    Обновить
                </Button>
            ],
            body: <div>Распределение</div>
        }
    }

    if (distributionStore.loading.item || tableStore.loading.list) {
        return (
                <div className="distribution__fallback">
                    <IconLoadingCircle className="text-primary" width={48} height={48} />
                    <div>Загрузка распределения...</div>
                </div>
          );
    }

    if (item?.status?.toLowerCase() === DistributionStatusEnum.FAILURE || status === DistributionStatusEnum.FAILURE) {
        return (
            <div className="distribution__fallback">
                <img src='/images/png/rejected.png'/>
                <div>
                    Ошибка при обработке {id ? 'распределения' : 'последнего расчитанного распределения'} {distributionStore.item?.config_id}
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/preprocessing')}>На страницу предобработки</Button>
                </div>
            </div>
        )
    }

    if (item?.status?.toLowerCase() === DistributionStatusEnum.PENDING || status === DistributionStatusEnum.PENDING) {
        return (
            <div className="distribution__fallback">
                <img src='/images/png/fog.png'/>
                <div>Распределение {distributionStore.item?.config_id} в обработке...</div>
                <div className="flex gap-2">
                    <Button onClick={() => fetchItem(id)}>Проверить статус</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="distribution">
            <div className="distribution__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                    reversed={contentProps.reversed}
                />
            </div>
        </div>
    )
})
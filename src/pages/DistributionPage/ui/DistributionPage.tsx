import { Content, ContentProps } from "@/shared/ui/content"
import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shared/ui/dropdown-menu"
import { TableModel } from "@/entities/table"

import { DistributionModel } from "@/entities/distribution"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "@formkit/tempo"
import { DistributionStatusEnum } from "@/entities/distribution/model"

import IconRefresh from '~icons/flowbite/refresh-outline';
import IconDownloadFile from '~icons/lucide/file-down';
import IconLoadingCircle from '~icons/eos-icons/bubble-loading'

import { observer } from "mobx-react-lite"

import { useToast } from "@/shared/ui/use-toast"

import { PieChart } from '@/features/chart/pie'
import { BubbleChart } from '@/features/chart/bubble' 
import { TreemapChart } from "@/features/chart/treemap"


import { motion } from "framer-motion"

import './styles.scss'
import { DataTable } from "@/features/datatable"
import { DataframeNamesEnum } from "@/entities/table/model"
import { RadialChart } from "@/features/chart/radial"


export const DistributionPage = observer(() => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(DistributionStatusEnum.PENDING);
    const { id } = useParams<{ id: string }>();
    const distributionStore = DistributionModel.distributionStore;
    const tableStore = TableModel.tableStore;
    const item = distributionStore.item;
    const { toast } = useToast();

    const isPendingOrSuccess = item?.status === DistributionStatusEnum.PENDING || item?.status === DistributionStatusEnum.SUCCESS;
    const isDataNumber = typeof item?.data === 'number';
    const dataValue = parseInt(item?.data as any);

    const fetchTable = async () => {
        if (!tableStore.loading.item && !tableStore.tableData.data.length) {
          await tableStore.getTable(DataframeNamesEnum.DISTRIBUTION);
        }
    };

    const toolbarConfig = {
        title: 'Итоговое распределение',
        buttons: [
            <Button disabled={tableStore.loading.item} onClick={() => fetchTable()} variant={'secondary'}>
            <IconRefresh className={'mr-2' + (tableStore.loading.item ? ' animate-spin' : '')}/>
                Обновить
            </Button>
        ]
    }

    const fetchDistributions = async () => {
        await tableStore.history();
        const lastDistributionId = tableStore.distributions[0]?.config_id;
        if (lastDistributionId) {
            try {
                await distributionStore.get(lastDistributionId);
                if (!id) {
                    navigate(`/distribution/${lastDistributionId}`);
                }
                toast({
                    title: 'Будет отображено последнее расчитанное распределение',
                    description: 'Список распределений для выбора находится в разделе "История" на странице предобработки данных',
                });
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
        } else {
            fetchDistributions();
        }
    }

    useEffect(() => {
        fetchItem(id);
    }, [distributionStore]);

    useEffect(() => {
        fetchTable();
    }, []);

    useEffect(() => {
        if (item?.status !== DistributionStatusEnum.SUCCESS && item?.status !== DistributionStatusEnum.FAILURE) {
            const intervalId = setInterval(() => {
                if (distributionStore.loading.item || tableStore.loading.item) return;
                fetchItem(id);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }, [id, dataValue, item?.status]);

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: id ? 'Распределение' : 'Последнее расчитанное распределение ' + (item?.config_id),
                description: item?.create_at ?  "От " + format(item?.create_at, 'DD.MM.YYYY HH:mm') : ''
            },
            toolbarButtons: [
                <Button key={1} disabled={tableStore.loading.item} onClick={() => fetchItem(id)} variant={'secondary'}>
                    <IconRefresh className={'mr-2' + (tableStore.loading.item ? ' animate-spin' : '')}/>
                    Обновить
                </Button>,
                ((item?.data?.distributed_bills || item?.data?.export_distributed_bills_csv) &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            Скачать отчёт 
                            <IconDownloadFile className="ml-2"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            Формат
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            {item?.data?.distributed_bills && (
                                <a target='_blank' key={2} href={item.data.distributed_bills}>
                                    <Button size={'icon'} className="w-full" variant="ghost">.XLS</Button>
                                </a>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            {item?.data?.export_distributed_bills_csv && (
                                <a target='_blank' key={3} href={item.data.export_distributed_bills_csv}>
                                    <Button size={'icon'} className="w-full" variant="ghost">.CSV</Button>
                                </a>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>),
                ((item?.data?.distributed_bills_predict || item?.data?.distributed_bills_predict_csv) &&
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        Скачать предсказание 
                        <IconDownloadFile className="ml-2"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Формат
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        {item?.data?.distributed_bills_predict && (
                            <a target='_blank' key={2} href={item.data.distributed_bills_predict}>
                                <Button size={'icon'} className="w-full" variant="ghost">.XLS</Button>
                            </a>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        {item?.data?.distributed_bills_predict_csv && (
                            <a target='_blank' key={3} href={item.data.distributed_bills_predict_csv}>
                                <Button size={'icon'} className="w-full" variant="ghost">.CSV</Button>
                            </a>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>)
            ],
            body: (item?.data?.donut_graph || item?.data?.dots_graph) && (
                <div className="flex flex-col w-full gap-8">
                <div style={{ display: 'flex', height: '50%' }}>
                  {item?.data?.donut_graph && 
                      <div style={{ width: '50%' }}>
                          <PieChart data={item?.data?.donut_graph}/>
                      </div>
                  }
                  {item?.data?.dots_graph && 
                      <div style={{ width: '50%' }}>
                          <BubbleChart data={item?.data?.dots_graph} />
                      </div>
                  }
                </div>
                {item?.data?.bars_graph && 
                  <div style={{ height: '50%' }}>
                      <TreemapChart data={item?.data?.bars_graph.data} />
                  </div>
                }
                {tableStore.tableData.data.length> 0 && (
                    <DataTable dfName={DataframeNamesEnum.DISTRIBUTION} toolbar={toolbarConfig}/>     
                )}
              </div>
            )
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

    if (item?.status === DistributionStatusEnum.FAILURE) {
        return (
            <div className="distribution__fallback">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <img src='/images/png/rejected.png'/>
                </motion.div>
                <div>
                    Ошибка при обработке {id ? 'распределения' : 'последнего расчитанного распределения'} {distributionStore.item?.config_id}
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/preprocessing')}>На страницу предобработки</Button>
                </div>
            </div>
        )
    }

    if ((isPendingOrSuccess && isDataNumber && dataValue === 0) || (isDataNumber && dataValue !== 0)) {
        return (
            <div className="distribution__fallback">
                {isPendingOrSuccess && dataValue === 0 ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <img src='/images/png/fog.png'/>
                    </motion.div>
                ) : (
                    <RadialChart value={Math.round(dataValue)} label={'Прогресс'}/>
                )}
                <div>Распределение {distributionStore.item?.config_id} в обработке...</div>
                <div className="flex gap-2">
                    <Button onClick={() => fetchItem(id)}>Проверить статус</Button>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="distribution__fallback">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <img src='/images/png/empty-report.png'/>
                </motion.div>
                <div className="text-center">
                    Отсутствует последнее рассчитанное распределение. 
                    <br/> 
                    Для расчета распределения произведите предобработку загруженных ранее данных.
                </div>
                <div className="flex gap-2">
                    <NavLink to='/preprocessing'>
                        <Button>К предобработке данных</Button>
                    </NavLink>
                </div>
            </div>
        )
    }

    return (
        <motion.div className="distribution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="distribution__container">
                <Content
                    mainPanel={contentProps.mainPanel}
                    additionalPanel={contentProps.additionalPanel}
                    reversed={contentProps.reversed}
                />
            </div>
        </motion.div>
    )
})
import { Button } from "@/shared/ui/button";
import { DistributionDto, DistributionStatusEnum } from "@/entities/distribution/model";

import IconClipboard from '~icons/lucide/clipboard-copy'

import './styles.scss'

type DistributionBadgeProps = {
    item: DistributionDto
}

import { format } from "@formkit/tempo"
import { useNavigate } from "react-router-dom";
import { Badge } from "@/shared/ui/badge";

import IconClock from '~icons/mdi/clock-outline';
import IconCheck from '~icons/icon-park-outline/check-one';
import IconError from '~icons/mdi/error-outline'
import { tableStore } from "@/entities/table/model";

export const DistributionBadge: React.FC<DistributionBadgeProps> = ({ item }) => {
    const navigate = useNavigate();

    const handleResultClick = () => {
        navigate(`/distribution/${item.config_id}`);
    };

    return (
        <div className="distribution-badge">
            <div className="distribution-badge__text">
                Распределение от {item.create_at ? format(item.create_at, 'DD.MM.YYYY HH:mm') : ''}
            </div>
            <div className="flex w-full gap-2">
                <Badge className="w-fit" variant={
                        item?.state === DistributionStatusEnum.SUCCESS ? 'success' :
                        item?.state === DistributionStatusEnum.PENDING ? 'warning' : 'destructive'
                    }>
                        {item?.state === DistributionStatusEnum.SUCCESS ? <IconCheck/>:
                        item?.state === DistributionStatusEnum.PENDING ? <IconClock/>  : <IconError/>}
                </Badge>
                <div className="text-[12px] font-medium opacity-70">
                    { item?.state === DistributionStatusEnum.SUCCESS ? 'Готово' :
                    item?.state === DistributionStatusEnum.PENDING ? `В обработке ${progress()}` : 'Ошибка' }
                </div>
            </div>
            <div className="distribution-badge__actions">
                <Button type={"button"} onClick={() => tableStore.setImportedConfigurations(item.config_data?.configurations || [])} size={'sm'} variant={"secondary"} className="w-full">
                     <IconClipboard className="mr-2"/>
                     Конфигурация
                </Button>
                <Button size={'sm'} onClick={handleResultClick} className="w-full">
                    К результату
                </Button>
            </div>
        </div>
    )
}
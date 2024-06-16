import { Button } from "@/shared/ui/button";
import { DistributionDto } from "@/entities/distribution/model";

import './styles.scss'

type DistributionBadgeProps = {
    item: DistributionDto
}

import { format } from "@formkit/tempo"

export const DistributionBadge: React.FC<DistributionBadgeProps> = ({ item }) => {
    return (
        <div className="distribution-badge">
            <div className="distribution-badge__text">
                Распределение от {format(item.create_at)}
            </div>
            <div className="distribution-badge__actions">
                <Button className="w-full">
                    Взять конфигурацию
                </Button>
                <Button className="w-full" variant={"secondary"}>
                    К результату
                </Button>
            </div>
        </div>
    )
}
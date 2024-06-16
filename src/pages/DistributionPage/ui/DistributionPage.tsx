import { Content, ContentProps } from "@/shared/ui/content"
import { Constructor } from "@/widgets/constructor"
import { Button } from "@/shared/ui/button"
import { DataframeNamesEnum } from "@/entities/table/model"
import { DataTable } from "@/features/datatable"
import { TableModel } from "@/entities/table"

import IconRefresh from '~icons/flowbite/refresh-outline';
import { DistributionModel } from "@/entities/distribution"

export const DistributionPage = () => {
    const tableStore = TableModel.tableStore;
    const distributionStore = DistributionModel.distributionStore;

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Расчитанное распределение",
                description: "От 24.06.2024"
            },
            toolbarButtons: [
            ],
            body: <div>Распределение</div>
        }
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
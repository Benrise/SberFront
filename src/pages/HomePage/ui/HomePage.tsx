import { Content, ContentProps } from "@/shared/ui/content"
import "./styles.scss"
import { BillsList } from "@/widgets/bills/list"

export const HomePage = () => {

    const contentProps: ContentProps = {
        mainPanel: {
            text: {
                title: "Объекты распределения",
                description: "Список объектов распределения"
            },
            body: <div>Таблица объектов распределения</div>
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
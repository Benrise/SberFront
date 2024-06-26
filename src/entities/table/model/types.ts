import { ConfigurationDto, ConfigurationFormValues } from "@/widgets/constructor/model"

export const enum DataframeNamesEnum {
    BILLS = 'bills',
    FILTER = 'filter',
    DISTRIBUTION = 'distr',
    BILLS_EDIT = 'bills_edit',
}

export class EditableCellDto {
    row?: number[]
    column?: string
    value?: string
}
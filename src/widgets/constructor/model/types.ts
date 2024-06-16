export class OperationDto {
    value?: string;
    filter?: string;
    expression?: string;
}

export class ConfigurationDto {
    column?: string;
    operations?: OperationDto[];
}

export interface ConfigurationFormValues {
    configurations: ConfigurationDto[];
}

export class HistoryDto {
    config_id?: number
    config_data?: ConfigurationDto
    create_at?: string
    user_id?: number
}
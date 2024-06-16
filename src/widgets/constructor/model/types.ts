export class ConfigurationDto {
    key?: string;
    filter?: string;
    expression?: string;
    value?: string;
    sub?: ConfigurationDto[];
}

export class HistoryDto {
    config_id?: number
    config_data?: ConfigurationDto
    create_at?: string
    user_id?: number
}
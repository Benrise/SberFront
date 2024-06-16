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

export type functionType = 'value' | 'filter' | 'expression'
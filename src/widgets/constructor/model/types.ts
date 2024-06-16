export class ConfigurationDto {
    key?: string;
    filter?: string;
    expression?: string;
    value?: string;
    sub?: ConfigurationDto[];
}

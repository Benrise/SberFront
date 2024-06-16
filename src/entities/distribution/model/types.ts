import { ConfigurationDto } from "@/widgets/constructor/model"

export const enum DistributionStatusEnum {
    PENDING = 'PENDING',
    FAILURE = 'FAILURE',
    SUCCESS = 'SUCCESS',
}

export class DistributionDto {
    config_data?: {
        configurations: ConfigurationDto[]
    };
    create_at?: string;
    user_id?: string;
    distribution_info?: string;
    config_id?: string;
    distribution_task_id?: string;
}
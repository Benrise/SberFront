import { ConfigurationDto } from "@/widgets/constructor/model"

export const enum DistributionStatusEnum {
    PENDING = 'pending',
    FAILURE = 'failure',
    SUCCESS = 'sucsess',
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
    status?: DistributionStatusEnum;
    state?: DistributionStatusEnum;
    data?: {
        id?: string
        user_name?: string
        result: {
            link_1?: string
            link_2?: string
        }
    }
}
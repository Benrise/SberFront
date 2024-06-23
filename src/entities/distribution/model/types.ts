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
    status?: DistributionStatusEnum;
    state?: DistributionStatusEnum;
    data?: {
        id?: string
        user_name?: string
        distributed_bills?: string;
        export_distributed_bills_csv?: string;
        distributed_bills_predict?: string;
        distributed_bills_predict_csv?: string;
        donut_graph: {
            series: number[];
            labels: string[];
        };
        dots_graph: {
            x: number;
            y: number;
            r: number;
        }[];
        bars_graph: {
            series: number[];
            categories: string[]
        };
    }
}
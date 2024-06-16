import axiosInstance from '@/app/api/axios'
import { DistributionRepository } from './repository';

const distributionUrl = 'distribution';

export const http = {
    distribution: new DistributionRepository(distributionUrl, axiosInstance),
}
import { Tracked } from './tracked';

export class DeviceOutput extends Tracked {
    id: string;
    output_value: string;
    output_type_id: string;
    device_id: string;
    experiment_id: string;
    units: string;
    timestamp: number;
    notes: string;
    description: string;
    name: string;
    email: string;
    start_time: string;
    access_level: string;

}

import { Tracked } from './tracked';

export class Experiment extends Tracked {
    creator_id: string;
    description: string;
    id: string;
    notes: string;
    start_time: number;
}

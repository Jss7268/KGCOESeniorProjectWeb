import { Tracked } from './tracked';

export class Device extends Tracked {
    access_level: number;
    email: string;
    id: string;
    name: string;
}

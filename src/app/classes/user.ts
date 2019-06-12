import { Tracked } from './tracked';

export class User extends Tracked {
    id: string;
    email: string;
    name: string;
    access_level: number;
    requested_access_level: number;
    requested_reason: string;
}

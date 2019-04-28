import { AppSettings } from './app.settings';

export class AppRoutes {
    public static AUTH_ENDPOINT=AppSettings.API_ENDPOINT + 'auth/';
    public static V1_ENDPOINT=AppSettings.API_ENDPOINT + 'v1/';
    public static EXPERIMENTS=AppRoutes.V1_ENDPOINT + 'experiments';
    public static DEVICE_OUTPUTS=AppRoutes.V1_ENDPOINT + 'device_outputs';
    public static OUTPUT_TYPES=AppRoutes.V1_ENDPOINT + 'output_types';
    public static OUTPUT_TYPES_NAME=AppRoutes.V1_ENDPOINT + 'output_types/name';


 }
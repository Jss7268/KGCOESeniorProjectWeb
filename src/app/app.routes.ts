import { AppSettings } from './app.settings';

export class AppRoutes {
    public static AUTH_ENDPOINT=`${AppSettings.API_ENDPOINT}/auth`;
    public static AUTH_REGISTER=`${AppSettings.API_ENDPOINT}/auth/register`;
    public static V1_ENDPOINT=`${AppSettings.API_ENDPOINT}/v1`;
    public static USERS =`${AppRoutes.V1_ENDPOINT}/users`;
    public static USERME = `${AppRoutes.V1_ENDPOINT}/users/me`;
    public static EXPERIMENTS=`${AppRoutes.V1_ENDPOINT}/experiments`;
    public static DEVICE_OUTPUTS=`${AppRoutes.V1_ENDPOINT}/device_outputs`;
    public static OUTPUT_TYPES=`${AppRoutes.V1_ENDPOINT}/output_types`;
    public static OUTPUT_TYPES_NAME=`${AppRoutes.V1_ENDPOINT}/output_types/name`;
    public static LIST_DEVICES=`${AppRoutes.V1_ENDPOINT}/users/access/1`;
    public static DEVICE_EXPERIMENT=`${AppRoutes.V1_ENDPOINT}/devices_experiments`;
    public static USER_INPUTS=`${AppRoutes.V1_ENDPOINT}/user_inputs`;
 }
 
import { buildOrganizationUrn, LogtoNextConfig, UserScope } from '@logto/next';
import { accessToken, signin, signout, stateAuth, tokenOrganization, userProfile } from './LogtoServerActions';
import { decodeJwt } from 'jose';
import { Profile } from '@/data/types/profile.type';
import { AccessPermission } from '@/domain/constants/apiPermissions';
export default class LogtoService {

    public configLogto: LogtoNextConfig;

    constructor() {
        this.configLogto = {
            endpoint: process.env.NEXT_PUBLIC_LOGTO_URI || '',
            appId: process.env.NEXT_PUBLIC_LOGTO_APPID || '',
            appSecret: process.env.NEXT_PUBLIC_LOGTO_SECRET || '',
            baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
            cookieSecret: process.env.NEXT_PUBLIC_COOKIE_SECRET || '',
            cookieSecure: process.env.NODE_ENV === 'production',
            resources: [process.env.NEXT_PUBLIC_LOGTO_RESOURCE || ''],
            scopes: [
                UserScope.Profile,
                UserScope.Email,
                UserScope.Phone,
                UserScope.OrganizationRoles,
                UserScope.Organizations,
                UserScope.CustomData,
                 ...AccessPermission,

            ],
        }
    }

    async getConfig() {
        return this.configLogto;
    }

    async authenticateUser() {
        await signin(this.configLogto)
    }

    async logoutUser() {
        await signout(this.configLogto);
    }

    async profileUser(): Promise<Profile> {
        return await userProfile(this.configLogto);
    }

    async isAuth() {
        return await stateAuth(this.configLogto) ? true : false;
    }

    async getScope() {
        const claims = decodeJwt(await this.getTokenOrg() || '');
        const scope = claims.scope as string;
        return scope.split(' ');
    }

    async getTokenAuth() {
        return await accessToken(this.configLogto);
    }

    async getTokenOrg() {
        return await tokenOrganization(this.configLogto);
    }


}
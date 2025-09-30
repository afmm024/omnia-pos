'use server';

import { getLogtoContext, signIn, signOut, getOrganizationToken, getAccessToken } from '@logto/next/server-actions';
import { LogtoNextConfig } from '@logto/next';
import { Profile } from '@/data/types/profile.type';

export const signin = async (config: LogtoNextConfig) => {
    await signIn(config);
};

export const signout = async (config: LogtoNextConfig) => {
  await signOut(config)
};  

export const stateAuth = async(config: LogtoNextConfig) => {
    const logtoContext = await getLogtoContext(config);
    return logtoContext.isAuthenticated 
}

export const userProfile = async (config: LogtoNextConfig): Promise<Profile> => {
    const logtoContext = await getLogtoContext(config);
    const { claims} = logtoContext;
    return {
        name: claims?.name || "",
        username: claims?.username || "",
        id: claims?.sub || '',
        email: claims?.email || '',
        metadata: claims?.organization_roles ? getRole(claims?.organization_roles) : []
    };
};

export const accessToken = async(config: LogtoNextConfig) => {
    return await getAccessToken(config, process.env.NEXT_PUBLIC_LOGTO_RESOURCE ,process.env.NEXT_PUBLIC_LOGTO_ORG);
}

export const tokenOrganization = async(config: LogtoNextConfig) => {
    const token = await getOrganizationToken(config, process.env.NEXT_PUBLIC_LOGTO_ORG);
    return token;
}

const getRole = (roleArray: string[]) => {
    const role = roleArray.length > 0 ? roleArray[0].split(':') : null
    if(role === null){
        return [];
    }
    return role;
}
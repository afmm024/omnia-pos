import { Profile } from "@/data/types/profile.type";
import { IdTokenClaims } from "@logto/next";

export const mappedUser = (claims: IdTokenClaims) : Profile => {
    return {
        name: claims?.name || '',
        username: claims?.username || '',
        email: claims?.email || '',
        id: claims?.sub || '',
        metadata: claims?.organization_roles ? getRole(claims?.organization_roles) : []
    };
}

const getRole = (roleArray: string[]) => {
    const role = roleArray.length > 0 ? roleArray[0].split(':') : null
    if(role === null){
        return [];
    }
    return role;
}
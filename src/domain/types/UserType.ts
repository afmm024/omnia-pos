import { UserInfoResponse } from "@logto/next";

export type Profile = {
    name: string | null;
    username: string | null;
    id: string;
    metadata: string[];
    profile: UserInfoResponse | undefined;
}
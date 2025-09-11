import { injectable } from "inversify"
import IAuthRepository from "@/domain/repositories/IAuthRepository";
import "reflect-metadata";
import axiosClient from "../provider/axios/axiosClient";

@injectable()
export default class AuthRepository implements IAuthRepository {
    async login(user: string, password: string): Promise<any> {
        try {
            const {data} = await axiosClient.post(`/auth/login`, {
                Document: user,
                Password: password
            });
            return data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

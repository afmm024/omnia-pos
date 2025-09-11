import type IAuthRepository from "@/domain/repositories/IAuthRepository";
import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";


@injectable()
export default class AuthUseCase{
    private _authRepository: IAuthRepository;
    constructor(
        @inject(RepositoryTypes.AuthRepository) authRepository: IAuthRepository
    ) {
        this._authRepository = authRepository;
    }

    async userAuthentication(user: string, password: string): Promise<any>{
        return this._authRepository.login(user, password);
    }
}

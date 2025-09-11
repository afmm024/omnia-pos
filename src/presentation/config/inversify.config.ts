
import AuthRepository from "@/data/repositories/AuthRepository"
import AuthUseCase from "@/domain/interactors/auth/AuthUseCase";
import IAuthRepository from "@/domain/repositories/IAuthRepository"
import RepositoryTypes from "@/domain/types/RepositoryTypes"
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Container } from "inversify"

const container = new Container();

// Repositories
container.bind<IAuthRepository>(RepositoryTypes.AuthRepository).to(AuthRepository);

// Use Cases
container.bind<AuthUseCase>(UseCaseTypes.AuthUseCase).to(AuthUseCase);

export default container;
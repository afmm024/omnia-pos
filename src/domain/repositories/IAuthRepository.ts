export default interface IAuthRepository {
  login(user: string, password: string): Promise<any>
}
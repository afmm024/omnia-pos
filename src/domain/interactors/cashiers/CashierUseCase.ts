import type ICashierRepository from "@/domain/repositories/ICashierRepository";
import { CashierBill, CashierBillCart } from "@/domain/types/CashierType";
import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";


@injectable()
export default class CashierUseCase {
    private _cashierRepository: ICashierRepository;
    constructor(
        @inject(RepositoryTypes.CashierRepository) cashierRepository: ICashierRepository
    ) {
        this._cashierRepository = cashierRepository;
    }

    async getCashierById(id: string) {
        return await this._cashierRepository.getById(id);
    }


    async getCashierByuser() {
        return await this._cashierRepository.getByUser();
    }

    async getAllCashiers() {
        return await this._cashierRepository.getAll();
    }

    async closeCashier(id: string, observation: string, excessMoney: number) {
        return await this._cashierRepository.closeCashier(id, observation, excessMoney);
    }

    async openCashier(baseAmount: number) {
        return await this._cashierRepository.openCashier(baseAmount);
    }

    async createBill(id: string, bill: CashierBillCart){
        return await this._cashierRepository.createBill(id, bill);
    }

    async getBills(id: string) {
        return await this._cashierRepository.getBills(id);
    }

}
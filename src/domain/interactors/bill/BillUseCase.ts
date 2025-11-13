import type IBillRepository from "@/domain/repositories/IBillRepository";
import { CashierBillCart } from "@/domain/types/CashierType";
import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";

@injectable()
export default class BillUseCase {
    private _billRepository: IBillRepository;
    constructor(
        @inject(RepositoryTypes.BillRepository) billRepository: IBillRepository
    ) {
        this._billRepository = billRepository;
    }

     async createBill(id: string, bill: CashierBillCart){
        return await this._billRepository.createBill(id, bill);
    }

    async getBills(id: string) {
        return await this._billRepository.getBills(id);
    }

    async syncBill(id: string){
        return await this._billRepository.syncBill(id);
    }

    async detailBill(id: string){
        return await this._billRepository.detailBill(id);
    }

    async getAllBills(){
        return await this._billRepository.getAll?.();
    }

    

}
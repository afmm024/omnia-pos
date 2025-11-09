import { CartItem } from "../store/CartStore"
import { BillData } from "./BillFactusType"
import { Supplier } from "./SupplierType"

export interface ReceiptInformation {
    total: number
    subTotal: number
    taxes: number
    paymentType: string
    totalItems: number
    items: CartItem[]
    companyInformation: CompanyInformation
    supplierInformation: Supplier
    billInformation?: BillData
}

export interface CompanyInformation {
    nit: string
    dv: string
    company: string
    name: string
    graphic_representation_name: string
    registration_code: string
    economic_activity: string
    phone: string
    email: string
    direction: string
    municipality: string
}
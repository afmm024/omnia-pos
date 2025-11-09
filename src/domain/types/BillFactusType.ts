export interface FactusResponse {
  message: string
  data: BillData
  errors: any
}

export interface BillData {
  company: Company
  establishment: Establishment
  customer: Customer
  numbering_range: NumberingRange
  billing_period: any[]
  bill: Bill
  related_documents: any[]
  items: Item[]
  allowance_charges: any[]
  withholding_taxes: any[]
  credit_notes: any[]
  debit_notes: any[]
}

export interface Company {
  url_logo: string
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

export interface Establishment {
  name: string
  address: string
  phone_number: string
  email: string
  municipality: Municipality
}

export interface Municipality {
  id: number
  code: string
  name: string
  department: Department
}

export interface Department {
  id: number
  code: string
  name: string
}

export interface Customer {
  identification: string
  dv: any
  graphic_representation_name: string
  trade_name: any
  company: any
  names: string
  address: string
  email: any
  phone: any
  legal_organization: LegalOrganization
  tribute: Tribute
  municipality: any[]
}

export interface LegalOrganization {
  id: number
  code: string
  name: string
}

export interface Tribute {
  id: number
  code: string
  name: string
}

export interface NumberingRange {
  prefix: string
  from: number
  to: number
  resolution_number: string
  start_date: string
  end_date: string
  months: number
}

export interface Bill {
  id: number
  document: Document
  number: string
  reference_code: string
  operation_type: OperationType
  order_reference: any
  status: number
  send_email: number
  qr: string
  cufe: string
  validated: string
  gross_value: string
  taxable_amount: string
  tax_amount: string
  discount_amount: string
  surcharge_amount: string
  total: string
  observation: any
  errors: any[]
  created_at: string
  payment_due_date: any
  qr_image: string
  has_claim: number
  is_negotiable_instrument: number
  payment_form: PaymentForm
  payment_method: PaymentMethod
  public_url: string
}

export interface Document {
  code: string
  name: string
}

export interface OperationType {
  code: string
  name: string
}

export interface PaymentForm {
  code: string
  name: string
}

export interface PaymentMethod {
  code: string
  name: string
}

export interface Item {
  scheme_id: any
  note: string
  code_reference: string
  name: string
  quantity: string
  discount_rate: string
  discount: string
  gross_value: string
  tax_rate: string
  taxable_amount: string
  tax_amount: string
  price: string
  is_excluded: number
  unit_measure: UnitMeasure
  standard_code: StandardCode
  tribute: Tribute2
  total: number
  withholding_taxes: any[]
  mandate: any
}

export interface UnitMeasure {
  id: number
  code: string
  name: string
}

export interface StandardCode {
  id: number
  code: string
  name: string
}

export interface Tribute2 {
  id: number
  code: string
  name: string
}

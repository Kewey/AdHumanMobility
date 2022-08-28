import { DefaultStrapyEntity } from './api'
import { Disturbance } from './disturbance'

export interface Referent extends DefaultStrapyEntity {
  companyName: string
  lastname?: string
  firstname?: string
  postalCode?: string
  phone?: string
  job?: string
  postalAdresse?: string
  mail?: string
  pertubations?: Disturbance[]
}

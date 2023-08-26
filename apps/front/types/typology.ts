import { Media } from './media'

export interface Typology {
  id: string
  label: string
  color: string
  icon: Media
  parent: Typology[]
  children: Typology[]
}

export enum TYPOLOGY_ENUM {
  TYPOLOGY = 'typology',
  CATEGORY = 'category',
  SUB_CATEGORY = 'subCategory',
}

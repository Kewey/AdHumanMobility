import { DefaultStrapyEntity, StrapiEntity } from './api'
import { Media } from './media'

export interface DisturbanceTypes extends DefaultStrapyEntity {
  label: string
  icon: { data: StrapiEntity<Media> }
}

export interface Typology extends DisturbanceTypes {
  categories: { data: StrapiEntity<Category>[] }
}

export interface Category extends DisturbanceTypes {
  typologies: { data: StrapiEntity<Typology>[] }
  sub_categories: { data: StrapiEntity<Typology>[] }
}

export interface Subcategory extends DisturbanceTypes {
  categories: { data: StrapiEntity<Category>[] }
}

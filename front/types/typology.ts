import { DefaultStrapyEntity, StrapiEntity } from './api'
import { Media } from './media'

export interface disruptionTypes extends DefaultStrapyEntity {
  label: string
  icon: { data: StrapiEntity<Media> }
  color: string
}

export interface Typology extends disruptionTypes {
  categories: { data: StrapiEntity<Category>[] }
}

export interface Category extends disruptionTypes {
  typologies: { data: StrapiEntity<Typology>[] }
  sub_categories: { data: StrapiEntity<Typology>[] }
}

export interface Subcategory extends disruptionTypes {
  categories: { data: StrapiEntity<Category>[] }
}

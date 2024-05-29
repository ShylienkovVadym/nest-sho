import { Uuid } from '@common/type'
import { CategoryCreateData, CategoryData } from '@core/domain/category/entity/protocol'
import { CATEGORY_ID_NEW } from '@core/domain/category/entity/constant'

export class Category {
  public readonly id: Uuid

  #name: string

  public get name(): string {
    return this.#name
  }

  public set name(name: string) {
    this.#name = name
    this.update()
  }

  #parentCategoryId?: Uuid

  public get parentCategoryId(): Uuid | undefined {
    return this.#parentCategoryId
  }

  public set parentCategoryId(parentCategoryId: Uuid | undefined) {
    this.#parentCategoryId = parentCategoryId
    this.update()
  }

  public readonly created: Date

  #updated: Date

  public get updated(): Date {
    return this.#updated
  }

  public constructor(data: CategoryData) {
    this.id = data.id
    this.#name = data.name
    this.#parentCategoryId = data.parentCategoryId
    this.created = data.created
    this.#updated = data.updated
  }

  public static create(data: CategoryCreateData): Category {
    const created = new Date()
    return new Category({ id: CATEGORY_ID_NEW, created, updated: created, ...data })
  }

  private update(): void {
    this.#updated = new Date()
  }
}

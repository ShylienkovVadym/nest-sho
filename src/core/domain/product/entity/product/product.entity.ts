// eslint-disable-next-line import/named
import { PRODUCT_ID_NEW } from '../constant'
import { Uuid } from '@common/type'
import { ProductCreateData, ProductData } from '@core/domain/product/entity/protocol'

export class Product {
  public readonly id: Uuid

  #productName: string

  public get productName(): string {
    return this.#productName
  }

  public set productName(productName: string) {
    this.#productName = productName
    this.update()
  }

  #description: string

  public get description(): string {
    return this.#description
  }

  public set description(description: string) {
    this.#description = description
    this.update()
  }

  #price: number

  public get price(): number {
    return this.#price
  }

  public set price(price: number) {
    this.#price = price
    this.update()
  }

  #brand: string

  public get brand(): string {
    return this.#brand
  }

  public set brand(brand: string) {
    this.#brand = brand
    this.update()
  }

  public readonly created: Date

  #updated: Date

  public get updated(): Date {
    return this.#updated
  }

  public constructor(data: ProductData) {
    this.id = data.id
    this.#productName = data.productName
    this.#description = data.description
    this.#price = data.price
    this.#brand = data.brand
    this.created = data.created
    this.#updated = data.updated
  }

  public static create(data: ProductCreateData): Product {
    const created = new Date()
    return new Product({ id: PRODUCT_ID_NEW, created, updated: created, ...data })
  }

  private update(): void {
    this.#updated = new Date()
  }
}

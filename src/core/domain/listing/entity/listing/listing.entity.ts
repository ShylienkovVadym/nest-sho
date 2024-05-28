import { Uuid } from '@common/type'
import { LISTING_ID_NEW } from '@core/domain/listing/entity/constant'
import { ListingCreateData, ListingData } from '@core/domain/listing/entity/protocol'
import { ListingCondition } from '@core/domain/listing/entity/enum'

export class Listing {
  public readonly id: Uuid

  #title: string

  public get title(): string {
    return this.#title
  }

  public set title(title: string) {
    this.#title = title
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

  #condition: ListingCondition

  public get condition(): ListingCondition {
    return this.#condition
  }

  public set condition(condition: ListingCondition) {
    this.#condition = condition
    this.update()
  }

  public readonly created: Date

  #updated: Date

  public get updated(): Date {
    return this.#updated
  }

  public constructor(data: ListingData) {
    this.id = data.id
    this.#title = data.title
    this.#description = data.description
    this.#price = data.price
    this.#condition = data.condition
    this.created = data.created
    this.#updated = data.updated
  }

  public static create(data: ListingCreateData): Listing {
    const created = new Date()
    return new Listing({ id: LISTING_ID_NEW, created, updated: created, ...data })
  }

  private update(): void {
    this.#updated = new Date()
  }
}

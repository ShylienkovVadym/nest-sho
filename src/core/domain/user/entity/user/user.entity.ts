import { UserStatus } from '../enum'
import { UserCreateData, UserData } from '../protocol'
import { USER_ID_NEW } from '../constant'
import { Uuid } from '@common/type'

export class User {
  public readonly id: Uuid

  #firstName: string

  public get firstName(): string {
    return this.#firstName
  }

  public set firstName(firstName: string) {
    this.#firstName = firstName
    this.update()
  }

  #lastName: string

  public get lastName(): string {
    return this.#lastName
  }

  public set lastName(lastName: string) {
    this.#lastName = lastName
    this.update()
  }

  #status: UserStatus

  public get status(): UserStatus {
    return this.#status
  }

  public set status(status: UserStatus) {
    this.#status = status
    this.update()
  }

  public readonly created: Date

  #updated: Date

  public get updated(): Date {
    return this.#updated
  }

  public constructor(data: UserData) {
    this.id = data.id
    this.#firstName = data.firstName
    this.#lastName = data.lastName
    this.#status = data.status
    this.created = data.created
    this.#updated = data.updated
  }

  public static create(data: UserCreateData): User {
    const created = new Date()
    return new User({ id: USER_ID_NEW, created, updated: created, ...data })
  }

  private update(): void {
    this.#updated = new Date()
  }
}

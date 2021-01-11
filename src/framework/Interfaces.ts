/**
 *
 * @author Nicolas Minig
 */
export class Entity {
    id: number
    uuid?: string
}

export class EntityTS extends Entity {
    createdAt: Date = null // null is important here to have the property exists
    updatedAt: Date = null // idem
    timestamp(): void {
        if (!this.createdAt) {
            this.createdAt = new Date()
        }
        this.updatedAt = new Date()
    }
}

export interface Application {
    applicationContext: IApplicationContext
    start(): Promise<unknown>
    stop(): void
}

export interface ApplicationController<T extends Entity> {
    getControllerName(): string
    getRequestAdapter(): RequestAdapter<T>
    getUseCase(): UseCase<T>
    getValidator(): Validator
}

export type Bag<T> = Map<string, T>
export type ControllerMap = Map<string, ApplicationController<Entity>>

export interface IComponent {

}
export interface IApplicationContext {

    registerComponent(name: string, component: IComponent): void
    getComponent(name: string): IComponent
    isComponentExist(name: string): IComponent
    getApplicationName(): string

    /*registerController(
        name: string,
        controller: ApplicationController<Entity>,
    ): void
    getController(name: string): ApplicationController<Entity>
    registerRepository(name: string, repository: Repository<Entity>): void
    getRepository(name: string): Repository<Entity>
    registerUseCase(name: string, useCase: UseCase<Entity>): void
    getUseCase(name: string): UseCase<Entity>
    registerService(name: string, Service: Service): void
    getService(name: string): Service*/
}

export type ValidationErrorDetails = {
    field: string
    path: string
    message: string
}

export type ValidationResult = {
    valid: boolean
    details?: ValidationErrorDetails[]
}
export interface Validator {
    // className: string
    validate(inputData: unknown): ValidationResult
}

export interface Factory<T> {
    items: Map<string, T>
    register(name: string, t: T): void
    getByName(name: string): T
    isExists(name: string): boolean
}

export type FetchResult<T extends Entity> = {
    entities: T[]
    page: number
    pageSize: number
    count: number
}

export type UseCaseFactory = Factory<UseCase<Entity>>

export interface Repository<T extends Entity> {
    save(entity: T): Promise<T>
    getById(id: number): Promise<T>
    deleteById(id: number): Promise<T>
    fetch(filter: Filter): Promise<FetchResult<T>>
}

export type Filter = {
    start?: Date
    end?: Date
}

export type UseCaseParameters<T extends Entity> = {
    id?: number
    entity?: T
    filter?: Filter
}
export interface UseCase<T extends Entity> {
    execute(params: UseCaseParameters<T>): Promise<UseCaseResult<T>>
}

export type UseCaseResult<T extends Entity> = {
    success: boolean
    opTimestamp?: Date
    entity?: T
    fetchResult?: FetchResult<T>
}

export enum AccessRights {
    none = 'none',
    read = 'read',
    write = 'write', // If you write, you can read by default
    all = 'all',
}

export type GrantAccess = {
    domain: string
    right: AccessRights
}

export function matchGrant(
    requestGrant: GrantAccess,
    existingGrants: GrantAccess[],
): boolean {
    if (!requestGrant || !existingGrants) {
        return false
    }
    for (let i = 0; existingGrants.length; i++) {
        const existingGrant = existingGrants[i]
        if (
            existingGrant.domain === requestGrant.domain ||
            existingGrant.domain === '*'
        ) {
            return (
                // All access
                existingGrant.right === AccessRights.all ||
                // Must match the rights
                existingGrant.right === requestGrant.right ||
                // Or, if write right is granted, this means the read right is accepted
                (existingGrant.right === AccessRights.write &&
                    requestGrant.right === AccessRights.read)
            )
        }
    }
    return false // False by default
}

export type User = {
    uid: string
    grantAccesses: GrantAccess[]
}

export interface RequestAdapter<T extends Entity> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    convertDataToEntity(data: any): T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    convertDataToFilter(data: any): Filter
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceParameters = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceResult = any

export interface Service {
    getName(): string
}

/**
 *
 * @author Nicolas Minig
 */
export declare class Entity {
    id: number;
    uuid?: string;
}
export declare class EntityTS extends Entity {
    createdAt: Date;
    updatedAt: Date;
    timestamp(): void;
}
export interface Application {
    applicationContext: ApplicationContext;
    start(): Promise<unknown>;
    stop(): void;
}
export interface ApplicationController<T extends Entity> {
    getControllerName(): string;
    getRequestAdapter(): RequestAdapter<T>;
    getUseCase(): UseCase<T>;
    getValidator(): Validator;
}
export declare type Bag<T> = Map<string, T>;
export declare type ControllerMap = Map<string, ApplicationController<Entity>>;
export interface ApplicationContext {
    port?: number;
    useCaseFactory: UseCaseFactory;
    controllers: Map<string, ApplicationController<Entity>>;
    registerController(name: string, controller: ApplicationController<Entity>): void;
    getController(name: string): ApplicationController<Entity>;
    registerRepository(name: string, repository: Repository<Entity>): void;
    getRepository(name: string): Repository<Entity>;
    registerUseCase(name: string, useCase: UseCase<Entity>): void;
    getUseCase(name: string): UseCase<Entity>;
    registerService(name: string, Service: Service): void;
    getService(name: string): Service;
}
export declare type ValidationErrorDetails = {
    field: string;
    path: string;
    message: string;
};
export declare type ValidationResult = {
    valid: boolean;
    details?: ValidationErrorDetails[];
};
export interface Validator {
    validate(inputData: unknown): ValidationResult;
}
export interface Factory<T> {
    items: Map<string, T>;
    register(name: string, t: T): void;
    getByName(name: string): T;
    isExists(name: string): boolean;
}
export declare type FetchResult<T extends Entity> = {
    entities: T[];
    page: number;
    pageSize: number;
    count: number;
};
export declare type UseCaseFactory = Factory<UseCase<Entity>>;
export interface Repository<T extends Entity> {
    save(entity: T): Promise<T>;
    getById(id: number): Promise<T>;
    deleteById(id: number): Promise<T>;
    fetch(filter: Filter): Promise<FetchResult<T>>;
}
export declare type Filter = {
    start?: Date;
    end?: Date;
};
export declare type UseCaseParameters<T extends Entity> = {
    id?: number;
    entity?: T;
    filter?: Filter;
};
export interface UseCase<T extends Entity> {
    execute(params: UseCaseParameters<T>): Promise<UseCaseResult<T>>;
}
export declare type UseCaseResult<T extends Entity> = {
    success: boolean;
    opTimestamp?: Date;
    entity?: T;
    fetchResult?: FetchResult<T>;
};
export declare enum AccessRights {
    none = "none",
    read = "read",
    write = "write",
    all = "all"
}
export declare type GrantAccess = {
    domain: string;
    right: AccessRights;
};
export declare function matchGrant(requestGrant: GrantAccess, existingGrants: GrantAccess[]): boolean;
export declare type User = {
    uid: string;
    grantAccesses: GrantAccess[];
};
export interface RequestAdapter<T extends Entity> {
    convertDataToEntity(data: any): T;
    convertDataToFilter(data: any): Filter;
}
export declare type ServiceParameters = any;
export declare type ServiceResult = any;
export interface Service {
    getName(): string;
}

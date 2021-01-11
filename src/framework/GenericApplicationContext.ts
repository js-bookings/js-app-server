import * as assert from 'assert'
import {
    IApplicationContext,
    UseCaseFactory,
    Entity,
    ApplicationController,
    UseCase,
    Repository,
    Service,
    IComponent,
} from './Interfaces'

/**
 * GenericApplicationContext
 *
 * Generic implementation of an application context.
 *
 * @author Nicolas Minig
 */
export default class GenericApplicationContext implements IApplicationContext {
    protected applicationName: string
    protected _port: number
    protected components: Map<string, IComponent> = new Map<string, IComponent>()

    constructor(applicationName: string) {
        this.applicationName = applicationName
        this._port = 3000
    }

    getApplicationName(): string {
        return this.applicationName
    }

    get port(): number {
        return this._port
    }

    registerComponent(
        name: string,
        component: IComponent
    ): void {
        this.components.set(name, component)
    }

    getComponent(name: string): IComponent {
        const component: IComponent = this.components.get(name)
        assert.ok(
            component,
            `No component for name '${name}' found in application context.`,
        )
        return component
    }

    isComponentExist(name: string): boolean {
        return this.components.has(name)
    }

}

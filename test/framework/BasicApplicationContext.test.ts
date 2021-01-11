import GenericApplicationContext from '../../src/framework/GenericApplicationContext'
import { IComponent } from '../../src/framework/Interfaces'

describe('BasicApplicationContext', () => {
    const appName = 'My Great App'

    it('Should construct', () => {
        const appContext = new GenericApplicationContext(appName)
        expect(appContext).not.toBeNull()
        expect(appContext.getApplicationName()).toEqual(appName)
        expect(appContext.port).toEqual(3000)
    })

    it('Should register & get a component', () => {
        const component = {} as IComponent
        const appContext = new GenericApplicationContext(appName)
        appContext.registerComponent('myComp', component)
        const registeredComponent = appContext.getComponent('myComp')
        expect(registeredComponent).not.toBeNull()
        expect(registeredComponent).toBe(component)
    })

    it('Should exist after registration', () => {
        const component = {} as IComponent
        const appContext = new GenericApplicationContext(appName)
        appContext.registerComponent('myComp', component)
        expect(appContext.isComponentExist('myComp')).toEqual(true)
    })
})
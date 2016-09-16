import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {
    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position[0]).to.be.a("number")
        expect(p.position[1]).to.be.a("number")
        expect(p.velocity[0]).to.be.a("number")
        expect(p.velocity[1]).to.be.a("number")
        expect(p.mass).to.be.a("number")
        expect(p.acceleration[0]).to.be.a("number")
        expect(p.acceleration[1]).to.be.a("number")
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, {width : 800, height : 800})
        expect(position[0]).to.equal(1.5)
        expect(position[1]).to.equal(0.5)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, {width : 800, height : 800}) // dt is different here
        expect(position[0]).to.equal(2.0)
        expect(position[1]).to.equal(0.0)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ position: [1, 1], velocity: [1, 1], acceleration: [1, 1] })
        const { velocity } = update(p, 1.0, {width : 800, height : 800})
        expect(velocity[0]).to.equal(2.0)
        expect(velocity[1]).to.equal(2.0)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p = particle({ position: [1000, 1000]})
        const { position } = update(p, 1.0,{width : 800, height : 800})// dt is different here
        expect(position[0]).to.equal(400)
        expect(position[1]).to.equal(400)
    })

})

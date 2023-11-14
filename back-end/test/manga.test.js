/*import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.mjs"


/* To run the test, first run:
    npm install --save-dev c8 mocha chai supertest chai-http
and then run:
    npm test

All test should pass, and (this is from Bloomberg):
Each developer must have written unit tests using the mocha and chai modules 
that provide at least 10% code coverage of the back-end code.
So in total we need 50% code coverage I think.
*/


const { expect } = chai

chai.use(chaiHttp)

describe('GET /manga/search/id/:id', () => {
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/search/id/1234')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/search/id/4505')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
})


describe('GET /manga/search2/id/:id', () => {
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/search2/id/1235')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
})


describe('GET /manga/mangasearch/:entry', () => {
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/mangasearch/Berserk')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
})


describe('GET /manga/recommendation/:num', () => {
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/recommendation/3')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
})

describe('GET /manga/recommendation/genre/:genreName', () => {
    it('should return a json', async () => {
        const res = await chai.request(app).get('/manga/recommendation/genre/Action')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
    })
})

import mongoose from "mongoose" 

import chai from "chai" 
import chaiHttp from "chai-http" 
import app from "../app.mjs"

const { expect } = chai

//Our parent block
describe('Manga Routes', () => {
    /*
      * Test the /GET route
      */
    describe('/GET Manga Routes', () => {
        it('Return Object', async () => {
            const res = await chai.request(app).get("/manga")
            expect(res).to.have.status(200) 
            expect(res.body).to.be.an("object") 
           
        });
    });

    describe('/GET Manga Routes', () => {
        it('Return JSON', async () => {
            const res = await chai.request(app).get("/manga/search/12345")
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")

        });
    });
    describe('/GET Manga Routes', () => {
        it('Return Array', async () => {
            const res = await chai.request(app).get("/manga/search2/12345")
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("array")

        });
    });
    describe('/GET Manga Routes', () => {
        it('Return JSON', async () => {
            const res = await chai.request(app).get("/manga/upcoming/5")
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
        });
    });
    describe('/GET Manga Routes', () => {
        it('Return JSON', async () => {
            const res = await chai.request(app).get("/manga/recent/5")
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
        });
    });
});


describe("Auth Routes", () => {
    describe('/GET Auth Routes', () => {
        it('Return JSON', async () => {
            const res = await chai.request(app).get("/auth")
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
        });
    });
});


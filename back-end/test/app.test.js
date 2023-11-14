//During the test the env variable is set to test

import mongoose from "mongoose" 

import chai from "chai" 
import chaiHttp from "chai-http" 
import app from "../app.mjs"

let should = chai.should(); 

chai.use(chaiHttp);
//Our parent block
describe('Manga Routes', () => {
    /*
      * Test the /GET route
      */
    describe('/GET Manga Routes', () => {
        it('it should GET all the books', (done) => {
            chai.request("http://localhost:8080")
                .get('/manga/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});

describe("Auth Routes", () => {
    describe("/GET Auth Routes", () => {
        
    })
});
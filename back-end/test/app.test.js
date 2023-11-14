// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// import mongoose from "mongoose" 

// import chai from "chai" 
// import chaiHttp from "chai-http" 
// import app from "../app.mjs"

// let should = chai.should(); 

// chai.use(chaiHttp);
// //Our parent block
// describe('Manga Routes', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => {
//             done();
//         });
//     });
//     /*
//       * Test the /GET route
//       */
//     describe('/GET book', () => {
//         it('it should GET all the books', (done) => {
//             chai.request(server)
//                 .get('/book')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//         });
//     });

// });
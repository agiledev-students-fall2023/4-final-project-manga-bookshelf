
import chai from "chai" 
import chaiHttp from "chai-http" 
import app from "../app.mjs"

 const { expect } = chai

 chai.use(chaiHttp)

  describe('GET /comment/MockComments', () => {
      it('should return the comments in json format', async () => {
        const res = await chai.request(app).get('/comment/MockComments')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
      })
  })
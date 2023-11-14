import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.mjs"
import UserService from "../Service/userService.js"
import userMockData from "../public/userMockData.json" assert { type: "json" }
import { User } from "jikan4.js"

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

/* 
    describe() is used to group together similar tests. 
    it() is used to create a single test.
    expect() is used to make assertions about the test.
*/

/*

these are untested routes

// to follow a user
app.post(`/${BASE_ROUTE_USER}/:id/follow`, async (req, res) => {
    await User.followUser(req.params.id, req.body.followingId)
    res.send('seccess follow')
})

// to unfollow a user
app.post(`/${BASE_ROUTE_USER}/:id/unfollow`, async (req, res) => {
    await User.unfollowUser(req.params.id, req.body.unfollowingId)
    res.send('success unfollow')
})

// to remove a user
app.post(`/${BASE_ROUTE_USER}/:id/remove`, async (req, res) => {
    // await User.removeUser(req.params.id)
    // await User.unfollowUser(req.params.id, req.body.removingId)
    await User.removeUser(req.params.id, req.body.removingId)
    res.send('success remove')
})

app.get(`/${BASE_ROUTE_COMMENT}/MockComments`, (req, res) => {
    res.json(forumData);
  });

//get the profile lists 
app.get(`/${BASE_ROUTE_USER}/:id/profileInfo`, UserController.getUserData)

app.get('/getProfileLists', (req,res) => {
    res.json(sampleProfileList);
})*/

describe('UserController', () => {
    describe('GET /user/:id/followers', () => {
        it('should return an array of followers', async () => {
            const res = await chai.request(app).get('/user/1/followers')
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
        })

        it('should return an error if user does not exist', async () => {
            const res = await chai.request(app).get('/user/100/followers')
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('error')
        })
    })

    describe('GET /user/:id/following', () => {
        it('should return an array of following', async () => {
            const res = await chai.request(app).get('/user/1/following')
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
        })
        it('should return an error if user does not exist', async () => {
            const res = await chai.request(app).get('/user/100/following')
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('error')
        })
    })
})

describe('UserService', () => {
    describe('getUserData', () => {
        it('should return user data for an existing user', async () => {
            const userId = "1"
            const expectedUser = userMockData.users.find((user) => user.id === userId);
            const actualUser = await UserService.getUserData(userId)
            expect(actualUser).to.be.an('object')
            expect(actualUser).to.deep.equal(expectedUser)
        })
        it('should return an error if user does not exist', async () => {
            const userId = 'asfoij'
            try {
                await UserService.getUserData(userId)
                expect.fail('getUserData should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('User not found.')
            }
        })
    })
})


// Need more tests for User.js


import chai from "chai"
import chaiHttp from "chai-http"
import app from "../app.mjs"
import UserService from "../Service/userService.js"
import userMockData from "../public/userMockData.json" assert { type: "json" }
import { getUserData, unfollowUser, removeUser, getUserCurrentReading } from "../helpers/User.js";


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
    //test this until the database is ready 
    /*
    describe('saveUserData', () => {
        it('should save user data to a file', async () => {
            const testData = {
                users: [
                    {
                        id: '101',
                        name: 'TestUser',
                        following: [],
                        followers: [],
                        bio: 'This is a test user.',
                        avatar: 'https://placekitten.com/g/200/200',
                        twitter: 'test_user_handle',
                    },
                ],
            };

            try {
                await UserService.saveUserData(testData);
                // Read the saved data from the file
                const savedData = fs.readFileSync('./public/userMockData.json', 'utf-8');
                const parsedSavedData = JSON.parse(savedData);

                // Ensure that the saved data matches the testData
                expect(parsedSavedData).to.deep.equal(testData);
            } catch (err) {
                // If an error occurs during the test, fail the test
                expect.fail('saveUserData should not throw an error');
            }
        });
    });
    
    

    describe('followUser', () => {
        it('should return a 404 error if the user is not found', async () => {
            const userId = 'nonexistentUser';
            const followId = '2'; 
            try {
                await UserService.followUser(userId, followId);
                expect.fail('followUser should have thrown an error for non-existent user');
            } catch (err) {
                expect(err.status).to.equal(404);
                expect(err.message).to.equal('User not found.');
            }
        });
    
        it('should return a 404 error if the follow target user is not found', async () => {
            const userId = '1'; 
            const followId = 'nonexistentFollowUser';
            try {
                await UserService.followUser(userId, followId);
                expect.fail('followUser should have thrown an error for non-existent follow target user');
            } catch (err) {
                expect(err.status).to.equal(404);
                expect(err.message).to.equal('User not found.');
            }
        });
    
        it('should not perform any action if the user is already following the target', async () => {
            const userId = '1'; 
            const followId = '2'; // user 1 is already following user 2
            await UserService.followUser(userId, followId);
            // Verify that the user's following list did not change
            // This may involve fetching user data and checking that the followId is still there
        });
    
        it('should successfully add the follow target to the user’s following list', async () => {
            const userId = '1'; 
            const followId = '3'; // Assume user 1 is not following user 3
            await UserService.followUser(userId, followId);
            // Verify that the user's following list now includes followId
            // This may involve fetching user data and checking that the followId is added
        });
    });
    */

})


// Need more tests for User.js
/*
describe('User', () => {
    describe('POST /user/:id/unfollow', () => {
        it('should unfollow a user successfully', async () => {
            const userId = 1;
            const unfollowId = 2;
        
            // Mock getUserData to return mock data
            const originalGetUserData = UserService.getUserData;

        
            // Mock unfollowUser to resolve the promise
            const originalUnfollowUser = UserService.unfollowUser;
            UserService.unfollowUser = async () => Promise.resolve(); // Resolve the promise
        
            // Make the request to the endpoint
            const res = await chai.request(app).post(`/user/${userId}/unfollow`).send({ unfollowId }) .end((err, res) => {
                expect(res).to.have.status(400);
                console.log('not posted')
                // Handle errors or additional assertions here if needed
             });
        });
        
        it('should return an error if a user does not exist', async () => {
            // 404 cases
            const userId = 1;
            const unfollowUserId = 2;
            
            try {
                // Attempt to call unfollowUser
                await unfollowUser(userId, unfollowUserId);
                
                // If the function didn't throw an error, fail the test
                assert.fail('Expected an error to be thrown.');
            } catch (error) {
                // Check the error details
                expect(error.status).to.equal(undefined);
                //expect(error.message).to.equal('User not found.');
            }
        });
         
    })

    describe("POST /user/:id/remove", () => {
        it('should remove a user and update the data correctly', async () => {
            // Mock data and functions
            const userId = 1;
            const removeId = 2;
            const mockData = {
              users: [
                { id: 1, followers: [2], following: [2] },
                { id: 2, followers: [1], following: [1] },
              ],
            };
        
            const mockGetUserData = async () => mockData;
            const mockSaveUserData = async (data) => {
              // Assuming you have a way to check the saved data
              // You can add assertions here if needed
            };
        
            // Mock the saveUserData function in your module
            const originalSaveUserData = require('../helpers/User.js').saveUserData;
            require('../helpers/User.js').saveUserData = mockSaveUserData;
        
            // Call the removeUser function
            await removeUser(userId, removeId, mockGetUserData);
        
            // Assert that the data was updated correctly
            const updatedData = await mockGetUserData();
            const user = updatedData.users.find((u) => u.id === userId);
            const removedUser = updatedData.users.find((u) => u.id === removeId);
        
            expect(user.following).to.not.include(removeId);
            expect(removedUser.followers).to.not.include(userId);
        
            // Restore the original saveUserData function
            require('../helpers/User.js').saveUserData = originalSaveUserData;
          })

        it('should return an error if the user does not exist', async () => { 
            const userId = "1"
            const allUsers = await getUserData();
            const res = allUsers.users.find((user) => user.id === userId)
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('error')
        })

        it('should return an error if the removed user does not exist', async() => {
            const removeId = "2"
            const allUsers = await getUserData();
            const res = allUsers.users.find((user) => user.id === removeId)
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('error')
        })
    })

    describe("POST /user/:id/getCurrentUserReading", () => {
        it('should return the current reading list for a user', async () => {
            // Mock data and functions
            const userId = 1;
            const data = await getUserData();
            const user = data.find((u) => u.id === userId);
            // Call the getUserCurrentReading function
            const bookList = user.currentReading;
            expect(bookList).to.be.an('object')
          });
        
          it('should handle the case where the user is not found', async () => {
            // Mock data and functions
            const res = await chai.request(app).get('/user/999/getCurrentlyReading')
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('error');
          });

    })
})
*/
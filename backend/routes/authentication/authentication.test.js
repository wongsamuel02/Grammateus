const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../model/Users'); 
const bcrpty = require('bcrypt');
require('dotenv').config();

// MongoDB in-memory server for testing
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
});

const email = 'TestingEmail@example.com'
const password = 'Password123!'
let jwt;

describe('Authentication Tests', () => {
    // Test create new user
    it('should register new user to DB', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                email: email,
                password: password,
            });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: `New user ${email} created!`,
        });
    });

    // Test Authentication (Login)
    it('should be able to login (authenticate)', async () => {
        // Logging in
        let response = await request(app)
            .post('/auth')
            .send({
                email: email,
                password: password,
            });
        expect(response.status).toBe(200);
        jwt = response.body.accessToken
        expect(jwt).toBeTruthy();

        // Check if we are authenticated
        response = await request(app)
            .get('/isVerified')
            .set('Authorization', `Bearer ${jwt}`)

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({"message": "Verified"});
    });

    // Test Logging out
    it('should log us out', async () => {
        // Logging out
        let response = await request(app)
            .get('/logout')

        expect(response.status).toBe(204);
    });
});
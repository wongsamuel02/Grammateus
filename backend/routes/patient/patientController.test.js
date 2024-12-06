// const request = require('supertest');
// const app = require('../../app');
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const Patient = require('../../controllers/patientController');
// const User = require('../../model/Users');
// const bcrpty = require('bcrypt');
// const { beforeEach } = require('node:test');
// require('dotenv').config();

// // MongoDB in-memory server for testing
// let mongoServer;
// let jwtToken;

// const BASE_URL = '/patient'

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//   // Seed the database with a test users
//   const password = 'Password123!'
//   const hashedPassword = await bcrpty.hash(password, 10)
  
//   const testUser = new User({
//       email: 'testuser@example.com',
//       password: hashedPassword, 
//   });
  
//   await testUser.save();
  
//   const response = await request(app)
//         .post('/auth')
//         .send({
//             email: 'testuser@example.com',
//             password: 'Password123!',
//         });
//   jwtToken = response.body.accessToken;
// });

// beforeEach(async () => {
//   await mongoose.connection.db.dropDatabase();
//   try {
//         // Example: Remove all existing users
//         await Patient.deleteMany({});

//         // Example: Add some test users
//         await Patient.create([
//             {
//               firstName: 'John',
//               lastName: 'Doe',
//               dob: '1990-01-01',
//               gender: 'Male',
//               phoneNumber: '1234567890',
//               email: 'john.doe@example.com',
//             },
//             {
//               firstName: 'Bob',
//               lastName: 'Doe',
//               dob: '1990-01-01',
//               gender: 'Female',
//               phoneNumber: '1234567891',
//               email: 'Bob.doe@example.com',
//             }
//         ]);

//         console.log('Database seeded!');
//     } catch (err) {
//         console.error('Error seeding database:', err);
//     }
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('Patient Controller Tests', () => {
//   // Test Create Patient (/patient/create)
//   const createUrl= '/create'
//   it('should create a new patient', async () => {
//     const patientData = {
//       firstName: 'a',
//       lastName: 'b',
//       dob: '1990-01-01',
//       gender: 'Male',
//       phoneNumber: '0000000000',
//       email: 'a.b@example.com',
//       reason: 'Checkup'
//     };

//     const response = await request(app)
//       .post(BASE_URL + createUrl)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(patientData)

//     expect(response.status).toBe(201);
//     expect(response.body.firstName).toBe('a');
//     expect(response.body.lastName).toBe('b');
//     expect(response.body.dob).toBe('1990-01-01T00:00:00.000Z');
//     expect(response.body.gender).toBe('Male');
//     expect(response.body.phoneNumber).toBe('0000000000');
//     expect(response.body.email).toBe('a.b@example.com');
//     expect(response.body.reasonOfVisit).toHaveLength(1);
//   });

//   it('should create a new patient without reasonOfVisit', async () => {
//     const patientData = {
//       firstName: 'Bob',
//       lastName: 'Doe',
//       dob: '1990-01-01',
//       gender: 'Female',
//       phoneNumber: '1111111111',
//       email: 'b.b@example.com',
//     };

//     const response = await request(app)
//       .post(BASE_URL + createUrl)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(patientData)

//     expect(response.status).toBe(201);
//     expect(response.body.firstName).toBe('Bob');
//     expect(response.body.lastName).toBe('Doe');
//     expect(response.body.dob).toBe('1990-01-01T00:00:00.000Z');
//     expect(response.body.gender).toBe('Female');
//     expect(response.body.phoneNumber).toBe('1111111111');
//     expect(response.body.email).toBe('b.b@example.com');
//     expect(response.body.reasonOfVisit).toHaveLength(0);
//   });

//   // Test addReasonOfVisitForPatient (/patient/addReasonOfVisitForPatient)
//   const addReasonURL = '/addReasonOfVisitForPatient'
//   it('addReasonOfVisitForPatient with phoneNumber and email', async () => {
//     const body = {
//       email: 'Bob.doe@example.com',
//       phoneNumber: '1234567891',
//       reason: 'Checkup'
//     };

//     const response = await request(app)
//       .post(BASE_URL + addReasonURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body)

//     expect(response.status).toBe(201);
//     expect(response.body.reasonOfVisit).toHaveLength(1);
//   });

//   it('addReasonOfVisitForPatient with email', async () => {
//     const body = {
//       email: 'john.doe@example.com',
//       reason: 'Checkup'
//     };

//     const response = await request(app)
//       .post(BASE_URL + addReasonURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body)

//     expect(response.status).toBe(200);
//     expect(response.body.reasonOfVisit).toHaveLength(1);
//   });

//   it('addReasonOfVisitForPatient with no email or phoneNumber', async () => {
//     const body = {
//       reason: 'Checkup'
//     };

//     const response = await request(app)
//       .post(BASE_URL + addReasonURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body)

//     expect(response.status).toBe(400);
//   });

//   it('addReasonOfVisitForPatient with no reason', async () => {
//     const body = {
//       email: 'Bob.doe@example.com',
//     };

//     const response = await request(app)
//       .post(BASE_URL + addReasonURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body)

//     expect(response.status).toBe(400);
//   });

//   // Test Get All (/patient/getAll)
//   const getAllURL = '/getAll'
//   it('getAll w/o Authorization', async () => {
//     const response = await request(app)
//       .get(BASE_URL + getAllURL)

//       expect(response.status).toBe(401)
//       expect(response.body).toEqual({})
//   });
    
//   it('getAll w Authorization', async () => {
//       const response = await request(app)
//       .get(BASE_URL + getAllURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
    
//       expect(response.status).toBe(200)
//       expect(response.body).toHaveLength(2)
//   });

//   // Test Get Patient (/patient/get)
//   const getPatientURL = '/get'
//   it('getPatient w/o Identifier', async () => {
//     const reqBody = {}

//     const response = await request(app)
//       .get(BASE_URL + getPatientURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(reqBody)

//     expect(response.status).toBe(400)
//     expect(response.body).toEqual({ error: "Either email or phoneNumber required" });
//   });

//   it('getPatient w email', async () => {
//     const reqBody = { email: 'john.doe@example.com' };

//     const response = await request(app)
//       .get(BASE_URL + getPatientURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(reqBody)

//     expect(response.status).toBe(200)
//     expect(response.body.firstName).toBe('John')
//     expect(response.body.lastName).toBe('Doe')
//   });

//   it('getPatient w phoneNumber', async () => {
//     const reqBody = { phoneNumber: '1234567890' };

//     const response = await request(app)
//       .get(BASE_URL + getPatientURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(reqBody)

//     console.log(response.body)

//     expect(response.status).toBe(200)
//     expect(response.body.firstName).toBe('John')
//     expect(response.body.lastName).toBe('Doe')
//   });

//   it('getPatient w email and phoneNumber', async () => {
//     const reqBody = { 
//       email: 'john.doe@example.com', 
//       phoneNumber: '1234567890' 
//     };

//     const response = await request(app)
//       .get(BASE_URL + getPatientURL)
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(reqBody)

//     expect(response.status).toBe(200)
//     expect(response.body.firstName).toBe('John')
//     expect(response.body.lastName).toBe('Doe')
//   });

//   // Test modify (/patient/modify)
//   const modifyUrl= '/modify'
//   it('should return 400 if neither email nor phoneNumber is provided', async () => {
//     const body = {
//       newFirstName: 'John',
//       newLastName: 'Doe'
//     };
//     const response = await request(app)
//       .put(BASE_URL + modifyUrl)  
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body);

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Either email or phoneNumber required');
//   });

//   it('should update the patient information if valid email/phoneNumber is provided', async () => {
//     let body = {
//       email: 'john.doe@example.com',
//       newFirstName: 'Joe',
//       newLastName: 'Smith'
//     };

//     let response = await request(app)
//       .put(BASE_URL + modifyUrl)   
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body);

//     expect(response.status).toBe(200);

//     response = await request(app)
//       .get(BASE_URL + '/get')
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send({email: 'john.doe@example.com'})

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('firstName', 'Joe');
//     expect(response.body).toHaveProperty('lastName', 'Smith');
//     expect(response.body).toHaveProperty('dob', '1990-01-01T00:00:00.000Z');
//     expect(response.body).toHaveProperty('gender', 'Male');
//     expect(response.body).toHaveProperty('phoneNumber', '1234567890');
//     expect(response.body).toHaveProperty('email', 'john.doe@example.com');

//     // Check the reason of visit array
//     expect(response.body.reasonOfVisit).toHaveLength(1);  // Expecting one reason
//     expect(response.body.reasonOfVisit[0]).toHaveProperty('reason', 'Checkup');
//     expect(response.body.reasonOfVisit[0]).toHaveProperty('date');
//   });

//   it('should return 404 if patient is not found', async () => {
//     const body = {
//       email: 'jo.doe@example.com',
//       newFirstName: 'John',
//       newLastName: 'Smith'
//     };

//     let response = await request(app)
//       .put(BASE_URL + modifyUrl)     
//       .set('Authorization', `Bearer ${jwtToken}`)
//       .send(body);

//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Patient not found');
//   });
// })
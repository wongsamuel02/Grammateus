const request = require("supertest")
const express = require('express');
const app = require('../../app');

describe("GET /", () => {
    it("should return 'Backend API Home page'", async () => {
        // Send GET request to the root route
        const response = await request(app).get('/');
        
        // Check the response status
        expect(response.status).toBe(200);
        
        // Check the response body
        expect(response.text).toBe("Backend API Home page");
    });
})
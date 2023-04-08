const request = require('supertest');
const app = require('../index'); // assuming your main application file is named 'index.js'

// Define a test case to check the error handling middleware
describe('Error handling middleware', () => {
  it('should handle errors and send a formatted JSON response to the client', async () => {
    const res = await request(app).get('/api/test');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('statusCode', 500);
    expect(res.body).toHaveProperty('name', 'Error');
    expect(res.body).toHaveProperty('message', 'Test error');
  });
});

// Define a test case to check the signup route
describe('Signup route', () => {
  it('should send a response to the client', async () => {
    const res = await request(app).get('/api/signup');
    expect(res.status).toBe(200);
    expect(res.text).toBe('signup');
  });
});

const server = require('../app');
const request = require('supertest');

const BASE_PATH = '/api/v1';

describe('Endpoint tests', () => {
  afterAll(() => {
    server.close();
  });

  describe('Check environment', () => {
    test('test environment', () => {
      expect(process.env.NODE_ENV).toBe('test');
    });
  });

  describe('Test GET endpoints', () => {
    test('should return all locations', () => {
          return request(server)
          .get(`${BASE_PATH}/locations`)
          .expect('Content-Type', /json/)
              .then(res => {
                const body = res.body;
                expect(body.data).toEqual([])
              })
    });
  });
});
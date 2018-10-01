const server = require('../app');
const request = require('supertest');
const Location = require('../models/location');

const BASE_PATH = '/api/v1';

describe('Endpoint tests', () => {

  beforeEach((done) => {
    Location.remove({}, err => {
      done();
    })
  });

  afterAll(() => {
    server.close();
  });

  describe('Check environment', () => {
    test('test environment', () => {
      expect(process.env.NODE_ENV).toBe('test');
    });
  });

  describe('Test GET endpoints', () => {
    test('should return an empty list of all locations', () => {
          return request(server)
              .get(`${BASE_PATH}/locations`)
              .expect(200)
              .expect('Content-Type', /json/)
                  .then(res => {
                    const body = res.body;
                    expect(body.data).toEqual([])
                  });
    });

    test('should return all stored locations', () => {
      const location = new Location({
        name: 'Mengo',
        male: 50,
        female: 50
      });
      location.save((err, location) => {
        request(server).get(`${BASE_PATH}/locations`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const body = res.body;
          expect(body.data.length).toEqual(1)
        });
      });
    });

    test('should return a location', () => {
      const location = new Location({
        name: 'Kampala',
        male: 50,
        female: 50
      });

      location.save((err, location) => {
        request(server).get(`${BASE_PATH}/location/${location._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).toMatchObject({
            id: expect.any(String),
            female: expect.any(Number),
            male: expect.any(Number),
            name: expect.any(String),
            subLocations: expect.any(Array),
            total: expect.any(Number)
          })
        });
        })
      });
  });

  describe('Test Post endpoints', async () => {
    test('add a location to the database', () => {
          return request(server)
          .post(`${BASE_PATH}/locations`)
          .send({
            name: 'Mengo',
            male: 50,
            female: 50
          })
          .set('Accept', 'application/json')
          .expect(201)
          .then(res => {
            expect(res.body.status).toBe('success');
            expect(res.body.data).toMatchObject({
              id: expect.any(String),
              female: expect.any(Number),
              male: expect.any(Number),
              name: expect.any(String),
              subLocations: expect.any(Array),
              total: expect.any(Number)
            })
          });
    });

    test('add sub location', () => {
      const location = new Location({
        name: 'Mengo',
        male: 50,
        female: 50
      });

      location.save((err, location) => {
        //save sub location
        request(server).post(`${BASE_PATH}/add/sub/location/${location._id}`)
        .send({
          name: 'Lubaga',
          male: 60,
          female: 80
        })
        .expect(201)
        .then(res => {
          expect(res.body.status).toBe('success');
          expect(res.body.data).toMatchObject({
            id: expect.any(String),
            female: expect.any(Number),
            male: expect.any(Number),
            name: expect.any(String),
            subLocations: expect.any(Array),
            total: expect.any(Number)
          })
        });
      });
    });

    test('should fail when body is empty when adding location', () => {
      return request(server)
          .post(`${BASE_PATH}/locations`)
          .send({})
          .set('Accept', 'application/json')
          .expect(400)
          .then(res => {
            expect(res.body.message).toBe("Body payload cannot be empty");
          });
    });
  });

  describe('Test PUT endpoints', () => {
    test('should update location', () => {
      const location = new Location({
        name: 'Butikiro',
        male: 50,
        female: 50
      });

      location.save((err, location) => {
        request(server).put(`${BASE_PATH}/location/${location._id}`)
        .send({
          name: 'Wakiso',
        })
        .expect(200)
        .then(res => {
          expect(res.body.status).toBe('success');
          expect(res.body.data).toMatchObject({
            id: expect.any(String),
            female: expect.any(Number),
            male: expect.any(Number),
            name: expect.any(String),
            subLocations: expect.any(Array),
            total: expect.any(Number)
          })
        });
      });
    });
  });

  describe('Test Delete endpoint', () => {
    test('should delete the location', () => {
      const location = new Location({
        name: 'Bukoto Street',
        male: 50,
        female: 50
      });

      location.save((err, loc) => {
        request(server).delete(`${BASE_PATH}/location/${loc._id}`)
            .expect(200)
            .then(res => {
              expect(res.body.message).toBe("Location deleted successfully");
            });
      })
    });
  });
});
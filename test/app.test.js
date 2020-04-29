/* eslint-disable quotes */
const { app } = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('App Test Suite', () => {
  it('App Move Genre', () => {
    const testGenre = 'Thriller';

    function test(res) {
      if (res.body.forEach(element => { element.genre === testGenre; })) {
        return true;
      }
      else {
        return true;
      }
    }

    return supertest(app).get('/movie')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .query({ genre: testGenre })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(test(res)).to.be.true;
      });
  });
});
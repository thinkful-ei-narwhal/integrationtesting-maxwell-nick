/* eslint-disable quotes */
const { app } = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('App Test Suite', () => {
  function compareFx(res, compare) {
    res.body.forEach(element => {
      if(element.genre !== compare){
        return false; 
      };
    });
    return true;
  }

  function checkRating(response, testRating){
    response.body.map(movie => {
      if(movie.rating < testRating){
        return false;
      }
    });
    return true;
  }

  it('App Movie Genre', () => {
    const testGenre = 'Thriller';

    return supertest(app).get('/movie')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .query({ genre: testGenre })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(compareFx(res, testGenre)).to.be.true;
      });
  });

  it('App Country of Movie', () => {
    const testCountry = 'Italy';
    return supertest(app).get('/movie')
    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
    .query({country: testCountry})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(response => {
      expect(response.body).to.be.an('array');
      expect(compareFx(response, testCountry)).to.be.true;
    });
  });

  it('Rating of Movie', () => {
    let testRating = 9;
    return supertest(app).get('/movie')
    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
    .query({avg_vote: testRating})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(response => {
      expect(response.body).to.be.an('array');
      expect(checkRating(response, testRating)).to.be.true;
    });
  });
});
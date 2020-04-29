/* eslint-disable quotes */
const { app } = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');



describe('App Test Suite Positive Tests', () => {
  function compareFx(res, compare) {
    res.body.forEach(element => {
      if (element.genre !== compare) {
        return false;
      }
    });
    return true;
  }

  function checkRating(response, testRating) {
    response.body.map(movie => {
      if (movie.rating < testRating) {
        return false;
      }
    });
    return true;
  }

  it('should return only movies with genres of specified type', () => {
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

  it('should return only movies with countries of specified types', () => {
    const testCountry = 'Italy';
    return supertest(app).get('/movie')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .query({ country: testCountry })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(compareFx(response, testCountry)).to.be.true;
      });
  });

  it('should return only movies with ratings higher than specified value', () => {
    let testRating = 9;
    return supertest(app).get('/movie')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .query({ avg_vote: testRating })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(checkRating(response, testRating)).to.be.true;
      });
  });
});



describe('App Test Suite Negative Tests', () => {
  it('should not return movies with genres of specified type', () => {
    const testGenre = 'AISUDGHASIUDH';
    return supertest(app).get('/movie')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .query({ genre: testGenre })
      .expect(400);
  });

  // it('should not return countries other than type', () => {
  //   const testCountry = 'Italy';
  //   return supertest(app).get('/movie')
  //     .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
  //     .query({ country: testCountry })
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body).to.be.an('array');
  //       expect(compareFx(response, testCountry)).to.be.true;
  //     });
  // });

  // it('should not return movies with ratings lower than specified value', () => {
  //   let testRating = 9;
  //   return supertest(app).get('/movie')
  //     .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
  //     .query({ avg_vote: testRating })
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       expect(response.body).to.be.an('array');
  //       expect(checkRating(response, testRating)).to.be.true;
  //     });
});
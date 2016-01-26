
import assert from'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
if (!global.Promise) { // Checks to see if there is a global promise
  let q = require('q');
  chai.request.addPromises(q.Promise);
}
const expect = chai.expect;
import * as app from '../lib/app';

describe('single source API using es6 features', () => {

  // Used for running crud need the values of what I created in the database
  let server;
  let firstName;
  let lastName;
  let id;
  let chaiRequest;

  before(done => {
    server = app.start(done);
    chaiRequest = chai.request('localhost:3300');
   });

  it('should get all of the current players in the database', done => {
    chaiRequest.get('/player')
      .then(response => {
        expect(response).to.have.status(200);
        done();
      })
      .catch(done);
  });

  it('should add player Bugs Bunny to the database using a POST request (create)', done => {
    chaiRequest.post('/player')
      .send({
        "name": "Bugs Bunny",
        "position": "Point Guard",
        "team": "Tune Squad",
        "age": 25,
        "feet": 6,
        "inches": 7,
        "rookie": true,
        "numberOfGamesPlayed": 5,
        "totalPoints": 100,
        "totalRebounds": 25,
        "totalAssists": 30,
        "totalSteals": 20,
        "totalBlocks": 10
      })
      .then(response => {
        let responseArray = response.text.split(' ');
        firstName = responseArray[0];
        lastName = responseArray[1];
        id = responseArray[responseArray.length-1];
        expect(firstName).to.deep.equal('BUGS');
        expect(lastName).to.deep.equal('BUNNY');
        expect(response).to.have.status(200);
        done();
      })
      .catch(done);
  });

  it('should get the player we just created and have the keys we assigned to it (read)', function(done){
    chaiRequest.get(`/player/${id}`)
      .then(response => {
        expect(response.body).to.have.any.keys('name', 'team', 'age', 'position','totals', 'average', 'rookie');
        expect(response).to.have.status(200);
        done();
      })
      .catch(done);
  });

  it('should update only the parameters I set for it (update)', done => {
    chaiRequest.patch(`/player/${id}`)
      .send( { "name": "LITTLE PIGGY",
              "position": "Power Forward",
              "team": "Anti Wolf",
              "age": 50 })
      .then( response => {
        expect(response).to.have.status(200);
        return chaiRequest.get(`/player/${id}`);
      })
      .then( response => {
        expect(response.body.name).to.deep.equal('LITTLE PIGGY');
        expect(response.body.rookie).to.deep.equal(true);
        done();
      })
      .catch(done);
  });

  it('should update the whole object and anything that isnt updated is turned to null (update)', done => {
    chaiRequest.put(`/player/${id}`)
      .send( { "name": "Daphy Duck",
              "position": "Center",
              "team": "Monstars",
              "age": 10 })
      .then( response => {
        expect(response.body.name).to.deep.equal('DAPHY DUCK');
        expect(response.body.rookie).to.be.null;
        expect(response).to.have.status(200);
        done();
      })
      .catch(done);
  });

  it('should delete the previous person just added to the database (remove)', done => {
    chaiRequest.delete(`/player/${id}`)
      .then(response => {
        expect(response).to.have.status(200);
        let idDeletedArray = response.text.split(' ');
        expect(idDeletedArray[0]).to.deep.equal(id);
        done();
      })
      .catch(done);
  });

  after(done => {
    server.close(done);
  });

});

import {myPushAndmyPop} from '../lib/extraES6features';

describe('basic tests of classes and inheritance', () => {
  it('should add the specify value to the array and then pop it off', () => {
    let testArray = [1,2,3,4,5];
    let test = new myPushAndmyPop(testArray);
    test.myPush('foo')
    assert.deepEqual(test.array, [1, 2, 3,4,5, 'foo']);
    test.myPop()
    assert.deepEqual(test.array, [1, 2, 3,4,5]);
  });
});

const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('should return error if hp is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', hp:"henry" })
        .then(()=>done(new Error('It requires a valid hp')))
      });
      it('should return error if weight is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', weight:"henry" })
        .then(()=>done(new Error('It requires a valid weight')))
      });
      it('should return error if height is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', height:"henry" })
        .then(()=>done(new Error('It requires a valid height')))
      });
      it('should return error if speed is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', speed:"henry" })
        .then(()=>done(new Error('It requires a valid speed')))
      });
      it('should return error if attack is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', attack:"henry" })
        .then(()=>done(new Error('It requires a valid attack')))
      });
      it('should return error if defense is not a number',()=>{
        Pokemon.create({ name: 'Pikachu', defense:"henry" })
        .then(()=>done(new Error('It requires a valid defense')))
      });
      it('should return error if image is null',()=>{
        Pokemon.create({ name: 'Pikachu', img:null })
        .then(()=>done(new Error('It requires a valid image')))
      });
    });
  });
});

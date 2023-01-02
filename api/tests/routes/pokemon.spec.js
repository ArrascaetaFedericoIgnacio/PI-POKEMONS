/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};
const notPokemon = {
  name: null,
}

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
});
describe('GET /pokemons/:id',()=>{
  it('should return 200', ()=>{
  agent.get('/pokemons/1').expect(200)
  .then(()=>done())
  });
  it('should return 404',()=>{
  agent.get('/pokemons/1a3').expect(404)
  .then(()=>done())
})
})
describe('POST /pokemons',()=>{
  it('should return 200',()=>{
    agent.post('/pokemons').send(pokemon).expect(200)
    .then(()=>done())
  })
  it('should return 404',()=>{
    agent.post('/pokemons').send(notPokemon).expect(404)
    .then(()=>done())
  })
})
describe('GET /types',()=>{
  it('should return200',()=>{
  agent.get('/types').expect(200)
  })
})
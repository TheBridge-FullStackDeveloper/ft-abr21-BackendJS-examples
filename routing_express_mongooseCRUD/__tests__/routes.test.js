const server = require('../app');
const supertest = require('supertest');
const mongoose = require('../utils/db')
const request = supertest(server)


afterAll( async () => {
  await app.close()
  await mongoose.connection.close()
   //done()
   // Funciona haciendo espera de 1 segundo
   //setTimeout(done, 1000);
})

it('Probando jest', () => {
    expect(1).toBe(1)
})
describe('GET all products', () => {
  it('gets the test endpoint /',  async() => {
      await request
          .get('/api/products')
          .expect(200)
  })
  //...
  //otros tests GET /
  //...
})

describe('GET one product', () => {
  it('dame un producto en concreto', async () => {
    const response = await request
                      .get('/api/products?id=1')
                      .expect(200)
  })
})

describe('POST one product', () => {
  it('Se envia un producto', done => {
    request
      .post('/api/products')
      .send({
        "registerDate": "2021-06-09T11:24:40.582Z",
        "id": 342,
        "title": "otro",
        "price": 62.3,
        "description": "Zapatillas blancas y negras",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err,res)=>{
          if (err) return done(err)
          return done()
      })
  })
})


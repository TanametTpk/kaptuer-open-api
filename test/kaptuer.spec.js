const chai = require('chai')
const { expect } = chai
const supertest = require('supertest')
const kaptuer = require('../index')

describe('Running server', () => {

    let request

    before(() => {

        let routes = {
            tests:{
                get: {
                    path: "/",
                    method: "get",
                    middlewares: [],
                    controller: "tests",
                    action: "get"
                }
            }
        }
        
        let services = {
            tests:{
                get: async (req) => {
        
                    return ["hello world"];
                    
                }
            }
        }
        
        let server = kaptuer.setup({
            routes,
            services
        }).getServer()

        request = supertest(server)

    })

    describe('working', () => {

        it('can normally request', (done) => {
            
            request
            .get('/tests')
            .expect('Content-Type', /json/)
            .expect(200)
            .then( res => {
                expect(res.body.length).to.equal(1)
                done()
            })
            .catch((err) => {
                done(err)
            })

        });

    });

})
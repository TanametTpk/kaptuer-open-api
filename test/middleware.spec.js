const chai = require('chai')
const { expect } = chai
const supertest = require('supertest')
const kaptuer = require('../index')

describe('Including middlewares', () => {

    let request

    before(() => {

        let routes = {
            tests:{
                html: {
                    path: "/",
                    method: "get",
                    middlewares: ["responseAsHtml"],
                    controller: "tests",
                    action: "getHtml"
                }
            }
        }
        
        let services = {
            tests:{
                getHtml: async (req) => {

                    return "<p>hello world</p>"

                }
            }
        }
        
        kaptuer.clear()
        let server = kaptuer.setup({
            routes,
            services
        }).getServer()

        request = supertest(server)

    })

    describe('send html', () => {

        it('can reponse as html', (done) => {
            
            request
            .get('/tests')
            .expect('Content-Type', /html/)
            .expect(200)
            .then( res => {
                expect(res.text).to.equal("<p>hello world</p>")
                done()
            })
            .catch((err) => {
                done(err)
            })

        });

    });

})
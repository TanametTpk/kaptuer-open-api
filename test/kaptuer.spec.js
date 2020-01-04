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
                },
                getId: {
                    path: "/:objectId",
                    method: "get",
                    middlewares: ["getterObjectId"],
                    controller: "tests",
                    action: "getId"
                },
            },
            htmls: {
                html:{
                    path: "/",
                    method: "get",
                    middlewares: ["responseAsHtml"],
                    controller: "html",
                    action: "getHtml"
                }
            }
        }
        
        let services = {
            tests:{
                get: async (req) => {
        
                    return ["hello world"];
                    
                },
                getId: async (req) => {
        
                    return {id: req._objectId};
                    
                },
            },
            html: {
                getHtml: async (req) => {

                    return "<p>hello world</p>"

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

describe('Including middlewares', () => {

    let request

    before(() => {

        let routes = {
            tests:{
                get: {
                    path: "/:objectId",
                    method: "get",
                    middlewares: ["getterObjectId"],
                    controller: "tests",
                    action: "get"
                },
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
                get: async (req) => {
        
                    return {id: req._objectId};
                    
                },
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

    describe('get objectId', () => {

        it('can show object id', (done) => {
            
            request
            .get('/tests/obj')
            .expect('Content-Type', /json/)
            .expect(200)
            .then( res => {
                expect(res.body.id).to.equal("obj")
                done()
            })
            .catch((err) => {
                done(err)
            })

        });

    });

    describe('send html', () => {

        it('can reponse as html', (done) => {
            
            request
            .get('/htmls')
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
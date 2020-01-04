const getAll = require('require-all')
const _ = require('lodash')

let state = {}

class Centroy {

    constructor(state){
        this.state = {}
    }

    addModule(libs){

        let state = this.state
        this.state = _.merge(state, libs)

    }

    readModulesFromFiles (name, path) {

        let jsx = getAll({
            dirname: path,
        })
    
        this.addModule({[name]: jsx})
    
    }

    clear(){
        this.state = {}
    }

}

module.exports = new Centroy(state)
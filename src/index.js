const vm = require('vm')

export default class BabelRequire {

  constructor({
    globals = {},
    polyfillPath = 'babel-polyfill/dist/polyfill',
    registerPath = 'babel-register',
    babelOptions = {},
  } = {}) {

    this.context = Object.assign({}, globals, {
      BABEL_REQUIRE_CONTEXT: {
        require,
        babelOptions,
        polyfillPath,
        registerPath,
      },
    })

    vm.createContext(this.context)

    vm.runInContext(`
      BABEL_REQUIRE_CONTEXT.require(BABEL_REQUIRE_CONTEXT.polyfillPath)
      BABEL_REQUIRE_CONTEXT.require(BABEL_REQUIRE_CONTEXT.registerPath)(BABEL_REQUIRE_CONTEXT.babelOptions)
    `, this.context)
  }

  require(modulePath) {
    this.context.BABEL_REQUIRE_CONTEXT.modulePath = modulePath
    vm.runInContext(`
      BABEL_REQUIRE_CONTEXT.exports = BABEL_REQUIRE_CONTEXT.require(BABEL_REQUIRE_CONTEXT.modulePath)
    `, this.context)
    return this.context.BABEL_REQUIRE_CONTEXT.exports
  }
}

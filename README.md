# babel-require

Require modules with standalone babel context.

## Usage

```javascript
import BabelRequire from 'babel-require'

const babelRequire = new BabelRequire({
  globals: {
    // global variables in child context
  },
  // you can use your own babel-polyfill and babel-register module
  polyfillPath: 'babel-polyfill/dist/polyfill',
  registerPath: 'babel-register',
  babelOptions: {
    // options available in babel-register
  },
})


// you can access the global object of child context with:
babelRequire.context

const module = babelRequire.require(modulePath)
```

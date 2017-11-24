# babel-plugin-decompose

Split up a compose for HMR

## Example

**In**

```js
export default compose(
  withRouter,
  withTranslation(),
  graphql(...),
)(MyClass);
```

**Out**

```js
const _decomposed = MyClass;

const _decomposed2 = graphql(...);

const _decomposed3 = _decomposed2(_decomposed);

const _decomposed4 = withTranslation();

const _decomposed5 = _decomposed4(_decomposed3);

const _decomposed6 = withRouter;

const _decomposed7 = _decomposed6(_decomposed5);

export default _decomposed7;
```

## Installation

```sh
$ npm install babel-plugin-decompose
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["decompose"]
}
```

### Via CLI

```sh
$ babel --plugins decompose script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["decompose"]
});
```

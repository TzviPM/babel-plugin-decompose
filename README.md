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
"use strict"

const _decomposed = graphql(...)(MyClass);
const _decomposed2 = withTranslation()(_decomposed);
const _decomposed3 = withRouter(_decomposed2);
export default _decomposed2;
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

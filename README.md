## Installation

`npm install jenks`

or

`yarn add jenks`

## Usage

```js
  // commonjs
  const Jenks = require('jenks').Jenks
  // or es moudule
  // import { Jenks } from "jenks"


  let data = [1, 2, 5, 15, 45, 89.3, 112, 31 ,120, 0.5]
  let n_classes = 3
  let result = new Jenks(data, n_classes).naturalBreak()
  console.log(result)
  // [ 0.5, 15, 45, 120 ]
```
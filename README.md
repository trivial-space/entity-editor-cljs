# Flow editor

A visual development environment for [flow](https://github.com/trivial-space/flow) graphs.

## Development

### Requirements

* [Node.js](https://nodejs.org/)
* [Leiningen](https://github.com/technomancy/leiningen)
* [jspm](http://jspm.io/) (to run the examples)
* [gulp](http://gulpjs.com/) (to compile styles)

### Install Dependencies:

```
npm install
cd resources/public
jspm install
```

### Run application:

```
lein clean
lein figwheel dev
```

Figwheel will automatically push cljs changes to the browser.

Wait a bit, then browse to [http://localhost:8080/examples/tetris/index.html](http://localhost:8080/examples/tetris/index.html).

### Compile styles

```
gulp
```

## Production Build

```
lein clean
lein cljsbuild once min
```

## Licence

MIT, see the LICENCE file in the repository.

Copyright (c) 2016 Thomas Gorny

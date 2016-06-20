import flow from "tvs-flow"
import {graph} from "./graph"
import mat4 from 'gl-matrix/src/gl-matrix/mat4'
import plane from 'tvs-libs/geometry/plane'
import * as renderer from 'tvs-renderer'

console.log(renderer)

const context = {
  renderer,
  mat4,
  geometries: {
    plane
  }
}

const localStorageKey = "__renderer1-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(context)
//runtime.setDebug(true)
window.runtime = runtime

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph))
} else {
  runtime.addGraph(graph)
}

flow_editor.core.init(runtime, localStorageKey)

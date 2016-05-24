import flow from "tvs-flow"
import {graph} from "./graph"
import mat4 from 'gl-matrix/src/gl-matrix/mat4'
import plane from 'tvs-libs/geometry/plane'
import render from 'tvs-renderer'

console.log(render)

const context = {
  renderer: render.Renderer,
  mat4: mat4,
  geometries: {
    plane: plane
  }
}

const localStorageKey = "__renderer1-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(context)

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph))
} else {
  runtime.addGraph(graph)
}

flow_editor.core.init(runtime, localStorageKey)

import flow from "tvs-flow"
import {graph} from "./graph"
import mat4 from 'gl-matrix/src/gl-matrix/mat4'
import * as renderer from 'tvs-renderer'

console.log(renderer)

const context = {
  renderer,
  mat4
}

const localStorageKey = "__renderer-interactive-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(context)

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph))
} else {
  runtime.addGraph(graph)
}

flow_editor.core.init(runtime, localStorageKey)

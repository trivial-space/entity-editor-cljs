import flow from "tvs-flow"
import flowEditor from "/js/dist/tvs-flow-editor"
import {graph} from "./graph"
import mat4 from 'gl-matrix/src/gl-matrix/mat4'
import * as renderer from 'tvs-renderer'

console.log(renderer)

const context = {
  renderer,
  mat4
}

const localStorageKey = "__advanced-compilation-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(context)
window.runtime = runtime

runtime.setDebug(true)
try {
  if (localGraph) {
    runtime.addGraph(JSON.parse(localGraph))
  } else {
    runtime.addGraph(graph)
  }
} catch (e) {
  console.warn(e)
}

flowEditor.init(runtime, localStorageKey)
runtime.setDebug(false)

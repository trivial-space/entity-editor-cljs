import flow from "tvs-flow"
import {graph} from "./graph"
import immutable from 'immutable'

console.log(immutable)

//const context = {}

const localStorageKey = "__tetris-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(immutable)
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

flow_editor.core.init(runtime, localStorageKey)
runtime.setDebug(false)

import flow from "tvs-flow"
import {graph} from "./graph"

console.log(graph)

const localStorageKey = "__basic-example";
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

//runtime.setDebug(true)
window.runtime = runtime
window.graph = graph

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

flow_editor.core.init(runtime, localStorageKey);
runtime.setDebug(false)

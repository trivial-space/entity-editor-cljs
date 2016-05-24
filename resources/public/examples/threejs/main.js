import flow from "tvs-flow"
import {graph} from "./graph"
import three from "three"

console.log(three)

const context = {
  three: three
}

const localStorageKey = "__threejs-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

runtime.setContext(context)

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph))
} else {
  runtime.addGraph(graph)
}

flow_editor.core.init(runtime, localStorageKey)

window.runtime = runtime

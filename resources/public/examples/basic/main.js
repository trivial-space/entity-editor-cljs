import flow from "tvs-flow"
import {graph} from "./graph"

console.log(graph)

const localStorageKey = "__basic-example";
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

//runtime.setDebug(true)
window.runtime = runtime
window.graph = graph

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph));
} else {
  runtime.addGraph(graph);
}

flow_editor.core.init(runtime, localStorageKey);

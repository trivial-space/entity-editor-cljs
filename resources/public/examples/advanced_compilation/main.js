import flow from "tvs-flow"
import {graph} from "./graph"


const localStorageKey = "__advanced-compilation-example"
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

//runtime.setDebug(true)
window.runtime = runtime

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph));
} else {
  runtime.addGraph(graph);
}

flow_editor.core.init(runtime, localStorageKey);

import flow from "flow"
import {graph} from "./graph"


const localStorageKey = "__basic-example";
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

if (localGraph) {
  runtime.addGraph(JSON.parse(localGraph));
} else {
  runtime.addGraph(graph);
}

flow_editor.core.init(runtime, localStorageKey);

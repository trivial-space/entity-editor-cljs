import flow from "tvs-flow"

const localStorageKey = "__empty-example";
const runtime = flow.create()
const localGraph = localStorage.getItem(localStorageKey)

window.runtime = runtime

runtime.setDebug(true)
try {
  if (localGraph) {
    runtime.addGraph(JSON.parse(localGraph))
  }
} catch (e) {
  console.warn(e)
}

flow_editor.core.init(runtime, localStorageKey);
runtime.setDebug(false)

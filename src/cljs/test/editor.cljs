(ns test.editor
  (:require [flow-editor.core :as editor]
            [libs.flow]))


(def runtime (.create js/tvsFlow))

(defn ^:export init []
  (let [local-storage-key "__flowEditorStorage"
        graph (->> local-storage-key
                (.getItem js/localStorage)
                (.parse js/JSON))]

    (when graph
      (println graph "at" local-storage-key)
      (let [arcs (aget graph "arcs")
            processes (aget graph "processes")
            entities (aget graph "entities")]
        (doseq [k (.keys js/Object entities)]
          (.addEntity runtime (aget entities k)))
        (doseq [k (.keys js/Object processes)]
          (.addProcess runtime (aget processes k)))
        (doseq [k (.keys js/Object arcs)]
          (.addArc runtime (aget arcs k)))))

    (aset js/window "runtime" runtime)
    (editor/init runtime local-storage-key)))

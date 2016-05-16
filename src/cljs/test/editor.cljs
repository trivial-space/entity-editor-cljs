(ns test.editor
  (:require [flow-editor.core :as editor]
            [libs.flow]))


(def runtime (.create js/tvsFlow))

(defn ^:export init []
  (let [local-storage-key "__test_graph1"
        graph (->> local-storage-key
                (.getItem js/localStorage)
                (.parse js/JSON))]

    (when graph
      (println graph "at" local-storage-key)
      (.addGraph runtime graph))

    (aset js/window "runtime" runtime)
    (editor/init runtime local-storage-key)))

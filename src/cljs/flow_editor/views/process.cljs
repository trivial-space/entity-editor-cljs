(ns flow-editor.views.process)

(defn process-component [process]
  [:div
   {:class-name "process-component"
    :key (:id process)}
   (str "I am the process " (:id process))])

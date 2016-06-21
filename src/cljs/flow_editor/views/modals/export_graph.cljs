(ns flow-editor.views.modals.export-graph
  (:require [reagent.core :as r]
            [re-frame.core :refer [dispatch subscribe]]
            [re-com.core :refer [title button v-box h-box modal-panel input-textarea line]]))


(defn export-graph-modal
  []
  (let [graph (subscribe [:graph])]
    (fn []
      (let [replacer (fn [k v] (if (nil? v)
                                 js/undefined
                                 v))
            graph-code (r/atom (.stringify js/JSON (clj->js @graph) replacer "    "))]
        [modal-panel
         :child [v-box
                 :children [[title
                             :label "The JSON code for this graph"
                             :level :level2
                             :margin-bottom "20px"]
                            [input-textarea
                             :model graph-code
                             :width "800px"
                             :height "700px"
                             :on-change #(reset! graph-code %)
                             :placeholder "Process id"]
                            [line
                             :color "#ddd" :style {:margin "20px"}]
                            [h-box
                             :gap "12px"
                             :children [[button
                                         :label "Done"
                                         :on-click #(dispatch [:ui/close-modal])]]]]]]))))

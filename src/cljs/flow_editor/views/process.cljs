(ns flow-editor.views.process
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title input-textarea label md-icon-button button v-box h-box box h-split]]))


(defn process-component [process]
  (let [model (r/atom process)]
    (fn [process]
      [:div
       {:class-name "process-component"
        :style {:padding "10px"}}
       [v-box
        :children [[h-box
                    :children [[box
                                :size "auto"
                                :child [title
                                        :label (str "ID: " (:id process))
                                        :level :level3]]
                               [md-icon-button
                                :md-icon-name "zmdi-delete"
                                :on-click #(dispatch [:flow-runtime/remove-process (:id process)])]]]
                   (str "I am the process " (:id process))]]])))

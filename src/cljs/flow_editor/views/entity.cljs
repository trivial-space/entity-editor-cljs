(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title input-textarea label md-icon-button button v-box h-box box h-split]]))


(defn header
  [entity]
  [h-box
   :children [[box
               :size "auto"
               :child [title
                       :label (str "ID: " (:id entity))
                       :level :level3]]
              [md-icon-button
               :md-icon-name "zmdi-delete"
               :on-click #(dispatch [:flow-runtime/remove-entity (:id entity)])]]])


(defn entity-component [entity]
  (let [model (r/atom entity)]
    (fn [entity]
      [:div
       {:class-name "entity-component"
        :style {:padding "10px"}}
       [v-box
        :children [[header entity]
                   [label :label "Initial value"]
                   [input-textarea
                    :model (or (:value @model) "")
                    :on-change #(swap! model assoc-in [:value] %)]]]])))

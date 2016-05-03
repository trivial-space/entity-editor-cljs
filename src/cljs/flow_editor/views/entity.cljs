(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.utils.codemirror :refer [cm]]
            [re-com.core :refer [title
                                 horizontal-bar-tabs
                                 label
                                 md-icon-button
                                 button
                                 v-box
                                 h-box
                                 box
                                 h-split]]))


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


(def value-tabs
  [{:id ::initial :label "Initial value"}
   {:id ::current :label "Current value"}])


(defn initial-value-editor
  [eid value]
  (let [value-changes (atom value)]
    (fn [eid value]
      (if value
        [cm value {:mode "javascript"} value-changes]
        [button
         :label "add initial value"]))))

(defn current-value-editor
  [eid value-ratom])


(defn entity-component
  [entity]
  (let [id (:id entity)
        value-ratom (subscribe [:flow-runtime/entity-value id])
        value-tab-selection (r/atom (:id (first value-tabs)))]
    (fn [entity]
      (let [current-value (.stringify js/JSON (:value @value-ratom) nil "   ")]
        [:div
         {:class-name "entity-component"
          :style {:padding "10px"}}
         [v-box
          :children [[header entity]
                     [horizontal-bar-tabs
                      :tabs value-tabs
                      :model value-tab-selection
                      :on-change #(reset! value-tab-selection %)]
                     (if (= @value-tab-selection ::initial)
                       [initial-value-editor id (:value entity)]
                       [:pre current-value])]]]))))

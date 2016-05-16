(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.value-types.core :refer [value-types]]
            [re-com.core :refer [title
                                 horizontal-bar-tabs
                                 label
                                 md-icon-button
                                 button
                                 v-box
                                 h-box
                                 box
                                 single-dropdown
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
  [eid value type mode]
  (dispatch [:flow-runtime/unwatch-entity eid])
  (if value
    [v-box
     :gap "10px"
     :children [[(-> value-types type :initial-value-editor) eid value]
                [h-box
                 :gap "10px"
                 :children [[button
                             :label "reset current value"
                             :on-click #(do (dispatch [:flow-runtime/set-current-value
                                                       eid value])
                                            (reset! mode ::current))]
                            [button
                             :label "remove initial value"
                             :on-click #(dispatch [:flow-runtime/edit-entity-value
                                                    eid nil])]]]]]
    [button
     :label "add initial value"
     :on-click #(dispatch [:flow-runtime/edit-entity-value eid "initial value"])]))


(defn current-value-editor
  [eid current-value type mode]
  [v-box
   :gap "10px"
   :children [[(-> value-types type :current-value-editor) eid current-value]
              [button
               :label "set as initial value"
               :on-click #(do (dispatch [:flow-runtime/edit-entity-value
                                         eid (:value current-value)])
                              (reset! mode ::initial))]]])


(def value-type-choices
  (mapv
    (fn [[type-key _]] {:id type-key :label (name type-key)})
    value-types))


(defn entity-component
  [entity]
  (let [id (:id entity)
        value-ratom (subscribe [:flow-runtime/entity-value id])
        value-mode (r/atom (:id (first value-tabs)))
        value-type (r/atom :evaled-JSON)]
    (fn [entity]
      [v-box
       :class "entity-component"
       :gap "5px"
       :children [[header entity]
                  [h-box
                   :gap "10px"
                   :children [[horizontal-bar-tabs
                               :tabs value-tabs
                               :model value-mode
                               :on-change #(reset! value-mode %)]
                              [single-dropdown
                               :choices value-type-choices
                               :model value-type
                               :on-change #(reset! value-type %)]]]
                  (if (= @value-mode ::initial)
                    [initial-value-editor id (clj->js (:value entity)) @value-type value-mode]
                    [current-value-editor id @value-ratom @value-type value-mode])]])))

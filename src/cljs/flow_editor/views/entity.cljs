(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.value-types.core :refer [value-types]]
            [re-com.core :refer [title horizontal-bar-tabs
                                 label md-icon-button button
                                 v-box h-box box gap line
                                 single-dropdown input-text
                                 h-split]]))


(defn header
  [eid]
  (let [editing-id? (r/atom false)]
    (fn [eid]
      (let [new-id (atom eid)]
        [h-box
         :children [[:div
                     {:style {:background-color "#2B7CE9"
                              :width "19px"
                              :height "19px"
                              :display "inline-block"}}]
                    [gap :size "10px"]
                    (if @editing-id?
                      [input-text
                       :model eid
                       :width "200px"
                       :change-on-blur? false
                       :on-change #(reset! new-id %)]
                      [title
                       :label eid
                       :margin-top "0.3em"
                       :level :level3])
                    (when @editing-id?
                      [md-icon-button
                       :md-icon-name "zmdi-close"
                       :size :smaller
                       :tooltip "cancel"
                       :on-click #(reset! editing-id? false)])
                    (when @editing-id?
                      [md-icon-button
                       :md-icon-name "zmdi-check"
                       :size :smaller
                       :tooltip "apply"
                       :on-click (fn []
                                   (dispatch [:flow-runtime/rename-entity eid @new-id])
                                   (reset! editing-id? false))])
                    [gap :size "10px"]
                    (when (not @editing-id?)
                      [md-icon-button
                       :md-icon-name "zmdi-edit"
                       :size :smaller
                       :style {:opacity "0.3"}
                       :tooltip "rename"
                       :on-click #(reset! editing-id? true)])
                    [gap :size "auto"]
                    [md-icon-button
                     :md-icon-name "zmdi-delete"
                     :tooltip "delete this entity"
                     :on-click #(dispatch [:flow-runtime/remove-entity eid])]
                    [gap :size "10px"]
                    [line]
                    [gap :size "10px"]
                    [md-icon-button
                     :md-icon-name "zmdi-close"
                     :on-click #(dispatch [:flow-runtime-ui/close-node
                                            {:id eid :type "entity"}])]]]))))


(def value-tabs
  [{:id ::initial :label "Initial value"}
   {:id ::current :label "Current value"}])


(defn initial-value-editor
  [eid value type mode]
  (let [initial-value? (r/atom (not= value nil))]
    (fn [eid value type mode]
      (println value)
      (dispatch [:flow-runtime/unwatch-entity eid])
      (if @initial-value?
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
                                 :on-click #(do (dispatch [:flow-runtime/edit-entity-value
                                                           eid nil])
                                                (reset! initial-value? false))]]]]]
        [button
         :label "add initial value"
         :on-click #(reset! initial-value? true)]))));



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
       :children [[header (:id entity)]
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

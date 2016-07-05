(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.utils.codemirror :refer [cm]]
            [flow-editor.views.value-types.core :refer [value-editors]]
            [re-com.core :refer [title horizontal-bar-tabs
                                 label md-icon-button button
                                 v-box h-box box gap line
                                 single-dropdown input-text
                                 h-split]]))


(defn header
  [entity minified]
  (let [editing-id? (r/atom false)]
    (fn [entity minified]
      (let [eid (:id entity)
            event? (:isEvent entity)
            new-id (atom eid)]
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
                    (if event?
                      [md-icon-button
                       :md-icon-name "zmdi-flash"
                       :tooltip "remove event behavior"
                       :style {:color "orange"}
                       :on-click #(dispatch [:flow-runtime/set-entity-event eid nil])]
                      [md-icon-button
                       :md-icon-name "zmdi-flash"
                       :tooltip "behave as event"
                       :on-click #(dispatch [:flow-runtime/set-entity-event eid true])])
                    [md-icon-button
                     :md-icon-name "zmdi-search"
                     :tooltip "inspect in console"
                     :on-click #(dispatch [:flow-runtime/log-entity eid])]
                    [gap :size "5px"]
                    [md-icon-button
                     :md-icon-name "zmdi-delete"
                     :tooltip "delete this entity"
                     :on-click #(dispatch [:flow-runtime/remove-entity eid])]
                    [gap :size "10px"]
                    [line]
                    [gap :size "10px"]
                    (if @minified
                      [md-icon-button
                       :md-icon-name "zmdi-plus"
                       :tooltip "reopen"
                       :on-click #(reset! minified false)]
                      [md-icon-button
                       :md-icon-name "zmdi-minus"
                       :tooltip "minimize"
                       :on-click #(reset! minified true)])
                    [md-icon-button
                     :md-icon-name "zmdi-close"
                     :on-click #(dispatch [:flow-runtime-ui/close-node
                                            {:id eid :type "entity"}])]]]))))


(defn value-tabs
  [entity]
  [{:id ::current :label (if (:isEvent entity) "Latest value" "Current value")}
   {:id ::initial :label "Initial value"}])


(defn json-value-editor
  [eid json]
  (let [changes (r/atom json)]
    (fn [eid json]
      (let [changed? (not= @changes json)]
        [v-box
         :gap "5px"
         :children [[cm (or json "") {:mode "javascript"} changes]
                    [button
                     :label "update"
                     :class (when changed? "btn-primary")
                     :disabled? (not changed?)
                     :on-click #(dispatch [:flow-runtime/edit-entity-json
                                           eid @changes])]]]))))


(defn initial-value-editor
  [eid json type mode]
  (let [initial-value? (r/atom (not= json nil))]
    (fn [eid json type mode]
      (dispatch [:flow-runtime/unwatch-entity eid])
      (if @initial-value?
        [v-box
         :gap "10px"
         :children [[json-value-editor eid json]
                    [h-box
                     :gap "10px"
                     :children [[button
                                 :label "reset current value"
                                 :on-click #(do (dispatch [:flow-runtime/set-current-value
                                                           eid (.parse js/JSON json)])
                                                (reset! mode ::current))]
                                [button
                                 :label "remove initial value"
                                 :on-click #(do (dispatch [:flow-runtime/edit-entity-json
                                                           eid nil])
                                                (reset! initial-value? false))]]]]]
        [button
         :label "add initial value"
         :on-click #(reset! initial-value? true)]))));



(defn current-value-editor
  [eid current-value type mode]
  [v-box
   :gap "10px"
   :children [[(value-editors type) eid current-value]
              [button
               :label "set as initial value"
               :on-click #(do (dispatch [:flow-runtime/edit-entity-value
                                         eid (:value current-value)])
                              (reset! mode ::initial))]]])


(def value-type-choices
  (mapv
    (fn [[type-key _]] {:id type-key :label (name type-key)})
    value-editors))


(defn entity-component
  [entity]
  (let [id (:id entity)
        value-ratom (subscribe [:flow-runtime/entity-value id])
        value-mode (r/atom (:id (first (value-tabs entity))))
        value-type (r/atom :evaled-JSON)
        minified (r/atom false)]
    (fn [entity]
      [v-box
       :class "entity-component"
       :gap "5px"
       :children [[header entity minified]
                  (when-not @minified
                    [h-box
                     :gap "10px"
                     :children [[horizontal-bar-tabs
                                 :tabs (value-tabs entity)
                                 :model value-mode
                                 :on-change #(reset! value-mode %)]
                                [single-dropdown
                                 :choices value-type-choices
                                 :model value-type
                                 :on-change #(reset! value-type %)]]])
                  (when-not @minified
                    (if (= @value-mode ::initial)
                      [initial-value-editor id (:json entity) @value-type value-mode]
                      [current-value-editor id @value-ratom @value-type value-mode]))]])))

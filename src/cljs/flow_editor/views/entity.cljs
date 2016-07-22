(ns flow-editor.views.entity
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.utils.graph-ui :refer [e-node e-node-id]]
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
                     :on-click #(if (.-ctrlKey %)
                                  (dispatch [:flow-runtime/log-table-entity eid])
                                  (dispatch [:flow-runtime/log-entity eid]))]
                    [gap :size "10px"]
                    [line]
                    [gap :size "10px"]
                    [md-icon-button
                     :md-icon-name "zmdi-delete"
                     :tooltip "delete this entity"
                     :on-click #(dispatch [:flow-runtime/remove-entity eid])]
                    [gap :size "10px"]
                    [line]
                    [gap :size "10px"]
                    (if minified
                      [md-icon-button
                       :md-icon-name "zmdi-plus"
                       :tooltip "reopen"
                       :on-click #(dispatch [:flow-runtime-ui/minify-node (e-node eid) nil])]
                      [md-icon-button
                       :md-icon-name "zmdi-minus"
                       :tooltip "minimize"
                       :on-click #(dispatch [:flow-runtime-ui/minify-node (e-node eid) true])])
                    [md-icon-button
                     :md-icon-name "zmdi-close"
                     :on-click #(dispatch [:flow-runtime-ui/close-node
                                            {:id eid :type "entity"}])]]]))))


(defn value-tabs
  [entity]
  [{:id ::current :label (if (:isEvent entity) "latest" "current")}
   {:id ::initial :label "initial"}])


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
  [eid json initial-value?]
  (dispatch [:flow-runtime/unwatch-entity eid])
  (if @initial-value?
    [json-value-editor eid json]
    [button
     :label "add initial value"
     :on-click #(reset! initial-value? true)]));


(defn current-value-editor
  [eid type]
  (let [current-value (subscribe [:flow-runtime/entity-value eid])]
    (fn [eid type]
      [(value-editors type) eid @current-value])))


(def value-type-choices
  (mapv
    (fn [[type-key _]] {:id type-key :label type-key})
    value-editors))


(defn entity-component
  [entity minified]
  (let [id (:id entity)
        value-mode (r/atom (:id (first (value-tabs entity))))
        active-node (subscribe [:graph-ui/active-node])]
    (fn [entity minified]
      (let [eid (:id entity)
            value-type (get-in entity [:meta :type] "evaled-JSON")
            modes (value-tabs entity)
            initial-value? (r/atom (not= (:json entity) nil))]
        [v-box
         :class (str "entity-component " (e-node-id eid)
                     (when (and (= (:id @active-node) id)
                                (= (:type @active-node) "entity"))
                       " selected"))
         :gap "10px"
         :attr {:on-mouse-over #(dispatch [:graph-ui/set-active-node (e-node eid)])}
         :children [[header entity minified]
                    (when-not minified
                      [h-box
                       :gap "10px"
                       :children [[horizontal-bar-tabs
                                   :tabs modes
                                   :model value-mode
                                   :on-change #(reset! value-mode %)]
                                  (when (= @value-mode ::current)
                                    [button
                                     :label [:span [:i.zmdi.zmdi-hc-fw-rc.zmdi-square-right] " save"]
                                     :tooltip "set current value as initial value"
                                     :on-click #(do (dispatch [:flow-runtime/set-entity-initial-as-current eid])
                                                    (reset! value-mode ::initial))])
                                  (when (and (= @value-mode ::initial) (:json entity))
                                    [button
                                     :label [:span [:i.zmdi.zmdi-hc-fw-rc.zmdi-redo] " use"]
                                     :tooltip "reset current value to initial"
                                     :on-click #(do (dispatch [:flow-runtime/set-current-value
                                                               eid (.parse js/JSON (:json entity))])
                                                    (reset! value-mode ::current))])
                                  (when (and (= @value-mode ::initial) (:json entity))
                                    [button
                                     :label [:span [:i.zmdi.zmdi-hc-fw-rc.zmdi-space-bar] " clear"]
                                     :tooltip "remove initial value"
                                     :on-click #(do (dispatch [:flow-runtime/edit-entity-json
                                                               eid nil])
                                                    (reset! initial-value? false))])
                                  [gap :size "auto"]
                                  [single-dropdown
                                   :choices value-type-choices
                                   :model value-type
                                   :on-change #(dispatch [:flow-runtime/set-entity-value-type eid %])]]])
                    (when-not minified
                      (if (= @value-mode ::initial)
                        [initial-value-editor id (:json entity) initial-value?]
                        [current-value-editor id value-type]))]]))))

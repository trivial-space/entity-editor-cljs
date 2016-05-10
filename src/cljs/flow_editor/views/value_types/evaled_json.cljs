(ns flow-editor.views.value-types.evaled-json
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
                                 single-dropdown
                                 h-split]]))



(defn eval
  [json]
  (.parse js/JSON json))


(defn json
  [obj]
  (.stringify js/JSON obj nil "\t"))


(defn initial-value-editor
  [eid value]
  (let [changes (atom value)]
    [v-box
     :children [[cm (json value) {:mode "javascript"} changes]
                [button
                 :label "update"
                 :on-click #(dispatch [:flow-runtime/edit-entity-value
                                       eid (eval @changes)])]]]))


(defn current-value-editor
  [eid current-value]
  (let [editing (r/atom false)
        changes (atom (json (:value current-value)))]
    (fn [eid current-value]
      (if @editing
        (do (dispatch [:flow-runtime/unwatch-entity eid])
            [v-box
             :children [[cm (json (:value current-value)) {:mode "javascript"} changes]
                        [h-box
                         :gap "10px"
                         :children [[button
                                     :label "set"
                                     :on-click #(do (dispatch [:flow-runtime/set-current-value
                                                               eid (eval @changes)])
                                                    (reset! editing false))]
                                    [button
                                     :label "cancel"
                                     :on-click #(reset! editing false)]]]]])
        (do (dispatch [:flow-runtime/watch-entity eid])
            [v-box
             :children [[:pre (json (:value current-value))]
                        [button
                         :label "edit"
                         :on-click #(reset! editing true)]]])))))

(ns flow-editor.views.value-types.code
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.utils.codemirror :refer [cm]]
            [custom-codemirror.modes.clike-glsl]
            [re-com.core :refer [title
                                 horizontal-bar-tabs
                                 label
                                 md-icon-button
                                 alert-box
                                 button
                                 v-box
                                 h-box
                                 box
                                 single-dropdown
                                 h-split]]))


(defn value-editor
  [eid current-value]
  (let [changes (r/atom (:value current-value))]
    (fn [eid current-value]
      (dispatch [:flow-runtime/watch-entity eid])
      (let [value (or (:value current-value) "")
            changed? (not= @changes value)
            valid? (string? value)]
        (if valid?
          [v-box
           :gap "5px"
           :children [[cm value {:mode "x-shader/x-vertex"} changes]
                      [button
                       :label "update"
                       :class (when changed? "btn-primary")
                       :disabled? (not changed?)
                       :on-click #(dispatch [:flow-runtime/set-current-value eid @changes])]]]
          [alert-box
           :alert-type :danger
           :body "code entity must be a string"])))))

(ns flow-editor.views.process
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [flow-editor.views.utils.codemirror :refer [cm]]
            [re-com.core :refer [title label md-icon-button md-circle-icon-button button v-box h-box box]]))


(defn header
  [process-id]
  [h-box
   :children [[box
               :size "auto"
               :child [title
                       :label (str "ID: " process-id)
                       :level :level3]]
              [md-icon-button
               :md-icon-name "zmdi-play"
               :on-click #(dispatch [:flow-runtime/start-process process-id])]
              [md-icon-button
               :md-icon-name "zmdi-stop"
               :on-click #(dispatch [:flow-runtime/stop-process process-id])]
              [md-icon-button
               :md-icon-name "zmdi-delete"
               :on-click #(dispatch [:flow-runtime/remove-process process-id])]]])


(defn process-component [process]
  (let [model (r/atom process)
        code-changes (atom (:code process))
        id (:id process)]
    (fn [process]
      [:div
       {:class-name "process-component"
        :style {:padding "10px"}}
       [v-box
        :children [[header id]
                   [h-box
                    :children [[label :label "ports"]
                               [md-circle-icon-button
                                :size :smaller
                                :style {:margin-left "10px"}
                                :md-icon-name "zmdi-plus"]]]
                   [label :label "process code"]
                   [cm (:code process) {:mode "javascript"} code-changes]
                   [button
                    :label "update"
                    :on-click #(dispatch [:flow-runtime/update-process-code id @code-changes])]
                   [label :label "output"]]]])))

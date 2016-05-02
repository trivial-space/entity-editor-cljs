(ns flow-editor.views.process
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [clojure.set :refer [union]]
            [flow-editor.views.utils.codemirror :refer [cm]]
            [re-com.core :refer [input-text
                                 md-icon-button
                                 md-circle-icon-button
                                 single-dropdown
                                 title
                                 label
                                 button
                                 v-box
                                 h-box
                                 box]]))


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


(defn port-row
  [name type pid]
  (let [port-types (subscribe [:flow-runtime/port-types])
        entities (subscribe [:flow-runtime/all-entities])
        connections (subscribe [:flow-runtime/process-port-connection pid])]
    (fn [name type pid]
      (let [port-type-choices (->> @port-types
                                (mapv (fn [[k v]] {:id v :label k})))
            current-entity (->> @connections
                             (filter #(= (:port %) name))
                             (first)
                             (:entity))
            entity-choices (->> @entities
                             (mapv :id)
                             (set)
                             (remove (set (mapv :entity @connections)))
                             (union #{current-entity})
                             (mapv (fn [id] {:id id :label id}))
                             (concat [{:id nil :label "::disconnect !::"}]))]
        (println port-types)
        [h-box
         :children [[input-text
                     :model name
                     :on-change #(dispatch [:flow-runtime/rename-port pid name %])]
                    [single-dropdown
                     :choices port-type-choices
                     :model type
                     :width "140px"
                     :on-change #(dispatch [:flow-runtime/change-port-type pid name %])]
                    (if-not (= type (get @port-types "ACCUMULATOR"))
                      [single-dropdown
                       :choices entity-choices
                       :model current-entity
                       :filter-box? true
                       :on-change #(dispatch [:flow-runtime/connect-port pid name %])]
                      [box
                       :child " "
                       :size "auto"])
                    [md-circle-icon-button
                     :size :smaller
                     :style {:margin-left "10px"}
                     :md-icon-name "zmdi-minus"
                     :on-click #(dispatch [:flow-runtime/remove-process-port pid name])]]]))))


(defn ports-editor
  [ports pid]
  [v-box
   :children [[h-box
               :children [[label :label "ports"]
                          [md-circle-icon-button
                           :size :smaller
                           :style {:margin-left "10px"}
                           :md-icon-name "zmdi-plus"
                           :on-click #(dispatch [:flow-runtime/add-process-port pid])]]]
              (for [[port-name type] ports]
                ^{:key (str pid "::port::" port-name)} [port-row (name port-name) type pid])]])


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
                   [ports-editor (:ports process) id]
                   [label :label "process code"]
                   [cm (:code process) {:mode "javascript"} code-changes]
                   [button
                    :label "update"
                    :on-click #(dispatch [:flow-runtime/update-process-code id @code-changes])]
                   [label :label "output"]]]])))

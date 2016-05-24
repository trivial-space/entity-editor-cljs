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
                                 gap
                                 v-box
                                 h-box
                                 box]]))


(defn header
  [process]
  (let [port-types (subscribe [:flow-runtime/port-types])]
    (fn [process]
      (let [id (:id process)
            acc-type (get @port-types "ACCUMULATOR")
            autostart? (:autostart process)
            accumulator? (->> (:ports process)
                           (vals)
                           (some #(= % acc-type)))]
        [h-box
         :children [[box
                     :size "auto"
                     :child [title
                             :label (str "ID: " id)
                             :level :level3]]
                    (if accumulator?
                      [md-icon-button
                       :md-icon-name "zmdi-brightness-5"
                       :disabled? true
                       :tooltip "no autostart for accumulator"]
                      (if autostart?
                        [md-icon-button
                         :md-icon-name "zmdi-brightness-auto"
                         :tooltip "turn off autostart"
                         :style {:color "orange"}
                         :on-click #(dispatch [:flow-runtime/set-process-autostart id nil])]
                        [md-icon-button
                         :md-icon-name "zmdi-brightness-5"
                         :tooltip "turn on autostart"
                         :on-click #(dispatch [:flow-runtime/set-process-autostart id true])]))
                    [md-icon-button
                     :md-icon-name "zmdi-play"
                     :tooltip "start"
                     :on-click #(dispatch [:flow-runtime/start-process id])]
                    [md-icon-button
                     :md-icon-name "zmdi-stop"
                     :tooltip "stop"
                     :on-click #(dispatch [:flow-runtime/stop-process id])]
                    [md-icon-button
                     :md-icon-name "zmdi-delete"
                     :tooltip "delete this process"
                     :on-click #(dispatch [:flow-runtime/remove-process id])]]]))))


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
                             (union (if current-entity #{current-entity} #{}))
                             (mapv (fn [id] {:id id :label id}))
                             (concat [{:id nil :label "-- Disconnect !"}]))]
        [h-box
         :children [[input-text
                     :model name
                     :width "160px"
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


(defn output-port
  [pid]
  (let [out-arc (subscribe [:flow-runtime/output-port pid])
        entities (subscribe [:flow-runtime/all-entities])
        connections (subscribe [:flow-runtime/process-port-connection pid])]
    (fn [pid]
      (let [entity (:entity @out-arc)
            entity-choices (->> @entities
                             (mapv :id)
                             (set)
                             (remove (set (mapv :entity @connections)))
                             (union (if entity #{entity} #{}))
                             (mapv (fn [id] {:id id :label id}))
                             (concat [{:id nil :label "-- Disconnect !"}]))]
        [single-dropdown
         :choices entity-choices
         :model entity
         :width "200px"
         :filter-box? true
         :on-change #(dispatch [:flow-runtime/connect-output pid %])]))))


(defn process-component [process]
  (let [code-changes (atom (:code process))
        id (:id process)]
    (fn [process]
       [v-box
        :class "process-component"
        :gap "5px"
        :children [[header process]
                   [ports-editor (:ports process) id]
                   [label :label "procedure"]
                   [cm (:code process) {:mode "javascript"} code-changes]
                   [h-box
                    :gap "10px"
                    :children [[button
                                :label "update"
                                :on-click #(dispatch [:flow-runtime/update-process-code id @code-changes])]
                               [gap :size "auto"]
                               [label
                                :label "output"
                                :style {:margin-top "8px"}]
                               [output-port id]]]]])))

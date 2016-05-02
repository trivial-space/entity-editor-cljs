(ns flow-editor.views.editor
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title button v-box h-box box h-split]]
            [flow-editor.views.process :refer [process-component]]
            [flow-editor.views.entity :refer [entity-component]]
            [flow-editor.views.modals.helpers :refer [get-modal]]))


(defn headline []
  (let [name (subscribe [:name])]
    (fn []
      [title
       :label (str "Flow Editor " @name)
       :level :level1])))


(defn entity-list []
  (let [entities (subscribe [:flow-runtime/edited-entities])]
    (fn []
      [v-box
       :width "100%"
       :children [[h-box
                   :children [[box
                               :size "auto"
                               :child [title
                                       :label "Entities"
                                       :level :level2
                                       :margin-top "0.1em"]]
                              [button
                               :label "add"
                               :on-click #(dispatch [:ui/open-modal :modals/add-entity])]]]
                  (for [entity @entities]
                    ^{:key (:id entity)} [entity-component entity])]])))


(defn process-list []
  (let [processes (subscribe [:flow-runtime/edited-processes])]
    (fn []
      [v-box
       :width "100%"
       :children [[h-box
                   :children [[box
                               :size "auto"
                               :child [title
                                       :label "Processes"
                                       :level :level2
                                       :margin-top "0.1em"]]
                              [button
                               :label "add"
                               :on-click #(dispatch [:ui/open-modal :modals/add-process])]]]
                  (for [process @processes]
                    ^{:key (:id process)} [process-component process])]])))


(defn editor []
  (let [modal-key (subscribe [:ui/modal])]
    (fn []
      (let [modal (get-modal @modal-key)]
        [v-box
         :height "100%"
         :children [[headline]
                    [h-split
                     :panel-1 [entity-list]
                     :panel-2 [process-list]]
                    [modal]]]))))

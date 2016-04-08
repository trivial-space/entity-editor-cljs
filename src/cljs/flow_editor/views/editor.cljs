(ns flow-editor.views.editor
  (:require [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [re-com.core :as re-com]
            [flow-editor.views.process :refer [process-component]]
            [flow-editor.views.entity :refer [entity-component]]))


(defn title []
  (let [name (subscribe [:name])]
    (fn []
      [re-com/title
       :label (str "Flow Editor " @name)
       :level :level1])))


(defn entity-list []
  (let [entities (subscribe [:edited-entities])]
    (fn []
      [re-com/v-box
       :children (map entity-component @entities)])))


(defn process-list []
  (let [processes (subscribe [:edited-processes])]
    (fn []
      [re-com/v-box
       :children (map process-component @processes)])))


(defn editor []
  (fn []
    [re-com/v-box
     :height "100%"
     :children [[title]
                [re-com/h-box
                 :children [[entity-list]
                            [process-list]]]]]))

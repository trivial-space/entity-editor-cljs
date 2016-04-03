(ns flow-editor.views.editor
  (:require [flow-editor.views.utils.codemirror :refer [cm]]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [re-com.core :as re-com]))


(defn title []
  (let [name (subscribe [:name])]
    (fn []
      [re-com/title
       :label (str "Hello from " @name)
       :level :level1])))


(defn editor []
  (fn []
    [re-com/v-box
     :height "100%"
     :children [[title]
                [cm "fuu" {:mode "JavaScript"}]]]))

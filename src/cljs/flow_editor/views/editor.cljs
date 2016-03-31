(ns flow-editor.views.editor
  (:require [cljsjs.codemirror :as cm]
            [re-frame.core :as re-frame]
            [reagent.core :as r]
            [re-com.core :as re-com]))


(defn codemirror []
  (let [value (r/atom "fuu")]
    (fn []
      [:textarea {:value @value
                  :on-change #(reset! value (-> % .-target .-value))}])))


(defn title []
  (let [name (re-frame/subscribe [:name])]
    (fn []
      [re-com/title
       :label (str "Hello from " @name)
       :level :level1])))


(defn editor []
  (fn []
    [re-com/v-box
     :height "100%"
     :children [[title]
                [codemirror]]]))

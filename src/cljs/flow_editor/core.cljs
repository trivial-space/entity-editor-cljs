(ns flow-editor.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame]
              [flow-editor.handlers]
              [flow-editor.subs]
              [flow-editor.views.editor :refer [editor title]]
              [flow-editor.config :as config]
              [cljs.pprint :refer [pprint]]))


(when config/debug?
  (println "dev mode"))


(defn mount-root []
  (reagent/render [editor]
                  (.getElementById js/document "app")))


(defn ^:export init [flow-runtime]
  (re-frame/dispatch-sync [:initialize-db])
  (re-frame/dispatch-sync [:initialize-flow-runtime flow-runtime])
  (mount-root))


(defn inspect-db
  ([]
   (println (pprint @re-frame.db/app-db)))
  ([k]
   (println (pprint (k @re-frame.db/app-db)))))

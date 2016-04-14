(ns flow-editor.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame :refer [dispatch-sync]]
              [flow-editor.handlers.core]
              [flow-editor.subs]
              [flow-editor.views.editor :refer [editor]]
              [flow-editor.config :as config]
              [cljs.pprint :refer [pprint]]))


(when config/debug?
  (println "dev mode"))


(defn mount-root []
  (reagent/render [editor]
                  (.getElementById js/document "app")))


(defn ^:export init [flow-runtime]
  (dispatch-sync [:initialize-db])
  (dispatch-sync [:initialize-flow-runtime flow-runtime])
  (mount-root))


(defn inspect-db
  ([]
   (println (pprint @re-frame.db/app-db)))
  ([k]
   (println (pprint (k @re-frame.db/app-db)))))

(ns flow-editor.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame :refer [dispatch-sync]]
              [flow-editor.handlers.core]
              [flow-editor.subs.core]
              [flow-editor.views.editor :refer [editor]]
              [flow-editor.views.main-frame :as main-frame]
              [flow-editor.config :as config]
              [cljs.pprint :refer [pprint]]))


(when config/debug?
  (println "dev mode")
  (defn inspect-db
    ([]
     (println (pprint @re-frame.db/app-db)))
    ([k]
     (println (pprint (k @re-frame.db/app-db))))))


(def root-el-id "tvs-flow-editor")


(defn create-root-el []
  (let [el (.createElement js/document "div")]
    (aset el "id" root-el-id)
    (.appendChild (.-body js/document) el)
    el))


(defonce el
  (or (.getElementById js/document root-el-id)
      (create-root-el)))


(defn mount-root []
  (reagent/render [editor] el))


(defn ^:export init
  ([flow-runtime]
   (dispatch-sync [:initialize-db])
   (dispatch-sync [:initialize-flow-runtime flow-runtime])
   (mount-root)
   (main-frame/setup el))
  ([flow-runtime local-storage-key]
   (init flow-runtime)
   (dispatch-sync [:initialize-local-storage-key local-storage-key])))

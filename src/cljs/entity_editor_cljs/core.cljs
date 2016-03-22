(ns entity-editor-cljs.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame]
              [entity-editor-cljs.handlers]
              [entity-editor-cljs.subs]
              [entity-editor-cljs.views :as views]
              [entity-editor-cljs.config :as config]))

(when config/debug?
  (println "dev mode"))

(defn mount-root []
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn ^:export init []
  (re-frame/dispatch-sync [:initialize-db])
  (mount-root))

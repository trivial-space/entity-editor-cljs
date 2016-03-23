(ns flow-editor.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame]
              [flow-editor.handlers]
              [flow-editor.subs]
              [flow-editor.views :as views]
              [flow-editor.config :as config]))

(when config/debug?
  (println "dev mode"))

(defn mount-root []
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn ^:export init []
  (re-frame/dispatch-sync [:initialize-db])
  (mount-root))

(defn shout []
  (.log js/console "lalala!!!"))

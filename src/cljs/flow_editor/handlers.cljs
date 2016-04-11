(ns flow-editor.handlers
    (:require [re-frame.core :as re-frame]
              [flow-editor.db :as db]))

(re-frame/register-handler
 :initialize-db
 (fn  [_ _]
   db/initial-db))


(re-frame/register-handler
 :initialize-flow-runtime
 (fn  [db [_ runtime]]
   (-> db
      (assoc :runtime runtime)
      (assoc :graph (js->clj (.getState runtime) :keywordize-keys true)))))


(re-frame/register-handler
 :open-modal
 (fn  [db [_ modal-key]]
   (assoc db :modal modal-key)))

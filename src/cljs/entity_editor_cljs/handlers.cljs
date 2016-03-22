(ns entity-editor-cljs.handlers
    (:require [re-frame.core :as re-frame]
              [entity-editor-cljs.db :as db]))

(re-frame/register-handler
 :initialize-db
 (fn  [_ _]
   db/default-db))

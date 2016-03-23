(ns flow-editor.handlers
    (:require [re-frame.core :as re-frame]
              [flow-editor.db :as db]))

(re-frame/register-handler
 :initialize-db
 (fn  [_ _]
   db/default-db))

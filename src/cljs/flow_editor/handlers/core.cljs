(ns flow-editor.handlers.core
    (:require [re-frame.core :refer [register-handler]]
              [flow-editor.db :as db]
              [flow-editor.handlers.ui]
              [flow-editor.handlers.flow-runtime :as flow-handler]))


(register-handler
 :initialize-db
 (fn [_ _]
   db/initial-db))


(register-handler
 :initialize-flow-runtime
 (fn [db [_ runtime]]
   (-> db
      (assoc :runtime runtime)
      (flow-handler/update-runtime))))


(register-handler
 :initialize-local-storage-key
 (fn [db [_ key]]
   (println "localStorage handler " key)
   (assoc db :local-storage-key key)))

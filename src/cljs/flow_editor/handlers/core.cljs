(ns flow-editor.handlers.core
    (:require [re-frame.core :refer [dispatch register-handler]]
              [flow-editor.db :as db]
              [flow-editor.handlers.ui]
              [flow-editor.handlers.graph-ui]
              [flow-editor.handlers.flow-runtime :as flow-handler]))


(register-handler
  :initialize-db
  (fn [_ _]
    db/initial-db))


(register-handler
  :initialize-flow-runtime
  (fn [db [_ runtime]]
    (let [new-db (assoc db :runtime runtime)
          new-db (flow-handler/update-runtime new-db)]
      (doseq [entity (vals (get-in new-db [:graph :entities]))]
        (dispatch [:flow-runtime/watch-entity (:id entity)]))
      new-db)))


(register-handler
  :initialize-local-storage-key
  (fn [db [_ key]]
    (println "localStorage handler " key)
    (assoc db :local-storage-key key)))

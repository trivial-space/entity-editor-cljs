(ns flow-editor.handlers.flow-runtime
  (:require [re-frame.core :refer [register-handler dispatch]]))


(def default-process-code
  "function(ports, send) {\n\n}")


(defn update-runtime [db]
  (let [new-graph (js->clj (.getState (:runtime db)) :keywordize-keys true)]
    (when-let [local-storage-key (:local-storage-key db)]
      (.setItem js/localStorage local-storage-key (.stringify js/JSON (clj->js new-graph))))
    (assoc db :graph new-graph)))


(register-handler
 :flow-runtime/add-entity
 (fn [db [_ entity-id]]
   (.addEntity (:runtime db) #js {:id entity-id})
   (dispatch [:ui/close-modal])
   (update-runtime db)))


(register-handler
 :flow-runtime/add-process
 (fn [db [_ process-id]]
   (.addProcess (:runtime db) #js {:id process-id :code default-process-code})
   (dispatch [:ui/close-modal])
   (update-runtime db)))


(register-handler
 :flow-runtime/remove-entity
 (fn [db [_ entity-id]]
   (.removeEntity (:runtime db) entity-id)
   (update-runtime db)))


(register-handler
 :flow-runtime/remove-process
 (fn [db [_ process-id]]
   (.removeProcess (:runtime db) process-id)
   (update-runtime db)))

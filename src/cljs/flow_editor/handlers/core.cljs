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
      new-db)))


(register-handler
  :initialize-local-storage-key
  (fn [db [_ key]]
    (println "localStorage handler " key)
    (let [window-key (str key :main-frame-dimensions)
          dimensions-js (.parse js/JSON (.getItem js/localStorage window-key))
          dimensions (js->clj dimensions-js :keywordize-keys true)]
      (when dimensions
        (js/setTimeout #(dispatch [:ui/init-main-frame-dimensions dimensions]) 100)))
    (assoc db :local-storage-key key)))

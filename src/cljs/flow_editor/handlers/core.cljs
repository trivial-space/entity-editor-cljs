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
   (let [ui-key (str key :ui)
         ui-settings (-> (.parse js/JSON (.getItem js/localStorage ui-key))
                       (js->clj :keywordize-keys true))]
     (when ui-settings
       (js/setTimeout
        #(do (when-let [dimensions (:main-frame-dimensions ui-settings)]
               (dispatch [:ui/init-main-frame-dimensions (:current dimensions)]))
             (when-let [pinned? (:pinned? ui-settings)]
               (dispatch [:ui/set-pinned pinned?]))
             (when-let [width (:graph-width ui-settings)]
               (dispatch [:ui/set-graph-width width])))
        100)))
   (assoc db :local-storage-key key)))

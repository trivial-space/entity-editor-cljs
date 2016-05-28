(ns flow-editor.handlers.graph-ui
  (:require [re-frame.core :refer [register-handler]]))


(register-handler
  :graph-ui/set-new-node-position
  (fn [db [_ pos]]
    (println "new node" pos)
    (assoc-in db [:graph-ui :new-node-position] pos)))


(register-handler
  :graph-ui/open-context-menu
  (fn [db [_ type pos]]
    (println "open context" type pos)
    (assoc-in db [:graph-ui :context-menu] {:type type
                                            :pos pos})))

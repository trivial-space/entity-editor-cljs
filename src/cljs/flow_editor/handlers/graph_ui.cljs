(ns flow-editor.handlers.graph-ui
  (:require [re-frame.core :refer [register-handler]]
            [flow-editor.utils.graph-ui :refer [node-from-id p-node-id e-node-id =node]]))


(register-handler
 :graph-ui/set-new-node-position
 (fn [db [_ pos]]
   (assoc-in db [:graph-ui :new-node-position] pos)))


(register-handler
 :graph-ui/open-context-menu
 (fn [db [_ type pos]]
   (assoc-in db [:graph-ui :context-menu] {:type type :pos pos})))


(register-handler
 :graph-ui/close-context-menu
 (fn [db _]
   (assoc-in db [:graph-ui :context-menu] nil)))


(register-handler
 :graph-ui/set-mode
 (fn [db [_ mode]]
   (assoc-in db [:graph-ui :mode] mode)))


(register-handler
 :graph-ui/set-active-node
 (fn [db [_ node]]
   (assoc-in db [:graph-ui :active-node] node)))

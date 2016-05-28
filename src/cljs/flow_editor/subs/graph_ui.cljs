(ns flow-editor.subs.graph-ui
  (:require [re-frame.core :refer [register-sub]]))


(register-sub
  :graph-ui/context-menu
  (fn [db]
    (get-in @db [:graph-ui :context-menu])))

(ns flow-editor.subs.graph-ui
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]))


(register-sub
  :graph-ui/context-menu
  (fn [db]
    (reaction (get-in @db [:graph-ui :context-menu]))))

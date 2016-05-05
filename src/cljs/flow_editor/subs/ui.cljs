(ns flow-editor.subs.ui
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]))


(register-sub
  :ui/code-mirror-defaults
  (fn [db]
    (reaction (:code-mirror-defaults @db))))


(register-sub
  :ui/modal
  (fn [db]
    (reaction (get-in @db [:ui :modal]))))


(register-sub
  :ui/main-frame-dimensions
  (fn [db]
    (reaction (get-in @db [:ui :main-frame-dimensions]))))


(register-sub
  :ui/window-size
  (fn [db]
    (reaction (get-in @db [:ui :window-size]))))

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
    (reaction (get-in @db [:ui :main-frame-dimensions :current]))))


(register-sub
  :ui/window-size
  (fn [db]
    (reaction (get-in @db [:ui :window-size]))))


(register-sub
  :ui/minimized?
  (fn [db]
    (reaction (get-in @db [:ui :minimized?]))))


(register-sub
  :ui/fullscreen?
  (fn [db]
    (reaction (get-in @db [:ui :fullscreen?]))))


(register-sub
  :ui/layout
  (fn [db]
    (reaction (get-in @db [:ui :layout]))))


(register-sub
  :ui/graph-width
  (fn [db]
    (reaction (get-in @db [:ui :graph-width]))))

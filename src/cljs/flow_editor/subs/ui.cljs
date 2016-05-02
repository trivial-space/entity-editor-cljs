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
   (reaction (:modal @db))))

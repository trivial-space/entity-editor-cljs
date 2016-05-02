(ns flow-editor.subs.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]
            [flow-editor.subs.flow-runtime]
            [flow-editor.subs.ui]))


(register-sub
 :name
 (fn [db]
   (reaction (:name @db))))

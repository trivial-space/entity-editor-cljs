(ns flow-editor.subs
    (:require-macros [reagent.ratom :refer [reaction]])
    (:require [re-frame.core :refer [register-sub]]))

(register-sub
 :name
 (fn [db]
   (reaction (:name @db))))

(register-sub
 :code-mirror-defaults
 (fn [db]
   (reaction (:code-mirror-defaults @db))))

(ns flow-editor.views.value-types.core
  (:require [flow-editor.views.value-types.evaled-json :as evaled-json]));



(def value-types
  {:evaled-JSON
    {:initial-value-editor evaled-json/initial-value-editor
     :current-value-editor evaled-json/current-value-editor}})

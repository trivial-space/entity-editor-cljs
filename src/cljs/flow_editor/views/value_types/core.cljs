(ns flow-editor.views.value-types.core
  (:require [flow-editor.views.value-types.evaled-json :as evaled-json]
            [flow-editor.views.value-types.code :as code]))


(def value-editors
  {"evaled-JSON" evaled-json/value-editor
   "code" code/value-editor})

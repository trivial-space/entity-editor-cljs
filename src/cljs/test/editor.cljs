(ns test.editor
  (:require [flow-editor.core :refer [init]]
            [libs.flow]))


(def runtime (.create js/tvsFlow))

(init runtime)

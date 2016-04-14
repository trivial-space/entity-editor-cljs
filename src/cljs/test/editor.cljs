(ns test.editor
  (:require [flow-editor.core :as editor]
            [libs.flow]))


(def runtime (.create js/tvsFlow))

(defn ^:export init [] (editor/init runtime))

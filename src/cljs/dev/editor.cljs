(ns dev.editor
  (:require [flow-editor.core :as editor]))


(defn ^:export init
  ([runtime]
   (editor/init runtime))
  ([runtime local-storage-key]
   (editor/init runtime local-storage-key)))

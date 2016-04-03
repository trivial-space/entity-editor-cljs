(ns flow-editor.css
  (:require [garden.def :refer [defstyles]]))

(defstyles screen

  [:body
   {:color "red"
    :background "tomato"}]

  [:.level1
   {:color "purple"}]

  [:.CodeMirror
    {:height "auto"
     :font-family "\"Source Code Pro\", Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace"
     :line-height "1.5"
     :font-size "16px"}])

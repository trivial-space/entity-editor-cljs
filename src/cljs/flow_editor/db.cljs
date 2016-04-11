(ns flow-editor.db)

(def initial-db
  {:name "re-frame"
   :code-mirror-defaults
     {:theme "monokai"
      :keyMap "vim"
      :lineNumbers true
      :matchBrackets true
      :showCursorWhenSelecting true
      :viewportMargin js/Infinity
      :scrollbarStyle nil
      :autoRefresh true}
   :runtime nil
   :graph nil
   :modal nil})

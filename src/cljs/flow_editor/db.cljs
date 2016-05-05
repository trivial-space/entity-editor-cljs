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
   :entity-values {}
   :ui
     {:modal nil
      :main-frame-dimensions
       {:width 0
        :height 0
        :top 0
        :left 0}
      :window-size
       {:width 0
        :height 0}}})

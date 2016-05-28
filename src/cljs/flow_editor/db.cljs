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
      :tabSize 2
      :indentWithTabs true
      :autoCloseBrackets true
      :showTrailingSpace true
      :autoRefresh true}
   :runtime nil
   :graph nil
   :entity-values {}
   :graph-ui
     {:new-node-position nil
      :context-menu nil}
   :ui
     {:modal nil
      :minimized? false
      :fullscreen? false
      :main-frame-dimensions
       {:current {:width 0
                  :height 0
                  :top 0
                  :left 0}
        :old nil}
      :window-size
       {:width 0
        :height 0}}})

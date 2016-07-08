(ns flow-editor.db)

(def initial-db
  {:name "re-frame"
   :local-storage-key "flow-graph"
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
      :autoRefresh true
      :extraKeys {"Ctrl-Space" "autocomplete"}}
   :runtime nil
   :graph nil
   :entity-values {}
   :graph-ui
     {:new-node-position nil
      :context-menu nil
      :active-node nil
      :mode nil}
   :ui
     {:layout []
      :modal nil
      :minimized? false
      :fullscreen? false
      :pinned? false
      :graph-width 600
      :main-frame-dimensions
       {:current {:width 0
                  :height 0
                  :top 0
                  :left 0}
        :old nil}
      :window-size
       {:width 0
        :height 0}}})

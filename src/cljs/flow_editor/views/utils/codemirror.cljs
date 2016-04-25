(ns flow-editor.views.utils.codemirror
  (:require [cljsjs.codemirror]
            [cljsjs.codemirror.mode.javascript]
            [cljsjs.codemirror.mode.htmlmixed]
            [cljsjs.codemirror.keymap.vim]
            [cljsjs.codemirror.addon.edit.closebrackets]
            [cljsjs.codemirror.addon.edit.closetag]
            [cljsjs.codemirror.addon.edit.matchbrackets]
            [cljsjs.codemirror.addon.edit.matchtags]
            [cljsjs.codemirror.addon.display.autorefresh]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]))


(.map CodeMirror/Vim "jj" "<Esc>" "insert")
(.map CodeMirror/Vim "kk" "<Esc>" "insert")


(defn cm-inner []
  (let [cm (atom nil)
        update (fn [comp]
                 (let [props (r/props comp)]
                   (.setValue @cm (:val props))))]

    (r/create-class
      {:reagent-render (fn []
                         [:div.cm-container])

       :component-did-mount (fn [comp]
                              (let [node (r/dom-node comp)
                                    props (r/props comp)
                                    changes (:changes props)
                                    editor (js/CodeMirror node (clj->js (:opts props)))]
                                (reset! cm editor)
                                (update comp)
                                (when changes
                                  (.on editor "change" #(reset! changes (.getValue editor))))))

       :component-did-update update
       :display-name "gmap-inner"})))



(defn cm [val opts changes]
  (let [defaults (subscribe [:code-mirror-defaults])   ;; obtain the data]
        options (merge @defaults opts)]
    (fn [v o changes]
      [cm-inner {:val v
                 :opts options
                 :changes changes}])))

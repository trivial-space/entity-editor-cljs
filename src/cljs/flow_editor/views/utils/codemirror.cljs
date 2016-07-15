(ns flow-editor.views.utils.codemirror
  (:require [custom-codemirror.javascript-hint]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]))


(.map js/CodeMirror.Vim "jj" "<Esc>" "insert")
(.map js/CodeMirror.Vim "kk" "<Esc>" "insert")


(defn cm-inner []
  (let [cm (atom nil)
        update (fn [comp]
                 (let [props (r/props comp)
                       ctx (clj->js {:additionalContext (:hint-ctx props)})]
                   (.setOption @cm "hintOptions" ctx)
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



(defn cm [val opts changes hint-ctx]
  (let [defaults (subscribe [:ui/code-mirror-defaults])
        options (merge @defaults opts)]
    (fn [v o changes hint-ctx]
      [cm-inner {:val v
                 :opts options
                 :changes changes
                 :hint-ctx hint-ctx}])))

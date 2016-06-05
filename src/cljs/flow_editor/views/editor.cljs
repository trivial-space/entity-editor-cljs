(ns flow-editor.views.editor
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title md-icon-button button v-box gap h-box box h-split scroller]]
            [flow-editor.views.process :refer [process-component]]
            [flow-editor.views.entity :refer [entity-component]]
            [flow-editor.views.graph-viewer :refer [graph-component]]
            [flow-editor.views.modals.helpers :refer [get-modal]]
            [goog.events :as events])
  (:import [goog.events EventType]))


(defn minimized
  []
  [box
   :child [md-icon-button
           :md-icon-name "zmdi-fullscreen"
           :size :larger
           :on-click #(dispatch [:ui/minimized-exit])]])


(defn headerline-drag [e]
  (let [old-pos (atom {:x (.-clientX e)
                       :y (.-clientY e)})
        on-move (fn [e]
                  (let [new-pos {:x (.-clientX e)
                                 :y (.-clientY e)}]
                    (dispatch [:ui/update-main-frame-pos
                                {:top (- (:y new-pos) (:y @old-pos))
                                 :left (- (:x new-pos) (:x @old-pos))}])
                    (reset! old-pos new-pos)))]
    (events/listen js/window EventType.MOUSEMOVE on-move)
    (events/listen js/window EventType.MOUSEUP
      #(events/unlisten js/window EventType.MOUSEMOVE on-move))))


(defn headline [fullscreen?]
  (let [drag-handler (if-not fullscreen?
                       headerline-drag
                       (fn []))
        class (str "main-header "
                (when fullscreen? "fullscreen"))]
    [h-box
     :gap "5px"
     :children [[title
                 :class class
                 :attr {:on-mouse-down drag-handler}
                 :margin-top "0.1em"
                 :label (str "Flow editor")
                 :level :level2]
                [gap
                 :size "auto"
                 :class class
                 :attr {:on-mouse-down drag-handler}]
                [md-icon-button
                 :md-icon-name "zmdi-download"
                 :emphasise? true
                 :tooltip "export graph"
                 :on-click #(dispatch [:ui/open-modal :modals/export-graph])]
                (if fullscreen?
                  [md-icon-button
                   :md-icon-name "zmdi-minus"
                   :tooltip "exit fullscreen"
                   :on-click #(dispatch [:ui/fullscreen-exit])]
                  [md-icon-button
                   :md-icon-name "zmdi-plus"
                   :tooltip "fullscreen"
                   :on-click #(dispatch [:ui/fullscreen-enter])])
                (when-not fullscreen?
                  [md-icon-button
                   :md-icon-name "zmdi-close"
                   :tooltip "minimize window"
                   :on-click #(dispatch [:ui/minimized-enter])])]]))


(defn node-list []
  (let [nodes (subscribe [:ui/layout])
        graph (subscribe [:flow-runtime/graph])]
    (fn []
      (let [processes (:processes @graph)
            entities (:entities @graph)]
        [scroller
         :class "item-list process-item-list"
         :min-width "570px"
         :h-scroll :off
         :child [v-box
                 :size "auto"
                 :gap "5px"
                 :children [(for [node @nodes]
                              (if (= (:type node) "entity")
                                (when-let [e (get entities (keyword (:id node)))]
                                  ^{:key (str "entity-" (:id e))} [entity-component e])
                                (when-let [p (get processes (keyword (:id node)))]
                                  ^{:key (str "process-" (:id p))} [process-component p])))]]]))))


(defn resize-drag [e]
  (let [old-pos (atom {:x (.-clientX e)
                       :y (.-clientY e)})
        on-move (fn [e]
                  (let [new-pos {:x (.-clientX e)
                                 :y (.-clientY e)}]
                    (dispatch [:ui/update-main-frame-size
                                {:height (- (:y new-pos) (:y @old-pos))
                                 :width (- (:x new-pos) (:x @old-pos))}])
                    (reset! old-pos new-pos)))]
    (events/listen js/window EventType.MOUSEMOVE on-move)
    (events/listen js/window EventType.MOUSEUP
      #(events/unlisten js/window EventType.MOUSEMOVE on-move))))


(defn graph-drag [e]
  (let [old-pos (atom (.-clientX e))
        on-move (fn [e]
                  (let [new-pos (.-clientX e)]
                    (dispatch [:ui/update-graph-width (- new-pos @old-pos)])
                    (reset! old-pos new-pos)))]
    (events/listen js/window EventType.MOUSEMOVE on-move)
    (events/listen js/window EventType.MOUSEUP
      #(events/unlisten js/window EventType.MOUSEMOVE on-move))))


(defn editor []
  (let [modal-key (subscribe [:ui/modal])
        minimized? (subscribe [:ui/minimized?])
        fullscreen? (subscribe [:ui/fullscreen?])]
    (fn []
      (if @minimized?
        [minimized]
        (let [modal (get-modal @modal-key)]
          [v-box
           :size "auto"
           :width "100%"
           :height "100%"
           :children [[headline @fullscreen?]
                      [scroller
                       :class "main-content"
                       :v-scroll :off
                       :child [h-box
                               :size "auto"
                               :children [[graph-component]
                                          [gap
                                           :size "10px"
                                           :class "graph-resizer"
                                           :attr {:on-mouse-down graph-drag}]
                                          [node-list]
                                          [gap :size "5px"]]]]
                      (when-not @fullscreen?
                        [:div
                         {:class-name "resize-drag"
                          :on-mouse-down resize-drag}])
                      [modal]]])))))

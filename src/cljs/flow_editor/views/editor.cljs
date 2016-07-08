(ns flow-editor.views.editor
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title md-icon-button button single-dropdown v-box gap h-box box h-split scroller]]
            [flow-editor.views.process :refer [process-component]]
            [flow-editor.views.entity :refer [entity-component]]
            [flow-editor.views.graph-viewer :refer [graph-component]]
            [flow-editor.views.modals.helpers :refer [get-modal]]
            [flow-editor.utils.graph-ui :refer [e-node-id node-from-id p-node-id node-id]]
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
  (let [active-node (subscribe [:graph-ui/active-node])
        entities (subscribe [:flow-runtime/all-entities])
        processes (subscribe [:flow-runtime/all-processes])
        pinned? (subscribe [:ui/pinned?])]
    (fn [fullscreen?]
      (let [drag-handler (if-not fullscreen?
                           headerline-drag
                           (fn []))
            class (str "main-header "
                       (when fullscreen? "fullscreen"))
            active-choise (node-id @active-node)
            node-choises (concat
                          [{:id nil :label "__ no node selected __"}]
                          (map (fn [e] {:id (e-node-id (:id e)) :label (str (:id e) " (E)")}) @entities)
                          (map (fn [p] {:id (p-node-id (:id p)) :label (str (:id p) " (P)")}) @processes))]

        [h-box
         :gap "5px"
         :children [[title
                     :class class
                     :attr {:on-mouse-down drag-handler}
                     :margin-top "0.1em"
                     :label (str "Flow editor")
                     :level :level2]
                    [gap :size "20px"]
                    [single-dropdown
                     :choices node-choises
                     :model active-choise
                     :width "250px"
                     :style {:margin-top "-3px"}
                     :filter-box? true
                     :on-change #(if %
                                   (dispatch [:flow-runtime-ui/open-node %])
                                   (dispatch [:graph-ui/set-active-node nil]))]
                    [gap
                     :size "auto"
                     :class class
                     :attr {:on-mouse-down drag-handler}]
                    [md-icon-button
                     :md-icon-name "zmdi-download"
                     :emphasise? true
                     :tooltip "export graph"
                     :on-click #(dispatch [:ui/open-modal :modals/export-graph])]
                    (if @pinned?
                      [md-icon-button
                       :md-icon-name "zmdi-pin"
                       :style {:color "orange"}
                       :tooltip "always opaque"
                       :on-click #(dispatch [:ui/set-pinned false])]
                      [md-icon-button
                       :md-icon-name "zmdi-pin"
                       :tooltip "transparent on mouse out"
                       :on-click #(dispatch [:ui/set-pinned true])])
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
                       :on-click #(dispatch [:ui/minimized-enter])])]]))))


(defn node-list []
  (let [nodes (subscribe [:ui/layout])
        graph (subscribe [:flow-runtime/graph])]
    (r/create-class
     {:reagent-render
      (fn []
        (let [processes (:processes @graph)
              entities (:entities @graph)]
          [scroller
           :class "item-list"
           :min-width "570px"
           :h-scroll :off
           :child [v-box
                   :size "auto"
                   :gap "5px"
                   :children [(for [node @nodes]
                                (if (= (:type node) "entity")
                                  (when-let [e (get entities (keyword (:id node)))]
                                    ^{:key (str "entity-" (:id e))} [entity-component e (:minified node)])
                                  (when-let [p (get processes (keyword (:id node)))]
                                    ^{:key (str "process-" (:id p))} [process-component p (:minified node)])))]]]))
      :component-did-update
      (fn [comp]
        (let [active (:active-node (r/props comp))]
          (when (:scroll active)
            (let [dom-node (r/dom-node comp)
                  el-class (node-id active)
                  el (aget (.getElementsByClassName js/document el-class) 0)
                  top-offset (.-offsetTop el)]
              (set! (.-scrollTop dom-node) (- top-offset 60))))))})))


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
        fullscreen? (subscribe [:ui/fullscreen?])
        active-node (subscribe [:graph-ui/active-node])]
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
                                          [node-list {:active-node @active-node}]
                                          [gap :size "5px"]]]]
                      (when-not @fullscreen?
                        [:div
                         {:class-name "resize-drag"
                          :on-mouse-down resize-drag}])
                      [modal]]])))))

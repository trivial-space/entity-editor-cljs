(ns flow-editor.views.editor
  (:require [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [title button v-box gap h-box box h-split scroller]]
            [flow-editor.views.process :refer [process-component]]
            [flow-editor.views.entity :refer [entity-component]]
            [flow-editor.views.graph-viewer :refer [graph-component]]
            [flow-editor.views.modals.helpers :refer [get-modal]]
            [goog.events :as events])
  (:import [goog.events EventType]))


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


(defn headline []
  [h-box
   :children [[title
               :class "main-header"
               :attr {:on-mouse-down headerline-drag}
               :margin-top "0.1em"
               :label (str "Flow editor")
               :level :level1]
              [gap
               :size "auto"
               :class "main-header"
               :attr {:on-mouse-down headerline-drag}]
              [button
               :label "export"
               :on-click #(dispatch [:ui/open-modal :modals/export-graph])]]])


(defn entity-list []
  (let [entities (subscribe [:flow-runtime/edited-entities])]
    (fn []
      [v-box
       :class "section-container entity-section"
       :children [[h-box
                   :children [[box
                               :size "auto"
                               :child [title
                                       :label "Entities"
                                       :level :level2
                                       :margin-top "0.1em"]]
                              [button
                               :label "add"
                               :on-click #(dispatch [:ui/open-modal :modals/add-entity])]]]
                  [scroller
                   :class "item-list entity-item-list"
                   :min-width "400px"
                   :child [v-box
                           :gap "5px"
                           :children [(for [entity @entities]
                                        ^{:key (str "entity-" (:id entity))} [entity-component entity])]]]]])))


(defn process-list []
  (let [processes (subscribe [:flow-runtime/edited-processes])]
    (fn []
      [v-box
       :class "section-container process-section"
       :children [[h-box
                   :children [[box
                               :size "auto"
                               :child [title
                                       :label "Processes"
                                       :level :level2
                                       :margin-top "0.1em"]]
                              [button
                               :label "add"
                               :on-click #(dispatch [:ui/open-modal :modals/add-process])]]]
                  [scroller
                   :class "item-list process-item-list"
                   :min-width "520px"
                   :child [v-box
                           :gap "5px"
                           :children [(for [process @processes]
                                        ^{:key (str "process-" (:id process))} [process-component process])]]]]])))


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


(defn editor []
  (let [modal-key (subscribe [:ui/modal])]
    (fn []
      (let [modal (get-modal @modal-key)]
        [v-box
         :size "auto"
         :width "100%"
         :height "100%"
         :children [[headline]
                    [scroller
                     :class "main-content"
                     :v-scroll :off
                     :child [h-box
                             :size "auto"
                             :gap "10px"
                             :children [[v-box
                                         :min-width "500px"
                                         :children [[title
                                                     :label "Graph"
                                                     :level :level2
                                                     :margin-top "0.1em"]
                                                    [graph-component]]]

                                        [entity-list]
                                        [process-list]]]]
                    [:div
                     {:class-name "resize-drag"
                      :on-mouse-down resize-drag}]
                    [modal]]]))))

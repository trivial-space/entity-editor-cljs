(ns flow-editor.views.graph-viewer
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [cljsjs.vis]
            [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as r]
            [re-com.core :refer [box]]))


(def default-group "__default")


(def graph-options
  (clj->js
    {:layout {:randomSeed 3}
              ;;:hierarchical {:sortMethod "hubsize"}}
     :edges {:arrows "to"
             :smooth false
             :color {:inherit "from"}
             :shadow {:x 2}
             :width 2}
     :nodes {:shadow {:x 0}
             :borderWidthSelected 1
             :font {:size 20
                    :strokeColor "white"
                    :strokeWidth 2}
             :size 23}
     :groups
     {:useDefaultGroups false
      :entities
      {:shape "square"
       :color {:border "#2B7CE9"
               :background "#97C2FC"
               :highlight {:border "#2B7CE9"
                           :background "#b8fafe"}}}
      :processes
      {:shape "dot"
       :color {:border "#de7a13"
               :background "#f7d26e"
               :highlight {:border "#de7a13"
                           :background "#f5fba8"}}}}


     :interaction {:multiselect true}
     :physics {:enabled true
               :forceAtlas2Based {:avoidOverlap 0.4
                                  :gravitationalConstant -70
                                  :springConstant 0.05}
               :barnesHut {:avoidOverlap 0.2
                           :gravitationalConstant -3000}
               :solver "forceAtlas2Based"
               :stabilization {:iterations 2000}}}))


(defn p-node-id
  [pid]
  (str "p" pid))


(defn e-node-id
  [eid]
  (str "e" eid))


(defn get-vis-graph
  [graph types]
  (let [adjust-pos (fn [item node]
                     (let [ui (get-in item [:meta :ui])
                           x (:x ui)
                           y (:y ui)
                           pos? (not (and x y))]
                       (merge node {:x (:x ui)
                                    :y (:y ui)
                                    :physics (boolean pos?)})))

        entity-nodes (->> (:entities graph)
                       (map (fn [[eid e]]
                              (let [node {:id (e-node-id (name eid))
                                          :label eid
                                          :group "entities"}
                                    node (adjust-pos e node)]
                                (if (:value e)
                                  (assoc node :borderWidth 5
                                              :borderWidthSelected 5)
                                  node)))))

        process-nodes (->> (:processes graph)
                        (map (fn [[pid p]]
                               (let [node {:id (p-node-id (name pid))
                                           :label pid
                                           :group "processes"}
                                     node (adjust-pos p node)]
                                 (if (:autostart p)
                                   (assoc node :borderWidth 5
                                               :borderWidthSelected 5)
                                   node)))))

        nodes (concat entity-nodes process-nodes)

        edges (->> (:arcs graph)
                (vals)
                (map (fn [a]
                       (let [pid (p-node-id (:process a))
                             eid (e-node-id (:entity a))
                             ports (get-in graph [:processes (keyword (:process a)) :ports])
                             acc? (and (not (:port a))
                                       (some #(= % (get types "ACCUMULATOR")) (vals ports)))]
                         (println acc?)
                         (if (or acc? (:port a))
                           (let [port (get ports (keyword (:port a)))
                                 edge {:from eid :to pid}]
                             (if (= port (get types "COLD"))
                               (assoc edge :dashes true)
                               (if acc?
                                 (assoc edge :arrows {:middle true :from true :to true}
                                             :color {:inherit "to"})
                                 edge)))
                           {:from pid :to eid})))))]

    {:nodes nodes :edges edges}))


(defn init-vis
  [net]
  (.setOptions net graph-options)
  (.on net "oncontext"
       (fn [e]
         (let [evt (js->clj e :keywordize-keys true)
               nodes (:nodes evt)
               edges (:edges evt)]
           (when (and (= 0 (count nodes))
                      (= 0 (count edges)))
             (dispatch [:graph-ui/set-new-node-position (get-in evt [:pointer :canvas])])
             (dispatch [:graph-ui/open-context-menu :context/add-node
                                                    (get-in evt [:pointer :DOM])])))

         (.preventDefault (aget e "event"))))
  (.on net "dragEnd"
       (fn [e]
         (let [nodes (aget e "nodes")]
           (when (< 0 (aget nodes "length"))
             (dispatch [:flow-runtime/set-node-positions (.getPositions net)])))))
  (.on net "stabilized"
       (fn [stabilized-event]
         (println stabilized-event)
         (aset graph-options "physics" false)
         (.setOptions net graph-options)
         (dispatch [:flow-runtime/set-node-positions (.getPositions net)]))))



(defn graph-inner []
  (let [network (atom nil)
        types (subscribe [:flow-runtime/port-types])
        render (fn [comp net]
                 (let [dom-node (r/dom-node comp)
                       dom-rect (.getBoundingClientRect dom-node)
                       graph (:graph (r/props comp))
                       vis-data (get-vis-graph graph @types)]
                   (.setSize net (aget dom-rect "width") (aget dom-rect "height"))
                   (.setData net (clj->js vis-data))
                   (.fit net)))]

    (r/create-class
      {:reagent-render (fn []
                         [box
                          :size "auto"
                          :child [:div]])

       :component-did-mount (fn [comp]
                              (let [node (r/dom-node comp)
                                    new-network (js/vis.Network. node)]
                                (init-vis new-network)
                                (reset! network new-network)
                                (render comp new-network)))

       :component-did-update #(render % @network)
       :display-name "gmap-inner"})))



(defn graph-component []
  (let [graph (subscribe [:flow-runtime/graph])
        context-menu (subscribe [:graph-ui/context-menu])
        size (subscribe [:ui/main-frame-dimensions])
        height (reaction (:height @size))]
    (fn []
      [graph-inner {:graph @graph
                    :size @height}])))

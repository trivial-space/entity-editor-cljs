(ns flow-editor.views.graph-viewer
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [cljsjs.vis]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as r]
            [re-com.core :refer [box]]))


(def default-group "__default")


(def graph-options
  {:layout {:randomSeed 3}
            ;;:hierarchical {:sortMethod "hubsize"}}
   :edges {:arrows "to"
           :smooth false
           :color {:inherit "from"}
           :shadow true
           :width 2}
   :nodes {:shadow true
           :font {:size 20
                  :strokeColor "white"
                  :strokeWidth 2}
           :size 23}
   :physics {:enabled true
             :forceAtlas2Based {:avoidOverlap 0.4
                                :gravitationalConstant -70
                                :springConstant 0.05}
             :barnesHut {:avoidOverlap 0.2
                         :gravitationalConstant -3000}
             :solver "forceAtlas2Based"
             :stabilization {:iterations 2000}}})


(defn graph-inner []
  (let [network (atom nil)
        types (subscribe [:flow-runtime/port-types])
        render (fn [comp net]
                 (let [dom-node (r/dom-node comp)
                       dom-rect (.getBoundingClientRect dom-node)
                       graph (:graph (r/props comp))
                       entity-nodes (->> (:entities graph)
                                      (map (fn [[eid e]]
                                             (let [node {:id eid :label eid :shape "square" :group "entities"}]
                                               (if (:value e)
                                                 (assoc node :borderWidth 4)
                                                 node)))))
                       process-nodes (->> (:processes graph)
                                       (map (fn [[pid p]]
                                              (let [node {:id pid :label pid :shape "dot" :group "processes"}]
                                                (if (:autostart p)
                                                  (assoc node :borderWidth 4)
                                                  node)))))
                       nodes (concat entity-nodes process-nodes)
                       edges (->> (:arcs graph)
                               (vals)
                               (map (fn [a]
                                      (let [pid (:process a)
                                            eid (:entity a)
                                            ports (get-in graph [:processes (keyword pid) :ports])
                                            acc? (and (not (:port a))
                                                      (some #(= % (get @types "ACCUMULATOR")) (vals ports)))]

                                        (if (or acc? (:port a))
                                          (let [port (get ports (keyword (:port a)))
                                                edge {:from eid :to pid}]
                                            (if (= port (get @types "COLD"))
                                              (assoc edge :dashes true)
                                              (if acc?
                                                (assoc edge :arrows {:middle true :from true :to true}
                                                            :color {:inherit "to"})
                                                edge)))
                                          {:from pid :to eid})))))]
                   (.setSize net (aget dom-rect "width") (aget dom-rect "height"))
                   (.setData net (clj->js {:nodes nodes :edges edges}))))]

    (r/create-class
      {:reagent-render (fn []
                         [box
                          :size "auto"
                          :child [:div]])

       :component-did-mount (fn [comp]
                              (let [node (r/dom-node comp)
                                    new-network (js/vis.Network. node)]
                                (.setOptions new-network (clj->js graph-options))
                                (reset! network new-network)
                                (render comp new-network)))

       :component-did-update #(render % @network)
       :display-name "gmap-inner"})))



(defn graph-component []
  (let [graph (subscribe [:flow-runtime/graph])
        size (subscribe [:ui/main-frame-dimensions])
        height (reaction (:height @size))]
    (fn []
      [graph-inner {:graph @graph
                    :size @height}])))

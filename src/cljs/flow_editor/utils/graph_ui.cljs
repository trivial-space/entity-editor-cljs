(ns flow-editor.utils.graph-ui)


(defn e-node
  [eid]
  {:type "entity"
   :id eid})


(defn p-node
  [pid]
  {:type "process"
   :id pid})


(defn p-node-id
  [pid]
  (str "p" pid))


(defn e-node-id
  [eid]
  (str "e" eid))


(defn node-from-id
  [id]
  (let [t (first id)
        k (apply str (rest id))]
    (if (= t "e")
      {:id k :type "entity"}
      {:id k :type "process"})))

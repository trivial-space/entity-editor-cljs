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


(defn =node
  [n1 n2]
  (and (= (:type n1) (:type n2))
       (= (:id n1) (:id n2))))


(defn node-id
  [n]
  (if (= (:type n) "entity")
    (e-node-id (:id n))
    (p-node-id (:id n))))

(ns flow-editor.handlers.flow-runtime
  (:require [re-frame.core :refer [register-handler dispatch]]
            [flow-editor.utils.graph-ui :refer [node-from-id]]))


(def default-process-code
  "function(ports, send) {\n\n}")


(defn update-runtime [db]
  (let [js-graph (.getGraph (:runtime db))
        new-graph (js->clj js-graph :keywordize-keys true)
        layout (get-in new-graph [:meta :ui :layout] [])]
    (println "flow graph updated!")
    (when-let [local-storage-key (:local-storage-key db)]
      (.setItem js/localStorage local-storage-key (.stringify js/JSON js-graph)))
    (-> db
      (assoc :graph new-graph)
      (assoc-in [:ui :layout] layout))))


;; ===== Entity handlers =====

(register-handler
  :flow-runtime/add-entity
  (fn [db [_ eid]]
    (let [pos (get-in db [:graph-ui :new-node-position])
          e (if pos
              (clj->js {:id eid :meta {:ui pos}})
              #js {:id eid})]
      (.addEntity (:runtime db) e)
      (dispatch [:ui/close-modal])
      (dispatch [:graph-ui/set-new-node-position nil])
      (update-runtime db))))


(register-handler
  :flow-runtime/watch-entity
  (fn [db [_ entity-id]]
    (.on (:runtime db) entity-id #(dispatch [:flow-runtime/entity-value-changed
                                             entity-id %]))
    (let [i (get-in db [:entity-values entity-id :iter] 0)]
      (assoc-in db [:entity-values entity-id]
                {:iter i :value (.get (:runtime db) entity-id)}))))


(register-handler
  :flow-runtime/unwatch-entity
  (fn [db [_ entity-id]]
    (.off (:runtime db) entity-id)
    db))


(register-handler
  :flow-runtime/entity-value-changed
  (fn [db [_ entity-id value]]
    (let [i (get-in db [:entity-values entity-id :iter] 0)]
      (assoc-in db [:entity-values entity-id] {:iter (inc i) :value value}))))


(register-handler
  :flow-runtime/remove-entity
  (fn [db [_ entity-id]]
    (.removeEntity (:runtime db) entity-id)
    (update-runtime db)))


(register-handler
  :flow-runtime/edit-entity-value
  (fn [db [_ eid value]]
    (println "updating initial value" eid value)
    (let [e (get-in db [:graph :entities (keyword eid)])]
      (->> (merge e {:value value})
        (clj->js)
        (.addEntity (:runtime db))))
    (update-runtime db)))


(register-handler
  :flow-runtime/set-current-value
  (fn [db [_ eid value]]
    (.set (:runtime db) eid value)
    db))


;; ===== Process handlers =====

(register-handler
  :flow-runtime/add-process
  (fn [db [_ pid]]
    (let [pos (get-in db [:graph-ui :new-node-position])
          p (if pos
              (clj->js {:id pid :code default-process-code :meta {:ui pos}})
              #js {:id pid :code default-process-code})]
      (.addProcess (:runtime db) p)
      (dispatch [:ui/close-modal])
      (dispatch [:graph-ui/set-new-node-position nil])
      (update-runtime db))))


(register-handler
  :flow-runtime/remove-process
  (fn [db [_ process-id]]
    (.removeProcess (:runtime db) process-id)
    (update-runtime db)))


(register-handler
  :flow-runtime/set-process-autostart
  (fn [db [_ pid autostart?]]
    (let [p (get-in db [:graph :processes (keyword pid)])]
      (->> (merge p {:autostart autostart?})
        (clj->js)
        (.addProcess (:runtime db))))
    (update-runtime db)))


(register-handler
  :flow-runtime/update-process-code
  (fn [db [_ pid code]]
    (let [p (get-in db [:graph :processes (keyword pid)])]
      (->> (merge p {:code code :procedure nil})
        (clj->js)
        (.addProcess (:runtime db))))
    (update-runtime db)))


(register-handler
  :flow-runtime/start-process
  (fn [db [_ pid]]
    (.start (:runtime db) pid)
    db))


(register-handler
  :flow-runtime/stop-process
  (fn [db [_ pid]]
    (.stop (:runtime db) pid)
    db))


(register-handler
  :flow-runtime/add-process-port
  (fn [db [_ pid]]
    (let [p (get-in db [:graph :processes (keyword pid)])
          runtime (:runtime db)
          ports (merge (:ports p) {"" (.-PORT_TYPES.COLD runtime)})]
      (.addProcess runtime (clj->js (merge p {:ports ports}))))
    (update-runtime db)))


(register-handler
  :flow-runtime/rename-port
  (fn [db [_ pid old-name new-name]]
    (let [p (get-in db [:graph :processes (keyword pid)])
          runtime (:runtime db)
          port-type (get-in p [:ports (keyword old-name)])
          ports (-> (:ports p)
                  (dissoc (keyword old-name))
                  (assoc (keyword new-name) port-type))]
      (.addProcess runtime (clj->js (merge p {:ports ports})))
      (update-runtime db))))


(register-handler
 :flow-runtime/change-port-type
 (fn [db [_ pid port-name port-type]]
   (let [p (get-in db [:graph :processes (keyword pid)])
         runtime (:runtime db)
         ports (-> (:ports p)
                 (assoc (keyword port-name) port-type))]
     (.addProcess runtime (clj->js (merge p {:ports ports})))
     (update-runtime db))))


(register-handler
  :flow-runtime/remove-process-port
  (fn [db [_ pid port-name]]
    (let [p (get-in db [:graph :processes (keyword pid)])]
      (doseq [arc (->> (get-in db [:graph :arcs])
                    (vals)
                    (filter (fn [{:keys [process port] :as arc}]
                              (and (= process pid)
                                   (= port port-name)))))]
        (.removeArc (:runtime db) (:id arc)))
      (.addProcess (:runtime db) (clj->js (merge p {:ports (dissoc (:ports p) (keyword port-name))})))
      (update-runtime db))))


;; ===== Arc handlers =====

(register-handler
  :flow-runtime/connect-port
  (fn [db [_ pid port-name eid]]
    (doseq [arc (->> (get-in db [:graph :arcs])
                  (vals)
                  (filter (fn [{:keys [process port] :as arc}]
                            (and (= process pid)
                                 (= port port-name)))))]
      (.removeArc (:runtime db) (:id arc)))
    (when eid
      (.addArc (:runtime db) (clj->js {:port port-name :process pid :entity eid})))
    (update-runtime db)))


(register-handler
  :flow-runtime/connect-output
  (fn [db [_ pid eid]]
    (doseq [arc (->> (get-in db [:graph :arcs])
                  (vals)
                  (filter (fn [{:keys [process port] :as arc}]
                            (and (= process pid)
                                 (not port)))))]
      (.removeArc (:runtime db) (:id arc)))
    (when eid
      (.addArc (:runtime db) (clj->js {:process pid :entity eid})))
    (update-runtime db)))


;; ===== Meta handlers =====

(register-handler
  :flow-runtime-ui/set-node-positions
  (fn [db [_ positions]]
    (doseq [[key val] (js->clj positions)]
      (let [{:keys [id type]} (node-from-id key)
            update (fn [item]
                     (clj->js (-> item
                                (assoc-in [:meta :ui :x] (get val "x"))
                                (assoc-in [:meta :ui :y] (get val "y")))))]
        (when (= type :entity)
          (when-let [e (get-in db [:graph :entities id])]
            (.addEntity (:runtime db) (update e))))
        (when (= type :process)
          (when-let [p (get-in db [:graph :processes id])]
            (.addProcess (:runtime db) (update p))))))
    (update-runtime db)))


(defn update-layout
  [db layout]
  (let [meta (get-in db [:graph :meta])]
    (.setMeta (:runtime db) (clj->js (update-in meta [:ui] merge {:layout layout})))
    (update-runtime db)))


(register-handler
  :flow-runtime-ui/open-node
  (fn [db [_ nid]]
    (let [node (node-from-id nid)
          layout (get-in db [:ui :layout])
          open? (some (fn [n]
                        (println n)
                        (and (= (:type n) (:type node))
                             (= (:id n) (:id node))))
                      layout)]
      (println "opening node" open? node layout)
      (if-not open?
        (update-layout db (into [node] layout))
        db))))

(ns flow-editor.subs.flow-runtime
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]))


(register-sub
 :flow-runtime/graph
 (fn [db]
   (reaction (:graph @db))))


(register-sub
 :flow-runtime/runtime
 (fn [db]
   (reaction (:runtime @db))))


;; ===== Entity subscriptions =====

(register-sub
 :flow-runtime/all-entities
 (fn [db]
   (reaction (vals (get-in @db [:graph :entities])))))


(register-sub
 :flow-runtime/entity-value
 (fn [db [_ eid]]
   (reaction (get-in @db [:entity-values eid]))))


;; ===== Process subscriptions =====

(register-sub
 :flow-runtime/all-processes
 (fn [db]
   (reaction (vals (get-in @db [:graph :processes])))))


(register-sub
 :flow-runtime/port-types
 (fn [db]
   (when-let [runtime (:runtime @db)]
     (reaction (js->clj (aget runtime "PORT_TYPES"))))))


(register-sub
 :flow-runtime/process-port-connection
 (fn [db [_ pid]]
   (reaction (->> (get-in @db [:graph :arcs])
               (vals)
               (filter (fn [arc]
                         (= (:process arc) pid)))))))


(register-sub
 :flow-runtime/output-port
 (fn [db [_ pid]]
   (reaction (->> (get-in @db [:graph :arcs])
               (vals)
               (filter (fn [arc]
                         (and (= (:process arc) pid)
                              (not (:port arc)))))
               (first)))))

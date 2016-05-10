(ns flow-editor.views.modals.helpers
  (:require [flow-editor.views.modals.add-entity :refer [add-entity-modal]]
            [flow-editor.views.modals.add-process :refer [add-process-modal]]
            [flow-editor.views.modals.export-graph :refer [export-graph-modal]]))


(defn get-modal [modal-id]
  (case modal-id
    :modals/add-entity add-entity-modal
    :modals/add-process add-process-modal
    :modals/export-graph export-graph-modal
    (fn [])))

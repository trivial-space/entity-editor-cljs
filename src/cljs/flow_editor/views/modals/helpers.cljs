(ns flow-editor.views.modals.helpers
  (:require [flow-editor.views.modals.add-entity :refer [add-entity-modal]]
            [flow-editor.views.modals.add-process :refer [add-process-modal]]))


(defn get-modal [modal-id]
  (case modal-id
    :modals/add-entity add-entity-modal
    :modals/add-process add-process-modal
    (fn [])))

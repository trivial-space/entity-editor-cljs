(ns flow-editor.handlers.ui
  (:require [re-frame.core :refer [register-handler]]))


(register-handler
 :ui/open-modal
 (fn  [db [_ modal-key]]
   (assoc db :modal modal-key)))


(register-handler
 :ui/close-modal
 (fn  [db _]
   (assoc db :modal nil)))

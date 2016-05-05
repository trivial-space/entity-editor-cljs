(ns flow-editor.handlers.ui
  (:require [re-frame.core :refer [register-handler]]))


(register-handler
  :ui/open-modal
  (fn [db [_ modal-key]]
    (assoc-in db [:ui :modal] modal-key)))


(register-handler
  :ui/close-modal
  (fn  [db _]
    (assoc-in db [:ui :modal] nil)))


(register-handler
  :ui/init-main-frame-dimensions
  (fn [db [_ dimensions]]
    (assoc-in db [:ui :main-frame-dimensions] dimensions)))


(register-handler
  :ui/update-main-frame-pos
  (fn [db [_ {:keys [top left]}]]
    (-> db
      (update-in [:ui :main-frame-dimensions :top] #(+ % top))
      (update-in [:ui :main-frame-dimensions :left] #(+ % left)))))


(register-handler
  :ui/update-main-frame-size
  (fn [db [_ {:keys [width height]}]]
    (let [max-width (- (get-in db [:ui :window-size :width]) 20)
          max-height (- (get-in db [:ui :window-size :height]) 20)]
      (-> db
        (update-in [:ui :main-frame-dimensions :width]
          #(.min js/Math (+ % width) max-width))
        (update-in [:ui :main-frame-dimensions :height]
          #(.min js/Math (+ % height) max-height))))))


(register-handler
  :ui/window-resize
  (fn [db [_ size]]
    (assoc-in db [:ui :window-size] size)))

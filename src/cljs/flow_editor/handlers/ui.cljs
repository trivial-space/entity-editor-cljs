(ns flow-editor.handlers.ui
  (:require [re-frame.core :refer [register-handler]]))


(defn save-window-dimensions
  [db]
  (let [dimensions (->> (get-in db [:ui :main-frame-dimensions :current])
                     (clj->js)
                     (.stringify js/JSON))
        key (:local-storage-key db)
        window-key (str key :main-frame-dimensions)]
    (.setItem js/localStorage window-key dimensions)
    db))

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
   (assoc-in db [:ui :main-frame-dimensions :current] dimensions)))


(register-handler
 :ui/update-main-frame-pos
 (fn [db [_ {:keys [top left]}]]
   (-> db
     (update-in [:ui :main-frame-dimensions :current :top] #(+ % top))
     (update-in [:ui :main-frame-dimensions :current :left] #(+ % left))
     (save-window-dimensions))))


(register-handler
 :ui/update-main-frame-size
 (fn [db [_ {:keys [width height]}]]
   (let [max-width (- (get-in db [:ui :window-size :width]) 20)
         max-height (- (get-in db [:ui :window-size :height]) 20)]
     (-> db
       (update-in [:ui :main-frame-dimensions :current :width]
                  #(.min js/Math (+ % width) max-width))
       (update-in [:ui :main-frame-dimensions :current :height]
                  #(.min js/Math (+ % height) max-height))
       (save-window-dimensions)))))


(register-handler
 :ui/window-resize
 (fn [db [_ size]]
   (assoc-in db [:ui :window-size] size)))


(register-handler
 :ui/fullscreen-enter
 (fn [db _]
   (let [size (get-in db [:ui :window-size])
         width (- (:width size) 20)
         height (- (:height size) 20)
         old (get-in db [:ui :main-frame-dimensions :current])]
     (-> db
       (assoc-in [:ui :main-frame-dimensions :old] old)
       (assoc-in [:ui :main-frame-dimensions :current]
                 {:width width
                  :height height
                  :top 10
                  :left 10})
       (assoc-in [:ui :fullscreen?] true)))))


(register-handler
 :ui/fullscreen-exit
 (fn [db _]
   (let [old (get-in db [:ui :main-frame-dimensions :old])]
     (-> db
       (assoc-in [:ui :main-frame-dimensions :current] old)
       (assoc-in [:ui :main-frame-dimensions :old] nil)
       (assoc-in [:ui :fullscreen?] false)))))


(register-handler
 :ui/minimized-enter
 (fn [db _]
   (let [old (get-in db [:ui :main-frame-dimensions :current])]
     (-> db
       (assoc-in [:ui :main-frame-dimensions :old] old)
       (assoc-in [:ui :main-frame-dimensions :current]
                 {:width 42
                  :height 42
                  :top 0
                  :left 0})
       (assoc-in [:ui :minimized?] true)))))


(register-handler
 :ui/minimized-exit
 (fn [db _]
   (let [old (get-in db [:ui :main-frame-dimensions :old])]
     (-> db
       (assoc-in [:ui :main-frame-dimensions :current] old)
       (assoc-in [:ui :main-frame-dimensions :old] nil)
       (assoc-in [:ui :minimized?] false)))))


(register-handler
 :ui/update-graph-width
 (fn [db [_ delta]]
   (assoc-in db [:ui :graph-width]
             (+ (get-in db [:ui :graph-width]) delta))))


(register-handler
 :ui/set-pinned
 (fn [db [_ pinned?]]
   (assoc-in db [:ui :pinned?] pinned?)))

(ns flow-editor.views.main-frame
  (:require-macros [reagent.ratom :refer [reaction run!]])
  (:require [re-frame.core :refer [subscribe dispatch dispatch-sync]]
            [reagent.core :as r]
            [goog.events :as events])
  (:import [goog.events EventType]))


(defn setup
  [el]
  (set! (.-style.width el) "70%")
  (set! (.-style.height el) "70%")
  (let [window-w (.-innerWidth js/window)
        window-h (.-innerHeight js/window)
        r (.getBoundingClientRect el)
        l (/ (- window-w (.-width r)) 2)
        t (/ (- window-h (.-height r)) 2)]

    (dispatch-sync [:ui/window-resize {:width window-w :height window-h}])
    (events/listen js/window EventType.RESIZE
      #(dispatch [:ui/window-resize {:width (.-innerWidth js/window)
                                     :height (.-innerHeight js/window)}]))

    (let [dimensions (subscribe [:ui/main-frame-dimensions])
          left (reaction (:left @dimensions))
          top (reaction (:top @dimensions))
          width (reaction (:width @dimensions))
          height (reaction (:height @dimensions))]
      (run! (set! (.-style.top el) (str @top "px")))
      (run! (set! (.-style.left el) (str @left "px")))
      (run! (set! (.-style.width el) (str @width "px")))
      (run! (set! (.-style.height el) (str @height "px"))))

    (dispatch [:ui/init-main-frame-dimensions
               {:top t :left l :width (.-width r) :height (.-height r)}])))

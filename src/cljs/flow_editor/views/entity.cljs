(ns flow-editor.views.entity)

(defn entity-component [entity]
  [:div
   {:class-name "entity-component"
    :key (:id entity)}
   (str "I am the entity " (:id entity))])

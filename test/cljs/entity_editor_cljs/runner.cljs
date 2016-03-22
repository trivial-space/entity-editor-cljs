(ns entity-editor-cljs.runner
    (:require [doo.runner :refer-macros [doo-tests]]
              [entity-editor-cljs.core-test]))

(doo-tests 'entity-editor-cljs.core-test)

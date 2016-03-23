(ns flow-editor.runner
    (:require [doo.runner :refer-macros [doo-tests]]
              [flow-editor.core-test]))

(doo-tests 'flow-editor.core-test)

(defproject flow-editor "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.51"]
                 [reagent "0.6.0-alpha2"]
                 [re-frame "0.7.0"]
                 [re-com "0.8.3"]
                 [cljsjs/codemirror "5.11.0-1"]
                 [cljsjs/vis "4.16.1-0"]]

  :min-lein-version "2.5.3"

  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.0-6"]
            [lein-doo "0.1.6"]]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"
                                    "resources/public/css/compiled"]

  :figwheel {:css-dirs ["resources/public/css"]
             :server-port 8080}

  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src/cljs"]
                        :figwheel {:on-jsload "flow-editor.core/mount-root"}
                        :compiler {:main dev.editor
                                   :output-to "resources/public/js/compiled/app.js"
                                   :output-dir "resources/public/js/compiled/out"
                                   :asset-path "/js/compiled/out"
                                   :foreign-libs [{:file "libs/flow/build/tvs-flow.js"
                                                   :provides ["libs.flow"]}]
                                   :source-map-timestamp true}}

                       {:id "test"
                        :source-paths ["src/cljs" "test/cljs"]
                        :compiler {:output-to "resources/public/js/compiled/test.js"
                                   :main flow-editor.runner
                                   :foreign-libs [{:file "libs/flow/build/tvs-flow.js"
                                                   :provides ["libs.flow"]}]
                                   :optimizations :none}}

                       {:id "min"
                        :source-paths ["src/cljs"]
                        :compiler {:main flow-editor.core
                                   :output-to "resources/public/js/dist/app.js"
                                   :optimizations :advanced
                                   :closure-defines {goog.DEBUG false}
                                   :foreign-libs [{:file "libs/flow/build/tvs-flow.js"
                                                   :provides ["libs.flow"]}]
                                   :externs ["libs/flow/externs/tvs-flow-externs.js"
                                             "resources/externs/main.js"]
                                   :pretty-print true}}]}
  :repl-options {:port 8999
                 :init (do
                         (use 'figwheel-sidecar.repl-api)
                         (start-figwheel!))})

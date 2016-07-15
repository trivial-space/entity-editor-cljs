(defproject flow-editor "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.89"]
                 [reagent "0.6.0-rc" :exclusions [cljsjs/react
                                                  cljsjs/react-dom
                                                  cljsjs/react-dom-server]]
                 [re-frame "0.7.0"]
                 [re-com "0.8.3"]]

  :min-lein-version "2.5.3"

  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.3-2"]
            [lein-doo "0.1.6"]]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"
                                    "resources/public/css/compiled"]

  :figwheel {:css-dirs ["resources/public/css"]
             :server-port 8080}

  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src/cljs"]
                        :figwheel {:on-jsload "flow-editor.core/mount-root"}
                        :compiler {:main flow-editor.core
                                   :foreign-libs
                                    [{:file "resources/jslibs/javascript-hint.js"
                                      :provides ["custom-codemirror.javascript-hint"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]}
                                     {:file "resources/jslibs/dependencies.dev.js"
                                      :provides ["libs.dependencies"]}]
                                   :output-to "resources/public/js/compiled/app.js"
                                   :output-dir "resources/public/js/compiled/out"
                                   :asset-path "/js/compiled/out"
                                   :source-map-timestamp true}}

                       {:id "test"
                        :source-paths ["src/cljs" "test/cljs"]
                        :compiler {:output-to "resources/public/js/compiled/test.js"
                                   :foreign-libs
                                    [{:file "resources/jslibs/javascript-hint.js"
                                      :provides ["custom-codemirror.javascript-hint"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]}
                                     {:file "resources/jslibs/dependencies.dev.js"
                                      :provides ["libs.dependencies"]}]
                                   :main flow-editor.runner
                                   :optimizations :none}}

                       {:id "min"
                        :source-paths ["src/cljs"]
                        :compiler {:main flow-editor.core
                                   :output-to "resources/public/js/dist/app.js"
                                   :foreign-libs
                                    [{:file "resources/jslibs/javascript-hint.js"
                                      :provides ["custom-codemirror.javascript-hint"]
                                      :requires ["libs.dependencies"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]
                                      :requires ["libs.dependencies"]}
                                     {:file "resources/jslibs/dependencies.js"
                                      :provides ["libs.dependencies"]}]
                                   :optimizations :advanced
                                   :closure-defines {goog.DEBUG false}
                                   :externs ["resources/externs/tvs-flow-externs.js"
                                             "resources/externs/main.js"
                                             "resources/externs/codemirror.ext.js"
                                             "resources/externs/vis.ext.js"
                                             "resources/externs/react.ext.js"
                                             "resources/externs/react-dom.ext.js"
                                             "resources/externs/react-dom-server.ext.js"]
                                   :pretty-print true}}]}
  :repl-options {:port 8999})

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
                                      :provides ["custom-codemirror.javascript-hint"]
                                      :requires ["cljsjs.codemirror"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]
                                      :requires ["cljsjs.codemirror"]}]
                                   :output-to "resources/public/js/compiled/app.js"
                                   :output-dir "resources/public/js/compiled/out"
                                   :asset-path "/js/compiled/out"
                                   :source-map-timestamp true}}

                       {:id "test"
                        :source-paths ["src/cljs" "test/cljs"]
                        :compiler {:output-to "resources/public/js/compiled/test.js"
                                   :foreign-libs
                                    [{:file "resources/jslibs/javascript-hint.js"
                                      :provides ["custom-codemirror.javascript-hint"]
                                      :requires ["cljsjs.codemirror"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]
                                      :requires ["cljsjs.codemirror"]}]
                                   :main flow-editor.runner
                                   :optimizations :none}}

                       {:id "min"
                        :source-paths ["src/cljs"]
                        :compiler {:main flow-editor.core
                                   :output-to "resources/public/js/dist/app.js"
                                   :foreign-libs
                                    [{:file "resources/jslibs/javascript-hint.js"
                                      :provides ["custom-codemirror.javascript-hint"]
                                      :requires ["cljsjs.codemirror"]}
                                     {:file "resources/jslibs/clike-glsl.js"
                                      :provides ["custom-codemirror.modes.clike-glsl"]
                                      :requires ["cljsjs.codemirror"]}]
                                   :optimizations :advanced
                                   :closure-defines {goog.DEBUG false}
                                   :externs ["resources/externs/tvs-flow-externs.js"
                                             "resources/externs/main.js"]
                                   :pretty-print true}}]}
  :repl-options {:port 8999})

export const graph =
{
    "entities": {
        "tick": {
            "id": "tick",
            "value": null,
            "meta": {
                "ui": {
                    "x": -369,
                    "y": 740
                }
            }
        },
        "camera-settings": {
            "id": "camera-settings",
            "value": {
                "fovy": 1.05,
                "near": 0.1,
                "far": 1000,
                "aspect": 1.6
            },
            "meta": {
                "ui": {
                    "y": -543,
                    "x": 2
                }
            }
        },
        "canvas": {
            "id": "canvas",
            "value": null,
            "meta": {
                "ui": {
                    "y": -109,
                    "x": 595
                }
            }
        },
        "rotation-speed": {
            "id": "rotation-speed",
            "value": 0.02,
            "meta": {
                "ui": {
                    "x": -488.84908417641043,
                    "y": -305.44571846361754
                }
            }
        },
        "plane-position": {
            "id": "plane-position",
            "value": [
                0,
                0,
                -15
            ],
            "meta": {
                "ui": {
                    "y": -545,
                    "x": -269
                }
            }
        },
        "plane-geometry": {
            "id": "plane-geometry",
            "value": null,
            "meta": {
                "ui": {
                    "y": 243,
                    "x": -150
                }
            }
        },
        "render-context": {
            "id": "render-context",
            "value": null,
            "meta": {
                "ui": {
                    "y": 244,
                    "x": 265
                }
            }
        },
        "plane-transform": {
            "id": "plane-transform",
            "value": null,
            "meta": {
                "ui": {
                    "y": -280,
                    "x": -266
                }
            }
        },
        "canvas-size": {
            "id": "canvas-size",
            "value": {
                "width": 800,
                "height": 500
            },
            "meta": {
                "ui": {
                    "y": -494,
                    "x": 490
                }
            }
        },
        "camera": {
            "id": "camera",
            "value": null,
            "meta": {
                "ui": {
                    "y": -287,
                    "x": 4
                }
            }
        },
        "main-layer": {
            "id": "main-layer",
            "value": {
                "objects": [
                    "plane-object"
                ]
            },
            "meta": {
                "ui": {
                    "y": 415,
                    "x": -124
                }
            }
        },
        "plane-object": {
            "id": "plane-object",
            "value": {
                "geometry": "plane-geometry",
                "shader": "plane-shader",
                "uniforms": {
                    "transform": {
                        "0": 0.6206568479537964,
                        "1": 0.23171186447143555,
                        "2": -0.7490600347518921,
                        "3": 0,
                        "4": 0,
                        "5": 0.9553365111351013,
                        "6": 0.29552021622657776,
                        "7": 0,
                        "8": 0.7840854525566101,
                        "9": -0.18341660499572754,
                        "10": 0.5929291844367981,
                        "11": 0,
                        "12": 0,
                        "13": 0,
                        "14": -15,
                        "15": 1
                    },
                    "camera": {
                        "0": 1.0790371894836426,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                        "5": 1.7264595031738281,
                        "6": 0,
                        "7": 0,
                        "8": 0,
                        "9": 0,
                        "10": -1.0002000331878662,
                        "11": -1,
                        "12": 0,
                        "13": 0,
                        "14": -0.20002000033855438,
                        "15": 0
                    }
                }
            },
            "meta": {
                "ui": {
                    "y": 37,
                    "x": -131
                }
            }
        },
        "plane-shader": {
            "id": "plane-shader",
            "value": {
                "vert": "uniform mat4 camera; uniform mat4 transform; attribute vec3 position; void main() { gl_Position = (camera * transform) * vec4(position, 1.0); }",
                "frag": "void main() { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }",
                "attribs": {
                    "position": "f 3"
                },
                "uniforms": {
                    "transform": "m 4",
                    "camera": "m 4"
                }
            },
            "meta": {
                "ui": {
                    "y": 34,
                    "x": 108
                }
            }
        }
    },
    "processes": {
        "set-canvas-size": {
            "id": "set-canvas-size",
            "ports": {
                "canvas": "accumulator",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tvar canvas = ports.canvas,\n\t\t\twidth = ports.size.width,\n\t\t\theight = ports.size.height\n\t\n\tcanvas.style.width = width + \"px\"\n\tcanvas.style.height = height + \"px\"\n\tsend(canvas)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -306,
                    "x": 597
                }
            }
        },
        "update-plane": {
            "id": "update-plane",
            "ports": {
                "plane": "accumulator",
                "camera": "hot",
                "transform": "hot"
            },
            "code": "function(ports, send) {\n\tvar plane = ports.plane\n\t\n\tplane.uniforms.transform = ports.transform\n\tplane.uniforms.camera = ports.camera\n\t\n\tsend(plane)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -103,
                    "x": -133
                }
            }
        },
        "animate": {
            "id": "animate",
            "ports": {},
            "code": "function(ports, send) {\n\tvar runing = true\n\t\n\tfunction tick() {\n\t\tsend();\n\t\tif (runing) {\n\t\t\trequestAnimationFrame(tick)\n\t\t}\n\t}\n\t\n\tsetTimeout(tick, 200)\n\t\n\treturn function() {\n\t\truning = false\n\t}\n}\n",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": -195,
                    "y": 742
                }
            }
        },
        "update-camera-settings": {
            "id": "update-camera-settings",
            "ports": {
                "settings": "accumulator",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tvar settings = ports.settings\n\t\n\tsettings.aspect = ports.size.width / ports.size.height\n\t\n\tsend(settings);\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -493,
                    "x": 253
                }
            }
        },
        "render": {
            "id": "render",
            "ports": {
                "ctx": "cold",
                "tick": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.renderLayers(ports.ctx, [\"main-layer\"])\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": 344,
                    "x": 569
                }
            }
        },
        "create-plane-geometry": {
            "id": "create-plane-geometry",
            "ports": {},
            "code": "function(ports, send) {\n\tvar g = this.geometries.plane(10, 10)\n\t//g.drawType = \"LINE_LOOP\"\n \tsend(g)\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "y": 135,
                    "x": -239
                }
            }
        },
        "update-renderer-size": {
            "id": "update-renderer-size",
            "ports": {
                "ctx": "hot",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateSize(ports.ctx, ports.size.width, ports.size.height)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -119,
                    "x": 354
                }
            }
        },
        "create-plane-matrix": {
            "id": "create-plane-matrix",
            "ports": {
                "pos": "hot"
            },
            "code": "function(ports, send) {\n\tvar m = this.mat4.create()\n\tthis.mat4.fromTranslation(m, ports.pos)\n\tthis.mat4.rotateX(m, m, 0.3)\n\tthis.mat4.rotateY(m, m, 0.2)\n\tsend(m)\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "y": -398,
                    "x": -268
                }
            }
        },
        "update-context": {
            "id": "update-context",
            "ports": {
                "ctx": "accumulator",
                "plane_geometry": "hot",
                "plane_object": "cold",
                "plane_shader": "hot",
                "main_layer": "hot"
            },
            "code": "function(ports, send) {\n\tvar ctx = ports.ctx\n\t\n\tthis.renderer.updateGeometry(ctx, \"plane-geometry\", ports.plane_geometry)\n\tthis.renderer.updateObject(ctx, \"plane-object\", ports.plane_object)\n\tthis.renderer.updateShader(ctx, \"plane-shader\", ports.plane_shader)\n\tthis.renderer.updateLayer(ctx, \"main-layer\", ports.main_layer)\n\n\tsend(ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": 245,
                    "x": 102
                }
            }
        },
        "create-render-context": {
            "id": "create-render-context",
            "ports": {},
            "code": "function(ports, send) {\n\tsend(this.renderer.create())\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "y": 370,
                    "x": 264
                }
            }
        },
        "update-rotation": {
            "id": "update-rotation",
            "ports": {
                "speed": "hot",
                "mat": "accumulator",
                "tick": "hot"
            },
            "code": "function(ports, send) {\n\tthis.mat4.rotateY(ports.mat, ports.mat, ports.speed)\n\tsend(ports.mat)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": -392.79347826086956,
                    "y": -160.86253396739136
                }
            }
        },
        "attach-canvas": {
            "id": "attach-canvas",
            "ports": {
                "render_ctx": "hot"
            },
            "code": "function(ports, send) {\n\t\n\tvar canvas = ports.render_ctx.gl.canvas\n\tcanvas.style.border = \"1px solid gray\"\n\t\n\tdocument.body.appendChild(canvas)\n\t\n\tsend(canvas)\n\t\n\treturn function() {\n\t\tdocument.body.removeChild(canvas)\n\t}\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": 53,
                    "x": 560
                }
            }
        },
        "create-camera": {
            "id": "create-camera",
            "ports": {
                "settings": "hot"
            },
            "code": "function(ports, send) {\n\tvar m = this.mat4.create(),\n\t\t\tconf = ports.settings\n\t\n\tthis.mat4.perspective(m, conf.fovy, conf.aspect, conf.near, conf.far)\n\t\n\tsend(m)\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "y": -400,
                    "x": 0
                }
            }
        }
    },
    "arcs": {
        "attach-canvas->canvas": {
            "id": "attach-canvas->canvas",
            "entity": "canvas",
            "process": "attach-canvas",
            "port": null,
            "meta": {}
        },
        "canvas-size->set-canvas-size::size": {
            "id": "canvas-size->set-canvas-size::size",
            "entity": "canvas-size",
            "process": "set-canvas-size",
            "port": "size",
            "meta": {}
        },
        "camera->update-plane::camera": {
            "id": "camera->update-plane::camera",
            "entity": "camera",
            "process": "update-plane",
            "port": "camera",
            "meta": {}
        },
        "plane-transform->update-plane::transform": {
            "id": "plane-transform->update-plane::transform",
            "entity": "plane-transform",
            "process": "update-plane",
            "port": "transform",
            "meta": {}
        },
        "update-camera-settings->camera-settings": {
            "id": "update-camera-settings->camera-settings",
            "entity": "camera-settings",
            "process": "update-camera-settings",
            "port": null,
            "meta": {}
        },
        "create-render-context->render-context": {
            "id": "create-render-context->render-context",
            "entity": "render-context",
            "process": "create-render-context",
            "port": null,
            "meta": {}
        },
        "plane-object->update-context::plane_object": {
            "id": "plane-object->update-context::plane_object",
            "entity": "plane-object",
            "process": "update-context",
            "port": "plane_object",
            "meta": {}
        },
        "plane-position->create-plane-matrix::pos": {
            "id": "plane-position->create-plane-matrix::pos",
            "entity": "plane-position",
            "process": "create-plane-matrix",
            "port": "pos",
            "meta": {}
        },
        "update-rotation->plane-transform": {
            "id": "update-rotation->plane-transform",
            "entity": "plane-transform",
            "process": "update-rotation",
            "port": null,
            "meta": {}
        },
        "update-plane->plane-object": {
            "id": "update-plane->plane-object",
            "entity": "plane-object",
            "process": "update-plane",
            "port": null,
            "meta": {}
        },
        "tick->render::tick": {
            "id": "tick->render::tick",
            "entity": "tick",
            "process": "render",
            "port": "tick",
            "meta": {}
        },
        "create-camera->camera": {
            "id": "create-camera->camera",
            "entity": "camera",
            "process": "create-camera",
            "port": null,
            "meta": {}
        },
        "render-context->attach-canvas::render_ctx": {
            "id": "render-context->attach-canvas::render_ctx",
            "entity": "render-context",
            "process": "attach-canvas",
            "port": "render_ctx",
            "meta": {}
        },
        "render-context->render::ctx": {
            "id": "render-context->render::ctx",
            "entity": "render-context",
            "process": "render",
            "port": "ctx",
            "meta": {}
        },
        "main-layer->update-context::main_layer": {
            "id": "main-layer->update-context::main_layer",
            "entity": "main-layer",
            "process": "update-context",
            "port": "main_layer",
            "meta": {}
        },
        "plane-geometry->update-context::plane_geometry": {
            "id": "plane-geometry->update-context::plane_geometry",
            "entity": "plane-geometry",
            "process": "update-context",
            "port": "plane_geometry",
            "meta": {}
        },
        "update-context->render-context": {
            "id": "update-context->render-context",
            "entity": "render-context",
            "process": "update-context",
            "port": null,
            "meta": {}
        },
        "canvas-size->update-camera-settings::size": {
            "id": "canvas-size->update-camera-settings::size",
            "entity": "canvas-size",
            "process": "update-camera-settings",
            "port": "size",
            "meta": {}
        },
        "tick->update-rotation::tick": {
            "id": "tick->update-rotation::tick",
            "entity": "tick",
            "process": "update-rotation",
            "port": "tick",
            "meta": {}
        },
        "set-canvas-size->canvas": {
            "id": "set-canvas-size->canvas",
            "entity": "canvas",
            "process": "set-canvas-size",
            "port": null,
            "meta": {}
        },
        "create-plane-matrix->plane-transform": {
            "id": "create-plane-matrix->plane-transform",
            "entity": "plane-transform",
            "process": "create-plane-matrix",
            "port": null,
            "meta": {}
        },
        "plane-shader->update-context::plane_shader": {
            "id": "plane-shader->update-context::plane_shader",
            "entity": "plane-shader",
            "process": "update-context",
            "port": "plane_shader",
            "meta": {}
        },
        "render-context->update-canvas-size::ctx": {
            "id": "render-context->update-canvas-size::ctx",
            "entity": "render-context",
            "process": "update-renderer-size",
            "port": "ctx",
            "meta": {}
        },
        "canvas-size->update-renderer-size::size": {
            "id": "canvas-size->update-renderer-size::size",
            "entity": "canvas-size",
            "process": "update-renderer-size",
            "port": "size",
            "meta": {}
        },
        "animate->tick": {
            "id": "animate->tick",
            "entity": "tick",
            "process": "animate",
            "port": null,
            "meta": {}
        },
        "create-plane-geometry->plane-geometry": {
            "id": "create-plane-geometry->plane-geometry",
            "entity": "plane-geometry",
            "process": "create-plane-geometry",
            "port": null,
            "meta": {}
        },
        "camera-settings->create-camera::settings": {
            "id": "camera-settings->create-camera::settings",
            "entity": "camera-settings",
            "process": "create-camera",
            "port": "settings",
            "meta": {}
        },
        "rotation-speed->update-rotation::speed": {
            "id": "rotation-speed->update-rotation::speed",
            "entity": "rotation-speed",
            "process": "update-rotation",
            "port": "speed",
            "meta": {}
        }
    },
    "meta": {
        "ui": {
            "layout": []
        }
    }
}

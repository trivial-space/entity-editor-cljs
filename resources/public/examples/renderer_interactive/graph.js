export const graph =
{
    "entities": {
        "new-particle-pos": {
            "id": "new-particle-pos",
            "value": null,
            "meta": {
                "ui": {
                    "x": -283,
                    "y": 557
                }
            }
        },
        "ages": {
            "id": "ages",
            "value": null,
            "meta": {
                "ui": {
                    "x": 320,
                    "y": 412
                }
            }
        },
        "transform": {
            "id": "transform",
            "value": null,
            "meta": {
                "ui": {
                    "x": 729,
                    "y": -188
                }
            }
        },
        "time": {
            "id": "time",
            "value": null,
            "meta": {
                "ui": {
                    "x": 858,
                    "y": 345
                }
            }
        },
        "mouse-position": {
            "id": "mouse-position",
            "value": null,
            "meta": {
                "ui": {
                    "x": -296,
                    "y": 211
                }
            }
        },
        "geometry": {
            "id": "geometry",
            "value": null,
            "meta": {
                "ui": {
                    "x": 214,
                    "y": 194
                }
            }
        },
        "canvas": {
            "id": "canvas",
            "value": null,
            "meta": {
                "ui": {
                    "y": -190,
                    "x": -140
                }
            }
        },
        "particle-count": {
            "id": "particle-count",
            "value": 200,
            "meta": {
                "ui": {
                    "x": 213,
                    "y": 676
                }
            }
        },
        "render-context": {
            "id": "render-context",
            "value": null,
            "meta": {
                "ui": {
                    "y": -67,
                    "x": 236
                }
            }
        },
        "particle-index": {
            "id": "particle-index",
            "value": 0,
            "meta": {
                "ui": {
                    "x": 228,
                    "y": 956
                }
            }
        },
        "canvas-size": {
            "id": "canvas-size",
            "value": {
                "width": 800,
                "height": 600
            },
            "meta": {
                "ui": {
                    "y": -501,
                    "x": 54
                }
            }
        },
        "projection-settings": {
            "id": "projection-settings",
            "value": {
                "fovy": 1.05,
                "near": 0.1,
                "far": 1000,
                "aspect": 1.6
            },
            "meta": {
                "ui": {
                    "y": -377,
                    "x": 381
                }
            }
        },
        "main-layer": {
            "id": "main-layer",
            "value": {
                "objects": [
                    "object"
                ]
            },
            "meta": {
                "ui": {
                    "y": 61,
                    "x": -137
                }
            }
        },
        "starttime": {
            "id": "starttime",
            "value": null,
            "meta": {
                "ui": {
                    "x": 726,
                    "y": 525
                }
            }
        },
        "particles": {
            "id": "particles",
            "value": null,
            "meta": {
                "ui": {
                    "x": 103,
                    "y": 414
                }
            }
        },
        "object": {
            "id": "object",
            "value": {
                "geometry": "geometry",
                "shader": "shader",
                "uniforms": {}
            },
            "meta": {
                "ui": {
                    "x": 478,
                    "y": -60
                }
            }
        },
        "shader": {
            "id": "shader",
            "value": {
                "vert": "uniform mat4 projection; uniform int time; attribute vec3 position; attribute int age; void main() { gl_Position = projection * vec4(position.xy, (time - age) / -100.0, 1.0); gl_PointSize = min(0, 40 - ((time - age) / 100);}",
                "frag": "void main() { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }",
                "attribs": {
                    "position": "f 3",
                    "age": "f"
                },
                "uniforms": {
                    "projection": "m 4",
                    "time": "f"
                }
            },
            "meta": {
                "ui": {
                    "y": -64,
                    "x": -134
                }
            }
        },
        "projection": {
            "id": "projection",
            "value": null,
            "meta": {
                "ui": {
                    "y": -265,
                    "x": 553
                }
            }
        },
        "mouse-dragging": {
            "id": "mouse-dragging",
            "value": null,
            "meta": {
                "ui": {
                    "x": -457,
                    "y": 205
                }
            }
        }
    },
    "processes": {
        "update-layer": {
            "id": "update-layer",
            "ports": {
                "ctx": "accumulator",
                "layer": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateLayer(ports.ctx, \"main-layer\", ports.layer)\n\tsend(ports.ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 79,
                    "y": 57
                }
            }
        },
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
                    "y": -314,
                    "x": 24
                }
            }
        },
        "update-object": {
            "id": "update-object",
            "ports": {
                "ctx": "accumulator",
                "obj": "cold"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateObject(ports.ctx, 'object', ports.obj)\n\tsend(ports.ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 346.24983277591974,
                    "y": -62.65784385451504
                }
            }
        },
        "update-shader": {
            "id": "update-shader",
            "ports": {
                "ctx": "accumulator",
                "shader": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateShader(ports.ctx, \"shader\", ports.shader)\n\tsend(ports.ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 82,
                    "y": -65
                }
            }
        },
        "create-p-ages": {
            "id": "create-p-ages",
            "ports": {
                "count": "cold"
            },
            "code": "function(ports, send) {\n\tsend(new Uint32Array(ports.count))\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": 312,
                    "y": 509
                }
            }
        },
        "update-geometry": {
            "id": "update-geometry",
            "ports": {
                "ctx": "accumulator",
                "geometry": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateGeometry(ports.ctx, 'geometry', ports.geometry)\n\tthis.send(ports.ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 233,
                    "y": 51
                }
            }
        },
        "animate": {
            "id": "animate",
            "ports": {
                "starttime": "hot"
            },
            "code": "function(ports, send) {\n\tvar runing = true\n\t\n\tfunction tick() {\n\t\tsend(Date.now() - ports.starttime);\n\t\tif (runing) {\n\t\t\trequestAnimationFrame(tick)\n\t\t}\n\t}\n\t\n\tsetTimeout(tick, 200)\n\t\n\treturn function() {\n\t\truning = false\n\t}\n}\n",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 854,
                    "y": 456
                }
            }
        },
        "manipulate-object": {
            "id": "manipulate-object",
            "ports": {
                "projection": "hot",
                "time": "hot",
                "obj": "accumulator"
            },
            "code": "function(ports, send) {\n\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 644,
                    "y": -60
                }
            }
        },
        "canvas-mouse-press": {
            "id": "canvas-mouse-press",
            "ports": {
                "canvas": "hot"
            },
            "code": "function(ports, send) {\n\t\n\tfunction listenerDown(e) {\n\t\tsend(true)\n\t}\n\t\n\tfunction listenerUp(e) {\n\t\tsend(false)\n\t}\n\t\n\tfunction context(e) {\n\t\te.preventDefault()\n\t}\n\t\n\tports.canvas.addEventListener('mousedown', listenerDown)\n\tports.canvas.addEventListener('mouseup', listenerUp)\n\tports.canvas.addEventListener('contextmenu', context)\n\t\n\treturn function() {\n\t\tports.canvas.removeEventListener('mousedown', listenerDown)\n\t\tports.canvas.removeEventListener('mouseup', listenerUp)\n\t\tports.canvas.removeEventListener('contextmenu', context)\n\t}\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": -462,
                    "y": 93
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
        "count-events": {
            "id": "count-events",
            "ports": {
                "pos": "hot",
                "dragging": "hot"
            },
            "code": "function(ports, send) {\n\tif (ports.dragging) {\n\t\tsend(ports.pos)\n\t}\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": -376,
                    "y": 452
                }
            }
        },
        "create-projection": {
            "id": "create-projection",
            "ports": {
                "settings": "hot"
            },
            "code": "function(ports, send) {\n\tvar m = this.mat4.create(),\n\t\t\tconf = ports.settings\n\t\n\tthis.mat4.perspective(m, conf.fovy, conf.aspect, conf.near, conf.far)\n\t\n\tsend(m)\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "y": -379,
                    "x": 551
                }
            }
        },
        "createParticles": {
            "id": "createParticles",
            "ports": {
                "count": "hot"
            },
            "code": "function(ports, send) {\n\tsend(new Float32Array(ports.count * 3))\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": 101,
                    "y": 513
                }
            }
        },
        "canvas-mouse-move": {
            "id": "canvas-mouse-move",
            "ports": {
                "canvas": "hot"
            },
            "code": "function(ports, send) {\n\t\n\tfunction listener(e) {\n\t\tvar box = ports.canvas.getBoundingClientRect()\n\t\tsend({\n\t\t\tx: e.clientX - box.left,\n\t\t\ty: e.clientY - box.top\n\t\t})\n\t}\n\t\n\tports.canvas.addEventListener('mousemove', listener)\n\t\n\treturn function() {\n\t\tports.canvas.removeEventListener('mousemove', listener)\n\t}\n}\n",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": -296,
                    "y": 83
                }
            }
        },
        "get-particle-index": {
            "id": "get-particle-index",
            "ports": {
                "pos": "hot",
                "count": "hot",
                "i": "accumulator"
            },
            "code": "function(ports, send) {\n\tsend((ports.i + 1) % ports.count)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 221,
                    "y": 820
                }
            }
        },
        "update-renderer-size": {
            "id": "update-renderer-size",
            "ports": {
                "ctx": "accumulator",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateSize(ports.ctx, ports.size.width, ports.size.height)\n\tsend(ports.ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -192,
                    "x": 236
                }
            }
        },
        "get-starttime": {
            "id": "get-starttime",
            "ports": {},
            "code": "function(ports, send) {\n\tsend(Date.now())\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": 726,
                    "y": 650
                }
            }
        },
        "update-age": {
            "id": "update-age",
            "ports": {
                "i": "hot",
                "ages": "accumulator",
                "starttime": "cold"
            },
            "code": "function(ports, send) {\n\tports.ages[ports.i] = Date.now() - ports.starttime\n\tsend(ports.ages)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 425,
                    "y": 414
                }
            }
        },
        "create-geometry": {
            "id": "create-geometry",
            "ports": {
                "positions": "hot",
                "ages": "hot",
                "count": "hot"
            },
            "code": "function(ports, send) {\n\tsend({\n\t\tattribs: {\n\t\t\tposition: {\n\t\t\t\tbuffer: ports.positions,\n\t\t\t\tstoreType: \"DYNAMIC\"\n\t\t\t},\n\t\t\tage: {\n\t\t\t\tbuffer: ports.ages,\n\t\t\t\tstoreType: \"DYNAMIC\"\n\t\t\t}\n\t\t},\n\t\titemCount: ports.count,\n\t\tdrawType: \"POINTS\"\n\t})\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 213,
                    "y": 291
                }
            }
        },
        "create-transform": {
            "id": "create-transform",
            "ports": {},
            "code": "function(ports, send) {\n  send(this.mat4.create())\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": 826,
                    "y": -193
                }
            }
        },
        "update-projection-settings": {
            "id": "update-projection-settings",
            "ports": {
                "settings": "accumulator",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tvar settings = ports.settings\n\t\n\tsettings.aspect = ports.size.width / ports.size.height\n\t\n\tsend(settings);\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -503,
                    "x": 381
                }
            }
        },
        "create-render-context": {
            "id": "create-render-context",
            "ports": {
                "canvas": "hot",
                "obj": "cold"
            },
            "code": "function(ports, send) {\n\tvar ctx = this.renderer.create(ports.canvas)\n\tthis.renderer.updateObject(ctx, 'object', ports.obj)\n\tsend(ctx)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "y": -189,
                    "x": 86
                }
            }
        },
        "update-particle-position": {
            "id": "update-particle-position",
            "ports": {
                "i": "hot",
                "pos": "cold",
                "particles": "accumulator"
            },
            "code": "function(ports, send) {\n\tvar i = ports.i * 3\n\tports.particles[i] = ports.pos.x\n\tports.particles[i + 1] = ports.pos.y\n\tsend(ports.particles)\n}",
            "autostart": null,
            "meta": {
                "ui": {
                    "x": -24,
                    "y": 419
                }
            }
        },
        "get-canvas": {
            "id": "get-canvas",
            "ports": {},
            "code": "function(ports, send) {\n\tsend(document.getElementById('canvas'))\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": -139,
                    "y": -310
                }
            }
        }
    },
    "arcs": {
        "update-age->ages": {
            "id": "update-age->ages",
            "entity": "ages",
            "process": "update-age",
            "port": null,
            "meta": {}
        },
        "particle-count->createParticles::count": {
            "id": "particle-count->createParticles::count",
            "entity": "particle-count",
            "process": "createParticles",
            "port": "count",
            "meta": {}
        },
        "projection->update-object::projection": {
            "id": "projection->update-object::projection",
            "entity": "projection",
            "process": "manipulate-object",
            "port": "projection",
            "meta": {}
        },
        "canvas-size->set-canvas-size::size": {
            "id": "canvas-size->set-canvas-size::size",
            "entity": "canvas-size",
            "process": "set-canvas-size",
            "port": "size",
            "meta": {}
        },
        "update-renderer-size->render-context": {
            "id": "update-renderer-size->render-context",
            "entity": "render-context",
            "process": "update-renderer-size",
            "port": null,
            "meta": {}
        },
        "ages->create-geometry::ages": {
            "id": "ages->create-geometry::ages",
            "entity": "ages",
            "process": "create-geometry",
            "port": "ages",
            "meta": {}
        },
        "get-starttime->starttime": {
            "id": "get-starttime->starttime",
            "entity": "starttime",
            "process": "get-starttime",
            "port": null,
            "meta": {}
        },
        "update-camera-settings->camera-settings": {
            "id": "update-camera-settings->camera-settings",
            "entity": "projection-settings",
            "process": "update-projection-settings",
            "port": null,
            "meta": {}
        },
        "count-events->new-particle-pos": {
            "id": "count-events->new-particle-pos",
            "entity": "new-particle-pos",
            "process": "count-events",
            "port": null,
            "meta": {}
        },
        "create-transform->transform": {
            "id": "create-transform->transform",
            "entity": "transform",
            "process": "create-transform",
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
        "new-particle-pos->get-particle-index::pos": {
            "id": "new-particle-pos->get-particle-index::pos",
            "entity": "new-particle-pos",
            "process": "get-particle-index",
            "port": "pos",
            "meta": {}
        },
        "particle-count->create-p-ages::count": {
            "id": "particle-count->create-p-ages::count",
            "entity": "particle-count",
            "process": "create-p-ages",
            "port": "count",
            "meta": {}
        },
        "canvas-mouse-press->mouse-dragging": {
            "id": "canvas-mouse-press->mouse-dragging",
            "entity": "mouse-dragging",
            "process": "canvas-mouse-press",
            "port": null,
            "meta": {}
        },
        "time->update-object::time": {
            "id": "time->update-object::time",
            "entity": "time",
            "process": "manipulate-object",
            "port": "time",
            "meta": {}
        },
        "particles->create-geometry::positions": {
            "id": "particles->create-geometry::positions",
            "entity": "particles",
            "process": "create-geometry",
            "port": "positions",
            "meta": {}
        },
        "canvas-mouse-move->mouse-position": {
            "id": "canvas-mouse-move->mouse-position",
            "entity": "mouse-position",
            "process": "canvas-mouse-move",
            "port": null,
            "meta": {}
        },
        "object->update-object::obj": {
            "id": "object->update-object::obj",
            "entity": "object",
            "process": "update-object",
            "port": "obj",
            "meta": {}
        },
        "update-particle-position->particles": {
            "id": "update-particle-position->particles",
            "entity": "particles",
            "process": "update-particle-position",
            "port": null,
            "meta": {}
        },
        "mouse-dragging->count-events::dragging": {
            "id": "mouse-dragging->count-events::dragging",
            "entity": "mouse-dragging",
            "process": "count-events",
            "port": "dragging",
            "meta": {}
        },
        "create-p-ages->ages": {
            "id": "create-p-ages->ages",
            "entity": "ages",
            "process": "create-p-ages",
            "port": null,
            "meta": {}
        },
        "mouse-position->count-events::pos": {
            "id": "mouse-position->count-events::pos",
            "entity": "mouse-position",
            "process": "count-events",
            "port": "pos",
            "meta": {}
        },
        "createParticles->particles": {
            "id": "createParticles->particles",
            "entity": "particles",
            "process": "createParticles",
            "port": null,
            "meta": {}
        },
        "tick->render::tick": {
            "id": "tick->render::tick",
            "entity": "time",
            "process": "render",
            "port": "tick",
            "meta": {}
        },
        "create-camera->camera": {
            "id": "create-camera->camera",
            "entity": "projection",
            "process": "create-projection",
            "port": null,
            "meta": {}
        },
        "get-particle-index->particle-index": {
            "id": "get-particle-index->particle-index",
            "entity": "particle-index",
            "process": "get-particle-index",
            "port": null,
            "meta": {}
        },
        "render-context->render::ctx": {
            "id": "render-context->render::ctx",
            "entity": "render-context",
            "process": "render",
            "port": "ctx",
            "meta": {}
        },
        "particle-count->create-geometry::count": {
            "id": "particle-count->create-geometry::count",
            "entity": "particle-count",
            "process": "create-geometry",
            "port": "count",
            "meta": {}
        },
        "shader->update-shader::shader": {
            "id": "shader->update-shader::shader",
            "entity": "shader",
            "process": "update-shader",
            "port": "shader",
            "meta": {}
        },
        "particle-index->update-age::i": {
            "id": "particle-index->update-age::i",
            "entity": "particle-index",
            "process": "update-age",
            "port": "i",
            "meta": {}
        },
        "object->create-render-context::obj": {
            "id": "object->create-render-context::obj",
            "entity": "object",
            "process": "create-render-context",
            "port": "obj",
            "meta": {}
        },
        "update-object->object": {
            "id": "update-object->object",
            "entity": "object",
            "process": "manipulate-object",
            "port": null,
            "meta": {}
        },
        "main-layer->update-context::main_layer": {
            "id": "main-layer->update-context::main_layer",
            "entity": "main-layer",
            "process": "update-context",
            "port": "main_layer",
            "meta": {}
        },
        "update-context->render-context": {
            "id": "update-context->render-context",
            "entity": "render-context",
            "process": "update-context",
            "port": null,
            "meta": {}
        },
        "update-object->render-context": {
            "id": "update-object->render-context",
            "entity": "render-context",
            "process": "update-object",
            "port": null,
            "meta": {}
        },
        "canvas-size->update-camera-settings::size": {
            "id": "canvas-size->update-camera-settings::size",
            "entity": "canvas-size",
            "process": "update-projection-settings",
            "port": "size",
            "meta": {}
        },
        "geometry->update-geometry::geometry": {
            "id": "geometry->update-geometry::geometry",
            "entity": "geometry",
            "process": "update-geometry",
            "port": "geometry",
            "meta": {}
        },
        "update-geometry->render-context": {
            "id": "update-geometry->render-context",
            "entity": "render-context",
            "process": "update-geometry",
            "port": null,
            "meta": {}
        },
        "update-shader->render-context": {
            "id": "update-shader->render-context",
            "entity": "render-context",
            "process": "update-shader",
            "port": null,
            "meta": {}
        },
        "starttime->animate::starttime": {
            "id": "starttime->animate::starttime",
            "entity": "starttime",
            "process": "animate",
            "port": "starttime",
            "meta": {}
        },
        "particle-index->update-particle-position::i": {
            "id": "particle-index->update-particle-position::i",
            "entity": "particle-index",
            "process": "update-particle-position",
            "port": "i",
            "meta": {}
        },
        "canvas->canvas-mouse-press::canvas": {
            "id": "canvas->canvas-mouse-press::canvas",
            "entity": "canvas",
            "process": "canvas-mouse-press",
            "port": "canvas",
            "meta": {}
        },
        "set-canvas-size->canvas": {
            "id": "set-canvas-size->canvas",
            "entity": "canvas",
            "process": "set-canvas-size",
            "port": null,
            "meta": {}
        },
        "get-canvas->canvas": {
            "id": "get-canvas->canvas",
            "entity": "canvas",
            "process": "get-canvas",
            "port": null,
            "meta": {}
        },
        "starttime->update-age::starttime": {
            "id": "starttime->update-age::starttime",
            "entity": "starttime",
            "process": "update-age",
            "port": "starttime",
            "meta": {}
        },
        "canvas->canvas-mouse-move::canvas": {
            "id": "canvas->canvas-mouse-move::canvas",
            "entity": "canvas",
            "process": "canvas-mouse-move",
            "port": "canvas",
            "meta": {}
        },
        "canvas-size->update-renderer-size::size": {
            "id": "canvas-size->update-renderer-size::size",
            "entity": "canvas-size",
            "process": "update-renderer-size",
            "port": "size",
            "meta": {}
        },
        "canvas->create-render-context::canvas": {
            "id": "canvas->create-render-context::canvas",
            "entity": "canvas",
            "process": "create-render-context",
            "port": "canvas",
            "meta": {}
        },
        "animate->tick": {
            "id": "animate->tick",
            "entity": "time",
            "process": "animate",
            "port": null,
            "meta": {}
        },
        "new-particle-pos->update-particle-position::pos": {
            "id": "new-particle-pos->update-particle-position::pos",
            "entity": "new-particle-pos",
            "process": "update-particle-position",
            "port": "pos",
            "meta": {}
        },
        "camera-settings->create-camera::settings": {
            "id": "camera-settings->create-camera::settings",
            "entity": "projection-settings",
            "process": "create-projection",
            "port": "settings",
            "meta": {}
        },
        "main-layer->update-layer::layer": {
            "id": "main-layer->update-layer::layer",
            "entity": "main-layer",
            "process": "update-layer",
            "port": "layer",
            "meta": {}
        },
        "particle-count->get-particle-index::count": {
            "id": "particle-count->get-particle-index::count",
            "entity": "particle-count",
            "process": "get-particle-index",
            "port": "count",
            "meta": {}
        },
        "create-geometry->geometry": {
            "id": "create-geometry->geometry",
            "entity": "geometry",
            "process": "create-geometry",
            "port": null,
            "meta": {}
        },
        "update-layer->render-context": {
            "id": "update-layer->render-context",
            "entity": "render-context",
            "process": "update-layer",
            "port": null,
            "meta": {}
        }
    },
    "meta": {
        "ui": {
            "layout": [
                {
                    "id": "geometry",
                    "type": "entity"
                },
                {
                    "id": "update-geometry",
                    "type": "process"
                },
                {
                    "id": "update-layer",
                    "type": "process"
                },
                {
                    "id": "update-object",
                    "type": "process"
                },
                {
                    "id": "create-render-context",
                    "type": "process"
                },
                {
                    "id": "main-layer",
                    "type": "entity"
                },
                {
                    "id": "render",
                    "type": "process"
                },
                {
                    "id": "time",
                    "type": "entity"
                },
                {
                    "id": "animate",
                    "type": "process"
                },
                {
                    "id": "starttime",
                    "type": "entity"
                },
                {
                    "id": "get-starttime",
                    "type": "process"
                },
                {
                    "id": "ages",
                    "type": "entity"
                },
                {
                    "id": "manipulate-object",
                    "type": "process"
                },
                {
                    "id": "object",
                    "type": "entity"
                },
                {
                    "id": "shader",
                    "type": "entity"
                },
                {
                    "id": "create-geometry",
                    "type": "process"
                },
                {
                    "id": "particle-index",
                    "type": "entity"
                },
                {
                    "id": "new-particle-pos",
                    "type": "entity"
                }
            ]
        }
    }
}

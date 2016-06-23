export const graph =
{
    "entities": {
        "new-particle-pos": {
            "id": "new-particle-pos",
            "value": {
                "x": 0,
                "y": 0
            },
            "meta": {
                "ui": {
                    "x": -174,
                    "y": 607
                }
            }
        },
        "ages": {
            "id": "ages",
            "meta": {
                "ui": {
                    "x": 320,
                    "y": 412
                }
            }
        },
        "fragment": {
            "id": "fragment",
            "value": "void main() { \n\tgl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n}",
            "meta": {
                "ui": {
                    "x": 584,
                    "y": -264
                }
            }
        },
        "time": {
            "id": "time",
            "meta": {
                "ui": {
                    "x": 446,
                    "y": 200
                }
            }
        },
        "mouse-position": {
            "id": "mouse-position",
            "meta": {
                "ui": {
                    "x": -315,
                    "y": 434
                }
            }
        },
        "geometry": {
            "id": "geometry",
            "meta": {
                "ui": {
                    "x": 212,
                    "y": 218
                }
            }
        },
        "canvas": {
            "id": "canvas",
            "meta": {
                "ui": {
                    "y": 105,
                    "x": -391
                }
            }
        },
        "vertex": {
            "id": "vertex",
            "value": "uniform mat4 projection; \nuniform float time;\nuniform vec2 size;\nattribute vec3 position;\nattribute float age; \n\nvoid main() { \n\t//gl_Position = projection * vec4(position.xy, (time - age) / -100.0, 1.0);\n\tgl_Position = vec4(\n\t\t(position.x / size.x) * 2.0 - 1.0, \n\t\t(position.y / -size.y) * 2.0 + 1.0,\n\t\t0.0, 1.0\n\t);\n\tgl_PointSize = 100.0 / pow(time - age + 1.0, 1.5);\n\t//gl_PointSize = max(5.0, 10.0 / (age + 1.0));\n\t//gl_PointSize = 20.0;\n}",
            "meta": {
                "ui": {
                    "y": -410,
                    "x": 419
                }
            }
        },
        "particle-count": {
            "id": "particle-count",
            "value": 500,
            "meta": {
                "ui": {
                    "x": 213,
                    "y": 676
                }
            }
        },
        "render-context": {
            "id": "render-context",
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
                    "y": 262,
                    "x": -28
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
                    "y": -69,
                    "x": 556
                }
            }
        },
        "starttime": {
            "id": "starttime",
            "meta": {
                "ui": {
                    "x": 643,
                    "y": 415
                }
            }
        },
        "particles": {
            "id": "particles",
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
                    "x": -74,
                    "y": -65
                }
            }
        },
        "mouse-dragging": {
            "id": "mouse-dragging",
            "meta": {
                "ui": {
                    "x": -479,
                    "y": 435
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
            "code": "function(ports) {\n\treturn this.renderer.updateLayer(ports.ctx, \"main-layer\", ports.layer)\n}",
            "meta": {
                "ui": {
                    "x": 393,
                    "y": -67
                }
            }
        },
        "set-canvas-size": {
            "id": "set-canvas-size",
            "ports": {
                "canvas": "accumulator",
                "size": "hot"
            },
            "code": "function(ports) {\n\tvar canvas = ports.canvas,\n\t\t\twidth = ports.size.width,\n\t\t\theight = ports.size.height\n\t\n\tcanvas.style.width = width + \"px\"\n\tcanvas.style.height = height + \"px\"\n\treturn canvas\n}",
            "meta": {
                "ui": {
                    "y": 186,
                    "x": -216
                }
            }
        },
        "update-object": {
            "id": "update-object",
            "ports": {
                "ctx": "accumulator",
                "obj": "cold"
            },
            "code": "function(ports) {\n\treturn this.renderer.updateObject(ports.ctx, 'object', ports.obj)\n}",
            "meta": {
                "ui": {
                    "x": 86,
                    "y": -68
                }
            }
        },
        "update-shader": {
            "id": "update-shader",
            "ports": {
                "ctx": "accumulator",
                "vertex": "hot",
                "fragment": "hot"
            },
            "code": "function(ports) {\n\tvar shader = {\n\t\tvert: ports.vertex,\n\t\tfrag: ports.fragment,\n\t\tattribs: {\n\t\t\tposition: \"f 2\",\n\t\t\tage: \"f\"\n\t\t},\n\t\tuniforms: {\n\t\t\ttime: \"f\",\n\t\t\tsize: \"f 2\"\n\t\t}\n\t}\n\t\t\n\treturn this.renderer.updateShader(ports.ctx, \"shader\", shader)\n}",
            "meta": {
                "ui": {
                    "x": 364,
                    "y": -178
                }
            }
        },
        "create-p-ages": {
            "id": "create-p-ages",
            "ports": {
                "count": "hot"
            },
            "code": "function(ports) {\n\treturn new Float32Array(ports.count)\n}",
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
            "code": "function(ports) {\n\treturn this.renderer.updateGeometry(ports.ctx, 'geometry', ports.geometry)\n}",
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
            "async": true,
            "meta": {
                "ui": {
                    "x": 640,
                    "y": 268
                }
            }
        },
        "manipulate-object": {
            "id": "manipulate-object",
            "ports": {
                "time": "hot",
                "obj": "accumulator",
                "size": "hot"
            },
            "code": "function(ports) {\n\tvar uniforms = ports.obj.uniforms\n\tuniforms.time = ports.time / 1000.0\n\tuniforms.size = [ports.size.width, ports.size.height]\n\treturn ports.obj\n}",
            "meta": {
                "ui": {
                    "x": -75,
                    "y": 66
                }
            }
        },
        "canvas-mouse-press": {
            "id": "canvas-mouse-press",
            "ports": {
                "canvas": "hot"
            },
            "code": "function(ports, send) {\n\tvar canvas = ports.canvas\n\t\n\tfunction listenerDown(e) {\n\t\tsend(true)\n\t}\n\t\n\tfunction listenerUp(e) {\n\t\tsend(false)\n\t}\n\t\n\tfunction context(e) {\n\t\te.preventDefault()\n\t}\n\t\n\tcanvas.addEventListener('mousedown', listenerDown)\n\tcanvas.addEventListener('mouseup', listenerUp)\n\tcanvas.addEventListener('contextmenu', context)\n\t\n\treturn function() {\n\t\tcanvas.removeEventListener('mousedown', listenerDown)\n\t\tcanvas.removeEventListener('mouseup', listenerUp)\n\t\tcanvas.removeEventListener('contextmenu', context)\n\t}\n}",
            "async": true,
            "meta": {
                "ui": {
                    "x": -481,
                    "y": 304
                }
            }
        },
        "render": {
            "id": "render",
            "ports": {
                "ctx": "cold",
                "tick": "hot"
            },
            "code": "function(ports) {\n\tthis.renderer.renderLayers(ports.ctx, [\"main-layer\"])\n}",
            "meta": {
                "ui": {
                    "y": 75,
                    "x": 443
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
            "async": true,
            "meta": {
                "ui": {
                    "x": -398,
                    "y": 605
                }
            }
        },
        "createParticles": {
            "id": "createParticles",
            "ports": {
                "count": "hot"
            },
            "code": "function(ports) {\n\treturn new Float32Array(ports.count * 2)\n}",
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
            "code": "function(ports, send) {\n\tvar canvas = ports.canvas\n\t\n\tfunction listener(e) {\n\t\tvar box = canvas.getBoundingClientRect()\n\t\tsend({\n\t\t\tx: e.clientX - box.left,\n\t\t\ty: e.clientY - box.top\n\t\t})\n\t}\n\t\n\tcanvas.addEventListener('mousemove', listener)\n\t\n\treturn function() {\n\t\tcanvas.removeEventListener('mousemove', listener)\n\t}\n}\n",
            "async": true,
            "meta": {
                "ui": {
                    "x": -313,
                    "y": 315
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
            "code": "function(ports) {\n\treturn (ports.i + 1) % ports.count\n}",
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
            "code": "function(ports) {\n\treturn this.renderer.updateSize(ports.ctx, ports.size.width, ports.size.height)\n}",
            "meta": {
                "ui": {
                    "y": 31,
                    "x": 103
                }
            }
        },
        "get-starttime": {
            "id": "get-starttime",
            "ports": {},
            "code": "function(ports) {\n\treturn Date.now()\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": 643,
                    "y": 540
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
            "code": "function(ports) {\n\tports.ages[ports.i] = (Date.now() - ports.starttime) / 1000.0\n\treturn ports.ages\n}",
            "meta": {
                "ui": {
                    "x": 450,
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
            "code": "function(ports) {\n\treturn {\n\t\tattribs: {\n\t\t\tposition: {\n\t\t\t\tbuffer: ports.positions,\n\t\t\t\tstoreType: \"DYNAMIC\"\n\t\t\t},\n\t\t\tage: {\n\t\t\t\tbuffer: ports.ages,\n\t\t\t\tstoreType: \"DYNAMIC\"\n\t\t\t}\n\t\t},\n\t\titemCount: ports.count,\n\t\tdrawType: \"POINTS\"\n\t}\n}",
            "meta": {
                "ui": {
                    "x": 211,
                    "y": 315
                }
            }
        },
        "create-render-context": {
            "id": "create-render-context",
            "ports": {
                "canvas": "hot",
                "obj": "cold"
            },
            "code": "function(ports) {\n\tvar ctx = this.renderer.create(ports.canvas)\n\tthis.renderer.updateObject(ctx, 'object', ports.obj)\n\treturn ctx\n}",
            "meta": {
                "ui": {
                    "y": -265,
                    "x": -58
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
            "code": "function(ports) {\n\tvar i = ports.i * 2\n\tports.particles[i] = ports.pos.x\n\tports.particles[i + 1] = ports.pos.y\n\treturn ports.particles\n}",
            "meta": {
                "ui": {
                    "x": -26,
                    "y": 414
                }
            }
        },
        "get-canvas": {
            "id": "get-canvas",
            "ports": {},
            "code": "function(ports) {\n\treturn document.getElementById('canvas')\n}",
            "autostart": true,
            "meta": {
                "ui": {
                    "x": -391,
                    "y": -31
                }
            }
        }
    },
    "arcs": {
        "update-age->ages": {
            "id": "update-age->ages",
            "entity": "ages",
            "process": "update-age",
            "meta": {}
        },
        "particle-count->createParticles::count": {
            "id": "particle-count->createParticles::count",
            "entity": "particle-count",
            "process": "createParticles",
            "port": "count",
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
            "meta": {}
        },
        "count-events->new-particle-pos": {
            "id": "count-events->new-particle-pos",
            "entity": "new-particle-pos",
            "process": "count-events",
            "meta": {}
        },
        "create-render-context->render-context": {
            "id": "create-render-context->render-context",
            "entity": "render-context",
            "process": "create-render-context",
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
            "meta": {}
        },
        "canvas-size->manipulate-object::size": {
            "id": "canvas-size->manipulate-object::size",
            "entity": "canvas-size",
            "process": "manipulate-object",
            "port": "size",
            "meta": {}
        },
        "tick->render::tick": {
            "id": "tick->render::tick",
            "entity": "time",
            "process": "render",
            "port": "tick",
            "meta": {}
        },
        "get-particle-index->particle-index": {
            "id": "get-particle-index->particle-index",
            "entity": "particle-index",
            "process": "get-particle-index",
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
            "meta": {}
        },
        "update-object->render-context": {
            "id": "update-object->render-context",
            "entity": "render-context",
            "process": "update-object",
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
            "meta": {}
        },
        "update-shader->render-context": {
            "id": "update-shader->render-context",
            "entity": "render-context",
            "process": "update-shader",
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
            "meta": {}
        },
        "get-canvas->canvas": {
            "id": "get-canvas->canvas",
            "entity": "canvas",
            "process": "get-canvas",
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
        "vertex->update-shader::vertex": {
            "id": "vertex->update-shader::vertex",
            "entity": "vertex",
            "process": "update-shader",
            "port": "vertex",
            "meta": {}
        },
        "animate->tick": {
            "id": "animate->tick",
            "entity": "time",
            "process": "animate",
            "meta": {}
        },
        "new-particle-pos->update-particle-position::pos": {
            "id": "new-particle-pos->update-particle-position::pos",
            "entity": "new-particle-pos",
            "process": "update-particle-position",
            "port": "pos",
            "meta": {}
        },
        "fragment->update-shader::fragment": {
            "id": "fragment->update-shader::fragment",
            "entity": "fragment",
            "process": "update-shader",
            "port": "fragment",
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
            "meta": {}
        },
        "update-layer->render-context": {
            "id": "update-layer->render-context",
            "entity": "render-context",
            "process": "update-layer",
            "meta": {}
        }
    },
    "meta": {
        "ui": {
            "layout": []
        }
    }
}

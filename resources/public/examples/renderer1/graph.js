export const graph =
{
    "entities": {
        "camera-settings": {
            "id": "camera-settings",
            "value": {
                "fovy": 1.05,
                "near": 0.1,
                "far": 1000,
                "aspect": 1.6
            },
            "meta": {}
        },
        "canvas": {
            "id": "canvas",
            "value": null,
            "meta": {}
        },
        "plane-position": {
            "id": "plane-position",
            "value": [
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0
            ],
            "meta": {}
        },
        "plane-geometry": {
            "id": "plane-geometry",
            "value": null,
            "meta": {}
        },
        "render-context": {
            "id": "render-context",
            "value": null,
            "meta": {}
        },
        "plane-transform": {
            "id": "plane-transform",
            "value": null,
            "meta": {}
        },
        "canvas-size": {
            "id": "canvas-size",
            "value": {
                "width": 800,
                "height": 500
            },
            "meta": {}
        },
        "camera": {
            "id": "camera",
            "value": null,
            "meta": {}
        },
        "main-layer": {
            "id": "main-layer",
            "value": {
                "type": "render",
                "objects": [
                    "plane-object"
                ]
            },
            "meta": {}
        },
        "plane-object": {
            "id": "plane-object",
            "value": {
                "geometry": "plane-geometry",
                "shader": "plane-shader",
                "uniforms": {}
            },
            "meta": {}
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
            "meta": {}
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
            "meta": {}
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
            "meta": {}
        },
        "update-camera-settings": {
            "id": "update-camera-settings",
            "ports": {
                "settings": "accumulator",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tvar settings = ports.settings\n\t\n\tsettings.aspect = ports.size.width / ports.size.height\n\t\n\tsend(settings);\n}",
            "autostart": null,
            "meta": {}
        },
        "render": {
            "id": "render",
            "ports": {
                "ctx": "cold"
            },
            "code": "function(ports, send) {\n\tthis.renderer.renderLayers(ports.ctx, [\"main-layer\"])\n}",
            "autostart": null,
            "meta": {}
        },
        "create-plane-geometry": {
            "id": "create-plane-geometry",
            "ports": {},
            "code": "function(ports, send) {\n \tsend(this.geometries.plane(10, 10))\n}",
            "autostart": null,
            "meta": {}
        },
        "create-plane-matrix": {
            "id": "create-plane-matrix",
            "ports": {
                "pos": "hot"
            },
            "code": "function(ports, send) {\n\tvar m = this.mat4.create()\n\tthis.mat4.fromTranslation(m, ports.pos)\n\tthis.mat4.rotateX(m, m, 0.3)\n\tthis.mat4.rotateY(m, m, 0.2)\n\tsend(m)\n}",
            "autostart": null,
            "meta": {}
        },
        "update-context": {
            "id": "update-context",
            "ports": {
                "ctx": "accumulator",
                "plane_geometry": "hot",
                "plane_object": "hot",
                "plane_shader": "hot",
                "main_layer": "hot"
            },
            "code": "function(ports, send) {\n\tvar ctx = ports.ctx\n\t\n\tthis.renderer.updateGeometry(ctx, \"plane-geometry\", ports.plane_geometry)\n\tthis.renderer.updateObject(ctx, \"plane-object\", ports.plane_object)\n\tthis.renderer.updateShader(ctx, \"plane-shader\", ports.plane_shader)\n\tthis.renderer.updateLayer(ctx, \"main-layer\", ports.main_layer)\n\n\tsend(ctx)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-render-context": {
            "id": "create-render-context",
            "ports": {},
            "code": "function(ports, send) {\n\tvar ctx = this.renderer.create()\n\tthis.renderer.initSettings(ctx, {})\n\tsend(ctx)\n}",
            "autostart": null,
            "meta": {}
        },
        "attach-canvas": {
            "id": "attach-canvas",
            "ports": {
                "render_ctx": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log('attach-canvas')\n\tvar canvas = ports.render_ctx.gl.canvas\n\tdocument.body.appendChild(canvas)\n\t\n\tsend(canvas)\n\t\n\treturn function() {\n\t\tdocument.body.removeChild(canvas)\n\t}\n}",
            "autostart": null,
            "meta": {}
        },
        "update-canvas-size": {
            "id": "update-canvas-size",
            "ports": {
                "canvas": "hot",
                "ctx": "cold"
            },
            "code": "function(ports, send) {\n\tthis.renderer.updateSize(ports.ctx)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-camera": {
            "id": "create-camera",
            "ports": {
                "settings": "hot"
            },
            "code": "function(ports, send) {\n\tvar m = this.mat4.create(),\n\t\t\tconf = ports.settings\n\t\n\tthis.mat4.perspective(m, conf.fovy, conf.aspect, conf.near, conf.far)\n\t\n\tsend(m)\n}",
            "autostart": null,
            "meta": {}
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
        "canvas->update-canvas-size::canvas": {
            "id": "canvas->update-canvas-size::canvas",
            "entity": "canvas",
            "process": "update-canvas-size",
            "port": "canvas",
            "meta": {}
        },
        "plane-position->create-plane-matrix::pos": {
            "id": "plane-position->create-plane-matrix::pos",
            "entity": "plane-position",
            "process": "create-plane-matrix",
            "port": "pos",
            "meta": {}
        },
        "update-plane->plane-object": {
            "id": "update-plane->plane-object",
            "entity": "plane-object",
            "process": "update-plane",
            "port": null,
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
            "process": "update-canvas-size",
            "port": "ctx",
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
        }
    },
    "meta": {}
}

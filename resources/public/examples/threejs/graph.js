export const graph =
{
    "entities": {
        "color": {
            "id": "color",
            "value": "0xff0000",
            "meta": {}
        },
        "camera-position": {
            "id": "camera-position",
            "value": [
                0,
                0,
                700
            ],
            "meta": {}
        },
        "geometry": {
            "id": "geometry",
            "value": null,
            "meta": {}
        },
        "renderer": {
            "id": "renderer",
            "value": null,
            "meta": {}
        },
        "size": {
            "id": "size",
            "value": {
                "width": 800,
                "height": 500
            },
            "meta": {}
        },
        "mesh": {
            "id": "mesh",
            "value": null,
            "meta": {}
        },
        "material": {
            "id": "material",
            "value": null,
            "meta": {}
        },
        "camera": {
            "id": "camera",
            "value": null,
            "meta": {}
        },
        "scene": {
            "id": "scene",
            "value": null,
            "meta": {}
        }
    },
    "processes": {
        "update-mesh": {
            "id": "update-mesh",
            "ports": {
                "mesh": "accumulator",
                "material": "hot",
                "geometry": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"update-mesh\")\n\t\n\tvar mesh = ports.mesh,\n\t\t\tmat = ports.material\n\t\t\t\n\tmesh.material = mat\n\tmesh.geometry = ports.geometry\n\tsend(mesh)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-material": {
            "id": "create-material",
            "ports": {
                "color": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"create-material\")\n\t\n\tsend(new this.three.MeshBasicMaterial({\n        color: parseInt(ports.color),\n        wireframe: true\n    }))\n}",
            "autostart": true,
            "meta": {}
        },
        "create-scene": {
            "id": "create-scene",
            "ports": {
                "mesh": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"create-scene\")\n\t\n\tvar scene = new this.three.Scene()\n\tscene.add(ports.mesh)\n\tsend(scene)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-renderer": {
            "id": "create-renderer",
            "ports": {},
            "code": "function(ports, send) {\n\tconsole.log(\"create-renderer\")\n\t\n\tvar renderer = new this.three.WebGLRenderer()\n\t\n\tdocument.body.appendChild(renderer.domElement)\n\t\n\tsend(renderer)\n}",
            "autostart": true,
            "meta": {}
        },
        "render": {
            "id": "render",
            "ports": {
                "scene": "hot",
                "renderer": "cold",
                "camera": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"render\")\n\t\n\tports.renderer.render(ports.scene, ports.camera)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-mesh": {
            "id": "create-mesh",
            "ports": {},
            "code": "function(ports, send) {\n\tconsole.log(\"create-mesh\")\n\t\n\tsend(new this.three.Mesh())\n}",
            "autostart": true,
            "meta": {}
        },
        "create-geometry": {
            "id": "create-geometry",
            "ports": {},
            "code": "function(ports, send) {\n\tconsole.log(\"create-geometry\")\n\t\n\tsend(new this.three.BoxGeometry(200, 200, 200))\n}",
            "autostart": true,
            "meta": {}
        },
        "update-size": {
            "id": "update-size",
            "ports": {
                "renderer": "hot",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"update-size\")\n\t\n\tports.renderer.setSize(ports.size.width, ports.size.height)\n}",
            "autostart": null,
            "meta": {}
        },
        "create-camera": {
            "id": "create-camera",
            "ports": {
                "size": "cold"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"create-camera\")\n\t\n\tsend(new this.three.PerspectiveCamera(\n\t\t75, ports.size.width / ports.size.height, 1, 1000\n\t))\n}",
            "autostart": true,
            "meta": {}
        },
        "update-camera": {
            "id": "update-camera",
            "ports": {
                "camera": "accumulator",
                "position": "hot",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tconsole.log(\"update-camera\")\n\t\n\tvar cam = ports.camera,\n\t\t\tpos = ports.position\n\t\n\tcam.position.x = pos[0]\n\tcam.position.y = pos[1]\n\tcam.position.z = pos[2]\n\tcam.aspect = ports.size.width / ports.size.height\n\t\n\tsend(cam)\n}",
            "autostart": null,
            "meta": {}
        }
    },
    "arcs": {
        "size->create-camera::size": {
            "id": "size->create-camera::size",
            "entity": "size",
            "process": "create-camera",
            "port": "size",
            "meta": {}
        },
        "create-material->material": {
            "id": "create-material->material",
            "entity": "material",
            "process": "create-material",
            "port": null,
            "meta": {}
        },
        "scene->render::scene": {
            "id": "scene->render::scene",
            "entity": "scene",
            "process": "render",
            "port": "scene",
            "meta": {}
        },
        "size->update-camera::size": {
            "id": "size->update-camera::size",
            "entity": "size",
            "process": "update-camera",
            "port": "size",
            "meta": {}
        },
        "update-mesh->mesh": {
            "id": "update-mesh->mesh",
            "entity": "mesh",
            "process": "update-mesh",
            "port": null,
            "meta": {}
        },
        "create-mesh->mesh": {
            "id": "create-mesh->mesh",
            "entity": "mesh",
            "process": "create-mesh",
            "port": null,
            "meta": {}
        },
        "create-scene->scene": {
            "id": "create-scene->scene",
            "entity": "scene",
            "process": "create-scene",
            "port": null,
            "meta": {}
        },
        "geometry->update-mesh::geometry": {
            "id": "geometry->update-mesh::geometry",
            "entity": "geometry",
            "process": "update-mesh",
            "port": "geometry",
            "meta": {}
        },
        "update-camera->camera": {
            "id": "update-camera->camera",
            "entity": "camera",
            "process": "update-camera",
            "port": null,
            "meta": {}
        },
        "create-renderer->renderer": {
            "id": "create-renderer->renderer",
            "entity": "renderer",
            "process": "create-renderer",
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
        "mesh->create-scene::mesh": {
            "id": "mesh->create-scene::mesh",
            "entity": "mesh",
            "process": "create-scene",
            "port": "mesh",
            "meta": {}
        },
        "renderer->render::renderer": {
            "id": "renderer->render::renderer",
            "entity": "renderer",
            "process": "render",
            "port": "renderer",
            "meta": {}
        },
        "camera-position->update-camera::position": {
            "id": "camera-position->update-camera::position",
            "entity": "camera-position",
            "process": "update-camera",
            "port": "position",
            "meta": {}
        },
        "size->update-size::size": {
            "id": "size->update-size::size",
            "entity": "size",
            "process": "update-size",
            "port": "size",
            "meta": {}
        },
        "material->update-mesh::material": {
            "id": "material->update-mesh::material",
            "entity": "material",
            "process": "update-mesh",
            "port": "material",
            "meta": {}
        },
        "color->create-material::color": {
            "id": "color->create-material::color",
            "entity": "color",
            "process": "create-material",
            "port": "color",
            "meta": {}
        },
        "camera->render::camera": {
            "id": "camera->render::camera",
            "entity": "camera",
            "process": "render",
            "port": "camera",
            "meta": {}
        },
        "renderer->update-size::renderer": {
            "id": "renderer->update-size::renderer",
            "entity": "renderer",
            "process": "update-size",
            "port": "renderer",
            "meta": {}
        },
        "create-geometry->geometry": {
            "id": "create-geometry->geometry",
            "entity": "geometry",
            "process": "create-geometry",
            "port": null,
            "meta": {}
        }
    },
    "meta": {}
}

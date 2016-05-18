var graph =

{
    "entities": {
        "mouse-position": {
            "id": "mouse-position",
            "value": null,
            "meta": {}
        },
        "window-size": {
            "id": "window-size",
            "value": null,
            "meta": {}
        },
        "position-ratio": {
            "id": "position-ratio",
            "value": null,
            "meta": {}
        },
        "color": {
            "id": "color",
            "value": null,
            "meta": {}
        },
        "base-color": {
            "id": "base-color",
            "value": [
                198,
                58,
                155
            ],
            "meta": {}
        }
    },
    "processes": {
        "mouse-move-collector": {
            "id": "mouse-move-collector",
            "ports": {},
            "code": "function(ports, send) {\n\tfunction onMouseMove(e) {\n      send({x: e.clientX, y: e.clientY});\n    };\n  \n  window.addEventListener(\"mousemove\", onMouseMove);\n  \n  return function stop() {\n  \twindow.removeEventListener(\"mousemove\", onMouseMove);\n  }\n}",
            "autostart": true,
            "meta": {}
        },
        "to-ratio": {
            "id": "to-ratio",
            "ports": {
                "position": "hot",
                "size": "hot"
            },
            "code": "function(ports, send) {\n\tsend({\n      x: ports.position.x / ports.size.width,\n      y: ports.position.y / ports.size.height,\n    });\n}",
            "autostart": null,
            "meta": {}
        },
        "window-size-collector": {
            "id": "window-size-collector",
            "ports": {},
            "code": "function(ports, send) {\n\tfunction onResize(e) {\n      send({width: window.innerWidth, height: window.innerHeight});\n    };\n  onResize();\n  \n  window.addEventListener(\"resize\", onResize);\n  \n  return function stop() {\n  \twindow.removeEventListener(\"resize\", onResize);\n  }\n}",
            "autostart": true,
            "meta": {}
        },
        "ratio-to-color": {
            "id": "ratio-to-color",
            "ports": {
                "ratio": "hot",
                "base_color": "hot"
            },
            "code": "function(ports, send) {\n  var base = ports.base_color,\n  \t  rY = ports.ratio.y,\n      rX = ports.ratio.x;\n\tsend([\n      Math.floor(base[0] * rY), \n      Math.floor(base[1] * rX), \n      Math.floor(base[2] * rY * rX)\n    ]);\n}",
            "autostart": null,
            "meta": {}
        },
        "background-color": {
            "id": "background-color",
            "ports": {
                "color": "hot"
            },
            "code": "function(ports, send) {\n  var c = ports.color;\n  document.body.style.backgroundColor = \"rgb(\" \n    + c[0] + \", \"\n    + c[1] + \", \"\n    + c[2] + \")\"\n}",
            "autostart": null,
            "meta": {}
        }
    },
    "arcs": {
        "window-size-collector->window-size": {
            "id": "window-size-collector->window-size",
            "entity": "window-size",
            "process": "window-size-collector",
            "port": null,
            "meta": {}
        },
        "window-size->to-ratio::size": {
            "id": "window-size->to-ratio::size",
            "entity": "window-size",
            "process": "to-ratio",
            "port": "size",
            "meta": {}
        },
        "ratio-to-color->color": {
            "id": "ratio-to-color->color",
            "entity": "color",
            "process": "ratio-to-color",
            "port": null,
            "meta": {}
        },
        "to-ratio->position-ratio": {
            "id": "to-ratio->position-ratio",
            "entity": "position-ratio",
            "process": "to-ratio",
            "port": null,
            "meta": {}
        },
        "mouse-move-collector->mouse-position": {
            "id": "mouse-move-collector->mouse-position",
            "entity": "mouse-position",
            "process": "mouse-move-collector",
            "port": null,
            "meta": {}
        },
        "base-color->ratio-to-color::base_color": {
            "id": "base-color->ratio-to-color::base_color",
            "entity": "base-color",
            "process": "ratio-to-color",
            "port": "base_color",
            "meta": {}
        },
        "position-ratio->ratio-to-color::ratio": {
            "id": "position-ratio->ratio-to-color::ratio",
            "entity": "position-ratio",
            "process": "ratio-to-color",
            "port": "ratio",
            "meta": {}
        },
        "color->background-color::color": {
            "id": "color->background-color::color",
            "entity": "color",
            "process": "background-color",
            "port": "color",
            "meta": {}
        },
        "mouse-position->to-ratio::position": {
            "id": "mouse-position->to-ratio::position",
            "entity": "mouse-position",
            "process": "to-ratio",
            "port": "position",
            "meta": {}
        }
    },
    "meta": {}
}

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
        }
    },
    "processes": {
        "mouse-move-collector": {
            "id": "mouse-move-collector",
            "autostart": true,
            "ports": {},
            "code": "function(ports, send) {\n\tfunction onMouseMove(e) {\n      send({x: e.clientX, y: e.clientY});\n    };\n  \n  window.addEventListener(\"mousemove\", onMouseMove);\n  \n  return function stop() {\n  \twindow.removeEventListener(\"mousemove\", onMouseMove);\n  }\n}",
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
            "autostart": true,
            "ports": {},
            "code": "function(ports, send) {\n\tfunction onResize(e) {\n      send({width: window.innerWidth, height: window.innerHeight});\n    };\n  onResize();\n  \n  window.addEventListener(\"resize\", onResize);\n  \n  return function stop() {\n  \twindow.removeEventListener(\"resize\", onResize);\n  }\n}",
            "meta": {}
        },
        "ration-to-color": {
            "id": "ration-to-color",
            "ports": {
                "ratio": "hot"
            },
            "code": "function(ports, send) {\n  function to_8_bit(ratio) {\n     return Math.floor(Math.min(ratio, 1) * 255)\n  }\n\tsend([to_8_bit(ports.ratio.y), to_8_bit(ports.ratio.x), 155]);\n}",
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
        "mouse-move-collector->mouse-position": {
            "id": "mouse-move-collector->mouse-position",
            "entity": "mouse-position",
            "process": "mouse-move-collector",
            "port": null,
            "meta": {}
        },
        "mouse-position->to-ratio::position": {
            "id": "mouse-position->to-ratio::position",
            "entity": "mouse-position",
            "process": "to-ratio",
            "port": "position",
            "meta": {}
        },
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
        "to-ratio->position-ratio": {
            "id": "to-ratio->position-ratio",
            "entity": "position-ratio",
            "process": "to-ratio",
            "port": null,
            "meta": {}
        },
        "position-ratio->ration-to-color::ratio": {
            "id": "position-ratio->ration-to-color::ratio",
            "entity": "position-ratio",
            "process": "ration-to-color",
            "port": "ratio",
            "meta": {}
        },
        "ration-to-color->color": {
            "id": "ration-to-color->color",
            "entity": "color",
            "process": "ration-to-color",
            "port": null,
            "meta": {}
        },
        "color->background-color::color": {
            "id": "color->background-color::color",
            "entity": "color",
            "process": "background-color",
            "port": "color",
            "meta": {}
        }
    },
    "meta": {}
}

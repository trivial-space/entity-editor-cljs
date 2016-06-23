export const graph =
{
    "entities": {
        "mouse-position": {
            "id": "mouse-position",
            "value": {
                "x": 0,
                "y": 0
            },
            "meta": {
                "ui": {
                    "y": -254,
                    "x": -83
                }
            }
        },
        "window-size": {
            "id": "window-size",
            "value": {
                "width": 1,
                "height": 1
            },
            "meta": {
                "ui": {
                    "y": -251,
                    "x": 104
                }
            }
        },
        "position-ratio": {
            "id": "position-ratio",
            "meta": {
                "ui": {
                    "y": 58,
                    "x": 6
                }
            }
        },
        "color": {
            "id": "color",
            "meta": {
                "ui": {
                    "y": 376,
                    "x": 112
                }
            }
        },
        "base-color": {
            "id": "base-color",
            "value": [
                198,
                58,
                155
            ],
            "meta": {
                "ui": {
                    "y": 58,
                    "x": 200
                }
            }
        }
    },
    "processes": {
        "mouse-move-collector": {
            "id": "mouse-move-collector",
            "ports": {},
            "code": "function(ports, send) {\n\t\n\tfunction onMouseMove(e) {\n\t\tsend({x: e.clientX, y: e.clientY});\n\t};\n\n\twindow.addEventListener(\"mousemove\", onMouseMove);\n\n\treturn function stop() {\n\t\twindow.removeEventListener(\"mousemove\", onMouseMove);\n\t}\n}",
            "autostart": true,
            "async": true,
            "meta": {
                "ui": {
                    "y": -422,
                    "x": -111
                }
            }
        },
        "to-ratio": {
            "id": "to-ratio",
            "ports": {
                "position": "hot",
                "size": "hot"
            },
            "code": "function(ports) {\n\treturn {\n\t\tx: ports.position.x / ports.size.width,\n\t\ty: ports.position.y / ports.size.height,\n\t}\n}",
            "meta": {
                "ui": {
                    "y": -105,
                    "x": 4
                }
            }
        },
        "window-size-collector": {
            "id": "window-size-collector",
            "ports": {},
            "code": "function(ports, send) {\n\n\tfunction onResize(e) {\n\t\tsend({width: window.innerWidth, height: window.innerHeight});\n\t};\n\n\tonResize();\n\n\twindow.addEventListener(\"resize\", onResize);\n\n\treturn function stop() {\n\t\twindow.removeEventListener(\"resize\", onResize);\n\t}\n}",
            "autostart": true,
            "async": true,
            "meta": {
                "ui": {
                    "y": -424,
                    "x": 130
                }
            }
        },
        "ratio-to-color": {
            "id": "ratio-to-color",
            "ports": {
                "ratio": "hot",
                "base_color": "hot"
            },
            "code": "function(ports) {\n\n\tvar base = ports.base_color,\n\t\t\trY = ports.ratio.y,\n\t\t  rX = ports.ratio.x\n\n\treturn [\n\t\tMath.floor(base[0] * rY), \n\t\tMath.floor(base[1] * rX), \n\t\tMath.floor(base[2] * rY * rX)\n\t]\n}",
            "meta": {
                "ui": {
                    "y": 227,
                    "x": 106
                }
            }
        },
        "background-color": {
            "id": "background-color",
            "ports": {
                "color": "hot"
            },
            "code": "function(ports) {\n\n\tvar c = ports.color;\n\n\tdocument.body.style.backgroundColor = \"rgb(\" \n\t\t+ c[0] + \", \"\n\t\t+ c[1] + \", \"\n\t\t+ c[2] + \")\"\n}",
            "meta": {
                "ui": {
                    "y": 521,
                    "x": 110
                }
            }
        }
    },
    "arcs": {
        "window-size-collector->window-size": {
            "id": "window-size-collector->window-size",
            "entity": "window-size",
            "process": "window-size-collector",
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
            "meta": {}
        },
        "to-ratio->position-ratio": {
            "id": "to-ratio->position-ratio",
            "entity": "position-ratio",
            "process": "to-ratio",
            "meta": {}
        },
        "mouse-move-collector->mouse-position": {
            "id": "mouse-move-collector->mouse-position",
            "entity": "mouse-position",
            "process": "mouse-move-collector",
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
    "meta": {
        "ui": {
            "layout": []
        }
    }
}

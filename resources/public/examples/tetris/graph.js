export const graph =
{
	"entities": {
		"tick": {
			"id": "tick",
			"meta": {
				"ui": {
					"x": 244,
					"y": 743
				}
			}
		},
		"key": {
			"id": "key",
			"meta": {
				"ui": {
					"x": -194,
					"y": 746
				}
			}
		},
		"element-state": {
			"id": "element-state",
			"meta": {
				"ui": {
					"x": 21,
					"y": -104
				}
			}
		},
		"speed": {
			"id": "speed",
			"value": 1000,
			"meta": {
				"ui": {
					"x": 245,
					"y": 1028
				}
			}
		},
		"element1": {
			"id": "element1",
			"meta": {
				"ui": {
					"x": -677,
					"y": -356
				}
			}
		},
		"render-ctx": {
			"id": "render-ctx",
			"meta": {
				"ui": {
					"x": -395,
					"y": -306
				}
			}
		},
		"actions": {
			"id": "actions",
			"value": {
				"MOVE_DOWN": 1,
				"MOVE_LEFT": 2,
				"MOVE_RIGHT": 3,
				"ROTATE_LEFT": 4,
				"ROTATE_RIGHT": 5,
				"DOCK_BOTTOM": 6
			},
			"meta": {
				"ui": {
					"x": 488,
					"y": 286
				}
			}
		},
		"elements": {
			"id": "elements",
			"meta": {
				"ui": {
					"x": -761,
					"y": -112
				}
			}
		},
		"canvas": {
			"id": "canvas",
			"meta": {
				"ui": {
					"x": -393,
					"y": -557
				}
			}
		},
		"field-size": {
			"id": "field-size",
			"value": {
				"rows": 20,
				"cols": 10
			},
			"meta": {
				"ui": {
					"x": 278,
					"y": -651
				}
			}
		},
		"rows": {
			"id": "rows",
			"meta": {
				"ui": {
					"x": -34,
					"y": -320
				}
			}
		},
		"future-shape": {
			"id": "future-shape",
			"meta": {
				"ui": {
					"x": -30,
					"y": 426
				}
			}
		},
		"current-action": {
			"id": "current-action",
			"meta": {
				"ui": {
					"x": -128,
					"y": 129
				}
			}
		},
		"element2": {
			"id": "element2",
			"meta": {
				"ui": {
					"x": -842,
					"y": -357
				}
			}
		},
		"tile-size": {
			"id": "tile-size",
			"value": {
				"edge": 20,
				"margin": 5
			},
			"meta": {
				"ui": {
					"x": -209,
					"y": -558
				}
			}
		},
		"current-element": {
			"id": "current-element",
			"meta": {
				"ui": {
					"x": -406,
					"y": 42
				}
			}
		},
		"new-element-request": {
			"id": "new-element-request",
			"meta": {
				"ui": {
					"x": -507,
					"y": 222
				}
			}
		}
	},
	"processes": {
		"create-element1": {
			"id": "create-element1",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tcolor: \"yellow\",\n\t\ttiles: [\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -673,
					"y": -512
				}
			}
		},
		"pick-random-element": {
			"id": "pick-random-element",
			"ports": {
				"trigger": "hot",
				"elements": "hot"
			},
			"code": "function(ports) {\n\tvar keys = Object.keys(ports.elements),\n\t\t\ti = Math.floor(Math.random() * keys.length)\n\treturn ports.elements[keys[i]]\n}",
			"meta": {
				"ui": {
					"x": -626,
					"y": 57
				}
			}
		},
		"fillup-rows": {
			"id": "fillup-rows",
			"ports": {
				"rows": "accumulator",
				"size": "hot"
			},
			"code": "function(ports) {\n\tvar col\n\tfor (var i = ports.rows.length; i < ports.size.rows; i++) {\n\t\tcol = []\n\t\tfor (var j = 0; j < ports.size.cols; j++) {\n\t\t\tcol.push(false)\n\t\t}\n\t\tports.rows.push(col)\n\t}\n\treturn ports.rows\n}",
			"meta": {
				"ui": {
					"x": 78,
					"y": -328
				}
			}
		},
		"render-field": {
			"id": "render-field",
			"ports": {
				"ctx": "hot",
				"tile": "hot",
				"state": "hot",
				"el": "hot",
				"rows": "hot"
			},
			"code": "function(ports) {\n\tfunction drawTile (x, y, color) {\n\t\tports.ctx.fillStyle = color\n\t\tports.ctx.fillRect(\n\t\t\tx * (ports.tile.edge + ports.tile.margin),\n\t\t\ty * (ports.tile.edge + ports.tile.margin),\n\t\t\tports.tile.edge,\n\t\t\tports.tile.edge\n\t\t)\n\t}\n\t\n\tports.rows.forEach((row, y) => {\n\t\trow.forEach((col, x) => {\n\t\t\tdrawTile(x, y, col || \"lightgray\")\n\t\t})\n\t})\n\t\n\tif (ports.el) {\n\t\tvar tiles = ports.el.tiles[ports.state.rotation],\n\t\t\t\tcolor = ports.el.color, \n\t\t\t\tpos = ports.state.position\n\t\ttiles.forEach((tile) => {\n\t\t\tdrawTile(tile[0] + pos[0], tile[1] + pos[1], color)\n\t\t})\n\t}\n}",
			"meta": {
				"ui": {
					"x": -201,
					"y": -104
				}
			}
		},
		"animate": {
			"id": "animate",
			"ports": {
				"speed": "hot"
			},
			"code": "function(ports, send) {\n\tvar i = setInterval(function() {\n\t\tsend(true)\n\t\tsend(false)\n\t}, ports.speed)\n\t\n\treturn function() {\n\t\tclearInterval(i)\n\t}\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": 246,
					"y": 892
				}
			}
		},
		"reset-element-state": {
			"id": "reset-element-state",
			"ports": {
				"size": "cold",
				"trigger": "hot"
			},
			"code": "function(ports) {\n\treturn {\n\t\tposition: [Math.floor((ports.size.cols - 1) / 2), 0],\n\t\trotation: 0\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": 198,
					"y": -103
				}
			}
		},
		"get-future-shape": {
			"id": "get-future-shape",
			"ports": {
				"key": "hot",
				"state": "cold",
				"el": "cold",
				"tick": "hot",
				"actions": "cold"
			},
			"code": "function(ports, send) {\n\tvar pos = ports.state.position,\n\t\t\tshape =  ports.el.tiles[ports.state.rotation]\n\t\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]]),\n\t\t\top, newShape\n\t\n\tif(ports.tick) {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0], \n\t\t\ttile[1] + 1\n\t\t])\n\t\top = ports.actions.MOVE_DOWN\n\t}\n\t\n\tif(ports.key == \"right\") {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0] + 1,\n\t\t\ttile[1]\n\t\t])\n\t\top = ports.actions.MOVE_RIGHT\n\t}\n\t\n\tif(ports.key == \"left\") {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0] - 1,\n\t\t\ttile[1]\n\t\t])\n\t\top = ports.actions.MOVE_LEFT\n\t}\n\t\n\tif(ports.key == \"up\") {\n\t\tnewShape = ports.el.tiles[(ports.state.rotation + 3) % 4]\n\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]]),\n\t\top = ports.actions.ROTATE_LEFT\n\t}\n\t\n\tif(ports.key == \"down\") {\n\t\tnewShape = ports.el.tiles[(ports.state.rotation + 1) % 4]\n\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]]),\n\t\top = ports.actions.ROTATE_RIGHT\n\t}\n\t\n\tif (op) send({\n\t\tshape: newShape,\n\t\taction: op\n\t})\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": 22,
					"y": 686
				}
			}
		},
		"get-keyboard-input": {
			"id": "get-keyboard-input",
			"ports": {},
			"code": "function(ports, send) {\n\tvar oldE = null,\n\t\t\tnewE = null\n\t\n\tfunction keyup(e) {\n\t\tnewE = oldE = null\n\t\tsend(newE)\n\t}\n\t\n\tfunction keydown(e) {\n\t\tswitch (e.keyCode) {\n        case 37:\n            newE = 'left';\n            break;\n        case 38:\n            newE = 'up';\n            break;\n        case 39:\n            newE = 'right';\n            break;\n        case 40:\n            newE = 'down';\n            break;\n    }\n\t\t\n\t\tif (newE != oldE) {\n\t\t\tconsole.log(\"fufufu\")\n\t\t\tsend(newE)\n\t\t\tsend(null)\n\t\t\toldE = newE\n\t\t}\n\t}\n\t\n\tdocument.addEventListener(\"keydown\", keydown)\n\tdocument.addEventListener(\"keyup\", keyup)\n\t\n\treturn function() {\n\t\tdocument.removeEventListener(\"keydown\", keydown)\n\t\tdocument.removeEventListener(\"keyup\", keyup)\n\t}\n}",
			"autostart": true,
			"async": true,
			"meta": {
				"ui": {
					"x": -194,
					"y": 893
				}
			}
		},
		"create-element2": {
			"id": "create-element2",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tcolor: \"cyan\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [1, 3]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [3, 1]],\n\t\t\t[[1, 0], [1, 1], [1, 2], [1, 3]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [3, 1]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -840,
					"y": -510
				}
			}
		},
		"create-rows": {
			"id": "create-rows",
			"ports": {},
			"code": "function(ports) {\n\treturn []\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -31,
					"y": -463
				}
			}
		},
		"get-canvas-ctx": {
			"id": "get-canvas-ctx",
			"ports": {
				"canvas": "hot"
			},
			"code": "function(ports) {\n\treturn ports.canvas.getContext('2d')\n}",
			"meta": {
				"ui": {
					"x": -394,
					"y": -426
				}
			}
		},
		"validate-future-shape": {
			"id": "validate-future-shape",
			"ports": {
				"shape": "hot",
				"actions": "cold",
				"size": "cold",
				"rows": "cold"
			},
			"code": "function(ports, send) {\n\t\n\tvar shape = ports.shape.shape,\n\t\t\taction = ports.shape.action,\n\t\t\tisFree = shape.reduce(\n\t\t\t\t(acc, tile) => acc && \n\t\t\t\t\tports.rows[tile[1]] &&\n\t\t\t\t\tports.rows[tile[1]][tile[0]] === false,\n\t\t\t\ttrue\n\t\t\t)\n\n\tif (isFree) {\n\t\tsend(action) \n\t} else if (action === ports.actions.MOVE_DOWN) {\n\t\tsend(ports.actions.DOCK_BOTTOM)\n\t}\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": -84,
					"y": 288
				}
			}
		},
		"action-reset": {
			"id": "action-reset",
			"ports": {
				"action": "hot",
				"actions": "cold"
			},
			"code": "function(ports, send) {\n\tif (ports.action === ports.actions.DOCK_BOTTOM) {\n\t\tsend()\n\t}\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": -404,
					"y": 407
				}
			}
		},
		"update-state": {
			"id": "update-state",
			"ports": {
				"action": "hot",
				"actions": "cold",
				"state": "accumulator"
			},
			"code": "function(ports) {\n\tif (ports.action == ports.actions.MOVE_RIGHT) {\n\t\tports.state.position[0]++\n\t}\n\tif (ports.action == ports.actions.MOVE_LEFT) {\n\t\tports.state.position[0]--\n\t}\n\tif (ports.action == ports.actions.MOVE_DOWN) {\n\t\tports.state.position[1]++\n\t}\n\tif (ports.action == ports.actions.ROTATE_RIGHT) {\n\t\tports.state.rotation = (ports.state.rotation + 1) % 4\n\t}\n\tif (ports.action == ports.actions.ROTATE_LEFT) {\n\t\tports.state.rotation = (ports.state.rotation + 3) % 4\n\t}\n\treturn ports.state\n}",
			"meta": {
				"ui": {
					"x": 200,
					"y": 122
				}
			}
		},
		"update-canvas-size": {
			"id": "update-canvas-size",
			"ports": {
				"tile": "hot",
				"field": "hot",
				"canvas": "hot"
			},
			"code": "function(ports) {\n\tvar c = ports.canvas,\n\t\t\tcols = ports.field.cols,\n\t\t\trows = ports.field.rows,\n\t\t\tedge = ports.tile.edge,\n\t\t\tmargin = ports.tile.margin\n\t\n\tc.width = cols * edge + (cols - 1) * margin\n\tc.height = rows * edge + (rows - 1) * margin\n\tc.style.border = \"1px solid gray\"\n}",
			"meta": {
				"ui": {
					"x": -210,
					"y": -728
				}
			}
		},
		"collect-elements": {
			"id": "collect-elements",
			"ports": {
				"e1": "hot",
				"e2": "hot"
			},
			"code": "function(ports) {\n \treturn Object.keys(ports).map((k) => ports[k])\n}",
			"meta": {
				"ui": {
					"x": -767,
					"y": -233
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
					"x": -394,
					"y": -684
				}
			}
		}
	},
	"arcs": {
		"canvas->update-canvas::canvas": {
			"id": "canvas->update-canvas::canvas",
			"entity": "canvas",
			"process": "update-canvas-size",
			"port": "canvas",
			"meta": {}
		},
		"render-ctx->render-field::ctx": {
			"id": "render-ctx->render-field::ctx",
			"entity": "render-ctx",
			"process": "render-field",
			"port": "ctx",
			"meta": {}
		},
		"field-size->update-canvas::field": {
			"id": "field-size->update-canvas::field",
			"entity": "field-size",
			"process": "update-canvas-size",
			"port": "field",
			"meta": {}
		},
		"get-canvas-ctx->render-ctx": {
			"id": "get-canvas-ctx->render-ctx",
			"entity": "render-ctx",
			"process": "get-canvas-ctx",
			"meta": {}
		},
		"collect-elements->elements": {
			"id": "collect-elements->elements",
			"entity": "elements",
			"process": "collect-elements",
			"meta": {}
		},
		"action-reset->new-element-request": {
			"id": "action-reset->new-element-request",
			"entity": "new-element-request",
			"process": "action-reset",
			"meta": {}
		},
		"next-element->render-field::el": {
			"id": "next-element->render-field::el",
			"entity": "current-element",
			"process": "render-field",
			"port": "el",
			"meta": {}
		},
		"update-state->element-state": {
			"id": "update-state->element-state",
			"entity": "element-state",
			"process": "update-state",
			"meta": {}
		},
		"field-size->initial-state::size": {
			"id": "field-size->initial-state::size",
			"entity": "field-size",
			"process": "reset-element-state",
			"port": "size",
			"meta": {}
		},
		"field-size->validate-future-shape::size": {
			"id": "field-size->validate-future-shape::size",
			"entity": "field-size",
			"process": "validate-future-shape",
			"port": "size",
			"meta": {}
		},
		"action->action-reset::action": {
			"id": "action->action-reset::action",
			"entity": "current-action",
			"process": "action-reset",
			"port": "action",
			"meta": {}
		},
		"fillup-rows->rows": {
			"id": "fillup-rows->rows",
			"entity": "rows",
			"process": "fillup-rows",
			"meta": {}
		},
		"current-state->render-field::state": {
			"id": "current-state->render-field::state",
			"entity": "element-state",
			"process": "render-field",
			"port": "state",
			"meta": {}
		},
		"tile-size->render-field::tile": {
			"id": "tile-size->render-field::tile",
			"entity": "tile-size",
			"process": "render-field",
			"port": "tile",
			"meta": {}
		},
		"create-element1->element1": {
			"id": "create-element1->element1",
			"entity": "element1",
			"process": "create-element1",
			"meta": {}
		},
		"canvas->get-canvas-ctx::canvas": {
			"id": "canvas->get-canvas-ctx::canvas",
			"entity": "canvas",
			"process": "get-canvas-ctx",
			"port": "canvas",
			"meta": {}
		},
		"get-future-shape->future-shape": {
			"id": "get-future-shape->future-shape",
			"entity": "future-shape",
			"process": "get-future-shape",
			"meta": {}
		},
		"element-state->get-future-shape::state": {
			"id": "element-state->get-future-shape::state",
			"entity": "element-state",
			"process": "get-future-shape",
			"port": "state",
			"meta": {}
		},
		"action->get-new-horizontal-offset::action": {
			"id": "action->get-new-horizontal-offset::action",
			"entity": "current-action",
			"process": "update-state",
			"port": "action",
			"meta": {}
		},
		"rows->render-field::rows": {
			"id": "rows->render-field::rows",
			"entity": "rows",
			"process": "render-field",
			"port": "rows",
			"meta": {}
		},
		"new-element-request->reset-element-state::trigger": {
			"id": "new-element-request->reset-element-state::trigger",
			"entity": "new-element-request",
			"process": "reset-element-state",
			"port": "trigger",
			"meta": {}
		},
		"create-state->current-state": {
			"id": "create-state->current-state",
			"entity": "element-state",
			"process": "reset-element-state",
			"meta": {}
		},
		"pick-random-element->next-element": {
			"id": "pick-random-element->next-element",
			"entity": "current-element",
			"process": "pick-random-element",
			"meta": {}
		},
		"actions->validate-future-shape::actions": {
			"id": "actions->validate-future-shape::actions",
			"entity": "actions",
			"process": "validate-future-shape",
			"port": "actions",
			"meta": {}
		},
		"speed->animate::speed": {
			"id": "speed->animate::speed",
			"entity": "speed",
			"process": "animate",
			"port": "speed",
			"meta": {}
		},
		"future-shape->validate-future-shape::shape": {
			"id": "future-shape->validate-future-shape::shape",
			"entity": "future-shape",
			"process": "validate-future-shape",
			"port": "shape",
			"meta": {}
		},
		"get-keyboard-input->key": {
			"id": "get-keyboard-input->key",
			"entity": "key",
			"process": "get-keyboard-input",
			"meta": {}
		},
		"key->update-rotation::key": {
			"id": "key->update-rotation::key",
			"entity": "key",
			"process": "get-future-shape",
			"port": "key",
			"meta": {}
		},
		"tick->get-future-shape::tick": {
			"id": "tick->get-future-shape::tick",
			"entity": "tick",
			"process": "get-future-shape",
			"port": "tick",
			"meta": {}
		},
		"get-canvas->canvas": {
			"id": "get-canvas->canvas",
			"entity": "canvas",
			"process": "get-canvas",
			"meta": {}
		},
		"actions->get-new-horizontal-offset::actions": {
			"id": "actions->get-new-horizontal-offset::actions",
			"entity": "actions",
			"process": "update-state",
			"port": "actions",
			"meta": {}
		},
		"current-element->update-rotation::el": {
			"id": "current-element->update-rotation::el",
			"entity": "current-element",
			"process": "get-future-shape",
			"port": "el",
			"meta": {}
		},
		"tile-size->update-canvas::tile": {
			"id": "tile-size->update-canvas::tile",
			"entity": "tile-size",
			"process": "update-canvas-size",
			"port": "tile",
			"meta": {}
		},
		"new-element-request->pick-random-element::trigger": {
			"id": "new-element-request->pick-random-element::trigger",
			"entity": "new-element-request",
			"process": "pick-random-element",
			"port": "trigger",
			"meta": {}
		},
		"actions->get-future-shape::actions": {
			"id": "actions->get-future-shape::actions",
			"entity": "actions",
			"process": "get-future-shape",
			"port": "actions",
			"meta": {}
		},
		"rows->validate-future-shape::rows": {
			"id": "rows->validate-future-shape::rows",
			"entity": "rows",
			"process": "validate-future-shape",
			"port": "rows",
			"meta": {}
		},
		"create-rows->rows": {
			"id": "create-rows->rows",
			"entity": "rows",
			"process": "create-rows",
			"meta": {}
		},
		"element2->collect-elements::e2": {
			"id": "element2->collect-elements::e2",
			"entity": "element2",
			"process": "collect-elements",
			"port": "e2",
			"meta": {}
		},
		"validate-future-shape->current-action": {
			"id": "validate-future-shape->current-action",
			"entity": "current-action",
			"process": "validate-future-shape",
			"meta": {}
		},
		"elements->pick-random-element::elements": {
			"id": "elements->pick-random-element::elements",
			"entity": "elements",
			"process": "pick-random-element",
			"port": "elements",
			"meta": {}
		},
		"animate->tick": {
			"id": "animate->tick",
			"entity": "tick",
			"process": "animate",
			"meta": {}
		},
		"actions->action-reset::actions": {
			"id": "actions->action-reset::actions",
			"entity": "actions",
			"process": "action-reset",
			"port": "actions",
			"meta": {}
		},
		"field-size->fillup-rows::size": {
			"id": "field-size->fillup-rows::size",
			"entity": "field-size",
			"process": "fillup-rows",
			"port": "size",
			"meta": {}
		},
		"create-element2->element2": {
			"id": "create-element2->element2",
			"entity": "element2",
			"process": "create-element2",
			"meta": {}
		},
		"element1->collect-elements::e1": {
			"id": "element1->collect-elements::e1",
			"entity": "element1",
			"process": "collect-elements",
			"port": "e1",
			"meta": {}
		}
	},
	"meta": {
		"ui": {
			"layout": []
		}
	}
}

export const graph =
{
	"entities": {
		"tick": {
			"id": "tick",
			"isEvent": true,
			"meta": {
				"ui": {
					"x": -22,
					"y": 825
				}
			}
		},
		"key": {
			"id": "key",
			"isEvent": true,
			"meta": {
				"ui": {
					"x": -158,
					"y": 951
				}
			}
		},
		"element-state": {
			"id": "element-state",
			"meta": {
				"ui": {
					"x": -24,
					"y": -38
				}
			}
		},
		"speed": {
			"id": "speed",
			"value": 1000,
			"meta": {
				"ui": {
					"x": 238,
					"y": 820
				}
			}
		},
		"free-rows": {
			"id": "free-rows",
			"meta": {
				"ui": {
					"x": 267,
					"y": -239
				}
			}
		},
		"element1": {
			"id": "element1",
			"meta": {
				"ui": {
					"x": -1011,
					"y": -297
				}
			}
		},
		"render-ctx": {
			"id": "render-ctx",
			"meta": {
				"ui": {
					"x": -403,
					"y": -379
				}
			}
		},
		"points": {
			"id": "points",
			"meta": {
				"ui": {
					"x": 410,
					"y": -44
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
					"x": -455,
					"y": 534
				}
			}
		},
		"elements": {
			"id": "elements",
			"meta": {
				"ui": {
					"x": -674,
					"y": -40
				}
			}
		},
		"canvas": {
			"id": "canvas",
			"meta": {
				"ui": {
					"x": -404,
					"y": -646
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
					"x": -28,
					"y": -587
				}
			}
		},
		"rows": {
			"id": "rows",
			"meta": {
				"ui": {
					"x": -26,
					"y": -252
				}
			}
		},
		"future-shape": {
			"id": "future-shape",
			"meta": {
				"ui": {
					"x": -164,
					"y": 670
				}
			}
		},
		"current-action": {
			"id": "current-action",
			"isEvent": true,
			"meta": {
				"ui": {
					"x": -169,
					"y": 367
				}
			}
		},
		"element2": {
			"id": "element2",
			"meta": {
				"ui": {
					"x": -1014,
					"y": -156
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
					"x": -280,
					"y": -451
				}
			}
		},
		"element4": {
			"id": "element4",
			"meta": {
				"ui": {
					"x": -1021.7589100571096,
					"y": 99.50477765676284
				}
			}
		},
		"current-element": {
			"id": "current-element",
			"meta": {
				"ui": {
					"x": -300,
					"y": -46
				}
			}
		},
		"new-element-request": {
			"id": "new-element-request",
			"isEvent": true,
			"meta": {
				"ui": {
					"x": -350,
					"y": 111
				}
			}
		},
		"element3": {
			"id": "element3",
			"meta": {
				"ui": {
					"x": -1012,
					"y": -14
				}
			}
		},
		"element5": {
			"id": "element5",
			"meta": {
				"ui": {
					"x": -1016.856839784277,
					"y": 202.4255392621983
				}
			}
		}
	},
	"processes": {
		"create-element1": {
			"id": "create-element1",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tid: \"square\",\n\t\tcolor: \"yellow\",\n\t\ttiles: [\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -1142,
					"y": -299
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
					"x": -484,
					"y": -44
				}
			}
		},
		"create-element3": {
			"id": "create-element3",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tid: \"cross\",\n\t\tcolor: \"#00ff00\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [0, 1]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [1, 2]],\n\t\t\t[[1, 0], [1, 1], [1, 2], [2, 1]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [1, 0]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -1137,
					"y": -12
				}
			}
		},
		"fillup-rows": {
			"id": "fillup-rows",
			"ports": {
				"rows": "hot",
				"size": "hot"
			},
			"code": "function(ports) {\n\tvar col, i,\n\t\t\trows = ports.rows,\n\t\t\tcolSize = ports.size.cols,\n\t\t\trowSize = ports.size.rows\n\t\n\tif (rows.length <= rowSize) {\n\t\tvar newRows = []\n\t\tfor (i = rows.length; i < rowSize; i++) {\n\t\t\tcol = []\n\t\t\tnewRows.unshift(col)\n\t\t}\n\t\trows = newRows.concat(rows)\n\t} else {\n\t\tfor (i = rows.length; i > rowSize; i--) {\n\t\t\tports.rows.shift()\n\t\t}\n\t}\n\t\n\trows.forEach((row) => {\n\t\tif (row.length <= colSize) {\n\t\t\tfor (i = row.length; i < colSize; i++) {\n\t\t\t\trow.push(false)\n\t\t\t}\n\t\t} else {\n\t\t\tfor (i = row.length; i > colSize; i--) {\n\t\t\t\trow.pop()\n\t\t\t}\n\t\t}\n\t})\n\treturn rows\n}",
			"meta": {
				"ui": {
					"x": -31,
					"y": -369
				}
			}
		},
		"reset-points": {
			"id": "reset-points",
			"ports": {},
			"code": "function(ports) {\n\treturn 0\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": 410,
					"y": 71
				}
			}
		},
		"cleanup-rows": {
			"id": "cleanup-rows",
			"ports": {
				"trigger": "hot",
				"rows": "cold"
			},
			"code": "function(ports) {\n\treturn ports.rows.filter(\n\t\t(row) => row.reduce(\n\t\t\t(acc, cell) => acc || !cell, false\n\t\t)\n\t)\n}",
			"meta": {
				"ui": {
					"x": 118,
					"y": -237
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
				"rows": "hot",
				"els": "cold"
			},
			"code": "function(ports) {\n\tfunction drawTile (x, y, color) {\n\t\tports.ctx.fillStyle = color\n\t\tports.ctx.fillRect(\n\t\t\tx * (ports.tile.edge + ports.tile.margin),\n\t\t\ty * (ports.tile.edge + ports.tile.margin),\n\t\t\tports.tile.edge,\n\t\t\tports.tile.edge\n\t\t)\n\t}\n\t\n\tports.rows.forEach((row, y) => {\n\t\trow.forEach((elId, x) => {\n\t\t\tvar color = elId ? ports.els[elId].color : \"#eee\"\n\t\t\tdrawTile(x, y, color)\n\t\t})\n\t})\n\t\n\tif (ports.el) {\n\t\tvar tiles = ports.el.tiles[ports.state.rotation],\n\t\t\t\tcolor = ports.el.color, \n\t\t\t\tpos = ports.state.position\n\t\ttiles.forEach((tile) => {\n\t\t\tdrawTile(tile[0] + pos[0], tile[1] + pos[1], color)\n\t\t})\n\t}\n}",
			"meta": {
				"ui": {
					"x": -287,
					"y": -274
				}
			}
		},
		"create-element4": {
			"id": "create-element4",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tid: \"lleft\",\n\t\tcolor: \"#ffbb00\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [2, 2]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [2, 0]],\n\t\t\t[[1, 0], [1, 1], [1, 2], [0, 0]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [0, 2]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -1135,
					"y": 98
				}
			}
		},
		"animate": {
			"id": "animate",
			"ports": {
				"speed": "hot",
				"points": "hot"
			},
			"code": "function(ports, send) {\n\tvar i = setInterval(\n\t\tfunction() { send(true) },\n\t\tports.speed - ports.points * 10\n\t)\n\t\n\treturn function() {\n\t\tclearInterval(i)\n\t}\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": 117,
					"y": 827
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
					"x": 121,
					"y": -32
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
			"code": "function(ports, send) {\n\tvar pos = ports.state.position,\n\t\t\tshape =  ports.el.tiles[ports.state.rotation]\n\t\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]]),\n\t\t\top, newShape\n\t\n\tif(ports.tick || ports.key == \"down\") {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0], \n\t\t\ttile[1] + 1\n\t\t])\n\t\top = ports.actions.MOVE_DOWN\n\t}\n\t\n\tif(ports.key == \"right\") {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0] + 1,\n\t\t\ttile[1]\n\t\t])\n\t\top = ports.actions.MOVE_RIGHT\n\t}\n\t\n\tif(ports.key == \"left\") {\n\t\tnewShape = shape.map((tile) => [\n\t\t\ttile[0] - 1,\n\t\t\ttile[1]\n\t\t])\n\t\top = ports.actions.MOVE_LEFT\n\t}\n\t\n\tif(ports.key == \"up\") {\n\t\tnewShape = ports.el.tiles[(ports.state.rotation + 3) % 4]\n\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]]),\n\t\top = ports.actions.ROTATE_LEFT\n\t}\n\t\n\tif (op) send({\n\t\tshape: newShape,\n\t\taction: op\n\t})\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": -162,
					"y": 828
				}
			}
		},
		"get-keyboard-input": {
			"id": "get-keyboard-input",
			"ports": {},
			"code": "function(ports, send) {\n\tvar oldE = null,\n\t\t\tnewE = null\n\t\n\tfunction keyup(e) {\n\t\tnewE = oldE = null\n\t}\n\t\n\tfunction keydown(e) {\n\t\tswitch (e.keyCode) {\n        case 37:\n            newE = 'left';\n            break;\n        case 38:\n            newE = 'up';\n            break;\n        case 39:\n            newE = 'right';\n            break;\n        case 40:\n            send('down');\n            break;\n    }\n\t\t\n\t\tif (newE != oldE) {\n\t\t\tsend(newE)\n\t\t\toldE = newE\n\t\t}\n\t}\n\t\n\tdocument.addEventListener(\"keydown\", keydown)\n\tdocument.addEventListener(\"keyup\", keyup)\n\t\n\treturn function() {\n\t\tdocument.removeEventListener(\"keydown\", keydown)\n\t\tdocument.removeEventListener(\"keyup\", keyup)\n\t}\n}",
			"autostart": true,
			"async": true,
			"meta": {
				"ui": {
					"x": -162,
					"y": 1068
				}
			}
		},
		"update-points": {
			"id": "update-points",
			"ports": {
				"rows": "hot",
				"points": "accumulator",
				"size": "cold"
			},
			"code": "function(ports) {\n\tvar points = ports.points\n\tif (ports.rows.length) {\n\t\tpoints += ports.size.rows - ports.rows.length\n\t}\n\treturn points\n}",
			"meta": {
				"ui": {
					"x": 274,
					"y": -41
				}
			}
		},
		"create-element2": {
			"id": "create-element2",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tid: \"long\", \n\t\tcolor: \"cyan\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [1, 3]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [3, 1]],\n\t\t\t[[2, 0], [2, 1], [2, 2], [2, 3]],\n\t\t\t[[0, 2], [1, 2], [2, 2], [3, 2]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -1147,
					"y": -154
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
					"x": 389,
					"y": -241
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
					"x": -405,
					"y": -490
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
					"x": -165,
					"y": 525
				}
			}
		},
		"action-reset": {
			"id": "action-reset",
			"ports": {
				"action": "hot",
				"actions": "cold",
				"rows": "cold",
				"el": "cold",
				"state": "cold"
			},
			"code": "function(ports, send) {\n\tif (ports.action === ports.actions.DOCK_BOTTOM) {\n\t\t\n\t\tvar pos = ports.state.position,\n\t\t\t\tshape = ports.el.tiles[ports.state.rotation]\n\t\t\t\t\t.map((tile) => [tile[0] + pos[0], tile[1] + pos[1]])\n\t\t\t\t\n\t\tshape.forEach((tile) => {\n\t\t\tports.rows[tile[1]][tile[0]] = ports.el.id\n\t\t})\n\t\t\n\t\tsend()\n\t}\n}",
			"async": true,
			"meta": {
				"ui": {
					"x": -207,
					"y": 201
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
					"x": -28,
					"y": 91
				}
			}
		},
		"create-element5": {
			"id": "create-element5",
			"ports": {},
			"code": "function(ports) {\n\treturn {\n\t\tid: \"lright\",\n\t\tcolor: \"#ff88ff\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [0, 2]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [0, 0]],\n\t\t\t[[1, 0], [1, 1], [1, 2], [2, 0]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [2, 2]]\n\t\t]\n\t}\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -1135,
					"y": 203
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
			"code": "function(ports) {\n\tvar c = ports.canvas,\n\t\t\tcols = ports.field.cols,\n\t\t\trows = ports.field.rows,\n\t\t\tedge = ports.tile.edge,\n\t\t\tmargin = ports.tile.margin\n\t\n\tc.width = cols * edge + (cols - 1) * margin\n\tc.height = rows * edge + (rows - 1) * margin\n}",
			"meta": {
				"ui": {
					"x": -271,
					"y": -611
				}
			}
		},
		"collect-elements": {
			"id": "collect-elements",
			"ports": {
				"e1": "hot",
				"e2": "hot",
				"e3": "hot",
				"e4": "hot",
				"e5": "hot"
			},
			"code": "function(ports) {\n\tvar els = {}\n\t\n\tObject.keys(ports).forEach((k) => {\n\t\tvar el = ports[k]\n\t\tels[el.id] = el\n\t})\n\t\n \treturn els\n}",
			"meta": {
				"ui": {
					"x": -815,
					"y": -43
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
					"x": -409,
					"y": -779
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
		"current-element->action-reset::el": {
			"id": "current-element->action-reset::el",
			"entity": "current-element",
			"process": "action-reset",
			"port": "el",
			"meta": {}
		},
		"render-ctx->render-field::ctx": {
			"id": "render-ctx->render-field::ctx",
			"entity": "render-ctx",
			"process": "render-field",
			"port": "ctx",
			"meta": {}
		},
		"points->animate::points": {
			"id": "points->animate::points",
			"entity": "points",
			"process": "animate",
			"port": "points",
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
		"rows->action-reset::rows": {
			"id": "rows->action-reset::rows",
			"entity": "rows",
			"process": "action-reset",
			"port": "rows",
			"meta": {}
		},
		"create-element5->element5": {
			"id": "create-element5->element5",
			"entity": "element5",
			"process": "create-element5",
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
		"field-size->update-points::size": {
			"id": "field-size->update-points::size",
			"entity": "field-size",
			"process": "update-points",
			"port": "size",
			"meta": {}
		},
		"rows->cleanup-rows::rows": {
			"id": "rows->cleanup-rows::rows",
			"entity": "rows",
			"process": "cleanup-rows",
			"port": "rows",
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
		"update-points->points": {
			"id": "update-points->points",
			"entity": "points",
			"process": "update-points",
			"meta": {}
		},
		"create-rows->free-rows": {
			"id": "create-rows->free-rows",
			"entity": "free-rows",
			"process": "create-rows",
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
		"element5->collect-elements::e5": {
			"id": "element5->collect-elements::e5",
			"entity": "element5",
			"process": "collect-elements",
			"port": "e5",
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
		"elements->render-field::els": {
			"id": "elements->render-field::els",
			"entity": "elements",
			"process": "render-field",
			"port": "els",
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
		"reset-points->points": {
			"id": "reset-points->points",
			"entity": "points",
			"process": "reset-points",
			"meta": {}
		},
		"speed->animate::speed": {
			"id": "speed->animate::speed",
			"entity": "speed",
			"process": "animate",
			"port": "speed",
			"meta": {}
		},
		"cleanup-rows->free-rows": {
			"id": "cleanup-rows->free-rows",
			"entity": "free-rows",
			"process": "cleanup-rows",
			"meta": {}
		},
		"free-rows->update-points::rows": {
			"id": "free-rows->update-points::rows",
			"entity": "free-rows",
			"process": "update-points",
			"port": "rows",
			"meta": {}
		},
		"future-shape->validate-future-shape::shape": {
			"id": "future-shape->validate-future-shape::shape",
			"entity": "future-shape",
			"process": "validate-future-shape",
			"port": "shape",
			"meta": {}
		},
		"element4->collect-elements::e4": {
			"id": "element4->collect-elements::e4",
			"entity": "element4",
			"process": "collect-elements",
			"port": "e4",
			"meta": {}
		},
		"new-element-request->cleanup-rows::trigger": {
			"id": "new-element-request->cleanup-rows::trigger",
			"entity": "new-element-request",
			"process": "cleanup-rows",
			"port": "trigger",
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
		"create-element3->element3": {
			"id": "create-element3->element3",
			"entity": "element3",
			"process": "create-element3",
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
		"free-rows->fillup-rows::rows": {
			"id": "free-rows->fillup-rows::rows",
			"entity": "free-rows",
			"process": "fillup-rows",
			"port": "rows",
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
		"create-element4->element4": {
			"id": "create-element4->element4",
			"entity": "element4",
			"process": "create-element4",
			"meta": {}
		},
		"element-state->action-reset::state": {
			"id": "element-state->action-reset::state",
			"entity": "element-state",
			"process": "action-reset",
			"port": "state",
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
		"element3->collect-elements::e3": {
			"id": "element3->collect-elements::e3",
			"entity": "element3",
			"process": "collect-elements",
			"port": "e3",
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

export const graph =
{
	"entities": {
		"current-state": {
			"id": "current-state",
			"meta": {
				"ui": {
					"x": 230,
					"y": -110
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
		"field": {
			"id": "field",
			"meta": {
				"ui": {
					"x": -2,
					"y": -290
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
					"x": -6,
					"y": -557
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
					"x": -620.6448160535117,
					"y": -100.62243676839464
				}
			}
		}
	},
	"processes": {
		"create-element1": {
			"id": "create-element1",
			"ports": {},
			"code": "function(ports) {\n\treturn this.fromJS({\n\t\tcolor: \"yellow\",\n\t\ttiles: [\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]],\n\t\t\t[[0, 0], [0, 1], [1, 0], [1, 1]]\n\t\t]\n\t})\n}",
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
				"e1": "cold",
				"e2": "cold"
			},
			"code": "function(ports) {\n\tvar keys = Object.keys(ports),\n\t\t\ti = Math.floor(Math.random() * keys.length)\n\treturn ports[keys[i]]\n}",
			"meta": {
				"ui": {
					"x": -732.9202341137124,
					"y": -204.87059730351172
				}
			}
		},
		"render-field": {
			"id": "render-field",
			"ports": {
				"field": "hot",
				"ctx": "hot",
				"tile": "hot",
				"state": "hot",
				"el": "hot"
			},
			"code": "function(ports) {\n\tfunction drawTile (x, y, color) {\n\t\tports.ctx.fillStyle = color\n\t\tports.ctx.fillRect(\n\t\t\tx * (ports.tile.edge + ports.tile.margin),\n\t\t\ty * (ports.tile.edge + ports.tile.margin),\n\t\t\tports.tile.edge,\n\t\t\tports.tile.edge\n\t\t)\n\t}\n\t\n\tports.field.forEach((row, y) => {\n\t\trow.forEach((col, x) => {\n\t\t\tdrawTile(x, y, col || \"lightgray\")\n\t\t})\n\t})\n\t\n\tif (ports.el) {\n\t\tvar tiles = ports.el.getIn([\"tiles\", ports.state.get('rotation')]),\n\t\t\t\tcolor = ports.el.get('color'),\n\t\t\t\tpos = ports.state.get('position')\n\t\ttiles.forEach((tile) => {\n\t\t\tdrawTile(tile.get(0) + pos.get(0), tile.get(1) + pos.get(1), color)\n\t\t})\n\t}\n}",
			"meta": {
				"ui": {
					"x": -201,
					"y": -104
				}
			}
		},
		"create-field": {
			"id": "create-field",
			"ports": {
				"size": "hot"
			},
			"code": "function(ports) {\n\tvar col = this.Repeat(null, ports.size.cols)\n\tvar rows = this.Repeat(col, ports.size.rows)\n\treturn rows\n}",
			"meta": {
				"ui": {
					"x": -3,
					"y": -421
				}
			}
		},
		"create-element2": {
			"id": "create-element2",
			"ports": {},
			"code": "function(ports) {\n\treturn this.fromJS({\n\t\tcolor: \"cyan\",\n\t\ttiles: [\n\t\t\t[[1, 0], [1, 1], [1, 2], [1, 3]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [3, 1]],\n\t\t\t[[1, 0], [1, 1], [1, 2], [1, 3]],\n\t\t\t[[0, 1], [1, 1], [2, 1], [3, 1]]\n\t\t]\n\t})\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": -840,
					"y": -510
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
		"initial-state": {
			"id": "initial-state",
			"ports": {
				"size": "hot"
			},
			"code": "function(ports) {\n\treturn this.fromJS({\n\t\tposition: [Math.floor((ports.size.cols - 1) / 2), 0],\n\t\trotation: 0\n\t})\n}",
			"autostart": true,
			"meta": {
				"ui": {
					"x": 231,
					"y": -252
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
					"x": -116,
					"y": -686
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
		"next-element->render-field::el": {
			"id": "next-element->render-field::el",
			"entity": "current-element",
			"process": "render-field",
			"port": "el",
			"meta": {}
		},
		"element1->pick-random-element::e1": {
			"id": "element1->pick-random-element::e1",
			"entity": "element1",
			"process": "pick-random-element",
			"port": "e1",
			"meta": {}
		},
		"field-size->initial-state::size": {
			"id": "field-size->initial-state::size",
			"entity": "field-size",
			"process": "initial-state",
			"port": "size",
			"meta": {}
		},
		"current-state->render-field::state": {
			"id": "current-state->render-field::state",
			"entity": "current-state",
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
		"field-size->create-field::size": {
			"id": "field-size->create-field::size",
			"entity": "field-size",
			"process": "create-field",
			"port": "size",
			"meta": {}
		},
		"field->render-field::field": {
			"id": "field->render-field::field",
			"entity": "field",
			"process": "render-field",
			"port": "field",
			"meta": {}
		},
		"create-state->current-state": {
			"id": "create-state->current-state",
			"entity": "current-state",
			"process": "initial-state",
			"meta": {}
		},
		"pick-random-element->next-element": {
			"id": "pick-random-element->next-element",
			"entity": "current-element",
			"process": "pick-random-element",
			"meta": {}
		},
		"get-canvas->canvas": {
			"id": "get-canvas->canvas",
			"entity": "canvas",
			"process": "get-canvas",
			"meta": {}
		},
		"tile-size->update-canvas::tile": {
			"id": "tile-size->update-canvas::tile",
			"entity": "tile-size",
			"process": "update-canvas-size",
			"port": "tile",
			"meta": {}
		},
		"element2->pick-random-element::e2": {
			"id": "element2->pick-random-element::e2",
			"entity": "element2",
			"process": "pick-random-element",
			"port": "e2",
			"meta": {}
		},
		"create-element2->element2": {
			"id": "create-element2->element2",
			"entity": "element2",
			"process": "create-element2",
			"meta": {}
		},
		"create-field->field": {
			"id": "create-field->field",
			"entity": "field",
			"process": "create-field",
			"meta": {}
		}
	},
	"meta": {
		"ui": {
			"layout": []
		}
	}
}

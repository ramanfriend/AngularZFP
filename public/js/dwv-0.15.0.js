/*! dwv 0.15.0 21-07-2016 */
var dwv = dwv || {},
    Kinetic = Kinetic || {};
dwv.App = function() {
    function a(a) {
        v.reset(), B = a.length;
        var b = new dwv.io.File;
        b.setDecoderScripts(C), b.setDefaultCharacterSet(u), b.onload = function(a) {
            w && (J.append(a.view), T && e(w.getNumberOfFrames())), t(a)
        }, b.onerror = function(a) {
            q(a)
        }, b.onloadend = function() {
            T && f(), g({
                type: "load-end"
            })
        }, b.onprogress = r, g({
            type: "load-start"
        }), b.load(a)
    }

    function b(a) {
        var b = new dwv.io.File;
        b.onload = function(a) {
            var b = new dwv.State(v);
            b.fromJSON(a, g)
        }, b.onerror = function(a) {
            q(a)
        }, b.load([a])
    }

    function c(a, b) {
        v.reset(), B = a.length;
        var c = new dwv.io.Url;
        c.setDecoderScripts(C), c.setDefaultCharacterSet(u), c.onload = function(a) {
            w && (J.append(a.view), T && e(w.getNumberOfFrames())), t(a)
        }, c.onerror = function(a) {
            q(a)
        }, c.onloadend = function() {
            T && f(), g({
                type: "load-end"
            })
        }, c.onprogress = r, g({
            type: "load-start"
        }), c.load(a, b)
    }

    function d(a) {
        var b = new dwv.io.Url;
        b.onload = function(a) {
            var b = new dwv.State(v);
            b.fromJSON(a, g)
        }, b.onerror = function(a) {
            q(a)
        }, b.load([a])
    }

    function e(a) {
        S.push([]);
        for (var b = 0; b < a; ++b) {
            var c = new Kinetic.Layer({
                listening: !1,
                hitGraphEnabled: !1,
                visible: !1
            });
            S[S.length - 1].push(c), T.add(c)
        }
    }

    function f() {
        for (var a = 0; a < S.length; ++a)
            for (var b = 0; b < S[a].length; ++b) S[a][b].visible(!1);
        var c = v.getDrawLayer();
        c.visible(!0), c.draw()
    }

    function g(a) {
        if ("undefined" != typeof Z[a.type])
            for (var b = 0; b < Z[a.type].length; ++b) Z[a.type][b](a)
    }

    function h() {
        J.generateImageData(y), R.setImageData(y), R.draw()
    }

    function i() {
        if (R && (R.zoom(G, G, H.x, H.y), R.draw()), T) {
            var a = {
                    x: G,
                    y: G
                },
                b = T.scale(),
                c = T.offset(),
                d = H.x / b.x + c.x - H.x / a.x,
                e = H.y / b.y + c.y - H.y / a.y,
                f = {
                    x: d,
                    y: e
                };
            T.offset(f), T.scale(a), T.draw()
        }
    }

    function j() {
        if (R && (R.translate(I.x, I.y), R.draw()), T && R) {
            var a = -R.getOrigin().x / G - I.x,
                b = -R.getOrigin().y / G - I.y;
            T.offset({
                x: a,
                y: b
            }), T.draw()
        }
    }

    function k() {
        M && J.addEventListener("wl-change", M.update), L && J.addEventListener("wl-change", L.update), O && (J.addEventListener("wl-change", O.update), J.addEventListener("colour-change", O.update)), N && (J.addEventListener("position-change", N.update), J.addEventListener("frame-change", N.update)), P = !0
    }

    function l() {
        M && J.removeEventListener("wl-change", M.update), L && J.removeEventListener("wl-change", L.update), O && (J.removeEventListener("wl-change", O.update), J.removeEventListener("colour-change", O.update)), N && (J.removeEventListener("position-change", N.update), J.removeEventListener("frame-change", N.update)), P = !1
    }

    function m(a) {
        var b = !1,
            c = null,
            d = null;
        if ("touchstart" === a.type || "touchmove" === a.type ? (c = dwv.html.getEventOffset(a), a._xs = c[0].x, a._ys = c[0].y, d = v.getImageLayer().displayToIndex(c[0]), a._x = parseInt(d.x, 10), a._y = parseInt(d.y, 10), 2 === c.length && (a._x1s = c[1].x, a._y1s = c[1].y, d = v.getImageLayer().displayToIndex(c[1]), a._x1 = parseInt(d.x, 10), a._y1 = parseInt(d.y, 10)), b = !0) : "mousemove" === a.type || "mousedown" === a.type || "mouseup" === a.type || "mouseout" === a.type || "mousewheel" === a.type || "dblclick" === a.type || "DOMMouseScroll" === a.type ? (c = dwv.html.getEventOffset(a), a._xs = c[0].x, a._ys = c[0].y, d = v.getImageLayer().displayToIndex(c[0]), a._x = parseInt(d.x, 10), a._y = parseInt(d.y, 10), b = !0) : "keydown" !== a.type && "touchend" !== a.type || (b = !0), b) {
            "keydown" !== a.type && a.preventDefault();
            var e = v.getToolbox().getSelectedTool()[a.type];
            e && e(a)
        }
    }

    function n(a) {
        a.stopPropagation(), a.preventDefault();
        var b = v.getElement("dropBox");
        b && (b.className = "dropBox hover")
    }

    function o(a) {
        a.stopPropagation(), a.preventDefault();
        var b = v.getElement("dropBox hover");
        b && (b.className = "dropBox")
    }

    function p(a) {
        a.stopPropagation(), a.preventDefault(), v.loadFiles(a.dataTransfer.files)
    }

    function q(a) {
        a.name && a.message ? alert(a.name + ": " + a.message + ".") : alert("Error: " + a + "."), a.stack && console.error(a.stack)
    }

    function r(a) {
        if (g(a), a.lengthComputable) {
            var b = Math.round(a.loaded / a.total * 100);
            dwv.gui.displayProgress(b)
        }
    }

    function s(a, b) {
        var c = v.getElement("imageLayer");
        R = new dwv.html.Layer(c), R.initialise(a, b), R.fillContext(), R.setStyleDisplay(!0);
        var d = v.getElement("drawDiv");
        d && (T = new Kinetic.Stage({
            container: d,
            width: a,
            height: b,
            listening: !1
        }), T.getContent().setAttribute("style", "")), F ? v.fitToSize(dwv.gui.getWindowSize()) : v.fitToSize({
            width: v.getElement("layerContainer").offsetWidth,
            height: v.getElement("layerContainer").offsetHeight
        }), v.resetLayout()
    }

    function t(a) {
        if (!J) {
            J = a.view, K = new dwv.ViewController(J), Q && Q.initialise(a.info), x = J.getImage(), w = x;
            var b = w.getGeometry().getSize();
            z = b.getNumberOfColumns(), A = b.getNumberOfRows(), s(z, A), y = R.getContext().createImageData(z, A), J.addEventListener("wl-change", v.onWLChange), J.addEventListener("colour-change", v.onColourChange), J.addEventListener("slice-change", v.onSliceChange), J.addEventListener("frame-change", v.onFrameChange), J.addEventListener("wl-change", g), J.addEventListener("colour-change", g), J.addEventListener("position-change", g), J.addEventListener("slice-change", g), J.addEventListener("frame-change", g), K.updatePresets(w, !0), V && (v.addLayerListeners(R.getCanvas()), window.addEventListener("keydown", m, !0), V.init(), V.display(!0)), T && e(w.getNumberOfFrames());
            var c = v.getElement("dropBox");
            if (c) {
                c.removeEventListener("dragover", n), c.removeEventListener("dragleave", o), c.removeEventListener("drop", p), dwv.html.removeNode(c);
                var d = v.getElement("layerContainer");
                d.addEventListener("dragover", n), d.addEventListener("dragleave", o), d.addEventListener("drop", p)
            }
            var f = v.getElement("infoLayer");
            if (f) {
                var h = v.getElement("infotr");
                h && (M = new dwv.info.Windowing(h), M.create());
                var i = v.getElement("infotl");
                i && (N = new dwv.info.Position(i), N.create());
                var j = v.getElement("infobr");
                j && (O = new dwv.info.MiniColourMap(j, v), O.create());
                var l = v.getElement("plot");
                l && (L = new dwv.info.Plot(l, v), L.create()), k()
            }
            v.initWLDisplay()
        }
    }
    var u, v = this,
        w = null,
        x = null,
        y = null,
        z = 0,
        A = 0,
        B = 0,
        C = null,
        D = null,
        E = 1,
        F = !1,
        G = 1,
        H = {
            x: 0,
            y: 0
        },
        I = {
            x: 0,
            y: 0
        },
        J = null,
        K = null,
        L = null,
        M = null,
        N = null,
        O = null,
        P = !1,
        Q = null,
        R = null,
        S = [],
        T = null,
        U = new dwv.html.Style,
        V = null,
        W = null,
        X = null,
        Y = null,
        Z = {};
    this.getVersion = function() {
        return "v0.15.0"
    }, this.getImage = function() {
        return w
    }, this.setImage = function(a) {
        w = a, J.setImage(a)
    }, this.restoreOriginalImage = function() {
        w = x, J.setImage(x)
    }, this.getImageData = function() {
        return y
    }, this.getNSlicesToLoad = function() {
        return B
    }, this.getScale = function() {
        return G / E
    }, this.getScaleCenter = function() {
        return H
    }, this.getTranslation = function() {
        return I
    }, this.getViewController = function() {
        return K
    }, this.getImageLayer = function() {
        return R
    }, this.getDrawLayer = function(a, b) {
        var c = "undefined" == typeof a ? J.getCurrentPosition().k : a,
            d = "undefined" == typeof b ? J.getCurrentFrame() : b;
        return S[c][d]
    }, this.getDrawStage = function() {
        return T
    }, this.getStyle = function() {
        return U
    }, this.getToolbox = function() {
        return V
    }, this.getToolboxController = function() {
        return W
    }, this.addToUndoStack = function(a) {
        null !== Y && Y.add(a)
    }, this.init = function(a) {
        if (D = a.containerDivId, a.tools && 0 !== a.tools.length) {
            for (var b = {}, c = 0; c < a.tools.length; ++c) {
                var e = a.tools[c];
                if ("Draw" === e) {
                    if (0 !== a.shapes) {
                        for (var f = {}, h = 0; h < a.shapes.length; ++h) {
                            var i = a.shapes[h],
                                j = i + "Factory";
                            "undefined" != typeof dwv.tool[j] ? f[i] = dwv.tool[j] : console.warn("Could not initialise unknown shape: " + i)
                        }
                        b.Draw = new dwv.tool.Draw(this, f), b.Draw.addEventListener("draw-create", g), b.Draw.addEventListener("draw-change", g), b.Draw.addEventListener("draw-move", g), b.Draw.addEventListener("draw-delete", g)
                    }
                } else if ("Filter" === e) {
                    if (0 !== a.filters.length) {
                        for (var k = {}, l = 0; l < a.filters.length; ++l) {
                            var m = a.filters[l];
                            "undefined" != typeof dwv.tool.filter[m] ? k[m] = new dwv.tool.filter[m](this) : console.warn("Could not initialise unknown filter: " + m)
                        }
                        b.Filter = new dwv.tool.Filter(k, this)
                    }
                } else {
                    var q = e;
                    "undefined" != typeof dwv.tool[q] ? b[q] = new dwv.tool[q](this) : console.warn("Could not initialise unknown tool: " + e)
                }
            }
            V = new dwv.tool.Toolbox(b, this), W = new dwv.ToolboxController(V)
        }
        if (a.gui) {
            if (a.gui.indexOf("tool") !== -1 && V && V.setup(), a.gui.indexOf("load") !== -1) {
                for (var r = {}, s = 0; s < a.loaders.length; ++s) {
                    var t = a.loaders[s],
                        v = t + "Load";
                    "undefined" != typeof dwv.gui[v] ? r[t] = new dwv.gui[v](this) : console.warn("Could not initialise unknown loader: " + t)
                }
                X = new dwv.gui.Loadbox(this, r), X.setup();
                for (var w = Object.keys(r), x = 0; x < w.length; ++x) r[w[x]].setup();
                X.displayLoader(w[0])
            }
            if (a.gui.indexOf("undo") !== -1 && (Y = new dwv.tool.UndoStack(this), Y.setup()), a.gui.indexOf("tags") !== -1 && (Q = new dwv.gui.DicomTags(this)), a.gui.indexOf("version") !== -1 && dwv.gui.appendVersionHtml(this.getVersion()), a.gui.indexOf("help") !== -1) {
                var y = !0;
                a.isMobile && (y = a.isMobile), dwv.gui.appendHelpHtml(V.getToolList(), y, this)
            }
        }
        var z = this.getElement("dropBox");
        if (z) {
            z.addEventListener("dragover", n), z.addEventListener("dragleave", o), z.addEventListener("drop", p);
            var A = dwv.gui.getWindowSize(),
                B = 2 * A.height / 3;
            z.setAttribute("style", "width:" + B + "px;height:" + B + "px")
        }
        if ("undefined" == typeof a.skipLoadUrl) {
            var E = dwv.utils.getUriQuery(window.location.href);
            if (E && "undefined" != typeof E.input && (dwv.utils.decodeQuery(E, this.onInputURLs), "undefined" != typeof E.state)) {
                var G = function() {
                    d(E.state)
                };
                this.addEventListener("load-end", G)
            }
        } else console.log("Not loading url from address since skipLoadUrl is defined.");
        if (a.fitToWindow && (F = !0, window.onresize = this.onResize), a.useWebWorkers) {
            var H = "../..";
            C = [], C.jpeg2000 = H + "/ext/pdfjs/decode-jpeg2000.js", C["jpeg-lossless"] = H + "/ext/rii-mango/decode-jpegloss.js", C["jpeg-baseline"] = H + "/ext/notmasteryet/decode-jpegbaseline.js"
        }
        "undefined" != typeof a.defaultCharacterSet && (u = a.defaultCharacterSet)
    }, this.getElement = function(a) {
        return dwv.gui.getElement(D, a)
    }, this.reset = function() {
        V && V.reset(), T && (S = []), w = null, J = null, B = 0, Y && (Y = new dwv.tool.UndoStack(this), Y.initialise())
    }, this.resetLayout = function() {
        G = E, H = {
            x: 0,
            y: 0
        }, I = {
            x: 0,
            y: 0
        }, R && (R.resetLayout(E), R.draw()), T && (T.offset({
            x: 0,
            y: 0
        }), T.scale({
            x: E,
            y: E
        }), T.draw())
    }, this.addEventListener = function(a, b) {
        "undefined" == typeof Z[a] && (Z[a] = []), Z[a].push(b)
    }, this.removeEventListener = function(a, b) {
        if ("undefined" != typeof Z[a])
            for (var c = 0; c < Z[a].length; ++c) Z[a][c] === b && Z[a].splice(c, 1)
    }, this.loadFiles = function(c) {
        var d = c[0].name.split(".").pop().toLowerCase();
        "json" === d ? b(c[0]) : a(c)
    }, this.loadURLs = function(a, b) {
        var e = a[0].split(".").pop().toLowerCase();
        "json" === e ? d(a[0]) : c(a, b)
    }, this.fitToSize = function(a) {
        var b = parseInt(E * z, 10);
        E = Math.min(a.width / z, a.height / A);
        var c = parseInt(E * z, 10),
            d = parseInt(E * A, 10),
            e = c / b;
        G *= e, U.setScale(E);
        var f = this.getElement("layerContainer");
        if (f.setAttribute("style", "width:" + c + "px;height:" + d + "px"), R && (R.setWidth(c), R.setHeight(d), R.zoom(G, G, 0, 0), R.draw()), T) {
            var g = this.getElement("drawDiv");
            g.setAttribute("style", "width:" + c + "px;height:" + d + "px"), T.setWidth(c), T.setHeight(d), T.scale({
                x: G,
                y: G
            }), T.draw()
        }
    }, this.toggleInfoLayerDisplay = function() {
        var a = v.getElement("infoLayer");
        dwv.html.toggleDisplay(a), P ? l() : k()
    }, this.initWLDisplay = function() {
        var a = K.getPresets(),
            b = Object.keys(a);
        K.setWindowLevel(a[b[0]].center, a[b[0]].width), K.setCurrentPosition2D(0, 0), K.setCurrentFrame(0)
    }, this.addLayerListeners = function(a) {
        a.setAttribute("style", "pointer-events: auto;"), a.addEventListener("mousedown", m), a.addEventListener("mousemove", m), a.addEventListener("mouseup", m), a.addEventListener("mouseout", m), a.addEventListener("mousewheel", m), a.addEventListener("DOMMouseScroll", m), a.addEventListener("dblclick", m), a.addEventListener("touchstart", m), a.addEventListener("touchmove", m), a.addEventListener("touchend", m)
    }, this.removeLayerListeners = function(a) {
        a.setAttribute("style", "pointer-events: none;"), a.removeEventListener("mousedown", m), a.removeEventListener("mousemove", m), a.removeEventListener("mouseup", m), a.removeEventListener("mouseout", m), a.removeEventListener("mousewheel", m), a.removeEventListener("DOMMouseScroll", m), a.removeEventListener("dblclick", m), a.removeEventListener("touchstart", m), a.removeEventListener("touchmove", m), a.removeEventListener("touchend", m)
    }, this.render = function() {
        h()
    }, this.zoom = function(a, b, c) {
        G = a * E, G <= .1 && (G = .1), H = {
            x: b,
            y: c
        }, i()
    }, this.stepZoom = function(a, b, c) {
        G += a, G <= .1 && (G = .1), H = {
            x: b,
            y: c
        }, i()
    }, this.translate = function(a, b) {
        I = {
            x: a,
            y: b
        }, j()
    }, this.stepTranslate = function(a, b) {
        var c = I.x + a / G,
            d = I.y + b / G;
        I = {
            x: c,
            y: d
        }, j()
    }, this.onWLChange = function() {
        h()
    }, this.onColourChange = function() {
        h()
    }, this.onFrameChange = function() {
        h(), T && f()
    }, this.onSliceChange = function() {
        h(), T && f()
    }, this.onKeydown = function(a) {
        a.ctrlKey && (37 === a.keyCode ? (a.preventDefault(), v.getViewController().decrementFrameNb()) : 38 === a.keyCode ? (a.preventDefault(), v.getViewController().incrementSliceNb()) : 39 === a.keyCode ? (a.preventDefault(), v.getViewController().incrementFrameNb()) : 40 === a.keyCode ? (a.preventDefault(), v.getViewController().decrementSliceNb()) : 89 === a.keyCode ? Y.redo() : 90 === a.keyCode && Y.undo())
    }, this.onResize = function() {
        v.fitToSize(dwv.gui.getWindowSize())
    }, this.onZoomReset = function() {
        v.resetLayout()
    }, this.onChangeLoader = function() {
        X.displayLoader(this.value)
    }, this.resetLoadbox = function() {
        X.reset()
    }, this.onChangeURL = function(a) {
        v.loadURLs([a.target.value])
    }, this.onInputURLs = function(a, b) {
        v.loadURLs(a, b)
    }, this.onChangeFiles = function(a) {
        var b = a.target.files;
        0 !== b.length && v.loadFiles(b)
    }, this.onStateSave = function() {
        var a = new dwv.State(v),
            b = v.getElement("download-state");
        b.href = "data:application/json," + a.toJSON()
    }, this.onChangeColourMap = function() {
        K.setColourMapFromName(this.value)
    }, this.onChangeWindowLevelPreset = function() {
        var a = this.value,
            b = K.getPresets()[a];
        if (!b) throw new Error("Unknown window level preset: '" + a + "'");
        K.setWindowLevel(b.center, b.width)
    }, this.onChangeTool = function() {
        W.setSelectedTool(this.value)
    }, this.onChangeShape = function() {
        W.setSelectedShape(this.value)
    }, this.onChangeFilter = function() {
        W.setSelectedFilter(this.value)
    }, this.onRunFilter = function() {
        W.runSelectedFilter()
    }, this.onChangeLineColour = function() {
        W.setLineColour(this.value)
    }, this.onChangeMinMax = function(a) {
        W.setRange(a)
    }, this.onUndo = function() {
        Y.undo()
    }, this.onRedo = function() {
        Y.redo()
    }, this.onToggleInfoLayer = function() {
        v.toggleInfoLayerDisplay()
    }, this.onDisplayReset = function() {
        v.resetLayout(), v.initWLDisplay();
        var a = v.getElement("presetSelect");
        a && (a.selectedIndex = 0, dwv.gui.refreshElement(a))
    }
};
var dwv = dwv || {},
    Kinetic = Kinetic || {};
dwv.State = function(a) {
    function b(b, c) {
        a.getViewController().setWindowLevel(b["window-center"], b["window-width"]), a.getViewController().setCurrentPosition(b.position), a.zoom(b.scale, b.scaleCenter.x, b.scaleCenter.y), a.translate(b.translation.x, b.translation.y);
        for (var d = a.getImage().getGeometry().getSize().getNumberOfSlices(), e = a.getImage().getNumberOfFrames(), f = function(a) {
                return "shape" === a.name()
            }, g = 0; g < d; ++g)
            for (var h = 0; h < e; ++h)
                for (var i = 0; i < b.drawings[g][h].length; ++i) {
                    var j = Kinetic.Node.create(b.drawings[g][h][i]),
                        k = j.getChildren(f)[0],
                        l = new dwv.tool.DrawGroupCommand(j, k.className, a.getDrawLayer(g, h));
                    "undefined" != typeof c && (l.onExecute = c, l.onUndo = c), l.execute(), a.addToUndoStack(l)
                }
    }
    this.toJSON = function() {
        for (var b = a.getImage().getGeometry().getSize().getNumberOfSlices(), c = a.getImage().getNumberOfFrames(), d = [], e = 0; e < b; ++e) {
            d[e] = [];
            for (var f = 0; f < c; ++f) {
                for (var g = a.getDrawLayer(e, f).getChildren(), h = 0; h < g.length; ++h)
                    for (var i = g[h].find(".anchor"), j = 0; j < i.length; ++j) i[j].remove();
                d[e].push(g)
            }
        }
        return JSON.stringify({
            version: "0.1",
            "window-center": a.getViewController().getWindowLevel().center,
            "window-width": a.getViewController().getWindowLevel().width,
            position: a.getViewController().getCurrentPosition(),
            scale: a.getScale(),
            scaleCenter: a.getScaleCenter(),
            translation: a.getTranslation(),
            drawings: d
        })
    }, this.fromJSON = function(a, c) {
        var d = JSON.parse(a);
        if ("0.1" !== d.version) throw new Error("Unknown state file format version: '" + d.version + "'.");
        b(d, c)
    }
};
var dwv = dwv || {};
dwv.ToolboxController = function(a) {
    this.setSelectedTool = function(b) {
        a.setSelectedTool(b)
    }, this.setSelectedShape = function(b) {
        a.getSelectedTool().setShapeName(b)
    }, this.setSelectedFilter = function(b) {
        a.getSelectedTool().setSelectedFilter(b)
    }, this.runSelectedFilter = function() {
        a.getSelectedTool().getSelectedFilter().run()
    }, this.setLineColour = function(b) {
        a.getSelectedTool().setLineColour(b)
    }, this.setRange = function(b) {
        a && a.getSelectedTool() && a.getSelectedTool().getSelectedFilter() && a.getSelectedTool().getSelectedFilter().run(b)
    }
};
var dwv = dwv || {};
dwv.ViewController = function(a) {
    var b = null;
    this.getPresets = function() {
        return b
    }, this.getCurrentPosition = function() {
        return a.getCurrentPosition()
    }, this.setCurrentPosition = function(b) {
        return a.setCurrentPosition(b)
    }, this.setCurrentPosition2D = function(b, c) {
        return a.setCurrentPosition({
            i: b,
            j: c,
            k: a.getCurrentPosition().k
        })
    }, this.incrementSliceNb = function() {
        return a.setCurrentPosition({
            i: a.getCurrentPosition().i,
            j: a.getCurrentPosition().j,
            k: a.getCurrentPosition().k + 1
        })
    }, this.decrementSliceNb = function() {
        return a.setCurrentPosition({
            i: a.getCurrentPosition().i,
            j: a.getCurrentPosition().j,
            k: a.getCurrentPosition().k - 1
        })
    }, this.setCurrentFrame = function(b) {
        return a.setCurrentFrame(b)
    }, this.incrementFrameNb = function() {
        return a.setCurrentFrame(a.getCurrentFrame() + 1)
    }, this.decrementFrameNb = function() {
        return a.setCurrentFrame(a.getCurrentFrame() - 1)
    }, this.goFirstSlice = function() {
        return a.setCurrentPosition({
            i: a.getCurrentPosition().i,
            j: a.getCurrentPosition().j,
            k: 0
        })
    }, this.getWindowLevel = function() {
        return {
            width: a.getWindowLut().getWidth(),
            center: a.getWindowLut().getCenter()
        }
    }, this.setWindowLevel = function(b, c) {
        a.setWindowLevel(b, c)
    }, this.updatePresets = function(c) {
        var d = null;
        b && (d = b.manual), b = {};
        var e = a.getWindowPresets();
        if (e)
            for (var f = 0; f < e.length; ++f) b[e[f].name.toLowerCase()] = e[f];
        var g = c.getRescaledDataRange(),
            h = g.max - g.min,
            i = g.min + h / 2;
        if (b.minmax = {
                center: i,
                width: h
            }, "undefined" != typeof dwv.tool.defaultpresets) {
            var j = c.getMeta().Modality;
            for (var k in dwv.tool.defaultpresets[j]) b[k] = dwv.tool.defaultpresets[j][k]
        }
        d && (b.manual = d)
    }, this.getColourMap = function() {
        return a.getColourMap()
    }, this.setColourMap = function(b) {
        a.setColourMap(b)
    }, this.setColourMapFromName = function(a) {
        if (!dwv.tool.colourMaps[a]) throw new Error("Unknown colour map: '" + a + "'");
        this.setColourMap(dwv.tool.colourMaps[a])
    }
};
var dwv = dwv || {};
dwv.dicom = dwv.dicom || {}, dwv.dicom.cleanString = function(a) {
    var b = a;
    return a && (b = a.trim(), b[b.length - 1] === String.fromCharCode("u200B") && (b = b.substring(0, b.length - 1))), b
}, dwv.dicom.isNativeLittleEndian = function() {
    return new Int8Array(new Int16Array([1]).buffer)[0] > 0
}, dwv.dicom.getUtfLabel = function(a) {
    var b = "utf-8";
    return "ISO_IR 100" === a ? b = "iso-8859-1" : "ISO_IR 101" === a ? b = "iso-8859-2" : "ISO_IR 109" === a ? b = "iso-8859-3" : "ISO_IR 110" === a ? b = "iso-8859-4" : "ISO_IR 144" === a ? b = "iso-8859-5" : "ISO_IR 127" === a ? b = "iso-8859-6" : "ISO_IR 126" === a ? b = "iso-8859-7" : "ISO_IR 138" === a ? b = "iso-8859-8" : "ISO_IR 148" === a ? b = "iso-8859-9" : "ISO_IR 13" === a ? b = "shift-jis" : "ISO_IR 166" === a ? b = "iso-8859-11" : "ISO 2022 IR 87" === a ? b = "iso-2022-jp" : "ISO 2022 IR 149" === a || "ISO 2022 IR 58" === a || ("ISO_IR 192" === a ? b = "utf-8" : "GB18030" === a ? b = "gb18030" : "GBK" === a && (b = "chinese")), b
}, dwv.dicom.DataReader = function(a, b) {
    function c(a) {
        var b = "";
        if ("undefined" != typeof window.TextDecoder) {
            var c = new TextDecoder(d);
            b = c.decode(a)
        } else
            for (var e = 0; e < a.length; ++e) b += String.fromCharCode(a[e]);
        return b
    }
    "undefined" == typeof b && (b = !0);
    var d = "iso-8859-1";
    this.setUtfLabel = function(a) {
        d = a
    };
    var e = dwv.dicom.isNativeLittleEndian(),
        f = b !== e,
        g = new DataView(a);
    this.flipArrayEndianness = function(a) {
        for (var b, c = a.byteLength, d = new Uint8Array(a.buffer, a.byteOffset, c), e = a.BYTES_PER_ELEMENT, f = 0; f < c; f += e)
            for (var g = f + e - 1, h = f; g > h; g--, h++) b = d[h], d[h] = d[g], d[g] = b
    }, this.readUint16 = function(a) {
        return g.getUint16(a, b)
    }, this.readUint32 = function(a) {
        return g.getUint32(a, b)
    }, this.readInt32 = function(a) {
        return g.getInt32(a, b)
    }, this.readUint8Array = function(b, c) {
        return new Uint8Array(a, b, c)
    }, this.readInt8Array = function(b, c) {
        return new Int8Array(a, b, c)
    }, this.readUint16Array = function(c, d) {
        var e = d / Uint16Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Uint16Array.BYTES_PER_ELEMENT === 0) h = new Uint16Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Uint16Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getInt16(c + Uint16Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readInt16Array = function(c, d) {
        var e = d / Int16Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Int16Array.BYTES_PER_ELEMENT === 0) h = new Int16Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Int16Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getInt16(c + Int16Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readUint32Array = function(c, d) {
        var e = d / Uint32Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Uint32Array.BYTES_PER_ELEMENT === 0) h = new Uint32Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Uint32Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getUint32(c + Uint32Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readInt32Array = function(c, d) {
        var e = d / Int32Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Int32Array.BYTES_PER_ELEMENT === 0) h = new Int32Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Int32Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getInt32(c + Int32Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readFloat32Array = function(c, d) {
        var e = d / Float32Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Float32Array.BYTES_PER_ELEMENT === 0) h = new Float32Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Float32Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getFloat32(c + Float32Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readFloat64Array = function(c, d) {
        var e = d / Float64Array.BYTES_PER_ELEMENT,
            h = null;
        if (c % Float64Array.BYTES_PER_ELEMENT === 0) h = new Float64Array(a, c, e), f && this.flipArrayEndianness(h);
        else {
            h = new Float64Array(e);
            for (var i = 0; i < e; ++i) h[i] = g.getFloat64(c + Float64Array.BYTES_PER_ELEMENT * i, b)
        }
        return h
    }, this.readHex = function(a) {
        var b = this.readUint16(a).toString(16);
        return "0x0000".substr(0, 6 - b.length) + b.toUpperCase()
    }, this.readString = function(a, b) {
        var d = this.readUint8Array(a, b);
        return c(d)
    }
}, dwv.dicom.getGroupElementKey = function(a, b) {
    return "x" + a.substr(2, 6) + b.substr(2, 6)
}, dwv.dicom.splitGroupElementKey = function(a) {
    return {
        group: a.substr(1, 4),
        element: a.substr(5, 8)
    }
}, dwv.dicom.isJpegBaselineTransferSyntax = function(a) {
    return "1.2.840.10008.1.2.4.50" === a || "1.2.840.10008.1.2.4.51" === a
}, dwv.dicom.isJpegNonSupportedTransferSyntax = function(a) {
    return null !== a.match(/1.2.840.10008.1.2.4.5/) && !dwv.dicom.isJpegBaselineTransferSyntax() && !dwv.dicom.isJpegLosslessTransferSyntax() || null !== a.match(/1.2.840.10008.1.2.4.6/)
}, dwv.dicom.isJpegLosslessTransferSyntax = function(a) {
    return "1.2.840.10008.1.2.4.57" === a || "1.2.840.10008.1.2.4.70" === a
}, dwv.dicom.isJpeglsTransferSyntax = function(a) {
    return null !== a.match(/1.2.840.10008.1.2.4.8/)
}, dwv.dicom.isJpeg2000TransferSyntax = function(a) {
    return null !== a.match(/1.2.840.10008.1.2.4.9/)
}, dwv.dicom.getSyntaxDecompressionName = function(a) {
    var b = null;
    return dwv.dicom.isJpeg2000TransferSyntax(a) ? b = "jpeg2000" : dwv.dicom.isJpegBaselineTransferSyntax(a) ? b = "jpeg-baseline" : dwv.dicom.isJpegLosslessTransferSyntax(a) && (b = "jpeg-lossless"), b
}, dwv.dicom.getTransferSyntaxName = function(a) {
    var b = "unknown";
    return "1.2.840.10008.1.2" === a ? b = "Little Endian Implicit" : "1.2.840.10008.1.2.1" === a ? b = "Little Endian Explicit" : "1.2.840.10008.1.2.1.99" === a ? b = "Little Endian Deflated Explicit" : "1.2.840.10008.1.2.2" === a ? b = "Big Endian Explicit" : dwv.dicom.isJpegBaselineTransferSyntax(a) ? b = "1.2.840.10008.1.2.4.50" === a ? "JPEG Baseline" : "JPEG Extended, Process 2+4" : dwv.dicom.isJpegLosslessTransferSyntax(a) ? b = "1.2.840.10008.1.2.4.57" === a ? "JPEG Lossless, Nonhierarchical (Processes 14)" : "JPEG Lossless, Non-hierarchical, 1st Order Prediction" : dwv.dicom.isJpegNonSupportedTransferSyntax(a) ? b = "Non supported JPEG" : dwv.dicom.isJpeglsTransferSyntax(a) ? b = "JPEG-LS" : dwv.dicom.isJpeg2000TransferSyntax(a) ? b = "1.2.840.10008.1.2.4.91" === a ? "JPEG 2000 (Lossless or Lossy)" : "JPEG 2000 (Lossless only)" : "1.2.840.10008.1.2.4.100" === a ? b = "MPEG2" : "1.2.840.10008.1.2.5" === a && (b = "RLE"), b
}, dwv.dicom.getTypedArray = function(a, b, c) {
    var d = null;
    return 8 === a ? d = 0 === b ? new Uint8Array(c) : new Int8Array(c) : 16 === a ? d = 0 === b ? new Uint16Array(c) : new Int16Array(c) : 32 === a && (d = 0 === b ? new Uint32Array(c) : new Int32Array(c)), d
}, dwv.dicom.is32bitVLVR = function(a) {
    return "OB" === a || "OW" === a || "OF" === a || "ox" === a || "SQ" === a || "UN" === a
}, dwv.dicom.isTagWithVR = function(a, b) {
    return !("0xFFFE" === a && ("0xE000" === b || "0xE00D" === b || "0xE0DD" === b))
}, dwv.dicom.getDataElementPrefixByteSize = function(a) {
    return dwv.dicom.is32bitVLVR(a) ? 12 : 8
}, dwv.dicom.DicomParser = function() {
    this.dicomElements = {};
    var a;
    this.getDefaultCharacterSet = function() {
        return a
    }, this.setDefaultCharacterSet = function(b) {
        a = b
    }
}, dwv.dicom.DicomParser.prototype.getRawDicomElements = function() {
    return this.dicomElements
}, dwv.dicom.DicomParser.prototype.getDicomElements = function() {
    return new dwv.dicom.DicomElementsWrapper(this.dicomElements)
}, dwv.dicom.DicomParser.prototype.readTag = function(a, b) {
    var c = a.readHex(b);
    b += Uint16Array.BYTES_PER_ELEMENT;
    var d = a.readHex(b);
    b += Uint16Array.BYTES_PER_ELEMENT;
    var e = dwv.dicom.getGroupElementKey(c, d);
    return {
        group: c,
        element: d,
        name: e,
        endOffset: b
    }
}, dwv.dicom.DicomParser.prototype.readItemDataElement = function(a, b, c) {
    var d = {},
        e = this.readDataElement(a, b, c);
    b = e.endOffset;
    var f = "xFFFEE0DD" === e.tag.name;
    if (f) return {
        data: d,
        endOffset: e.endOffset,
        isSeqDelim: f
    };
    if (d[e.tag.name] = e, "u/l" !== e.vl) {
        if (0 !== e.vl) {
            var g = b;
            for (b -= e.vl; b < g;) e = this.readDataElement(a, b, c), b = e.endOffset, d[e.tag.name] = e
        }
    } else
        for (var h = !1; !h;) e = this.readDataElement(a, b, c), b = e.endOffset, h = "xFFFEE00D" === e.tag.name, h || (d[e.tag.name] = e);
    return {
        data: d,
        endOffset: b,
        isSeqDelim: !1
    }
}, dwv.dicom.DicomParser.prototype.readPixelItemDataElement = function(a, b, c) {
    var d = [],
        e = this.readDataElement(a, b, c);
    b = e.endOffset;
    for (var f = !1; !f;) e = this.readDataElement(a, b, c), b = e.endOffset, f = "xFFFEE0DD" === e.tag.name, f || d.push(e.value);
    return {
        data: d,
        endOffset: b
    }
}, dwv.dicom.DicomParser.prototype.readDataElement = function(a, b, c) {
    var d = this.readTag(a, b);
    b = d.endOffset;
    var e = null,
        f = !1;
    if (dwv.dicom.isTagWithVR(d.group, d.element))
        if (c) {
            e = "UN";
            var g = dwv.dicom.dictionary;
            "undefined" != typeof g[d.group] && "undefined" != typeof g[d.group][d.element] && (e = dwv.dicom.dictionary[d.group][d.element][0]), f = !0
        } else e = a.readString(b, 2), b += 2 * Uint8Array.BYTES_PER_ELEMENT, f = dwv.dicom.is32bitVLVR(e), f && (b += 2 * Uint8Array.BYTES_PER_ELEMENT);
    else e = "UN", f = !0;
    var h = 0;
    f ? (h = a.readUint32(b), b += Uint32Array.BYTES_PER_ELEMENT) : (h = a.readUint16(b), b += Uint16Array.BYTES_PER_ELEMENT);
    var i = h;
    4294967295 === h && (i = "u/l", h = 0);
    var j = null;
    if ("x7FE00010" === d.name && "u/l" === i) {
        var k = this.readPixelItemDataElement(a, b, c);
        b = k.endOffset, j = k.data
    } else if ("OW" === e || "OF" === e || "ox" === e) {
        var l = 16;
        "undefined" != typeof this.dicomElements.x00280100 && (l = this.dicomElements.x00280100.value[0]);
        var m = 0;
        "undefined" != typeof this.dicomElements.x00280103 && (m = this.dicomElements.x00280103.value[0]), j = 8 === l ? 0 === m ? a.readUint8Array(b, h) : a.readInt8Array(b, h) : 16 === l ? 0 === m ? a.readUint16Array(b, h) : a.readInt16Array(b, h) : a.readUint16Array(b, h), b += h
    } else if ("OB" === e) {
        var n = 0;
        "undefined" != typeof this.dicomElements.x00280103 && (n = this.dicomElements.x00280103.value[0]), j = 0 === n ? a.readUint8Array(b, h) : a.readInt8Array(b, h), b += h
    } else if ("US" === e) j = a.readUint16Array(b, h), b += h;
    else if ("UL" === e) j = a.readUint32Array(b, h), b += h;
    else if ("SS" === e) j = a.readInt16Array(b, h), b += h;
    else if ("SL" === e) j = a.readInt32Array(b, h), b += h;
    else if ("FL" === e) j = a.readFloat32Array(b, h), b += h;
    else if ("FD" === e) j = a.readFloat64Array(b, h), b += h;
    else if ("AT" === e) {
        var o = a.readUint16Array(b, h);
        b += h, j = [];
        for (var p = 0; p < o.length; p += 2) {
            var q = o[p].toString(16),
                r = o[p + 1].toString(16),
                s = "(";
            s += "0000".substr(0, 4 - q.length) + q.toUpperCase(), s += ",", s += "0000".substr(0, 4 - r.length) + r.toUpperCase(), s += ")", j.push(s)
        }
    } else if ("UN" === e) j = a.readUint8Array(b, h), b += h;
    else if ("SQ" === e) {
        j = [];
        var t;
        if ("u/l" !== i) {
            if (0 !== h)
                for (var u = b + h; b < u;) t = this.readItemDataElement(a, b, c), j.push(t.data), b = t.endOffset
        } else
            for (var v = !1; !v;) t = this.readItemDataElement(a, b, c), v = t.isSeqDelim, b = t.endOffset, v || j.push(t.data)
    } else j = a.readString(b, h), b += h, j = j.split("\\");
    return {
        tag: d,
        vr: e,
        vl: i,
        value: j,
        endOffset: b
    }
}, dwv.dicom.DicomParser.prototype.parse = function(a) {
    var b = 0,
        c = !1,
        d = new dwv.dicom.DataReader(a),
        e = new dwv.dicom.DataReader(a);
    b = 128;
    var f = d.readString(b, 4);
    if (b += 4 * Uint8Array.BYTES_PER_ELEMENT, "DICM" !== f) throw new Error("Not a valid DICOM file (no magic DICM word found)");
    var g = this.readDataElement(d, b);
    b = g.endOffset, this.dicomElements[g.tag.name] = g;
    for (var h = parseInt(g.value[0], 10), i = b + h; b < i;) g = this.readDataElement(d, b, !1), b = g.endOffset, this.dicomElements[g.tag.name] = g;
    var j = dwv.dicom.cleanString(this.dicomElements.x00020010.value[0]);
    if ("1.2.840.10008.1.2.1" === j);
    else if ("1.2.840.10008.1.2" === j) c = !0;
    else {
        if ("1.2.840.10008.1.2.1.99" === j) throw new Error("Unsupported DICOM transfer syntax (Deflated Explicit VR): " + j);
        if ("1.2.840.10008.1.2.2" === j) e = new dwv.dicom.DataReader(a, (!1));
        else if (dwv.dicom.isJpegBaselineTransferSyntax(j));
        else if (dwv.dicom.isJpegLosslessTransferSyntax(j));
        else {
            if (dwv.dicom.isJpegNonSupportedTransferSyntax(j)) throw new Error("Unsupported DICOM transfer syntax (retired JPEG): " + j);
            if (dwv.dicom.isJpeglsTransferSyntax(j)) throw new Error("Unsupported DICOM transfer syntax (JPEG-LS): " + j);
            if (!dwv.dicom.isJpeg2000TransferSyntax(j)) throw "1.2.840.10008.1.2.4.100" === j ? new Error("Unsupported DICOM transfer syntax (MPEG2): " + j) : "1.2.840.10008.1.2.5" === j ? new Error("Unsupported DICOM transfer syntax (RLE): " + j) : new Error("Unknown transfer syntax: " + j)
        }
    }
    for ("undefined" != typeof this.getDefaultCharacterSet() && e.setUtfLabel(this.getDefaultCharacterSet()); b < a.byteLength;) {
        if (g = this.readDataElement(e, b, c), "x00080005" === g.tag.name) {
            var k;
            1 === g.value.length ? k = dwv.dicom.cleanString(g.value[0]) : (k = dwv.dicom.cleanString(g.value[1]), console.warn("Unsupported character set with code extensions: '" + k + "'.")), e.setUtfLabel(dwv.dicom.getUtfLabel(k))
        }
        b = g.endOffset, this.dicomElements[g.tag.name] = g
    }
    if (a.byteLength != b && console.warn("Did not reach the end of the buffer: " + b + " != " + a.byteLength), "undefined" != typeof this.dicomElements.x7FE00010) {
        var l = 1;
        if ("undefined" != typeof this.dicomElements.x00280008 && (l = this.dicomElements.x00280008.value[0]), "u/l" !== this.dicomElements.x7FE00010.vl) {
            (dwv.dicom.isJpeg2000TransferSyntax(j) || dwv.dicom.isJpegBaselineTransferSyntax(j) || dwv.dicom.isJpegLosslessTransferSyntax(j)) && console.warn("Compressed but no items...");
            for (var m = this.dicomElements.x7FE00010.value, n = this.dicomElements.x00280011.value[0], o = this.dicomElements.x00280010.value[0], p = this.dicomElements.x00280002.value[0], q = n * o * p, r = [], s = 0, t = 0; t < l; ++t) r[t] = m.slice(s, s + q), s += q;
            this.dicomElements.x7FE00010.value = r
        } else {
            var u = this.dicomElements.x7FE00010.value;
            if (u.length > 1 && u.length > l) {
                for (var v = this.dicomElements.x00280100.value[0], w = this.dicomElements.x00280103.value[0], x = u.length / l, y = [], z = 0, A = 0; A < l; ++A) {
                    z = A * x;
                    for (var B = 0, C = 0; C < x; ++C) B += u[z + C].length;
                    for (var D = dwv.dicom.getTypedArray(v, w, B), E = 0, F = 0; F < x; ++F) D.set(u[z + F], E), E += u[z + F].length;
                    y[A] = D
                }
                this.dicomElements.x7FE00010.value = y
            }
        }
    }
}, dwv.dicom.DicomElementsWrapper = function(a) {
    this.getFromKey = function(b, c) {
        "undefined" == typeof c && (c = !1);
        var d = null,
            e = a[b];
        return "undefined" != typeof e && (d = 1 === e.value.length && c === !1 ? e.value[0] : e.value), d
    }, this.dumpToTable = function() {
        for (var b = Object.keys(a), c = dwv.dicom.dictionary, d = [], e = null, f = null, g = null, h = 0; h < b.length; ++h) e = a[b[h]], g = {}, f = null, "undefined" != typeof c[e.tag.group] && "undefined" != typeof c[e.tag.group][e.tag.element] && (f = c[e.tag.group][e.tag.element]), null !== f ? g.name = f[2] : g.name = "Unknown Tag & Data", "x7FE00010" !== e.tag.name ? g.value = e.value : g.value = "...", g.group = e.tag.group, g.element = e.tag.element, g.vr = e.vr, g.vl = e.vl, d.push(g);
        return d
    }, this.dump = function() {
        var b = Object.keys(a),
            c = "\n";
        c += "# Dicom-File-Format\n", c += "\n", c += "# Dicom-Meta-Information-Header\n", c += "# Used TransferSyntax: ", c += dwv.dicom.isNativeLittleEndian() ? "Little Endian Explicit\n" : "NOT Little Endian Explicit\n";
        for (var d = null, e = !0, f = 0; f < b.length; ++f) {
            if (d = a[b[f]], e && "0x0002" !== d.tag.group) {
                c += "\n", c += "# Dicom-Data-Set\n", c += "# Used TransferSyntax: ";
                var g = dwv.dicom.cleanString(a.x00020010.value[0]);
                c += dwv.dicom.getTransferSyntaxName(g), c += "\n", e = !1
            }
            c += this.getElementAsString(d) + "\n"
        }
        return c
    }
}, dwv.dicom.DicomElementsWrapper.prototype.getElementAsString = function(a, b) {
    b = b || "";
    var c = dwv.dicom.dictionary,
        d = null;
    "undefined" != typeof c[a.tag.group] && "undefined" != typeof c[a.tag.group][a.tag.element] && (d = c[a.tag.group][a.tag.element]);
    var e = a.value.length,
        f = "O" === a.vr[0].toUpperCase();
    "0xFFFE" !== a.tag.group || "0xE00D" !== a.tag.element && "0xE0DD" !== a.tag.element ? f && (e = 1) : e = 0;
    var g = "0x7FE0" === a.tag.group && "0x0010" === a.tag.element && "u/l" === a.vl,
        h = null;
    if (h = "(", h += a.tag.group.substr(2, 5).toLowerCase(), h += ",", h += a.tag.element.substr(2, 5).toLowerCase(), h += ") ", h += a.vr, "SQ" !== a.vr && 1 === a.value.length && "" === a.value[0]) h += " (no value available)",
        e = 0;
    else if ("na" === a.vr) h += " ", h += a.value[0];
    else if (g) h += " (PixelSequence #=" + e + ")";
    else if (f || "pi" === a.vr || "UL" === a.vr || "US" === a.vr || "SL" === a.vr || "SS" === a.vr || "FL" === a.vr || "FD" === a.vr || "AT" === a.vr) {
        h += " ";
        for (var i = "", j = "", k = 0; k < a.value.length; ++k) {
            if (j = "", 0 !== k && (j += "\\"), "FL" === a.vr) j += Number(a.value[k].toPrecision(8));
            else if (f) {
                var l = a.value[k].toString(16);
                l = "OB" === a.vr ? "00".substr(0, 2 - l.length) + l : "0000".substr(0, 4 - l.length) + l, j += l
            } else j += a.value[k];
            if (!(i.length + j.length <= 65)) {
                i += "...";
                break
            }
            i += j
        }
        h += i
    } else if ("SQ" === a.vr) h += " (Sequence with", h += "u/l" === a.vl ? " undefined" : " explicit", h += " length #=", h += a.value.length, h += ")";
    else {
        h += " [";
        for (var m = 0; m < a.value.length; ++m) 0 !== m && (h += "\\"), h += "string" == typeof a.value[m] ? dwv.dicom.cleanString(a.value[m]) : a.value[m];
        h += "]"
    }
    var n = 55 - h.length;
    if (n > 0)
        for (var o = 0; o < n; ++o) h += " ";
    h += " # ", a.vl < 100 && (h += " "), a.vl < 10 && (h += " "), h += a.vl, h += ", ", h += e, h += " ", h += null !== d ? d[2] : "Unknown Tag & Data";
    var p = null;
    if ("SQ" === a.vr) {
        for (var q = null, r = 0; r < a.value.length; ++r) {
            q = a.value[r];
            var s = Object.keys(q);
            if (0 !== s.length) {
                var t = q.xFFFEE000;
                p = "(Item with", p += "u/l" === t.vl ? " undefined" : " explicit", p += " length #=" + (s.length - 1) + ")", t.value = [p], t.vr = "na", h += "\n", h += this.getElementAsString(t, b + "  ");
                for (var u = 0; u < s.length; ++u) "xFFFEE000" !== s[u] && (h += "\n", h += this.getElementAsString(q[s[u]], b + "    "));
                p = "(ItemDelimitationItem", "u/l" !== t.vl && (p += " for re-encoding"), p += ")";
                var v = {
                    tag: {
                        group: "0xFFFE",
                        element: "0xE00D"
                    },
                    vr: "na",
                    vl: "0",
                    value: [p]
                };
                h += "\n", h += this.getElementAsString(v, b + "  ")
            }
        }
        p = "(SequenceDelimitationItem", "u/l" !== a.vl && (p += " for re-encod."), p += ")";
        var w = {
            tag: {
                group: "0xFFFE",
                element: "0xE0DD"
            },
            vr: "na",
            vl: "0",
            value: [p]
        };
        h += "\n", h += this.getElementAsString(w, b)
    } else if (g) {
        for (var x = null, y = 0; y < a.value.length; ++y) x = a.value[y], h += "\n", x.vr = "pi", h += this.getElementAsString(x, b + "  ");
        var z = {
            tag: {
                group: "0xFFFE",
                element: "0xE0DD"
            },
            vr: "na",
            vl: "0",
            value: ["(SequenceDelimitationItem)"]
        };
        h += "\n", h += this.getElementAsString(z, b)
    }
    return b + h
}, dwv.dicom.DicomElementsWrapper.prototype.getFromGroupElement = function(a, b) {
    return this.getFromKey(dwv.dicom.getGroupElementKey(a, b))
}, dwv.dicom.DicomElementsWrapper.prototype.getFromName = function(a) {
    var b = null,
        c = null,
        d = dwv.dicom.dictionary,
        e = Object.keys(d),
        f = null,
        g = 0,
        h = 0;
    a: for (g = 0; g < e.length; ++g)
        for (b = e[g], f = Object.keys(d[b]), h = 0; h < f.length; ++h)
            if (c = f[h], d[b][c][2] === a) break a;
    var i = null;
    return g !== e.length && h !== f.length && (i = this.getFromKey(dwv.dicom.getGroupElementKey(b, c))), i
};
var dwv = dwv || {};
dwv.dicom = dwv.dicom || {}, dwv.dicom.DataWriter = function(a) {
    var b = new DataView(a),
        c = !0;
    this.writeUint8 = function(a, c) {
        return b.setUint8(a, c), a + Uint8Array.BYTES_PER_ELEMENT
    }, this.writeUint16 = function(a, d) {
        return b.setUint16(a, d, c), a + Uint16Array.BYTES_PER_ELEMENT
    }, this.writeInt16 = function(a, d) {
        return b.setInt16(a, d, c), a + Int16Array.BYTES_PER_ELEMENT
    }, this.writeUint32 = function(a, d) {
        return b.setUint32(a, d, c), a + Uint32Array.BYTES_PER_ELEMENT
    }, this.writeInt32 = function(a, d) {
        return b.setInt32(a, d, c), a + Int32Array.BYTES_PER_ELEMENT
    }, this.writeFloat32 = function(a, d) {
        return b.setFloat32(a, d, c), a + Float32Array.BYTES_PER_ELEMENT
    }, this.writeFloat64 = function(a, d) {
        return b.setFloat64(a, d, c), a + Float64Array.BYTES_PER_ELEMENT
    }, this.writeHex = function(a, d) {
        var e = parseInt(d.substr(2), 16);
        return b.setUint16(a, e, c), a + Uint16Array.BYTES_PER_ELEMENT
    }, this.writeString = function(a, c) {
        for (var d = 0, e = c.length; d < e; ++d) b.setUint8(a, c.charCodeAt(d)), a += Uint8Array.BYTES_PER_ELEMENT;
        return a
    }
}, dwv.dicom.DataWriter.prototype.writeUint8Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeUint8(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeUint16Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeUint16(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeInt16Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeInt16(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeUint32Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeUint32(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeInt32Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeInt32(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeFloat32Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeFloat32(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeFloat64Array = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeFloat64(a, b[c]);
    return a
}, dwv.dicom.DataWriter.prototype.writeStringArray = function(a, b) {
    for (var c = 0, d = b.length; c < d; ++c) a = this.writeString(a, b[c]), 1 !== d && c !== b.length - 1 && (a = this.writeString(a, "\\"));
    return a
}, dwv.dicom.DataWriter.prototype.writeDataElementValue = function(a, b, c) {
    if ("OB" === a) b = this.writeUint8Array(b, c);
    else if ("US" === a || "OW" === a) b = this.writeUint16Array(b, c);
    else if ("SS" === a) b = this.writeInt16Array(b, c);
    else if ("UL" === a) b = this.writeUint32Array(b, c);
    else if ("SL" === a) b = this.writeInt32Array(b, c);
    else if ("FL" === a) b = this.writeFloat32Array(b, c);
    else if ("FD" === a) b = this.writeFloat64Array(b, c);
    else if ("SQ" === a)
        for (var d = null, e = 0; e < c.length; ++e) {
            d = c[e];
            var f = Object.keys(d);
            if (0 !== f.length) {
                var g = d.xFFFEE000;
                g.value = [], b = this.writeDataElement(g, b);
                for (var h = 0; h < f.length; ++h) "xFFFEE000" !== f[h] && "xFFFEE00D" !== f[h] && (b = this.writeDataElement(d[f[h]], b));
                if ("undefined" != typeof d.xFFFEE00D) {
                    var i = d.xFFFEE00D;
                    i.value = [], b = this.writeDataElement(i, b)
                }
            }
        } else b = this.writeStringArray(b, c);
    return b
}, dwv.dicom.DataWriter.prototype.writeDataElement = function(a, b) {
    var c = dwv.dicom.isTagWithVR(a.tag.group, a.tag.element),
        d = dwv.dicom.is32bitVLVR(a.vr);
    if (b = this.writeHex(b, a.tag.group), b = this.writeHex(b, a.tag.element), c && (b = this.writeString(b, a.vr), d && (b += 2)), dwv.dicom.isImplicitLengthSequence(a) && (a.vl = 4294967295), b = d || !c ? this.writeUint32(b, a.vl) : this.writeUint16(b, a.vl), b = this.writeDataElementValue(a.vr, b, a.value), dwv.dicom.isImplicitLengthSequence(a)) {
        var e = {
            tag: {
                group: "0xFFFE",
                element: "0xE0DD"
            },
            vr: "NONE",
            vl: 0,
            value: []
        };
        b = this.writeDataElement(e, b)
    }
    return b
}, dwv.dicom.isImplicitLengthSequence = function(a) {
    return "SQ" === a.vr && "undefined" != typeof a.value && (0 !== Object.keys(a.value).length && "undefined" != typeof a.value[0] && "undefined" != typeof a.value[0].xFFFEE00D || 0 === a.value)
}, dwv.dicom.DicomWriter = function() {
    var a = {
            copy: function(a) {
                return a
            },
            remove: function() {
                return null
            },
            clear: function(a) {
                return a.value[0] = "", a
            },
            replace: function(a, b) {
                return a.value[0] = b, a.vl = b.length, a
            }
        },
        b = {
            "default": {
                action: "copy",
                value: null
            }
        };
    this.rules = b, this.anonymisationRules = {
        "default": {
            action: "remove",
            value: null
        },
        PatientName: {
            action: "replace",
            value: "Anonymized"
        },
        "Meta Element": {
            action: "copy",
            value: null
        },
        Acquisition: {
            action: "copy",
            value: null
        },
        "Image Presentation": {
            action: "copy",
            value: null
        },
        Procedure: {
            action: "copy",
            value: null
        },
        "Pixel Data": {
            action: "copy",
            value: null
        }
    }, this.getElementToWrite = function(b) {
        var c = null,
            d = dwv.dicom.dictionary,
            e = b.tag.group,
            f = dwv.dicom.TagGroups[e.substr(1)];
        "undefined" != typeof d[e] && (c = d[e][b.tag.element][2]);
        var g;
        return g = null !== c && "undefined" != typeof this.rules[c] ? this.rules[c] : "undefined" != typeof this.rules[f] ? this.rules[f] : this.rules["default"], a[g.action](b, g.value)
    }
}, dwv.dicom.DicomWriter.prototype.getBuffer = function(a) {
    for (var b, c, d = Object.keys(a), e = 132, f = [], g = [], h = 0, i = d.length; h < i; ++h) b = this.getElementToWrite(a[d[h]]), null !== b && (e += dwv.dicom.getDataElementPrefixByteSize(b.vr) + parseInt(b.vl, 10), dwv.dicom.isImplicitLengthSequence(b) && (e += dwv.dicom.getDataElementPrefixByteSize("NONE")), c = dwv.dicom.TagGroups[b.tag.group.substr(1)], "Meta Element" === c ? f.push(b) : g.push(b));
    console.log("size: " + e);
    var j = new ArrayBuffer(e),
        k = new dwv.dicom.DataWriter(j),
        l = 128;
    l = k.writeString(l, "DICM");
    for (var m = 0, n = f.length; m < n; ++m) l = k.writeDataElement(f[m], l);
    for (var o = 0, p = g.length; o < p; ++o) l = k.writeDataElement(g[o], l);
    return j
};
var dwv = dwv || {};
dwv.dicom = dwv.dicom || {}, dwv.dicom.dictionary = {
    "0x0000": {
        "0x0000": ["UL", "1", "GroupLength"],
        "0x0001": ["UL", "1", "CommandLengthToEnd"],
        "0x0002": ["UI", "1", "AffectedSOPClassUID"],
        "0x0003": ["UI", "1", "RequestedSOPClassUID"],
        "0x0010": ["CS", "1", "CommandRecognitionCode"],
        "0x0100": ["US", "1", "CommandField"],
        "0x0110": ["US", "1", "MessageID"],
        "0x0120": ["US", "1", "MessageIDBeingRespondedTo"],
        "0x0200": ["AE", "1", "Initiator"],
        "0x0300": ["AE", "1", "Receiver"],
        "0x0400": ["AE", "1", "FindLocation"],
        "0x0600": ["AE", "1", "MoveDestination"],
        "0x0700": ["US", "1", "Priority"],
        "0x0800": ["US", "1", "DataSetType"],
        "0x0850": ["US", "1", "NumberOfMatches"],
        "0x0860": ["US", "1", "ResponseSequenceNumber"],
        "0x0900": ["US", "1", "Status"],
        "0x0901": ["AT", "1-n", "OffendingElement"],
        "0x0902": ["LO", "1", "ErrorComment"],
        "0x0903": ["US", "1", "ErrorID"],
        "0x0904": ["OT", "1-n", "ErrorInformation"],
        "0x1000": ["UI", "1", "AffectedSOPInstanceUID"],
        "0x1001": ["UI", "1", "RequestedSOPInstanceUID"],
        "0x1002": ["US", "1", "EventTypeID"],
        "0x1003": ["OT", "1-n", "EventInformation"],
        "0x1005": ["AT", "1-n", "AttributeIdentifierList"],
        "0x1007": ["AT", "1-n", "ModificationList"],
        "0x1008": ["US", "1", "ActionTypeID"],
        "0x1009": ["OT", "1-n", "ActionInformation"],
        "0x1013": ["UI", "1-n", "SuccessfulSOPInstanceUIDList"],
        "0x1014": ["UI", "1-n", "FailedSOPInstanceUIDList"],
        "0x1015": ["UI", "1-n", "WarningSOPInstanceUIDList"],
        "0x1020": ["US", "1", "NumberOfRemainingSuboperations"],
        "0x1021": ["US", "1", "NumberOfCompletedSuboperations"],
        "0x1022": ["US", "1", "NumberOfFailedSuboperations"],
        "0x1023": ["US", "1", "NumberOfWarningSuboperations"],
        "0x1030": ["AE", "1", "MoveOriginatorApplicationEntityTitle"],
        "0x1031": ["US", "1", "MoveOriginatorMessageID"],
        "0x4000": ["AT", "1", "DialogReceiver"],
        "0x4010": ["AT", "1", "TerminalType"],
        "0x5010": ["SH", "1", "MessageSetID"],
        "0x5020": ["SH", "1", "EndMessageSet"],
        "0x5110": ["AT", "1", "DisplayFormat"],
        "0x5120": ["AT", "1", "PagePositionID"],
        "0x5130": ["CS", "1", "TextFormatID"],
        "0x5140": ["CS", "1", "NormalReverse"],
        "0x5150": ["CS", "1", "AddGrayScale"],
        "0x5160": ["CS", "1", "Borders"],
        "0x5170": ["IS", "1", "Copies"],
        "0x5180": ["CS", "1", "OldMagnificationType"],
        "0x5190": ["CS", "1", "Erase"],
        "0x51A0": ["CS", "1", "Print"],
        "0x51B0": ["US", "1-n", "Overlays"]
    },
    "0x0002": {
        "0x0000": ["UL", "1", "FileMetaInformationGroupLength"],
        "0x0001": ["OB", "1", "FileMetaInformationVersion"],
        "0x0002": ["UI", "1", "MediaStorageSOPClassUID"],
        "0x0003": ["UI", "1", "MediaStorageSOPInstanceUID"],
        "0x0010": ["UI", "1", "TransferSyntaxUID"],
        "0x0012": ["UI", "1", "ImplementationClassUID"],
        "0x0013": ["SH", "1", "ImplementationVersionName"],
        "0x0016": ["AE", "1", "SourceApplicationEntityTitle"],
        "0x0017": ["AE", "1", "SendingApplicationEntityTitle"],
        "0x0018": ["AE", "1", "ReceivingApplicationEntityTitle"],
        "0x0100": ["UI", "1", "PrivateInformationCreatorUID"],
        "0x0102": ["OB", "1", "PrivateInformation"]
    },
    "0x0004": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x1130": ["CS", "1", "FileSetID"],
        "0x1141": ["CS", "1-8", "FileSetDescriptorFileID"],
        "0x1142": ["CS", "1", "SpecificCharacterSetOfFileSetDescriptorFile"],
        "0x1200": ["UL", "1", "OffsetOfTheFirstDirectoryRecordOfTheRootDirectoryEntity"],
        "0x1202": ["UL", "1", "OffsetOfTheLastDirectoryRecordOfTheRootDirectoryEntity"],
        "0x1212": ["US", "1", "FileSetConsistencyFlag"],
        "0x1220": ["SQ", "1", "DirectoryRecordSequence"],
        "0x1400": ["UL", "1", "OffsetOfTheNextDirectoryRecord"],
        "0x1410": ["US", "1", "RecordInUseFlag"],
        "0x1420": ["UL", "1", "OffsetOfReferencedLowerLevelDirectoryEntity"],
        "0x1430": ["CS", "1", "DirectoryRecordType"],
        "0x1432": ["UI", "1", "PrivateRecordUID"],
        "0x1500": ["CS", "1-8", "ReferencedFileID"],
        "0x1504": ["UL", "1", "MRDRDirectoryRecordOffset"],
        "0x1510": ["UI", "1", "ReferencedSOPClassUIDInFile"],
        "0x1511": ["UI", "1", "ReferencedSOPInstanceUIDInFile"],
        "0x1512": ["UI", "1", "ReferencedTransferSyntaxUIDInFile"],
        "0x151A": ["UI", "1-n", "ReferencedRelatedGeneralSOPClassUIDInFile"],
        "0x1600": ["UL", "1", "NumberOfReferences"]
    },
    "0x0008": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["UL", "1", "LengthToEnd"],
        "0x0005": ["CS", "1-n", "SpecificCharacterSet"],
        "0x0006": ["SQ", "1", "LanguageCodeSequence"],
        "0x0008": ["CS", "2-n", "ImageType"],
        "0x0010": ["SH", "1", "RecognitionCode"],
        "0x0012": ["DA", "1", "InstanceCreationDate"],
        "0x0013": ["TM", "1", "InstanceCreationTime"],
        "0x0014": ["UI", "1", "InstanceCreatorUID"],
        "0x0015": ["DT", "1", "InstanceCoercionDateTime"],
        "0x0016": ["UI", "1", "SOPClassUID"],
        "0x0018": ["UI", "1", "SOPInstanceUID"],
        "0x001A": ["UI", "1-n", "RelatedGeneralSOPClassUID"],
        "0x001B": ["UI", "1", "OriginalSpecializedSOPClassUID"],
        "0x0020": ["DA", "1", "StudyDate"],
        "0x0021": ["DA", "1", "SeriesDate"],
        "0x0022": ["DA", "1", "AcquisitionDate"],
        "0x0023": ["DA", "1", "ContentDate"],
        "0x0024": ["DA", "1", "OverlayDate"],
        "0x0025": ["DA", "1", "CurveDate"],
        "0x002A": ["DT", "1", "AcquisitionDateTime"],
        "0x0030": ["TM", "1", "StudyTime"],
        "0x0031": ["TM", "1", "SeriesTime"],
        "0x0032": ["TM", "1", "AcquisitionTime"],
        "0x0033": ["TM", "1", "ContentTime"],
        "0x0034": ["TM", "1", "OverlayTime"],
        "0x0035": ["TM", "1", "CurveTime"],
        "0x0040": ["US", "1", "DataSetType"],
        "0x0041": ["LO", "1", "DataSetSubtype"],
        "0x0042": ["CS", "1", "NuclearMedicineSeriesType"],
        "0x0050": ["SH", "1", "AccessionNumber"],
        "0x0051": ["SQ", "1", "IssuerOfAccessionNumberSequence"],
        "0x0052": ["CS", "1", "QueryRetrieveLevel"],
        "0x0053": ["CS", "1", "QueryRetrieveView"],
        "0x0054": ["AE", "1-n", "RetrieveAETitle"],
        "0x0056": ["CS", "1", "InstanceAvailability"],
        "0x0058": ["UI", "1-n", "FailedSOPInstanceUIDList"],
        "0x0060": ["CS", "1", "Modality"],
        "0x0061": ["CS", "1-n", "ModalitiesInStudy"],
        "0x0062": ["UI", "1-n", "SOPClassesInStudy"],
        "0x0064": ["CS", "1", "ConversionType"],
        "0x0068": ["CS", "1", "PresentationIntentType"],
        "0x0070": ["LO", "1", "Manufacturer"],
        "0x0080": ["LO", "1", "InstitutionName"],
        "0x0081": ["ST", "1", "InstitutionAddress"],
        "0x0082": ["SQ", "1", "InstitutionCodeSequence"],
        "0x0090": ["PN", "1", "ReferringPhysicianName"],
        "0x0092": ["ST", "1", "ReferringPhysicianAddress"],
        "0x0094": ["SH", "1-n", "ReferringPhysicianTelephoneNumbers"],
        "0x0096": ["SQ", "1", "ReferringPhysicianIdentificationSequence"],
        "0x009C": ["PN", "1-n", "ConsultingPhysicianName"],
        "0x009D": ["SQ", "1", "ConsultingPhysicianIdentificationSequence"],
        "0x0100": ["SH", "1", "CodeValue"],
        "0x0101": ["LO", "1", "ExtendedCodeValue"],
        "0x0102": ["SH", "1", "CodingSchemeDesignator"],
        "0x0103": ["SH", "1", "CodingSchemeVersion"],
        "0x0104": ["LO", "1", "CodeMeaning"],
        "0x0105": ["CS", "1", "MappingResource"],
        "0x0106": ["DT", "1", "ContextGroupVersion"],
        "0x0107": ["DT", "1", "ContextGroupLocalVersion"],
        "0x0108": ["LT", "1", "ExtendedCodeMeaning"],
        "0x010B": ["CS", "1", "ContextGroupExtensionFlag"],
        "0x010C": ["UI", "1", "CodingSchemeUID"],
        "0x010D": ["UI", "1", "ContextGroupExtensionCreatorUID"],
        "0x010F": ["CS", "1", "ContextIdentifier"],
        "0x0110": ["SQ", "1", "CodingSchemeIdentificationSequence"],
        "0x0112": ["LO", "1", "CodingSchemeRegistry"],
        "0x0114": ["ST", "1", "CodingSchemeExternalID"],
        "0x0115": ["ST", "1", "CodingSchemeName"],
        "0x0116": ["ST", "1", "CodingSchemeResponsibleOrganization"],
        "0x0117": ["UI", "1", "ContextUID"],
        "0x0118": ["UI", "1", "MappingResourceUID"],
        "0x0119": ["UC", "1", "LongCodeValue"],
        "0x0120": ["UR", "1", "URNCodeValue"],
        "0x0121": ["SQ", "1", "EquivalentCodeSequence"],
        "0x0201": ["SH", "1", "TimezoneOffsetFromUTC"],
        "0x0300": ["SQ", "1", "PrivateDataElementCharacteristicsSequence"],
        "0x0301": ["US", "1", "PrivateGroupReference"],
        "0x0302": ["LO", "1", "PrivateCreatorReference"],
        "0x0303": ["CS", "1", "BlockIdentifyingInformationStatus"],
        "0x0304": ["US", "1-n", "NonidentifyingPrivateElements"],
        "0x0306": ["US", "1-n", "IdentifyingPrivateElements"],
        "0x0305": ["SQ", "1", "DeidentificationActionSequence"],
        "0x0307": ["CS", "1", "DeidentificationAction"],
        "0x1000": ["AE", "1", "NetworkID"],
        "0x1010": ["SH", "1", "StationName"],
        "0x1030": ["LO", "1", "StudyDescription"],
        "0x1032": ["SQ", "1", "ProcedureCodeSequence"],
        "0x103E": ["LO", "1", "SeriesDescription"],
        "0x103F": ["SQ", "1", "SeriesDescriptionCodeSequence"],
        "0x1040": ["LO", "1", "InstitutionalDepartmentName"],
        "0x1048": ["PN", "1-n", "PhysiciansOfRecord"],
        "0x1049": ["SQ", "1", "PhysiciansOfRecordIdentificationSequence"],
        "0x1050": ["PN", "1-n", "PerformingPhysicianName"],
        "0x1052": ["SQ", "1", "PerformingPhysicianIdentificationSequence"],
        "0x1060": ["PN", "1-n", "NameOfPhysiciansReadingStudy"],
        "0x1062": ["SQ", "1", "PhysiciansReadingStudyIdentificationSequence"],
        "0x1070": ["PN", "1-n", "OperatorsName"],
        "0x1072": ["SQ", "1", "OperatorIdentificationSequence"],
        "0x1080": ["LO", "1-n", "AdmittingDiagnosesDescription"],
        "0x1084": ["SQ", "1", "AdmittingDiagnosesCodeSequence"],
        "0x1090": ["LO", "1", "ManufacturerModelName"],
        "0x1100": ["SQ", "1", "ReferencedResultsSequence"],
        "0x1110": ["SQ", "1", "ReferencedStudySequence"],
        "0x1111": ["SQ", "1", "ReferencedPerformedProcedureStepSequence"],
        "0x1115": ["SQ", "1", "ReferencedSeriesSequence"],
        "0x1120": ["SQ", "1", "ReferencedPatientSequence"],
        "0x1125": ["SQ", "1", "ReferencedVisitSequence"],
        "0x1130": ["SQ", "1", "ReferencedOverlaySequence"],
        "0x1134": ["SQ", "1", "ReferencedStereometricInstanceSequence"],
        "0x113A": ["SQ", "1", "ReferencedWaveformSequence"],
        "0x1140": ["SQ", "1", "ReferencedImageSequence"],
        "0x1145": ["SQ", "1", "ReferencedCurveSequence"],
        "0x114A": ["SQ", "1", "ReferencedInstanceSequence"],
        "0x114B": ["SQ", "1", "ReferencedRealWorldValueMappingInstanceSequence"],
        "0x1150": ["UI", "1", "ReferencedSOPClassUID"],
        "0x1155": ["UI", "1", "ReferencedSOPInstanceUID"],
        "0x115A": ["UI", "1-n", "SOPClassesSupported"],
        "0x1160": ["IS", "1-n", "ReferencedFrameNumber"],
        "0x1161": ["UL", "1-n", "SimpleFrameList"],
        "0x1162": ["UL", "3-3n", "CalculatedFrameList"],
        "0x1163": ["FD", "2", "TimeRange"],
        "0x1164": ["SQ", "1", "FrameExtractionSequence"],
        "0x1167": ["UI", "1", "MultiFrameSourceSOPInstanceUID"],
        "0x1190": ["UR", "1", "RetrieveURL"],
        "0x1195": ["UI", "1", "TransactionUID"],
        "0x1196": ["US", "1", "WarningReason"],
        "0x1197": ["US", "1", "FailureReason"],
        "0x1198": ["SQ", "1", "FailedSOPSequence"],
        "0x1199": ["SQ", "1", "ReferencedSOPSequence"],
        "0x1200": ["SQ", "1", "StudiesContainingOtherReferencedInstancesSequence"],
        "0x1250": ["SQ", "1", "RelatedSeriesSequence"],
        "0x2110": ["CS", "1", "LossyImageCompressionRetired"],
        "0x2111": ["ST", "1", "DerivationDescription"],
        "0x2112": ["SQ", "1", "SourceImageSequence"],
        "0x2120": ["SH", "1", "StageName"],
        "0x2122": ["IS", "1", "StageNumber"],
        "0x2124": ["IS", "1", "NumberOfStages"],
        "0x2127": ["SH", "1", "ViewName"],
        "0x2128": ["IS", "1", "ViewNumber"],
        "0x2129": ["IS", "1", "NumberOfEventTimers"],
        "0x212A": ["IS", "1", "NumberOfViewsInStage"],
        "0x2130": ["DS", "1-n", "EventElapsedTimes"],
        "0x2132": ["LO", "1-n", "EventTimerNames"],
        "0x2133": ["SQ", "1", "EventTimerSequence"],
        "0x2134": ["FD", "1", "EventTimeOffset"],
        "0x2135": ["SQ", "1", "EventCodeSequence"],
        "0x2142": ["IS", "1", "StartTrim"],
        "0x2143": ["IS", "1", "StopTrim"],
        "0x2144": ["IS", "1", "RecommendedDisplayFrameRate"],
        "0x2200": ["CS", "1", "TransducerPosition"],
        "0x2204": ["CS", "1", "TransducerOrientation"],
        "0x2208": ["CS", "1", "AnatomicStructure"],
        "0x2218": ["SQ", "1", "AnatomicRegionSequence"],
        "0x2220": ["SQ", "1", "AnatomicRegionModifierSequence"],
        "0x2228": ["SQ", "1", "PrimaryAnatomicStructureSequence"],
        "0x2229": ["SQ", "1", "AnatomicStructureSpaceOrRegionSequence"],
        "0x2230": ["SQ", "1", "PrimaryAnatomicStructureModifierSequence"],
        "0x2240": ["SQ", "1", "TransducerPositionSequence"],
        "0x2242": ["SQ", "1", "TransducerPositionModifierSequence"],
        "0x2244": ["SQ", "1", "TransducerOrientationSequence"],
        "0x2246": ["SQ", "1", "TransducerOrientationModifierSequence"],
        "0x2251": ["SQ", "1", "AnatomicStructureSpaceOrRegionCodeSequenceTrial"],
        "0x2253": ["SQ", "1", "AnatomicPortalOfEntranceCodeSequenceTrial"],
        "0x2255": ["SQ", "1", "AnatomicApproachDirectionCodeSequenceTrial"],
        "0x2256": ["ST", "1", "AnatomicPerspectiveDescriptionTrial"],
        "0x2257": ["SQ", "1", "AnatomicPerspectiveCodeSequenceTrial"],
        "0x2258": ["ST", "1", "AnatomicLocationOfExaminingInstrumentDescriptionTrial"],
        "0x2259": ["SQ", "1", "AnatomicLocationOfExaminingInstrumentCodeSequenceTrial"],
        "0x225A": ["SQ", "1", "AnatomicStructureSpaceOrRegionModifierCodeSequenceTrial"],
        "0x225C": ["SQ", "1", "OnAxisBackgroundAnatomicStructureCodeSequenceTrial"],
        "0x3001": ["SQ", "1", "AlternateRepresentationSequence"],
        "0x3010": ["UI", "1-n", "IrradiationEventUID"],
        "0x3011": ["SQ", "1", "SourceIrradiationEventSequence"],
        "0x3012": ["UI", "1", "RadiopharmaceuticalAdministrationEventUID"],
        "0x4000": ["LT", "1", "IdentifyingComments"],
        "0x9007": ["CS", "4", "FrameType"],
        "0x9092": ["SQ", "1", "ReferencedImageEvidenceSequence"],
        "0x9121": ["SQ", "1", "ReferencedRawDataSequence"],
        "0x9123": ["UI", "1", "CreatorVersionUID"],
        "0x9124": ["SQ", "1", "DerivationImageSequence"],
        "0x9154": ["SQ", "1", "SourceImageEvidenceSequence"],
        "0x9205": ["CS", "1", "PixelPresentation"],
        "0x9206": ["CS", "1", "VolumetricProperties"],
        "0x9207": ["CS", "1", "VolumeBasedCalculationTechnique"],
        "0x9208": ["CS", "1", "ComplexImageComponent"],
        "0x9209": ["CS", "1", "AcquisitionContrast"],
        "0x9215": ["SQ", "1", "DerivationCodeSequence"],
        "0x9237": ["SQ", "1", "ReferencedPresentationStateSequence"],
        "0x9410": ["SQ", "1", "ReferencedOtherPlaneSequence"],
        "0x9458": ["SQ", "1", "FrameDisplaySequence"],
        "0x9459": ["FL", "1", "RecommendedDisplayFrameRateInFloat"],
        "0x9460": ["CS", "1", "SkipFrameRangeFlag"]
    },
    "0x0010": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["PN", "1", "PatientName"],
        "0x0020": ["LO", "1", "PatientID"],
        "0x0021": ["LO", "1", "IssuerOfPatientID"],
        "0x0022": ["CS", "1", "TypeOfPatientID"],
        "0x0024": ["SQ", "1", "IssuerOfPatientIDQualifiersSequence"],
        "0x0030": ["DA", "1", "PatientBirthDate"],
        "0x0032": ["TM", "1", "PatientBirthTime"],
        "0x0040": ["CS", "1", "PatientSex"],
        "0x0050": ["SQ", "1", "PatientInsurancePlanCodeSequence"],
        "0x0101": ["SQ", "1", "PatientPrimaryLanguageCodeSequence"],
        "0x0102": ["SQ", "1", "PatientPrimaryLanguageModifierCodeSequence"],
        "0x0200": ["CS", "1", "QualityControlSubject"],
        "0x0201": ["SQ", "1", "QualityControlSubjectTypeCodeSequence"],
        "0x1000": ["LO", "1-n", "OtherPatientIDs"],
        "0x1001": ["PN", "1-n", "OtherPatientNames"],
        "0x1002": ["SQ", "1", "OtherPatientIDsSequence"],
        "0x1005": ["PN", "1", "PatientBirthName"],
        "0x1010": ["AS", "1", "PatientAge"],
        "0x1020": ["DS", "1", "PatientSize"],
        "0x1021": ["SQ", "1", "PatientSizeCodeSequence"],
        "0x1030": ["DS", "1", "PatientWeight"],
        "0x1040": ["LO", "1", "PatientAddress"],
        "0x1050": ["LO", "1-n", "InsurancePlanIdentification"],
        "0x1060": ["PN", "1", "PatientMotherBirthName"],
        "0x1080": ["LO", "1", "MilitaryRank"],
        "0x1081": ["LO", "1", "BranchOfService"],
        "0x1090": ["LO", "1", "MedicalRecordLocator"],
        "0x1100": ["SQ", "1", "ReferencedPatientPhotoSequence"],
        "0x2000": ["LO", "1-n", "MedicalAlerts"],
        "0x2110": ["LO", "1-n", "Allergies"],
        "0x2150": ["LO", "1", "CountryOfResidence"],
        "0x2152": ["LO", "1", "RegionOfResidence"],
        "0x2154": ["SH", "1-n", "PatientTelephoneNumbers"],
        "0x2155": ["LT", "1", "PatientTelecomInformation"],
        "0x2160": ["SH", "1", "EthnicGroup"],
        "0x2180": ["SH", "1", "Occupation"],
        "0x21A0": ["CS", "1", "SmokingStatus"],
        "0x21B0": ["LT", "1", "AdditionalPatientHistory"],
        "0x21C0": ["US", "1", "PregnancyStatus"],
        "0x21D0": ["DA", "1", "LastMenstrualDate"],
        "0x21F0": ["LO", "1", "PatientReligiousPreference"],
        "0x2201": ["LO", "1", "PatientSpeciesDescription"],
        "0x2202": ["SQ", "1", "PatientSpeciesCodeSequence"],
        "0x2203": ["CS", "1", "PatientSexNeutered"],
        "0x2210": ["CS", "1", "AnatomicalOrientationType"],
        "0x2292": ["LO", "1", "PatientBreedDescription"],
        "0x2293": ["SQ", "1", "PatientBreedCodeSequence"],
        "0x2294": ["SQ", "1", "BreedRegistrationSequence"],
        "0x2295": ["LO", "1", "BreedRegistrationNumber"],
        "0x2296": ["SQ", "1", "BreedRegistryCodeSequence"],
        "0x2297": ["PN", "1", "ResponsiblePerson"],
        "0x2298": ["CS", "1", "ResponsiblePersonRole"],
        "0x2299": ["LO", "1", "ResponsibleOrganization"],
        "0x4000": ["LT", "1", "PatientComments"],
        "0x9431": ["FL", "1", "ExaminedBodyThickness"]
    },
    "0x0012": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["LO", "1", "ClinicalTrialSponsorName"],
        "0x0020": ["LO", "1", "ClinicalTrialProtocolID"],
        "0x0021": ["LO", "1", "ClinicalTrialProtocolName"],
        "0x0030": ["LO", "1", "ClinicalTrialSiteID"],
        "0x0031": ["LO", "1", "ClinicalTrialSiteName"],
        "0x0040": ["LO", "1", "ClinicalTrialSubjectID"],
        "0x0042": ["LO", "1", "ClinicalTrialSubjectReadingID"],
        "0x0050": ["LO", "1", "ClinicalTrialTimePointID"],
        "0x0051": ["ST", "1", "ClinicalTrialTimePointDescription"],
        "0x0060": ["LO", "1", "ClinicalTrialCoordinatingCenterName"],
        "0x0062": ["CS", "1", "PatientIdentityRemoved"],
        "0x0063": ["LO", "1-n", "DeidentificationMethod"],
        "0x0064": ["SQ", "1", "DeidentificationMethodCodeSequence"],
        "0x0071": ["LO", "1", "ClinicalTrialSeriesID"],
        "0x0072": ["LO", "1", "ClinicalTrialSeriesDescription"],
        "0x0081": ["LO", "1", "ClinicalTrialProtocolEthicsCommitteeName"],
        "0x0082": ["LO", "1", "ClinicalTrialProtocolEthicsCommitteeApprovalNumber"],
        "0x0083": ["SQ", "1", "ConsentForClinicalTrialUseSequence"],
        "0x0084": ["CS", "1", "DistributionType"],
        "0x0085": ["CS", "1", "ConsentForDistributionFlag"]
    },
    "0x0014": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0023": ["ST", "1-n", "CADFileFormat"],
        "0x0024": ["ST", "1-n", "ComponentReferenceSystem"],
        "0x0025": ["ST", "1-n", "ComponentManufacturingProcedure"],
        "0x0028": ["ST", "1-n", "ComponentManufacturer"],
        "0x0030": ["DS", "1-n", "MaterialThickness"],
        "0x0032": ["DS", "1-n", "MaterialPipeDiameter"],
        "0x0034": ["DS", "1-n", "MaterialIsolationDiameter"],
        "0x0042": ["ST", "1-n", "MaterialGrade"],
        "0x0044": ["ST", "1-n", "MaterialPropertiesDescription"],
        "0x0045": ["ST", "1-n", "MaterialPropertiesFileFormatRetired"],
        "0x0046": ["LT", "1", "MaterialNotes"],
        "0x0050": ["CS", "1", "ComponentShape"],
        "0x0052": ["CS", "1", "CurvatureType"],
        "0x0054": ["DS", "1", "OuterDiameter"],
        "0x0056": ["DS", "1", "InnerDiameter"],
        "0x1010": ["ST", "1", "ActualEnvironmentalConditions"],
        "0x1020": ["DA", "1", "ExpiryDate"],
        "0x1040": ["ST", "1", "EnvironmentalConditions"],
        "0x2002": ["SQ", "1", "EvaluatorSequence"],
        "0x2004": ["IS", "1", "EvaluatorNumber"],
        "0x2006": ["PN", "1", "EvaluatorName"],
        "0x2008": ["IS", "1", "EvaluationAttempt"],
        "0x2012": ["SQ", "1", "IndicationSequence"],
        "0x2014": ["IS", "1", "IndicationNumber"],
        "0x2016": ["SH", "1", "IndicationLabel"],
        "0x2018": ["ST", "1", "IndicationDescription"],
        "0x201A": ["CS", "1-n", "IndicationType"],
        "0x201C": ["CS", "1", "IndicationDisposition"],
        "0x201E": ["SQ", "1", "IndicationROISequence"],
        "0x2030": ["SQ", "1", "IndicationPhysicalPropertySequence"],
        "0x2032": ["SH", "1", "PropertyLabel"],
        "0x2202": ["IS", "1", "CoordinateSystemNumberOfAxes"],
        "0x2204": ["SQ", "1", "CoordinateSystemAxesSequence"],
        "0x2206": ["ST", "1", "CoordinateSystemAxisDescription"],
        "0x2208": ["CS", "1", "CoordinateSystemDataSetMapping"],
        "0x220A": ["IS", "1", "CoordinateSystemAxisNumber"],
        "0x220C": ["CS", "1", "CoordinateSystemAxisType"],
        "0x220E": ["CS", "1", "CoordinateSystemAxisUnits"],
        "0x2210": ["OB", "1", "CoordinateSystemAxisValues"],
        "0x2220": ["SQ", "1", "CoordinateSystemTransformSequence"],
        "0x2222": ["ST", "1", "TransformDescription"],
        "0x2224": ["IS", "1", "TransformNumberOfAxes"],
        "0x2226": ["IS", "1-n", "TransformOrderOfAxes"],
        "0x2228": ["CS", "1", "TransformedAxisUnits"],
        "0x222A": ["DS", "1-n", "CoordinateSystemTransformRotationAndScaleMatrix"],
        "0x222C": ["DS", "1-n", "CoordinateSystemTransformTranslationMatrix"],
        "0x3011": ["DS", "1", "InternalDetectorFrameTime"],
        "0x3012": ["DS", "1", "NumberOfFramesIntegrated"],
        "0x3020": ["SQ", "1", "DetectorTemperatureSequence"],
        "0x3022": ["ST", "1", "SensorName"],
        "0x3024": ["DS", "1", "HorizontalOffsetOfSensor"],
        "0x3026": ["DS", "1", "VerticalOffsetOfSensor"],
        "0x3028": ["DS", "1", "SensorTemperature"],
        "0x3040": ["SQ", "1", "DarkCurrentSequence"],
        "0x3050": ["ox", "1", "DarkCurrentCounts"],
        "0x3060": ["SQ", "1", "GainCorrectionReferenceSequence"],
        "0x3070": ["ox", "1", "AirCounts"],
        "0x3071": ["DS", "1", "KVUsedInGainCalibration"],
        "0x3072": ["DS", "1", "MAUsedInGainCalibration"],
        "0x3073": ["DS", "1", "NumberOfFramesUsedForIntegration"],
        "0x3074": ["LO", "1", "FilterMaterialUsedInGainCalibration"],
        "0x3075": ["DS", "1", "FilterThicknessUsedInGainCalibration"],
        "0x3076": ["DA", "1", "DateOfGainCalibration"],
        "0x3077": ["TM", "1", "TimeOfGainCalibration"],
        "0x3080": ["OB", "1", "BadPixelImage"],
        "0x3099": ["LT", "1", "CalibrationNotes"],
        "0x4002": ["SQ", "1", "PulserEquipmentSequence"],
        "0x4004": ["CS", "1", "PulserType"],
        "0x4006": ["LT", "1", "PulserNotes"],
        "0x4008": ["SQ", "1", "ReceiverEquipmentSequence"],
        "0x400A": ["CS", "1", "AmplifierType"],
        "0x400C": ["LT", "1", "ReceiverNotes"],
        "0x400E": ["SQ", "1", "PreAmplifierEquipmentSequence"],
        "0x400F": ["LT", "1", "PreAmplifierNotes"],
        "0x4010": ["SQ", "1", "TransmitTransducerSequence"],
        "0x4011": ["SQ", "1", "ReceiveTransducerSequence"],
        "0x4012": ["US", "1", "NumberOfElements"],
        "0x4013": ["CS", "1", "ElementShape"],
        "0x4014": ["DS", "1", "ElementDimensionA"],
        "0x4015": ["DS", "1", "ElementDimensionB"],
        "0x4016": ["DS", "1", "ElementPitchA"],
        "0x4017": ["DS", "1", "MeasuredBeamDimensionA"],
        "0x4018": ["DS", "1", "MeasuredBeamDimensionB"],
        "0x4019": ["DS", "1", "LocationOfMeasuredBeamDiameter"],
        "0x401A": ["DS", "1", "NominalFrequency"],
        "0x401B": ["DS", "1", "MeasuredCenterFrequency"],
        "0x401C": ["DS", "1", "MeasuredBandwidth"],
        "0x401D": ["DS", "1", "ElementPitchB"],
        "0x4020": ["SQ", "1", "PulserSettingsSequence"],
        "0x4022": ["DS", "1", "PulseWidth"],
        "0x4024": ["DS", "1", "ExcitationFrequency"],
        "0x4026": ["CS", "1", "ModulationType"],
        "0x4028": ["DS", "1", "Damping"],
        "0x4030": ["SQ", "1", "ReceiverSettingsSequence"],
        "0x4031": ["DS", "1", "AcquiredSoundpathLength"],
        "0x4032": ["CS", "1", "AcquisitionCompressionType"],
        "0x4033": ["IS", "1", "AcquisitionSampleSize"],
        "0x4034": ["DS", "1", "RectifierSmoothing"],
        "0x4035": ["SQ", "1", "DACSequence"],
        "0x4036": ["CS", "1", "DACType"],
        "0x4038": ["DS", "1-n", "DACGainPoints"],
        "0x403A": ["DS", "1-n", "DACTimePoints"],
        "0x403C": ["DS", "1-n", "DACAmplitude"],
        "0x4040": ["SQ", "1", "PreAmplifierSettingsSequence"],
        "0x4050": ["SQ", "1", "TransmitTransducerSettingsSequence"],
        "0x4051": ["SQ", "1", "ReceiveTransducerSettingsSequence"],
        "0x4052": ["DS", "1", "IncidentAngle"],
        "0x4054": ["ST", "1", "CouplingTechnique"],
        "0x4056": ["ST", "1", "CouplingMedium"],
        "0x4057": ["DS", "1", "CouplingVelocity"],
        "0x4058": ["DS", "1", "ProbeCenterLocationX"],
        "0x4059": ["DS", "1", "ProbeCenterLocationZ"],
        "0x405A": ["DS", "1", "SoundPathLength"],
        "0x405C": ["ST", "1", "DelayLawIdentifier"],
        "0x4060": ["SQ", "1", "GateSettingsSequence"],
        "0x4062": ["DS", "1", "GateThreshold"],
        "0x4064": ["DS", "1", "VelocityOfSound"],
        "0x4070": ["SQ", "1", "CalibrationSettingsSequence"],
        "0x4072": ["ST", "1", "CalibrationProcedure"],
        "0x4074": ["SH", "1", "ProcedureVersion"],
        "0x4076": ["DA", "1", "ProcedureCreationDate"],
        "0x4078": ["DA", "1", "ProcedureExpirationDate"],
        "0x407A": ["DA", "1", "ProcedureLastModifiedDate"],
        "0x407C": ["TM", "1-n", "CalibrationTime"],
        "0x407E": ["DA", "1-n", "CalibrationDate"],
        "0x4080": ["SQ", "1", "ProbeDriveEquipmentSequence"],
        "0x4081": ["CS", "1", "DriveType"],
        "0x4082": ["LT", "1", "ProbeDriveNotes"],
        "0x4083": ["SQ", "1", "DriveProbeSequence"],
        "0x4084": ["DS", "1", "ProbeInductance"],
        "0x4085": ["DS", "1", "ProbeResistance"],
        "0x4086": ["SQ", "1", "ReceiveProbeSequence"],
        "0x4087": ["SQ", "1", "ProbeDriveSettingsSequence"],
        "0x4088": ["DS", "1", "BridgeResistors"],
        "0x4089": ["DS", "1", "ProbeOrientationAngle"],
        "0x408B": ["DS", "1", "UserSelectedGainY"],
        "0x408C": ["DS", "1", "UserSelectedPhase"],
        "0x408D": ["DS", "1", "UserSelectedOffsetX"],
        "0x408E": ["DS", "1", "UserSelectedOffsetY"],
        "0x4091": ["SQ", "1", "ChannelSettingsSequence"],
        "0x4092": ["DS", "1", "ChannelThreshold"],
        "0x409A": ["SQ", "1", "ScannerSettingsSequence"],
        "0x409B": ["ST", "1", "ScanProcedure"],
        "0x409C": ["DS", "1", "TranslationRateX"],
        "0x409D": ["DS", "1", "TranslationRateY"],
        "0x409F": ["DS", "1", "ChannelOverlap"],
        "0x40A0": ["LO", "1", "ImageQualityIndicatorType"],
        "0x40A1": ["LO", "1", "ImageQualityIndicatorMaterial"],
        "0x40A2": ["LO", "1", "ImageQualityIndicatorSize"],
        "0x5002": ["IS", "1", "LINACEnergy"],
        "0x5004": ["IS", "1", "LINACOutput"],
        "0x5100": ["US", "1", "ActiveAperture"],
        "0x5101": ["DS", "1", "TotalAperture"],
        "0x5102": ["DS", "1", "ApertureElevation"],
        "0x5103": ["DS", "1", "MainLobeAngle"],
        "0x5104": ["DS", "1", "MainRoofAngle"],
        "0x5105": ["CS", "1", "ConnectorType"],
        "0x5106": ["SH", "1", "WedgeModelNumber"],
        "0x5107": ["DS", "1", "WedgeAngleFloat"],
        "0x5108": ["DS", "1", "WedgeRoofAngle"],
        "0x5109": ["CS", "1", "WedgeElement1Position"],
        "0x510A": ["DS", "1", "WedgeMaterialVelocity"],
        "0x510B": ["SH", "1", "WedgeMaterial"],
        "0x510C": ["DS", "1", "WedgeOffsetZ"],
        "0x510D": ["DS", "1", "WedgeOriginOffsetX"],
        "0x510E": ["DS", "1", "WedgeTimeDelay"],
        "0x510F": ["SH", "1", "WedgeName"],
        "0x5110": ["SH", "1", "WedgeManufacturerName"],
        "0x5111": ["LO", "1", "WedgeDescription"],
        "0x5112": ["DS", "1", "NominalBeamAngle"],
        "0x5113": ["DS", "1", "WedgeOffsetX"],
        "0x5114": ["DS", "1", "WedgeOffsetY"],
        "0x5115": ["DS", "1", "WedgeTotalLength"],
        "0x5116": ["DS", "1", "WedgeInContactLength"],
        "0x5117": ["DS", "1", "WedgeFrontGap"],
        "0x5118": ["DS", "1", "WedgeTotalHeight"],
        "0x5119": ["DS", "1", "WedgeFrontHeight"],
        "0x511A": ["DS", "1", "WedgeRearHeight"],
        "0x511B": ["DS", "1", "WedgeTotalWidth"],
        "0x511C": ["DS", "1", "WedgeInContactWidth"],
        "0x511D": ["DS", "1", "WedgeChamferHeight"],
        "0x511E": ["CS", "1", "WedgeCurve"],
        "0x511F": ["DS", "1", "RadiusAlongWedge"]
    },
    "0x0018": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["LO", "1", "ContrastBolusAgent"],
        "0x0012": ["SQ", "1", "ContrastBolusAgentSequence"],
        "0x0013": ["FL", "1", "ContrastBolusT1Relaxivity"],
        "0x0014": ["SQ", "1", "ContrastBolusAdministrationRouteSequence"],
        "0x0015": ["CS", "1", "BodyPartExamined"],
        "0x0020": ["CS", "1-n", "ScanningSequence"],
        "0x0021": ["CS", "1-n", "SequenceVariant"],
        "0x0022": ["CS", "1-n", "ScanOptions"],
        "0x0023": ["CS", "1", "MRAcquisitionType"],
        "0x0024": ["SH", "1", "SequenceName"],
        "0x0025": ["CS", "1", "AngioFlag"],
        "0x0026": ["SQ", "1", "InterventionDrugInformationSequence"],
        "0x0027": ["TM", "1", "InterventionDrugStopTime"],
        "0x0028": ["DS", "1", "InterventionDrugDose"],
        "0x0029": ["SQ", "1", "InterventionDrugCodeSequence"],
        "0x002A": ["SQ", "1", "AdditionalDrugSequence"],
        "0x0030": ["LO", "1-n", "Radionuclide"],
        "0x0031": ["LO", "1", "Radiopharmaceutical"],
        "0x0032": ["DS", "1", "EnergyWindowCenterline"],
        "0x0033": ["DS", "1-n", "EnergyWindowTotalWidth"],
        "0x0034": ["LO", "1", "InterventionDrugName"],
        "0x0035": ["TM", "1", "InterventionDrugStartTime"],
        "0x0036": ["SQ", "1", "InterventionSequence"],
        "0x0037": ["CS", "1", "TherapyType"],
        "0x0038": ["CS", "1", "InterventionStatus"],
        "0x0039": ["CS", "1", "TherapyDescription"],
        "0x003A": ["ST", "1", "InterventionDescription"],
        "0x0040": ["IS", "1", "CineRate"],
        "0x0042": ["CS", "1", "InitialCineRunState"],
        "0x0050": ["DS", "1", "SliceThickness"],
        "0x0060": ["DS", "1", "KVP"],
        "0x0070": ["IS", "1", "CountsAccumulated"],
        "0x0071": ["CS", "1", "AcquisitionTerminationCondition"],
        "0x0072": ["DS", "1", "EffectiveDuration"],
        "0x0073": ["CS", "1", "AcquisitionStartCondition"],
        "0x0074": ["IS", "1", "AcquisitionStartConditionData"],
        "0x0075": ["IS", "1", "AcquisitionTerminationConditionData"],
        "0x0080": ["DS", "1", "RepetitionTime"],
        "0x0081": ["DS", "1", "EchoTime"],
        "0x0082": ["DS", "1", "InversionTime"],
        "0x0083": ["DS", "1", "NumberOfAverages"],
        "0x0084": ["DS", "1", "ImagingFrequency"],
        "0x0085": ["SH", "1", "ImagedNucleus"],
        "0x0086": ["IS", "1-n", "EchoNumbers"],
        "0x0087": ["DS", "1", "MagneticFieldStrength"],
        "0x0088": ["DS", "1", "SpacingBetweenSlices"],
        "0x0089": ["IS", "1", "NumberOfPhaseEncodingSteps"],
        "0x0090": ["DS", "1", "DataCollectionDiameter"],
        "0x0091": ["IS", "1", "EchoTrainLength"],
        "0x0093": ["DS", "1", "PercentSampling"],
        "0x0094": ["DS", "1", "PercentPhaseFieldOfView"],
        "0x0095": ["DS", "1", "PixelBandwidth"],
        "0x1000": ["LO", "1", "DeviceSerialNumber"],
        "0x1002": ["UI", "1", "DeviceUID"],
        "0x1003": ["LO", "1", "DeviceID"],
        "0x1004": ["LO", "1", "PlateID"],
        "0x1005": ["LO", "1", "GeneratorID"],
        "0x1006": ["LO", "1", "GridID"],
        "0x1007": ["LO", "1", "CassetteID"],
        "0x1008": ["LO", "1", "GantryID"],
        "0x1010": ["LO", "1", "SecondaryCaptureDeviceID"],
        "0x1011": ["LO", "1", "HardcopyCreationDeviceID"],
        "0x1012": ["DA", "1", "DateOfSecondaryCapture"],
        "0x1014": ["TM", "1", "TimeOfSecondaryCapture"],
        "0x1016": ["LO", "1", "SecondaryCaptureDeviceManufacturer"],
        "0x1017": ["LO", "1", "HardcopyDeviceManufacturer"],
        "0x1018": ["LO", "1", "SecondaryCaptureDeviceManufacturerModelName"],
        "0x1019": ["LO", "1-n", "SecondaryCaptureDeviceSoftwareVersions"],
        "0x101A": ["LO", "1-n", "HardcopyDeviceSoftwareVersion"],
        "0x101B": ["LO", "1", "HardcopyDeviceManufacturerModelName"],
        "0x1020": ["LO", "1-n", "SoftwareVersions"],
        "0x1022": ["SH", "1", "VideoImageFormatAcquired"],
        "0x1023": ["LO", "1", "DigitalImageFormatAcquired"],
        "0x1030": ["LO", "1", "ProtocolName"],
        "0x1040": ["LO", "1", "ContrastBolusRoute"],
        "0x1041": ["DS", "1", "ContrastBolusVolume"],
        "0x1042": ["TM", "1", "ContrastBolusStartTime"],
        "0x1043": ["TM", "1", "ContrastBolusStopTime"],
        "0x1044": ["DS", "1", "ContrastBolusTotalDose"],
        "0x1045": ["IS", "1", "SyringeCounts"],
        "0x1046": ["DS", "1-n", "ContrastFlowRate"],
        "0x1047": ["DS", "1-n", "ContrastFlowDuration"],
        "0x1048": ["CS", "1", "ContrastBolusIngredient"],
        "0x1049": ["DS", "1", "ContrastBolusIngredientConcentration"],
        "0x1050": ["DS", "1", "SpatialResolution"],
        "0x1060": ["DS", "1", "TriggerTime"],
        "0x1061": ["LO", "1", "TriggerSourceOrType"],
        "0x1062": ["IS", "1", "NominalInterval"],
        "0x1063": ["DS", "1", "FrameTime"],
        "0x1064": ["LO", "1", "CardiacFramingType"],
        "0x1065": ["DS", "1-n", "FrameTimeVector"],
        "0x1066": ["DS", "1", "FrameDelay"],
        "0x1067": ["DS", "1", "ImageTriggerDelay"],
        "0x1068": ["DS", "1", "MultiplexGroupTimeOffset"],
        "0x1069": ["DS", "1", "TriggerTimeOffset"],
        "0x106A": ["CS", "1", "SynchronizationTrigger"],
        "0x106C": ["US", "2", "SynchronizationChannel"],
        "0x106E": ["UL", "1", "TriggerSamplePosition"],
        "0x1070": ["LO", "1", "RadiopharmaceuticalRoute"],
        "0x1071": ["DS", "1", "RadiopharmaceuticalVolume"],
        "0x1072": ["TM", "1", "RadiopharmaceuticalStartTime"],
        "0x1073": ["TM", "1", "RadiopharmaceuticalStopTime"],
        "0x1074": ["DS", "1", "RadionuclideTotalDose"],
        "0x1075": ["DS", "1", "RadionuclideHalfLife"],
        "0x1076": ["DS", "1", "RadionuclidePositronFraction"],
        "0x1077": ["DS", "1", "RadiopharmaceuticalSpecificActivity"],
        "0x1078": ["DT", "1", "RadiopharmaceuticalStartDateTime"],
        "0x1079": ["DT", "1", "RadiopharmaceuticalStopDateTime"],
        "0x1080": ["CS", "1", "BeatRejectionFlag"],
        "0x1081": ["IS", "1", "LowRRValue"],
        "0x1082": ["IS", "1", "HighRRValue"],
        "0x1083": ["IS", "1", "IntervalsAcquired"],
        "0x1084": ["IS", "1", "IntervalsRejected"],
        "0x1085": ["LO", "1", "PVCRejection"],
        "0x1086": ["IS", "1", "SkipBeats"],
        "0x1088": ["IS", "1", "HeartRate"],
        "0x1090": ["IS", "1", "CardiacNumberOfImages"],
        "0x1094": ["IS", "1", "TriggerWindow"],
        "0x1100": ["DS", "1", "ReconstructionDiameter"],
        "0x1110": ["DS", "1", "DistanceSourceToDetector"],
        "0x1111": ["DS", "1", "DistanceSourceToPatient"],
        "0x1114": ["DS", "1", "EstimatedRadiographicMagnificationFactor"],
        "0x1120": ["DS", "1", "GantryDetectorTilt"],
        "0x1121": ["DS", "1", "GantryDetectorSlew"],
        "0x1130": ["DS", "1", "TableHeight"],
        "0x1131": ["DS", "1", "TableTraverse"],
        "0x1134": ["CS", "1", "TableMotion"],
        "0x1135": ["DS", "1-n", "TableVerticalIncrement"],
        "0x1136": ["DS", "1-n", "TableLateralIncrement"],
        "0x1137": ["DS", "1-n", "TableLongitudinalIncrement"],
        "0x1138": ["DS", "1", "TableAngle"],
        "0x113A": ["CS", "1", "TableType"],
        "0x1140": ["CS", "1", "RotationDirection"],
        "0x1141": ["DS", "1", "AngularPosition"],
        "0x1142": ["DS", "1-n", "RadialPosition"],
        "0x1143": ["DS", "1", "ScanArc"],
        "0x1144": ["DS", "1", "AngularStep"],
        "0x1145": ["DS", "1", "CenterOfRotationOffset"],
        "0x1146": ["DS", "1-n", "RotationOffset"],
        "0x1147": ["CS", "1", "FieldOfViewShape"],
        "0x1149": ["IS", "1-2", "FieldOfViewDimensions"],
        "0x1150": ["IS", "1", "ExposureTime"],
        "0x1151": ["IS", "1", "XRayTubeCurrent"],
        "0x1152": ["IS", "1", "Exposure"],
        "0x1153": ["IS", "1", "ExposureInuAs"],
        "0x1154": ["DS", "1", "AveragePulseWidth"],
        "0x1155": ["CS", "1", "RadiationSetting"],
        "0x1156": ["CS", "1", "RectificationType"],
        "0x115A": ["CS", "1", "RadiationMode"],
        "0x115E": ["DS", "1", "ImageAndFluoroscopyAreaDoseProduct"],
        "0x1160": ["SH", "1", "FilterType"],
        "0x1161": ["LO", "1-n", "TypeOfFilters"],
        "0x1162": ["DS", "1", "IntensifierSize"],
        "0x1164": ["DS", "2", "ImagerPixelSpacing"],
        "0x1166": ["CS", "1-n", "Grid"],
        "0x1170": ["IS", "1", "GeneratorPower"],
        "0x1180": ["SH", "1", "CollimatorGridName"],
        "0x1181": ["CS", "1", "CollimatorType"],
        "0x1182": ["IS", "1-2", "FocalDistance"],
        "0x1183": ["DS", "1-2", "XFocusCenter"],
        "0x1184": ["DS", "1-2", "YFocusCenter"],
        "0x1190": ["DS", "1-n", "FocalSpots"],
        "0x1191": ["CS", "1", "AnodeTargetMaterial"],
        "0x11A0": ["DS", "1", "BodyPartThickness"],
        "0x11A2": ["DS", "1", "CompressionForce"],
        "0x11A4": ["LO", "1", "PaddleDescription"],
        "0x1200": ["DA", "1-n", "DateOfLastCalibration"],
        "0x1201": ["TM", "1-n", "TimeOfLastCalibration"],
        "0x1202": ["DT", "1", "DateTimeOfLastCalibration"],
        "0x1210": ["SH", "1-n", "ConvolutionKernel"],
        "0x1240": ["IS", "1-n", "UpperLowerPixelValues"],
        "0x1242": ["IS", "1", "ActualFrameDuration"],
        "0x1243": ["IS", "1", "CountRate"],
        "0x1244": ["US", "1", "PreferredPlaybackSequencing"],
        "0x1250": ["SH", "1", "ReceiveCoilName"],
        "0x1251": ["SH", "1", "TransmitCoilName"],
        "0x1260": ["SH", "1", "PlateType"],
        "0x1261": ["LO", "1", "PhosphorType"],
        "0x1300": ["DS", "1", "ScanVelocity"],
        "0x1301": ["CS", "1-n", "WholeBodyTechnique"],
        "0x1302": ["IS", "1", "ScanLength"],
        "0x1310": ["US", "4", "AcquisitionMatrix"],
        "0x1312": ["CS", "1", "InPlanePhaseEncodingDirection"],
        "0x1314": ["DS", "1", "FlipAngle"],
        "0x1315": ["CS", "1", "VariableFlipAngleFlag"],
        "0x1316": ["DS", "1", "SAR"],
        "0x1318": ["DS", "1", "dBdt"],
        "0x1400": ["LO", "1", "AcquisitionDeviceProcessingDescription"],
        "0x1401": ["LO", "1", "AcquisitionDeviceProcessingCode"],
        "0x1402": ["CS", "1", "CassetteOrientation"],
        "0x1403": ["CS", "1", "CassetteSize"],
        "0x1404": ["US", "1", "ExposuresOnPlate"],
        "0x1405": ["IS", "1", "RelativeXRayExposure"],
        "0x1411": ["DS", "1", "ExposureIndex"],
        "0x1412": ["DS", "1", "TargetExposureIndex"],
        "0x1413": ["DS", "1", "DeviationIndex"],
        "0x1450": ["DS", "1", "ColumnAngulation"],
        "0x1460": ["DS", "1", "TomoLayerHeight"],
        "0x1470": ["DS", "1", "TomoAngle"],
        "0x1480": ["DS", "1", "TomoTime"],
        "0x1490": ["CS", "1", "TomoType"],
        "0x1491": ["CS", "1", "TomoClass"],
        "0x1495": ["IS", "1", "NumberOfTomosynthesisSourceImages"],
        "0x1500": ["CS", "1", "PositionerMotion"],
        "0x1508": ["CS", "1", "PositionerType"],
        "0x1510": ["DS", "1", "PositionerPrimaryAngle"],
        "0x1511": ["DS", "1", "PositionerSecondaryAngle"],
        "0x1520": ["DS", "1-n", "PositionerPrimaryAngleIncrement"],
        "0x1521": ["DS", "1-n", "PositionerSecondaryAngleIncrement"],
        "0x1530": ["DS", "1", "DetectorPrimaryAngle"],
        "0x1531": ["DS", "1", "DetectorSecondaryAngle"],
        "0x1600": ["CS", "1-3", "ShutterShape"],
        "0x1602": ["IS", "1", "ShutterLeftVerticalEdge"],
        "0x1604": ["IS", "1", "ShutterRightVerticalEdge"],
        "0x1606": ["IS", "1", "ShutterUpperHorizontalEdge"],
        "0x1608": ["IS", "1", "ShutterLowerHorizontalEdge"],
        "0x1610": ["IS", "2", "CenterOfCircularShutter"],
        "0x1612": ["IS", "1", "RadiusOfCircularShutter"],
        "0x1620": ["IS", "2-2n", "VerticesOfThePolygonalShutter"],
        "0x1622": ["US", "1", "ShutterPresentationValue"],
        "0x1623": ["US", "1", "ShutterOverlayGroup"],
        "0x1624": ["US", "3", "ShutterPresentationColorCIELabValue"],
        "0x1700": ["CS", "1-3", "CollimatorShape"],
        "0x1702": ["IS", "1", "CollimatorLeftVerticalEdge"],
        "0x1704": ["IS", "1", "CollimatorRightVerticalEdge"],
        "0x1706": ["IS", "1", "CollimatorUpperHorizontalEdge"],
        "0x1708": ["IS", "1", "CollimatorLowerHorizontalEdge"],
        "0x1710": ["IS", "2", "CenterOfCircularCollimator"],
        "0x1712": ["IS", "1", "RadiusOfCircularCollimator"],
        "0x1720": ["IS", "2-2n", "VerticesOfThePolygonalCollimator"],
        "0x1800": ["CS", "1", "AcquisitionTimeSynchronized"],
        "0x1801": ["SH", "1", "TimeSource"],
        "0x1802": ["CS", "1", "TimeDistributionProtocol"],
        "0x1803": ["LO", "1", "NTPSourceAddress"],
        "0x2001": ["IS", "1-n", "PageNumberVector"],
        "0x2002": ["SH", "1-n", "FrameLabelVector"],
        "0x2003": ["DS", "1-n", "FramePrimaryAngleVector"],
        "0x2004": ["DS", "1-n", "FrameSecondaryAngleVector"],
        "0x2005": ["DS", "1-n", "SliceLocationVector"],
        "0x2006": ["SH", "1-n", "DisplayWindowLabelVector"],
        "0x2010": ["DS", "2", "NominalScannedPixelSpacing"],
        "0x2020": ["CS", "1", "DigitizingDeviceTransportDirection"],
        "0x2030": ["DS", "1", "RotationOfScannedFilm"],
        "0x2041": ["SQ", "1", "BiopsyTargetSequence"],
        "0x2042": ["UI", "1", "TargetUID"],
        "0x2043": ["FL", "2", "LocalizingCursorPosition"],
        "0x2044": ["FL", "3", "CalculatedTargetPosition"],
        "0x2045": ["SH", "1", "TargetLabel"],
        "0x2046": ["FL", "1", "DisplayedZValue"],
        "0x3100": ["CS", "1", "IVUSAcquisition"],
        "0x3101": ["DS", "1", "IVUSPullbackRate"],
        "0x3102": ["DS", "1", "IVUSGatedRate"],
        "0x3103": ["IS", "1", "IVUSPullbackStartFrameNumber"],
        "0x3104": ["IS", "1", "IVUSPullbackStopFrameNumber"],
        "0x3105": ["IS", "1-n", "LesionNumber"],
        "0x4000": ["LT", "1", "AcquisitionComments"],
        "0x5000": ["SH", "1-n", "OutputPower"],
        "0x5010": ["LO", "1-n", "TransducerData"],
        "0x5012": ["DS", "1", "FocusDepth"],
        "0x5020": ["LO", "1", "ProcessingFunction"],
        "0x5021": ["LO", "1", "PostprocessingFunction"],
        "0x5022": ["DS", "1", "MechanicalIndex"],
        "0x5024": ["DS", "1", "BoneThermalIndex"],
        "0x5026": ["DS", "1", "CranialThermalIndex"],
        "0x5027": ["DS", "1", "SoftTissueThermalIndex"],
        "0x5028": ["DS", "1", "SoftTissueFocusThermalIndex"],
        "0x5029": ["DS", "1", "SoftTissueSurfaceThermalIndex"],
        "0x5030": ["DS", "1", "DynamicRange"],
        "0x5040": ["DS", "1", "TotalGain"],
        "0x5050": ["IS", "1", "DepthOfScanField"],
        "0x5100": ["CS", "1", "PatientPosition"],
        "0x5101": ["CS", "1", "ViewPosition"],
        "0x5104": ["SQ", "1", "ProjectionEponymousNameCodeSequence"],
        "0x5210": ["DS", "6", "ImageTransformationMatrix"],
        "0x5212": ["DS", "3", "ImageTranslationVector"],
        "0x6000": ["DS", "1", "Sensitivity"],
        "0x6011": ["SQ", "1", "SequenceOfUltrasoundRegions"],
        "0x6012": ["US", "1", "RegionSpatialFormat"],
        "0x6014": ["US", "1", "RegionDataType"],
        "0x6016": ["UL", "1", "RegionFlags"],
        "0x6018": ["UL", "1", "RegionLocationMinX0"],
        "0x601A": ["UL", "1", "RegionLocationMinY0"],
        "0x601C": ["UL", "1", "RegionLocationMaxX1"],
        "0x601E": ["UL", "1", "RegionLocationMaxY1"],
        "0x6020": ["SL", "1", "ReferencePixelX0"],
        "0x6022": ["SL", "1", "ReferencePixelY0"],
        "0x6024": ["US", "1", "PhysicalUnitsXDirection"],
        "0x6026": ["US", "1", "PhysicalUnitsYDirection"],
        "0x6028": ["FD", "1", "ReferencePixelPhysicalValueX"],
        "0x602A": ["FD", "1", "ReferencePixelPhysicalValueY"],
        "0x602C": ["FD", "1", "PhysicalDeltaX"],
        "0x602E": ["FD", "1", "PhysicalDeltaY"],
        "0x6030": ["UL", "1", "TransducerFrequency"],
        "0x6031": ["CS", "1", "TransducerType"],
        "0x6032": ["UL", "1", "PulseRepetitionFrequency"],
        "0x6034": ["FD", "1", "DopplerCorrectionAngle"],
        "0x6036": ["FD", "1", "SteeringAngle"],
        "0x6038": ["UL", "1", "DopplerSampleVolumeXPositionRetired"],
        "0x6039": ["SL", "1", "DopplerSampleVolumeXPosition"],
        "0x603A": ["UL", "1", "DopplerSampleVolumeYPositionRetired"],
        "0x603B": ["SL", "1", "DopplerSampleVolumeYPosition"],
        "0x603C": ["UL", "1", "TMLinePositionX0Retired"],
        "0x603D": ["SL", "1", "TMLinePositionX0"],
        "0x603E": ["UL", "1", "TMLinePositionY0Retired"],
        "0x603F": ["SL", "1", "TMLinePositionY0"],
        "0x6040": ["UL", "1", "TMLinePositionX1Retired"],
        "0x6041": ["SL", "1", "TMLinePositionX1"],
        "0x6042": ["UL", "1", "TMLinePositionY1Retired"],
        "0x6043": ["SL", "1", "TMLinePositionY1"],
        "0x6044": ["US", "1", "PixelComponentOrganization"],
        "0x6046": ["UL", "1", "PixelComponentMask"],
        "0x6048": ["UL", "1", "PixelComponentRangeStart"],
        "0x604A": ["UL", "1", "PixelComponentRangeStop"],
        "0x604C": ["US", "1", "PixelComponentPhysicalUnits"],
        "0x604E": ["US", "1", "PixelComponentDataType"],
        "0x6050": ["UL", "1", "NumberOfTableBreakPoints"],
        "0x6052": ["UL", "1-n", "TableOfXBreakPoints"],
        "0x6054": ["FD", "1-n", "TableOfYBreakPoints"],
        "0x6056": ["UL", "1", "NumberOfTableEntries"],
        "0x6058": ["UL", "1-n", "TableOfPixelValues"],
        "0x605A": ["FL", "1-n", "TableOfParameterValues"],
        "0x6060": ["FL", "1-n", "RWaveTimeVector"],
        "0x7000": ["CS", "1", "DetectorConditionsNominalFlag"],
        "0x7001": ["DS", "1", "DetectorTemperature"],
        "0x7004": ["CS", "1", "DetectorType"],
        "0x7005": ["CS", "1", "DetectorConfiguration"],
        "0x7006": ["LT", "1", "DetectorDescription"],
        "0x7008": ["LT", "1", "DetectorMode"],
        "0x700A": ["SH", "1", "DetectorID"],
        "0x700C": ["DA", "1", "DateOfLastDetectorCalibration"],
        "0x700E": ["TM", "1", "TimeOfLastDetectorCalibration"],
        "0x7010": ["IS", "1", "ExposuresOnDetectorSinceLastCalibration"],
        "0x7011": ["IS", "1", "ExposuresOnDetectorSinceManufactured"],
        "0x7012": ["DS", "1", "DetectorTimeSinceLastExposure"],
        "0x7014": ["DS", "1", "DetectorActiveTime"],
        "0x7016": ["DS", "1", "DetectorActivationOffsetFromExposure"],
        "0x701A": ["DS", "2", "DetectorBinning"],
        "0x7020": ["DS", "2", "DetectorElementPhysicalSize"],
        "0x7022": ["DS", "2", "DetectorElementSpacing"],
        "0x7024": ["CS", "1", "DetectorActiveShape"],
        "0x7026": ["DS", "1-2", "DetectorActiveDimensions"],
        "0x7028": ["DS", "2", "DetectorActiveOrigin"],
        "0x702A": ["LO", "1", "DetectorManufacturerName"],
        "0x702B": ["LO", "1", "DetectorManufacturerModelName"],
        "0x7030": ["DS", "2", "FieldOfViewOrigin"],
        "0x7032": ["DS", "1", "FieldOfViewRotation"],
        "0x7034": ["CS", "1", "FieldOfViewHorizontalFlip"],
        "0x7036": ["FL", "2", "PixelDataAreaOriginRelativeToFOV"],
        "0x7038": ["FL", "1", "PixelDataAreaRotationAngleRelativeToFOV"],
        "0x7040": ["LT", "1", "GridAbsorbingMaterial"],
        "0x7041": ["LT", "1", "GridSpacingMaterial"],
        "0x7042": ["DS", "1", "GridThickness"],
        "0x7044": ["DS", "1", "GridPitch"],
        "0x7046": ["IS", "2", "GridAspectRatio"],
        "0x7048": ["DS", "1", "GridPeriod"],
        "0x704C": ["DS", "1", "GridFocalDistance"],
        "0x7050": ["CS", "1-n", "FilterMaterial"],
        "0x7052": ["DS", "1-n", "FilterThicknessMinimum"],
        "0x7054": ["DS", "1-n", "FilterThicknessMaximum"],
        "0x7056": ["FL", "1-n", "FilterBeamPathLengthMinimum"],
        "0x7058": ["FL", "1-n", "FilterBeamPathLengthMaximum"],
        "0x7060": ["CS", "1", "ExposureControlMode"],
        "0x7062": ["LT", "1", "ExposureControlModeDescription"],
        "0x7064": ["CS", "1", "ExposureStatus"],
        "0x7065": ["DS", "1", "PhototimerSetting"],
        "0x8150": ["DS", "1", "ExposureTimeInuS"],
        "0x8151": ["DS", "1", "XRayTubeCurrentInuA"],
        "0x9004": ["CS", "1", "ContentQualification"],
        "0x9005": ["SH", "1", "PulseSequenceName"],
        "0x9006": ["SQ", "1", "MRImagingModifierSequence"],
        "0x9008": ["CS", "1", "EchoPulseSequence"],
        "0x9009": ["CS", "1", "InversionRecovery"],
        "0x9010": ["CS", "1", "FlowCompensation"],
        "0x9011": ["CS", "1", "MultipleSpinEcho"],
        "0x9012": ["CS", "1", "MultiPlanarExcitation"],
        "0x9014": ["CS", "1", "PhaseContrast"],
        "0x9015": ["CS", "1", "TimeOfFlightContrast"],
        "0x9016": ["CS", "1", "Spoiling"],
        "0x9017": ["CS", "1", "SteadyStatePulseSequence"],
        "0x9018": ["CS", "1", "EchoPlanarPulseSequence"],
        "0x9019": ["FD", "1", "TagAngleFirstAxis"],
        "0x9020": ["CS", "1", "MagnetizationTransfer"],
        "0x9021": ["CS", "1", "T2Preparation"],
        "0x9022": ["CS", "1", "BloodSignalNulling"],
        "0x9024": ["CS", "1", "SaturationRecovery"],
        "0x9025": ["CS", "1", "SpectrallySelectedSuppression"],
        "0x9026": ["CS", "1", "SpectrallySelectedExcitation"],
        "0x9027": ["CS", "1", "SpatialPresaturation"],
        "0x9028": ["CS", "1", "Tagging"],
        "0x9029": ["CS", "1", "OversamplingPhase"],
        "0x9030": ["FD", "1", "TagSpacingFirstDimension"],
        "0x9032": ["CS", "1", "GeometryOfKSpaceTraversal"],
        "0x9033": ["CS", "1", "SegmentedKSpaceTraversal"],
        "0x9034": ["CS", "1", "RectilinearPhaseEncodeReordering"],
        "0x9035": ["FD", "1", "TagThickness"],
        "0x9036": ["CS", "1", "PartialFourierDirection"],
        "0x9037": ["CS", "1", "CardiacSynchronizationTechnique"],
        "0x9041": ["LO", "1", "ReceiveCoilManufacturerName"],
        "0x9042": ["SQ", "1", "MRReceiveCoilSequence"],
        "0x9043": ["CS", "1", "ReceiveCoilType"],
        "0x9044": ["CS", "1", "QuadratureReceiveCoil"],
        "0x9045": ["SQ", "1", "MultiCoilDefinitionSequence"],
        "0x9046": ["LO", "1", "MultiCoilConfiguration"],
        "0x9047": ["SH", "1", "MultiCoilElementName"],
        "0x9048": ["CS", "1", "MultiCoilElementUsed"],
        "0x9049": ["SQ", "1", "MRTransmitCoilSequence"],
        "0x9050": ["LO", "1", "TransmitCoilManufacturerName"],
        "0x9051": ["CS", "1", "TransmitCoilType"],
        "0x9052": ["FD", "1-2", "SpectralWidth"],
        "0x9053": ["FD", "1-2", "ChemicalShiftReference"],
        "0x9054": ["CS", "1", "VolumeLocalizationTechnique"],
        "0x9058": ["US", "1", "MRAcquisitionFrequencyEncodingSteps"],
        "0x9059": ["CS", "1", "Decoupling"],
        "0x9060": ["CS", "1-2", "DecoupledNucleus"],
        "0x9061": ["FD", "1-2", "DecouplingFrequency"],
        "0x9062": ["CS", "1", "DecouplingMethod"],
        "0x9063": ["FD", "1-2", "DecouplingChemicalShiftReference"],
        "0x9064": ["CS", "1", "KSpaceFiltering"],
        "0x9065": ["CS", "1-2", "TimeDomainFiltering"],
        "0x9066": ["US", "1-2", "NumberOfZeroFills"],
        "0x9067": ["CS", "1", "BaselineCorrection"],
        "0x9069": ["FD", "1", "ParallelReductionFactorInPlane"],
        "0x9070": ["FD", "1", "CardiacRRIntervalSpecified"],
        "0x9073": ["FD", "1", "AcquisitionDuration"],
        "0x9074": ["DT", "1", "FrameAcquisitionDateTime"],
        "0x9075": ["CS", "1", "DiffusionDirectionality"],
        "0x9076": ["SQ", "1", "DiffusionGradientDirectionSequence"],
        "0x9077": ["CS", "1", "ParallelAcquisition"],
        "0x9078": ["CS", "1", "ParallelAcquisitionTechnique"],
        "0x9079": ["FD", "1-n", "InversionTimes"],
        "0x9080": ["ST", "1", "MetaboliteMapDescription"],
        "0x9081": ["CS", "1", "PartialFourier"],
        "0x9082": ["FD", "1", "EffectiveEchoTime"],
        "0x9083": ["SQ", "1", "MetaboliteMapCodeSequence"],
        "0x9084": ["SQ", "1", "ChemicalShiftSequence"],
        "0x9085": ["CS", "1", "CardiacSignalSource"],
        "0x9087": ["FD", "1", "DiffusionBValue"],
        "0x9089": ["FD", "3", "DiffusionGradientOrientation"],
        "0x9090": ["FD", "3", "VelocityEncodingDirection"],
        "0x9091": ["FD", "1", "VelocityEncodingMinimumValue"],
        "0x9092": ["SQ", "1", "VelocityEncodingAcquisitionSequence"],
        "0x9093": ["US", "1", "NumberOfKSpaceTrajectories"],
        "0x9094": ["CS", "1", "CoverageOfKSpace"],
        "0x9095": ["UL", "1", "SpectroscopyAcquisitionPhaseRows"],
        "0x9096": ["FD", "1", "ParallelReductionFactorInPlaneRetired"],
        "0x9098": ["FD", "1-2", "TransmitterFrequency"],
        "0x9100": ["CS", "1-2", "ResonantNucleus"],
        "0x9101": ["CS", "1", "FrequencyCorrection"],
        "0x9103": ["SQ", "1", "MRSpectroscopyFOVGeometrySequence"],
        "0x9104": ["FD", "1", "SlabThickness"],
        "0x9105": ["FD", "3", "SlabOrientation"],
        "0x9106": ["FD", "3", "MidSlabPosition"],
        "0x9107": ["SQ", "1", "MRSpatialSaturationSequence"],
        "0x9112": ["SQ", "1", "MRTimingAndRelatedParametersSequence"],
        "0x9114": ["SQ", "1", "MREchoSequence"],
        "0x9115": ["SQ", "1", "MRModifierSequence"],
        "0x9117": ["SQ", "1", "MRDiffusionSequence"],
        "0x9118": ["SQ", "1", "CardiacSynchronizationSequence"],
        "0x9119": ["SQ", "1", "MRAveragesSequence"],
        "0x9125": ["SQ", "1", "MRFOVGeometrySequence"],
        "0x9126": ["SQ", "1", "VolumeLocalizationSequence"],
        "0x9127": ["UL", "1", "SpectroscopyAcquisitionDataColumns"],
        "0x9147": ["CS", "1", "DiffusionAnisotropyType"],
        "0x9151": ["DT", "1", "FrameReferenceDateTime"],
        "0x9152": ["SQ", "1", "MRMetaboliteMapSequence"],
        "0x9155": ["FD", "1", "ParallelReductionFactorOutOfPlane"],
        "0x9159": ["UL", "1", "SpectroscopyAcquisitionOutOfPlanePhaseSteps"],
        "0x9166": ["CS", "1", "BulkMotionStatus"],
        "0x9168": ["FD", "1", "ParallelReductionFactorSecondInPlane"],
        "0x9169": ["CS", "1", "CardiacBeatRejectionTechnique"],
        "0x9170": ["CS", "1", "RespiratoryMotionCompensationTechnique"],
        "0x9171": ["CS", "1", "RespiratorySignalSource"],
        "0x9172": ["CS", "1", "BulkMotionCompensationTechnique"],
        "0x9173": ["CS", "1", "BulkMotionSignalSource"],
        "0x9174": ["CS", "1", "ApplicableSafetyStandardAgency"],
        "0x9175": ["LO", "1", "ApplicableSafetyStandardDescription"],
        "0x9176": ["SQ", "1", "OperatingModeSequence"],
        "0x9177": ["CS", "1", "OperatingModeType"],
        "0x9178": ["CS", "1", "OperatingMode"],
        "0x9179": ["CS", "1", "SpecificAbsorptionRateDefinition"],
        "0x9180": ["CS", "1", "GradientOutputType"],
        "0x9181": ["FD", "1", "SpecificAbsorptionRateValue"],
        "0x9182": ["FD", "1", "GradientOutput"],
        "0x9183": ["CS", "1", "FlowCompensationDirection"],
        "0x9184": ["FD", "1", "TaggingDelay"],
        "0x9185": ["ST", "1", "RespiratoryMotionCompensationTechniqueDescription"],
        "0x9186": ["SH", "1", "RespiratorySignalSourceID"],
        "0x9195": ["FD", "1", "ChemicalShiftMinimumIntegrationLimitInHz"],
        "0x9196": ["FD", "1", "ChemicalShiftMaximumIntegrationLimitInHz"],
        "0x9197": ["SQ", "1", "MRVelocityEncodingSequence"],
        "0x9198": ["CS", "1", "FirstOrderPhaseCorrection"],
        "0x9199": ["CS", "1", "WaterReferencedPhaseCorrection"],
        "0x9200": ["CS", "1", "MRSpectroscopyAcquisitionType"],
        "0x9214": ["CS", "1", "RespiratoryCyclePosition"],
        "0x9217": ["FD", "1", "VelocityEncodingMaximumValue"],
        "0x9218": ["FD", "1", "TagSpacingSecondDimension"],
        "0x9219": ["SS", "1", "TagAngleSecondAxis"],
        "0x9220": ["FD", "1", "FrameAcquisitionDuration"],
        "0x9226": ["SQ", "1", "MRImageFrameTypeSequence"],
        "0x9227": ["SQ", "1", "MRSpectroscopyFrameTypeSequence"],
        "0x9231": ["US", "1", "MRAcquisitionPhaseEncodingStepsInPlane"],
        "0x9232": ["US", "1", "MRAcquisitionPhaseEncodingStepsOutOfPlane"],
        "0x9234": ["UL", "1", "SpectroscopyAcquisitionPhaseColumns"],
        "0x9236": ["CS", "1", "CardiacCyclePosition"],
        "0x9239": ["SQ", "1", "SpecificAbsorptionRateSequence"],
        "0x9240": ["US", "1", "RFEchoTrainLength"],
        "0x9241": ["US", "1", "GradientEchoTrainLength"],
        "0x9250": ["CS", "1", "ArterialSpinLabelingContrast"],
        "0x9251": ["SQ", "1", "MRArterialSpinLabelingSequence"],
        "0x9252": ["LO", "1", "ASLTechniqueDescription"],
        "0x9253": ["US", "1", "ASLSlabNumber"],
        "0x9254": ["FD", "1", "ASLSlabThickness"],
        "0x9255": ["FD", "3", "ASLSlabOrientation"],
        "0x9256": ["FD", "3", "ASLMidSlabPosition"],
        "0x9257": ["CS", "1", "ASLContext"],
        "0x9258": ["UL", "1", "ASLPulseTrainDuration"],
        "0x9259": ["CS", "1", "ASLCrusherFlag"],
        "0x925A": ["FD", "1", "ASLCrusherFlowLimit"],
        "0x925B": ["LO", "1", "ASLCrusherDescription"],
        "0x925C": ["CS", "1", "ASLBolusCutoffFlag"],
        "0x925D": ["SQ", "1", "ASLBolusCutoffTimingSequence"],
        "0x925E": ["LO", "1", "ASLBolusCutoffTechnique"],
        "0x925F": ["UL", "1", "ASLBolusCutoffDelayTime"],
        "0x9260": ["SQ", "1", "ASLSlabSequence"],
        "0x9295": ["FD", "1", "ChemicalShiftMinimumIntegrationLimitInppm"],
        "0x9296": ["FD", "1", "ChemicalShiftMaximumIntegrationLimitInppm"],
        "0x9297": ["CS", "1", "WaterReferenceAcquisition"],
        "0x9298": ["IS", "1", "EchoPeakPosition"],
        "0x9301": ["SQ", "1", "CTAcquisitionTypeSequence"],
        "0x9302": ["CS", "1", "AcquisitionType"],
        "0x9303": ["FD", "1", "TubeAngle"],
        "0x9304": ["SQ", "1", "CTAcquisitionDetailsSequence"],
        "0x9305": ["FD", "1", "RevolutionTime"],
        "0x9306": ["FD", "1", "SingleCollimationWidth"],
        "0x9307": ["FD", "1", "TotalCollimationWidth"],
        "0x9308": ["SQ", "1", "CTTableDynamicsSequence"],
        "0x9309": ["FD", "1", "TableSpeed"],
        "0x9310": ["FD", "1", "TableFeedPerRotation"],
        "0x9311": ["FD", "1", "SpiralPitchFactor"],
        "0x9312": ["SQ", "1", "CTGeometrySequence"],
        "0x9313": ["FD", "3", "DataCollectionCenterPatient"],
        "0x9314": ["SQ", "1", "CTReconstructionSequence"],
        "0x9315": ["CS", "1", "ReconstructionAlgorithm"],
        "0x9316": ["CS", "1", "ConvolutionKernelGroup"],
        "0x9317": ["FD", "2", "ReconstructionFieldOfView"],
        "0x9318": ["FD", "3", "ReconstructionTargetCenterPatient"],
        "0x9319": ["FD", "1", "ReconstructionAngle"],
        "0x9320": ["SH", "1", "ImageFilter"],
        "0x9321": ["SQ", "1", "CTExposureSequence"],
        "0x9322": ["FD", "2", "ReconstructionPixelSpacing"],
        "0x9323": ["CS", "1", "ExposureModulationType"],
        "0x9324": ["FD", "1", "EstimatedDoseSaving"],
        "0x9325": ["SQ", "1", "CTXRayDetailsSequence"],
        "0x9326": ["SQ", "1", "CTPositionSequence"],
        "0x9327": ["FD", "1", "TablePosition"],
        "0x9328": ["FD", "1", "ExposureTimeInms"],
        "0x9329": ["SQ", "1", "CTImageFrameTypeSequence"],
        "0x9330": ["FD", "1", "XRayTubeCurrentInmA"],
        "0x9332": ["FD", "1", "ExposureInmAs"],
        "0x9333": ["CS", "1", "ConstantVolumeFlag"],
        "0x9334": ["CS", "1", "FluoroscopyFlag"],
        "0x9335": ["FD", "1", "DistanceSourceToDataCollectionCenter"],
        "0x9337": ["US", "1", "ContrastBolusAgentNumber"],
        "0x9338": ["SQ", "1", "ContrastBolusIngredientCodeSequence"],
        "0x9340": ["SQ", "1", "ContrastAdministrationProfileSequence"],
        "0x9341": ["SQ", "1", "ContrastBolusUsageSequence"],
        "0x9342": ["CS", "1", "ContrastBolusAgentAdministered"],
        "0x9343": ["CS", "1", "ContrastBolusAgentDetected"],
        "0x9344": ["CS", "1", "ContrastBolusAgentPhase"],
        "0x9345": ["FD", "1", "CTDIvol"],
        "0x9346": ["SQ", "1", "CTDIPhantomTypeCodeSequence"],
        "0x9351": ["FL", "1", "CalciumScoringMassFactorPatient"],
        "0x9352": ["FL", "3", "CalciumScoringMassFactorDevice"],
        "0x9353": ["FL", "1", "EnergyWeightingFactor"],
        "0x9360": ["SQ", "1", "CTAdditionalXRaySourceSequence"],
        "0x9401": ["SQ", "1", "ProjectionPixelCalibrationSequence"],
        "0x9402": ["FL", "1", "DistanceSourceToIsocenter"],
        "0x9403": ["FL", "1", "DistanceObjectToTableTop"],
        "0x9404": ["FL", "2", "ObjectPixelSpacingInCenterOfBeam"],
        "0x9405": ["SQ", "1", "PositionerPositionSequence"],
        "0x9406": ["SQ", "1", "TablePositionSequence"],
        "0x9407": ["SQ", "1", "CollimatorShapeSequence"],
        "0x9410": ["CS", "1", "PlanesInAcquisition"],
        "0x9412": ["SQ", "1", "XAXRFFrameCharacteristicsSequence"],
        "0x9417": ["SQ", "1", "FrameAcquisitionSequence"],
        "0x9420": ["CS", "1", "XRayReceptorType"],
        "0x9423": ["LO", "1", "AcquisitionProtocolName"],
        "0x9424": ["LT", "1", "AcquisitionProtocolDescription"],
        "0x9425": ["CS", "1", "ContrastBolusIngredientOpaque"],
        "0x9426": ["FL", "1", "DistanceReceptorPlaneToDetectorHousing"],
        "0x9427": ["CS", "1", "IntensifierActiveShape"],
        "0x9428": ["FL", "1-2", "IntensifierActiveDimensions"],
        "0x9429": ["FL", "2", "PhysicalDetectorSize"],
        "0x9430": ["FL", "2", "PositionOfIsocenterProjection"],
        "0x9432": ["SQ", "1", "FieldOfViewSequence"],
        "0x9433": ["LO", "1", "FieldOfViewDescription"],
        "0x9434": ["SQ", "1", "ExposureControlSensingRegionsSequence"],
        "0x9435": ["CS", "1", "ExposureControlSensingRegionShape"],
        "0x9436": ["SS", "1", "ExposureControlSensingRegionLeftVerticalEdge"],
        "0x9437": ["SS", "1", "ExposureControlSensingRegionRightVerticalEdge"],
        "0x9438": ["SS", "1", "ExposureControlSensingRegionUpperHorizontalEdge"],
        "0x9439": ["SS", "1", "ExposureControlSensingRegionLowerHorizontalEdge"],
        "0x9440": ["SS", "2", "CenterOfCircularExposureControlSensingRegion"],
        "0x9441": ["US", "1", "RadiusOfCircularExposureControlSensingRegion"],
        "0x9442": ["SS", "2-n", "VerticesOfThePolygonalExposureControlSensingRegion"],
        "0x9445": ["", "", ""],
        "0x9447": ["FL", "1", "ColumnAngulationPatient"],
        "0x9449": ["FL", "1", "BeamAngle"],
        "0x9451": ["SQ", "1", "FrameDetectorParametersSequence"],
        "0x9452": ["FL", "1", "CalculatedAnatomyThickness"],
        "0x9455": ["SQ", "1", "CalibrationSequence"],
        "0x9456": ["SQ", "1", "ObjectThicknessSequence"],
        "0x9457": ["CS", "1", "PlaneIdentification"],
        "0x9461": ["FL", "1-2", "FieldOfViewDimensionsInFloat"],
        "0x9462": ["SQ", "1", "IsocenterReferenceSystemSequence"],
        "0x9463": ["FL", "1", "PositionerIsocenterPrimaryAngle"],
        "0x9464": ["FL", "1", "PositionerIsocenterSecondaryAngle"],
        "0x9465": ["FL", "1", "PositionerIsocenterDetectorRotationAngle"],
        "0x9466": ["FL", "1", "TableXPositionToIsocenter"],
        "0x9467": ["FL", "1", "TableYPositionToIsocenter"],
        "0x9468": ["FL", "1", "TableZPositionToIsocenter"],
        "0x9469": ["FL", "1", "TableHorizontalRotationAngle"],
        "0x9470": ["FL", "1", "TableHeadTiltAngle"],
        "0x9471": ["FL", "1", "TableCradleTiltAngle"],
        "0x9472": ["SQ", "1", "FrameDisplayShutterSequence"],
        "0x9473": ["FL", "1", "AcquiredImageAreaDoseProduct"],
        "0x9474": ["CS", "1", "CArmPositionerTabletopRelationship"],
        "0x9476": ["SQ", "1", "XRayGeometrySequence"],
        "0x9477": ["SQ", "1", "IrradiationEventIdentificationSequence"],
        "0x9504": ["SQ", "1", "XRay3DFrameTypeSequence"],
        "0x9506": ["SQ", "1", "ContributingSourcesSequence"],
        "0x9507": ["SQ", "1", "XRay3DAcquisitionSequence"],
        "0x9508": ["FL", "1", "PrimaryPositionerScanArc"],
        "0x9509": ["FL", "1", "SecondaryPositionerScanArc"],
        "0x9510": ["FL", "1", "PrimaryPositionerScanStartAngle"],
        "0x9511": ["FL", "1", "SecondaryPositionerScanStartAngle"],
        "0x9514": ["FL", "1", "PrimaryPositionerIncrement"],
        "0x9515": ["FL", "1", "SecondaryPositionerIncrement"],
        "0x9516": ["DT", "1", "StartAcquisitionDateTime"],
        "0x9517": ["DT", "1", "EndAcquisitionDateTime"],
        "0x9518": ["SS", "1", "PrimaryPositionerIncrementSign"],
        "0x9519": ["SS", "1", "SecondaryPositionerIncrementSign"],
        "0x9524": ["LO", "1", "ApplicationName"],
        "0x9525": ["LO", "1", "ApplicationVersion"],
        "0x9526": ["LO", "1", "ApplicationManufacturer"],
        "0x9527": ["CS", "1", "AlgorithmType"],
        "0x9528": ["LO", "1", "AlgorithmDescription"],
        "0x9530": ["SQ", "1", "XRay3DReconstructionSequence"],
        "0x9531": ["LO", "1", "ReconstructionDescription"],
        "0x9538": ["SQ", "1", "PerProjectionAcquisitionSequence"],
        "0x9541": ["SQ", "1", "DetectorPositionSequence"],
        "0x9542": ["SQ", "1", "XRayAcquisitionDoseSequence"],
        "0x9543": ["FD", "1", "XRaySourceIsocenterPrimaryAngle"],
        "0x9544": ["FD", "1", "XRaySourceIsocenterSecondaryAngle"],
        "0x9545": ["FD", "1", "BreastSupportIsocenterPrimaryAngle"],
        "0x9546": ["FD", "1", "BreastSupportIsocenterSecondaryAngle"],
        "0x9547": ["FD", "1", "BreastSupportXPositionToIsocenter"],
        "0x9548": ["FD", "1", "BreastSupportYPositionToIsocenter"],
        "0x9549": ["FD", "1", "BreastSupportZPositionToIsocenter"],
        "0x9550": ["FD", "1", "DetectorIsocenterPrimaryAngle"],
        "0x9551": ["FD", "1", "DetectorIsocenterSecondaryAngle"],
        "0x9552": ["FD", "1", "DetectorXPositionToIsocenter"],
        "0x9553": ["FD", "1", "DetectorYPositionToIsocenter"],
        "0x9554": ["FD", "1", "DetectorZPositionToIsocenter"],
        "0x9555": ["SQ", "1", "XRayGridSequence"],
        "0x9556": ["SQ", "1", "XRayFilterSequence"],
        "0x9557": ["FD", "3", "DetectorActiveAreaTLHCPosition"],
        "0x9558": ["FD", "6", "DetectorActiveAreaOrientation"],
        "0x9559": ["CS", "1", "PositionerPrimaryAngleDirection"],
        "0x9601": ["SQ", "1", "DiffusionBMatrixSequence"],
        "0x9602": ["FD", "1", "DiffusionBValueXX"],
        "0x9603": ["FD", "1", "DiffusionBValueXY"],
        "0x9604": ["FD", "1", "DiffusionBValueXZ"],
        "0x9605": ["FD", "1", "DiffusionBValueYY"],
        "0x9606": ["FD", "1", "DiffusionBValueYZ"],
        "0x9607": ["FD", "1", "DiffusionBValueZZ"],
        "0x9701": ["DT", "1", "DecayCorrectionDateTime"],
        "0x9715": ["FD", "1", "StartDensityThreshold"],
        "0x9716": ["FD", "1", "StartRelativeDensityDifferenceThreshold"],
        "0x9717": ["FD", "1", "StartCardiacTriggerCountThreshold"],
        "0x9718": ["FD", "1", "StartRespiratoryTriggerCountThreshold"],
        "0x9719": ["FD", "1", "TerminationCountsThreshold"],
        "0x9720": ["FD", "1", "TerminationDensityThreshold"],
        "0x9721": ["FD", "1", "TerminationRelativeDensityThreshold"],
        "0x9722": ["FD", "1", "TerminationTimeThreshold"],
        "0x9723": ["FD", "1", "TerminationCardiacTriggerCountThreshold"],
        "0x9724": ["FD", "1", "TerminationRespiratoryTriggerCountThreshold"],
        "0x9725": ["CS", "1", "DetectorGeometry"],
        "0x9726": ["FD", "1", "TransverseDetectorSeparation"],
        "0x9727": ["FD", "1", "AxialDetectorDimension"],
        "0x9729": ["US", "1", "RadiopharmaceuticalAgentNumber"],
        "0x9732": ["SQ", "1", "PETFrameAcquisitionSequence"],
        "0x9733": ["SQ", "1", "PETDetectorMotionDetailsSequence"],
        "0x9734": ["SQ", "1", "PETTableDynamicsSequence"],
        "0x9735": ["SQ", "1", "PETPositionSequence"],
        "0x9736": ["SQ", "1", "PETFrameCorrectionFactorsSequence"],
        "0x9737": ["SQ", "1", "RadiopharmaceuticalUsageSequence"],
        "0x9738": ["CS", "1", "AttenuationCorrectionSource"],
        "0x9739": ["US", "1", "NumberOfIterations"],
        "0x9740": ["US", "1", "NumberOfSubsets"],
        "0x9749": ["SQ", "1", "PETReconstructionSequence"],
        "0x9751": ["SQ", "1", "PETFrameTypeSequence"],
        "0x9755": ["CS", "1", "TimeOfFlightInformationUsed"],
        "0x9756": ["CS", "1", "ReconstructionType"],
        "0x9758": ["CS", "1", "DecayCorrected"],
        "0x9759": ["CS", "1", "AttenuationCorrected"],
        "0x9760": ["CS", "1", "ScatterCorrected"],
        "0x9761": ["CS", "1", "DeadTimeCorrected"],
        "0x9762": ["CS", "1", "GantryMotionCorrected"],
        "0x9763": ["CS", "1", "PatientMotionCorrected"],
        "0x9764": ["CS", "1", "CountLossNormalizationCorrected"],
        "0x9765": ["CS", "1", "RandomsCorrected"],
        "0x9766": ["CS", "1", "NonUniformRadialSamplingCorrected"],
        "0x9767": ["CS", "1", "SensitivityCalibrated"],
        "0x9768": ["CS", "1", "DetectorNormalizationCorrection"],
        "0x9769": ["CS", "1", "IterativeReconstructionMethod"],
        "0x9770": ["CS", "1", "AttenuationCorrectionTemporalRelationship"],
        "0x9771": ["SQ", "1", "PatientPhysiologicalStateSequence"],
        "0x9772": ["SQ", "1", "PatientPhysiologicalStateCodeSequence"],
        "0x9801": ["FD", "1-n", "DepthsOfFocus"],
        "0x9803": ["SQ", "1", "ExcludedIntervalsSequence"],
        "0x9804": ["DT", "1", "ExclusionStartDateTime"],
        "0x9805": ["FD", "1", "ExclusionDuration"],
        "0x9806": ["SQ", "1", "USImageDescriptionSequence"],
        "0x9807": ["SQ", "1", "ImageDataTypeSequence"],
        "0x9808": ["CS", "1", "DataType"],
        "0x9809": ["SQ", "1", "TransducerScanPatternCodeSequence"],
        "0x980B": ["CS", "1", "AliasedDataType"],
        "0x980C": ["CS", "1", "PositionMeasuringDeviceUsed"],
        "0x980D": ["SQ", "1", "TransducerGeometryCodeSequence"],
        "0x980E": ["SQ", "1", "TransducerBeamSteeringCodeSequence"],
        "0x980F": ["SQ", "1", "TransducerApplicationCodeSequence"],
        "0x9810": ["xs", "1", "ZeroVelocityPixelValue"],
        "0xA001": ["SQ", "1", "ContributingEquipmentSequence"],
        "0xA002": ["DT", "1", "ContributionDateTime"],
        "0xA003": ["ST", "1", "ContributionDescription"]
    },
    "0x0020": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x000D": ["UI", "1", "StudyInstanceUID"],
        "0x000E": ["UI", "1", "SeriesInstanceUID"],
        "0x0010": ["SH", "1", "StudyID"],
        "0x0011": ["IS", "1", "SeriesNumber"],
        "0x0012": ["IS", "1", "AcquisitionNumber"],
        "0x0013": ["IS", "1", "InstanceNumber"],
        "0x0014": ["IS", "1", "IsotopeNumber"],
        "0x0015": ["IS", "1", "PhaseNumber"],
        "0x0016": ["IS", "1", "IntervalNumber"],
        "0x0017": ["IS", "1", "TimeSlotNumber"],
        "0x0018": ["IS", "1", "AngleNumber"],
        "0x0019": ["IS", "1", "ItemNumber"],
        "0x0020": ["CS", "2", "PatientOrientation"],
        "0x0022": ["IS", "1", "OverlayNumber"],
        "0x0024": ["IS", "1", "CurveNumber"],
        "0x0026": ["IS", "1", "LUTNumber"],
        "0x0030": ["DS", "3", "ImagePosition"],
        "0x0032": ["DS", "3", "ImagePositionPatient"],
        "0x0035": ["DS", "6", "ImageOrientation"],
        "0x0037": ["DS", "6", "ImageOrientationPatient"],
        "0x0050": ["DS", "1", "Location"],
        "0x0052": ["UI", "1", "FrameOfReferenceUID"],
        "0x0060": ["CS", "1", "Laterality"],
        "0x0062": ["CS", "1", "ImageLaterality"],
        "0x0070": ["LO", "1", "ImageGeometryType"],
        "0x0080": ["CS", "1-n", "MaskingImage"],
        "0x00AA": ["IS", "1", "ReportNumber"],
        "0x0100": ["IS", "1", "TemporalPositionIdentifier"],
        "0x0105": ["IS", "1", "NumberOfTemporalPositions"],
        "0x0110": ["DS", "1", "TemporalResolution"],
        "0x0200": ["UI", "1", "SynchronizationFrameOfReferenceUID"],
        "0x0242": ["UI", "1", "SOPInstanceUIDOfConcatenationSource"],
        "0x1000": ["IS", "1", "SeriesInStudy"],
        "0x1001": ["IS", "1", "AcquisitionsInSeries"],
        "0x1002": ["IS", "1", "ImagesInAcquisition"],
        "0x1003": ["IS", "1", "ImagesInSeries"],
        "0x1004": ["IS", "1", "AcquisitionsInStudy"],
        "0x1005": ["IS", "1", "ImagesInStudy"],
        "0x1020": ["LO", "1-n", "Reference"],
        "0x1040": ["LO", "1", "PositionReferenceIndicator"],
        "0x1041": ["DS", "1", "SliceLocation"],
        "0x1070": ["IS", "1-n", "OtherStudyNumbers"],
        "0x1200": ["IS", "1", "NumberOfPatientRelatedStudies"],
        "0x1202": ["IS", "1", "NumberOfPatientRelatedSeries"],
        "0x1204": ["IS", "1", "NumberOfPatientRelatedInstances"],
        "0x1206": ["IS", "1", "NumberOfStudyRelatedSeries"],
        "0x1208": ["IS", "1", "NumberOfStudyRelatedInstances"],
        "0x1209": ["IS", "1", "NumberOfSeriesRelatedInstances"],
        "0x3100": ["CS", "1-n", "SourceImageIDs"],
        "0x3401": ["CS", "1", "ModifyingDeviceID"],
        "0x3402": ["CS", "1", "ModifiedImageID"],
        "0x3403": ["DA", "1", "ModifiedImageDate"],
        "0x3404": ["LO", "1", "ModifyingDeviceManufacturer"],
        "0x3405": ["TM", "1", "ModifiedImageTime"],
        "0x3406": ["LO", "1", "ModifiedImageDescription"],
        "0x4000": ["LT", "1", "ImageComments"],
        "0x5000": ["AT", "1-n", "OriginalImageIdentification"],
        "0x5002": ["LO", "1-n", "OriginalImageIdentificationNomenclature"],
        "0x9056": ["SH", "1", "StackID"],
        "0x9057": ["UL", "1", "InStackPositionNumber"],
        "0x9071": ["SQ", "1", "FrameAnatomySequence"],
        "0x9072": ["CS", "1", "FrameLaterality"],
        "0x9111": ["SQ", "1", "FrameContentSequence"],
        "0x9113": ["SQ", "1", "PlanePositionSequence"],
        "0x9116": ["SQ", "1", "PlaneOrientationSequence"],
        "0x9128": ["UL", "1", "TemporalPositionIndex"],
        "0x9153": ["FD", "1", "NominalCardiacTriggerDelayTime"],
        "0x9154": ["FL", "1", "NominalCardiacTriggerTimePriorToRPeak"],
        "0x9155": ["FL", "1", "ActualCardiacTriggerTimePriorToRPeak"],
        "0x9156": ["US", "1", "FrameAcquisitionNumber"],
        "0x9157": ["UL", "1-n", "DimensionIndexValues"],
        "0x9158": ["LT", "1", "FrameComments"],
        "0x9161": ["UI", "1", "ConcatenationUID"],
        "0x9162": ["US", "1", "InConcatenationNumber"],
        "0x9163": ["US", "1", "InConcatenationTotalNumber"],
        "0x9164": ["UI", "1", "DimensionOrganizationUID"],
        "0x9165": ["AT", "1", "DimensionIndexPointer"],
        "0x9167": ["AT", "1", "FunctionalGroupPointer"],
        "0x9170": ["SQ", "1", "UnassignedSharedConvertedAttributesSequence"],
        "0x9171": ["SQ", "1", "UnassignedPerFrameConvertedAttributesSequence"],
        "0x9172": ["SQ", "1", "ConversionSourceAttributesSequence"],
        "0x9213": ["LO", "1", "DimensionIndexPrivateCreator"],
        "0x9221": ["SQ", "1", "DimensionOrganizationSequence"],
        "0x9222": ["SQ", "1", "DimensionIndexSequence"],
        "0x9228": ["UL", "1", "ConcatenationFrameOffsetNumber"],
        "0x9238": ["LO", "1", "FunctionalGroupPrivateCreator"],
        "0x9241": ["FL", "1", "NominalPercentageOfCardiacPhase"],
        "0x9245": ["FL", "1", "NominalPercentageOfRespiratoryPhase"],
        "0x9246": ["FL", "1", "StartingRespiratoryAmplitude"],
        "0x9247": ["CS", "1", "StartingRespiratoryPhase"],
        "0x9248": ["FL", "1", "EndingRespiratoryAmplitude"],
        "0x9249": ["CS", "1", "EndingRespiratoryPhase"],
        "0x9250": ["CS", "1", "RespiratoryTriggerType"],
        "0x9251": ["FD", "1", "RRIntervalTimeNominal"],
        "0x9252": ["FD", "1", "ActualCardiacTriggerDelayTime"],
        "0x9253": ["SQ", "1", "RespiratorySynchronizationSequence"],
        "0x9254": ["FD", "1", "RespiratoryIntervalTime"],
        "0x9255": ["FD", "1", "NominalRespiratoryTriggerDelayTime"],
        "0x9256": ["FD", "1", "RespiratoryTriggerDelayThreshold"],
        "0x9257": ["FD", "1", "ActualRespiratoryTriggerDelayTime"],
        "0x9301": ["FD", "3", "ImagePositionVolume"],
        "0x9302": ["FD", "6", "ImageOrientationVolume"],
        "0x9307": ["CS", "1", "UltrasoundAcquisitionGeometry"],
        "0x9308": ["FD", "3", "ApexPosition"],
        "0x9309": ["FD", "16", "VolumeToTransducerMappingMatrix"],
        "0x930A": ["FD", "16", "VolumeToTableMappingMatrix"],
        "0x930B": ["CS", "1", "VolumeToTransducerRelationship"],
        "0x930C": ["CS", "1", "PatientFrameOfReferenceSource"],
        "0x930D": ["FD", "1", "TemporalPositionTimeOffset"],
        "0x930E": ["SQ", "1", "PlanePositionVolumeSequence"],
        "0x930F": ["SQ", "1", "PlaneOrientationVolumeSequence"],
        "0x9310": ["SQ", "1", "TemporalPositionSequence"],
        "0x9311": ["CS", "1", "DimensionOrganizationType"],
        "0x9312": ["UI", "1", "VolumeFrameOfReferenceUID"],
        "0x9313": ["UI", "1", "TableFrameOfReferenceUID"],
        "0x9421": ["LO", "1", "DimensionDescriptionLabel"],
        "0x9450": ["SQ", "1", "PatientOrientationInFrameSequence"],
        "0x9453": ["LO", "1", "FrameLabel"],
        "0x9518": ["US", "1-n", "AcquisitionIndex"],
        "0x9529": ["SQ", "1", "ContributingSOPInstancesReferenceSequence"],
        "0x9536": ["US", "1", "ReconstructionIndex"]
    },
    "0x0022": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["US", "1", "LightPathFilterPassThroughWavelength"],
        "0x0002": ["US", "2", "LightPathFilterPassBand"],
        "0x0003": ["US", "1", "ImagePathFilterPassThroughWavelength"],
        "0x0004": ["US", "2", "ImagePathFilterPassBand"],
        "0x0005": ["CS", "1", "PatientEyeMovementCommanded"],
        "0x0006": ["SQ", "1", "PatientEyeMovementCommandCodeSequence"],
        "0x0007": ["FL", "1", "SphericalLensPower"],
        "0x0008": ["FL", "1", "CylinderLensPower"],
        "0x0009": ["FL", "1", "CylinderAxis"],
        "0x000A": ["FL", "1", "EmmetropicMagnification"],
        "0x000B": ["FL", "1", "IntraOcularPressure"],
        "0x000C": ["FL", "1", "HorizontalFieldOfView"],
        "0x000D": ["CS", "1", "PupilDilated"],
        "0x000E": ["FL", "1", "DegreeOfDilation"],
        "0x0010": ["FL", "1", "StereoBaselineAngle"],
        "0x0011": ["FL", "1", "StereoBaselineDisplacement"],
        "0x0012": ["FL", "1", "StereoHorizontalPixelOffset"],
        "0x0013": ["FL", "1", "StereoVerticalPixelOffset"],
        "0x0014": ["FL", "1", "StereoRotation"],
        "0x0015": ["SQ", "1", "AcquisitionDeviceTypeCodeSequence"],
        "0x0016": ["SQ", "1", "IlluminationTypeCodeSequence"],
        "0x0017": ["SQ", "1", "LightPathFilterTypeStackCodeSequence"],
        "0x0018": ["SQ", "1", "ImagePathFilterTypeStackCodeSequence"],
        "0x0019": ["SQ", "1", "LensesCodeSequence"],
        "0x001A": ["SQ", "1", "ChannelDescriptionCodeSequence"],
        "0x001B": ["SQ", "1", "RefractiveStateSequence"],
        "0x001C": ["SQ", "1", "MydriaticAgentCodeSequence"],
        "0x001D": ["SQ", "1", "RelativeImagePositionCodeSequence"],
        "0x001E": ["FL", "1", "CameraAngleOfView"],
        "0x0020": ["SQ", "1", "StereoPairsSequence"],
        "0x0021": ["SQ", "1", "LeftImageSequence"],
        "0x0022": ["SQ", "1", "RightImageSequence"],
        "0x0028": ["CS", "1", "StereoPairsPresent"],
        "0x0030": ["FL", "1", "AxialLengthOfTheEye"],
        "0x0031": ["SQ", "1", "OphthalmicFrameLocationSequence"],
        "0x0032": ["FL", "2-2n", "ReferenceCoordinates"],
        "0x0035": ["FL", "1", "DepthSpatialResolution"],
        "0x0036": ["FL", "1", "MaximumDepthDistortion"],
        "0x0037": ["FL", "1", "AlongScanSpatialResolution"],
        "0x0038": ["FL", "1", "MaximumAlongScanDistortion"],
        "0x0039": ["CS", "1", "OphthalmicImageOrientation"],
        "0x0041": ["FL", "1", "DepthOfTransverseImage"],
        "0x0042": ["SQ", "1", "MydriaticAgentConcentrationUnitsSequence"],
        "0x0048": ["FL", "1", "AcrossScanSpatialResolution"],
        "0x0049": ["FL", "1", "MaximumAcrossScanDistortion"],
        "0x004E": ["DS", "1", "MydriaticAgentConcentration"],
        "0x0055": ["FL", "1", "IlluminationWaveLength"],
        "0x0056": ["FL", "1", "IlluminationPower"],
        "0x0057": ["FL", "1", "IlluminationBandwidth"],
        "0x0058": ["SQ", "1", "MydriaticAgentSequence"],
        "0x1007": ["SQ", "1", "OphthalmicAxialMeasurementsRightEyeSequence"],
        "0x1008": ["SQ", "1", "OphthalmicAxialMeasurementsLeftEyeSequence"],
        "0x1009": ["CS", "1", "OphthalmicAxialMeasurementsDeviceType"],
        "0x1010": ["CS", "1", "OphthalmicAxialLengthMeasurementsType"],
        "0x1012": ["SQ", "1", "OphthalmicAxialLengthSequence"],
        "0x1019": ["FL", "1", "OphthalmicAxialLength"],
        "0x1024": ["SQ", "1", "LensStatusCodeSequence"],
        "0x1025": ["SQ", "1", "VitreousStatusCodeSequence"],
        "0x1028": ["SQ", "1", "IOLFormulaCodeSequence"],
        "0x1029": ["LO", "1", "IOLFormulaDetail"],
        "0x1033": ["FL", "1", "KeratometerIndex"],
        "0x1035": ["SQ", "1", "SourceOfOphthalmicAxialLengthCodeSequence"],
        "0x1037": ["FL", "1", "TargetRefraction"],
        "0x1039": ["CS", "1", "RefractiveProcedureOccurred"],
        "0x1040": ["SQ", "1", "RefractiveSurgeryTypeCodeSequence"],
        "0x1044": ["SQ", "1", "OphthalmicUltrasoundMethodCodeSequence"],
        "0x1050": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSequence"],
        "0x1053": ["FL", "1", "IOLPower"],
        "0x1054": ["FL", "1", "PredictedRefractiveError"],
        "0x1059": ["FL", "1", "OphthalmicAxialLengthVelocity"],
        "0x1065": ["LO", "1", "LensStatusDescription"],
        "0x1066": ["LO", "1", "VitreousStatusDescription"],
        "0x1090": ["SQ", "1", "IOLPowerSequence"],
        "0x1092": ["SQ", "1", "LensConstantSequence"],
        "0x1093": ["LO", "1", "IOLManufacturer"],
        "0x1094": ["LO", "1", "LensConstantDescription"],
        "0x1095": ["LO", "1", "ImplantName"],
        "0x1096": ["SQ", "1", "KeratometryMeasurementTypeCodeSequence"],
        "0x1097": ["LO", "1", "ImplantPartNumber"],
        "0x1100": ["SQ", "1", "ReferencedOphthalmicAxialMeasurementsSequence"],
        "0x1101": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSegmentNameCodeSequence"],
        "0x1103": ["SQ", "1", "RefractiveErrorBeforeRefractiveSurgeryCodeSequence"],
        "0x1121": ["FL", "1", "IOLPowerForExactEmmetropia"],
        "0x1122": ["FL", "1", "IOLPowerForExactTargetRefraction"],
        "0x1125": ["SQ", "1", "AnteriorChamberDepthDefinitionCodeSequence"],
        "0x1127": ["SQ", "1", "LensThicknessSequence"],
        "0x1128": ["SQ", "1", "AnteriorChamberDepthSequence"],
        "0x1130": ["FL", "1", "LensThickness"],
        "0x1131": ["FL", "1", "AnteriorChamberDepth"],
        "0x1132": ["SQ", "1", "SourceOfLensThicknessDataCodeSequence"],
        "0x1133": ["SQ", "1", "SourceOfAnteriorChamberDepthDataCodeSequence"],
        "0x1134": ["SQ", "1", "SourceOfRefractiveMeasurementsSequence"],
        "0x1135": ["SQ", "1", "SourceOfRefractiveMeasurementsCodeSequence"],
        "0x1140": ["CS", "1", "OphthalmicAxialLengthMeasurementModified"],
        "0x1150": ["SQ", "1", "OphthalmicAxialLengthDataSourceCodeSequence"],
        "0x1153": ["SQ", "1", "OphthalmicAxialLengthAcquisitionMethodCodeSequence"],
        "0x1155": ["FL", "1", "SignalToNoiseRatio"],
        "0x1159": ["LO", "1", "OphthalmicAxialLengthDataSourceDescription"],
        "0x1210": ["SQ", "1", "OphthalmicAxialLengthMeasurementsTotalLengthSequence"],
        "0x1211": ["SQ", "1", "OphthalmicAxialLengthMeasurementsSegmentalLengthSequence"],
        "0x1212": ["SQ", "1", "OphthalmicAxialLengthMeasurementsLengthSummationSequence"],
        "0x1220": ["SQ", "1", "UltrasoundOphthalmicAxialLengthMeasurementsSequence"],
        "0x1225": ["SQ", "1", "OpticalOphthalmicAxialLengthMeasurementsSequence"],
        "0x1230": ["SQ", "1", "UltrasoundSelectedOphthalmicAxialLengthSequence"],
        "0x1250": ["SQ", "1", "OphthalmicAxialLengthSelectionMethodCodeSequence"],
        "0x1255": ["SQ", "1", "OpticalSelectedOphthalmicAxialLengthSequence"],
        "0x1257": ["SQ", "1", "SelectedSegmentalOphthalmicAxialLengthSequence"],
        "0x1260": ["SQ", "1", "SelectedTotalOphthalmicAxialLengthSequence"],
        "0x1262": ["SQ", "1", "OphthalmicAxialLengthQualityMetricSequence"],
        "0x1265": ["SQ", "1", "OphthalmicAxialLengthQualityMetricTypeCodeSequence"],
        "0x1273": ["LO", "1", "OphthalmicAxialLengthQualityMetricTypeDescription"],
        "0x1300": ["SQ", "1", "IntraocularLensCalculationsRightEyeSequence"],
        "0x1310": ["SQ", "1", "IntraocularLensCalculationsLeftEyeSequence"],
        "0x1330": ["SQ", "1", "ReferencedOphthalmicAxialLengthMeasurementQCImageSequence"],
        "0x1415": ["CS", "1", "OphthalmicMappingDeviceType"],
        "0x1420": ["SQ", "1", "AcquisitionMethodCodeSequence"],
        "0x1423": ["SQ", "1", "AcquisitionMethodAlgorithmSequence"],
        "0x1436": ["SQ", "1", "OphthalmicThicknessMapTypeCodeSequence"],
        "0x1443": ["SQ", "1", "OphthalmicThicknessMappingNormalsSequence"],
        "0x1445": ["SQ", "1", "RetinalThicknessDefinitionCodeSequence"],
        "0x1450": ["SQ", "1", "PixelValueMappingToCodedConceptSequence"],
        "0x1452": ["xs", "1", "MappedPixelValue"],
        "0x1454": ["LO", "1", "PixelValueMappingExplanation"],
        "0x1458": ["SQ", "1", "OphthalmicThicknessMapQualityThresholdSequence"],
        "0x1460": ["FL", "1", "OphthalmicThicknessMapThresholdQualityRating"],
        "0x1463": ["FL", "2", "AnatomicStructureReferencePoint"],
        "0x1465": ["SQ", "1", "RegistrationToLocalizerSequence"],
        "0x1466": ["CS", "1", "RegisteredLocalizerUnits"],
        "0x1467": ["FL", "2", "RegisteredLocalizerTopLeftHandCorner"],
        "0x1468": ["FL", "2", "RegisteredLocalizerBottomRightHandCorner"],
        "0x1470": ["SQ", "1", "OphthalmicThicknessMapQualityRatingSequence"],
        "0x1472": ["SQ", "1", "RelevantOPTAttributesSequence"],
        "0x1512": ["SQ", "1", "TransformationMethodCodeSequence"],
        "0x1513": ["SQ", "1", "TransformationAlgorithmSequence"],
        "0x1515": ["CS", "1", "OphthalmicAxialLengthMethod"],
        "0x1517": ["FL", "1", "OphthalmicFOV"],
        "0x1518": ["SQ", "1", "TwoDimensionalToThreeDimensionalMapSequence"],
        "0x1525": ["SQ", "1", "WideFieldOphthalmicPhotographyQualityRatingSequence"],
        "0x1526": ["SQ", "1", "WideFieldOphthalmicPhotographyQualityThresholdSequence"],
        "0x1527": ["FL", "1", "WideFieldOphthalmicPhotographyThresholdQualityRating"],
        "0x1528": ["FL", "1", "XCoordinatesCenterPixelViewAngle"],
        "0x1529": ["FL", "1", "YCoordinatesCenterPixelViewAngle"],
        "0x1530": ["UL", "1", "NumberOfMapPoints"],
        "0x1531": ["OF", "1", "TwoDimensionalToThreeDimensionalMapData"]
    },
    "0x0024": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["FL", "1", "VisualFieldHorizontalExtent"],
        "0x0011": ["FL", "1", "VisualFieldVerticalExtent"],
        "0x0012": ["CS", "1", "VisualFieldShape"],
        "0x0016": ["SQ", "1", "ScreeningTestModeCodeSequence"],
        "0x0018": ["FL", "1", "MaximumStimulusLuminance"],
        "0x0020": ["FL", "1", "BackgroundLuminance"],
        "0x0021": ["SQ", "1", "StimulusColorCodeSequence"],
        "0x0024": ["SQ", "1", "BackgroundIlluminationColorCodeSequence"],
        "0x0025": ["FL", "1", "StimulusArea"],
        "0x0028": ["FL", "1", "StimulusPresentationTime"],
        "0x0032": ["SQ", "1", "FixationSequence"],
        "0x0033": ["SQ", "1", "FixationMonitoringCodeSequence"],
        "0x0034": ["SQ", "1", "VisualFieldCatchTrialSequence"],
        "0x0035": ["US", "1", "FixationCheckedQuantity"],
        "0x0036": ["US", "1", "PatientNotProperlyFixatedQuantity"],
        "0x0037": ["CS", "1", "PresentedVisualStimuliDataFlag"],
        "0x0038": ["US", "1", "NumberOfVisualStimuli"],
        "0x0039": ["CS", "1", "ExcessiveFixationLossesDataFlag"],
        "0x0040": ["CS", "1", "ExcessiveFixationLosses"],
        "0x0042": ["US", "1", "StimuliRetestingQuantity"],
        "0x0044": ["LT", "1", "CommentsOnPatientPerformanceOfVisualField"],
        "0x0045": ["CS", "1", "FalseNegativesEstimateFlag"],
        "0x0046": ["FL", "1", "FalseNegativesEstimate"],
        "0x0048": ["US", "1", "NegativeCatchTrialsQuantity"],
        "0x0050": ["US", "1", "FalseNegativesQuantity"],
        "0x0051": ["CS", "1", "ExcessiveFalseNegativesDataFlag"],
        "0x0052": ["CS", "1", "ExcessiveFalseNegatives"],
        "0x0053": ["CS", "1", "FalsePositivesEstimateFlag"],
        "0x0054": ["FL", "1", "FalsePositivesEstimate"],
        "0x0055": ["CS", "1", "CatchTrialsDataFlag"],
        "0x0056": ["US", "1", "PositiveCatchTrialsQuantity"],
        "0x0057": ["CS", "1", "TestPointNormalsDataFlag"],
        "0x0058": ["SQ", "1", "TestPointNormalsSequence"],
        "0x0059": ["CS", "1", "GlobalDeviationProbabilityNormalsFlag"],
        "0x0060": ["US", "1", "FalsePositivesQuantity"],
        "0x0061": ["CS", "1", "ExcessiveFalsePositivesDataFlag"],
        "0x0062": ["CS", "1", "ExcessiveFalsePositives"],
        "0x0063": ["CS", "1", "VisualFieldTestNormalsFlag"],
        "0x0064": ["SQ", "1", "ResultsNormalsSequence"],
        "0x0065": ["SQ", "1", "AgeCorrectedSensitivityDeviationAlgorithmSequence"],
        "0x0066": ["FL", "1", "GlobalDeviationFromNormal"],
        "0x0067": ["SQ", "1", "GeneralizedDefectSensitivityDeviationAlgorithmSequence"],
        "0x0068": ["FL", "1", "LocalizedDeviationFromNormal"],
        "0x0069": ["LO", "1", "PatientReliabilityIndicator"],
        "0x0070": ["FL", "1", "VisualFieldMeanSensitivity"],
        "0x0071": ["FL", "1", "GlobalDeviationProbability"],
        "0x0072": ["CS", "1", "LocalDeviationProbabilityNormalsFlag"],
        "0x0073": ["FL", "1", "LocalizedDeviationProbability"],
        "0x0074": ["CS", "1", "ShortTermFluctuationCalculated"],
        "0x0075": ["FL", "1", "ShortTermFluctuation"],
        "0x0076": ["CS", "1", "ShortTermFluctuationProbabilityCalculated"],
        "0x0077": ["FL", "1", "ShortTermFluctuationProbability"],
        "0x0078": ["CS", "1", "CorrectedLocalizedDeviationFromNormalCalculated"],
        "0x0079": ["FL", "1", "CorrectedLocalizedDeviationFromNormal"],
        "0x0080": ["CS", "1", "CorrectedLocalizedDeviationFromNormalProbabilityCalculated"],
        "0x0081": ["FL", "1", "CorrectedLocalizedDeviationFromNormalProbability"],
        "0x0083": ["SQ", "1", "GlobalDeviationProbabilitySequence"],
        "0x0085": ["SQ", "1", "LocalizedDeviationProbabilitySequence"],
        "0x0086": ["CS", "1", "FovealSensitivityMeasured"],
        "0x0087": ["FL", "1", "FovealSensitivity"],
        "0x0088": ["FL", "1", "VisualFieldTestDuration"],
        "0x0089": ["SQ", "1", "VisualFieldTestPointSequence"],
        "0x0090": ["FL", "1", "VisualFieldTestPointXCoordinate"],
        "0x0091": ["FL", "1", "VisualFieldTestPointYCoordinate"],
        "0x0092": ["FL", "1", "AgeCorrectedSensitivityDeviationValue"],
        "0x0093": ["CS", "1", "StimulusResults"],
        "0x0094": ["FL", "1", "SensitivityValue"],
        "0x0095": ["CS", "1", "RetestStimulusSeen"],
        "0x0096": ["FL", "1", "RetestSensitivityValue"],
        "0x0097": ["SQ", "1", "VisualFieldTestPointNormalsSequence"],
        "0x0098": ["FL", "1", "QuantifiedDefect"],
        "0x0100": ["FL", "1", "AgeCorrectedSensitivityDeviationProbabilityValue"],
        "0x0102": ["CS", "1", "GeneralizedDefectCorrectedSensitivityDeviationFlag"],
        "0x0103": ["FL", "1", "GeneralizedDefectCorrectedSensitivityDeviationValue"],
        "0x0104": ["FL", "1", "GeneralizedDefectCorrectedSensitivityDeviationProbabilityValue"],
        "0x0105": ["FL", "1", "MinimumSensitivityValue"],
        "0x0106": ["CS", "1", "BlindSpotLocalized"],
        "0x0107": ["FL", "1", "BlindSpotXCoordinate"],
        "0x0108": ["FL", "1", "BlindSpotYCoordinate"],
        "0x0110": ["SQ", "1", "VisualAcuityMeasurementSequence"],
        "0x0112": ["SQ", "1", "RefractiveParametersUsedOnPatientSequence"],
        "0x0113": ["CS", "1", "MeasurementLaterality"],
        "0x0114": ["SQ", "1", "OphthalmicPatientClinicalInformationLeftEyeSequence"],
        "0x0115": ["SQ", "1", "OphthalmicPatientClinicalInformationRightEyeSequence"],
        "0x0117": ["CS", "1", "FovealPointNormativeDataFlag"],
        "0x0118": ["FL", "1", "FovealPointProbabilityValue"],
        "0x0120": ["CS", "1", "ScreeningBaselineMeasured"],
        "0x0122": ["SQ", "1", "ScreeningBaselineMeasuredSequence"],
        "0x0124": ["CS", "1", "ScreeningBaselineType"],
        "0x0126": ["FL", "1", "ScreeningBaselineValue"],
        "0x0202": ["LO", "1", "AlgorithmSource"],
        "0x0306": ["LO", "1", "DataSetName"],
        "0x0307": ["LO", "1", "DataSetVersion"],
        "0x0308": ["LO", "1", "DataSetSource"],
        "0x0309": ["LO", "1", "DataSetDescription"],
        "0x0317": ["SQ", "1", "VisualFieldTestReliabilityGlobalIndexSequence"],
        "0x0320": ["SQ", "1", "VisualFieldGlobalResultsIndexSequence"],
        "0x0325": ["SQ", "1", "DataObservationSequence"],
        "0x0338": ["CS", "1", "IndexNormalsFlag"],
        "0x0341": ["FL", "1", "IndexProbability"],
        "0x0344": ["SQ", "1", "IndexProbabilitySequence"]
    },
    "0x0028": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["US", "1", "SamplesPerPixel"],
        "0x0003": ["US", "1", "SamplesPerPixelUsed"],
        "0x0004": ["CS", "1", "PhotometricInterpretation"],
        "0x0005": ["US", "1", "ImageDimensions"],
        "0x0006": ["US", "1", "PlanarConfiguration"],
        "0x0008": ["IS", "1", "NumberOfFrames"],
        "0x0009": ["AT", "1-n", "FrameIncrementPointer"],
        "0x000A": ["AT", "1-n", "FrameDimensionPointer"],
        "0x0010": ["US", "1", "Rows"],
        "0x0011": ["US", "1", "Columns"],
        "0x0012": ["US", "1", "Planes"],
        "0x0014": ["US", "1", "UltrasoundColorDataPresent"],
        "0x0020": ["", "", ""],
        "0x0030": ["DS", "2", "PixelSpacing"],
        "0x0031": ["DS", "2", "ZoomFactor"],
        "0x0032": ["DS", "2", "ZoomCenter"],
        "0x0034": ["IS", "2", "PixelAspectRatio"],
        "0x0040": ["CS", "1", "ImageFormat"],
        "0x0050": ["LO", "1-n", "ManipulatedImage"],
        "0x0051": ["CS", "1-n", "CorrectedImage"],
        "0x005F": ["LO", "1", "CompressionRecognitionCode"],
        "0x0060": ["CS", "1", "CompressionCode"],
        "0x0061": ["SH", "1", "CompressionOriginator"],
        "0x0062": ["LO", "1", "CompressionLabel"],
        "0x0063": ["SH", "1", "CompressionDescription"],
        "0x0065": ["CS", "1-n", "CompressionSequence"],
        "0x0066": ["AT", "1-n", "CompressionStepPointers"],
        "0x0068": ["US", "1", "RepeatInterval"],
        "0x0069": ["US", "1", "BitsGrouped"],
        "0x0070": ["US", "1-n", "PerimeterTable"],
        "0x0071": ["xs", "1", "PerimeterValue"],
        "0x0080": ["US", "1", "PredictorRows"],
        "0x0081": ["US", "1", "PredictorColumns"],
        "0x0082": ["US", "1-n", "PredictorConstants"],
        "0x0090": ["CS", "1", "BlockedPixels"],
        "0x0091": ["US", "1", "BlockRows"],
        "0x0092": ["US", "1", "BlockColumns"],
        "0x0093": ["US", "1", "RowOverlap"],
        "0x0094": ["US", "1", "ColumnOverlap"],
        "0x0100": ["US", "1", "BitsAllocated"],
        "0x0101": ["US", "1", "BitsStored"],
        "0x0102": ["US", "1", "HighBit"],
        "0x0103": ["US", "1", "PixelRepresentation"],
        "0x0104": ["xs", "1", "SmallestValidPixelValue"],
        "0x0105": ["xs", "1", "LargestValidPixelValue"],
        "0x0106": ["xs", "1", "SmallestImagePixelValue"],
        "0x0107": ["xs", "1", "LargestImagePixelValue"],
        "0x0108": ["xs", "1", "SmallestPixelValueInSeries"],
        "0x0109": ["xs", "1", "LargestPixelValueInSeries"],
        "0x0110": ["xs", "1", "SmallestImagePixelValueInPlane"],
        "0x0111": ["xs", "1", "LargestImagePixelValueInPlane"],
        "0x0120": ["xs", "1", "PixelPaddingValue"],
        "0x0121": ["xs", "1", "PixelPaddingRangeLimit"],
        "0x0122": ["FL", "1", "FloatPixelPaddingValue"],
        "0x0123": ["FD", "1", "DoubleFloatPixelPaddingValue"],
        "0x0124": ["FL", "1", "FloatPixelPaddingRangeLimit"],
        "0x0125": ["FD", "1", "DoubleFloatPixelPaddingRangeLimit"],
        "0x0200": ["US", "1", "ImageLocation"],
        "0x0300": ["CS", "1", "QualityControlImage"],
        "0x0301": ["CS", "1", "BurnedInAnnotation"],
        "0x0302": ["CS", "1", "RecognizableVisualFeatures"],
        "0x0303": ["CS", "1", "LongitudinalTemporalInformationModified"],
        "0x0304": ["UI", "1", "ReferencedColorPaletteInstanceUID"],
        "0x0400": ["LO", "1", "TransformLabel"],
        "0x0401": ["LO", "1", "TransformVersionNumber"],
        "0x0402": ["US", "1", "NumberOfTransformSteps"],
        "0x0403": ["LO", "1-n", "SequenceOfCompressedData"],
        "0x0404": ["AT", "1-n", "DetailsOfCoefficients"],
        "0x04x0": ["US", "1", "RowsForNthOrderCoefficients"],
        "0x04x1": ["US", "1", "ColumnsForNthOrderCoefficients"],
        "0x04x2": ["LO", "1-n", "CoefficientCoding"],
        "0x04x3": ["AT", "1-n", "CoefficientCodingPointers"],
        "0x0700": ["LO", "1", "DCTLabel"],
        "0x0701": ["CS", "1-n", "DataBlockDescription"],
        "0x0702": ["AT", "1-n", "DataBlock"],
        "0x0710": ["US", "1", "NormalizationFactorFormat"],
        "0x0720": ["US", "1", "ZonalMapNumberFormat"],
        "0x0721": ["AT", "1-n", "ZonalMapLocation"],
        "0x0722": ["US", "1", "ZonalMapFormat"],
        "0x0730": ["US", "1", "AdaptiveMapFormat"],
        "0x0740": ["US", "1", "CodeNumberFormat"],
        "0x08x0": ["CS", "1-n", "CodeLabel"],
        "0x08x2": ["US", "1", "NumberOfTables"],
        "0x08x3": ["AT", "1-n", "CodeTableLocation"],
        "0x08x4": ["US", "1", "BitsForCodeWord"],
        "0x08x8": ["AT", "1-n", "ImageDataLocation"],
        "0x0A02": ["CS", "1", "PixelSpacingCalibrationType"],
        "0x0A04": ["LO", "1", "PixelSpacingCalibrationDescription"],
        "0x1040": ["CS", "1", "PixelIntensityRelationship"],
        "0x1041": ["SS", "1", "PixelIntensityRelationshipSign"],
        "0x1050": ["DS", "1-n", "WindowCenter"],
        "0x1051": ["DS", "1-n", "WindowWidth"],
        "0x1052": ["DS", "1", "RescaleIntercept"],
        "0x1053": ["DS", "1", "RescaleSlope"],
        "0x1054": ["LO", "1", "RescaleType"],
        "0x1055": ["LO", "1-n", "WindowCenterWidthExplanation"],
        "0x1056": ["CS", "1", "VOILUTFunction"],
        "0x1080": ["CS", "1", "GrayScale"],
        "0x1090": ["CS", "1", "RecommendedViewingMode"],
        "0x1100": ["xs", "3", "GrayLookupTableDescriptor"],
        "0x1101": ["xs", "3", "RedPaletteColorLookupTableDescriptor"],
        "0x1102": ["xs", "3", "GreenPaletteColorLookupTableDescriptor"],
        "0x1103": ["xs", "3", "BluePaletteColorLookupTableDescriptor"],
        "0x1104": ["US", "3", "AlphaPaletteColorLookupTableDescriptor"],
        "0x1111": ["xs", "4", "LargeRedPaletteColorLookupTableDescriptor"],
        "0x1112": ["xs", "4", "LargeGreenPaletteColorLookupTableDescriptor"],
        "0x1113": ["xs", "4", "LargeBluePaletteColorLookupTableDescriptor"],
        "0x1199": ["UI", "1", "PaletteColorLookupTableUID"],
        "0x1200": ["US or SS or OW", "1-n or 1", "GrayLookupTableData"],
        "0x1201": ["OW", "1", "RedPaletteColorLookupTableData"],
        "0x1202": ["OW", "1", "GreenPaletteColorLookupTableData"],
        "0x1203": ["OW", "1", "BluePaletteColorLookupTableData"],
        "0x1204": ["OW", "1", "AlphaPaletteColorLookupTableData"],
        "0x1211": ["OW", "1", "LargeRedPaletteColorLookupTableData"],
        "0x1212": ["OW", "1", "LargeGreenPaletteColorLookupTableData"],
        "0x1213": ["OW", "1", "LargeBluePaletteColorLookupTableData"],
        "0x1214": ["UI", "1", "LargePaletteColorLookupTableUID"],
        "0x1221": ["OW", "1", "SegmentedRedPaletteColorLookupTableData"],
        "0x1222": ["OW", "1", "SegmentedGreenPaletteColorLookupTableData"],
        "0x1223": ["OW", "1", "SegmentedBluePaletteColorLookupTableData"],
        "0x1300": ["CS", "1", "BreastImplantPresent"],
        "0x1350": ["CS", "1", "PartialView"],
        "0x1351": ["ST", "1", "PartialViewDescription"],
        "0x1352": ["SQ", "1", "PartialViewCodeSequence"],
        "0x135A": ["CS", "1", "SpatialLocationsPreserved"],
        "0x1401": ["SQ", "1", "DataFrameAssignmentSequence"],
        "0x1402": ["CS", "1", "DataPathAssignment"],
        "0x1403": ["US", "1", "BitsMappedToColorLookupTable"],
        "0x1404": ["SQ", "1", "BlendingLUT1Sequence"],
        "0x1405": ["CS", "1", "BlendingLUT1TransferFunction"],
        "0x1406": ["FD", "1", "BlendingWeightConstant"],
        "0x1407": ["US", "3", "BlendingLookupTableDescriptor"],
        "0x1408": ["OW", "1", "BlendingLookupTableData"],
        "0x140B": ["SQ", "1", "EnhancedPaletteColorLookupTableSequence"],
        "0x140C": ["SQ", "1", "BlendingLUT2Sequence"],
        "0x140D": ["CS", "1", "BlendingLUT2TransferFunction"],
        "0x140E": ["CS", "1", "DataPathID"],
        "0x140F": ["CS", "1", "RGBLUTTransferFunction"],
        "0x1410": ["CS", "1", "AlphaLUTTransferFunction"],
        "0x2000": ["OB", "1", "ICCProfile"],
        "0x2110": ["CS", "1", "LossyImageCompression"],
        "0x2112": ["DS", "1-n", "LossyImageCompressionRatio"],
        "0x2114": ["CS", "1-n", "LossyImageCompressionMethod"],
        "0x3000": ["SQ", "1", "ModalityLUTSequence"],
        "0x3002": ["xs", "3", "LUTDescriptor"],
        "0x3003": ["LO", "1", "LUTExplanation"],
        "0x3004": ["LO", "1", "ModalityLUTType"],
        "0x3006": ["US or OW", "1-n or 1", "LUTData"],
        "0x3010": ["SQ", "1", "VOILUTSequence"],
        "0x3110": ["SQ", "1", "SoftcopyVOILUTSequence"],
        "0x4000": ["LT", "1", "ImagePresentationComments"],
        "0x5000": ["SQ", "1", "BiPlaneAcquisitionSequence"],
        "0x6010": ["US", "1", "RepresentativeFrameNumber"],
        "0x6020": ["US", "1-n", "FrameNumbersOfInterest"],
        "0x6022": ["LO", "1-n", "FrameOfInterestDescription"],
        "0x6023": ["CS", "1-n", "FrameOfInterestType"],
        "0x6030": ["US", "1-n", "MaskPointers"],
        "0x6040": ["US", "1-n", "RWavePointer"],
        "0x6100": ["SQ", "1", "MaskSubtractionSequence"],
        "0x6101": ["CS", "1", "MaskOperation"],
        "0x6102": ["US", "2-2n", "ApplicableFrameRange"],
        "0x6110": ["US", "1-n", "MaskFrameNumbers"],
        "0x6112": ["US", "1", "ContrastFrameAveraging"],
        "0x6114": ["FL", "2", "MaskSubPixelShift"],
        "0x6120": ["SS", "1", "TIDOffset"],
        "0x6190": ["ST", "1", "MaskOperationExplanation"],
        "0x7000": ["SQ", "1", "EquipmentAdministratorSequence"],
        "0x7001": ["US", "1", "NumberOfDisplaySubsystems"],
        "0x7002": ["US", "1", "CurrentConfigurationID"],
        "0x7003": ["US", "1", "DisplaySubsystemID"],
        "0x7004": ["SH", "1", "DisplaySubsystemName"],
        "0x7005": ["LO", "1", "DisplaySubsystemDescription"],
        "0x7006": ["CS", "1", "SystemStatus"],
        "0x7007": ["LO", "1", "SystemStatusComment"],
        "0x7008": ["SQ", "1", "TargetLuminanceCharacteristicsSequence"],
        "0x7009": ["US", "1", "LuminanceCharacteristicsID"],
        "0x700A": ["SQ", "1", "DisplaySubsystemConfigurationSequence"],
        "0x700B": ["US", "1", "ConfigurationID"],
        "0x700C": ["SH", "1", "ConfigurationName"],
        "0x700D": ["LO", "1", "ConfigurationDescription"],
        "0x700E": ["US", "1", "ReferencedTargetLuminanceCharacteristicsID"],
        "0x700F": ["SQ", "1", "QAResultsSequence"],
        "0x7010": ["SQ", "1", "DisplaySubsystemQAResultsSequence"],
        "0x7011": ["SQ", "1", "ConfigurationQAResultsSequence"],
        "0x7012": ["SQ", "1", "MeasurementEquipmentSequence"],
        "0x7013": ["CS", "1-n", "MeasurementFunctions"],
        "0x7014": ["CS", "1", "MeasurementEquipmentType"],
        "0x7015": ["SQ", "1", "VisualEvaluationResultSequence"],
        "0x7016": ["SQ", "1", "DisplayCalibrationResultSequence"],
        "0x7017": ["US", "1", "DDLValue"],
        "0x7018": ["FL", "2", "CIExyWhitePoint"],
        "0x7019": ["CS", "1", "DisplayFunctionType"],
        "0x701A": ["FL", "1", "GammaValue"],
        "0x701B": ["US", "1", "NumberOfLuminancePoints"],
        "0x701C": ["SQ", "1", "LuminanceResponseSequence"],
        "0x701D": ["FL", "1", "TargetMinimumLuminance"],
        "0x701E": ["FL", "1", "TargetMaximumLuminance"],
        "0x701F": ["FL", "1", "LuminanceValue"],
        "0x7020": ["LO", "1", "LuminanceResponseDescription"],
        "0x7021": ["CS", "1", "WhitePointFlag"],
        "0x7022": ["SQ", "1", "DisplayDeviceTypeCodeSequence"],
        "0x7023": ["SQ", "1", "DisplaySubsystemSequence"],
        "0x7024": ["SQ", "1", "LuminanceResultSequence"],
        "0x7025": ["CS", "1", "AmbientLightValueSource"],
        "0x7026": ["CS", "1-n", "MeasuredCharacteristics"],
        "0x7027": ["SQ", "1", "LuminanceUniformityResultSequence"],
        "0x7028": ["SQ", "1", "VisualEvaluationTestSequence"],
        "0x7029": ["CS", "1", "TestResult"],
        "0x702A": ["LO", "1", "TestResultComment"],
        "0x702B": ["CS", "1", "TestImageValidation"],
        "0x702C": ["SQ", "1", "TestPatternCodeSequence"],
        "0x702D": ["SQ", "1", "MeasurementPatternCodeSequence"],
        "0x702E": ["SQ", "1", "VisualEvaluationMethodCodeSequence"],
        "0x7FE0": ["UR", "1", "PixelDataProviderURL"],
        "0x9001": ["UL", "1", "DataPointRows"],
        "0x9002": ["UL", "1", "DataPointColumns"],
        "0x9003": ["CS", "1", "SignalDomainColumns"],
        "0x9099": ["US", "1", "LargestMonochromePixelValue"],
        "0x9108": ["CS", "1", "DataRepresentation"],
        "0x9110": ["SQ", "1", "PixelMeasuresSequence"],
        "0x9132": ["SQ", "1", "FrameVOILUTSequence"],
        "0x9145": ["SQ", "1", "PixelValueTransformationSequence"],
        "0x9235": ["CS", "1", "SignalDomainRows"],
        "0x9411": ["FL", "1", "DisplayFilterPercentage"],
        "0x9415": ["SQ", "1", "FramePixelShiftSequence"],
        "0x9416": ["US", "1", "SubtractionItemID"],
        "0x9422": ["SQ", "1", "PixelIntensityRelationshipLUTSequence"],
        "0x9443": ["SQ", "1", "FramePixelDataPropertiesSequence"],
        "0x9444": ["CS", "1", "GeometricalProperties"],
        "0x9445": ["FL", "1", "GeometricMaximumDistortion"],
        "0x9446": ["CS", "1-n", "ImageProcessingApplied"],
        "0x9454": ["CS", "1", "MaskSelectionMode"],
        "0x9474": ["CS", "1", "LUTFunction"],
        "0x9478": ["FL", "1", "MaskVisibilityPercentage"],
        "0x9501": ["SQ", "1", "PixelShiftSequence"],
        "0x9502": ["SQ", "1", "RegionPixelShiftSequence"],
        "0x9503": ["SS", "2-2n", "VerticesOfTheRegion"],
        "0x9505": ["SQ", "1", "MultiFramePresentationSequence"],
        "0x9506": ["US", "2-2n", "PixelShiftFrameRange"],
        "0x9507": ["US", "2-2n", "LUTFrameRange"],
        "0x9520": ["DS", "16", "ImageToEquipmentMappingMatrix"],
        "0x9537": ["CS", "1", "EquipmentCoordinateSystemIdentification"]
    },
    "0x0032": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x000A": ["CS", "1", "StudyStatusID"],
        "0x000C": ["CS", "1", "StudyPriorityID"],
        "0x0012": ["LO", "1", "StudyIDIssuer"],
        "0x0032": ["DA", "1", "StudyVerifiedDate"],
        "0x0033": ["TM", "1", "StudyVerifiedTime"],
        "0x0034": ["DA", "1", "StudyReadDate"],
        "0x0035": ["TM", "1", "StudyReadTime"],
        "0x1000": ["DA", "1", "ScheduledStudyStartDate"],
        "0x1001": ["TM", "1", "ScheduledStudyStartTime"],
        "0x1010": ["DA", "1", "ScheduledStudyStopDate"],
        "0x1011": ["TM", "1", "ScheduledStudyStopTime"],
        "0x1020": ["LO", "1", "ScheduledStudyLocation"],
        "0x1021": ["AE", "1-n", "ScheduledStudyLocationAETitle"],
        "0x1030": ["LO", "1", "ReasonForStudy"],
        "0x1031": ["SQ", "1", "RequestingPhysicianIdentificationSequence"],
        "0x1032": ["PN", "1", "RequestingPhysician"],
        "0x1033": ["LO", "1", "RequestingService"],
        "0x1034": ["SQ", "1", "RequestingServiceCodeSequence"],
        "0x1040": ["DA", "1", "StudyArrivalDate"],
        "0x1041": ["TM", "1", "StudyArrivalTime"],
        "0x1050": ["DA", "1", "StudyCompletionDate"],
        "0x1051": ["TM", "1", "StudyCompletionTime"],
        "0x1055": ["CS", "1", "StudyComponentStatusID"],
        "0x1060": ["LO", "1", "RequestedProcedureDescription"],
        "0x1064": ["SQ", "1", "RequestedProcedureCodeSequence"],
        "0x1070": ["LO", "1", "RequestedContrastAgent"],
        "0x4000": ["LT", "1", "StudyComments"]
    },
    "0x0038": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0004": ["SQ", "1", "ReferencedPatientAliasSequence"],
        "0x0008": ["CS", "1", "VisitStatusID"],
        "0x0010": ["LO", "1", "AdmissionID"],
        "0x0011": ["LO", "1", "IssuerOfAdmissionID"],
        "0x0014": ["SQ", "1", "IssuerOfAdmissionIDSequence"],
        "0x0016": ["LO", "1", "RouteOfAdmissions"],
        "0x001A": ["DA", "1", "ScheduledAdmissionDate"],
        "0x001B": ["TM", "1", "ScheduledAdmissionTime"],
        "0x001C": ["DA", "1", "ScheduledDischargeDate"],
        "0x001D": ["TM", "1", "ScheduledDischargeTime"],
        "0x001E": ["LO", "1", "ScheduledPatientInstitutionResidence"],
        "0x0020": ["DA", "1", "AdmittingDate"],
        "0x0021": ["TM", "1", "AdmittingTime"],
        "0x0030": ["DA", "1", "DischargeDate"],
        "0x0032": ["TM", "1", "DischargeTime"],
        "0x0040": ["LO", "1", "DischargeDiagnosisDescription"],
        "0x0044": ["SQ", "1", "DischargeDiagnosisCodeSequence"],
        "0x0050": ["LO", "1", "SpecialNeeds"],
        "0x0060": ["LO", "1", "ServiceEpisodeID"],
        "0x0061": ["LO", "1", "IssuerOfServiceEpisodeID"],
        "0x0062": ["LO", "1", "ServiceEpisodeDescription"],
        "0x0064": ["SQ", "1", "IssuerOfServiceEpisodeIDSequence"],
        "0x0100": ["SQ", "1", "PertinentDocumentsSequence"],
        "0x0101": ["SQ", "1", "PertinentResourcesSequence"],
        "0x0102": ["LO", "1", "ResourceDescription"],
        "0x0300": ["LO", "1", "CurrentPatientLocation"],
        "0x0400": ["LO", "1", "PatientInstitutionResidence"],
        "0x0500": ["LO", "1", "PatientState"],
        "0x0502": ["SQ", "1", "PatientClinicalTrialParticipationSequence"],
        "0x4000": ["LT", "1", "VisitComments"]
    },
    "0x003A": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0004": ["CS", "1", "WaveformOriginality"],
        "0x0005": ["US", "1", "NumberOfWaveformChannels"],
        "0x0010": ["UL", "1", "NumberOfWaveformSamples"],
        "0x001A": ["DS", "1", "SamplingFrequency"],
        "0x0020": ["SH", "1", "MultiplexGroupLabel"],
        "0x0200": ["SQ", "1", "ChannelDefinitionSequence"],
        "0x0202": ["IS", "1", "WaveformChannelNumber"],
        "0x0203": ["SH", "1", "ChannelLabel"],
        "0x0205": ["CS", "1-n", "ChannelStatus"],
        "0x0208": ["SQ", "1", "ChannelSourceSequence"],
        "0x0209": ["SQ", "1", "ChannelSourceModifiersSequence"],
        "0x020A": ["SQ", "1", "SourceWaveformSequence"],
        "0x020C": ["LO", "1", "ChannelDerivationDescription"],
        "0x0210": ["DS", "1", "ChannelSensitivity"],
        "0x0211": ["SQ", "1", "ChannelSensitivityUnitsSequence"],
        "0x0212": ["DS", "1", "ChannelSensitivityCorrectionFactor"],
        "0x0213": ["DS", "1", "ChannelBaseline"],
        "0x0214": ["DS", "1", "ChannelTimeSkew"],
        "0x0215": ["DS", "1", "ChannelSampleSkew"],
        "0x0218": ["DS", "1", "ChannelOffset"],
        "0x021A": ["US", "1", "WaveformBitsStored"],
        "0x0220": ["DS", "1", "FilterLowFrequency"],
        "0x0221": ["DS", "1", "FilterHighFrequency"],
        "0x0222": ["DS", "1", "NotchFilterFrequency"],
        "0x0223": ["DS", "1", "NotchFilterBandwidth"],
        "0x0230": ["FL", "1", "WaveformDataDisplayScale"],
        "0x0231": ["US", "3", "WaveformDisplayBackgroundCIELabValue"],
        "0x0240": ["SQ", "1", "WaveformPresentationGroupSequence"],
        "0x0241": ["US", "1", "PresentationGroupNumber"],
        "0x0242": ["SQ", "1", "ChannelDisplaySequence"],
        "0x0244": ["US", "3", "ChannelRecommendedDisplayCIELabValue"],
        "0x0245": ["FL", "1", "ChannelPosition"],
        "0x0246": ["CS", "1", "DisplayShadingFlag"],
        "0x0247": ["FL", "1", "FractionalChannelDisplayScale"],
        "0x0248": ["FL", "1", "AbsoluteChannelDisplayScale"],
        "0x0300": ["SQ", "1", "MultiplexedAudioChannelsDescriptionCodeSequence"],
        "0x0301": ["IS", "1", "ChannelIdentificationCode"],
        "0x0302": ["CS", "1", "ChannelMode"]
    },
    "0x0040": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["AE", "1-n", "ScheduledStationAETitle"],
        "0x0002": ["DA", "1", "ScheduledProcedureStepStartDate"],
        "0x0003": ["TM", "1", "ScheduledProcedureStepStartTime"],
        "0x0004": ["DA", "1", "ScheduledProcedureStepEndDate"],
        "0x0005": ["TM", "1", "ScheduledProcedureStepEndTime"],
        "0x0006": ["PN", "1", "ScheduledPerformingPhysicianName"],
        "0x0007": ["LO", "1", "ScheduledProcedureStepDescription"],
        "0x0008": ["SQ", "1", "ScheduledProtocolCodeSequence"],
        "0x0009": ["SH", "1", "ScheduledProcedureStepID"],
        "0x000A": ["SQ", "1", "StageCodeSequence"],
        "0x000B": ["SQ", "1", "ScheduledPerformingPhysicianIdentificationSequence"],
        "0x0010": ["SH", "1-n", "ScheduledStationName"],
        "0x0011": ["SH", "1", "ScheduledProcedureStepLocation"],
        "0x0012": ["LO", "1", "PreMedication"],
        "0x0020": ["CS", "1", "ScheduledProcedureStepStatus"],
        "0x0026": ["SQ", "1", "OrderPlacerIdentifierSequence"],
        "0x0027": ["SQ", "1", "OrderFillerIdentifierSequence"],
        "0x0031": ["UT", "1", "LocalNamespaceEntityID"],
        "0x0032": ["UT", "1", "UniversalEntityID"],
        "0x0033": ["CS", "1", "UniversalEntityIDType"],
        "0x0035": ["CS", "1", "IdentifierTypeCode"],
        "0x0036": ["SQ", "1", "AssigningFacilitySequence"],
        "0x0039": ["SQ", "1", "AssigningJurisdictionCodeSequence"],
        "0x003A": ["SQ", "1", "AssigningAgencyOrDepartmentCodeSequence"],
        "0x0100": ["SQ", "1", "ScheduledProcedureStepSequence"],
        "0x0220": ["SQ", "1", "ReferencedNonImageCompositeSOPInstanceSequence"],
        "0x0241": ["AE", "1", "PerformedStationAETitle"],
        "0x0242": ["SH", "1", "PerformedStationName"],
        "0x0243": ["SH", "1", "PerformedLocation"],
        "0x0244": ["DA", "1", "PerformedProcedureStepStartDate"],
        "0x0245": ["TM", "1", "PerformedProcedureStepStartTime"],
        "0x0250": ["DA", "1", "PerformedProcedureStepEndDate"],
        "0x0251": ["TM", "1", "PerformedProcedureStepEndTime"],
        "0x0252": ["CS", "1", "PerformedProcedureStepStatus"],
        "0x0253": ["SH", "1", "PerformedProcedureStepID"],
        "0x0254": ["LO", "1", "PerformedProcedureStepDescription"],
        "0x0255": ["LO", "1", "PerformedProcedureTypeDescription"],
        "0x0260": ["SQ", "1", "PerformedProtocolCodeSequence"],
        "0x0261": ["CS", "1", "PerformedProtocolType"],
        "0x0270": ["SQ", "1", "ScheduledStepAttributesSequence"],
        "0x0275": ["SQ", "1", "RequestAttributesSequence"],
        "0x0280": ["ST", "1", "CommentsOnThePerformedProcedureStep"],
        "0x0281": ["SQ", "1", "PerformedProcedureStepDiscontinuationReasonCodeSequence"],
        "0x0293": ["SQ", "1", "QuantitySequence"],
        "0x0294": ["DS", "1", "Quantity"],
        "0x0295": ["SQ", "1", "MeasuringUnitsSequence"],
        "0x0296": ["SQ", "1", "BillingItemSequence"],
        "0x0300": ["US", "1", "TotalTimeOfFluoroscopy"],
        "0x0301": ["US", "1", "TotalNumberOfExposures"],
        "0x0302": ["US", "1", "EntranceDose"],
        "0x0303": ["US", "1-2", "ExposedArea"],
        "0x0306": ["DS", "1", "DistanceSourceToEntrance"],
        "0x0307": ["DS", "1", "DistanceSourceToSupport"],
        "0x030E": ["SQ", "1", "ExposureDoseSequence"],
        "0x0310": ["ST", "1", "CommentsOnRadiationDose"],
        "0x0312": ["DS", "1", "XRayOutput"],
        "0x0314": ["DS", "1", "HalfValueLayer"],
        "0x0316": ["DS", "1", "OrganDose"],
        "0x0318": ["CS", "1", "OrganExposed"],
        "0x0320": ["SQ", "1", "BillingProcedureStepSequence"],
        "0x0321": ["SQ", "1", "FilmConsumptionSequence"],
        "0x0324": ["SQ", "1", "BillingSuppliesAndDevicesSequence"],
        "0x0330": ["SQ", "1", "ReferencedProcedureStepSequence"],
        "0x0340": ["SQ", "1", "PerformedSeriesSequence"],
        "0x0400": ["LT", "1", "CommentsOnTheScheduledProcedureStep"],
        "0x0440": ["SQ", "1", "ProtocolContextSequence"],
        "0x0441": ["SQ", "1", "ContentItemModifierSequence"],
        "0x0500": ["SQ", "1", "ScheduledSpecimenSequence"],
        "0x050A": ["LO", "1", "SpecimenAccessionNumber"],
        "0x0512": ["LO", "1", "ContainerIdentifier"],
        "0x0513": ["SQ", "1", "IssuerOfTheContainerIdentifierSequence"],
        "0x0515": ["SQ", "1", "AlternateContainerIdentifierSequence"],
        "0x0518": ["SQ", "1", "ContainerTypeCodeSequence"],
        "0x051A": ["LO", "1", "ContainerDescription"],
        "0x0520": ["SQ", "1", "ContainerComponentSequence"],
        "0x0550": ["SQ", "1", "SpecimenSequence"],
        "0x0551": ["LO", "1", "SpecimenIdentifier"],
        "0x0552": ["SQ", "1", "SpecimenDescriptionSequenceTrial"],
        "0x0553": ["ST", "1", "SpecimenDescriptionTrial"],
        "0x0554": ["UI", "1", "SpecimenUID"],
        "0x0555": ["SQ", "1", "AcquisitionContextSequence"],
        "0x0556": ["ST", "1", "AcquisitionContextDescription"],
        "0x059A": ["SQ", "1", "SpecimenTypeCodeSequence"],
        "0x0560": ["SQ", "1", "SpecimenDescriptionSequence"],
        "0x0562": ["SQ", "1", "IssuerOfTheSpecimenIdentifierSequence"],
        "0x0600": ["LO", "1", "SpecimenShortDescription"],
        "0x0602": ["UT", "1", "SpecimenDetailedDescription"],
        "0x0610": ["SQ", "1", "SpecimenPreparationSequence"],
        "0x0612": ["SQ", "1", "SpecimenPreparationStepContentItemSequence"],
        "0x0620": ["SQ", "1", "SpecimenLocalizationContentItemSequence"],
        "0x06FA": ["LO", "1", "SlideIdentifier"],
        "0x071A": ["SQ", "1", "ImageCenterPointCoordinatesSequence"],
        "0x072A": ["DS", "1", "XOffsetInSlideCoordinateSystem"],
        "0x073A": ["DS", "1", "YOffsetInSlideCoordinateSystem"],
        "0x074A": ["DS", "1", "ZOffsetInSlideCoordinateSystem"],
        "0x08D8": ["SQ", "1", "PixelSpacingSequence"],
        "0x08DA": ["SQ", "1", "CoordinateSystemAxisCodeSequence"],
        "0x08EA": ["SQ", "1", "MeasurementUnitsCodeSequence"],
        "0x09F8": ["SQ", "1", "VitalStainCodeSequenceTrial"],
        "0x1001": ["SH", "1", "RequestedProcedureID"],
        "0x1002": ["LO", "1", "ReasonForTheRequestedProcedure"],
        "0x1003": ["SH", "1", "RequestedProcedurePriority"],
        "0x1004": ["LO", "1", "PatientTransportArrangements"],
        "0x1005": ["LO", "1", "RequestedProcedureLocation"],
        "0x1006": ["SH", "1", "PlacerOrderNumberProcedure"],
        "0x1007": ["SH", "1", "FillerOrderNumberProcedure"],
        "0x1008": ["LO", "1", "ConfidentialityCode"],
        "0x1009": ["SH", "1", "ReportingPriority"],
        "0x100A": ["SQ", "1", "ReasonForRequestedProcedureCodeSequence"],
        "0x1010": ["PN", "1-n", "NamesOfIntendedRecipientsOfResults"],
        "0x1011": ["SQ", "1", "IntendedRecipientsOfResultsIdentificationSequence"],
        "0x1012": ["SQ", "1", "ReasonForPerformedProcedureCodeSequence"],
        "0x1060": ["LO", "1", "RequestedProcedureDescriptionTrial"],
        "0x1101": ["SQ", "1", "PersonIdentificationCodeSequence"],
        "0x1102": ["ST", "1", "PersonAddress"],
        "0x1103": ["LO", "1-n", "PersonTelephoneNumbers"],
        "0x1104": ["LT", "1", "PersonTelecomInformation"],
        "0x1400": ["LT", "1", "RequestedProcedureComments"],
        "0x2001": ["LO", "1", "ReasonForTheImagingServiceRequest"],
        "0x2004": ["DA", "1", "IssueDateOfImagingServiceRequest"],
        "0x2005": ["TM", "1", "IssueTimeOfImagingServiceRequest"],
        "0x2006": ["SH", "1", "PlacerOrderNumberImagingServiceRequestRetired"],
        "0x2007": ["SH", "1", "FillerOrderNumberImagingServiceRequestRetired"],
        "0x2008": ["PN", "1", "OrderEnteredBy"],
        "0x2009": ["SH", "1", "OrderEntererLocation"],
        "0x2010": ["SH", "1", "OrderCallbackPhoneNumber"],
        "0x2011": ["LT", "1", "OrderCallbackTelecomInformation"],
        "0x2016": ["LO", "1", "PlacerOrderNumberImagingServiceRequest"],
        "0x2017": ["LO", "1", "FillerOrderNumberImagingServiceRequest"],
        "0x2400": ["LT", "1", "ImagingServiceRequestComments"],
        "0x3001": ["LO", "1", "ConfidentialityConstraintOnPatientDataDescription"],
        "0x4001": ["CS", "1", "GeneralPurposeScheduledProcedureStepStatus"],
        "0x4002": ["CS", "1", "GeneralPurposePerformedProcedureStepStatus"],
        "0x4003": ["CS", "1", "GeneralPurposeScheduledProcedureStepPriority"],
        "0x4004": ["SQ", "1", "ScheduledProcessingApplicationsCodeSequence"],
        "0x4005": ["DT", "1", "ScheduledProcedureStepStartDateTime"],
        "0x4006": ["CS", "1", "MultipleCopiesFlag"],
        "0x4007": ["SQ", "1", "PerformedProcessingApplicationsCodeSequence"],
        "0x4009": ["SQ", "1", "HumanPerformerCodeSequence"],
        "0x4010": ["DT", "1", "ScheduledProcedureStepModificationDateTime"],
        "0x4011": ["DT", "1", "ExpectedCompletionDateTime"],
        "0x4015": ["SQ", "1", "ResultingGeneralPurposePerformedProcedureStepsSequence"],
        "0x4016": ["SQ", "1", "ReferencedGeneralPurposeScheduledProcedureStepSequence"],
        "0x4018": ["SQ", "1", "ScheduledWorkitemCodeSequence"],
        "0x4019": ["SQ", "1", "PerformedWorkitemCodeSequence"],
        "0x4020": ["CS", "1", "InputAvailabilityFlag"],
        "0x4021": ["SQ", "1", "InputInformationSequence"],
        "0x4022": ["SQ", "1", "RelevantInformationSequence"],
        "0x4023": ["UI", "1", "ReferencedGeneralPurposeScheduledProcedureStepTransactionUID"],
        "0x4025": ["SQ", "1", "ScheduledStationNameCodeSequence"],
        "0x4026": ["SQ", "1", "ScheduledStationClassCodeSequence"],
        "0x4027": ["SQ", "1", "ScheduledStationGeographicLocationCodeSequence"],
        "0x4028": ["SQ", "1", "PerformedStationNameCodeSequence"],
        "0x4029": ["SQ", "1", "PerformedStationClassCodeSequence"],
        "0x4030": ["SQ", "1", "PerformedStationGeographicLocationCodeSequence"],
        "0x4031": ["SQ", "1", "RequestedSubsequentWorkitemCodeSequence"],
        "0x4032": ["SQ", "1", "NonDICOMOutputCodeSequence"],
        "0x4033": ["SQ", "1", "OutputInformationSequence"],
        "0x4034": ["SQ", "1", "ScheduledHumanPerformersSequence"],
        "0x4035": ["SQ", "1", "ActualHumanPerformersSequence"],
        "0x4036": ["LO", "1", "HumanPerformerOrganization"],
        "0x4037": ["PN", "1", "HumanPerformerName"],
        "0x4040": ["CS", "1", "RawDataHandling"],
        "0x4041": ["CS", "1", "InputReadinessState"],
        "0x4050": ["DT", "1", "PerformedProcedureStepStartDateTime"],
        "0x4051": ["DT", "1", "PerformedProcedureStepEndDateTime"],
        "0x4052": ["DT", "1", "ProcedureStepCancellationDateTime"],
        "0x8302": ["DS", "1", "EntranceDoseInmGy"],
        "0x9092": ["SQ", "1", "ParametricMapFrameTypeSequence"],
        "0x9094": ["SQ", "1", "ReferencedImageRealWorldValueMappingSequence"],
        "0x9096": ["SQ", "1", "RealWorldValueMappingSequence"],
        "0x9098": ["SQ", "1", "PixelValueMappingCodeSequence"],
        "0x9210": ["SH", "1", "LUTLabel"],
        "0x9211": ["xs", "1", "RealWorldValueLastValueMapped"],
        "0x9212": ["FD", "1-n", "RealWorldValueLUTData"],
        "0x9216": ["xs", "1", "RealWorldValueFirstValueMapped"],
        "0x9220": ["SQ", "1", "QuantityDefinitionSequence"],
        "0x9224": ["FD", "1", "RealWorldValueIntercept"],
        "0x9225": ["FD", "1", "RealWorldValueSlope"],
        "0xA007": ["CS", "1", "FindingsFlagTrial"],
        "0xA010": ["CS", "1", "RelationshipType"],
        "0xA020": ["SQ", "1", "FindingsSequenceTrial"],
        "0xA021": ["UI", "1", "FindingsGroupUIDTrial"],
        "0xA022": ["UI", "1", "ReferencedFindingsGroupUIDTrial"],
        "0xA023": ["DA", "1", "FindingsGroupRecordingDateTrial"],
        "0xA024": ["TM", "1", "FindingsGroupRecordingTimeTrial"],
        "0xA026": ["SQ", "1", "FindingsSourceCategoryCodeSequenceTrial"],
        "0xA027": ["LO", "1", "VerifyingOrganization"],
        "0xA028": ["SQ", "1", "DocumentingOrganizationIdentifierCodeSequenceTrial"],
        "0xA030": ["DT", "1", "VerificationDateTime"],
        "0xA032": ["DT", "1", "ObservationDateTime"],
        "0xA040": ["CS", "1", "ValueType"],
        "0xA043": ["SQ", "1", "ConceptNameCodeSequence"],
        "0xA047": ["LO", "1", "MeasurementPrecisionDescriptionTrial"],
        "0xA050": ["CS", "1", "ContinuityOfContent"],
        "0xA057": ["CS", "1-n", "UrgencyOrPriorityAlertsTrial"],
        "0xA060": ["LO", "1", "SequencingIndicatorTrial"],
        "0xA066": ["SQ", "1", "DocumentIdentifierCodeSequenceTrial"],
        "0xA067": ["PN", "1", "DocumentAuthorTrial"],
        "0xA068": ["SQ", "1", "DocumentAuthorIdentifierCodeSequenceTrial"],
        "0xA070": ["SQ", "1", "IdentifierCodeSequenceTrial"],
        "0xA073": ["SQ", "1", "VerifyingObserverSequence"],
        "0xA074": ["OB", "1", "ObjectBinaryIdentifierTrial"],
        "0xA075": ["PN", "1", "VerifyingObserverName"],
        "0xA076": ["SQ", "1", "DocumentingObserverIdentifierCodeSequenceTrial"],
        "0xA078": ["SQ", "1", "AuthorObserverSequence"],
        "0xA07A": ["SQ", "1", "ParticipantSequence"],
        "0xA07C": ["SQ", "1", "CustodialOrganizationSequence"],
        "0xA080": ["CS", "1", "ParticipationType"],
        "0xA082": ["DT", "1", "ParticipationDateTime"],
        "0xA084": ["CS", "1", "ObserverType"],
        "0xA085": ["SQ", "1", "ProcedureIdentifierCodeSequenceTrial"],
        "0xA088": ["SQ", "1", "VerifyingObserverIdentificationCodeSequence"],
        "0xA089": ["OB", "1", "ObjectDirectoryBinaryIdentifierTrial"],
        "0xA090": ["SQ", "1", "EquivalentCDADocumentSequence"],
        "0xA0B0": ["US", "2-2n", "ReferencedWaveformChannels"],
        "0xA110": ["DA", "1", "DateOfDocumentOrVerbalTransactionTrial"],
        "0xA112": ["TM", "1", "TimeOfDocumentCreationOrVerbalTransactionTrial"],
        "0xA120": ["DT", "1", "DateTime"],
        "0xA121": ["DA", "1", "Date"],
        "0xA122": ["TM", "1", "Time"],
        "0xA123": ["PN", "1", "PersonName"],
        "0xA124": ["UI", "1", "UID"],
        "0xA125": ["CS", "2", "ReportStatusIDTrial"],
        "0xA130": ["CS", "1", "TemporalRangeType"],
        "0xA132": ["UL", "1-n", "ReferencedSamplePositions"],
        "0xA136": ["US", "1-n", "ReferencedFrameNumbers"],
        "0xA138": ["DS", "1-n", "ReferencedTimeOffsets"],
        "0xA13A": ["DT", "1-n", "ReferencedDateTime"],
        "0xA160": ["UT", "1", "TextValue"],
        "0xA161": ["FD", "1-n", "FloatingPointValue"],
        "0xA162": ["SL", "1-n", "RationalNumeratorValue"],
        "0xA163": ["UL", "1-n", "RationalDenominatorValue"],
        "0xA167": ["SQ", "1", "ObservationCategoryCodeSequenceTrial"],
        "0xA168": ["SQ", "1", "ConceptCodeSequence"],
        "0xA16A": ["ST", "1", "BibliographicCitationTrial"],
        "0xA170": ["SQ", "1", "PurposeOfReferenceCodeSequence"],
        "0xA171": ["UI", "1", "ObservationUID"],
        "0xA172": ["UI", "1", "ReferencedObservationUIDTrial"],
        "0xA173": ["CS", "1", "ReferencedObservationClassTrial"],
        "0xA174": ["CS", "1", "ReferencedObjectObservationClassTrial"],
        "0xA180": ["US", "1", "AnnotationGroupNumber"],
        "0xA192": ["DA", "1", "ObservationDateTrial"],
        "0xA193": ["TM", "1", "ObservationTimeTrial"],
        "0xA194": ["CS", "1", "MeasurementAutomationTrial"],
        "0xA195": ["SQ", "1", "ModifierCodeSequence"],
        "0xA224": ["ST", "1", "IdentificationDescriptionTrial"],
        "0xA290": ["CS", "1", "CoordinatesSetGeometricTypeTrial"],
        "0xA296": ["SQ", "1", "AlgorithmCodeSequenceTrial"],
        "0xA297": ["ST", "1", "AlgorithmDescriptionTrial"],
        "0xA29A": ["SL", "2-2n", "PixelCoordinatesSetTrial"],
        "0xA300": ["SQ", "1", "MeasuredValueSequence"],
        "0xA301": ["SQ", "1", "NumericValueQualifierCodeSequence"],
        "0xA307": ["PN", "1", "CurrentObserverTrial"],
        "0xA30A": ["DS", "1-n", "NumericValue"],
        "0xA313": ["SQ", "1", "ReferencedAccessionSequenceTrial"],
        "0xA33A": ["ST", "1", "ReportStatusCommentTrial"],
        "0xA340": ["SQ", "1", "ProcedureContextSequenceTrial"],
        "0xA352": ["PN", "1", "VerbalSourceTrial"],
        "0xA353": ["ST", "1", "AddressTrial"],
        "0xA354": ["LO", "1", "TelephoneNumberTrial"],
        "0xA358": ["SQ", "1", "VerbalSourceIdentifierCodeSequenceTrial"],
        "0xA360": ["SQ", "1", "PredecessorDocumentsSequence"],
        "0xA370": ["SQ", "1", "ReferencedRequestSequence"],
        "0xA372": ["SQ", "1", "PerformedProcedureCodeSequence"],
        "0xA375": ["SQ", "1", "CurrentRequestedProcedureEvidenceSequence"],
        "0xA380": ["SQ", "1", "ReportDetailSequenceTrial"],
        "0xA385": ["SQ", "1", "PertinentOtherEvidenceSequence"],
        "0xA390": ["SQ", "1", "HL7StructuredDocumentReferenceSequence"],
        "0xA402": ["UI", "1", "ObservationSubjectUIDTrial"],
        "0xA403": ["CS", "1", "ObservationSubjectClassTrial"],
        "0xA404": ["SQ", "1", "ObservationSubjectTypeCodeSequenceTrial"],
        "0xA491": ["CS", "1", "CompletionFlag"],
        "0xA492": ["LO", "1", "CompletionFlagDescription"],
        "0xA493": ["CS", "1", "VerificationFlag"],
        "0xA494": ["CS", "1", "ArchiveRequested"],
        "0xA496": ["CS", "1", "PreliminaryFlag"],
        "0xA504": ["SQ", "1", "ContentTemplateSequence"],
        "0xA525": ["SQ", "1", "IdenticalDocumentsSequence"],
        "0xA600": ["CS", "1", "ObservationSubjectContextFlagTrial"],
        "0xA601": ["CS", "1", "ObserverContextFlagTrial"],
        "0xA603": ["CS", "1", "ProcedureContextFlagTrial"],
        "0xA730": ["SQ", "1", "ContentSequence"],
        "0xA731": ["SQ", "1", "RelationshipSequenceTrial"],
        "0xA732": ["SQ", "1", "RelationshipTypeCodeSequenceTrial"],
        "0xA744": ["SQ", "1", "LanguageCodeSequenceTrial"],
        "0xA992": ["ST", "1", "UniformResourceLocatorTrial"],
        "0xB020": ["SQ", "1", "WaveformAnnotationSequence"],
        "0xDB00": ["CS", "1", "TemplateIdentifier"],
        "0xDB06": ["DT", "1", "TemplateVersion"],
        "0xDB07": ["DT", "1", "TemplateLocalVersion"],
        "0xDB0B": ["CS", "1", "TemplateExtensionFlag"],
        "0xDB0C": ["UI", "1", "TemplateExtensionOrganizationUID"],
        "0xDB0D": ["UI", "1", "TemplateExtensionCreatorUID"],
        "0xDB73": ["UL", "1-n", "ReferencedContentItemIdentifier"],
        "0xE001": ["ST", "1", "HL7InstanceIdentifier"],
        "0xE004": ["DT", "1", "HL7DocumentEffectiveTime"],
        "0xE006": ["SQ", "1", "HL7DocumentTypeCodeSequence"],
        "0xE008": ["SQ", "1", "DocumentClassCodeSequence"],
        "0xE010": ["UR", "1", "RetrieveURI"],
        "0xE011": ["UI", "1", "RetrieveLocationUID"],
        "0xE020": ["CS", "1", "TypeOfInstances"],
        "0xE021": ["SQ", "1", "DICOMRetrievalSequence"],
        "0xE022": ["SQ", "1", "DICOMMediaRetrievalSequence"],
        "0xE023": ["SQ", "1", "WADORetrievalSequence"],
        "0xE024": ["SQ", "1", "XDSRetrievalSequence"],
        "0xE025": ["SQ", "1", "WADORSRetrievalSequence"],
        "0xE030": ["UI", "1", "RepositoryUniqueID"],
        "0xE031": ["UI", "1", "HomeCommunityID"]
    },
    "0x0042": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["ST", "1", "DocumentTitle"],
        "0x0011": ["OB", "1", "EncapsulatedDocument"],
        "0x0012": ["LO", "1", "MIMETypeOfEncapsulatedDocument"],
        "0x0013": ["SQ", "1", "SourceInstanceSequence"],
        "0x0014": ["LO", "1-n", "ListOfMIMETypes"]
    },
    "0x0044": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["ST", "1", "ProductPackageIdentifier"],
        "0x0002": ["CS", "1", "SubstanceAdministrationApproval"],
        "0x0003": ["LT", "1", "ApprovalStatusFurtherDescription"],
        "0x0004": ["DT", "1", "ApprovalStatusDateTime"],
        "0x0007": ["SQ", "1", "ProductTypeCodeSequence"],
        "0x0008": ["LO", "1-n", "ProductName"],
        "0x0009": ["LT", "1", "ProductDescription"],
        "0x000A": ["LO", "1", "ProductLotIdentifier"],
        "0x000B": ["DT", "1", "ProductExpirationDateTime"],
        "0x0010": ["DT", "1", "SubstanceAdministrationDateTime"],
        "0x0011": ["LO", "1", "SubstanceAdministrationNotes"],
        "0x0012": ["LO", "1", "SubstanceAdministrationDeviceID"],
        "0x0013": ["SQ", "1", "ProductParameterSequence"],
        "0x0019": ["SQ", "1", "SubstanceAdministrationParameterSequence"]
    },
    "0x0046": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0012": ["LO", "1", "LensDescription"],
        "0x0014": ["SQ", "1", "RightLensSequence"],
        "0x0015": ["SQ", "1", "LeftLensSequence"],
        "0x0016": ["SQ", "1", "UnspecifiedLateralityLensSequence"],
        "0x0018": ["SQ", "1", "CylinderSequence"],
        "0x0028": ["SQ", "1", "PrismSequence"],
        "0x0030": ["FD", "1", "HorizontalPrismPower"],
        "0x0032": ["CS", "1", "HorizontalPrismBase"],
        "0x0034": ["FD", "1", "VerticalPrismPower"],
        "0x0036": ["CS", "1", "VerticalPrismBase"],
        "0x0038": ["CS", "1", "LensSegmentType"],
        "0x0040": ["FD", "1", "OpticalTransmittance"],
        "0x0042": ["FD", "1", "ChannelWidth"],
        "0x0044": ["FD", "1", "PupilSize"],
        "0x0046": ["FD", "1", "CornealSize"],
        "0x0050": ["SQ", "1", "AutorefractionRightEyeSequence"],
        "0x0052": ["SQ", "1", "AutorefractionLeftEyeSequence"],
        "0x0060": ["FD", "1", "DistancePupillaryDistance"],
        "0x0062": ["FD", "1", "NearPupillaryDistance"],
        "0x0063": ["FD", "1", "IntermediatePupillaryDistance"],
        "0x0064": ["FD", "1", "OtherPupillaryDistance"],
        "0x0070": ["SQ", "1", "KeratometryRightEyeSequence"],
        "0x0071": ["SQ", "1", "KeratometryLeftEyeSequence"],
        "0x0074": ["SQ", "1", "SteepKeratometricAxisSequence"],
        "0x0075": ["FD", "1", "RadiusOfCurvature"],
        "0x0076": ["FD", "1", "KeratometricPower"],
        "0x0077": ["FD", "1", "KeratometricAxis"],
        "0x0080": ["SQ", "1", "FlatKeratometricAxisSequence"],
        "0x0092": ["CS", "1", "BackgroundColor"],
        "0x0094": ["CS", "1", "Optotype"],
        "0x0095": ["CS", "1", "OptotypePresentation"],
        "0x0097": ["SQ", "1", "SubjectiveRefractionRightEyeSequence"],
        "0x0098": ["SQ", "1", "SubjectiveRefractionLeftEyeSequence"],
        "0x0100": ["SQ", "1", "AddNearSequence"],
        "0x0101": ["SQ", "1", "AddIntermediateSequence"],
        "0x0102": ["SQ", "1", "AddOtherSequence"],
        "0x0104": ["FD", "1", "AddPower"],
        "0x0106": ["FD", "1", "ViewingDistance"],
        "0x0121": ["SQ", "1", "VisualAcuityTypeCodeSequence"],
        "0x0122": ["SQ", "1", "VisualAcuityRightEyeSequence"],
        "0x0123": ["SQ", "1", "VisualAcuityLeftEyeSequence"],
        "0x0124": ["SQ", "1", "VisualAcuityBothEyesOpenSequence"],
        "0x0125": ["CS", "1", "ViewingDistanceType"],
        "0x0135": ["SS", "2", "VisualAcuityModifiers"],
        "0x0137": ["FD", "1", "DecimalVisualAcuity"],
        "0x0139": ["LO", "1", "OptotypeDetailedDefinition"],
        "0x0145": ["SQ", "1", "ReferencedRefractiveMeasurementsSequence"],
        "0x0146": ["FD", "1", "SpherePower"],
        "0x0147": ["FD", "1", "CylinderPower"],
        "0x0201": ["CS", "1", "CornealTopographySurface"],
        "0x0202": ["FL", "2", "CornealVertexLocation"],
        "0x0203": ["FL", "1", "PupilCentroidXCoordinate"],
        "0x0204": ["FL", "1", "PupilCentroidYCoordinate"],
        "0x0205": ["FL", "1", "EquivalentPupilRadius"],
        "0x0207": ["SQ", "1", "CornealTopographyMapTypeCodeSequence"],
        "0x0208": ["IS", "2-2n", "VerticesOfTheOutlineOfPupil"],
        "0x0210": ["SQ", "1", "CornealTopographyMappingNormalsSequence"],
        "0x0211": ["SQ", "1", "MaximumCornealCurvatureSequence"],
        "0x0212": ["FL", "1", "MaximumCornealCurvature"],
        "0x0213": ["FL", "2", "MaximumCornealCurvatureLocation"],
        "0x0215": ["SQ", "1", "MinimumKeratometricSequence"],
        "0x0218": ["SQ", "1", "SimulatedKeratometricCylinderSequence"],
        "0x0220": ["FL", "1", "AverageCornealPower"],
        "0x0224": ["FL", "1", "CornealISValue"],
        "0x0227": ["FL", "1", "AnalyzedArea"],
        "0x0230": ["FL", "1", "SurfaceRegularityIndex"],
        "0x0232": ["FL", "1", "SurfaceAsymmetryIndex"],
        "0x0234": ["FL", "1", "CornealEccentricityIndex"],
        "0x0236": ["FL", "1", "KeratoconusPredictionIndex"],
        "0x0238": ["FL", "1", "DecimalPotentialVisualAcuity"],
        "0x0242": ["CS", "1", "CornealTopographyMapQualityEvaluation"],
        "0x0244": ["SQ", "1", "SourceImageCornealProcessedDataSequence"],
        "0x0247": ["FL", "3", "CornealPointLocation"],
        "0x0248": ["CS", "1", "CornealPointEstimated"],
        "0x0249": ["FL", "1", "AxialPower"],
        "0x0250": ["FL", "1", "TangentialPower"],
        "0x0251": ["FL", "1", "RefractivePower"],
        "0x0252": ["FL", "1", "RelativeElevation"],
        "0x0253": ["FL", "1", "CornealWavefront"]
    },
    "0x0048": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["FL", "1", "ImagedVolumeWidth"],
        "0x0002": ["FL", "1", "ImagedVolumeHeight"],
        "0x0003": ["FL", "1", "ImagedVolumeDepth"],
        "0x0006": ["UL", "1", "TotalPixelMatrixColumns"],
        "0x0007": ["UL", "1", "TotalPixelMatrixRows"],
        "0x0008": ["SQ", "1", "TotalPixelMatrixOriginSequence"],
        "0x0010": ["CS", "1", "SpecimenLabelInImage"],
        "0x0011": ["CS", "1", "FocusMethod"],
        "0x0012": ["CS", "1", "ExtendedDepthOfField"],
        "0x0013": ["US", "1", "NumberOfFocalPlanes"],
        "0x0014": ["FL", "1", "DistanceBetweenFocalPlanes"],
        "0x0015": ["US", "3", "RecommendedAbsentPixelCIELabValue"],
        "0x0100": ["SQ", "1", "IlluminatorTypeCodeSequence"],
        "0x0102": ["DS", "6", "ImageOrientationSlide"],
        "0x0105": ["SQ", "1", "OpticalPathSequence"],
        "0x0106": ["SH", "1", "OpticalPathIdentifier"],
        "0x0107": ["ST", "1", "OpticalPathDescription"],
        "0x0108": ["SQ", "1", "IlluminationColorCodeSequence"],
        "0x0110": ["SQ", "1", "SpecimenReferenceSequence"],
        "0x0111": ["DS", "1", "CondenserLensPower"],
        "0x0112": ["DS", "1", "ObjectiveLensPower"],
        "0x0113": ["DS", "1", "ObjectiveLensNumericalAperture"],
        "0x0120": ["SQ", "1", "PaletteColorLookupTableSequence"],
        "0x0200": ["SQ", "1", "ReferencedImageNavigationSequence"],
        "0x0201": ["US", "2", "TopLeftHandCornerOfLocalizerArea"],
        "0x0202": ["US", "2", "BottomRightHandCornerOfLocalizerArea"],
        "0x0207": ["SQ", "1", "OpticalPathIdentificationSequence"],
        "0x021A": ["SQ", "1", "PlanePositionSlideSequence"],
        "0x021E": ["SL", "1", "ColumnPositionInTotalImagePixelMatrix"],
        "0x021F": ["SL", "1", "RowPositionInTotalImagePixelMatrix"],
        "0x0301": ["CS", "1", "PixelOriginInterpretation"]
    },
    "0x0050": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0004": ["CS", "1", "CalibrationImage"],
        "0x0010": ["SQ", "1", "DeviceSequence"],
        "0x0012": ["SQ", "1", "ContainerComponentTypeCodeSequence"],
        "0x0013": ["FD", "1", "ContainerComponentThickness"],
        "0x0014": ["DS", "1", "DeviceLength"],
        "0x0015": ["FD", "1", "ContainerComponentWidth"],
        "0x0016": ["DS", "1", "DeviceDiameter"],
        "0x0017": ["CS", "1", "DeviceDiameterUnits"],
        "0x0018": ["DS", "1", "DeviceVolume"],
        "0x0019": ["DS", "1", "InterMarkerDistance"],
        "0x001A": ["CS", "1", "ContainerComponentMaterial"],
        "0x001B": ["LO", "1", "ContainerComponentID"],
        "0x001C": ["FD", "1", "ContainerComponentLength"],
        "0x001D": ["FD", "1", "ContainerComponentDiameter"],
        "0x001E": ["LO", "1", "ContainerComponentDescription"],
        "0x0020": ["LO", "1", "DeviceDescription"]
    },
    "0x0052": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["FL", "1", "ContrastBolusIngredientPercentByVolume"],
        "0x0002": ["FD", "1", "OCTFocalDistance"],
        "0x0003": ["FD", "1", "BeamSpotSize"],
        "0x0004": ["FD", "1", "EffectiveRefractiveIndex"],
        "0x0006": ["CS", "1", "OCTAcquisitionDomain"],
        "0x0007": ["FD", "1", "OCTOpticalCenterWavelength"],
        "0x0008": ["FD", "1", "AxialResolution"],
        "0x0009": ["FD", "1", "RangingDepth"],
        "0x0011": ["FD", "1", "ALineRate"],
        "0x0012": ["US", "1", "ALinesPerFrame"],
        "0x0013": ["FD", "1", "CatheterRotationalRate"],
        "0x0014": ["FD", "1", "ALinePixelSpacing"],
        "0x0016": ["SQ", "1", "ModeOfPercutaneousAccessSequence"],
        "0x0025": ["SQ", "1", "IntravascularOCTFrameTypeSequence"],
        "0x0026": ["CS", "1", "OCTZOffsetApplied"],
        "0x0027": ["SQ", "1", "IntravascularFrameContentSequence"],
        "0x0028": ["FD", "1", "IntravascularLongitudinalDistance"],
        "0x0029": ["SQ", "1", "IntravascularOCTFrameContentSequence"],
        "0x0030": ["SS", "1", "OCTZOffsetCorrection"],
        "0x0031": ["CS", "1", "CatheterDirectionOfRotation"],
        "0x0033": ["FD", "1", "SeamLineLocation"],
        "0x0034": ["FD", "1", "FirstALineLocation"],
        "0x0036": ["US", "1", "SeamLineIndex"],
        "0x0038": ["US", "1", "NumberOfPaddedALines"],
        "0x0039": ["CS", "1", "InterpolationType"],
        "0x003A": ["CS", "1", "RefractiveIndexApplied"]
    },
    "0x0054": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["US", "1-n", "EnergyWindowVector"],
        "0x0011": ["US", "1", "NumberOfEnergyWindows"],
        "0x0012": ["SQ", "1", "EnergyWindowInformationSequence"],
        "0x0013": ["SQ", "1", "EnergyWindowRangeSequence"],
        "0x0014": ["DS", "1", "EnergyWindowLowerLimit"],
        "0x0015": ["DS", "1", "EnergyWindowUpperLimit"],
        "0x0016": ["SQ", "1", "RadiopharmaceuticalInformationSequence"],
        "0x0017": ["IS", "1", "ResidualSyringeCounts"],
        "0x0018": ["SH", "1", "EnergyWindowName"],
        "0x0020": ["US", "1-n", "DetectorVector"],
        "0x0021": ["US", "1", "NumberOfDetectors"],
        "0x0022": ["SQ", "1", "DetectorInformationSequence"],
        "0x0030": ["US", "1-n", "PhaseVector"],
        "0x0031": ["US", "1", "NumberOfPhases"],
        "0x0032": ["SQ", "1", "PhaseInformationSequence"],
        "0x0033": ["US", "1", "NumberOfFramesInPhase"],
        "0x0036": ["IS", "1", "PhaseDelay"],
        "0x0038": ["IS", "1", "PauseBetweenFrames"],
        "0x0039": ["CS", "1", "PhaseDescription"],
        "0x0050": ["US", "1-n", "RotationVector"],
        "0x0051": ["US", "1", "NumberOfRotations"],
        "0x0052": ["SQ", "1", "RotationInformationSequence"],
        "0x0053": ["US", "1", "NumberOfFramesInRotation"],
        "0x0060": ["US", "1-n", "RRIntervalVector"],
        "0x0061": ["US", "1", "NumberOfRRIntervals"],
        "0x0062": ["SQ", "1", "GatedInformationSequence"],
        "0x0063": ["SQ", "1", "DataInformationSequence"],
        "0x0070": ["US", "1-n", "TimeSlotVector"],
        "0x0071": ["US", "1", "NumberOfTimeSlots"],
        "0x0072": ["SQ", "1", "TimeSlotInformationSequence"],
        "0x0073": ["DS", "1", "TimeSlotTime"],
        "0x0080": ["US", "1-n", "SliceVector"],
        "0x0081": ["US", "1", "NumberOfSlices"],
        "0x0090": ["US", "1-n", "AngularViewVector"],
        "0x0100": ["US", "1-n", "TimeSliceVector"],
        "0x0101": ["US", "1", "NumberOfTimeSlices"],
        "0x0200": ["DS", "1", "StartAngle"],
        "0x0202": ["CS", "1", "TypeOfDetectorMotion"],
        "0x0210": ["IS", "1-n", "TriggerVector"],
        "0x0211": ["US", "1", "NumberOfTriggersInPhase"],
        "0x0220": ["SQ", "1", "ViewCodeSequence"],
        "0x0222": ["SQ", "1", "ViewModifierCodeSequence"],
        "0x0300": ["SQ", "1", "RadionuclideCodeSequence"],
        "0x0302": ["SQ", "1", "AdministrationRouteCodeSequence"],
        "0x0304": ["SQ", "1", "RadiopharmaceuticalCodeSequence"],
        "0x0306": ["SQ", "1", "CalibrationDataSequence"],
        "0x0308": ["US", "1", "EnergyWindowNumber"],
        "0x0400": ["SH", "1", "ImageID"],
        "0x0410": ["SQ", "1", "PatientOrientationCodeSequence"],
        "0x0412": ["SQ", "1", "PatientOrientationModifierCodeSequence"],
        "0x0414": ["SQ", "1", "PatientGantryRelationshipCodeSequence"],
        "0x0500": ["CS", "1", "SliceProgressionDirection"],
        "0x0501": ["CS", "1", "ScanProgressionDirection"],
        "0x1000": ["CS", "2", "SeriesType"],
        "0x1001": ["CS", "1", "Units"],
        "0x1002": ["CS", "1", "CountsSource"],
        "0x1004": ["CS", "1", "ReprojectionMethod"],
        "0x1006": ["CS", "1", "SUVType"],
        "0x1100": ["CS", "1", "RandomsCorrectionMethod"],
        "0x1101": ["LO", "1", "AttenuationCorrectionMethod"],
        "0x1102": ["CS", "1", "DecayCorrection"],
        "0x1103": ["LO", "1", "ReconstructionMethod"],
        "0x1104": ["LO", "1", "DetectorLinesOfResponseUsed"],
        "0x1105": ["LO", "1", "ScatterCorrectionMethod"],
        "0x1200": ["DS", "1", "AxialAcceptance"],
        "0x1201": ["IS", "2", "AxialMash"],
        "0x1202": ["IS", "1", "TransverseMash"],
        "0x1203": ["DS", "2", "DetectorElementSize"],
        "0x1210": ["DS", "1", "CoincidenceWindowWidth"],
        "0x1220": ["CS", "1-n", "SecondaryCountsType"],
        "0x1300": ["DS", "1", "FrameReferenceTime"],
        "0x1310": ["IS", "1", "PrimaryPromptsCountsAccumulated"],
        "0x1311": ["IS", "1-n", "SecondaryCountsAccumulated"],
        "0x1320": ["DS", "1", "SliceSensitivityFactor"],
        "0x1321": ["DS", "1", "DecayFactor"],
        "0x1322": ["DS", "1", "DoseCalibrationFactor"],
        "0x1323": ["DS", "1", "ScatterFractionFactor"],
        "0x1324": ["DS", "1", "DeadTimeFactor"],
        "0x1330": ["US", "1", "ImageIndex"],
        "0x1400": ["CS", "1-n", "CountsIncluded"],
        "0x1401": ["CS", "1", "DeadTimeCorrectionFlag"]
    },
    "0x0060": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x3000": ["SQ", "1", "HistogramSequence"],
        "0x3002": ["US", "1", "HistogramNumberOfBins"],
        "0x3004": ["xs", "1", "HistogramFirstBinValue"],
        "0x3006": ["xs", "1", "HistogramLastBinValue"],
        "0x3008": ["US", "1", "HistogramBinWidth"],
        "0x3010": ["LO", "1", "HistogramExplanation"],
        "0x3020": ["UL", "1-n", "HistogramData"]
    },
    "0x0062": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["CS", "1", "SegmentationType"],
        "0x0002": ["SQ", "1", "SegmentSequence"],
        "0x0003": ["SQ", "1", "SegmentedPropertyCategoryCodeSequence"],
        "0x0004": ["US", "1", "SegmentNumber"],
        "0x0005": ["LO", "1", "SegmentLabel"],
        "0x0006": ["ST", "1", "SegmentDescription"],
        "0x0008": ["CS", "1", "SegmentAlgorithmType"],
        "0x0009": ["LO", "1", "SegmentAlgorithmName"],
        "0x000A": ["SQ", "1", "SegmentIdentificationSequence"],
        "0x000B": ["US", "1-n", "ReferencedSegmentNumber"],
        "0x000C": ["US", "1", "RecommendedDisplayGrayscaleValue"],
        "0x000D": ["US", "3", "RecommendedDisplayCIELabValue"],
        "0x000E": ["US", "1", "MaximumFractionalValue"],
        "0x000F": ["SQ", "1", "SegmentedPropertyTypeCodeSequence"],
        "0x0010": ["CS", "1", "SegmentationFractionalType"],
        "0x0011": ["SQ", "1", "SegmentedPropertyTypeModifierCodeSequence"],
        "0x0012": ["SQ", "1", "UsedSegmentsSequence"]
    },
    "0x0064": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SQ", "1", "DeformableRegistrationSequence"],
        "0x0003": ["UI", "1", "SourceFrameOfReferenceUID"],
        "0x0005": ["SQ", "1", "DeformableRegistrationGridSequence"],
        "0x0007": ["UL", "3", "GridDimensions"],
        "0x0008": ["FD", "3", "GridResolution"],
        "0x0009": ["OF", "1", "VectorGridData"],
        "0x000F": ["SQ", "1", "PreDeformationMatrixRegistrationSequence"],
        "0x0010": ["SQ", "1", "PostDeformationMatrixRegistrationSequence"]
    },
    "0x0066": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["UL", "1", "NumberOfSurfaces"],
        "0x0002": ["SQ", "1", "SurfaceSequence"],
        "0x0003": ["UL", "1", "SurfaceNumber"],
        "0x0004": ["LT", "1", "SurfaceComments"],
        "0x0009": ["CS", "1", "SurfaceProcessing"],
        "0x000A": ["FL", "1", "SurfaceProcessingRatio"],
        "0x000B": ["LO", "1", "SurfaceProcessingDescription"],
        "0x000C": ["FL", "1", "RecommendedPresentationOpacity"],
        "0x000D": ["CS", "1", "RecommendedPresentationType"],
        "0x000E": ["CS", "1", "FiniteVolume"],
        "0x0010": ["CS", "1", "Manifold"],
        "0x0011": ["SQ", "1", "SurfacePointsSequence"],
        "0x0012": ["SQ", "1", "SurfacePointsNormalsSequence"],
        "0x0013": ["SQ", "1", "SurfaceMeshPrimitivesSequence"],
        "0x0015": ["UL", "1", "NumberOfSurfacePoints"],
        "0x0016": ["OF", "1", "PointCoordinatesData"],
        "0x0017": ["FL", "3", "PointPositionAccuracy"],
        "0x0018": ["FL", "1", "MeanPointDistance"],
        "0x0019": ["FL", "1", "MaximumPointDistance"],
        "0x001A": ["FL", "6", "PointsBoundingBoxCoordinates"],
        "0x001B": ["FL", "3", "AxisOfRotation"],
        "0x001C": ["FL", "3", "CenterOfRotation"],
        "0x001E": ["UL", "1", "NumberOfVectors"],
        "0x001F": ["US", "1", "VectorDimensionality"],
        "0x0020": ["FL", "1-n", "VectorAccuracy"],
        "0x0021": ["OF", "1", "VectorCoordinateData"],
        "0x0023": ["OW", "1", "TrianglePointIndexList"],
        "0x0024": ["OW", "1", "EdgePointIndexList"],
        "0x0025": ["OW", "1", "VertexPointIndexList"],
        "0x0026": ["SQ", "1", "TriangleStripSequence"],
        "0x0027": ["SQ", "1", "TriangleFanSequence"],
        "0x0028": ["SQ", "1", "LineSequence"],
        "0x0029": ["OW", "1", "PrimitivePointIndexList"],
        "0x002A": ["UL", "1", "SurfaceCount"],
        "0x002B": ["SQ", "1", "ReferencedSurfaceSequence"],
        "0x002C": ["UL", "1", "ReferencedSurfaceNumber"],
        "0x002D": ["SQ", "1", "SegmentSurfaceGenerationAlgorithmIdentificationSequence"],
        "0x002E": ["SQ", "1", "SegmentSurfaceSourceInstanceSequence"],
        "0x002F": ["SQ", "1", "AlgorithmFamilyCodeSequence"],
        "0x0030": ["SQ", "1", "AlgorithmNameCodeSequence"],
        "0x0031": ["LO", "1", "AlgorithmVersion"],
        "0x0032": ["LT", "1", "AlgorithmParameters"],
        "0x0034": ["SQ", "1", "FacetSequence"],
        "0x0035": ["SQ", "1", "SurfaceProcessingAlgorithmIdentificationSequence"],
        "0x0036": ["LO", "1", "AlgorithmName"],
        "0x0037": ["FL", "1", "RecommendedPointRadius"],
        "0x0038": ["FL", "1", "RecommendedLineThickness"],
        "0x0040": ["UL", "1-n", "LongPrimitivePointIndexList"],
        "0x0041": ["UL", "3-3n", "LongTrianglePointIndexList"],
        "0x0042": ["UL", "2-2n", "LongEdgePointIndexList"],
        "0x0043": ["UL", "1-n", "LongVertexPointIndexList"]
    },
    "0x0068": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x6210": ["LO", "1", "ImplantSize"],
        "0x6221": ["LO", "1", "ImplantTemplateVersion"],
        "0x6222": ["SQ", "1", "ReplacedImplantTemplateSequence"],
        "0x6223": ["CS", "1", "ImplantType"],
        "0x6224": ["SQ", "1", "DerivationImplantTemplateSequence"],
        "0x6225": ["SQ", "1", "OriginalImplantTemplateSequence"],
        "0x6226": ["DT", "1", "EffectiveDateTime"],
        "0x6230": ["SQ", "1", "ImplantTargetAnatomySequence"],
        "0x6260": ["SQ", "1", "InformationFromManufacturerSequence"],
        "0x6265": ["SQ", "1", "NotificationFromManufacturerSequence"],
        "0x6270": ["DT", "1", "InformationIssueDateTime"],
        "0x6280": ["ST", "1", "InformationSummary"],
        "0x62A0": ["SQ", "1", "ImplantRegulatoryDisapprovalCodeSequence"],
        "0x62A5": ["FD", "1", "OverallTemplateSpatialTolerance"],
        "0x62C0": ["SQ", "1", "HPGLDocumentSequence"],
        "0x62D0": ["US", "1", "HPGLDocumentID"],
        "0x62D5": ["LO", "1", "HPGLDocumentLabel"],
        "0x62E0": ["SQ", "1", "ViewOrientationCodeSequence"],
        "0x62F0": ["FD", "9", "ViewOrientationModifier"],
        "0x62F2": ["FD", "1", "HPGLDocumentScaling"],
        "0x6300": ["OB", "1", "HPGLDocument"],
        "0x6310": ["US", "1", "HPGLContourPenNumber"],
        "0x6320": ["SQ", "1", "HPGLPenSequence"],
        "0x6330": ["US", "1", "HPGLPenNumber"],
        "0x6340": ["LO", "1", "HPGLPenLabel"],
        "0x6345": ["ST", "1", "HPGLPenDescription"],
        "0x6346": ["FD", "2", "RecommendedRotationPoint"],
        "0x6347": ["FD", "4", "BoundingRectangle"],
        "0x6350": ["US", "1-n", "ImplantTemplate3DModelSurfaceNumber"],
        "0x6360": ["SQ", "1", "SurfaceModelDescriptionSequence"],
        "0x6380": ["LO", "1", "SurfaceModelLabel"],
        "0x6390": ["FD", "1", "SurfaceModelScalingFactor"],
        "0x63A0": ["SQ", "1", "MaterialsCodeSequence"],
        "0x63A4": ["SQ", "1", "CoatingMaterialsCodeSequence"],
        "0x63A8": ["SQ", "1", "ImplantTypeCodeSequence"],
        "0x63AC": ["SQ", "1", "FixationMethodCodeSequence"],
        "0x63B0": ["SQ", "1", "MatingFeatureSetsSequence"],
        "0x63C0": ["US", "1", "MatingFeatureSetID"],
        "0x63D0": ["LO", "1", "MatingFeatureSetLabel"],
        "0x63E0": ["SQ", "1", "MatingFeatureSequence"],
        "0x63F0": ["US", "1", "MatingFeatureID"],
        "0x6400": ["SQ", "1", "MatingFeatureDegreeOfFreedomSequence"],
        "0x6410": ["US", "1", "DegreeOfFreedomID"],
        "0x6420": ["CS", "1", "DegreeOfFreedomType"],
        "0x6430": ["SQ", "1", "TwoDMatingFeatureCoordinatesSequence"],
        "0x6440": ["US", "1", "ReferencedHPGLDocumentID"],
        "0x6450": ["FD", "2", "TwoDMatingPoint"],
        "0x6460": ["FD", "4", "TwoDMatingAxes"],
        "0x6470": ["SQ", "1", "TwoDDegreeOfFreedomSequence"],
        "0x6490": ["FD", "3", "ThreeDDegreeOfFreedomAxis"],
        "0x64A0": ["FD", "2", "RangeOfFreedom"],
        "0x64C0": ["FD", "3", "ThreeDMatingPoint"],
        "0x64D0": ["FD", "9", "ThreeDMatingAxes"],
        "0x64F0": ["FD", "3", "TwoDDegreeOfFreedomAxis"],
        "0x6500": ["SQ", "1", "PlanningLandmarkPointSequence"],
        "0x6510": ["SQ", "1", "PlanningLandmarkLineSequence"],
        "0x6520": ["SQ", "1", "PlanningLandmarkPlaneSequence"],
        "0x6530": ["US", "1", "PlanningLandmarkID"],
        "0x6540": ["LO", "1", "PlanningLandmarkDescription"],
        "0x6545": ["SQ", "1", "PlanningLandmarkIdentificationCodeSequence"],
        "0x6550": ["SQ", "1", "TwoDPointCoordinatesSequence"],
        "0x6560": ["FD", "2", "TwoDPointCoordinates"],
        "0x6590": ["FD", "3", "ThreeDPointCoordinates"],
        "0x65A0": ["SQ", "1", "TwoDLineCoordinatesSequence"],
        "0x65B0": ["FD", "4", "TwoDLineCoordinates"],
        "0x65D0": ["FD", "6", "ThreeDLineCoordinates"],
        "0x65E0": ["SQ", "1", "TwoDPlaneCoordinatesSequence"],
        "0x65F0": ["FD", "4", "TwoDPlaneIntersection"],
        "0x6610": ["FD", "3", "ThreeDPlaneOrigin"],
        "0x6620": ["FD", "3", "ThreeDPlaneNormal"]
    },
    "0x0070": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["SQ", "1", "GraphicAnnotationSequence"],
        "0x0002": ["CS", "1", "GraphicLayer"],
        "0x0003": ["CS", "1", "BoundingBoxAnnotationUnits"],
        "0x0004": ["CS", "1", "AnchorPointAnnotationUnits"],
        "0x0005": ["CS", "1", "GraphicAnnotationUnits"],
        "0x0006": ["ST", "1", "UnformattedTextValue"],
        "0x0008": ["SQ", "1", "TextObjectSequence"],
        "0x0009": ["SQ", "1", "GraphicObjectSequence"],
        "0x0010": ["FL", "2", "BoundingBoxTopLeftHandCorner"],
        "0x0011": ["FL", "2", "BoundingBoxBottomRightHandCorner"],
        "0x0012": ["CS", "1", "BoundingBoxTextHorizontalJustification"],
        "0x0014": ["FL", "2", "AnchorPoint"],
        "0x0015": ["CS", "1", "AnchorPointVisibility"],
        "0x0020": ["US", "1", "GraphicDimensions"],
        "0x0021": ["US", "1", "NumberOfGraphicPoints"],
        "0x0022": ["FL", "2-n", "GraphicData"],
        "0x0023": ["CS", "1", "GraphicType"],
        "0x0024": ["CS", "1", "GraphicFilled"],
        "0x0040": ["IS", "1", "ImageRotationRetired"],
        "0x0041": ["CS", "1", "ImageHorizontalFlip"],
        "0x0042": ["US", "1", "ImageRotation"],
        "0x0050": ["US", "2", "DisplayedAreaTopLeftHandCornerTrial"],
        "0x0051": ["US", "2", "DisplayedAreaBottomRightHandCornerTrial"],
        "0x0052": ["SL", "2", "DisplayedAreaTopLeftHandCorner"],
        "0x0053": ["SL", "2", "DisplayedAreaBottomRightHandCorner"],
        "0x005A": ["SQ", "1", "DisplayedAreaSelectionSequence"],
        "0x0060": ["SQ", "1", "GraphicLayerSequence"],
        "0x0062": ["IS", "1", "GraphicLayerOrder"],
        "0x0066": ["US", "1", "GraphicLayerRecommendedDisplayGrayscaleValue"],
        "0x0067": ["US", "3", "GraphicLayerRecommendedDisplayRGBValue"],
        "0x0068": ["LO", "1", "GraphicLayerDescription"],
        "0x0080": ["CS", "1", "ContentLabel"],
        "0x0081": ["LO", "1", "ContentDescription"],
        "0x0082": ["DA", "1", "PresentationCreationDate"],
        "0x0083": ["TM", "1", "PresentationCreationTime"],
        "0x0084": ["PN", "1", "ContentCreatorName"],
        "0x0086": ["SQ", "1", "ContentCreatorIdentificationCodeSequence"],
        "0x0087": ["SQ", "1", "AlternateContentDescriptionSequence"],
        "0x0100": ["CS", "1", "PresentationSizeMode"],
        "0x0101": ["DS", "2", "PresentationPixelSpacing"],
        "0x0102": ["IS", "2", "PresentationPixelAspectRatio"],
        "0x0103": ["FL", "1", "PresentationPixelMagnificationRatio"],
        "0x0207": ["LO", "1", "GraphicGroupLabel"],
        "0x0208": ["ST", "1", "GraphicGroupDescription"],
        "0x0209": ["SQ", "1", "CompoundGraphicSequence"],
        "0x0226": ["UL", "1", "CompoundGraphicInstanceID"],
        "0x0227": ["LO", "1", "FontName"],
        "0x0228": ["CS", "1", "FontNameType"],
        "0x0229": ["LO", "1", "CSSFontName"],
        "0x0230": ["FD", "1", "RotationAngle"],
        "0x0231": ["SQ", "1", "TextStyleSequence"],
        "0x0232": ["SQ", "1", "LineStyleSequence"],
        "0x0233": ["SQ", "1", "FillStyleSequence"],
        "0x0234": ["SQ", "1", "GraphicGroupSequence"],
        "0x0241": ["US", "3", "TextColorCIELabValue"],
        "0x0242": ["CS", "1", "HorizontalAlignment"],
        "0x0243": ["CS", "1", "VerticalAlignment"],
        "0x0244": ["CS", "1", "ShadowStyle"],
        "0x0245": ["FL", "1", "ShadowOffsetX"],
        "0x0246": ["FL", "1", "ShadowOffsetY"],
        "0x0247": ["US", "3", "ShadowColorCIELabValue"],
        "0x0248": ["CS", "1", "Underlined"],
        "0x0249": ["CS", "1", "Bold"],
        "0x0250": ["CS", "1", "Italic"],
        "0x0251": ["US", "3", "PatternOnColorCIELabValue"],
        "0x0252": ["US", "3", "PatternOffColorCIELabValue"],
        "0x0253": ["FL", "1", "LineThickness"],
        "0x0254": ["CS", "1", "LineDashingStyle"],
        "0x0255": ["UL", "1", "LinePattern"],
        "0x0256": ["OB", "1", "FillPattern"],
        "0x0257": ["CS", "1", "FillMode"],
        "0x0258": ["FL", "1", "ShadowOpacity"],
        "0x0261": ["FL", "1", "GapLength"],
        "0x0262": ["FL", "1", "DiameterOfVisibility"],
        "0x0273": ["FL", "2", "RotationPoint"],
        "0x0274": ["CS", "1", "TickAlignment"],
        "0x0278": ["CS", "1", "ShowTickLabel"],
        "0x0279": ["CS", "1", "TickLabelAlignment"],
        "0x0282": ["CS", "1", "CompoundGraphicUnits"],
        "0x0284": ["FL", "1", "PatternOnOpacity"],
        "0x0285": ["FL", "1", "PatternOffOpacity"],
        "0x0287": ["SQ", "1", "MajorTicksSequence"],
        "0x0288": ["FL", "1", "TickPosition"],
        "0x0289": ["SH", "1", "TickLabel"],
        "0x0294": ["CS", "1", "CompoundGraphicType"],
        "0x0295": ["UL", "1", "GraphicGroupID"],
        "0x0306": ["CS", "1", "ShapeType"],
        "0x0308": ["SQ", "1", "RegistrationSequence"],
        "0x0309": ["SQ", "1", "MatrixRegistrationSequence"],
        "0x030A": ["SQ", "1", "MatrixSequence"],
        "0x030C": ["CS", "1", "FrameOfReferenceTransformationMatrixType"],
        "0x030D": ["SQ", "1", "RegistrationTypeCodeSequence"],
        "0x030F": ["ST", "1", "FiducialDescription"],
        "0x0310": ["SH", "1", "FiducialIdentifier"],
        "0x0311": ["SQ", "1", "FiducialIdentifierCodeSequence"],
        "0x0312": ["FD", "1", "ContourUncertaintyRadius"],
        "0x0314": ["SQ", "1", "UsedFiducialsSequence"],
        "0x0318": ["SQ", "1", "GraphicCoordinatesDataSequence"],
        "0x031A": ["UI", "1", "FiducialUID"],
        "0x031C": ["SQ", "1", "FiducialSetSequence"],
        "0x031E": ["SQ", "1", "FiducialSequence"],
        "0x0401": ["US", "3", "GraphicLayerRecommendedDisplayCIELabValue"],
        "0x0402": ["SQ", "1", "BlendingSequence"],
        "0x0403": ["FL", "1", "RelativeOpacity"],
        "0x0404": ["SQ", "1", "ReferencedSpatialRegistrationSequence"],
        "0x0405": ["CS", "1", "BlendingPosition"]
    },
    "0x0072": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SH", "1", "HangingProtocolName"],
        "0x0004": ["LO", "1", "HangingProtocolDescription"],
        "0x0006": ["CS", "1", "HangingProtocolLevel"],
        "0x0008": ["LO", "1", "HangingProtocolCreator"],
        "0x000A": ["DT", "1", "HangingProtocolCreationDateTime"],
        "0x000C": ["SQ", "1", "HangingProtocolDefinitionSequence"],
        "0x000E": ["SQ", "1", "HangingProtocolUserIdentificationCodeSequence"],
        "0x0010": ["LO", "1", "HangingProtocolUserGroupName"],
        "0x0012": ["SQ", "1", "SourceHangingProtocolSequence"],
        "0x0014": ["US", "1", "NumberOfPriorsReferenced"],
        "0x0020": ["SQ", "1", "ImageSetsSequence"],
        "0x0022": ["SQ", "1", "ImageSetSelectorSequence"],
        "0x0024": ["CS", "1", "ImageSetSelectorUsageFlag"],
        "0x0026": ["AT", "1", "SelectorAttribute"],
        "0x0028": ["US", "1", "SelectorValueNumber"],
        "0x0030": ["SQ", "1", "TimeBasedImageSetsSequence"],
        "0x0032": ["US", "1", "ImageSetNumber"],
        "0x0034": ["CS", "1", "ImageSetSelectorCategory"],
        "0x0038": ["US", "2", "RelativeTime"],
        "0x003A": ["CS", "1", "RelativeTimeUnits"],
        "0x003C": ["SS", "2", "AbstractPriorValue"],
        "0x003E": ["SQ", "1", "AbstractPriorCodeSequence"],
        "0x0040": ["LO", "1", "ImageSetLabel"],
        "0x0050": ["CS", "1", "SelectorAttributeVR"],
        "0x0052": ["AT", "1-n", "SelectorSequencePointer"],
        "0x0054": ["LO", "1-n", "SelectorSequencePointerPrivateCreator"],
        "0x0056": ["LO", "1", "SelectorAttributePrivateCreator"],
        "0x0060": ["AT", "1-n", "SelectorATValue"],
        "0x0062": ["CS", "1-n", "SelectorCSValue"],
        "0x0064": ["IS", "1-n", "SelectorISValue"],
        "0x0066": ["LO", "1-n", "SelectorLOValue"],
        "0x0068": ["LT", "1", "SelectorLTValue"],
        "0x006A": ["PN", "1-n", "SelectorPNValue"],
        "0x006C": ["SH", "1-n", "SelectorSHValue"],
        "0x006E": ["ST", "1", "SelectorSTValue"],
        "0x0070": ["UT", "1", "SelectorUTValue"],
        "0x0072": ["DS", "1-n", "SelectorDSValue"],
        "0x0074": ["FD", "1-n", "SelectorFDValue"],
        "0x0076": ["FL", "1-n", "SelectorFLValue"],
        "0x0078": ["UL", "1-n", "SelectorULValue"],
        "0x007A": ["US", "1-n", "SelectorUSValue"],
        "0x007C": ["SL", "1-n", "SelectorSLValue"],
        "0x007E": ["SS", "1-n", "SelectorSSValue"],
        "0x007F": ["UI", "1-n", "SelectorUIValue"],
        "0x0080": ["SQ", "1", "SelectorCodeSequenceValue"],
        "0x0100": ["US", "1", "NumberOfScreens"],
        "0x0102": ["SQ", "1", "NominalScreenDefinitionSequence"],
        "0x0104": ["US", "1", "NumberOfVerticalPixels"],
        "0x0106": ["US", "1", "NumberOfHorizontalPixels"],
        "0x0108": ["FD", "4", "DisplayEnvironmentSpatialPosition"],
        "0x010A": ["US", "1", "ScreenMinimumGrayscaleBitDepth"],
        "0x010C": ["US", "1", "ScreenMinimumColorBitDepth"],
        "0x010E": ["US", "1", "ApplicationMaximumRepaintTime"],
        "0x0200": ["SQ", "1", "DisplaySetsSequence"],
        "0x0202": ["US", "1", "DisplaySetNumber"],
        "0x0203": ["LO", "1", "DisplaySetLabel"],
        "0x0204": ["US", "1", "DisplaySetPresentationGroup"],
        "0x0206": ["LO", "1", "DisplaySetPresentationGroupDescription"],
        "0x0208": ["CS", "1", "PartialDataDisplayHandling"],
        "0x0210": ["SQ", "1", "SynchronizedScrollingSequence"],
        "0x0212": ["US", "2-n", "DisplaySetScrollingGroup"],
        "0x0214": ["SQ", "1", "NavigationIndicatorSequence"],
        "0x0216": ["US", "1", "NavigationDisplaySet"],
        "0x0218": ["US", "1-n", "ReferenceDisplaySets"],
        "0x0300": ["SQ", "1", "ImageBoxesSequence"],
        "0x0302": ["US", "1", "ImageBoxNumber"],
        "0x0304": ["CS", "1", "ImageBoxLayoutType"],
        "0x0306": ["US", "1", "ImageBoxTileHorizontalDimension"],
        "0x0308": ["US", "1", "ImageBoxTileVerticalDimension"],
        "0x0310": ["CS", "1", "ImageBoxScrollDirection"],
        "0x0312": ["CS", "1", "ImageBoxSmallScrollType"],
        "0x0314": ["US", "1", "ImageBoxSmallScrollAmount"],
        "0x0316": ["CS", "1", "ImageBoxLargeScrollType"],
        "0x0318": ["US", "1", "ImageBoxLargeScrollAmount"],
        "0x0320": ["US", "1", "ImageBoxOverlapPriority"],
        "0x0330": ["FD", "1", "CineRelativeToRealTime"],
        "0x0400": ["SQ", "1", "FilterOperationsSequence"],
        "0x0402": ["CS", "1", "FilterByCategory"],
        "0x0404": ["CS", "1", "FilterByAttributePresence"],
        "0x0406": ["CS", "1", "FilterByOperator"],
        "0x0420": ["US", "3", "StructuredDisplayBackgroundCIELabValue"],
        "0x0421": ["US", "3", "EmptyImageBoxCIELabValue"],
        "0x0422": ["SQ", "1", "StructuredDisplayImageBoxSequence"],
        "0x0424": ["SQ", "1", "StructuredDisplayTextBoxSequence"],
        "0x0427": ["SQ", "1", "ReferencedFirstFrameSequence"],
        "0x0430": ["SQ", "1", "ImageBoxSynchronizationSequence"],
        "0x0432": ["US", "2-n", "SynchronizedImageBoxList"],
        "0x0434": ["CS", "1", "TypeOfSynchronization"],
        "0x0500": ["CS", "1", "BlendingOperationType"],
        "0x0510": ["CS", "1", "ReformattingOperationType"],
        "0x0512": ["FD", "1", "ReformattingThickness"],
        "0x0514": ["FD", "1", "ReformattingInterval"],
        "0x0516": ["CS", "1", "ReformattingOperationInitialViewDirection"],
        "0x0520": ["CS", "1-n", "ThreeDRenderingType"],
        "0x0600": ["SQ", "1", "SortingOperationsSequence"],
        "0x0602": ["CS", "1", "SortByCategory"],
        "0x0604": ["CS", "1", "SortingDirection"],
        "0x0700": ["CS", "2", "DisplaySetPatientOrientation"],
        "0x0702": ["CS", "1", "VOIType"],
        "0x0704": ["CS", "1", "PseudoColorType"],
        "0x0705": ["SQ", "1", "PseudoColorPaletteInstanceReferenceSequence"],
        "0x0706": ["CS", "1", "ShowGrayscaleInverted"],
        "0x0710": ["CS", "1", "ShowImageTrueSizeFlag"],
        "0x0712": ["CS", "1", "ShowGraphicAnnotationFlag"],
        "0x0714": ["CS", "1", "ShowPatientDemographicsFlag"],
        "0x0716": ["CS", "1", "ShowAcquisitionTechniquesFlag"],
        "0x0717": ["CS", "1", "DisplaySetHorizontalJustification"],
        "0x0718": ["CS", "1", "DisplaySetVerticalJustification"]
    },
    "0x0074": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0120": ["FD", "1", "ContinuationStartMeterset"],
        "0x0121": ["FD", "1", "ContinuationEndMeterset"],
        "0x1000": ["CS", "1", "ProcedureStepState"],
        "0x1002": ["SQ", "1", "ProcedureStepProgressInformationSequence"],
        "0x1004": ["DS", "1", "ProcedureStepProgress"],
        "0x1006": ["ST", "1", "ProcedureStepProgressDescription"],
        "0x1008": ["SQ", "1", "ProcedureStepCommunicationsURISequence"],
        "0x100A": ["UR", "1", "ContactURI"],
        "0x100C": ["LO", "1", "ContactDisplayName"],
        "0x100E": ["SQ", "1", "ProcedureStepDiscontinuationReasonCodeSequence"],
        "0x1020": ["SQ", "1", "BeamTaskSequence"],
        "0x1022": ["CS", "1", "BeamTaskType"],
        "0x1024": ["IS", "1", "BeamOrderIndexTrial"],
        "0x1025": ["CS", "1", "AutosequenceFlag"],
        "0x1026": ["FD", "1", "TableTopVerticalAdjustedPosition"],
        "0x1027": ["FD", "1", "TableTopLongitudinalAdjustedPosition"],
        "0x1028": ["FD", "1", "TableTopLateralAdjustedPosition"],
        "0x102A": ["FD", "1", "PatientSupportAdjustedAngle"],
        "0x102B": ["FD", "1", "TableTopEccentricAdjustedAngle"],
        "0x102C": ["FD", "1", "TableTopPitchAdjustedAngle"],
        "0x102D": ["FD", "1", "TableTopRollAdjustedAngle"],
        "0x1030": ["SQ", "1", "DeliveryVerificationImageSequence"],
        "0x1032": ["CS", "1", "VerificationImageTiming"],
        "0x1034": ["CS", "1", "DoubleExposureFlag"],
        "0x1036": ["CS", "1", "DoubleExposureOrdering"],
        "0x1038": ["DS", "1", "DoubleExposureMetersetTrial"],
        "0x103A": ["DS", "4", "DoubleExposureFieldDeltaTrial"],
        "0x1040": ["SQ", "1", "RelatedReferenceRTImageSequence"],
        "0x1042": ["SQ", "1", "GeneralMachineVerificationSequence"],
        "0x1044": ["SQ", "1", "ConventionalMachineVerificationSequence"],
        "0x1046": ["SQ", "1", "IonMachineVerificationSequence"],
        "0x1048": ["SQ", "1", "FailedAttributesSequence"],
        "0x104A": ["SQ", "1", "OverriddenAttributesSequence"],
        "0x104C": ["SQ", "1", "ConventionalControlPointVerificationSequence"],
        "0x104E": ["SQ", "1", "IonControlPointVerificationSequence"],
        "0x1050": ["SQ", "1", "AttributeOccurrenceSequence"],
        "0x1052": ["AT", "1", "AttributeOccurrencePointer"],
        "0x1054": ["UL", "1", "AttributeItemSelector"],
        "0x1056": ["LO", "1", "AttributeOccurrencePrivateCreator"],
        "0x1057": ["IS", "1-n", "SelectorSequencePointerItems"],
        "0x1200": ["CS", "1", "ScheduledProcedureStepPriority"],
        "0x1202": ["LO", "1", "WorklistLabel"],
        "0x1204": ["LO", "1", "ProcedureStepLabel"],
        "0x1210": ["SQ", "1", "ScheduledProcessingParametersSequence"],
        "0x1212": ["SQ", "1", "PerformedProcessingParametersSequence"],
        "0x1216": ["SQ", "1", "UnifiedProcedureStepPerformedProcedureSequence"],
        "0x1220": ["SQ", "1", "RelatedProcedureStepSequence"],
        "0x1222": ["LO", "1", "ProcedureStepRelationshipType"],
        "0x1224": ["SQ", "1", "ReplacedProcedureStepSequence"],
        "0x1230": ["LO", "1", "DeletionLock"],
        "0x1234": ["AE", "1", "ReceivingAE"],
        "0x1236": ["AE", "1", "RequestingAE"],
        "0x1238": ["LT", "1", "ReasonForCancellation"],
        "0x1242": ["CS", "1", "SCPStatus"],
        "0x1244": ["CS", "1", "SubscriptionListStatus"],
        "0x1246": ["CS", "1", "UnifiedProcedureStepListStatus"],
        "0x1324": ["UL", "1", "BeamOrderIndex"],
        "0x1338": ["FD", "1", "DoubleExposureMeterset"],
        "0x133A": ["FD", "4", "DoubleExposureFieldDelta"]
    },
    "0x0076": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["LO", "1", "ImplantAssemblyTemplateName"],
        "0x0003": ["LO", "1", "ImplantAssemblyTemplateIssuer"],
        "0x0006": ["LO", "1", "ImplantAssemblyTemplateVersion"],
        "0x0008": ["SQ", "1", "ReplacedImplantAssemblyTemplateSequence"],
        "0x000A": ["CS", "1", "ImplantAssemblyTemplateType"],
        "0x000C": ["SQ", "1", "OriginalImplantAssemblyTemplateSequence"],
        "0x000E": ["SQ", "1", "DerivationImplantAssemblyTemplateSequence"],
        "0x0010": ["SQ", "1", "ImplantAssemblyTemplateTargetAnatomySequence"],
        "0x0020": ["SQ", "1", "ProcedureTypeCodeSequence"],
        "0x0030": ["LO", "1", "SurgicalTechnique"],
        "0x0032": ["SQ", "1", "ComponentTypesSequence"],
        "0x0034": ["CS", "1", "ComponentTypeCodeSequence"],
        "0x0036": ["CS", "1", "ExclusiveComponentType"],
        "0x0038": ["CS", "1", "MandatoryComponentType"],
        "0x0040": ["SQ", "1", "ComponentSequence"],
        "0x0055": ["US", "1", "ComponentID"],
        "0x0060": ["SQ", "1", "ComponentAssemblySequence"],
        "0x0070": ["US", "1", "Component1ReferencedID"],
        "0x0080": ["US", "1", "Component1ReferencedMatingFeatureSetID"],
        "0x0090": ["US", "1", "Component1ReferencedMatingFeatureID"],
        "0x00A0": ["US", "1", "Component2ReferencedID"],
        "0x00B0": ["US", "1", "Component2ReferencedMatingFeatureSetID"],
        "0x00C0": ["US", "1", "Component2ReferencedMatingFeatureID"]
    },
    "0x0078": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["LO", "1", "ImplantTemplateGroupName"],
        "0x0010": ["ST", "1", "ImplantTemplateGroupDescription"],
        "0x0020": ["LO", "1", "ImplantTemplateGroupIssuer"],
        "0x0024": ["LO", "1", "ImplantTemplateGroupVersion"],
        "0x0026": ["SQ", "1", "ReplacedImplantTemplateGroupSequence"],
        "0x0028": ["SQ", "1", "ImplantTemplateGroupTargetAnatomySequence"],
        "0x002A": ["SQ", "1", "ImplantTemplateGroupMembersSequence"],
        "0x002E": ["US", "1", "ImplantTemplateGroupMemberID"],
        "0x0050": ["FD", "3", "ThreeDImplantTemplateGroupMemberMatchingPoint"],
        "0x0060": ["FD", "9", "ThreeDImplantTemplateGroupMemberMatchingAxes"],
        "0x0070": ["SQ", "1", "ImplantTemplateGroupMemberMatching2DCoordinatesSequence"],
        "0x0090": ["FD", "2", "TwoDImplantTemplateGroupMemberMatchingPoint"],
        "0x00A0": ["FD", "4", "TwoDImplantTemplateGroupMemberMatchingAxes"],
        "0x00B0": ["SQ", "1", "ImplantTemplateGroupVariationDimensionSequence"],
        "0x00B2": ["LO", "1", "ImplantTemplateGroupVariationDimensionName"],
        "0x00B4": ["SQ", "1", "ImplantTemplateGroupVariationDimensionRankSequence"],
        "0x00B6": ["US", "1", "ReferencedImplantTemplateGroupMemberID"],
        "0x00B8": ["US", "1", "ImplantTemplateGroupVariationDimensionRank"]
    },
    "0x0080": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["SQ", "1", "SurfaceScanAcquisitionTypeCodeSequence"],
        "0x0002": ["SQ", "1", "SurfaceScanModeCodeSequence"],
        "0x0003": ["SQ", "1", "RegistrationMethodCodeSequence"],
        "0x0004": ["FD", "1", "ShotDurationTime"],
        "0x0005": ["FD", "1", "ShotOffsetTime"],
        "0x0006": ["US", "1-n", "SurfacePointPresentationValueData"],
        "0x0007": ["US", "3-3n", "SurfacePointColorCIELabValueData"],
        "0x0008": ["SQ", "1", "UVMappingSequence"],
        "0x0009": ["SH", "1", "TextureLabel"],
        "0x0010": ["OF", "1-n", "UValueData"],
        "0x0011": ["OF", "1-n", "VValueData"],
        "0x0012": ["SQ", "1", "ReferencedTextureSequence"],
        "0x0013": ["SQ", "1", "ReferencedSurfaceDataSequence"]
    },
    "0x0088": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0130": ["SH", "1", "StorageMediaFileSetID"],
        "0x0140": ["UI", "1", "StorageMediaFileSetUID"],
        "0x0200": ["SQ", "1", "IconImageSequence"],
        "0x0904": ["LO", "1", "TopicTitle"],
        "0x0906": ["ST", "1", "TopicSubject"],
        "0x0910": ["LO", "1", "TopicAuthor"],
        "0x0912": ["LO", "1-32", "TopicKeywords"]
    },
    "0x0100": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0410": ["CS", "1", "SOPInstanceStatus"],
        "0x0420": ["DT", "1", "SOPAuthorizationDateTime"],
        "0x0424": ["LT", "1", "SOPAuthorizationComment"],
        "0x0426": ["LO", "1", "AuthorizationEquipmentCertificationNumber"]
    },
    "0x0400": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0005": ["US", "1", "MACIDNumber"],
        "0x0010": ["UI", "1", "MACCalculationTransferSyntaxUID"],
        "0x0015": ["CS", "1", "MACAlgorithm"],
        "0x0020": ["AT", "1-n", "DataElementsSigned"],
        "0x0100": ["UI", "1", "DigitalSignatureUID"],
        "0x0105": ["DT", "1", "DigitalSignatureDateTime"],
        "0x0110": ["CS", "1", "CertificateType"],
        "0x0115": ["OB", "1", "CertificateOfSigner"],
        "0x0120": ["OB", "1", "Signature"],
        "0x0305": ["CS", "1", "CertifiedTimestampType"],
        "0x0310": ["OB", "1", "CertifiedTimestamp"],
        "0x0401": ["SQ", "1", "DigitalSignaturePurposeCodeSequence"],
        "0x0402": ["SQ", "1", "ReferencedDigitalSignatureSequence"],
        "0x0403": ["SQ", "1", "ReferencedSOPInstanceMACSequence"],
        "0x0404": ["OB", "1", "MAC"],
        "0x0500": ["SQ", "1", "EncryptedAttributesSequence"],
        "0x0510": ["UI", "1", "EncryptedContentTransferSyntaxUID"],
        "0x0520": ["OB", "1", "EncryptedContent"],
        "0x0550": ["SQ", "1", "ModifiedAttributesSequence"],
        "0x0561": ["SQ", "1", "OriginalAttributesSequence"],
        "0x0562": ["DT", "1", "AttributeModificationDateTime"],
        "0x0563": ["LO", "1", "ModifyingSystem"],
        "0x0564": ["LO", "1", "SourceOfPreviousValues"],
        "0x0565": ["CS", "1", "ReasonForTheAttributeModification"]
    },
    "0x1000": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["US", "3", "EscapeTriplet"],
        "0x0011": ["US", "3", "RunLengthTriplet"],
        "0x0012": ["US", "1", "HuffmanTableSize"],
        "0x0013": ["US", "3", "HuffmanTableTriplet"],
        "0x0014": ["US", "1", "ShiftTableSize"],
        "0x0015": ["US", "3", "ShiftTableTriplet"]
    },
    "0x1010": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0004": ["US", "1-n", "ZonalMap"]
    },
    "0x2000": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["IS", "1", "NumberOfCopies"],
        "0x001E": ["SQ", "1", "PrinterConfigurationSequence"],
        "0x0020": ["CS", "1", "PrintPriority"],
        "0x0030": ["CS", "1", "MediumType"],
        "0x0040": ["CS", "1", "FilmDestination"],
        "0x0050": ["LO", "1", "FilmSessionLabel"],
        "0x0060": ["IS", "1", "MemoryAllocation"],
        "0x0061": ["IS", "1", "MaximumMemoryAllocation"],
        "0x0062": ["CS", "1", "ColorImagePrintingFlag"],
        "0x0063": ["CS", "1", "CollationFlag"],
        "0x0065": ["CS", "1", "AnnotationFlag"],
        "0x0067": ["CS", "1", "ImageOverlayFlag"],
        "0x0069": ["CS", "1", "PresentationLUTFlag"],
        "0x006A": ["CS", "1", "ImageBoxPresentationLUTFlag"],
        "0x00A0": ["US", "1", "MemoryBitDepth"],
        "0x00A1": ["US", "1", "PrintingBitDepth"],
        "0x00A2": ["SQ", "1", "MediaInstalledSequence"],
        "0x00A4": ["SQ", "1", "OtherMediaAvailableSequence"],
        "0x00A8": ["SQ", "1", "SupportedImageDisplayFormatsSequence"],
        "0x0500": ["SQ", "1", "ReferencedFilmBoxSequence"],
        "0x0510": ["SQ", "1", "ReferencedStoredPrintSequence"]
    },
    "0x2010": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["ST", "1", "ImageDisplayFormat"],
        "0x0030": ["CS", "1", "AnnotationDisplayFormatID"],
        "0x0040": ["CS", "1", "FilmOrientation"],
        "0x0050": ["CS", "1", "FilmSizeID"],
        "0x0052": ["CS", "1", "PrinterResolutionID"],
        "0x0054": ["CS", "1", "DefaultPrinterResolutionID"],
        "0x0060": ["CS", "1", "MagnificationType"],
        "0x0080": ["CS", "1", "SmoothingType"],
        "0x00A6": ["CS", "1", "DefaultMagnificationType"],
        "0x00A7": ["CS", "1-n", "OtherMagnificationTypesAvailable"],
        "0x00A8": ["CS", "1", "DefaultSmoothingType"],
        "0x00A9": ["CS", "1-n", "OtherSmoothingTypesAvailable"],
        "0x0100": ["CS", "1", "BorderDensity"],
        "0x0110": ["CS", "1", "EmptyImageDensity"],
        "0x0120": ["US", "1", "MinDensity"],
        "0x0130": ["US", "1", "MaxDensity"],
        "0x0140": ["CS", "1", "Trim"],
        "0x0150": ["ST", "1", "ConfigurationInformation"],
        "0x0152": ["LT", "1", "ConfigurationInformationDescription"],
        "0x0154": ["IS", "1", "MaximumCollatedFilms"],
        "0x015E": ["US", "1", "Illumination"],
        "0x0160": ["US", "1", "ReflectedAmbientLight"],
        "0x0376": ["DS", "2", "PrinterPixelSpacing"],
        "0x0500": ["SQ", "1", "ReferencedFilmSessionSequence"],
        "0x0510": ["SQ", "1", "ReferencedImageBoxSequence"],
        "0x0520": ["SQ", "1", "ReferencedBasicAnnotationBoxSequence"]
    },
    "0x2020": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["US", "1", "ImageBoxPosition"],
        "0x0020": ["CS", "1", "Polarity"],
        "0x0030": ["DS", "1", "RequestedImageSize"],
        "0x0040": ["CS", "1", "RequestedDecimateCropBehavior"],
        "0x0050": ["CS", "1", "RequestedResolutionID"],
        "0x00A0": ["CS", "1", "RequestedImageSizeFlag"],
        "0x00A2": ["CS", "1", "DecimateCropResult"],
        "0x0110": ["SQ", "1", "BasicGrayscaleImageSequence"],
        "0x0111": ["SQ", "1", "BasicColorImageSequence"],
        "0x0130": ["SQ", "1", "ReferencedImageOverlayBoxSequence"],
        "0x0140": ["SQ", "1", "ReferencedVOILUTBoxSequence"]
    },
    "0x2030": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["US", "1", "AnnotationPosition"],
        "0x0020": ["LO", "1", "TextString"]
    },
    "0x2040": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["SQ", "1", "ReferencedOverlayPlaneSequence"],
        "0x0011": ["US", "1-99", "ReferencedOverlayPlaneGroups"],
        "0x0020": ["SQ", "1", "OverlayPixelDataSequence"],
        "0x0060": ["CS", "1", "OverlayMagnificationType"],
        "0x0070": ["CS", "1", "OverlaySmoothingType"],
        "0x0072": ["CS", "1", "OverlayOrImageMagnification"],
        "0x0074": ["US", "1", "MagnifyToNumberOfColumns"],
        "0x0080": ["CS", "1", "OverlayForegroundDensity"],
        "0x0082": ["CS", "1", "OverlayBackgroundDensity"],
        "0x0090": ["CS", "1", "OverlayMode"],
        "0x0100": ["CS", "1", "ThresholdDensity"],
        "0x0500": ["SQ", "1", "ReferencedImageBoxSequenceRetired"]
    },
    "0x2050": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["SQ", "1", "PresentationLUTSequence"],
        "0x0020": ["CS", "1", "PresentationLUTShape"],
        "0x0500": ["SQ", "1", "ReferencedPresentationLUTSequence"]
    },
    "0x2100": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["SH", "1", "PrintJobID"],
        "0x0020": ["CS", "1", "ExecutionStatus"],
        "0x0030": ["CS", "1", "ExecutionStatusInfo"],
        "0x0040": ["DA", "1", "CreationDate"],
        "0x0050": ["TM", "1", "CreationTime"],
        "0x0070": ["AE", "1", "Originator"],
        "0x0140": ["AE", "1", "DestinationAE"],
        "0x0160": ["SH", "1", "OwnerID"],
        "0x0170": ["IS", "1", "NumberOfFilms"],
        "0x0500": ["SQ", "1", "ReferencedPrintJobSequencePullStoredPrint"]
    },
    "0x2110": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["CS", "1", "PrinterStatus"],
        "0x0020": ["CS", "1", "PrinterStatusInfo"],
        "0x0030": ["LO", "1", "PrinterName"],
        "0x0099": ["SH", "1", "PrintQueueID"]
    },
    "0x2120": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["CS", "1", "QueueStatus"],
        "0x0050": ["SQ", "1", "PrintJobDescriptionSequence"],
        "0x0070": ["SQ", "1", "ReferencedPrintJobSequence"]
    },
    "0x2130": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["SQ", "1", "PrintManagementCapabilitiesSequence"],
        "0x0015": ["SQ", "1", "PrinterCharacteristicsSequence"],
        "0x0030": ["SQ", "1", "FilmBoxContentSequence"],
        "0x0040": ["SQ", "1", "ImageBoxContentSequence"],
        "0x0050": ["SQ", "1", "AnnotationContentSequence"],
        "0x0060": ["SQ", "1", "ImageOverlayBoxContentSequence"],
        "0x0080": ["SQ", "1", "PresentationLUTContentSequence"],
        "0x00A0": ["SQ", "1", "ProposedStudySequence"],
        "0x00C0": ["SQ", "1", "OriginalImageSequence"]
    },
    "0x2200": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["CS", "1", "LabelUsingInformationExtractedFromInstances"],
        "0x0002": ["UT", "1", "LabelText"],
        "0x0003": ["CS", "1", "LabelStyleSelection"],
        "0x0004": ["LT", "1", "MediaDisposition"],
        "0x0005": ["LT", "1", "BarcodeValue"],
        "0x0006": ["CS", "1", "BarcodeSymbology"],
        "0x0007": ["CS", "1", "AllowMediaSplitting"],
        "0x0008": ["CS", "1", "IncludeNonDICOMObjects"],
        "0x0009": ["CS", "1", "IncludeDisplayApplication"],
        "0x000A": ["CS", "1", "PreserveCompositeInstancesAfterMediaCreation"],
        "0x000B": ["US", "1", "TotalNumberOfPiecesOfMediaCreated"],
        "0x000C": ["LO", "1", "RequestedMediaApplicationProfile"],
        "0x000D": ["SQ", "1", "ReferencedStorageMediaSequence"],
        "0x000E": ["AT", "1-n", "FailureAttributes"],
        "0x000F": ["CS", "1", "AllowLossyCompression"],
        "0x0020": ["CS", "1", "RequestPriority"]
    },
    "0x3002": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SH", "1", "RTImageLabel"],
        "0x0003": ["LO", "1", "RTImageName"],
        "0x0004": ["ST", "1", "RTImageDescription"],
        "0x000A": ["CS", "1", "ReportedValuesOrigin"],
        "0x000C": ["CS", "1", "RTImagePlane"],
        "0x000D": ["DS", "3", "XRayImageReceptorTranslation"],
        "0x000E": ["DS", "1", "XRayImageReceptorAngle"],
        "0x0010": ["DS", "6", "RTImageOrientation"],
        "0x0011": ["DS", "2", "ImagePlanePixelSpacing"],
        "0x0012": ["DS", "2", "RTImagePosition"],
        "0x0020": ["SH", "1", "RadiationMachineName"],
        "0x0022": ["DS", "1", "RadiationMachineSAD"],
        "0x0024": ["DS", "1", "RadiationMachineSSD"],
        "0x0026": ["DS", "1", "RTImageSID"],
        "0x0028": ["DS", "1", "SourceToReferenceObjectDistance"],
        "0x0029": ["IS", "1", "FractionNumber"],
        "0x0030": ["SQ", "1", "ExposureSequence"],
        "0x0032": ["DS", "1", "MetersetExposure"],
        "0x0034": ["DS", "4", "DiaphragmPosition"],
        "0x0040": ["SQ", "1", "FluenceMapSequence"],
        "0x0041": ["CS", "1", "FluenceDataSource"],
        "0x0042": ["DS", "1", "FluenceDataScale"],
        "0x0050": ["SQ", "1", "PrimaryFluenceModeSequence"],
        "0x0051": ["CS", "1", "FluenceMode"],
        "0x0052": ["SH", "1", "FluenceModeID"]
    },
    "0x3004": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["CS", "1", "DVHType"],
        "0x0002": ["CS", "1", "DoseUnits"],
        "0x0004": ["CS", "1", "DoseType"],
        "0x0005": ["CS", "1", "SpatialTransformOfDose"],
        "0x0006": ["LO", "1", "DoseComment"],
        "0x0008": ["DS", "3", "NormalizationPoint"],
        "0x000A": ["CS", "1", "DoseSummationType"],
        "0x000C": ["DS", "2-n", "GridFrameOffsetVector"],
        "0x000E": ["DS", "1", "DoseGridScaling"],
        "0x0010": ["SQ", "1", "RTDoseROISequence"],
        "0x0012": ["DS", "1", "DoseValue"],
        "0x0014": ["CS", "1-3", "TissueHeterogeneityCorrection"],
        "0x0040": ["DS", "3", "DVHNormalizationPoint"],
        "0x0042": ["DS", "1", "DVHNormalizationDoseValue"],
        "0x0050": ["SQ", "1", "DVHSequence"],
        "0x0052": ["DS", "1", "DVHDoseScaling"],
        "0x0054": ["CS", "1", "DVHVolumeUnits"],
        "0x0056": ["IS", "1", "DVHNumberOfBins"],
        "0x0058": ["DS", "2-2n", "DVHData"],
        "0x0060": ["SQ", "1", "DVHReferencedROISequence"],
        "0x0062": ["CS", "1", "DVHROIContributionType"],
        "0x0070": ["DS", "1", "DVHMinimumDose"],
        "0x0072": ["DS", "1", "DVHMaximumDose"],
        "0x0074": ["DS", "1", "DVHMeanDose"]
    },
    "0x3006": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SH", "1", "StructureSetLabel"],
        "0x0004": ["LO", "1", "StructureSetName"],
        "0x0006": ["ST", "1", "StructureSetDescription"],
        "0x0008": ["DA", "1", "StructureSetDate"],
        "0x0009": ["TM", "1", "StructureSetTime"],
        "0x0010": ["SQ", "1", "ReferencedFrameOfReferenceSequence"],
        "0x0012": ["SQ", "1", "RTReferencedStudySequence"],
        "0x0014": ["SQ", "1", "RTReferencedSeriesSequence"],
        "0x0016": ["SQ", "1", "ContourImageSequence"],
        "0x0018": ["SQ", "1", "PredecessorStructureSetSequence"],
        "0x0020": ["SQ", "1", "StructureSetROISequence"],
        "0x0022": ["IS", "1", "ROINumber"],
        "0x0024": ["UI", "1", "ReferencedFrameOfReferenceUID"],
        "0x0026": ["LO", "1", "ROIName"],
        "0x0028": ["ST", "1", "ROIDescription"],
        "0x002A": ["IS", "3", "ROIDisplayColor"],
        "0x002C": ["DS", "1", "ROIVolume"],
        "0x0030": ["SQ", "1", "RTRelatedROISequence"],
        "0x0033": ["CS", "1", "RTROIRelationship"],
        "0x0036": ["CS", "1", "ROIGenerationAlgorithm"],
        "0x0038": ["LO", "1", "ROIGenerationDescription"],
        "0x0039": ["SQ", "1", "ROIContourSequence"],
        "0x0040": ["SQ", "1", "ContourSequence"],
        "0x0042": ["CS", "1", "ContourGeometricType"],
        "0x0044": ["DS", "1", "ContourSlabThickness"],
        "0x0045": ["DS", "3", "ContourOffsetVector"],
        "0x0046": ["IS", "1", "NumberOfContourPoints"],
        "0x0048": ["IS", "1", "ContourNumber"],
        "0x0049": ["IS", "1-n", "AttachedContours"],
        "0x0050": ["DS", "3-3n", "ContourData"],
        "0x0080": ["SQ", "1", "RTROIObservationsSequence"],
        "0x0082": ["IS", "1", "ObservationNumber"],
        "0x0084": ["IS", "1", "ReferencedROINumber"],
        "0x0085": ["SH", "1", "ROIObservationLabel"],
        "0x0086": ["SQ", "1", "RTROIIdentificationCodeSequence"],
        "0x0088": ["ST", "1", "ROIObservationDescription"],
        "0x00A0": ["SQ", "1", "RelatedRTROIObservationsSequence"],
        "0x00A4": ["CS", "1", "RTROIInterpretedType"],
        "0x00A6": ["PN", "1", "ROIInterpreter"],
        "0x00B0": ["SQ", "1", "ROIPhysicalPropertiesSequence"],
        "0x00B2": ["CS", "1", "ROIPhysicalProperty"],
        "0x00B4": ["DS", "1", "ROIPhysicalPropertyValue"],
        "0x00B6": ["SQ", "1", "ROIElementalCompositionSequence"],
        "0x00B7": ["US", "1", "ROIElementalCompositionAtomicNumber"],
        "0x00B8": ["FL", "1", "ROIElementalCompositionAtomicMassFraction"],
        "0x00B9": ["SQ", "1", "AdditionalRTROIIdentificationCodeSequence"],
        "0x00C0": ["SQ", "1", "FrameOfReferenceRelationshipSequence"],
        "0x00C2": ["UI", "1", "RelatedFrameOfReferenceUID"],
        "0x00C4": ["CS", "1", "FrameOfReferenceTransformationType"],
        "0x00C6": ["DS", "16", "FrameOfReferenceTransformationMatrix"],
        "0x00C8": ["LO", "1", "FrameOfReferenceTransformationComment"]
    },
    "0x3008": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["SQ", "1", "MeasuredDoseReferenceSequence"],
        "0x0012": ["ST", "1", "MeasuredDoseDescription"],
        "0x0014": ["CS", "1", "MeasuredDoseType"],
        "0x0016": ["DS", "1", "MeasuredDoseValue"],
        "0x0020": ["SQ", "1", "TreatmentSessionBeamSequence"],
        "0x0021": ["SQ", "1", "TreatmentSessionIonBeamSequence"],
        "0x0022": ["IS", "1", "CurrentFractionNumber"],
        "0x0024": ["DA", "1", "TreatmentControlPointDate"],
        "0x0025": ["TM", "1", "TreatmentControlPointTime"],
        "0x002A": ["CS", "1", "TreatmentTerminationStatus"],
        "0x002B": ["SH", "1", "TreatmentTerminationCode"],
        "0x002C": ["CS", "1", "TreatmentVerificationStatus"],
        "0x0030": ["SQ", "1", "ReferencedTreatmentRecordSequence"],
        "0x0032": ["DS", "1", "SpecifiedPrimaryMeterset"],
        "0x0033": ["DS", "1", "SpecifiedSecondaryMeterset"],
        "0x0036": ["DS", "1", "DeliveredPrimaryMeterset"],
        "0x0037": ["DS", "1", "DeliveredSecondaryMeterset"],
        "0x003A": ["DS", "1", "SpecifiedTreatmentTime"],
        "0x003B": ["DS", "1", "DeliveredTreatmentTime"],
        "0x0040": ["SQ", "1", "ControlPointDeliverySequence"],
        "0x0041": ["SQ", "1", "IonControlPointDeliverySequence"],
        "0x0042": ["DS", "1", "SpecifiedMeterset"],
        "0x0044": ["DS", "1", "DeliveredMeterset"],
        "0x0045": ["FL", "1", "MetersetRateSet"],
        "0x0046": ["FL", "1", "MetersetRateDelivered"],
        "0x0047": ["FL", "1-n", "ScanSpotMetersetsDelivered"],
        "0x0048": ["DS", "1", "DoseRateDelivered"],
        "0x0050": ["SQ", "1", "TreatmentSummaryCalculatedDoseReferenceSequence"],
        "0x0052": ["DS", "1", "CumulativeDoseToDoseReference"],
        "0x0054": ["DA", "1", "FirstTreatmentDate"],
        "0x0056": ["DA", "1", "MostRecentTreatmentDate"],
        "0x005A": ["IS", "1", "NumberOfFractionsDelivered"],
        "0x0060": ["SQ", "1", "OverrideSequence"],
        "0x0061": ["AT", "1", "ParameterSequencePointer"],
        "0x0062": ["AT", "1", "OverrideParameterPointer"],
        "0x0063": ["IS", "1", "ParameterItemIndex"],
        "0x0064": ["IS", "1", "MeasuredDoseReferenceNumber"],
        "0x0065": ["AT", "1", "ParameterPointer"],
        "0x0066": ["ST", "1", "OverrideReason"],
        "0x0068": ["SQ", "1", "CorrectedParameterSequence"],
        "0x006A": ["FL", "1", "CorrectionValue"],
        "0x0070": ["SQ", "1", "CalculatedDoseReferenceSequence"],
        "0x0072": ["IS", "1", "CalculatedDoseReferenceNumber"],
        "0x0074": ["ST", "1", "CalculatedDoseReferenceDescription"],
        "0x0076": ["DS", "1", "CalculatedDoseReferenceDoseValue"],
        "0x0078": ["DS", "1", "StartMeterset"],
        "0x007A": ["DS", "1", "EndMeterset"],
        "0x0080": ["SQ", "1", "ReferencedMeasuredDoseReferenceSequence"],
        "0x0082": ["IS", "1", "ReferencedMeasuredDoseReferenceNumber"],
        "0x0090": ["SQ", "1", "ReferencedCalculatedDoseReferenceSequence"],
        "0x0092": ["IS", "1", "ReferencedCalculatedDoseReferenceNumber"],
        "0x00A0": ["SQ", "1", "BeamLimitingDeviceLeafPairsSequence"],
        "0x00B0": ["SQ", "1", "RecordedWedgeSequence"],
        "0x00C0": ["SQ", "1", "RecordedCompensatorSequence"],
        "0x00D0": ["SQ", "1", "RecordedBlockSequence"],
        "0x00E0": ["SQ", "1", "TreatmentSummaryMeasuredDoseReferenceSequence"],
        "0x00F0": ["SQ", "1", "RecordedSnoutSequence"],
        "0x00F2": ["SQ", "1", "RecordedRangeShifterSequence"],
        "0x00F4": ["SQ", "1", "RecordedLateralSpreadingDeviceSequence"],
        "0x00F6": ["SQ", "1", "RecordedRangeModulatorSequence"],
        "0x0100": ["SQ", "1", "RecordedSourceSequence"],
        "0x0105": ["LO", "1", "SourceSerialNumber"],
        "0x0110": ["SQ", "1", "TreatmentSessionApplicationSetupSequence"],
        "0x0116": ["CS", "1", "ApplicationSetupCheck"],
        "0x0120": ["SQ", "1", "RecordedBrachyAccessoryDeviceSequence"],
        "0x0122": ["IS", "1", "ReferencedBrachyAccessoryDeviceNumber"],
        "0x0130": ["SQ", "1", "RecordedChannelSequence"],
        "0x0132": ["DS", "1", "SpecifiedChannelTotalTime"],
        "0x0134": ["DS", "1", "DeliveredChannelTotalTime"],
        "0x0136": ["IS", "1", "SpecifiedNumberOfPulses"],
        "0x0138": ["IS", "1", "DeliveredNumberOfPulses"],
        "0x013A": ["DS", "1", "SpecifiedPulseRepetitionInterval"],
        "0x013C": ["DS", "1", "DeliveredPulseRepetitionInterval"],
        "0x0140": ["SQ", "1", "RecordedSourceApplicatorSequence"],
        "0x0142": ["IS", "1", "ReferencedSourceApplicatorNumber"],
        "0x0150": ["SQ", "1", "RecordedChannelShieldSequence"],
        "0x0152": ["IS", "1", "ReferencedChannelShieldNumber"],
        "0x0160": ["SQ", "1", "BrachyControlPointDeliveredSequence"],
        "0x0162": ["DA", "1", "SafePositionExitDate"],
        "0x0164": ["TM", "1", "SafePositionExitTime"],
        "0x0166": ["DA", "1", "SafePositionReturnDate"],
        "0x0168": ["TM", "1", "SafePositionReturnTime"],
        "0x0171": ["SQ", "1", "PulseSpecificBrachyControlPointDeliveredSequence"],
        "0x0172": ["US", "1", "PulseNumber"],
        "0x0173": ["SQ", "1", "BrachyPulseControlPointDeliveredSequence"],
        "0x0200": ["CS", "1", "CurrentTreatmentStatus"],
        "0x0202": ["ST", "1", "TreatmentStatusComment"],
        "0x0220": ["SQ", "1", "FractionGroupSummarySequence"],
        "0x0223": ["IS", "1", "ReferencedFractionNumber"],
        "0x0224": ["CS", "1", "FractionGroupType"],
        "0x0230": ["CS", "1", "BeamStopperPosition"],
        "0x0240": ["SQ", "1", "FractionStatusSummarySequence"],
        "0x0250": ["DA", "1", "TreatmentDate"],
        "0x0251": ["TM", "1", "TreatmentTime"]
    },
    "0x300A": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SH", "1", "RTPlanLabel"],
        "0x0003": ["LO", "1", "RTPlanName"],
        "0x0004": ["ST", "1", "RTPlanDescription"],
        "0x0006": ["DA", "1", "RTPlanDate"],
        "0x0007": ["TM", "1", "RTPlanTime"],
        "0x0009": ["LO", "1-n", "TreatmentProtocols"],
        "0x000A": ["CS", "1", "PlanIntent"],
        "0x000B": ["LO", "1-n", "TreatmentSites"],
        "0x000C": ["CS", "1", "RTPlanGeometry"],
        "0x000E": ["ST", "1", "PrescriptionDescription"],
        "0x0010": ["SQ", "1", "DoseReferenceSequence"],
        "0x0012": ["IS", "1", "DoseReferenceNumber"],
        "0x0013": ["UI", "1", "DoseReferenceUID"],
        "0x0014": ["CS", "1", "DoseReferenceStructureType"],
        "0x0015": ["CS", "1", "NominalBeamEnergyUnit"],
        "0x0016": ["LO", "1", "DoseReferenceDescription"],
        "0x0018": ["DS", "3", "DoseReferencePointCoordinates"],
        "0x001A": ["DS", "1", "NominalPriorDose"],
        "0x0020": ["CS", "1", "DoseReferenceType"],
        "0x0021": ["DS", "1", "ConstraintWeight"],
        "0x0022": ["DS", "1", "DeliveryWarningDose"],
        "0x0023": ["DS", "1", "DeliveryMaximumDose"],
        "0x0025": ["DS", "1", "TargetMinimumDose"],
        "0x0026": ["DS", "1", "TargetPrescriptionDose"],
        "0x0027": ["DS", "1", "TargetMaximumDose"],
        "0x0028": ["DS", "1", "TargetUnderdoseVolumeFraction"],
        "0x002A": ["DS", "1", "OrganAtRiskFullVolumeDose"],
        "0x002B": ["DS", "1", "OrganAtRiskLimitDose"],
        "0x002C": ["DS", "1", "OrganAtRiskMaximumDose"],
        "0x002D": ["DS", "1", "OrganAtRiskOverdoseVolumeFraction"],
        "0x0040": ["SQ", "1", "ToleranceTableSequence"],
        "0x0042": ["IS", "1", "ToleranceTableNumber"],
        "0x0043": ["SH", "1", "ToleranceTableLabel"],
        "0x0044": ["DS", "1", "GantryAngleTolerance"],
        "0x0046": ["DS", "1", "BeamLimitingDeviceAngleTolerance"],
        "0x0048": ["SQ", "1", "BeamLimitingDeviceToleranceSequence"],
        "0x004A": ["DS", "1", "BeamLimitingDevicePositionTolerance"],
        "0x004B": ["FL", "1", "SnoutPositionTolerance"],
        "0x004C": ["DS", "1", "PatientSupportAngleTolerance"],
        "0x004E": ["DS", "1", "TableTopEccentricAngleTolerance"],
        "0x004F": ["FL", "1", "TableTopPitchAngleTolerance"],
        "0x0050": ["FL", "1", "TableTopRollAngleTolerance"],
        "0x0051": ["DS", "1", "TableTopVerticalPositionTolerance"],
        "0x0052": ["DS", "1", "TableTopLongitudinalPositionTolerance"],
        "0x0053": ["DS", "1", "TableTopLateralPositionTolerance"],
        "0x0055": ["CS", "1", "RTPlanRelationship"],
        "0x0070": ["SQ", "1", "FractionGroupSequence"],
        "0x0071": ["IS", "1", "FractionGroupNumber"],
        "0x0072": ["LO", "1", "FractionGroupDescription"],
        "0x0078": ["IS", "1", "NumberOfFractionsPlanned"],
        "0x0079": ["IS", "1", "NumberOfFractionPatternDigitsPerDay"],
        "0x007A": ["IS", "1", "RepeatFractionCycleLength"],
        "0x007B": ["LT", "1", "FractionPattern"],
        "0x0080": ["IS", "1", "NumberOfBeams"],
        "0x0082": ["DS", "3", "BeamDoseSpecificationPoint"],
        "0x0084": ["DS", "1", "BeamDose"],
        "0x0086": ["DS", "1", "BeamMeterset"],
        "0x0088": ["FL", "1", "BeamDosePointDepth"],
        "0x0089": ["FL", "1", "BeamDosePointEquivalentDepth"],
        "0x008A": ["FL", "1", "BeamDosePointSSD"],
        "0x008B": ["CS", "1", "BeamDoseMeaning"],
        "0x008C": ["SQ", "1", "BeamDoseVerificationControlPointSequence"],
        "0x008D": ["FL", "1", "AverageBeamDosePointDepth"],
        "0x008E": ["FL", "1", "AverageBeamDosePointEquivalentDepth"],
        "0x008F": ["FL", "1", "AverageBeamDosePointSSD"],
        "0x00A0": ["IS", "1", "NumberOfBrachyApplicationSetups"],
        "0x00A2": ["DS", "3", "BrachyApplicationSetupDoseSpecificationPoint"],
        "0x00A4": ["DS", "1", "BrachyApplicationSetupDose"],
        "0x00B0": ["SQ", "1", "BeamSequence"],
        "0x00B2": ["SH", "1", "TreatmentMachineName"],
        "0x00B3": ["CS", "1", "PrimaryDosimeterUnit"],
        "0x00B4": ["DS", "1", "SourceAxisDistance"],
        "0x00B6": ["SQ", "1", "BeamLimitingDeviceSequence"],
        "0x00B8": ["CS", "1", "RTBeamLimitingDeviceType"],
        "0x00BA": ["DS", "1", "SourceToBeamLimitingDeviceDistance"],
        "0x00BB": ["FL", "1", "IsocenterToBeamLimitingDeviceDistance"],
        "0x00BC": ["IS", "1", "NumberOfLeafJawPairs"],
        "0x00BE": ["DS", "3-n", "LeafPositionBoundaries"],
        "0x00C0": ["IS", "1", "BeamNumber"],
        "0x00C2": ["LO", "1", "BeamName"],
        "0x00C3": ["ST", "1", "BeamDescription"],
        "0x00C4": ["CS", "1", "BeamType"],
        "0x00C5": ["FD", "1", "BeamDeliveryDurationLimit"],
        "0x00C6": ["CS", "1", "RadiationType"],
        "0x00C7": ["CS", "1", "HighDoseTechniqueType"],
        "0x00C8": ["IS", "1", "ReferenceImageNumber"],
        "0x00CA": ["SQ", "1", "PlannedVerificationImageSequence"],
        "0x00CC": ["LO", "1-n", "ImagingDeviceSpecificAcquisitionParameters"],
        "0x00CE": ["CS", "1", "TreatmentDeliveryType"],
        "0x00D0": ["IS", "1", "NumberOfWedges"],
        "0x00D1": ["SQ", "1", "WedgeSequence"],
        "0x00D2": ["IS", "1", "WedgeNumber"],
        "0x00D3": ["CS", "1", "WedgeType"],
        "0x00D4": ["SH", "1", "WedgeID"],
        "0x00D5": ["IS", "1", "WedgeAngle"],
        "0x00D6": ["DS", "1", "WedgeFactor"],
        "0x00D7": ["FL", "1", "TotalWedgeTrayWaterEquivalentThickness"],
        "0x00D8": ["DS", "1", "WedgeOrientation"],
        "0x00D9": ["FL", "1", "IsocenterToWedgeTrayDistance"],
        "0x00DA": ["DS", "1", "SourceToWedgeTrayDistance"],
        "0x00DB": ["FL", "1", "WedgeThinEdgePosition"],
        "0x00DC": ["SH", "1", "BolusID"],
        "0x00DD": ["ST", "1", "BolusDescription"],
        "0x00DE": ["DS", "1", "EffectiveWedgeAngle"],
        "0x00E0": ["IS", "1", "NumberOfCompensators"],
        "0x00E1": ["SH", "1", "MaterialID"],
        "0x00E2": ["DS", "1", "TotalCompensatorTrayFactor"],
        "0x00E3": ["SQ", "1", "CompensatorSequence"],
        "0x00E4": ["IS", "1", "CompensatorNumber"],
        "0x00E5": ["SH", "1", "CompensatorID"],
        "0x00E6": ["DS", "1", "SourceToCompensatorTrayDistance"],
        "0x00E7": ["IS", "1", "CompensatorRows"],
        "0x00E8": ["IS", "1", "CompensatorColumns"],
        "0x00E9": ["DS", "2", "CompensatorPixelSpacing"],
        "0x00EA": ["DS", "2", "CompensatorPosition"],
        "0x00EB": ["DS", "1-n", "CompensatorTransmissionData"],
        "0x00EC": ["DS", "1-n", "CompensatorThicknessData"],
        "0x00ED": ["IS", "1", "NumberOfBoli"],
        "0x00EE": ["CS", "1", "CompensatorType"],
        "0x00EF": ["SH", "1", "CompensatorTrayID"],
        "0x00F0": ["IS", "1", "NumberOfBlocks"],
        "0x00F2": ["DS", "1", "TotalBlockTrayFactor"],
        "0x00F3": ["FL", "1", "TotalBlockTrayWaterEquivalentThickness"],
        "0x00F4": ["SQ", "1", "BlockSequence"],
        "0x00F5": ["SH", "1", "BlockTrayID"],
        "0x00F6": ["DS", "1", "SourceToBlockTrayDistance"],
        "0x00F7": ["FL", "1", "IsocenterToBlockTrayDistance"],
        "0x00F8": ["CS", "1", "BlockType"],
        "0x00F9": ["LO", "1", "AccessoryCode"],
        "0x00FA": ["CS", "1", "BlockDivergence"],
        "0x00FB": ["CS", "1", "BlockMountingPosition"],
        "0x00FC": ["IS", "1", "BlockNumber"],
        "0x00FE": ["LO", "1", "BlockName"],
        "0x0100": ["DS", "1", "BlockThickness"],
        "0x0102": ["DS", "1", "BlockTransmission"],
        "0x0104": ["IS", "1", "BlockNumberOfPoints"],
        "0x0106": ["DS", "2-2n", "BlockData"],
        "0x0107": ["SQ", "1", "ApplicatorSequence"],
        "0x0108": ["SH", "1", "ApplicatorID"],
        "0x0109": ["CS", "1", "ApplicatorType"],
        "0x010A": ["LO", "1", "ApplicatorDescription"],
        "0x010C": ["DS", "1", "CumulativeDoseReferenceCoefficient"],
        "0x010E": ["DS", "1", "FinalCumulativeMetersetWeight"],
        "0x0110": ["IS", "1", "NumberOfControlPoints"],
        "0x0111": ["SQ", "1", "ControlPointSequence"],
        "0x0112": ["IS", "1", "ControlPointIndex"],
        "0x0114": ["DS", "1", "NominalBeamEnergy"],
        "0x0115": ["DS", "1", "DoseRateSet"],
        "0x0116": ["SQ", "1", "WedgePositionSequence"],
        "0x0118": ["CS", "1", "WedgePosition"],
        "0x011A": ["SQ", "1", "BeamLimitingDevicePositionSequence"],
        "0x011C": ["DS", "2-2n", "LeafJawPositions"],
        "0x011E": ["DS", "1", "GantryAngle"],
        "0x011F": ["CS", "1", "GantryRotationDirection"],
        "0x0120": ["DS", "1", "BeamLimitingDeviceAngle"],
        "0x0121": ["CS", "1", "BeamLimitingDeviceRotationDirection"],
        "0x0122": ["DS", "1", "PatientSupportAngle"],
        "0x0123": ["CS", "1", "PatientSupportRotationDirection"],
        "0x0124": ["DS", "1", "TableTopEccentricAxisDistance"],
        "0x0125": ["DS", "1", "TableTopEccentricAngle"],
        "0x0126": ["CS", "1", "TableTopEccentricRotationDirection"],
        "0x0128": ["DS", "1", "TableTopVerticalPosition"],
        "0x0129": ["DS", "1", "TableTopLongitudinalPosition"],
        "0x012A": ["DS", "1", "TableTopLateralPosition"],
        "0x012C": ["DS", "3", "IsocenterPosition"],
        "0x012E": ["DS", "3", "SurfaceEntryPoint"],
        "0x0130": ["DS", "1", "SourceToSurfaceDistance"],
        "0x0131": ["FL", "1", "AverageBeamDosePointSourceToExternalContourSurfaceDistance"],
        "0x0132": ["FL", "1", "SourceToExternalContourDistance"],
        "0x0133": ["FL", "3", "ExternalContourEntryPoint"],
        "0x0134": ["DS", "1", "CumulativeMetersetWeight"],
        "0x0140": ["FL", "1", "TableTopPitchAngle"],
        "0x0142": ["CS", "1", "TableTopPitchRotationDirection"],
        "0x0144": ["FL", "1", "TableTopRollAngle"],
        "0x0146": ["CS", "1", "TableTopRollRotationDirection"],
        "0x0148": ["FL", "1", "HeadFixationAngle"],
        "0x014A": ["FL", "1", "GantryPitchAngle"],
        "0x014C": ["CS", "1", "GantryPitchRotationDirection"],
        "0x014E": ["FL", "1", "GantryPitchAngleTolerance"],
        "0x0180": ["SQ", "1", "PatientSetupSequence"],
        "0x0182": ["IS", "1", "PatientSetupNumber"],
        "0x0183": ["LO", "1", "PatientSetupLabel"],
        "0x0184": ["LO", "1", "PatientAdditionalPosition"],
        "0x0190": ["SQ", "1", "FixationDeviceSequence"],
        "0x0192": ["CS", "1", "FixationDeviceType"],
        "0x0194": ["SH", "1", "FixationDeviceLabel"],
        "0x0196": ["ST", "1", "FixationDeviceDescription"],
        "0x0198": ["SH", "1", "FixationDevicePosition"],
        "0x0199": ["FL", "1", "FixationDevicePitchAngle"],
        "0x019A": ["FL", "1", "FixationDeviceRollAngle"],
        "0x01A0": ["SQ", "1", "ShieldingDeviceSequence"],
        "0x01A2": ["CS", "1", "ShieldingDeviceType"],
        "0x01A4": ["SH", "1", "ShieldingDeviceLabel"],
        "0x01A6": ["ST", "1", "ShieldingDeviceDescription"],
        "0x01A8": ["SH", "1", "ShieldingDevicePosition"],
        "0x01B0": ["CS", "1", "SetupTechnique"],
        "0x01B2": ["ST", "1", "SetupTechniqueDescription"],
        "0x01B4": ["SQ", "1", "SetupDeviceSequence"],
        "0x01B6": ["CS", "1", "SetupDeviceType"],
        "0x01B8": ["SH", "1", "SetupDeviceLabel"],
        "0x01BA": ["ST", "1", "SetupDeviceDescription"],
        "0x01BC": ["DS", "1", "SetupDeviceParameter"],
        "0x01D0": ["ST", "1", "SetupReferenceDescription"],
        "0x01D2": ["DS", "1", "TableTopVerticalSetupDisplacement"],
        "0x01D4": ["DS", "1", "TableTopLongitudinalSetupDisplacement"],
        "0x01D6": ["DS", "1", "TableTopLateralSetupDisplacement"],
        "0x0200": ["CS", "1", "BrachyTreatmentTechnique"],
        "0x0202": ["CS", "1", "BrachyTreatmentType"],
        "0x0206": ["SQ", "1", "TreatmentMachineSequence"],
        "0x0210": ["SQ", "1", "SourceSequence"],
        "0x0212": ["IS", "1", "SourceNumber"],
        "0x0214": ["CS", "1", "SourceType"],
        "0x0216": ["LO", "1", "SourceManufacturer"],
        "0x0218": ["DS", "1", "ActiveSourceDiameter"],
        "0x021A": ["DS", "1", "ActiveSourceLength"],
        "0x021B": ["SH", "1", "SourceModelID"],
        "0x021C": ["LO", "1", "SourceDescription"],
        "0x0222": ["DS", "1", "SourceEncapsulationNominalThickness"],
        "0x0224": ["DS", "1", "SourceEncapsulationNominalTransmission"],
        "0x0226": ["LO", "1", "SourceIsotopeName"],
        "0x0228": ["DS", "1", "SourceIsotopeHalfLife"],
        "0x0229": ["CS", "1", "SourceStrengthUnits"],
        "0x022A": ["DS", "1", "ReferenceAirKermaRate"],
        "0x022B": ["DS", "1", "SourceStrength"],
        "0x022C": ["DA", "1", "SourceStrengthReferenceDate"],
        "0x022E": ["TM", "1", "SourceStrengthReferenceTime"],
        "0x0230": ["SQ", "1", "ApplicationSetupSequence"],
        "0x0232": ["CS", "1", "ApplicationSetupType"],
        "0x0234": ["IS", "1", "ApplicationSetupNumber"],
        "0x0236": ["LO", "1", "ApplicationSetupName"],
        "0x0238": ["LO", "1", "ApplicationSetupManufacturer"],
        "0x0240": ["IS", "1", "TemplateNumber"],
        "0x0242": ["SH", "1", "TemplateType"],
        "0x0244": ["LO", "1", "TemplateName"],
        "0x0250": ["DS", "1", "TotalReferenceAirKerma"],
        "0x0260": ["SQ", "1", "BrachyAccessoryDeviceSequence"],
        "0x0262": ["IS", "1", "BrachyAccessoryDeviceNumber"],
        "0x0263": ["SH", "1", "BrachyAccessoryDeviceID"],
        "0x0264": ["CS", "1", "BrachyAccessoryDeviceType"],
        "0x0266": ["LO", "1", "BrachyAccessoryDeviceName"],
        "0x026A": ["DS", "1", "BrachyAccessoryDeviceNominalThickness"],
        "0x026C": ["DS", "1", "BrachyAccessoryDeviceNominalTransmission"],
        "0x0280": ["SQ", "1", "ChannelSequence"],
        "0x0282": ["IS", "1", "ChannelNumber"],
        "0x0284": ["DS", "1", "ChannelLength"],
        "0x0286": ["DS", "1", "ChannelTotalTime"],
        "0x0288": ["CS", "1", "SourceMovementType"],
        "0x028A": ["IS", "1", "NumberOfPulses"],
        "0x028C": ["DS", "1", "PulseRepetitionInterval"],
        "0x0290": ["IS", "1", "SourceApplicatorNumber"],
        "0x0291": ["SH", "1", "SourceApplicatorID"],
        "0x0292": ["CS", "1", "SourceApplicatorType"],
        "0x0294": ["LO", "1", "SourceApplicatorName"],
        "0x0296": ["DS", "1", "SourceApplicatorLength"],
        "0x0298": ["LO", "1", "SourceApplicatorManufacturer"],
        "0x029C": ["DS", "1", "SourceApplicatorWallNominalThickness"],
        "0x029E": ["DS", "1", "SourceApplicatorWallNominalTransmission"],
        "0x02A0": ["DS", "1", "SourceApplicatorStepSize"],
        "0x02A2": ["IS", "1", "TransferTubeNumber"],
        "0x02A4": ["DS", "1", "TransferTubeLength"],
        "0x02B0": ["SQ", "1", "ChannelShieldSequence"],
        "0x02B2": ["IS", "1", "ChannelShieldNumber"],
        "0x02B3": ["SH", "1", "ChannelShieldID"],
        "0x02B4": ["LO", "1", "ChannelShieldName"],
        "0x02B8": ["DS", "1", "ChannelShieldNominalThickness"],
        "0x02BA": ["DS", "1", "ChannelShieldNominalTransmission"],
        "0x02C8": ["DS", "1", "FinalCumulativeTimeWeight"],
        "0x02D0": ["SQ", "1", "BrachyControlPointSequence"],
        "0x02D2": ["DS", "1", "ControlPointRelativePosition"],
        "0x02D4": ["DS", "3", "ControlPoint3DPosition"],
        "0x02D6": ["DS", "1", "CumulativeTimeWeight"],
        "0x02E0": ["CS", "1", "CompensatorDivergence"],
        "0x02E1": ["CS", "1", "CompensatorMountingPosition"],
        "0x02E2": ["DS", "1-n", "SourceToCompensatorDistance"],
        "0x02E3": ["FL", "1", "TotalCompensatorTrayWaterEquivalentThickness"],
        "0x02E4": ["FL", "1", "IsocenterToCompensatorTrayDistance"],
        "0x02E5": ["FL", "1", "CompensatorColumnOffset"],
        "0x02E6": ["FL", "1-n", "IsocenterToCompensatorDistances"],
        "0x02E7": ["FL", "1", "CompensatorRelativeStoppingPowerRatio"],
        "0x02E8": ["FL", "1", "CompensatorMillingToolDiameter"],
        "0x02EA": ["SQ", "1", "IonRangeCompensatorSequence"],
        "0x02EB": ["LT", "1", "CompensatorDescription"],
        "0x0302": ["IS", "1", "RadiationMassNumber"],
        "0x0304": ["IS", "1", "RadiationAtomicNumber"],
        "0x0306": ["SS", "1", "RadiationChargeState"],
        "0x0308": ["CS", "1", "ScanMode"],
        "0x030A": ["FL", "2", "VirtualSourceAxisDistances"],
        "0x030C": ["SQ", "1", "SnoutSequence"],
        "0x030D": ["FL", "1", "SnoutPosition"],
        "0x030F": ["SH", "1", "SnoutID"],
        "0x0312": ["IS", "1", "NumberOfRangeShifters"],
        "0x0314": ["SQ", "1", "RangeShifterSequence"],
        "0x0316": ["IS", "1", "RangeShifterNumber"],
        "0x0318": ["SH", "1", "RangeShifterID"],
        "0x0320": ["CS", "1", "RangeShifterType"],
        "0x0322": ["LO", "1", "RangeShifterDescription"],
        "0x0330": ["IS", "1", "NumberOfLateralSpreadingDevices"],
        "0x0332": ["SQ", "1", "LateralSpreadingDeviceSequence"],
        "0x0334": ["IS", "1", "LateralSpreadingDeviceNumber"],
        "0x0336": ["SH", "1", "LateralSpreadingDeviceID"],
        "0x0338": ["CS", "1", "LateralSpreadingDeviceType"],
        "0x033A": ["LO", "1", "LateralSpreadingDeviceDescription"],
        "0x033C": ["FL", "1", "LateralSpreadingDeviceWaterEquivalentThickness"],
        "0x0340": ["IS", "1", "NumberOfRangeModulators"],
        "0x0342": ["SQ", "1", "RangeModulatorSequence"],
        "0x0344": ["IS", "1", "RangeModulatorNumber"],
        "0x0346": ["SH", "1", "RangeModulatorID"],
        "0x0348": ["CS", "1", "RangeModulatorType"],
        "0x034A": ["LO", "1", "RangeModulatorDescription"],
        "0x034C": ["SH", "1", "BeamCurrentModulationID"],
        "0x0350": ["CS", "1", "PatientSupportType"],
        "0x0352": ["SH", "1", "PatientSupportID"],
        "0x0354": ["LO", "1", "PatientSupportAccessoryCode"],
        "0x0356": ["FL", "1", "FixationLightAzimuthalAngle"],
        "0x0358": ["FL", "1", "FixationLightPolarAngle"],
        "0x035A": ["FL", "1", "MetersetRate"],
        "0x0360": ["SQ", "1", "RangeShifterSettingsSequence"],
        "0x0362": ["LO", "1", "RangeShifterSetting"],
        "0x0364": ["FL", "1", "IsocenterToRangeShifterDistance"],
        "0x0366": ["FL", "1", "RangeShifterWaterEquivalentThickness"],
        "0x0370": ["SQ", "1", "LateralSpreadingDeviceSettingsSequence"],
        "0x0372": ["LO", "1", "LateralSpreadingDeviceSetting"],
        "0x0374": ["FL", "1", "IsocenterToLateralSpreadingDeviceDistance"],
        "0x0380": ["SQ", "1", "RangeModulatorSettingsSequence"],
        "0x0382": ["FL", "1", "RangeModulatorGatingStartValue"],
        "0x0384": ["FL", "1", "RangeModulatorGatingStopValue"],
        "0x0386": ["FL", "1", "RangeModulatorGatingStartWaterEquivalentThickness"],
        "0x0388": ["FL", "1", "RangeModulatorGatingStopWaterEquivalentThickness"],
        "0x038A": ["FL", "1", "IsocenterToRangeModulatorDistance"],
        "0x0390": ["SH", "1", "ScanSpotTuneID"],
        "0x0392": ["IS", "1", "NumberOfScanSpotPositions"],
        "0x0394": ["FL", "1-n", "ScanSpotPositionMap"],
        "0x0396": ["FL", "1-n", "ScanSpotMetersetWeights"],
        "0x0398": ["FL", "2", "ScanningSpotSize"],
        "0x039A": ["IS", "1", "NumberOfPaintings"],
        "0x03A0": ["SQ", "1", "IonToleranceTableSequence"],
        "0x03A2": ["SQ", "1", "IonBeamSequence"],
        "0x03A4": ["SQ", "1", "IonBeamLimitingDeviceSequence"],
        "0x03A6": ["SQ", "1", "IonBlockSequence"],
        "0x03A8": ["SQ", "1", "IonControlPointSequence"],
        "0x03AA": ["SQ", "1", "IonWedgeSequence"],
        "0x03AC": ["SQ", "1", "IonWedgePositionSequence"],
        "0x0401": ["SQ", "1", "ReferencedSetupImageSequence"],
        "0x0402": ["ST", "1", "SetupImageComment"],
        "0x0410": ["SQ", "1", "MotionSynchronizationSequence"],
        "0x0412": ["FL", "3", "ControlPointOrientation"],
        "0x0420": ["SQ", "1", "GeneralAccessorySequence"],
        "0x0421": ["SH", "1", "GeneralAccessoryID"],
        "0x0422": ["ST", "1", "GeneralAccessoryDescription"],
        "0x0423": ["CS", "1", "GeneralAccessoryType"],
        "0x0424": ["IS", "1", "GeneralAccessoryNumber"],
        "0x0425": ["FL", "1", "SourceToGeneralAccessoryDistance"],
        "0x0431": ["SQ", "1", "ApplicatorGeometrySequence"],
        "0x0432": ["CS", "1", "ApplicatorApertureShape"],
        "0x0433": ["FL", "1", "ApplicatorOpening"],
        "0x0434": ["FL", "1", "ApplicatorOpeningX"],
        "0x0435": ["FL", "1", "ApplicatorOpeningY"],
        "0x0436": ["FL", "1", "SourceToApplicatorMountingPositionDistance"],
        "0x0440": ["IS", "1", "NumberOfBlockSlabItems"],
        "0x0441": ["SQ", "1", "BlockSlabSequence"],
        "0x0442": ["DS", "1", "BlockSlabThickness"],
        "0x0443": ["US", "1", "BlockSlabNumber"],
        "0x0450": ["SQ", "1", "DeviceMotionControlSequence"],
        "0x0451": ["CS", "1", "DeviceMotionExecutionMode"],
        "0x0452": ["CS", "1", "DeviceMotionObservationMode"],
        "0x0453": ["SQ", "1", "DeviceMotionParameterCodeSequence"]
    },
    "0x300C": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["SQ", "1", "ReferencedRTPlanSequence"],
        "0x0004": ["SQ", "1", "ReferencedBeamSequence"],
        "0x0006": ["IS", "1", "ReferencedBeamNumber"],
        "0x0007": ["IS", "1", "ReferencedReferenceImageNumber"],
        "0x0008": ["DS", "1", "StartCumulativeMetersetWeight"],
        "0x0009": ["DS", "1", "EndCumulativeMetersetWeight"],
        "0x000A": ["SQ", "1", "ReferencedBrachyApplicationSetupSequence"],
        "0x000C": ["IS", "1", "ReferencedBrachyApplicationSetupNumber"],
        "0x000E": ["IS", "1", "ReferencedSourceNumber"],
        "0x0020": ["SQ", "1", "ReferencedFractionGroupSequence"],
        "0x0022": ["IS", "1", "ReferencedFractionGroupNumber"],
        "0x0040": ["SQ", "1", "ReferencedVerificationImageSequence"],
        "0x0042": ["SQ", "1", "ReferencedReferenceImageSequence"],
        "0x0050": ["SQ", "1", "ReferencedDoseReferenceSequence"],
        "0x0051": ["IS", "1", "ReferencedDoseReferenceNumber"],
        "0x0055": ["SQ", "1", "BrachyReferencedDoseReferenceSequence"],
        "0x0060": ["SQ", "1", "ReferencedStructureSetSequence"],
        "0x006A": ["IS", "1", "ReferencedPatientSetupNumber"],
        "0x0080": ["SQ", "1", "ReferencedDoseSequence"],
        "0x00A0": ["IS", "1", "ReferencedToleranceTableNumber"],
        "0x00B0": ["SQ", "1", "ReferencedBolusSequence"],
        "0x00C0": ["IS", "1", "ReferencedWedgeNumber"],
        "0x00D0": ["IS", "1", "ReferencedCompensatorNumber"],
        "0x00E0": ["IS", "1", "ReferencedBlockNumber"],
        "0x00F0": ["IS", "1", "ReferencedControlPointIndex"],
        "0x00F2": ["SQ", "1", "ReferencedControlPointSequence"],
        "0x00F4": ["IS", "1", "ReferencedStartControlPointIndex"],
        "0x00F6": ["IS", "1", "ReferencedStopControlPointIndex"],
        "0x0100": ["IS", "1", "ReferencedRangeShifterNumber"],
        "0x0102": ["IS", "1", "ReferencedLateralSpreadingDeviceNumber"],
        "0x0104": ["IS", "1", "ReferencedRangeModulatorNumber"],
        "0x0111": ["SQ", "1", "OmittedBeamTaskSequence"],
        "0x0112": ["CS", "1", "ReasonForOmission"],
        "0x0113": ["LO", "1", "ReasonForOmissionDescription"]
    },
    "0x300E": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0002": ["CS", "1", "ApprovalStatus"],
        "0x0004": ["DA", "1", "ReviewDate"],
        "0x0005": ["TM", "1", "ReviewTime"],
        "0x0008": ["PN", "1", "ReviewerName"]
    },
    "0x4000": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["LT", "1", "Arbitrary"],
        "0x4000": ["LT", "1", "TextComments"]
    },
    "0x4008": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0040": ["SH", "1", "ResultsID"],
        "0x0042": ["LO", "1", "ResultsIDIssuer"],
        "0x0050": ["SQ", "1", "ReferencedInterpretationSequence"],
        "0x00FF": ["CS", "1", "ReportProductionStatusTrial"],
        "0x0100": ["DA", "1", "InterpretationRecordedDate"],
        "0x0101": ["TM", "1", "InterpretationRecordedTime"],
        "0x0102": ["PN", "1", "InterpretationRecorder"],
        "0x0103": ["LO", "1", "ReferenceToRecordedSound"],
        "0x0108": ["DA", "1", "InterpretationTranscriptionDate"],
        "0x0109": ["TM", "1", "InterpretationTranscriptionTime"],
        "0x010A": ["PN", "1", "InterpretationTranscriber"],
        "0x010B": ["ST", "1", "InterpretationText"],
        "0x010C": ["PN", "1", "InterpretationAuthor"],
        "0x0111": ["SQ", "1", "InterpretationApproverSequence"],
        "0x0112": ["DA", "1", "InterpretationApprovalDate"],
        "0x0113": ["TM", "1", "InterpretationApprovalTime"],
        "0x0114": ["PN", "1", "PhysicianApprovingInterpretation"],
        "0x0115": ["LT", "1", "InterpretationDiagnosisDescription"],
        "0x0117": ["SQ", "1", "InterpretationDiagnosisCodeSequence"],
        "0x0118": ["SQ", "1", "ResultsDistributionListSequence"],
        "0x0119": ["PN", "1", "DistributionName"],
        "0x011A": ["LO", "1", "DistributionAddress"],
        "0x0200": ["SH", "1", "InterpretationID"],
        "0x0202": ["LO", "1", "InterpretationIDIssuer"],
        "0x0210": ["CS", "1", "InterpretationTypeID"],
        "0x0212": ["CS", "1", "InterpretationStatusID"],
        "0x0300": ["ST", "1", "Impressions"],
        "0x4000": ["ST", "1", "ResultsComments"]
    },
    "0x4010": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["CS", "1", "LowEnergyDetectors"],
        "0x0002": ["CS", "1", "HighEnergyDetectors"],
        "0x0004": ["SQ", "1", "DetectorGeometrySequence"],
        "0x1001": ["SQ", "1", "ThreatROIVoxelSequence"],
        "0x1004": ["FL", "3", "ThreatROIBase"],
        "0x1005": ["FL", "3", "ThreatROIExtents"],
        "0x1006": ["OB", "1", "ThreatROIBitmap"],
        "0x1007": ["SH", "1", "RouteSegmentID"],
        "0x1008": ["CS", "1", "GantryType"],
        "0x1009": ["CS", "1", "OOIOwnerType"],
        "0x100A": ["SQ", "1", "RouteSegmentSequence"],
        "0x1010": ["US", "1", "PotentialThreatObjectID"],
        "0x1011": ["SQ", "1", "ThreatSequence"],
        "0x1012": ["CS", "1", "ThreatCategory"],
        "0x1013": ["LT", "1", "ThreatCategoryDescription"],
        "0x1014": ["CS", "1", "ATDAbilityAssessment"],
        "0x1015": ["CS", "1", "ATDAssessmentFlag"],
        "0x1016": ["FL", "1", "ATDAssessmentProbability"],
        "0x1017": ["FL", "1", "Mass"],
        "0x1018": ["FL", "1", "Density"],
        "0x1019": ["FL", "1", "ZEffective"],
        "0x101A": ["SH", "1", "BoardingPassID"],
        "0x101B": ["FL", "3", "CenterOfMass"],
        "0x101C": ["FL", "3", "CenterOfPTO"],
        "0x101D": ["FL", "6-n", "BoundingPolygon"],
        "0x101E": ["SH", "1", "RouteSegmentStartLocationID"],
        "0x101F": ["SH", "1", "RouteSegmentEndLocationID"],
        "0x1020": ["CS", "1", "RouteSegmentLocationIDType"],
        "0x1021": ["CS", "1-n", "AbortReason"],
        "0x1023": ["FL", "1", "VolumeOfPTO"],
        "0x1024": ["CS", "1", "AbortFlag"],
        "0x1025": ["DT", "1", "RouteSegmentStartTime"],
        "0x1026": ["DT", "1", "RouteSegmentEndTime"],
        "0x1027": ["CS", "1", "TDRType"],
        "0x1028": ["CS", "1", "InternationalRouteSegment"],
        "0x1029": ["LO", "1-n", "ThreatDetectionAlgorithmandVersion"],
        "0x102A": ["SH", "1", "AssignedLocation"],
        "0x102B": ["DT", "1", "AlarmDecisionTime"],
        "0x1031": ["CS", "1", "AlarmDecision"],
        "0x1033": ["US", "1", "NumberOfTotalObjects"],
        "0x1034": ["US", "1", "NumberOfAlarmObjects"],
        "0x1037": ["SQ", "1", "PTORepresentationSequence"],
        "0x1038": ["SQ", "1", "ATDAssessmentSequence"],
        "0x1039": ["CS", "1", "TIPType"],
        "0x103A": ["CS", "1", "DICOSVersion"],
        "0x1041": ["DT", "1", "OOIOwnerCreationTime"],
        "0x1042": ["CS", "1", "OOIType"],
        "0x1043": ["FL", "3", "OOISize"],
        "0x1044": ["CS", "1", "AcquisitionStatus"],
        "0x1045": ["SQ", "1", "BasisMaterialsCodeSequence"],
        "0x1046": ["CS", "1", "PhantomType"],
        "0x1047": ["SQ", "1", "OOIOwnerSequence"],
        "0x1048": ["CS", "1", "ScanType"],
        "0x1051": ["LO", "1", "ItineraryID"],
        "0x1052": ["SH", "1", "ItineraryIDType"],
        "0x1053": ["LO", "1", "ItineraryIDAssigningAuthority"],
        "0x1054": ["SH", "1", "RouteID"],
        "0x1055": ["SH", "1", "RouteIDAssigningAuthority"],
        "0x1056": ["CS", "1", "InboundArrivalType"],
        "0x1058": ["SH", "1", "CarrierID"],
        "0x1059": ["CS", "1", "CarrierIDAssigningAuthority"],
        "0x1060": ["FL", "3", "SourceOrientation"],
        "0x1061": ["FL", "3", "SourcePosition"],
        "0x1062": ["FL", "1", "BeltHeight"],
        "0x1064": ["SQ", "1", "AlgorithmRoutingCodeSequence"],
        "0x1067": ["CS", "1", "TransportClassification"],
        "0x1068": ["LT", "1", "OOITypeDescriptor"],
        "0x1069": ["FL", "1", "TotalProcessingTime"],
        "0x106C": ["OB", "1", "DetectorCalibrationData"],
        "0x106D": ["CS", "1", "AdditionalScreeningPerformed"],
        "0x106E": ["CS", "1", "AdditionalInspectionSelectionCriteria"],
        "0x106F": ["SQ", "1", "AdditionalInspectionMethodSequence"],
        "0x1070": ["CS", "1", "AITDeviceType"],
        "0x1071": ["SQ", "1", "QRMeasurementsSequence"],
        "0x1072": ["SQ", "1", "TargetMaterialSequence"],
        "0x1073": ["FD", "1", "SNRThreshold"],
        "0x1075": ["DS", "1", "ImageScaleRepresentation"],
        "0x1076": ["SQ", "1", "ReferencedPTOSequence"],
        "0x1077": ["SQ", "1", "ReferencedTDRInstanceSequence"],
        "0x1078": ["ST", "1", "PTOLocationDescription"],
        "0x1079": ["SQ", "1", "AnomalyLocatorIndicatorSequence"],
        "0x107A": ["FL", "3", "AnomalyLocatorIndicator"],
        "0x107B": ["SQ", "1", "PTORegionSequence"],
        "0x107C": ["CS", "1", "InspectionSelectionCriteria"],
        "0x107D": ["SQ", "1", "SecondaryInspectionMethodSequence"],
        "0x107E": ["DS", "6", "PRCSToRCSOrientation"]
    },
    "0x4FFE": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0001": ["SQ", "1", "MACParametersSequence"]
    },
    "0x5000": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0005": ["US", "1", "CurveDimensions"],
        "0x0010": ["US", "1", "NumberOfPoints"],
        "0x0020": ["CS", "1", "TypeOfData"],
        "0x0022": ["LO", "1", "CurveDescription"],
        "0x0030": ["SH", "1-n", "AxisUnits"],
        "0x0040": ["SH", "1-n", "AxisLabels"],
        "0x0103": ["US", "1", "DataValueRepresentation"],
        "0x0104": ["US", "1-n", "MinimumCoordinateValue"],
        "0x0105": ["US", "1-n", "MaximumCoordinateValue"],
        "0x0106": ["SH", "1-n", "CurveRange"],
        "0x0110": ["US", "1-n", "CurveDataDescriptor"],
        "0x0112": ["US", "1-n", "CoordinateStartValue"],
        "0x0114": ["US", "1-n", "CoordinateStepValue"],
        "0x1001": ["CS", "1", "CurveActivationLayer"],
        "0x2000": ["US", "1", "AudioType"],
        "0x2002": ["US", "1", "AudioSampleFormat"],
        "0x2004": ["US", "1", "NumberOfChannels"],
        "0x2006": ["UL", "1", "NumberOfSamples"],
        "0x2008": ["UL", "1", "SampleRate"],
        "0x200A": ["UL", "1", "TotalTime"],
        "0x200C": ["ox", "1", "AudioSampleData"],
        "0x200E": ["LT", "1", "AudioComments"],
        "0x2500": ["LO", "1", "CurveLabel"],
        "0x2600": ["SQ", "1", "CurveReferencedOverlaySequence"],
        "0x2610": ["US", "1", "CurveReferencedOverlayGroup"],
        "0x3000": ["ox", "1", "CurveData"]
    },
    "0x5200": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x9229": ["SQ", "1", "SharedFunctionalGroupsSequence"],
        "0x9230": ["SQ", "1", "PerFrameFunctionalGroupsSequence"]
    },
    "0x5400": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0100": ["SQ", "1", "WaveformSequence"],
        "0x0110": ["ox", "1", "ChannelMinimumValue"],
        "0x0112": ["ox", "1", "ChannelMaximumValue"],
        "0x1004": ["US", "1", "WaveformBitsAllocated"],
        "0x1006": ["CS", "1", "WaveformSampleInterpretation"],
        "0x100A": ["ox", "1", "WaveformPaddingValue"],
        "0x1010": ["ox", "1", "WaveformData"]
    },
    "0x5600": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["OF", "1", "FirstOrderPhaseCorrectionAngle"],
        "0x0020": ["OF", "1", "SpectroscopyData"]
    },
    "0x6000": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["US", "1", "OverlayRows"],
        "0x0011": ["US", "1", "OverlayColumns"],
        "0x0012": ["US", "1", "OverlayPlanes"],
        "0x0015": ["IS", "1", "NumberOfFramesInOverlay"],
        "0x0022": ["LO", "1", "OverlayDescription"],
        "0x0040": ["CS", "1", "OverlayType"],
        "0x0045": ["LO", "1", "OverlaySubtype"],
        "0x0050": ["SS", "2", "OverlayOrigin"],
        "0x0051": ["US", "1", "ImageFrameOrigin"],
        "0x0052": ["US", "1", "OverlayPlaneOrigin"],
        "0x0060": ["CS", "1", "OverlayCompressionCode"],
        "0x0061": ["SH", "1", "OverlayCompressionOriginator"],
        "0x0062": ["SH", "1", "OverlayCompressionLabel"],
        "0x0063": ["CS", "1", "OverlayCompressionDescription"],
        "0x0066": ["AT", "1-n", "OverlayCompressionStepPointers"],
        "0x0068": ["US", "1", "OverlayRepeatInterval"],
        "0x0069": ["US", "1", "OverlayBitsGrouped"],
        "0x0100": ["US", "1", "OverlayBitsAllocated"],
        "0x0102": ["US", "1", "OverlayBitPosition"],
        "0x0110": ["CS", "1", "OverlayFormat"],
        "0x0200": ["US", "1", "OverlayLocation"],
        "0x0800": ["CS", "1-n", "OverlayCodeLabel"],
        "0x0802": ["US", "1", "OverlayNumberOfTables"],
        "0x0803": ["AT", "1-n", "OverlayCodeTableLocation"],
        "0x0804": ["US", "1", "OverlayBitsForCodeWord"],
        "0x1001": ["CS", "1", "OverlayActivationLayer"],
        "0x1100": ["US", "1", "OverlayDescriptorGray"],
        "0x1101": ["US", "1", "OverlayDescriptorRed"],
        "0x1102": ["US", "1", "OverlayDescriptorGreen"],
        "0x1103": ["US", "1", "OverlayDescriptorBlue"],
        "0x1200": ["US", "1-n", "OverlaysGray"],
        "0x1201": ["US", "1-n", "OverlaysRed"],
        "0x1202": ["US", "1-n", "OverlaysGreen"],
        "0x1203": ["US", "1-n", "OverlaysBlue"],
        "0x1301": ["IS", "1", "ROIArea"],
        "0x1302": ["DS", "1", "ROIMean"],
        "0x1303": ["DS", "1", "ROIStandardDeviation"],
        "0x1500": ["LO", "1", "OverlayLabel"],
        "0x3000": ["ox", "1", "OverlayData"],
        "0x4000": ["LT", "1", "OverlayComments"]
    },
    "0x7FE0": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0008": ["OF", "1", "FloatPixelData"],
        "0x0009": ["OD", "1", "DoubleFloatPixelData"],
        "0x0010": ["ox", "1", "PixelData"],
        "0x0020": ["OW", "1", "CoefficientsSDVN"],
        "0x0030": ["OW", "1", "CoefficientsSDHN"],
        "0x0040": ["OW", "1", "CoefficientsSDDN"]
    },
    "0x7F00": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0x0010": ["ox", "1", "VariablePixelData"],
        "0x0011": ["US", "1", "VariableNextDataGroup"],
        "0x0020": ["OW", "1", "VariableCoefficientsSDVN"],
        "0x0030": ["OW", "1", "VariableCoefficientsSDHN"],
        "0x0040": ["OW", "1", "VariableCoefficientsSDDN"]
    },
    "0xFFFA": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0xFFFA": ["SQ", "1", "DigitalSignaturesSequence"]
    },
    "0xFFFC": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0xFFFC": ["OB", "1", "DataSetTrailingPadding"]
    },
    "0xFFFE": {
        "0x0000": ["UL", "1", "GenericGroupLength"],
        "0xE000": ["NONE", "1", "Item"],
        "0xE00D": ["NONE", "1", "ItemDelimitationItem"],
        "0xE0DD": ["NONE", "1", "SequenceDelimitationItem"]
    }
}, dwv.dicom.TagGroups = {
    x0000: "Command",
    x0002: "Meta Element",
    x0004: "File Set",
    x0008: "Identifying",
    x0009: "SPI Identifying",
    x0010: "Patient",
    x0012: "Clinical Trial",
    x0018: "Acquisition",
    x0019: "SPI Acquisition",
    x0020: "Image",
    x0021: "SPI Image",
    x0022: "Ophtalmology",
    x0028: "Image Presentation",
    x0032: "Study",
    x0038: "Visit",
    x003A: "Waveform",
    x0040: "Procedure",
    x0042: "Encapsulated Document",
    x0050: "Device Informations",
    x0054: "Nuclear Medicine",
    x0060: "Histogram",
    x0070: "Presentation State",
    x0072: "Hanging Protocol",
    x0088: "Storage",
    x0100: "Authorization",
    x0400: "Digital Signature",
    x1000: "Code Table",
    x1010: "Zonal Map",
    x2000: "Film Session",
    x2010: "Film Box",
    x2020: "Image Box",
    x2030: "Annotation",
    x2040: "Overlay Box",
    x2050: "Presentation LUT",
    x2100: "Print Job",
    x2110: "Printer",
    x2120: "Queue",
    x2130: "Print Content",
    x2200: "Media Creation",
    x3002: "RT Image",
    x3004: "RT Dose",
    x3006: "RT StructureSet",
    x3008: "RT Treatment",
    x300A: "RT Plan",
    x300C: "RT Relationship",
    x300E: "RT Approval",
    x4000: "Text",
    x4008: "Results",
    x4FFE: "MAC Parameters",
    x5000: "Curve",
    x5002: "Curve",
    x5004: "Curve",
    x5006: "Curve",
    x5008: "Curve",
    x500A: "Curve",
    x500C: "Curve",
    x500E: "Curve",
    x5400: "Waveform Data",
    x6000: "Overlays",
    x6002: "Overlays",
    x6004: "Overlays",
    x6008: "Overlays",
    x600A: "Overlays",
    x600C: "Overlays",
    x600E: "Overlays",
    xFFFC: "Generic",
    x7FE0: "Pixel Data",
    xFFFF: "Unknown"
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.filter = dwv.gui.filter || {}, dwv.gui.filter.base = dwv.gui.filter.base || {}, dwv.gui.base.Filter = function(a) {
    this.setup = function(b) {
        var c = dwv.html.createHtmlSelect("filterSelect", b, "filter");
        c.onchange = a.onChangeFilter;
        var d = dwv.html.createHiddenElement("li", "filterLi");
        d.className += " ui-block-b", d.appendChild(c);
        var e = a.getElement("toolList").getElementsByTagName("ul")[0];
        dwv.html.appendElement(e, d)
    }, this.display = function(b) {
        var c = a.getElement("filterLi");
        dwv.html.displayElement(c, b)
    }, this.initialise = function() {
        var b = a.getElement("filterSelect");
        b.selectedIndex = 0, dwv.gui.refreshElement(b)
    }
}, dwv.gui.base.Threshold = function(a) {
    var b = new dwv.gui.Slider(a);
    this.setup = function() {
        var c = dwv.html.createHiddenElement("li", "thresholdLi");
        c.className += " ui-block-c";
        var d = a.getElement("toolList").getElementsByTagName("ul")[0];
        d.appendChild(c), b.append(), dwv.gui.refreshElement(d)
    }, this.display = function(c) {
        c && b.initialise();
        var d = a.getElement("thresholdLi");
        dwv.html.displayElement(d, c)
    }, this.initialise = function() {}
}, dwv.gui.filter.base.createFilterApplyButton = function(a) {
    var b = document.createElement("button");
    return b.id = "runFilterButton", b.onclick = a.onRunFilter, b.setAttribute("style", "width:100%; margin-top:0.5em;"), b.setAttribute("class", "ui-btn ui-btn-b"), b.appendChild(document.createTextNode(dwv.i18n("basics.apply"))), b
}, dwv.gui.base.Sharpen = function(a) {
    this.setup = function() {
        var b = dwv.html.createHiddenElement("li", "sharpenLi");
        b.className += " ui-block-c", b.appendChild(dwv.gui.filter.base.createFilterApplyButton(a));
        var c = a.getElement("toolList").getElementsByTagName("ul")[0];
        dwv.html.appendElement(c, b)
    }, this.display = function(b) {
        var c = a.getElement("sharpenLi");
        dwv.html.displayElement(c, b)
    }
}, dwv.gui.base.Sobel = function(a) {
    this.setup = function() {
        var b = dwv.html.createHiddenElement("li", "sobelLi");
        b.className += " ui-block-c", b.appendChild(dwv.gui.filter.base.createFilterApplyButton(a));
        var c = a.getElement("toolList").getElementsByTagName("ul")[0];
        dwv.html.appendElement(c, b)
    }, this.display = function(b) {
        var c = a.getElement("sobelLi");
        dwv.html.displayElement(c, b)
    }
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.base.getWindowSize = function() {
    return {
        width: window.innerWidth,
        height: window.innerHeight - 147
    }
}, dwv.gui.base.displayProgress = function() {}, dwv.gui.base.getElement = function(a, b) {
    var c = document.getElementById(a),
        d = c.getElementsByClassName(b),
        e = d[d.length - 1];
    return "undefined" == typeof e && (e = document.getElementById(a + "-" + b)), e
}, dwv.gui.base.refreshElement = function() {}, dwv.gui.setSelected = function(a, b) {
    if (a) {
        var c = 0;
        for (c in a.options)
            if (a.options[c].value === b) break;
        a.selectedIndex = c, dwv.gui.refreshElement(a)
    }
}, dwv.gui.base.Slider = function(a) {
    this.append = function() {
        var b = 0,
            c = 1,
            d = document.createElement("input");
        d.id = "threshold-min", d.type = "range", d.max = c, d.min = b, d.value = b;
        var e = document.createElement("input");
        e.id = "threshold-max", e.type = "range", e.max = c, e.min = b, e.value = c;
        var f = document.createElement("div");
        f.id = "threshold-div", f.setAttribute("data-role", "rangeslider"), f.appendChild(d), f.appendChild(e), f.setAttribute("data-mini", "true"), a.getElement("thresholdLi").appendChild(f), $("#threshold-div").on("change", function() {
            a.onChangeMinMax({
                min: $("#threshold-min").val(),
                max: $("#threshold-max").val()
            })
        }), dwv.gui.refreshElement(a.getElement("toolList"))
    }, this.initialise = function() {
        var b = a.getImage().getDataRange().min,
            c = a.getImage().getDataRange().max,
            d = document.getElementById("threshold-min");
        d.max = c, d.min = b, d.value = b;
        var e = document.getElementById("threshold-max");
        e.max = c, e.min = b, e.value = c, dwv.gui.refreshElement(a.getElement("toolList"))
    }
}, dwv.gui.base.DicomTags = function(a) {
    this.initialise = function(b) {
        var c = a.getElement("tags");
        if (null !== c) {
            for (; c.hasChildNodes();) c.removeChild(c.firstChild);
            var d = dwv.html.toTable(b);
            d.className = "tagsTable", d.setAttribute("data-role", "table"), d.setAttribute("data-mode", "columntoggle"), d.setAttribute("data-column-btn-text", dwv.i18n("basics.columns") + "..."), c.appendChild(dwv.html.getHtmlSearchForm(d)), c.appendChild(d), dwv.gui.refreshElement(c)
        }
    }
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.base.appendVersionHtml = function(a) {
    var b = document.getElementsByClassName("dwv-version");
    if (b)
        for (var c = 0; c < b.length; ++c) b[c].appendChild(document.createTextNode(a))
}, dwv.gui.base.appendHelpHtml = function(a, b, c) {
    var d = "mouse";
    b && (d = "touch");
    for (var e = document.createElement("div"), f = window.location.pathname, g = f.substring(0, f.lastIndexOf("/")), h = null, i = Object.keys(a), j = 0; j < i.length; ++j) {
        h = a[i[j]];
        var k = document.createElement("h3");
        k.appendChild(document.createTextNode(h.getHelp().title));
        var l = document.createElement("div"),
            m = document.createElement("p");
        if (m.appendChild(document.createTextNode(h.getHelp().brief)), l.appendChild(m), h.getHelp()[d])
            for (var n = Object.keys(h.getHelp()[d]), o = 0; o < n.length; ++o) {
                var p = h.getHelp()[d][n[o]],
                    q = document.createElement("img");
                q.src = g + "/../../resources/" + n[o] + ".png", q.style["float"] = "left", q.style.margin = "0px 15px 15px 0px";
                var r = document.createElement("br");
                r.style.clear = "both";
                var s = document.createElement("p");
                s.appendChild(q), s.appendChild(document.createTextNode(p)), s.appendChild(r), l.appendChild(s)
            }
        if (b) {
            var t = document.createElement("div");
            t.setAttribute("data-role", "collapsible"), t.appendChild(k), t.appendChild(l), e.appendChild(t)
        } else e.id = "accordion", e.appendChild(k), e.appendChild(l)
    }
    var u = c.getElement("help"),
        v = document.createElement("p");
    v.appendChild(document.createTextNode(dwv.i18n("help.intro.p0"))), u.appendChild(v);
    var w = document.createElement("p");
    w.appendChild(document.createTextNode(dwv.i18n("help.intro.p1"))), u.appendChild(w);
    var x = document.createElement("p");
    x.appendChild(document.createTextNode(dwv.i18n("help.tool_intro"))), u.appendChild(x), u.appendChild(e)
};
var dwv = dwv || {};
dwv.html = dwv.html || {}, dwv.html.appendCell = function(a, b) {
    var c = a.insertCell(-1),
        d = b;
    (b instanceof Array || b instanceof Uint8Array || b instanceof Uint16Array || b instanceof Uint32Array) && (b.length > 10 && (b = Array.prototype.slice.call(b, 0, 10), b[10] = "..."), d = Array.prototype.join.call(b, ", ")), c.appendChild(document.createTextNode(d))
}, dwv.html.appendHCell = function(a, b) {
    var c = document.createElement("th");
    "value" !== b && "name" !== b && c.setAttribute("data-priority", "1"), c.appendChild(document.createTextNode(dwv.i18n("basics." + b))), a.appendChild(c)
}, dwv.html.appendRowForArray = function(a, b, c, d, e) {
    for (var f = null, g = 0; g < b.length; ++g) {
        var h = b[g];
        "number" == typeof h || "string" == typeof h || null === h || void 0 === h || c >= d ? (f || (f = a.insertRow(-1)), dwv.html.appendCell(f, h)) : dwv.html.appendRow(a, h, c + g, d, e)
    }
}, dwv.html.appendRowForObject = function(a, b, c, d, e) {
    for (var f = Object.keys(b), g = null, h = 0; h < f.length; ++h) {
        var i = b[f[h]];
        "number" == typeof i || "string" == typeof i || null === i || void 0 === i || c >= d ? (g || (g = a.insertRow(-1)), 0 === h && e && dwv.html.appendCell(g, e), dwv.html.appendCell(g, i)) : dwv.html.appendRow(a, i, c + h, d, f[h])
    }
    if (2 === c) {
        var j = a.createTHead(),
            k = j.insertRow(-1);
        e && dwv.html.appendHCell(k, "name");
        for (var l = 0; l < f.length; ++l) dwv.html.appendHCell(k, f[l])
    }
}, dwv.html.appendRow = function(a, b, c, d, e) {
    if (b instanceof Array) dwv.html.appendRowForArray(a, b, c + 1, d, e);
    else {
        if ("object" != typeof b) throw new Error("Unsupported input data type.");
        dwv.html.appendRowForObject(a, b, c + 1, d, e)
    }
}, dwv.html.toTable = function(a) {
    var b = document.createElement("table");
    return dwv.html.appendRow(b, a, 0, 2), b
}, dwv.html.getHtmlSearchForm = function(a) {
    var b = document.createElement("form");
    b.setAttribute("class", "filter");
    var c = document.createElement("input");
    return c.onkeyup = function() {
        dwv.html.filterTable(c, a)
    }, b.appendChild(c), b
}, dwv.html.filterTable = function(a, b) {
    dwv.html.dehighlight(b);
    for (var c = a.value.toLowerCase().split(" "), d = 0, e = 0, f = 1; f < b.rows.length; ++f) {
        e = "";
        for (var g = 0; g < c.length; ++g) d = b.rows[f].innerHTML.replace(/<[^>]+>/g, "").toLowerCase(), d.indexOf(c[g]) < 0 ? e = "none" : c[g].length && dwv.html.highlight(c[g], b.rows[f]), b.rows[f].style.display = e
    }
}, dwv.html.dehighlight = function(a) {
    for (var b = 0; b < a.childNodes.length; b++) {
        var c = a.childNodes[b];
        if (c.attributes && c.attributes["class"] && "highlighted" === c.attributes["class"].value) return void c.parentNode.parentNode.replaceChild(document.createTextNode(c.parentNode.innerHTML.replace(/<[^>]+>/g, "")), c.parentNode);
        3 !== c.nodeType && dwv.html.dehighlight(c)
    }
}, dwv.html.highlight = function(a, b) {
    for (var c = 0; c < b.childNodes.length; c++) {
        var d = b.childNodes[c];
        if (3 === d.nodeType) {
            var e = d.data,
                f = e.toLowerCase();
            if (f.indexOf(a) >= 0) {
                var g = document.createElement("span");
                d.parentNode.replaceChild(g, d);
                for (var h;
                    (h = f.indexOf(a)) !== -1;) g.appendChild(document.createTextNode(e.substr(0, h))), g.appendChild(dwv.html.createHighlightNode(document.createTextNode(e.substr(h, a.length)))), e = e.substr(h + a.length), f = f.substr(h + a.length);
                g.appendChild(document.createTextNode(e))
            }
        } else dwv.html.highlight(a, d)
    }
}, dwv.html.createHighlightNode = function(a) {
    var b = document.createElement("span");
    return b.setAttribute("class", "highlighted"), b.attributes["class"].value = "highlighted", b.appendChild(a), b
}, dwv.html.cleanNode = function(a) {
    for (; a.hasChildNodes();) a.removeChild(a.firstChild)
}, dwv.html.removeNode = function(a) {
    if (a) {
        dwv.html.cleanNode(a);
        var b = a.parentNode;
        b.removeChild(a)
    }
}, dwv.html.removeNodes = function(a) {
    for (var b = 0; b < a.length; ++b) dwv.html.removeNode(a[b])
}, dwv.html.createHtmlSelect = function(a, b, c, d) {
    var e = document.createElement("select");
    e.className = a;
    var f, g = "undefined" == typeof c ? "" : c + ".",
        h = "undefined" != typeof d,
        i = function(a) {
            var b = g + a + ".name",
                c = "";
            return c = h ? dwv.i18nExists(b) ? dwv.i18n(b) : a : dwv.i18n(b)
        };
    if (b instanceof Array)
        for (var j in b) f = document.createElement("option"), f.value = b[j], f.appendChild(document.createTextNode(i(b[j]))), e.appendChild(f);
    else {
        if ("object" != typeof b) throw new Error("Unsupported input list type.");
        for (var k in b) f = document.createElement("option"), f.value = k, f.appendChild(document.createTextNode(i(k))), e.appendChild(f)
    }
    return e
}, dwv.html.displayElement = function(a, b) {
    a.style.display = b ? "" : "none"
}, dwv.html.toggleDisplay = function(a) {
    "none" === a.style.display ? a.style.display = "" : a.style.display = "none"
}, dwv.html.appendElement = function(a, b) {
    a.appendChild(b), dwv.gui.refreshElement(a)
}, dwv.html.createHiddenElement = function(a, b) {
    var c = document.createElement(a);
    return c.className = b, c.style.display = "none", c
};
var dwv = dwv || {};
dwv.html = dwv.html || {}, dwv.html.Layer = function(a) {
    var b = null,
        c = null;
    this.getCanvas = function() {
        return a
    }, this.getContext = function() {
        return c
    }, this.getOffset = function() {
        return a.offset()
    };
    var d = null,
        e = {
            x: 0,
            y: 0
        };
    this.getOrigin = function() {
        return e
    };
    var f = {
        x: 1,
        y: 1
    };
    this.getZoom = function() {
        return f
    };
    var g = {
        x: 0,
        y: 0
    };
    this.setWidth = function(b) {
        a.width = b
    }, this.setHeight = function(b) {
        a.height = b
    }, this.zoom = function(a, b, c, d) {
        e.x = c - (c - e.x) * (a / f.x), e.y = d - (d - e.y) * (b / f.y), f.x = a, f.y = b
    }, this.translate = function(a, b) {
        g.x = a, g.y = b
    }, this.setImageData = function(a) {
        d = a, b.getContext("2d").putImageData(d, 0, 0)
    }, this.resetLayout = function(a) {
        e.x = 0, e.y = 0, f.x = a, f.y = a, g.x = 0, g.y = 0
    }, this.displayToIndex = function(a) {
        return {
            x: (a.x - e.x) / f.x - g.x,
            y: (a.y - e.y) / f.y - g.y
        }
    }, this.draw = function() {
        c.save(), c.setTransform(1, 0, 0, 1, 0, 0), c.clearRect(0, 0, a.width, a.height), c.restore(), c.setTransform(f.x, 0, 0, f.y, e.x + g.x * f.x, e.y + g.y * f.y), c.drawImage(b, 0, 0)
    }, this.initialise = function(e, f) {
        return a.getContext ? (c = a.getContext("2d")) ? (a.width = e, a.height = f, c.clearRect(0, 0, a.width, a.height), d = c.getImageData(0, 0, a.width, a.height), b = document.createElement("canvas"), b.width = e, void(b.height = f)) : void alert("Error: failed to get the 2D context.") : void alert("Error: no canvas.getContext method.")
    }, this.fillContext = function() {
        c.fillRect(0, 0, a.width, a.height)
    }, this.clear = function() {
        c.clearRect(0, 0, a.width, a.height), d = c.getImageData(0, 0, a.width, a.height), this.resetLayout()
    }, this.merge = function(b) {
        for (var c = b.getContext().getImageData(0, 0, a.width, a.height), g = 0, h = 0, i = 0, j = 0, k = 0, l = 0; l < a.height; ++l) {
            h = parseInt(e.y + l * f.y, 10) * a.width, j = l * a.width;
            for (var m = 0; m < a.width; ++m) g = 4 * (parseInt(e.x + m * f.x, 10) + h), i = 4 * (m + j), k = c.data[g + 3], 0 !== k && (d.data[i] = c.data[g], d.data[i + 1] = c.data[g + 1], d.data[i + 2] = c.data[g + 2], d.data[i + 3] = k)
        }
        b.clear(), this.draw()
    }, this.setLineColour = function(a) {
        c.fillStyle = a, c.strokeStyle = a
    }, this.setStyleDisplay = function(b) {
        b === !0 ? a.style.display = "" : a.style.display = "none"
    }, this.isVisible = function() {
        return "none" !== a.style.display
    }, this.align = function(b) {
        a.style.top = b.getCanvas().offsetTop, a.style.left = b.getCanvas().offsetLeft
    }
}, dwv.html.getEventOffset = function(a) {
    var b = [],
        c = 0,
        d = 0;
    if (a.targetTouches) {
        for (var e = 0, f = 0, g = a.targetTouches[0].target.offsetParent; g;) isNaN(g.offsetLeft) || (e += g.offsetLeft), isNaN(g.offsetTop) || (f += g.offsetTop), g = g.offsetParent;
        for (var h = null, i = 0; i < a.targetTouches.length; ++i) h = a.targetTouches[i], c = h.pageX - e, d = h.pageY - f, b.push({
            x: c,
            y: d
        })
    } else c = void 0 === a.offsetX ? a.layerX : a.offsetX, d = void 0 === a.offsetY ? a.layerY : a.offsetY, b.push({
        x: c,
        y: d
    });
    return b
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.base.Loadbox = function(a, b) {
    var c = null;
    this.setup = function() {
        c = dwv.html.createHtmlSelect("loaderSelect", b, "io"), c.onchange = a.onChangeLoader;
        for (var d = a.getElement("loaderlist"); d.hasChildNodes();) d.removeChild(d.firstChild);
        d.appendChild(c), dwv.gui.refreshElement(d)
    }, this.displayLoader = function(a) {
        for (var c = Object.keys(b), d = 0; d < c.length; ++d) c[d] === a ? b[c[d]].display(!0) : b[c[d]].display(!1)
    }, this.reset = function() {
        var a = Object.keys(b);
        this.displayLoader(a[0]), c && (c.selectedIndex = 0)
    }
}, dwv.gui.base.FileLoad = function(a) {
    function b(b) {
        "function" == typeof c.onchange && c.onchange(b), a.onChangeFiles(b)
    }
    var c = this;
    this.setup = function() {
        var c = document.createElement("input");
        c.onchange = b, c.type = "file", c.multiple = !0, c.className = "imagefiles", c.setAttribute("data-clear-btn", "true"), c.setAttribute("data-mini", "true");
        var d = document.createElement("div");
        d.className = "imagefilesdiv", d.style.display = "none", d.appendChild(c);
        var e = a.getElement("loaderlist");
        e.appendChild(d), dwv.gui.refreshElement(e)
    }, this.display = function(b) {
        var c = a.getElement("loaderlist"),
            d = c.getElementsByClassName("imagefilesdiv")[0];
        d.style.display = b ? "" : "none"
    }
}, dwv.gui.base.UrlLoad = function(a) {
    function b(b) {
        "function" == typeof c.onchange && c.onchange(b), a.onChangeURL(b)
    }
    var c = this;
    this.setup = function() {
        var c = document.createElement("input");
        c.onchange = b, c.type = "url", c.className = "imageurl", c.setAttribute("data-clear-btn", "true"), c.setAttribute("data-mini", "true");
        var d = document.createElement("div");
        d.className = "imageurldiv", d.style.display = "none", d.appendChild(c);
        var e = a.getElement("loaderlist");
        e.appendChild(d), dwv.gui.refreshElement(e)
    }, this.display = function(b) {
        var c = a.getElement("loaderlist"),
            d = c.getElementsByClassName("imageurldiv")[0];
        d.style.display = b ? "" : "none"
    }
};
var dwv = dwv || {};
dwv.html = dwv.html || {}, dwv.html.Style = function() {
    var a = 12,
        b = "Verdana",
        c = "#fff",
        d = "",
        e = 1,
        f = 2;
    this.getFontFamily = function() {
        return b
    }, this.getFontSize = function() {
        return a
    }, this.getStrokeWidth = function() {
        return f
    }, this.getTextColour = function() {
        return c
    }, this.getLineColour = function() {
        return d
    }, this.setLineColour = function(a) {
        d = a
    }, this.setScale = function(a) {
        e = a
    }, this.scale = function(a) {
        return a / e
    }
}, dwv.html.Style.prototype.getFontStr = function() {
    return "normal " + this.getFontSize() + "px sans-serif"
}, dwv.html.Style.prototype.getLineHeight = function() {
    return this.getFontSize() + this.getFontSize() / 5
}, dwv.html.Style.prototype.getScaledFontSize = function() {
    return this.scale(this.getFontSize())
}, dwv.html.Style.prototype.getScaledStrokeWidth = function() {
    return this.scale(this.getStrokeWidth())
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.base.Toolbox = function(a) {
    this.setup = function(b) {
        var c = dwv.html.createHtmlSelect("toolSelect", b, "tool");
        c.onchange = a.onChangeTool;
        var d = document.createElement("li");
        d.className = "toolLi ui-block-a", d.style.display = "none", d.appendChild(c);
        var e = document.createElement("ul");
        e.appendChild(d), e.className = "ui-grid-b";
        var f = a.getElement("toolList");
        f.appendChild(e), dwv.gui.refreshElement(f)
    }, this.display = function(b) {
        var c = a.getElement("toolLi");
        dwv.html.displayElement(c, b)
    }, this.initialise = function(b) {
        for (var c = a.getElement("toolSelect"), d = c.options, e = -1, f = 0; f < d.length; ++f) b[f] ? (e === -1 && (e = f), d[f].style.display = "") : d[f].style.display = "none";
        c.selectedIndex = e, dwv.gui.refreshElement(c)
    }
}, dwv.gui.base.WindowLevel = function(a) {
    this.setup = function() {
        var b = dwv.html.createHtmlSelect("presetSelect", []);
        b.onchange = a.onChangeWindowLevelPreset;
        var c = dwv.html.createHtmlSelect("colourMapSelect", dwv.tool.colourMaps, "colourmap");
        c.onchange = a.onChangeColourMap;
        var d = document.createElement("li");
        d.className = "wlLi ui-block-b", d.style.display = "none", d.appendChild(b);
        var e = document.createElement("li");
        e.className = "cmLi ui-block-c", e.style.display = "none", e.appendChild(c);
        var f = a.getElement("toolList").getElementsByTagName("ul")[0];
        f.appendChild(d), f.appendChild(e), dwv.gui.refreshElement(f)
    }, this.display = function(b) {
        var c = a.getElement("wlLi");
        dwv.html.displayElement(c, b), c = a.getElement("cmLi"), dwv.html.displayElement(c, b)
    }, this.initialise = function() {
        var b = dwv.html.createHtmlSelect("presetSelect", a.getViewController().getPresets(), "wl.presets", !0);
        b.onchange = a.onChangeWindowLevelPreset, b.title = "Select w/l preset.";
        var c = a.getElement("wlLi");
        dwv.html.cleanNode(c), c.appendChild(b), dwv.gui.refreshElement(c);
        var d = a.getElement("colourMapSelect");
        d.selectedIndex = 0, "MONOCHROME1" === a.getImage().getPhotometricInterpretation() && (d.selectedIndex = 1), dwv.gui.refreshElement(d)
    }
}, dwv.gui.base.Draw = function(a) {
    var b = ["Yellow", "Red", "White", "Green", "Blue", "Lime", "Fuchsia", "Black"];
    this.getColours = function() {
        return b
    }, this.setup = function(c) {
        var d = dwv.html.createHtmlSelect("shapeSelect", c, "shape");
        d.onchange = a.onChangeShape;
        var e = dwv.html.createHtmlSelect("colourSelect", b, "colour");
        e.onchange = a.onChangeLineColour;
        var f = document.createElement("li");
        f.className = "shapeLi ui-block-c", f.style.display = "none", f.appendChild(d);
        var g = document.createElement("li");
        g.className = "colourLi ui-block-b", g.style.display = "none", g.appendChild(e);
        var h = a.getElement("toolList").getElementsByTagName("ul")[0];
        h.appendChild(f), h.appendChild(g), dwv.gui.refreshElement(h)
    }, this.display = function(b) {
        var c = a.getElement("colourLi");
        dwv.html.displayElement(c, b), c = a.getElement("shapeLi"), dwv.html.displayElement(c, b)
    }, this.initialise = function() {
        var b = a.getElement("shapeSelect");
        b.selectedIndex = 0, dwv.gui.refreshElement(b);
        var c = a.getElement("colourSelect");
        c.selectedIndex = 0, dwv.gui.refreshElement(c)
    }
}, dwv.gui.base.Livewire = function(a) {
    var b = ["Yellow", "Red", "White", "Green", "Blue", "Lime", "Fuchsia", "Black"];
    this.getColours = function() {
        return b
    }, this.setup = function() {
        var c = dwv.html.createHtmlSelect("lwColourSelect", b, "colour");
        c.onchange = a.onChangeLineColour;
        var d = document.createElement("li");
        d.className = "lwColourLi ui-block-b", d.style.display = "none", d.appendChild(c);
        var e = a.getElement("toolList").getElementsByTagName("ul")[0];
        e.appendChild(d), dwv.gui.refreshElement(e)
    }, this.display = function(b) {
        var c = a.getElement("lwColourLi");
        dwv.html.displayElement(c, b)
    }, this.initialise = function() {
        var b = a.getElement("lwColourSelect");
        b.selectedIndex = 0, dwv.gui.refreshElement(b)
    }
}, dwv.gui.base.ZoomAndPan = function(a) {
    this.setup = function() {
        var b = document.createElement("button");
        b.className = "zoomResetButton", b.name = "zoomResetButton", b.onclick = a.onZoomReset, b.setAttribute("style", "width:100%; margin-top:0.5em;"), b.setAttribute("class", "ui-btn ui-btn-b");
        var c = document.createTextNode(dwv.i18n("basics.reset"));
        b.appendChild(c);
        var d = document.createElement("li");
        d.className = "zoomLi ui-block-c", d.style.display = "none", d.appendChild(b);
        var e = a.getElement("toolList").getElementsByTagName("ul")[0];
        e.appendChild(d), dwv.gui.refreshElement(e)
    }, this.display = function(b) {
        var c = a.getElement("zoomLi");
        dwv.html.displayElement(c, b)
    }
}, dwv.gui.base.Scroll = function(a) {
    this.setup = function() {
        var b = document.createElement("li");
        b.className = "scrollLi ui-block-c", b.style.display = "none";
        var c = a.getElement("toolList").getElementsByTagName("ul")[0];
        c.appendChild(b), dwv.gui.refreshElement(c)
    }, this.display = function(b) {
        var c = a.getElement("scrollLi");
        dwv.html.displayElement(c, b)
    }
};
var dwv = dwv || {};
dwv.gui = dwv.gui || {}, dwv.gui.base = dwv.gui.base || {}, dwv.gui.base.Undo = function(a) {
    this.setup = function() {
        var b = document.createElement("p");
        b.appendChild(document.createTextNode("History:")), b.appendChild(document.createElement("br"));
        var c = document.createElement("select");
        c.className = "history_list", c.name = "history_list", c.multiple = "multiple", b.appendChild(c);
        for (var d = a.getElement("history"); d.hasChildNodes();) d.removeChild(d.firstChild);
        d.appendChild(b), dwv.gui.refreshElement(d)
    }, this.initialise = function() {
        var b = a.getElement("history_list");
        if (b && 0 !== b.length)
            for (var c = b.length - 1; c >= 0; --c) b.remove(c);
        dwv.gui.refreshElement(b)
    }, this.addCommandToUndoHtml = function(b) {
        var c = a.getElement("history_list"),
            d = c.length - (c.selectedIndex + 1);
        if (d > 0)
            for (var e = 0; e < d; ++e) c.remove(c.length - 1);
        var f = document.createElement("option");
        f.text = b, f.value = b, c.add(f), c.selectedIndex++, dwv.gui.refreshElement(c)
    }, this.enableInUndoHtml = function(b) {
        var c, d = a.getElement("history_list");
        b ? (d.selectedIndex++, c = d.options[d.selectedIndex], c.disabled = !1) : (c = d.options[d.selectedIndex], c.disabled = !0, d.selectedIndex--), dwv.gui.refreshElement(d)
    }
};
var dwv = dwv || {};
dwv.image = dwv.image || {}, dwv.image.filter = dwv.image.filter || {}, dwv.image.filter.Threshold = function() {
    var a = 0,
        b = 0;
    this.getMin = function() {
        return a
    }, this.setMin = function(b) {
        a = b
    }, this.getMax = function() {
        return b
    }, this.setMax = function(a) {
        b = a
    }, this.getName = function() {
        return "Threshold"
    };
    var c = null;
    this.setOriginalImage = function(a) {
        c = a
    }, this.getOriginalImage = function() {
        return c
    }
}, dwv.image.filter.Threshold.prototype.update = function() {
    var a = this.getOriginalImage(),
        b = a.getDataRange().min,
        c = this,
        d = function(a) {
            return a < c.getMin() || a > c.getMax() ? b : a
        };
    return a.transform(d)
}, dwv.image.filter.Sharpen = function() {
    this.getName = function() {
        return "Sharpen"
    };
    var a = null;
    this.setOriginalImage = function(b) {
        a = b
    }, this.getOriginalImage = function() {
        return a
    }
}, dwv.image.filter.Sharpen.prototype.update = function() {
    var a = this.getOriginalImage();
    return a.convolute2D([0, -1, 0, -1, 5, -1, 0, -1, 0])
}, dwv.image.filter.Sobel = function() {
    this.getName = function() {
        return "Sobel"
    };
    var a = null;
    this.setOriginalImage = function(b) {
        a = b
    }, this.getOriginalImage = function() {
        return a
    }
}, dwv.image.filter.Sobel.prototype.update = function() {
    var a = this.getOriginalImage(),
        b = a.convolute2D([1, 0, -1, 2, 0, -2, 1, 0, -1]),
        c = a.convolute2D([1, 2, 1, 0, 0, 0, -1, -2, -1]);
    return b.compose(c, function(a, b) {
        return Math.sqrt(a * a + b * b)
    })
};
var dwv = dwv || {};
dwv.image = dwv.image || {}, dwv.image.Size = function(a, b, c) {
    this.getNumberOfColumns = function() {
        return a
    }, this.getNumberOfRows = function() {
        return b
    }, this.getNumberOfSlices = function() {
        return c || 1
    }
}, dwv.image.Size.prototype.getSliceSize = function() {
    return this.getNumberOfColumns() * this.getNumberOfRows()
}, dwv.image.Size.prototype.getTotalSize = function() {
    return this.getSliceSize() * this.getNumberOfSlices()
}, dwv.image.Size.prototype.equals = function(a) {
    return null !== a && this.getNumberOfColumns() === a.getNumberOfColumns() && this.getNumberOfRows() === a.getNumberOfRows() && this.getNumberOfSlices() === a.getNumberOfSlices()
}, dwv.image.Size.prototype.isInBounds = function(a, b, c) {
    return !(a < 0 || a > this.getNumberOfColumns() - 1 || b < 0 || b > this.getNumberOfRows() - 1 || c < 0 || c > this.getNumberOfSlices() - 1)
}, dwv.image.Spacing = function(a, b, c) {
    this.getColumnSpacing = function() {
        return a
    }, this.getRowSpacing = function() {
        return b
    }, this.getSliceSpacing = function() {
        return c || 1
    }
}, dwv.image.Spacing.prototype.equals = function(a) {
    return null !== a && this.getColumnSpacing() === a.getColumnSpacing() && this.getRowSpacing() === a.getRowSpacing() && this.getSliceSpacing() === a.getSliceSpacing()
}, dwv.image.Geometry = function(a, b, c) {
    "undefined" == typeof a && (a = new dwv.math.Point3D(0, 0, 0));
    var d = [a];
    this.getOrigin = function() {
        return a
    }, this.getOrigins = function() {
        return d
    }, this.getSize = function() {
        return b
    }, this.getSpacing = function() {
        return c
    }, this.getSliceIndex = function(a) {
        for (var b = 0, c = Math.abs(d[0].getZ() - a.getZ()), e = 0, f = 0; f < d.length; ++f) e = Math.abs(d[f].getZ() - a.getZ()), e < c && (c = e, b = f);
        e = d[b].getZ() - a.getZ();
        var g = e > 0 ? b : b + 1;
        return g
    }, this.appendOrigin = function(a, c) {
        d.splice(c, 0, a), b = new dwv.image.Size(b.getNumberOfColumns(), b.getNumberOfRows(), b.getNumberOfSlices() + 1)
    }
}, dwv.image.Geometry.prototype.equals = function(a) {
    return null !== a && this.getOrigin() === a.getOrigin() && this.getSize() === a.getSize() && this.getSpacing() === a.getSpacing()
}, dwv.image.Geometry.prototype.indexToOffset = function(a) {
    var b = this.getSize();
    return a.getI() + a.getJ() * b.getNumberOfColumns() + a.getK() * b.getSliceSize()
}, dwv.image.Geometry.prototype.indexToWorld = function(a) {
    var b = this.getOrigin(),
        c = this.getSpacing();
    return new dwv.math.Point3D(b.getX() + a.getI() * c.getColumnSpacing(), b.getY() + a.getJ() * c.getRowSpacing(), b.getZ() + a.getK() * c.getSliceSpacing())
}, dwv.image.Geometry.prototype.worldToIndex = function(a) {
    var b = this.getOrigin(),
        c = this.getSpacing();
    return new dwv.math.Point3D(a.getX() / c.getColumnSpacing() - b.getX(), a.getY() / c.getRowSpacing() - b.getY(), a.getZ() / c.getSliceSpacing() - b.getZ())
};
var dwv = dwv || {};
dwv.image = dwv.image || {}, dwv.image.RescaleSlopeAndIntercept = function(a, b) {
    this.getSlope = function() {
        return a
    }, this.getIntercept = function() {
        return b
    }, this.apply = function(c) {
        return c * a + b
    }
}, dwv.image.RescaleSlopeAndIntercept.prototype.equals = function(a) {
    return null !== a && this.getSlope() === a.getSlope() && this.getIntercept() === a.getIntercept()
}, dwv.image.RescaleSlopeAndIntercept.prototype.toString = function() {
    return this.getSlope() + ", " + this.getIntercept()
}, dwv.image.RescaleSlopeAndIntercept.prototype.isID = function() {
    return 1 === this.getSlope() && 0 === this.getIntercept()
}, dwv.image.Image = function(a, b) {
    this.getNumberOfFrames = function() {
        return b.length
    };
    for (var c = [], d = 0, e = a.getSize().getNumberOfSlices(); d < e; ++d) c.push(new dwv.image.RescaleSlopeAndIntercept(1, 0));
    var f = !0,
        g = !0,
        h = "MONOCHROME2",
        i = 0,
        j = b[0].length / a.getSize().getTotalSize(),
        k = {},
        l = null,
        m = null,
        n = null;
    this.getGeometry = function() {
        return a
    }, this.getBuffer = function() {
        return b
    }, this.getFrame = function(a) {
        return b[a]
    }, this.getRescaleSlopeAndIntercept = function(a) {
        return c[a]
    }, this.setRescaleSlopeAndIntercept = function(a, b) {
        "undefined" == typeof b && (b = 0), c[b] = a, f = !0, g = !0;
        for (var d = 0, e = c.length; d < e; ++d) c[d].isID() || (f = !1), d > 0 && !c[d].equals(c[d - 1]) && (g = !1)
    }, this.isIdentityRSI = function() {
        return f
    }, this.isConstantRSI = function() {
        return g
    }, this.getPhotometricInterpretation = function() {
        return h
    }, this.setPhotometricInterpretation = function(a) {
        h = a
    }, this.getPlanarConfiguration = function() {
        return i
    }, this.setPlanarConfiguration = function(a) {
        i = a
    }, this.getNumberOfComponents = function() {
        return j
    }, this.getMeta = function() {
        return k
    }, this.setMeta = function(a) {
        k = a
    }, this.getValueAtOffset = function(a, c) {
        return b[c][a]
    }, this.clone = function() {
        for (var a = [], c = 0, d = this.getNumberOfFrames(); c < d; ++c) a[c] = b[c].slice(0);
        for (var e = new dwv.image.Image(this.getGeometry(), a), f = this.getGeometry().getSize().getNumberOfSlices(), g = 0; g < f; ++g) e.setRescaleSlopeAndIntercept(this.getRescaleSlopeAndIntercept(g), g);
        return e.setPhotometricInterpretation(this.getPhotometricInterpretation()), e.setPlanarConfiguration(this.getPlanarConfiguration()), e.setMeta(this.getMeta()), e
    }, this.appendSlice = function(d, e) {
        if (null === d) throw new Error("Cannot append null slice");
        var f = d.getGeometry().getSize(),
            g = a.getSize();
        if (1 !== f.getNumberOfSlices()) throw new Error("Cannot append more than one slice");
        if (g.getNumberOfColumns() !== f.getNumberOfColumns()) throw new Error("Cannot append a slice with different number of columns");
        if (g.getNumberOfRows() !== f.getNumberOfRows()) throw new Error("Cannot append a slice with different number of rows");
        if (h !== d.getPhotometricInterpretation()) throw new Error("Cannot append a slice with different photometric interpretation");
        for (var i in k)
            if (k[i] !== d.getMeta()[i]) throw new Error("Cannot append a slice with different " + i);
        var j = "undefined" == typeof e ? 0 : e,
            l = 1;
        "RGB" !== h && "YBR_FULL_422" !== h || (l = 3);
        var m = l * g.getSliceSize(),
            n = new Int16Array(m * (g.getNumberOfSlices() + 1)),
            o = a.getSliceIndex(d.getGeometry().getOrigin());
        if (0 === o) n.set(d.getFrame(j)), n.set(b[j], m);
        else if (o === g.getNumberOfSlices()) n.set(b[j]), n.set(d.getFrame(j), g.getNumberOfSlices() * m);
        else {
            var p = o * m;
            n.set(b[j].subarray(0, p - 1)), n.set(d.getFrame(j), p), n.set(b[j].subarray(p), p + m)
        }
        return a.appendOrigin(d.getGeometry().getOrigin(), o), c.splice(o, 0, d.getRescaleSlopeAndIntercept(0)), b[j] = n, o
    }, this.getDataRange = function() {
        return l || (l = this.calculateDataRange()), l
    }, this.getRescaledDataRange = function() {
        return m || (m = this.calculateRescaledDataRange()), m
    }, this.getHistogram = function() {
        if (!n) {
            var a = this.calculateHistogram();
            l = a.dataRange, m = a.rescaledDataRange, n = a.histogram
        }
        return n
    }
}, dwv.image.Image.prototype.getValue = function(a, b, c, d) {
    var e = d || 0,
        f = new dwv.math.Index3D(a, b, c);
    return this.getValueAtOffset(this.getGeometry().indexToOffset(f), e)
}, dwv.image.Image.prototype.getRescaledValue = function(a, b, c, d) {
    var e = d || 0,
        f = this.getValue(a, b, c, e);
    return this.isIdentityRSI() || (f = this.getRescaleSlopeAndIntercept(c).apply(f)), f
}, dwv.image.Image.prototype.calculateDataRange = function() {
    for (var a = this.getGeometry().getSize().getTotalSize(), b = this.getNumberOfFrames(), c = this.getValueAtOffset(0, 0), d = c, e = 0, f = 0; f < b; ++f)
        for (var g = 0; g < a; ++g) e = this.getValueAtOffset(g, f),
            e > d && (d = e), e < c && (c = e);
    return {
        min: c,
        max: d
    }
}, dwv.image.Image.prototype.calculateRescaledDataRange = function() {
    if (this.isIdentityRSI()) return this.getDataRange();
    if (this.isConstantRSI()) {
        var a = this.getDataRange(),
            b = this.getRescaleSlopeAndIntercept(0).apply(a.min),
            c = this.getRescaleSlopeAndIntercept(0).apply(a.max);
        return {
            min: b < c ? b : c,
            max: b > c ? b : c
        }
    }
    for (var d = this.getGeometry().getSize(), e = this.getRescaledValue(0, 0, 0), f = e, g = 0, h = 0, i = this.getNumberOfFrames(); h < i; ++h)
        for (var j = 0, k = d.getNumberOfSlices(); j < k; ++j)
            for (var l = 0, m = d.getNumberOfRows(); l < m; ++l)
                for (var n = 0, o = d.getNumberOfColumns(); n < o; ++n) g = this.getRescaledValue(n, l, j, h), g > f && (f = g), g < e && (e = g);
    return {
        min: e,
        max: f
    }
}, dwv.image.Image.prototype.calculateHistogram = function() {
    for (var a = this.getGeometry().getSize(), b = [], c = this.getValue(0, 0, 0), d = c, e = 0, f = this.getRescaledValue(0, 0, 0), g = f, h = 0, i = 0, j = this.getNumberOfFrames(); i < j; ++i)
        for (var k = 0, l = a.getNumberOfSlices(); k < l; ++k)
            for (var m = 0, n = a.getNumberOfRows(); m < n; ++m)
                for (var o = 0, p = a.getNumberOfColumns(); o < p; ++o) e = this.getValue(o, m, k, i), e > d && (d = e), e < c && (c = e), h = this.getRescaleSlopeAndIntercept(k).apply(e), h > g && (g = h), h < f && (f = h), b[h] = (b[h] || 0) + 1;
    for (var q = {
            min: c,
            max: d
        }, r = {
            min: f,
            max: g
        }, s = [], t = f; t <= g; ++t) s.push([t, b[t] || 0]);
    return {
        dataRange: q,
        rescaledDataRange: r,
        histogram: s
    }
}, dwv.image.Image.prototype.convolute2D = function(a) {
    if (9 !== a.length) throw new Error("The convolution matrix does not have a length of 9; it has " + a.length);
    var b = this.clone(),
        c = b.getBuffer(),
        d = this.getGeometry().getSize(),
        e = d.getNumberOfColumns(),
        f = d.getNumberOfRows(),
        g = d.getNumberOfSlices(),
        h = this.getNumberOfFrames(),
        i = this.getNumberOfComponents(),
        j = 1,
        k = 1,
        l = d.getTotalSize();
    3 === i && (l *= 3, 0 === this.getPlanarConfiguration() ? j = 3 : k = d.getTotalSize());
    var m = [];
    m[0] = (-e - 1) * j, m[1] = -e * j, m[2] = (-e + 1) * j, m[3] = -j, m[4] = 0, m[5] = 1 * j, m[6] = (e - 1) * j, m[7] = e * j, m[8] = (e + 1) * j;
    var n = [];
    n[0] = m[4], n[1] = m[4], n[2] = m[5], n[3] = m[4], n[4] = m[4], n[5] = m[5], n[6] = m[7], n[7] = m[7], n[8] = m[8];
    var o = [];
    o[0] = m[1], o[1] = m[1], o[2] = m[2], o[3] = m[4], o[4] = m[4], o[5] = m[5], o[6] = m[7], o[7] = m[7], o[8] = m[8];
    var p = [];
    p[0] = m[1], p[1] = m[1], p[2] = m[2], p[3] = m[4], p[4] = m[4], p[5] = m[5], p[6] = m[4], p[7] = m[4], p[8] = m[5];
    var q = [];
    q[0] = m[3], q[1] = m[4], q[2] = m[5], q[3] = m[3], q[4] = m[4], q[5] = m[5], q[6] = m[6], q[7] = m[7], q[8] = m[8];
    var r = [];
    r[0] = m[0], r[1] = m[1], r[2] = m[2], r[3] = m[3], r[4] = m[4], r[5] = m[5], r[6] = m[3], r[7] = m[4], r[8] = m[5];
    var s = [];
    s[0] = m[3], s[1] = m[4], s[2] = m[4], s[3] = m[3], s[4] = m[4], s[5] = m[4], s[6] = m[6], s[7] = m[7], s[8] = m[7];
    var t = [];
    t[0] = m[0], t[1] = m[1], t[2] = m[1], t[3] = m[3], t[4] = m[4], t[5] = m[4], t[6] = m[6], t[7] = m[7], t[8] = m[7];
    var u = [];
    u[0] = m[0], u[1] = m[1], u[2] = m[1], u[3] = m[3], u[4] = m[4], u[5] = m[4], u[6] = m[3], u[7] = m[4], u[8] = m[4];
    for (var v = 0, w = 0, x = [], y = 0; y < h; y++) {
        v = y * l;
        for (var z = 0; z < i; z++) {
            v += z * k;
            for (var A = 0; A < g; A++)
                for (var B = 0; B < f; B++)
                    for (var C = 0; C < e; C++) {
                        x = m, 0 === C && 0 === B ? x = n : 0 === C && B === f - 1 ? x = p : C === e - 1 && 0 === B ? x = s : C === e - 1 && B === f - 1 ? x = u : 0 === C && B !== f - 1 && 0 !== B ? x = o : C === e - 1 && B !== f - 1 && 0 !== B ? x = t : 0 !== C && C !== e - 1 && 0 === B ? x = q : 0 !== C && C !== e - 1 && B === f - 1 && (x = r), w = 0;
                        for (var D = 0; D < 9; ++D) w += this.getValueAtOffset(v + x[D], y) * a[D];
                        c[y][v] = w, v += j
                    }
        }
    }
    return b
}, dwv.image.Image.prototype.transform = function(a) {
    for (var b = this.clone(), c = b.getBuffer(), d = 0, e = this.getNumberOfFrames(); d < e; ++d)
        for (var f = 0, g = c[d].length; f < g; ++f) c[d][f] = a(b.getValueAtOffset(f, d));
    return b
}, dwv.image.Image.prototype.compose = function(a, b) {
    for (var c = this.clone(), d = c.getBuffer(), e = 0, f = this.getNumberOfFrames(); e < f; ++e)
        for (var g = 0, h = d[e].length; g < h; ++g) d[e][g] = Math.floor(b(this.getValueAtOffset(g, e), a.getValueAtOffset(g, e)));
    return c
}, dwv.image.Image.prototype.quantifyLine = function(a) {
    var b = this.getGeometry().getSpacing(),
        c = a.getWorldLength(b.getColumnSpacing(), b.getRowSpacing());
    return {
        length: c
    }
}, dwv.image.Image.prototype.quantifyRect = function(a) {
    for (var b = this.getGeometry().getSpacing(), c = a.getWorldSurface(b.getColumnSpacing(), b.getRowSpacing()), d = [], e = parseInt(a.getBegin().getY(), 10), f = parseInt(a.getEnd().getY(), 10), g = parseInt(a.getBegin().getX(), 10), h = parseInt(a.getEnd().getX(), 10), i = e; i < f; ++i)
        for (var j = g; j < h; ++j) d.push(this.getValue(j, i, 0));
    var k = dwv.math.getStats(d);
    return {
        surface: c,
        min: k.min,
        max: k.max,
        mean: k.mean,
        stdDev: k.stdDev
    }
}, dwv.image.Image.prototype.quantifyEllipse = function(a) {
    var b = this.getGeometry().getSpacing(),
        c = a.getWorldSurface(b.getColumnSpacing(), b.getRowSpacing());
    return {
        surface: c
    }
}, dwv.image.ImageFactory = function() {}, dwv.image.ImageFactory.prototype.create = function(a, b) {
    var c = a.getFromKey("x00280011");
    if (!c) throw new Error("Missing or empty DICOM image number of columns");
    var d = a.getFromKey("x00280010");
    if (!d) throw new Error("Missing or empty DICOM image number of rows");
    var e = new dwv.image.Size(c, d),
        f = 1,
        g = 1,
        h = a.getFromKey("x00280030"),
        i = a.getFromKey("x00181164");
    h && h[0] && h[1] ? (f = parseFloat(h[0]), g = parseFloat(h[1])) : i && i[0] && i[1] && (f = parseFloat(i[0]), g = parseFloat(i[1]));
    var j = new dwv.image.Spacing(g, f),
        k = a.getFromKey("x00020010"),
        l = dwv.dicom.cleanString(k),
        m = dwv.dicom.isJpeg2000TransferSyntax(l),
        n = dwv.dicom.isJpegBaselineTransferSyntax(l),
        o = dwv.dicom.isJpegLosslessTransferSyntax(l),
        p = new Array(0, 0, 0),
        q = a.getFromKey("x00200032");
    q && (p = [parseFloat(q[0]), parseFloat(q[1]), parseFloat(q[2])]);
    var r = new dwv.math.Point3D(p[0], p[1], p[2]),
        s = new dwv.image.Geometry(r, e, j),
        t = dwv.dicom.getSyntaxDecompressionName(l),
        u = null !== t;
    if (b.length > 1 && u) {
        console.warn("Temporary limitation: only decoding the first 20 frames...");
        var v = new dwv.utils.ThreadPool(15);
        v.init();
        var w = a.getFromKey("x00280103"),
            x = 1 === w,
            y = a.getFromKey("x00280100"),
            z = "../..",
            A = [];
        A.jpeg2000 = z + "/ext/pdfjs/decode-jpeg2000.js", A["jpeg-lossless"] = z + "/ext/rii-mango/decode-jpegloss.js", A["jpeg-baseline"] = z + "/ext/notmasteryet/decode-jpegbaseline.js";
        for (var B = A[t], C = function(a) {
                return function(c) {
                    b[a] = c.data[0]
                }
            }, D = 20, E = 1; E < D; ++E) {
            var F = new dwv.utils.WorkerTask(B, C(E), {
                buffer: b[E],
                bitsAllocated: y,
                isSigned: x
            });
            v.addWorkerTask(F)
        }
    }
    var G = new dwv.image.Image(s, b),
        H = a.getFromKey("x00280004");
    if (H) {
        var I = dwv.dicom.cleanString(H).toUpperCase();
        (m || n || o) && "MONOCHROME1" !== I && "MONOCHROME2" !== I && (I = "RGB"), G.setPhotometricInterpretation(I)
    }
    var J = a.getFromKey("x00280006");
    J && G.setPlanarConfiguration(J);
    var K = 1,
        L = a.getFromKey("x00281053");
    L && (K = parseFloat(L));
    var M = 0,
        N = a.getFromKey("x00281052");
    N && (M = parseFloat(N));
    var O = new dwv.image.RescaleSlopeAndIntercept(K, M);
    G.setRescaleSlopeAndIntercept(O);
    var P = {},
        Q = a.getFromKey("x00080060");
    Q && (P.Modality = Q);
    var R = a.getFromKey("x0020000D");
    R && (P.StudyInstanceUID = R);
    var S = a.getFromKey("x0020000E");
    S && (P.SeriesInstanceUID = S);
    var T = a.getFromKey("x00280101");
    T && (P.BitsStored = parseInt(T, 10));
    var U = a.getFromKey("x00280103");
    return P.IsSigned = !1, U && (P.IsSigned = 1 === U), G.setMeta(P), G
};
var dwv = dwv || {};
dwv.image = dwv.image || {}, dwv.image.lut = dwv.image.lut || {}, dwv.image.lut.Rescale = function(a) {
    var b = null;
    this.getRSI = function() {
        return a
    }, this.initialise = function(c) {
        var d = Math.pow(2, c);
        b = new Float32Array(d);
        for (var e = 0; e < d; ++e) b[e] = a.apply(e)
    }, this.getLength = function() {
        return b.length
    }, this.getValue = function(a) {
        return b[a]
    }
}, dwv.image.lut.Window = function(a, b) {
    var c = new Uint8ClampedArray(a.getLength()),
        d = null,
        e = null,
        f = !1;
    this.getCenter = function() {
        return d
    }, this.getWidth = function() {
        return e
    }, this.isSigned = function() {
        return b
    }, this.getRescaleLut = function() {
        return a
    }, this.setCenterAndWidth = function(a, b) {
        d = a, e = b, f = !0
    }, this.update = function() {
        if (f) {
            var g = c.length,
                h = d - .5;
            b && (h += a.getRSI().getSlope() * (g / 2));
            var i = e - 1,
                j = 0;
            if (dwv.browser.hasClampedArray())
                for (var k = 0; k < g; ++k) j = 255 * ((a.getValue(k) - h) / i + .5), c[k] = parseInt(j, 10);
            else
                for (var l = 255, m = 0, n = 0; n < g; ++n) j = 255 * ((a.getValue(n) - h) / i + .5), j = parseInt(j, 10), j <= m ? c[n] = m : j > l ? c[n] = l : c[n] = j;
            f = !1
        }
    }, this.getLength = function() {
        return c.length
    }, this.getValue = function(a) {
        var d = b ? c.length / 2 : 0;
        return c[a + d]
    }
}, dwv.image.lut.range_max = 256, dwv.image.lut.buildLut = function(a) {
    for (var b = [], c = 0; c < dwv.image.lut.range_max; ++c) b.push(a(c));
    return b
}, dwv.image.lut.max = function() {
    return dwv.image.lut.range_max - 1
}, dwv.image.lut.maxFirstThird = function(a) {
    return a < dwv.image.lut.range_max / 3 ? dwv.image.lut.range_max - 1 : 0
}, dwv.image.lut.maxSecondThird = function(a) {
    var b = dwv.image.lut.range_max / 3;
    return a >= b && a < 2 * b ? dwv.image.lut.range_max - 1 : 0
}, dwv.image.lut.maxThirdThird = function(a) {
    return a >= 2 * dwv.image.lut.range_max / 3 ? dwv.image.lut.range_max - 1 : 0
}, dwv.image.lut.toMaxFirstThird = function(a) {
    var b = 3 * a;
    return b > dwv.image.lut.range_max - 1 ? dwv.image.lut.range_max - 1 : b
}, dwv.image.lut.toMaxSecondThird = function(a) {
    var b = dwv.image.lut.range_max / 3,
        c = 0;
    return a >= b && (c = 3 * (a - b), c > dwv.image.lut.range_max - 1) ? dwv.image.lut.range_max - 1 : c
}, dwv.image.lut.toMaxThirdThird = function(a) {
    var b = dwv.image.lut.range_max / 3,
        c = 0;
    return a >= 2 * b && (c = 3 * (a - 2 * b), c > dwv.image.lut.range_max - 1) ? dwv.image.lut.range_max - 1 : c
}, dwv.image.lut.zero = function() {
    return 0
}, dwv.image.lut.id = function(a) {
    return a
}, dwv.image.lut.invId = function(a) {
    return dwv.image.lut.range_max - 1 - a
}, dwv.image.lut.plain = {
    red: dwv.image.lut.buildLut(dwv.image.lut.id),
    green: dwv.image.lut.buildLut(dwv.image.lut.id),
    blue: dwv.image.lut.buildLut(dwv.image.lut.id)
}, dwv.image.lut.invPlain = {
    red: dwv.image.lut.buildLut(dwv.image.lut.invId),
    green: dwv.image.lut.buildLut(dwv.image.lut.invId),
    blue: dwv.image.lut.buildLut(dwv.image.lut.invId)
}, dwv.image.lut.rainbow = {
    blue: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 251, 249, 247, 245, 243, 241, 239, 237, 235, 233, 231, 229, 227, 225, 223, 221, 219, 217, 215, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 192, 189, 186, 183, 180, 177, 174, 171, 168, 165, 162, 159, 156, 153, 150, 147, 144, 141, 138, 135, 132, 129, 126, 123, 120, 117, 114, 111, 108, 105, 102, 99, 96, 93, 90, 87, 84, 81, 78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3],
    red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
}, dwv.image.lut.hot = {
    red: dwv.image.lut.buildLut(dwv.image.lut.toMaxFirstThird),
    green: dwv.image.lut.buildLut(dwv.image.lut.toMaxSecondThird),
    blue: dwv.image.lut.buildLut(dwv.image.lut.toMaxThirdThird)
}, dwv.image.lut.hot_iron = {
    red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255],
    blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255]
}, dwv.image.lut.pet = {
    red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    green: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 63, 61, 59, 57, 55, 53, 51, 49, 47, 45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255],
    blue: [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 252, 248, 244, 240, 236, 232, 228, 224, 220, 216, 212, 208, 204, 200, 196, 192, 188, 184, 180, 176, 172, 168, 164, 160, 156, 152, 148, 144, 140, 136, 132, 128, 124, 120, 116, 112, 108, 104, 100, 96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 255]
}, dwv.image.lut.hot_metal_blue = {
    red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 52, 55, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 85, 88, 90, 93, 96, 99, 102, 105, 108, 111, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 166, 169, 172, 175, 178, 181, 184, 187, 190, 194, 198, 201, 205, 209, 213, 217, 221, 224, 228, 232, 236, 240, 244, 247, 251, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 21, 23, 24, 26, 28, 30, 32, 34, 36, 38, 40, 41, 43, 45, 47, 49, 51, 53, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 88, 90, 92, 94, 96, 98, 100, 102, 104, 105, 107, 109, 111, 113, 115, 117, 119, 120, 122, 124, 126, 128, 130, 132, 134, 136, 137, 139, 141, 143, 145, 147, 149, 151, 152, 154, 156, 158, 160, 162, 164, 166, 168, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 201, 203, 205, 207, 209, 211, 213, 215, 216, 218, 220, 222, 224, 226, 228, 229, 231, 233, 235, 237, 239, 240, 242, 244, 246, 248, 250, 251, 253, 255],
    blue: [0, 2, 4, 6, 8, 10, 12, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 197, 194, 191, 188, 185, 182, 179, 176, 174, 171, 168, 165, 162, 159, 156, 153, 150, 144, 138, 132, 126, 121, 115, 109, 103, 97, 91, 85, 79, 74, 68, 62, 56, 50, 47, 44, 41, 38, 35, 32, 29, 26, 24, 21, 18, 15, 12, 9, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 76, 79, 82, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121, 124, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 176, 179, 182, 185, 188, 191, 194, 197, 200, 203, 206, 210, 213, 216, 219, 223, 226, 229, 232, 236, 239, 242, 245, 249, 252, 255]
}, dwv.image.lut.pet_20step = {
    red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
    blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
}, dwv.image.lut.test = {
    red: dwv.image.lut.buildLut(dwv.image.lut.id),
    green: dwv.image.lut.buildLut(dwv.image.lut.zero),
    blue: dwv.image.lut.buildLut(dwv.image.lut.zero)
};
var dwv = dwv || {};
dwv.image = dwv.image || {};
var hasJpegBaselineDecoder = "undefined" != typeof JpegImage,
    JpegImage = JpegImage || {},
    hasJpegLosslessDecoder = "undefined" != typeof jpeg && "undefined" != typeof jpeg.lossless,
    jpeg = jpeg || {};
jpeg.lossless = jpeg.lossless || {};
var hasJpeg2000Decoder = "undefined" != typeof JpxImage,
    JpxImage = JpxImage || {};
dwv.image.getViewFromDOMImage = function(a) {
    var b = document.createElement("canvas");
    b.width = a.width, b.height = a.height;
    var c = b.getContext("2d");
    c.drawImage(a, 0, 0, a.width, a.height);
    for (var d = c.getImageData(0, 0, a.width, a.height), e = [], f = 0, g = 0; g < d.data.length; g += 4) e[f] = d.data[g], e[f + 1] = d.data[g + 1], e[f + 2] = d.data[g + 2], f += 3;
    var h = new dwv.image.Size(a.width, a.height),
        i = new dwv.image.Spacing(1, 1),
        j = a.index ? a.index : 0,
        k = new dwv.math.Point3D(0, 0, j),
        l = new dwv.image.Geometry(k, h, i),
        m = new dwv.image.Image(l, [e]);
    m.setPhotometricInterpretation("RGB");
    var n = {};
    n.BitsStored = 8, m.setMeta(n);
    var o = new dwv.image.View(m);
    o.setWindowLevelMinMax();
    var p = {};
    return a.file && (p.fileName = {
        value: a.file.name
    }, p.fileType = {
        value: a.file.type
    }, p.fileLastModifiedDate = {
        value: a.file.lastModifiedDate
    }), p.imageWidth = {
        value: a.width
    }, p.imageHeight = {
        value: a.height
    }, {
        view: o,
        info: p
    }
}, dwv.image.AsynchPixelBufferDecoder = function(a) {
    var b = new dwv.utils.ThreadPool(15);
    b.init(), this.decode = function(c, d, e, f, g) {
        var h = a[d];
        if ("undefined" == typeof h) throw new Error("No script provided to decompress '" + d + "' data.");
        var i = new dwv.utils.WorkerTask(h, g, {
            buffer: c,
            bitsAllocated: e,
            isSigned: f
        });
        b.addWorkerTask(i)
    }
}, dwv.image.SynchPixelBufferDecoder = function() {
    this.decode = function(a, b, c, d) {
        var e = null,
            f = null;
        if ("jpeg-lossless" === b) {
            if (!hasJpegLosslessDecoder) throw new Error("No JPEG Lossless decoder provided");
            var g = c / 8,
                h = new Uint8Array(a);
            e = new jpeg.lossless.Decoder;
            var i = e.decode(h.buffer, 0, h.buffer.byteLength, g);
            8 === c ? f = d ? new Int8Array(i.buffer) : new Uint8Array(i.buffer) : 16 === c && (f = d ? new Int16Array(i.buffer) : new Uint16Array(i.buffer))
        } else if ("jpeg-baseline" === b) {
            if (!hasJpegBaselineDecoder) throw new Error("No JPEG Baseline decoder provided");
            e = new JpegImage, e.parse(a), f = e.getData(e.width, e.height)
        } else if ("jpeg2000" === b) {
            if (!hasJpeg2000Decoder) throw new Error("No JPEG 2000 decoder provided");
            e = new JpxImage, e.parse(a), f = e.tiles[0].items
        }
        return [f]
    }
}, dwv.image.DicomBufferToView = function(a) {
    var b = !1;
    "undefined" != typeof a && a instanceof Array && (b = !0);
    var c, d = null;
    this.setDefaultCharacterSet = function(a) {
        c = a
    }, this.convert = function(e, f) {
        var g = new dwv.dicom.DicomParser;
        g.setDefaultCharacterSet(c), g.parse(e);
        var h = function(a) {
                l[0] = a.data[0];
                var b = new dwv.image.ImageFactory,
                    c = b.create(g.getDicomElements(), l),
                    d = new dwv.image.ViewFactory,
                    e = d.create(g.getDicomElements(), c);
                f({
                    view: e,
                    info: g.getDicomElements().dumpToTable()
                })
            },
            i = dwv.dicom.cleanString(g.getRawDicomElements().x00020010.value[0]),
            j = dwv.dicom.getSyntaxDecompressionName(i),
            k = null !== j,
            l = g.getRawDicomElements().x7FE00010.value,
            m = g.getRawDicomElements().x00280100.value[0],
            n = g.getRawDicomElements().x00280103.value[0],
            o = 1 === n;
        if (k)
            if (b) d || (d = new dwv.image.AsynchPixelBufferDecoder(a)), d.decode(l[0], j, m, o, h);
            else {
                var p = new dwv.image.SynchPixelBufferDecoder,
                    q = p.decode(l[0], j, m, o);
                h({
                    data: q
                })
            }
        else h({
            data: l
        })
    }
};
var dwv = dwv || {};
dwv.image = dwv.image || {}, dwv.image.View = function(a) {
    function b() {
        var b = new dwv.image.lut.Rescale(a.getRescaleSlopeAndIntercept(0));
        b.initialise(a.getMeta().BitsStored);
        var c = new dwv.image.lut.Window(b, a.getMeta().IsSigned);
        h.setWindowLut(c)
    }
    var c = {},
        d = null,
        e = dwv.image.lut.plain,
        f = {
            i: 0,
            j: 0,
            k: 0
        },
        g = null,
        h = this;
    this.getImage = function() {
        return a
    }, this.setImage = function(b) {
        a = b
    }, this.getWindowLut = function(b) {
        if ("undefined" == typeof b) {
            var d = this.getCurrentPosition().k;
            b = a.getRescaleSlopeAndIntercept(d)
        }
        return c[b.toString()]
    }, this.setWindowLut = function(a) {
        var b = a.getRescaleLut().getRSI();
        c[b.toString()] = a
    }, b(), this.getWindowPresets = function() {
        return d
    }, this.setWindowPresets = function(a) {
        d = a, this.setWindowLevel(a[0].center, a[0].width)
    }, this.getColourMap = function() {
        return e
    }, this.setColourMap = function(a) {
        e = a, "MONOCHROME1" === this.getImage().getPhotometricInterpretation() && (e = dwv.image.lut.invPlain), this.fireEvent({
            type: "colour-change",
            wc: this.getWindowLut().getCenter(),
            ww: this.getWindowLut().getWidth()
        })
    }, this.getCurrentPosition = function() {
        return {
            i: f.i,
            j: f.j,
            k: f.k
        }
    }, this.setCurrentPosition = function(b, c) {
        if ("undefined" == typeof c && (c = !1), !a.getGeometry().getSize().isInBounds(b.i, b.j, b.k)) return !1;
        var d = f;
        return f = b, null !== a.getPhotometricInterpretation().match(/MONOCHROME/) ? this.fireEvent({
            type: "position-change",
            i: b.i,
            j: b.j,
            k: b.k,
            value: a.getRescaledValue(b.i, b.j, b.k, this.getCurrentFrame())
        }) : this.fireEvent({
            type: "position-change",
            i: b.i,
            j: b.j,
            k: b.k
        }), c || d.k !== f.k && this.fireEvent({
            type: "slice-change"
        }), !0
    }, this.getCurrentFrame = function() {
        return g
    }, this.setCurrentFrame = function(b) {
        if (b < 0 || b >= a.getNumberOfFrames()) return !1;
        var c = g;
        return g = b, c !== g && 1 !== a.getNumberOfFrames() && (this.fireEvent({
            type: "frame-change",
            frame: g
        }), this.setCurrentPosition(this.getCurrentPosition(), !0)), !0
    }, this.append = function(a) {
        var b = this.getImage().appendSlice(a.getImage());
        b <= this.getCurrentPosition().k && this.setCurrentPosition({
            i: this.getCurrentPosition().i,
            j: this.getCurrentPosition().j,
            k: this.getCurrentPosition().k + 1
        }, !0), this.setWindowLut(a.getWindowLut())
    }, this.setWindowLevel = function(a, b) {
        if (b >= 1) {
            for (var d in c) c[d].setCenterAndWidth(a, b);
            this.fireEvent({
                type: "wl-change",
                wc: a,
                ww: b
            })
        }
    }, this.clone = function() {
        var a = new dwv.image.View(this.getImage());
        for (var b in c) a.setWindowLut(c[b]);
        return a.setListeners(this.getListeners()), a
    };
    var i = {};
    this.getListeners = function() {
        return i
    }, this.setListeners = function(a) {
        i = a
    }
}, dwv.image.View.prototype.setWindowLevelMinMax = function() {
    var a = this.getImage().getRescaledDataRange(),
        b = a.min,
        c = a.max,
        d = c - b,
        e = b + d / 2;
    this.setWindowLevel(e, d)
}, dwv.image.View.prototype.generateImageData = function(a) {
    var b = this.getImage(),
        c = this.getWindowLut();
    c.update();
    var d = b.getGeometry().getSize().getSliceSize(),
        e = d * this.getCurrentPosition().k,
        f = this.getCurrentFrame() ? this.getCurrentFrame() : 0,
        g = 0,
        h = 0,
        i = 0,
        j = b.getPhotometricInterpretation();
    switch (j) {
        case "MONOCHROME1":
        case "MONOCHROME2":
            for (var k = this.getColourMap(), l = e + d, m = e; m < l; ++m) h = parseInt(c.getValue(b.getValueAtOffset(m, f)), 10), a.data[g] = k.red[h], a.data[g + 1] = k.green[h], a.data[g + 2] = k.blue[h], a.data[g + 3] = 255, g += 4;
            break;
        case "RGB":
            e *= 3;
            var n = b.getPlanarConfiguration();
            if (0 !== n && 1 !== n) throw new Error("Unsupported planar configuration: " + n);
            var o = e,
                p = e + 1,
                q = e + 2;
            i = 3, 1 === n && (o = e, p = e + d, q = e + 2 * d, i = 1);
            for (var r = 0; r < d; ++r) a.data[g] = parseInt(c.getValue(b.getValueAtOffset(o, f)), 10), a.data[g + 1] = parseInt(c.getValue(b.getValueAtOffset(p, f)), 10), a.data[g + 2] = parseInt(c.getValue(b.getValueAtOffset(q, f)), 10), a.data[g + 3] = 255, g += 4, o += i, p += i, q += i;
            break;
        case "YBR_FULL_422":
            e *= 3;
            var s = b.getPlanarConfiguration();
            if (0 !== s && 1 !== s) throw new Error("Unsupported planar configuration: " + s);
            var t = e,
                u = e + 1,
                v = e + 2;
            i = 3, 1 === s && (t = e, u = e + d, v = e + 2 * d, i = 1);
            for (var w, x, y, z, A, B, C = 0; C < d; ++C) w = b.getValueAtOffset(t, f), x = b.getValueAtOffset(u, f), y = b.getValueAtOffset(v, f), z = w + 1.402 * (y - 128), A = w - .34414 * (x - 128) - .71414 * (y - 128), B = w + 1.772 * (x - 128), a.data[g] = parseInt(c.getValue(z), 10), a.data[g + 1] = parseInt(c.getValue(A), 10), a.data[g + 2] = parseInt(c.getValue(B), 10), a.data[g + 3] = 255, g += 4, t += i, u += i, v += i;
            break;
        default:
            throw new Error("Unsupported photometric interpretation: " + j)
    }
}, dwv.image.View.prototype.addEventListener = function(a, b) {
    var c = this.getListeners();
    c[a] || (c[a] = []), c[a].push(b)
}, dwv.image.View.prototype.removeEventListener = function(a, b) {
    var c = this.getListeners();
    if (c[a])
        for (var d = 0; d < c[a].length; ++d) c[a][d] === b && c[a].splice(d, 1)
}, dwv.image.View.prototype.fireEvent = function(a) {
    var b = this.getListeners();
    if (b[a.type])
        for (var c = 0; c < b[a.type].length; ++c) b[a.type][c](a)
}, dwv.image.ViewFactory = function() {}, dwv.image.ViewFactory.prototype.create = function(a, b) {
    var c = new dwv.image.View(b),
        d = [],
        e = a.getFromKey("x00281050", !0),
        f = a.getFromKey("x00281051", !0);
    if (e && f)
        for (var g, h = 0; h < e.length; ++h) {
            var i = parseFloat(f[h], 10),
                j = parseFloat(e[h], 10);
            if (i) {
                g = "Default" + h;
                var k = a.getFromKey("x00281055");
                k && (g = k[h]), d.push({
                    center: j,
                    width: i,
                    name: g
                })
            }
        }
    return 0 !== d.length ? c.setWindowPresets(d) : c.setWindowLevelMinMax(), c
};
var dwv = dwv || {};
dwv.io = dwv.io || {}, dwv.io.File = function() {
    var a, b = 0,
        c = 0,
        d = [],
        e = [];
    this.getDefaultCharacterSet = function() {
        return a
    }, this.setDefaultCharacterSet = function(b) {
        a = b
    }, this.setNToLoad = function(a) {
        b = a;
        for (var c = 0; c < b; ++c) d[c] = 0
    }, this.addLoaded = function() {
        c++, c === b && this.onloadend()
    }, this.getGlobalPercent = function(a, c) {
        d[a] = c;
        for (var e = 0, f = 0; f < d.length; ++f) e += d[f];
        return e / b
    }, this.setDecoderScripts = function(a) {
        e = a
    }, this.getDecoderScripts = function() {
        return e
    }
}, dwv.io.File.prototype.onload = function() {}, dwv.io.File.prototype.onloadend = function() {}, dwv.io.File.prototype.onprogress = function() {}, dwv.io.File.prototype.onerror = function() {}, dwv.io.File.createErrorHandler = function(a, b, c) {
    return function(d) {
        c({
            name: "RequestError",
            message: "An error occurred while reading the " + b + " file: " + a + " (" + d.getMessage() + ")"
        })
    }
}, dwv.io.File.createProgressHandler = function(a, b, c) {
    return function(d) {
        if (d.lengthComputable) {
            var e = Math.round(d.loaded / d.total * 100),
                f = {
                    type: "load-progress",
                    lengthComputable: !0,
                    loaded: b(a, e),
                    total: 100
                };
            c(f)
        }
    }
}, dwv.io.File.prototype.load = function(a) {
    var b = this;
    this.setNToLoad(a.length);
    var c = function(a) {
            b.onload(a), b.addLoaded()
        },
        d = new dwv.image.DicomBufferToView(this.getDecoderScripts());
    d.setDefaultCharacterSet(this.getDefaultCharacterSet());
    for (var e = function(a) {
            try {
                d.convert(a.target.result, c)
            } catch (e) {
                b.onerror(e)
            }
        }, f = function() {
            try {
                c(dwv.image.getViewFromDOMImage(this))
            } catch (a) {
                b.onerror(a)
            }
        }, g = function(a) {
            try {
                b.onload(a.target.result)
            } catch (c) {
                b.onerror(c)
            }
        }, h = function(a) {
            var b = new Image;
            b.src = a.target.result, b.file = this.file, b.index = this.index, b.onload = f
        }, i = 0; i < a.length; ++i) {
        var j = a[i],
            k = new FileReader;
        k.onprogress = dwv.io.File.createProgressHandler(i, b.getGlobalPercent, b.onprogress), "json" === j.name.split(".").pop().toLowerCase() ? (k.onload = g, k.onerror = dwv.io.File.createErrorHandler(j, "text", b.onerror), k.readAsText(j)) : j.type.match("image.*") ? (k.file = j, k.index = i, k.onload = h, k.onerror = dwv.io.File.createErrorHandler(j, "image", b.onerror), k.readAsDataURL(j)) : (k.onload = e,
            k.onerror = dwv.io.File.createErrorHandler(j, "DICOM", b.onerror), k.readAsArrayBuffer(j))
    }
};
var dwv = dwv || {};
dwv.io = dwv.io || {}, dwv.io.Url = function() {
    var a, b = 0,
        c = 0,
        d = [],
        e = [];
    this.getDefaultCharacterSet = function() {
        return a
    }, this.setDefaultCharacterSet = function(b) {
        a = b
    }, this.setNToLoad = function(a) {
        b = a;
        for (var c = 0; c < b; ++c) d[c] = 0
    }, this.addLoaded = function() {
        c++, c === b && this.onloadend()
    }, this.getGlobalPercent = function(a, c) {
        d[a] = c / b;
        for (var e = 0, f = 0; f < d.length; ++f) e += d[f];
        return e
    }, this.setDecoderScripts = function(a) {
        e = a
    }, this.getDecoderScripts = function() {
        return e
    }
}, dwv.io.Url.prototype.onload = function() {}, dwv.io.Url.prototype.onloadend = function() {}, dwv.io.File.prototype.onprogress = function() {}, dwv.io.Url.prototype.onerror = function() {}, dwv.io.Url.createErrorHandler = function(a, b, c) {
    return function() {
        c({
            name: "RequestError",
            message: "An error occurred while retrieving the " + b + " file (via http): " + a + " (status: " + this.status + ")"
        })
    }
}, dwv.io.Url.createProgressHandler = function(a, b, c) {
    return function(d) {
        if (d.lengthComputable) {
            var e = Math.round(d.loaded / d.total * 100),
                f = {
                    type: "load-progress",
                    lengthComputable: !0,
                    loaded: b(a, e),
                    total: 100
                };
            c(f)
        }
    }
}, dwv.io.Url.prototype.load = function(a, b) {
    var c = this;
    this.setNToLoad(a.length);
    var d = function(a) {
            c.onload(a), c.addLoaded()
        },
        e = new dwv.image.DicomBufferToView(this.getDecoderScripts());
    e.setDefaultCharacterSet(this.getDefaultCharacterSet());
    for (var f = function(a) {
            try {
                e.convert(a, d)
            } catch (b) {
                c.onerror(b)
            }
        }, g = function() {
            try {
                d(dwv.image.getViewFromDOMImage(this))
            } catch (a) {
                c.onerror(a)
            }
        }, h = function() {
            if (200 !== this.status && 0 !== this.status) return void this.onerror();
            try {
                c.onload(this.responseText)
            } catch (a) {
                c.onerror(a)
            }
        }, i = function() {
            if (200 !== this.status && 0 !== this.status) return void this.onerror();
            var a = new DataView(this.response),
                b = 4292411360 === a.getUint32(0),
                c = 2303741511 === a.getUint32(0),
                d = 1195984440 === a.getUint32(0);
            if (!b && !c && !d && this.responseURL) {
                var e = this.responseURL.split(".").pop().toLowerCase();
                b = "jpg" === e || "jpeg" === e, c = "png" === e, d = "gif" === e
            }
            if (b || c || d) {
                for (var h = new Uint8Array(this.response), i = "", j = 0; j < h.byteLength; ++j) i += String.fromCharCode(h[j]);
                var k = "unknown";
                b ? k = "jpeg" : c ? k = "png" : d && (k = "gif");
                var l = new Image;
                l.src = "data:image/" + k + ";base64," + window.btoa(i), l.onload = g
            } else f(this.response)
        }, j = 0; j < a.length; ++j) {
        var k = a[j],
            l = "json" === k.split(".").pop().toLowerCase(),
            m = new XMLHttpRequest;
        if (m.open("GET", k, !0), "undefined" != typeof b)
            for (var n = 0; n < b.length; ++n) "undefined" != typeof b[n].name && "undefined" != typeof b[n].value && m.setRequestHeader(b[n].name, b[n].value);
        l ? (m.onload = h, m.onerror = dwv.io.Url.createErrorHandler(k, "text", c.onerror)) : (m.responseType = "arraybuffer", m.onload = i, m.onerror = dwv.io.Url.createErrorHandler(k, "binary", c.onerror)), m.onprogress = dwv.io.File.createProgressHandler(j, c.getGlobalPercent, c.onprogress), m.send(null)
    }
};
var dwv = dwv || {};
dwv.math = dwv.math || {}, dwv.math.BucketQueue = function(a, b) {
    this.bucketCount = 1 << a, this.mask = this.bucketCount - 1, this.size = 0, this.loc = 0, this.cost = "undefined" != typeof b ? b : function(a) {
        return a
    }, this.buckets = this.buildArray(this.bucketCount)
}, dwv.math.BucketQueue.prototype.push = function(a) {
    var b = this.getBucket(a);
    a.next = this.buckets[b], this.buckets[b] = a, this.size++
}, dwv.math.BucketQueue.prototype.pop = function() {
    if (0 === this.size) throw new Error("Cannot pop, bucketQueue is empty.");
    for (; null === this.buckets[this.loc];) this.loc = (this.loc + 1) % this.bucketCount;
    var a = this.buckets[this.loc];
    return this.buckets[this.loc] = a.next, a.next = null, this.size--, a
}, dwv.math.BucketQueue.prototype.remove = function(a) {
    if (!a) return !1;
    for (var b = this.getBucket(a), c = this.buckets[b]; null !== c && !a.equals(c.next);) c = c.next;
    return null !== c && (c.next = c.next.next, this.size--, !0)
}, dwv.math.BucketQueue.prototype.isEmpty = function() {
    return 0 === this.size
}, dwv.math.BucketQueue.prototype.getBucket = function(a) {
    return this.cost(a) & this.mask
}, dwv.math.BucketQueue.prototype.buildArray = function(a) {
    for (var b = new Array(a), c = 0; c < b.length; c++) b[c] = null;
    return b
};
var dwv = dwv || {};
dwv.math = dwv.math || {}, dwv.math.Point2D = function(a, b) {
    this.getX = function() {
        return a
    }, this.getY = function() {
        return b
    }
}, dwv.math.Point2D.prototype.equals = function(a) {
    return null !== a && this.getX() === a.getX() && this.getY() === a.getY()
}, dwv.math.Point2D.prototype.toString = function() {
    return "(" + this.getX() + ", " + this.getY() + ")"
}, dwv.math.FastPoint2D = function(a, b) {
    this.x = a, this.y = b
}, dwv.math.FastPoint2D.prototype.equals = function(a) {
    return null !== a && this.x === a.x && this.y === a.y
}, dwv.math.FastPoint2D.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
}, dwv.math.Point3D = function(a, b, c) {
    this.getX = function() {
        return a
    }, this.getY = function() {
        return b
    }, this.getZ = function() {
        return c
    }
}, dwv.math.Point3D.prototype.equals = function(a) {
    return null !== a && this.getX() === a.getX() && this.getY() === a.getY() && this.getZ() === a.getZ()
}, dwv.math.Point3D.prototype.toString = function() {
    return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")"
}, dwv.math.Index3D = function(a, b, c) {
    this.getI = function() {
        return a
    }, this.getJ = function() {
        return b
    }, this.getK = function() {
        return c
    }
}, dwv.math.Index3D.prototype.equals = function(a) {
    return null !== a && this.getI() === a.getI() && this.getJ() === a.getJ() && this.getK() === a.getK()
}, dwv.math.Index3D.prototype.toString = function() {
    return "(" + this.getI() + ", " + this.getJ() + ", " + this.getK() + ")"
};
var dwv = dwv || {};
dwv.math = dwv.math || {};
var __twothirdpi = 2 / (3 * Math.PI);
dwv.math.computeGreyscale = function(a, b, c) {
    for (var d = [], e = 0; e < c; e++) {
        d[e] = [];
        for (var f = 0; f < b; f++) {
            var g = 4 * (e * b + f);
            d[e][f] = (a[g] + a[g + 1] + a[g + 2]) / 765
        }
    }
    return d.dx = function(a, b) {
        return a + 1 === this[b].length && a--, this[b][a + 1] - this[b][a]
    }, d.dy = function(a, b) {
        return b + 1 === this.length && b--, this[b][a] - this[b + 1][a]
    }, d.gradMagnitude = function(a, b) {
        var c = this.dx(a, b),
            d = this.dy(a, b);
        return Math.sqrt(c * c + d * d)
    }, d.laplace = function(a, b) {
        var c = -16 * this[b][a];
        return c += this[b - 2][a], c += this[b - 1][a - 1] + 2 * this[b - 1][a] + this[b - 1][a + 1], c += this[b][a - 2] + 2 * this[b][a - 1] + 2 * this[b][a + 1] + this[b][a + 2], c += this[b + 1][a - 1] + 2 * this[b + 1][a] + this[b + 1][a + 1], c += this[b + 2][a]
    }, d
}, dwv.math.computeGradient = function(a) {
    var b = [],
        c = 0,
        d = 0,
        e = 0;
    for (e = 0; e < a.length - 1; e++) {
        for (b[e] = [], d = 0; d < a[e].length - 1; d++) b[e][d] = a.gradMagnitude(d, e), c = Math.max(b[e][d], c);
        b[e][a[e].length - 1] = b[e][a.length - 2]
    }
    b[a.length - 1] = [];
    for (var f = 0; f < b[0].length; f++) b[a.length - 1][f] = b[a.length - 2][f];
    for (e = 0; e < b.length; e++)
        for (d = 0; d < b[e].length; d++) b[e][d] = 1 - b[e][d] / c;
    return b
}, dwv.math.computeLaplace = function(a) {
    var b = [];
    b[0] = [], b[1] = [];
    for (var c = 1; c < a.length; c++) b[0][c] = 1, b[1][c] = 1;
    for (var d = 2; d < a.length - 2; d++) {
        b[d] = [], b[d][0] = 1, b[d][1] = 1;
        for (var e = 2; e < a[d].length - 2; e++) b[d][e] = a.laplace(e, d) > .33 ? 0 : 1;
        b[d][a[d].length - 2] = 1, b[d][a[d].length - 1] = 1
    }
    b[a.length - 2] = [], b[a.length - 1] = [];
    for (var f = 1; f < a.length; f++) b[a.length - 2][f] = 1, b[a.length - 1][f] = 1;
    return b
}, dwv.math.computeGradX = function(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        b[c] = [];
        for (var d = 0; d < a[c].length - 1; d++) b[c][d] = a.dx(d, c);
        b[c][a[c].length - 1] = b[c][a[c].length - 2]
    }
    return b
}, dwv.math.computeGradY = function(a) {
    for (var b = [], c = 0; c < a.length - 1; c++) {
        b[c] = [];
        for (var d = 0; d < a[c].length; d++) b[c][d] = a.dy(d, c)
    }
    b[a.length - 1] = [];
    for (var e = 0; e < a[0].length; e++) b[a.length - 1][e] = b[a.length - 2][e];
    return b
}, dwv.math.gradUnitVector = function(a, b, c, d, e) {
    var f = a[d][c],
        g = b[d][c],
        h = Math.sqrt(f * f + g * g);
    h = Math.max(h, 1e-100), e.x = f / h, e.y = g / h
}, dwv.math.gradDirection = function(a, b, c, d, e, f) {
    var g = new dwv.math.FastPoint2D((-1), (-1)),
        h = new dwv.math.FastPoint2D((-1), (-1));
    dwv.math.gradUnitVector(a, b, c, d, g), dwv.math.gradUnitVector(a, b, e, f, h);
    var i = g.y * (e - c) - g.x * (f - d),
        j = h.y * (e - c) - h.x * (f - d);
    return i < 0 && (i = -i, j = -j), c !== e && d !== f && (i *= Math.SQRT1_2, j *= Math.SQRT1_2), __twothirdpi * (Math.acos(i) + Math.acos(j))
}, dwv.math.computeSides = function(a, b, c, d) {
    var e = {};
    e.inside = [], e.outside = [];
    for (var f = new dwv.math.FastPoint2D((-1), (-1)), g = 0; g < b.length; g++) {
        e.inside[g] = [], e.outside[g] = [];
        for (var h = 0; h < b[g].length; h++) {
            dwv.math.gradUnitVector(b, c, h, g, f);
            var i = Math.round(h + a * f.y),
                j = Math.round(g - a * f.x),
                k = Math.round(h - a * f.y),
                l = Math.round(g + a * f.x);
            i = Math.max(Math.min(i, b[g].length - 1), 0), k = Math.max(Math.min(k, b[g].length - 1), 0), j = Math.max(Math.min(j, b.length - 1), 0), l = Math.max(Math.min(l, b.length - 1), 0), e.inside[g][h] = d[j][i], e.outside[g][h] = d[l][k]
        }
    }
    return e
}, dwv.math.gaussianBlur = function(a, b) {
    b[0] = .4 * a[0] + .5 * a[1] + .1 * a[1], b[1] = .25 * a[0] + .4 * a[1] + .25 * a[2] + .1 * a[3];
    for (var c = 2; c < a.length - 2; c++) b[c] = .05 * a[c - 2] + .25 * a[c - 1] + .4 * a[c] + .25 * a[c + 1] + .05 * a[c + 2];
    var d = a.length;
    b[d - 2] = .25 * a[d - 1] + .4 * a[d - 2] + .25 * a[d - 3] + .1 * a[d - 4], b[d - 1] = .4 * a[d - 1] + .5 * a[d - 2] + .1 * a[d - 3]
}, dwv.math.Scissors = function() {
    this.width = -1, this.height = -1, this.curPoint = null, this.searchGranBits = 8, this.searchGran = 1 << this.earchGranBits, this.pointsPerPost = 500, this.greyscale = null, this.laplace = null, this.gradient = null, this.gradX = null, this.gradY = null, this.parents = null, this.working = !1, this.trained = !1, this.trainingPoints = null, this.edgeWidth = 2, this.trainingLength = 32, this.edgeGran = 256, this.edgeTraining = null, this.gradPointsNeeded = 32, this.gradGran = 1024, this.gradTraining = null, this.insideGran = 256, this.insideTraining = null, this.outsideGran = 256, this.outsideTraining = null
}, dwv.math.Scissors.prototype.getTrainingIdx = function(a, b) {
    return Math.round((a - 1) * b)
}, dwv.math.Scissors.prototype.getTrainedEdge = function(a) {
    return this.edgeTraining[this.getTrainingIdx(this.edgeGran, a)]
}, dwv.math.Scissors.prototype.getTrainedGrad = function(a) {
    return this.gradTraining[this.getTrainingIdx(this.gradGran, a)]
}, dwv.math.Scissors.prototype.getTrainedInside = function(a) {
    return this.insideTraining[this.getTrainingIdx(this.insideGran, a)]
}, dwv.math.Scissors.prototype.getTrainedOutside = function(a) {
    return this.outsideTraining[this.getTrainingIdx(this.outsideGran, a)]
}, dwv.math.Scissors.prototype.setWorking = function(a) {
    this.working = a
}, dwv.math.Scissors.prototype.setDimensions = function(a, b) {
    this.width = a, this.height = b
}, dwv.math.Scissors.prototype.setData = function(a) {
    if (this.width === -1 || this.height === -1) throw new Error("Dimensions have not been set.");
    this.greyscale = dwv.math.computeGreyscale(a, this.width, this.height), this.laplace = dwv.math.computeLaplace(this.greyscale), this.gradient = dwv.math.computeGradient(this.greyscale), this.gradX = dwv.math.computeGradX(this.greyscale), this.gradY = dwv.math.computeGradY(this.greyscale);
    var b = dwv.math.computeSides(this.edgeWidth, this.gradX, this.gradY, this.greyscale);
    this.inside = b.inside, this.outside = b.outside, this.edgeTraining = [], this.gradTraining = [], this.insideTraining = [], this.outsideTraining = []
}, dwv.math.Scissors.prototype.findTrainingPoints = function(a) {
    var b = [];
    if (null !== this.parents)
        for (var c = 0; c < this.trainingLength && a; c++) b.push(a), a = this.parents[a.y][a.x];
    return b
}, dwv.math.Scissors.prototype.resetTraining = function() {
    this.trained = !1
}, dwv.math.Scissors.prototype.doTraining = function(a) {
    if (this.trainingPoints = this.findTrainingPoints(a), !(this.trainingPoints.length < 8)) {
        var b = [];
        this.calculateTraining(b, this.edgeGran, this.greyscale, this.edgeTraining), this.calculateTraining(b, this.gradGran, this.gradient, this.gradTraining), this.calculateTraining(b, this.insideGran, this.inside, this.insideTraining), this.calculateTraining(b, this.outsideGran, this.outside, this.outsideTraining), this.trainingPoints.length < this.gradPointsNeeded && this.addInStaticGrad(this.trainingPoints.length, this.gradPointsNeeded), this.trained = !0
    }
}, dwv.math.Scissors.prototype.calculateTraining = function(a, b, c, d) {
    var e = 0;
    for (a.length = b, e = 0; e < b; e++) a[e] = 0;
    var f = 1;
    for (e = 0; e < this.trainingPoints.length; e++) {
        var g = this.trainingPoints[e],
            h = this.getTrainingIdx(b, c[g.y][g.x]);
        a[h] += 1, f = Math.max(f, a[h])
    }
    for (e = 0; e < b; e++) a[e] = 1 - a[e] / f;
    dwv.math.gaussianBlur(a, d)
}, dwv.math.Scissors.prototype.addInStaticGrad = function(a, b) {
    for (var c = 0; c < this.gradGran; c++) this.gradTraining[c] = Math.min(this.gradTraining[c], 1 - c * (b - a) / (b * this.gradGran))
}, dwv.math.Scissors.prototype.gradDirection = function(a, b, c, d) {
    return dwv.math.gradDirection(this.gradX, this.gradY, a, b, c, d)
}, dwv.math.Scissors.prototype.dist = function(a, b, c, d) {
    var e = this.gradient[d][c];
    a !== c && b !== d || (e *= Math.SQRT1_2);
    var f = this.laplace[d][c],
        g = this.gradDirection(a, b, c, d);
    if (this.trained) {
        var h = this.getTrainedGrad(e),
            i = this.getTrainedEdge(this.greyscale[b][a]),
            j = this.getTrainedInside(this.inside[b][a]),
            k = this.getTrainedOutside(this.outside[b][a]);
        return .3 * h + .3 * f + .1 * (g + i + j + k)
    }
    return .43 * e + .43 * f + .11 * g
}, dwv.math.Scissors.prototype.adj = function(a) {
    for (var b = [], c = Math.max(a.x - 1, 0), d = Math.max(a.y - 1, 0), e = Math.min(a.x + 1, this.greyscale[0].length - 1), f = Math.min(a.y + 1, this.greyscale.length - 1), g = 0, h = d; h <= f; h++)
        for (var i = c; i <= e; i++) i === a.x && h === a.y || (b[g++] = new dwv.math.FastPoint2D(i, h));
    return b
}, dwv.math.Scissors.prototype.setPoint = function(a) {
    this.setWorking(!0), this.curPoint = a;
    var b = 0,
        c = 0;
    for (this.visited = [], c = 0; c < this.height; c++)
        for (this.visited[c] = [], b = 0; b < this.width; b++) this.visited[c][b] = !1;
    for (this.parents = [], c = 0; c < this.height; c++) this.parents[c] = [];
    for (this.cost = [], c = 0; c < this.height; c++)
        for (this.cost[c] = [], b = 0; b < this.width; b++) this.cost[c][b] = Number.MAX_VALUE;
    this.pq = new dwv.math.BucketQueue(this.searchGranBits, function(a) {
        return Math.round(this.searchGran * this.costArr[a.y][a.x])
    }), this.pq.searchGran = this.searchGran, this.pq.costArr = this.cost, this.pq.push(a), this.cost[a.y][a.x] = 0
}, dwv.math.Scissors.prototype.doWork = function() {
    if (this.working) {
        this.timeout = null;
        for (var a = 0, b = []; !this.pq.isEmpty() && a < this.pointsPerPost;) {
            var c = this.pq.pop();
            b.push(c), b.push(this.parents[c.y][c.x]), this.visited[c.y][c.x] = !0;
            for (var d = this.adj(c), e = 0; e < d.length; e++) {
                var f = d[e],
                    g = this.cost[c.y][c.x] + this.dist(c.x, c.y, f.x, f.y);
                g < this.cost[f.y][f.x] && (this.cost[f.y][f.x] !== Number.MAX_VALUE && this.pq.remove(f), this.cost[f.y][f.x] = g, this.parents[f.y][f.x] = c, this.pq.push(f))
            }
            a++
        }
        return b
    }
};
var dwv = dwv || {};
dwv.math = dwv.math || {}, dwv.math.Circle = function(a, b) {
    var c = Math.PI * b * b;
    this.getCenter = function() {
        return a
    }, this.getRadius = function() {
        return b
    }, this.getSurface = function() {
        return c
    }, this.getWorldSurface = function(a, b) {
        return c * a * b
    }
}, dwv.math.Ellipse = function(a, b, c) {
    var d = Math.PI * b * c;
    this.getCenter = function() {
        return a
    }, this.getA = function() {
        return b
    }, this.getB = function() {
        return c
    }, this.getSurface = function() {
        return d
    }, this.getWorldSurface = function(a, b) {
        return d * a * b
    }
}, dwv.math.Line = function(a, b) {
    var c = b.getX() - a.getX(),
        d = b.getY() - a.getY(),
        e = Math.sqrt(c * c + d * d);
    this.getBegin = function() {
        return a
    }, this.getEnd = function() {
        return b
    }, this.getDeltaX = function() {
        return c
    }, this.getDeltaY = function() {
        return d
    }, this.getLength = function() {
        return e
    }, this.getWorldLength = function(a, b) {
        var e = c * a,
            f = d * b;
        return Math.sqrt(e * e + f * f)
    }, this.getMidpoint = function() {
        return new dwv.math.Point2D(parseInt((a.getX() + b.getX()) / 2, 10), parseInt((a.getY() + b.getY()) / 2, 10))
    }, this.getSlope = function() {
        return d / c
    }, this.getInclination = function() {
        var a = 180 * Math.atan2(d, c) / Math.PI;
        return 180 - a
    }
}, dwv.math.getAngle = function(a, b) {
    var c = a.getDeltaX(),
        d = a.getDeltaY(),
        e = b.getDeltaX(),
        f = b.getDeltaY(),
        g = c * e + d * f,
        h = c * f - d * e,
        i = 180 * Math.atan2(h, g) / Math.PI;
    return 360 - (180 - i)
}, dwv.math.Rectangle = function(a, b) {
    if (b.getX() < a.getX()) {
        var c = a.getX();
        a = new dwv.math.Point2D(b.getX(), a.getY()), b = new dwv.math.Point2D(c, b.getY())
    }
    if (b.getY() < a.getY()) {
        var d = a.getY();
        a = new dwv.math.Point2D(a.getX(), b.getY()), b = new dwv.math.Point2D(b.getX(), d)
    }
    var e = Math.abs(b.getX() - a.getX()) * Math.abs(b.getY() - a.getY());
    this.getBegin = function() {
        return a
    }, this.getEnd = function() {
        return b
    }, this.getRealWidth = function() {
        return b.getX() - a.getX()
    }, this.getRealHeight = function() {
        return b.getY() - a.getY()
    }, this.getWidth = function() {
        return Math.abs(this.getRealWidth())
    }, this.getHeight = function() {
        return Math.abs(this.getRealHeight())
    }, this.getSurface = function() {
        return e
    }, this.getWorldSurface = function(a, b) {
        return e * a * b
    }
}, dwv.math.ROI = function() {
    var a = [];
    this.getPoint = function(b) {
        return a[b]
    }, this.getLength = function() {
        return a.length
    }, this.addPoint = function(b) {
        a.push(b)
    }, this.addPoints = function(b) {
        a = a.concat(b)
    }
}, dwv.math.Path = function(a, b) {
    this.pointArray = a ? a.slice() : [], this.controlPointIndexArray = b ? b.slice() : []
}, dwv.math.Path.prototype.getPoint = function(a) {
    return this.pointArray[a]
}, dwv.math.Path.prototype.isControlPoint = function(a) {
    var b = this.pointArray.indexOf(a);
    if (b !== -1) return this.controlPointIndexArray.indexOf(b) !== -1;
    throw new Error("Error: isControlPoint called with not in list point.")
}, dwv.math.Path.prototype.getLength = function() {
    return this.pointArray.length
}, dwv.math.Path.prototype.addPoint = function(a) {
    this.pointArray.push(a)
}, dwv.math.Path.prototype.addControlPoint = function(a) {
    var b = this.pointArray.indexOf(a);
    if (b === -1) throw new Error("Error: addControlPoint called with no point in list point.");
    this.controlPointIndexArray.push(b)
}, dwv.math.Path.prototype.addPoints = function(a) {
    this.pointArray = this.pointArray.concat(a)
}, dwv.math.Path.prototype.appenPath = function(a) {
    var b = this.pointArray.length;
    this.pointArray = this.pointArray.concat(a.pointArray);
    for (var c = [], d = 0; d < a.controlPointIndexArray.length; ++d) c[d] = a.controlPointIndexArray[d] + b;
    this.controlPointIndexArray = this.controlPointIndexArray.concat(c)
};
var dwv = dwv || {};
dwv.math = dwv.math || {}, dwv.math.getStats = function(a) {
    for (var b = a[0], c = b, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0; j < a.length; ++j) i = a[j], i < b ? b = i : i > c && (c = i), e += i, f += i * i;
    return d = e / a.length, h = f / a.length - d * d, g = Math.sqrt(h), {
        min: b,
        max: c,
        mean: d,
        stdDev: g
    }
}, dwv.math.guid = function() {
    return Math.random().toString(36).substring(2, 15)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.DrawGroupCommand = function(a, b, c) {
    this.getName = function() {
        return "Draw-" + b
    }, this.execute = function() {
        c.add(a), c.draw(), this.onExecute({
            type: "draw-create",
            id: a.id()
        })
    }, this.undo = function() {
        a.remove(), c.draw(), this.onUndo({
            type: "draw-delete",
            id: a.id()
        })
    }
}, dwv.tool.DrawGroupCommand.prototype.onExecute = function() {}, dwv.tool.DrawGroupCommand.prototype.onUndo = function() {}, dwv.tool.MoveGroupCommand = function(a, b, c, d) {
    this.getName = function() {
        return "Move-" + b
    }, this.execute = function() {
        a.getChildren().each(function(a) {
            a.x(a.x() + c.x), a.y(a.y() + c.y)
        }), d.draw(), this.onExecute({
            type: "draw-move",
            id: a.id()
        })
    }, this.undo = function() {
        a.getChildren().each(function(a) {
            a.x(a.x() - c.x), a.y(a.y() - c.y)
        }), d.draw(), this.onUndo({
            type: "draw-move",
            id: a.id()
        })
    }
}, dwv.tool.MoveGroupCommand.prototype.onExecute = function() {}, dwv.tool.MoveGroupCommand.prototype.onUndo = function() {}, dwv.tool.ChangeGroupCommand = function(a, b, c, d, e, f) {
    this.getName = function() {
        return "Change-" + a
    }, this.execute = function() {
        b(d, f), e.draw(), this.onExecute({
            type: "draw-change"
        })
    }, this.undo = function() {
        b(c, f), e.draw(), this.onUndo({
            type: "draw-change"
        })
    }
}, dwv.tool.ChangeGroupCommand.prototype.onExecute = function() {}, dwv.tool.ChangeGroupCommand.prototype.onUndo = function() {}, dwv.tool.DeleteGroupCommand = function(a, b, c) {
    this.getName = function() {
        return "Delete-" + b
    }, this.execute = function() {
        a.remove(), c.draw(), this.onExecute({
            type: "draw-delete",
            id: a.id()
        })
    }, this.undo = function() {
        c.add(a), c.draw(), this.onUndo({
            type: "draw-create",
            id: a.id()
        })
    }
}, dwv.tool.DeleteGroupCommand.prototype.onExecute = function() {}, dwv.tool.DeleteGroupCommand.prototype.onUndo = function() {}, dwv.tool.Draw = function(a, b) {
    function c() {
        d(!1), t = a.getDrawLayer(), d(!0)
    }

    function d(b) {
        t.listening(b), t.hitGraphEnabled(b);
        for (var c = t.getChildren(), d = [], f = function(a) {
                return "shape" === a.name()
            }, g = 0; g < c.length; ++g) d.push(c[g].getChildren(f)[0]);
        b ? (a.addLayerListeners(a.getDrawStage().getContent()), d.forEach(function(a) {
            h.setShapeOn(a)
        })) : (a.removeLayerListeners(a.getDrawStage().getContent()), d.forEach(function(a) {
            e(a)
        })), t.draw()
    }

    function e(a) {
        a.off("mouseover"), a.off("mouseout"), a.draggable(!1), a.off("dragstart"), a.off("dragmove"), a.off("dragend")
    }

    function f(b) {
        var c = a.getDrawStage();
        return {
            x: c.offset().x + b.x / c.scale().x,
            y: c.offset().y + b.y / c.scale().y
        }
    }

    function g(a) {
        if ("undefined" != typeof s[a.type])
            for (var b = 0; b < s[a.type].length; ++b) s[a.type][b](a)
    }
    var h = this,
        i = null,
        j = !1;
    this.shapeFactoryList = b;
    var k = null,
        l = null;
    this.shapeName = 0;
    var m = [],
        n = null,
        o = new dwv.tool.ShapeEditor(a);
    o.setDrawEventCallback(g);
    var p = new Kinetic.Group,
        q = new Kinetic.Line({
            points: [-10, -10, 10, 10],
            stroke: "red"
        }),
        r = new Kinetic.Line({
            points: [10, -10, -10, 10],
            stroke: "red"
        });
    p.add(q), p.add(r);
    var s = {},
        t = null;
    this.mousedown = function(b) {
        var c = a.getDrawStage(),
            d = c.getIntersection({
                x: b._xs,
                y: b._ys
            });
        if (d) {
            var e = d.getParent(),
                f = e.find(".shape")[0];
            f && f !== o.getShape() && (o.disable(), o.setShape(f), o.setImage(a.getImage()), o.enable())
        } else o.disable(), o.setShape(null), o.setImage(null), j = !0, m = [], n = new dwv.math.Point2D(b._x, b._y), m.push(n)
    }, this.mousemove = function(b) {
        if (j && (Math.abs(b._x - n.getX()) > 0 || Math.abs(b._y - n.getY()) > 0)) {
            n = new dwv.math.Point2D(b._x, b._y), 1 != m.length && m.pop(), m.push(n);
            var c = new h.shapeFactoryList[h.shapeName];
            m.length < c.getNPoints() && (clearTimeout(this.timer), this.timer = setTimeout(function() {
                m.push(n)
            }, c.getTimeout())), l && l.destroy(), l = c.create(m, a.getStyle(), a.getImage());
            var d = l.getChildren(function(a) {
                return "shape" === a.name()
            })[0];
            d.listening(!1), t.hitGraphEnabled(!1), k = new dwv.tool.DrawGroupCommand(l, h.shapeName, t), k.execute()
        }
    }, this.mouseup = function() {
        if (j && m.length > 1) {
            l && l.destroy();
            var b = new h.shapeFactoryList[h.shapeName],
                c = b.create(m, a.getStyle(), a.getImage());
            c.id(dwv.math.guid()), t.hitGraphEnabled(!0), k = new dwv.tool.DrawGroupCommand(c, h.shapeName, t), k.onExecute = g, k.onUndo = g, k.execute(), a.addToUndoStack(k);
            var d = c.getChildren(function(a) {
                return "shape" === a.name()
            })[0];
            h.setShapeOn(d)
        }
        j = !1
    }, this.mouseout = function(a) {
        h.mouseup(a)
    }, this.touchstart = function(a) {
        h.mousedown(a)
    }, this.touchmove = function(a) {
        h.mousemove(a)
    }, this.touchend = function(a) {
        h.mouseup(a)
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        i = new dwv.gui.Draw(a), i.setup(this.shapeFactoryList)
    }, this.display = function(b) {
        i && i.display(b), o.disable(), o.setShape(null), o.setImage(null), document.body.style.cursor = "default", a.getDrawStage().listening(b), t = a.getDrawLayer(), c(b), b ? (a.addEventListener("slice-change", c), a.addEventListener("frame-change", c)) : (a.removeEventListener("slice-change", c), a.removeEventListener("frame-change", c))
    }, this.setShapeOn = function(b) {
        b.on("mouseover", function() {
            document.body.style.cursor = "pointer"
        }), b.on("mouseout", function() {
            document.body.style.cursor = "default"
        }), b.draggable(!0);
        var c = null,
            d = null,
            e = "shape";
        b instanceof Kinetic.Line ? e = 4 == b.points().length ? "line" : 6 == b.points().length ? "protractor" : "roi" : b instanceof Kinetic.Rect ? e = "rectangle" : b instanceof Kinetic.Ellipse && (e = "ellipse");
        var h = b.stroke();
        b.on("dragstart", function(b) {
            var d = dwv.html.getEventOffset(b.evt)[0];
            c = f(d);
            var e = a.getDrawStage(),
                g = e.scale(),
                h = {
                    x: 1 / g.x,
                    y: 1 / g.y
                };
            p.x(e.offset().x + 256 / g.x), p.y(e.offset().y + 20 / g.y), p.scale(h), t.add(p), o.setAnchorsActive(!1), t.draw()
        }), b.on("dragmove", function(a) {
            var e, g = dwv.html.getEventOffset(a.evt)[0],
                i = f(g);
            e = d ? {
                x: i.x - d.x,
                y: i.y - d.y
            } : {
                x: i.x - c.x,
                y: i.y - c.y
            }, d = i, Math.abs(i.x - p.x()) < 10 && Math.abs(i.y - p.y()) < 10 ? (p.getChildren().each(function(a) {
                a.stroke("orange")
            }), b.stroke("red")) : (p.getChildren().each(function(a) {
                a.stroke("red")
            }), b.stroke(h));
            var j = this.getParent();
            j.getChildren().each(function(a) {
                a !== this && (a.x(a.x() + e.x), a.y(a.y() + e.y))
            }), o.resetAnchors(), t.draw()
        }), b.on("dragend", function() {
            var f = d;
            if (d = null, Math.abs(f.x - p.x()) < 10 && Math.abs(f.y - p.y()) < 10) {
                var i = {
                        x: f.x - c.x,
                        y: f.y - c.y
                    },
                    j = this.getParent();
                j.getChildren().each(function(a) {
                    a.x(a.x() - i.x), a.y(a.y() - i.y)
                }), b.stroke(h), o.disable(), o.setShape(null), o.setImage(null), document.body.style.cursor = "default";
                var k = new dwv.tool.DeleteGroupCommand(this.getParent(), e, t);
                k.onExecute = g, k.onUndo = g, k.execute(), a.addToUndoStack(k)
            } else {
                var l = {
                    x: f.x - c.x,
                    y: f.y - c.y
                };
                if (0 !== l.x || 0 !== l.y) {
                    var m = new dwv.tool.MoveGroupCommand(this.getParent(), e, l, t);
                    m.onExecute = g, m.onUndo = g, a.addToUndoStack(m), g({
                        type: "draw-move"
                    })
                }
                o.setAnchorsActive(!0), o.resetAnchors()
            }
            p.remove(), t.draw()
        })
    }, this.init = function() {
        var a = 0;
        for (var b in this.shapeFactoryList) {
            a = b;
            break
        }
        return this.setShapeName(a), i && (this.setLineColour(i.getColours()[0]), i.initialise()), !0
    }, this.addEventListener = function(a, b) {
        "undefined" == typeof s[a] && (s[a] = []), s[a].push(b)
    }, this.removeEventListener = function(a, b) {
        if ("undefined" != typeof s[a])
            for (var c = 0; c < s[a].length; ++c) s[a][c] === b && s[a].splice(c, 1)
    }, this.setLineColour = function(b) {
        a.getStyle().setLineColour(b)
    }
}, dwv.tool.Draw.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.Draw.name"),
        brief: dwv.i18n("tool.Draw.brief"),
        mouse: {
            mouse_drag: dwv.i18n("tool.Draw.mouse_drag")
        },
        touch: {
            touch_drag: dwv.i18n("tool.Draw.touch_drag")
        }
    }
}, dwv.tool.Draw.prototype.setShapeName = function(a) {
    if (!this.hasShape(a)) throw new Error("Unknown shape: '" + a + "'");
    this.shapeName = a
}, dwv.tool.Draw.prototype.hasShape = function(a) {
    return this.shapeFactoryList[a]
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.ShapeEditor = function(a) {
    function b(a) {
        if (j && j.getParent()) {
            var b = j.getParent().find(".anchor");
            b.each(a)
        }
    }

    function c(a) {
        b(function(b) {
            b.visible(a)
        })
    }

    function d() {
        b(function(a) {
            a.remove()
        })
    }

    function e() {
        if (j && j.getLayer()) {
            var a = j.getParent();
            if (j instanceof Kinetic.Line) {
                var b = j.points();
                if (4 === b.length || 6 === b.length) {
                    var c = b[0] + j.x(),
                        d = b[1] + j.y(),
                        e = b[2] + j.x(),
                        g = b[3] + j.y();
                    if (f(a, c, d, "begin"), 4 === b.length) m = dwv.tool.UpdateLine, f(a, e, g, "end");
                    else {
                        m = dwv.tool.UpdateProtractor, f(a, e, g, "mid");
                        var h = b[4] + j.x(),
                            i = b[5] + j.y();
                        f(a, h, i, "end")
                    }
                } else {
                    m = dwv.tool.UpdateRoi;
                    for (var k = 0, l = 0, n = 0; n < b.length; n += 2) k = b[n] + j.x(), l = b[n + 1] + j.y(), f(a, k, l, n)
                }
            } else if (j instanceof Kinetic.Rect) {
                m = dwv.tool.UpdateRect;
                var o = j.x(),
                    p = j.y(),
                    q = j.width(),
                    r = j.height();
                f(a, o, p, "topLeft"), f(a, o + q, p, "topRight"), f(a, o + q, p + r, "bottomRight"), f(a, o, p + r, "bottomLeft")
            } else if (j instanceof Kinetic.Ellipse) {
                m = dwv.tool.UpdateEllipse;
                var s = j.x(),
                    t = j.y(),
                    u = j.radius();
                f(a, s - u.x, t - u.y, "topLeft"), f(a, s + u.x, t - u.y, "topRight"), f(a, s + u.x, t + u.y, "bottomRight"), f(a, s - u.x, t + u.y, "bottomLeft")
            }
            j.getLayer().add(a)
        }
    }

    function f(b, c, d, e) {
        var f = new Kinetic.Circle({
            x: c,
            y: d,
            stroke: "#999",
            fillRed: 100,
            fillBlue: 100,
            fillGreen: 100,
            fillAlpha: .7,
            strokeWidth: a.getStyle().getScaledStrokeWidth(),
            radius: a.getStyle().scale(6),
            name: "anchor",
            id: e,
            dragOnTop: !1,
            draggable: !0,
            visible: !1
        });
        h(f), b.add(f)
    }

    function g(a) {
        var b = a.getParent(),
            c = a.id(),
            d = a.x(),
            e = a.y(),
            f = {};
        return f.getParent = function() {
            return b
        }, f.id = function() {
            return c
        }, f.x = function() {
            return d
        }, f.y = function() {
            return e
        }, f
    }

    function h(b) {
        var c = null,
            d = "shape";
        j instanceof Kinetic.Line ? d = 4 == j.points().length ? "line" : 6 == j.points().length ? "protractor" : "roi" : j instanceof Kinetic.Rect ? d = "rectangle" : j instanceof Kinetic.Ellipse && (d = "ellipse"), b.on("dragstart", function() {
            c = g(this)
        }), b.on("dragmove", function() {
            m && m(this, k), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!")
        }), b.on("dragend", function() {
            var b = g(this),
                e = new dwv.tool.ChangeGroupCommand(d, m, c, b, this.getLayer(), k);
            e.onExecute = n, e.onUndo = n, e.execute(), a.addToUndoStack(e), c = b
        }), b.on("mousedown touchstart", function() {
            this.moveToTop()
        }), b.on("mouseover", function() {
            document.body.style.cursor = "pointer", this.stroke("#ddd"), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!")
        }), b.on("mouseout", function() {
            document.body.style.cursor = "default", this.stroke("#999"), this.getLayer() ? this.getLayer().draw() : console.warn("No layer to draw the anchor!")
        })
    }

    function i(a) {
        a.off("dragstart"), a.off("dragmove"), a.off("dragend"), a.off("mousedown touchstart"), a.off("mouseover"), a.off("mouseout")
    }
    var j = null,
        k = null,
        l = !1,
        m = null,
        n = null;
    this.setShape = function(a) {
        j = a, j && (d(), e())
    }, this.setImage = function(a) {
        k = a
    }, this.getShape = function() {
        return j
    }, this.isActive = function() {
        return l
    }, this.setDrawEventCallback = function(a) {
        n = a
    }, this.enable = function() {
        l = !0, j && (c(!0), j.getLayer() && j.getLayer().draw())
    }, this.disable = function() {
        l = !1, j && (c(!1), j.getLayer() && j.getLayer().draw())
    }, this.resetAnchors = function() {
        d(), e(), c(!0)
    }, this.setAnchorsActive = function(a) {
        var c = null;
        c = a ? function(a) {
            h(a)
        } : function(a) {
            i(a)
        }, b(c)
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.EllipseFactory = function() {
    this.getNPoints = function() {
        return 2
    }, this.getTimeout = function() {
        return 0
    }
}, dwv.tool.EllipseFactory.prototype.create = function(a, b, c) {
    var d = Math.abs(a[0].getX() - a[1].getX()),
        e = Math.abs(a[0].getY() - a[1].getY()),
        f = new dwv.math.Ellipse(a[0], d, e),
        g = new Kinetic.Ellipse({
            x: f.getCenter().getX(),
            y: f.getCenter().getY(),
            radius: {
                x: f.getA(),
                y: f.getB()
            },
            stroke: b.getLineColour(),
            strokeWidth: b.getScaledStrokeWidth(),
            name: "shape"
        }),
        h = c.quantifyEllipse(f),
        i = h.surface / 100,
        j = i.toPrecision(4) + " " + dwv.i18n("unit.cm2"),
        k = new Kinetic.Text({
            x: f.getCenter().getX(),
            y: f.getCenter().getY(),
            text: j,
            fontSize: b.getScaledFontSize(),
            fontFamily: b.getFontFamily(),
            fill: b.getLineColour(),
            name: "text"
        }),
        l = new Kinetic.Group;
    return l.name("ellipse-group"), l.add(g), l.add(k), l
}, dwv.tool.UpdateEllipse = function(a, b) {
    var c = a.getParent(),
        d = c.getChildren(function(a) {
            return "shape" === a.name()
        })[0],
        e = c.getChildren(function(a) {
            return "text" === a.name()
        })[0],
        f = c.getChildren(function(a) {
            return "topLeft" === a.id()
        })[0],
        g = c.getChildren(function(a) {
            return "topRight" === a.id()
        })[0],
        h = c.getChildren(function(a) {
            return "bottomRight" === a.id()
        })[0],
        i = c.getChildren(function(a) {
            return "bottomLeft" === a.id()
        })[0];
    switch (a.id()) {
        case "topLeft":
            f.x(a.x()), f.y(a.y()), g.y(a.y()), i.x(a.x());
            break;
        case "topRight":
            g.x(a.x()), g.y(a.y()), f.y(a.y()), h.x(a.x());
            break;
        case "bottomRight":
            h.x(a.x()), h.y(a.y()), i.y(a.y()), g.x(a.x());
            break;
        case "bottomLeft":
            i.x(a.x()), i.y(a.y()), h.y(a.y()), f.x(a.x());
            break;
        default:
            console.error("Unhandled anchor id: " + a.id())
    }
    var j = (g.x() - f.x()) / 2,
        k = (h.y() - g.y()) / 2,
        l = {
            x: f.x() + j,
            y: g.y() + k
        };
    d.position(l);
    var m = {
        x: Math.abs(j),
        y: Math.abs(k)
    };
    m && d.radius(m);
    var n = new dwv.math.Ellipse(l, j, k),
        o = b.quantifyEllipse(n),
        p = o.surface / 100,
        q = p.toPrecision(4) + " cm2",
        r = {
            x: l.x,
            y: l.y
        };
    e.position(r), e.text(q)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.filter = dwv.tool.filter || {}, dwv.tool.Filter = function(a, b) {
    var c = null;
    this.filterList = a, this.selectedFilter = 0, this.defaultFilterName = 0, this.displayed = !1, this.setup = function() {
        if (0 !== Object.keys(this.filterList).length) {
            c = new dwv.gui.Filter(b), c.setup(this.filterList);
            for (var a in this.filterList) this.filterList[a].setup()
        }
    }, this.display = function(a) {
        c && c.display(a), this.displayed = a, this.selectedFilter.display(a)
    }, this.init = function() {
        for (var a in this.filterList) {
            this.defaultFilterName = a;
            break
        }
        this.setSelectedFilter(this.defaultFilterName);
        for (a in this.filterList) this.filterList[a].init();
        return c && c.initialise(), !0
    }, this.keydown = function(a) {
        b.onKeydown(a)
    }
}, dwv.tool.Filter.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.Filter.name"),
        brief: dwv.i18n("tool.Filter.brief")
    }
}, dwv.tool.Filter.prototype.getSelectedFilter = function() {
    return this.selectedFilter
}, dwv.tool.Filter.prototype.setSelectedFilter = function(a) {
    if (!this.hasFilter(a)) throw new Error("Unknown filter: '" + a + "'");
    this.displayed && this.selectedFilter.display(!1), this.selectedFilter = this.filterList[a], this.displayed && this.selectedFilter.display(!0)
}, dwv.tool.Filter.prototype.getFilterList = function() {
    return this.filterList
}, dwv.tool.Filter.prototype.hasFilter = function(a) {
    return this.filterList[a]
}, dwv.tool.filter.Threshold = function(a) {
    var b = new dwv.gui.Threshold(a);
    this.setup = function() {
        b.setup()
    }, this.display = function(a) {
        b.display(a)
    }, this.init = function() {
        b.initialise()
    }, this.run = function(b) {
        var c = new dwv.image.filter.Threshold;
        c.setMin(b.min), c.setMax(b.max);
        var d = new dwv.tool.RunFilterCommand(c, a);
        d.execute(), a.addToUndoStack(d)
    }
}, dwv.tool.filter.Sharpen = function(a) {
    var b = new dwv.gui.Sharpen(a);
    this.setup = function() {
        b.setup()
    }, this.display = function(a) {
        b.display(a)
    }, this.init = function() {}, this.run = function() {
        var b = new dwv.image.filter.Sharpen,
            c = new dwv.tool.RunFilterCommand(b, a);
        c.execute(), a.addToUndoStack(c)
    }
}, dwv.tool.filter.Sobel = function(a) {
    var b = new dwv.gui.Sobel(a);
    this.setup = function() {
        b.setup()
    }, this.display = function(a) {
        b.display(a)
    }, this.init = function() {}, dwv.tool.filter.Sobel.prototype.run = function() {
        var b = new dwv.image.filter.Sobel,
            c = new dwv.tool.RunFilterCommand(b, a);
        c.execute(), a.addToUndoStack(c)
    }
}, dwv.tool.RunFilterCommand = function(a, b) {
    this.getName = function() {
        return "Filter-" + a.getName()
    }, this.execute = function() {
        a.setOriginalImage(b.getImage()), b.setImage(a.update()), b.render()
    }, this.undo = function() {
        b.setImage(a.getOriginalImage()), b.render()
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {},
    MagicWand = MagicWand || {};
dwv.tool.Floodfill = function(a) {
    var b = 5,
        c = 0,
        d = 30,
        e = null,
        f = null,
        g = 15,
        h = null,
        i = this;
    this.started = !1;
    var j, k, l = null,
        m = null,
        n = null,
        o = null,
        p = [],
        q = !1;
    this.style = new dwv.html.Style, this.setExtend = function(a) {
        q = a
    }, this.getExtend = function() {
        return q
    };
    var r = function(a) {
            return {
                x: a._x,
                y: a._y
            }
        },
        s = function(a, g) {
            p = [];
            var h = {
                data: e.data,
                width: e.width,
                height: e.height,
                bytes: 4
            };
            f = MagicWand.floodFill(h, a.x, a.y, g), f = MagicWand.gaussBlurOnlyBorder(f, b);
            var i = MagicWand.traceContours(f);
            if (i = MagicWand.simplifyContours(i, c, d), i.length > 0 && i[0].points[0].x) {
                for (var j = 0, k = i[0].points.length; j < k; j++) p.push(new dwv.math.Point2D(i[0].points[j].x, i[0].points[j].y));
                return p
            }
            return !1
        },
        t = function(b, c) {
            if (o = s(b, c)) {
                var d = new dwv.tool.RoiFactory;
                return n = d.create(o, i.style), m = new dwv.tool.DrawGroupCommand(n, "floodfill", a.getDrawLayer()), m.execute(), !0
            }
            return !1
        };
    this.extend = function() {
        if (!j) throw "'initialpoint' not found. User must click before use extend!";
        n && n.destroy();
        for (var b = a.getViewController().getCurrentPosition(), c = h || g, d = b.k, e = a.getImage().getGeometry().getSize().getNumberOfSlices(); d < e && t(j, c); d++) a.getViewController().incrementSliceNb();
        a.getViewController().setCurrentPosition(b);
        for (var f = b.k; f >= 0 && t(j, c); f--) a.getViewController().decrementSliceNb();
        a.getViewController().setCurrentPosition(b)
    }, this.modifyThreshold = function(a) {
        clearTimeout(k), k = setTimeout(function() {
            n && i.started && n.destroy(), t(j, a)
        }, 100)
    }, this.mousedown = function(b) {
        return (e = a.getImageData()) ? (i.started = !0, j = r(b), void t(j, g)) : console.error("No image found")
    }, this.mousemove = function(a) {
        if (i.started) {
            var b = r(a);
            h = Math.round(Math.sqrt(Math.pow(j.x - b.x, 2) + Math.pow(j.y - b.y, 2)) / 2), h = h < g ? g : h - g, i.modifyThreshold(h)
        }
    }, this.mouseup = function() {
        i.started = !1, q && i.extend()
    }, this.mouseout = function() {
        i.mouseup()
    }, this.touchstart = function(a) {
        i.mousedown(a)
    }, this.touchmove = function(a) {
        i.mousemove(a)
    }, this.touchend = function() {
        i.mouseup()
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        l = new dwv.gui.Livewire(a), l.setup()
    }, this.display = function(a) {
        l && l.display(a), this.init()
    }, this.init = function() {
        return l && (this.setLineColour(l.getColours()[0]), l.initialise()), !0
    }
}, dwv.tool.Floodfill.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.Floodfill.name"),
        brief: dwv.i18n("tool.Floodfill.brief"),
        mouse: {
            click: dwv.i18n("tool.Floodfill.click")
        },
        touch: {
            tap: dwv.i18n("tool.Floodfill.tap")
        }
    }
}, dwv.tool.Floodfill.prototype.setLineColour = function(a) {
    this.style.setLineColour(a)
};
var dwv = dwv || {};
dwv.info = dwv.info || {}, dwv.info.Windowing = function(a) {
    this.create = function() {
        var b = a.getElementsByClassName("wl-info");
        0 !== b.length && dwv.html.removeNodes(b);
        var c = document.createElement("ul");
        c.className = "wl-info";
        var d = document.createElement("li");
        d.className = "window-center", c.appendChild(d);
        var e = document.createElement("li");
        e.className = "window-width", c.appendChild(e), a.appendChild(c)
    }, this.update = function(b) {
        var c = a.getElementsByClassName("window-center")[0];
        dwv.html.cleanNode(c), c.appendChild(document.createTextNode(dwv.i18n("tool.info.window_center", {
            value: b.wc
        })));
        var d = a.getElementsByClassName("window-width")[0];
        dwv.html.cleanNode(d), d.appendChild(document.createTextNode(dwv.i18n("tool.info.window_width", {
            value: b.ww
        })))
    }
}, dwv.info.Position = function(a) {
    this.create = function() {
        var b = a.getElementsByClassName("pos-info");
        0 !== b.length && dwv.html.removeNodes(b);
        var c = document.createElement("ul");
        c.className = "pos-info";
        var d = document.createElement("li");
        d.className = "position", c.appendChild(d);
        var e = document.createElement("li");
        e.className = "frame", c.appendChild(e);
        var f = document.createElement("li");
        f.className = "value", c.appendChild(f), a.appendChild(c)
    }, this.update = function(b) {
        if ("undefined" != typeof b.i) {
            var c = a.getElementsByClassName("position")[0];
            dwv.html.cleanNode(c), c.appendChild(document.createTextNode(dwv.i18n("tool.info.position", {
                value: b.i + ", " + b.j + ", " + b.k
            })))
        }
        if ("undefined" != typeof b.frame) {
            var d = a.getElementsByClassName("frame")[0];
            dwv.html.cleanNode(d), d.appendChild(document.createTextNode(dwv.i18n("tool.info.frame", {
                value: b.frame
            })))
        }
        if ("undefined" != typeof b.value) {
            var e = a.getElementsByClassName("value")[0];
            dwv.html.cleanNode(e), e.appendChild(document.createTextNode(dwv.i18n("tool.info.value", {
                value: b.value
            })))
        }
    }
}, dwv.info.MiniColourMap = function(a, b) {
    this.create = function() {
        var b = a.getElementsByClassName("colour-map-info");
        0 !== b.length && dwv.html.removeNodes(b);
        var c = document.createElement("canvas");
        c.className = "colour-map-info", c.width = 98, c.height = 10, a.appendChild(c)
    }, this.update = function(c) {
        for (var d, e = c.wc, f = c.ww, g = a.getElementsByClassName("colour-map-info")[0], h = g.getContext("2d"), i = b.getViewController().getColourMap(), j = h.getImageData(0, 0, g.width, g.height), k = 0, l = b.getImage().getRescaledDataRange().min, m = b.getImage().getRescaledDataRange().max - l, n = m / g.width, o = 0, p = 255, q = 0, r = e - .5 - (f - 1) / 2, s = e - .5 + (f - 1) / 2, t = 0; t < g.height; ++t) {
            k = l;
            for (var u = 0; u < g.width; ++u) k <= r ? o = q : k > s ? o = p : (o = ((k - (e - .5)) / (f - 1) + .5) * (p - q) + q, o = parseInt(o, 10)), d = 4 * (u + t * g.width), j.data[d] = i.red[o], j.data[d + 1] = i.green[o], j.data[d + 2] = i.blue[o], j.data[d + 3] = 255, k += n
        }
        h.putImageData(j, 0, 0)
    }
}, dwv.info.Plot = function(a, b) {
    this.create = function() {
        a && dwv.html.cleanNode(a), $.plot(a, [b.getImage().getHistogram()], {
            bars: {
                show: !0
            },
            grid: {
                backgroundcolor: null
            },
            xaxis: {
                show: !0
            },
            yaxis: {
                show: !1
            }
        })
    }, this.update = function(c) {
        var d = c.wc,
            e = c.ww,
            f = parseInt((e - 1) / 2, 10),
            g = parseInt(d - .5, 10),
            h = g - f,
            i = g + f,
            j = [{
                color: "#faa",
                lineWidth: 1,
                xaxis: {
                    from: h,
                    to: h
                }
            }, {
                color: "#aaf",
                lineWidth: 1,
                xaxis: {
                    from: i,
                    to: i
                }
            }];
        $.plot(a, [b.getImage().getHistogram()], {
            bars: {
                show: !0
            },
            grid: {
                markings: j,
                backgroundcolour: null
            },
            xaxis: {
                show: !1
            },
            yaxis: {
                show: !1
            }
        })
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.LineFactory = function() {
    this.getNPoints = function() {
        return 2
    }, this.getTimeout = function() {
        return 0
    }
}, dwv.tool.LineFactory.prototype.create = function(a, b, c) {
    var d = new dwv.math.Line(a[0], a[1]),
        e = new Kinetic.Line({
            points: [d.getBegin().getX(), d.getBegin().getY(), d.getEnd().getX(), d.getEnd().getY()],
            stroke: b.getLineColour(),
            strokeWidth: b.getScaledStrokeWidth(),
            name: "shape"
        }),
        f = c.quantifyLine(d),
        g = f.length.toPrecision(4) + " " + dwv.i18n("unit.mm"),
        h = d.getBegin().getX() > d.getEnd().getX() ? 0 : -1,
        i = d.getBegin().getY() > d.getEnd().getY() ? -1 : .5,
        j = new Kinetic.Text({
            x: d.getEnd().getX() + 25 * h,
            y: d.getEnd().getY() + 15 * i,
            text: g,
            fontSize: b.getScaledFontSize(),
            fontFamily: b.getFontFamily(),
            fill: b.getLineColour(),
            name: "text"
        }),
        k = new Kinetic.Group;
    return k.name("line-group"), k.add(e), k.add(j), k
}, dwv.tool.UpdateLine = function(a, b) {
    var c = a.getParent(),
        d = c.getChildren(function(a) {
            return "shape" === a.name()
        })[0],
        e = c.getChildren(function(a) {
            return "text" === a.name()
        })[0],
        f = c.getChildren(function(a) {
            return "begin" === a.id()
        })[0],
        g = c.getChildren(function(a) {
            return "end" === a.id()
        })[0];
    switch (a.id()) {
        case "begin":
            f.x(a.x()), f.y(a.y());
            break;
        case "end":
            g.x(a.x()), g.y(a.y())
    }
    var h = f.x() - d.x(),
        i = f.y() - d.y(),
        j = g.x() - d.x(),
        k = g.y() - d.y();
    d.points([h, i, j, k]);
    var l = new dwv.math.Point2D(f.x(), f.y()),
        m = new dwv.math.Point2D(g.x(), g.y()),
        n = new dwv.math.Line(l, m),
        o = b.quantifyLine(n),
        p = o.length.toPrecision(4) + " " + dwv.i18n("mm"),
        q = n.getBegin().getX() > n.getEnd().getX() ? 0 : -1,
        r = n.getBegin().getY() > n.getEnd().getY() ? -1 : .5,
        s = {
            x: n.getEnd().getX() + 25 * q,
            y: n.getEnd().getY() + 15 * r
        };
    e.position(s), e.text(p)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.Livewire = function(a) {
    function b() {
        for (var b = a.getImage().getGeometry().getSize().getNumberOfRows(), c = 0; c < b; ++c) j[c] = []
    }

    function c() {
        h = new dwv.math.Path, i = new dwv.math.Path
    }
    var d = this,
        e = null;
    this.started = !1;
    var f = null,
        g = null;
    this.style = new dwv.html.Style;
    var h = new dwv.math.Path,
        i = new dwv.math.Path,
        j = [],
        k = 5,
        l = new dwv.math.Scissors;
    this.mousedown = function(e) {
        if (d.started)
            if (Math.abs(e._x - d.x0) < k && Math.abs(e._y - d.y0) < k) d.mousemove(e), console.log("Done."), a.addToUndoStack(f), d.started = !1;
            else {
                h = i, b();
                var g = new dwv.math.FastPoint2D(e._x, e._y);
                l.doTraining(g), h.addControlPoint(i.getPoint(0))
            }
        else {
            d.started = !0, d.x0 = e._x, d.y0 = e._y, c(), b();
            var j = new dwv.math.FastPoint2D(e._x, e._y);
            l.doTraining(j);
            var m = new dwv.math.Point2D(e._x, e._y);
            h.addPoint(m), h.addControlPoint(m)
        }
    }, this.mousemove = function(b) {
        if (d.started) {
            var c = new dwv.math.FastPoint2D(b._x, b._y);
            l.setPoint(c);
            for (var e = 0, k = !1; !j[c.y][c.x] && !k;)
                if (console.log("Getting ready..."), e = l.doWork(), 0 === e.length) k = !0;
                else
                    for (var m = 0; m < e.length - 1; m += 2) {
                        var n = e[m],
                            o = e[m + 1];
                        j[n.y][n.x] = o
                    }
                for (console.log("Ready!"), i = new dwv.math.Path, k = !1; c && !k;) i.addPoint(new dwv.math.Point2D(c.x, c.y)), j[c.y] && j[c.y][c.x] ? c = j[c.y][c.x] : k = !0;
            i.appenPath(h), g && g.destroy();
            var p = new dwv.tool.RoiFactory;
            g = p.create(i.pointArray, d.style), f = new dwv.tool.DrawGroupCommand(g, "livewire", a.getDrawLayer()), f.execute()
        }
    }, this.mouseup = function() {}, this.mouseout = function(a) {
        d.mouseup(a)
    }, this.touchstart = function(a) {
        d.mousedown(a)
    }, this.touchmove = function(a) {
        d.mousemove(a)
    }, this.touchend = function(a) {
        d.mouseup(a)
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        e = new dwv.gui.Livewire(a), e.setup()
    }, this.display = function(a) {
        e && e.display(a), this.init()
    }, this.init = function() {
        e && (this.setLineColour(e.getColours()[0]), e.initialise());
        var b = a.getImage().getGeometry().getSize();
        return l.setDimensions(b.getNumberOfColumns(), b.getNumberOfRows()), l.setData(a.getImageData().data), !0
    }
}, dwv.tool.Livewire.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.Livewire.name"),
        brief: dwv.i18n("tool.Livewire.brief")
    }
}, dwv.tool.Livewire.prototype.setLineColour = function(a) {
    this.style.setLineColour(a)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.ProtractorFactory = function() {
    this.getNPoints = function() {
        return 3
    }, this.getTimeout = function() {
        return 500
    }
}, dwv.tool.ProtractorFactory.prototype.create = function(a, b) {
    for (var c = new dwv.math.Line(a[0], a[1]), d = [], e = 0; e < a.length; ++e) d.push(a[e].getX()), d.push(a[e].getY());
    var f = new Kinetic.Line({
            points: d,
            stroke: b.getLineColour(),
            strokeWidth: b.getScaledStrokeWidth(),
            name: "shape"
        }),
        g = new Kinetic.Group;
    if (g.name("protractor-group"), g.add(f), 3 == a.length) {
        var h = new dwv.math.Line(a[1], a[2]),
            i = dwv.math.getAngle(c, h),
            j = c.getInclination();
        i > 180 && (i = 360 - i, j += i);
        var k = i.toPrecision(4) + "°",
            l = (c.getMidpoint().getX() + h.getMidpoint().getX()) / 2,
            m = (c.getMidpoint().getY() + h.getMidpoint().getY()) / 2,
            n = new Kinetic.Text({
                x: l,
                y: m - 15,
                text: k,
                fontSize: b.getScaledFontSize(),
                fontFamily: b.getFontFamily(),
                fill: b.getLineColour(),
                name: "text"
            }),
            o = 33 * Math.min(c.getLength(), h.getLength()) / 100,
            p = new Kinetic.Arc({
                innerRadius: o,
                outerRadius: o,
                stroke: b.getLineColour(),
                strokeWidth: b.getScaledStrokeWidth(),
                angle: i,
                rotationDeg: -j,
                x: a[1].getX(),
                y: a[1].getY(),
                name: "arc"
            });
        g.add(n), g.add(p)
    }
    return g
}, dwv.tool.UpdateProtractor = function(a) {
    var b = a.getParent(),
        c = b.getChildren(function(a) {
            return "shape" === a.name()
        })[0],
        d = b.getChildren(function(a) {
            return "text" === a.name()
        })[0],
        e = b.getChildren(function(a) {
            return "arc" === a.name()
        })[0],
        f = b.getChildren(function(a) {
            return "begin" === a.id()
        })[0],
        g = b.getChildren(function(a) {
            return "mid" === a.id()
        })[0],
        h = b.getChildren(function(a) {
            return "end" === a.id()
        })[0];
    switch (a.id()) {
        case "begin":
            f.x(a.x()), f.y(a.y());
            break;
        case "mid":
            g.x(a.x()), g.y(a.y());
            break;
        case "end":
            h.x(a.x()), h.y(a.y())
    }
    var i = f.x() - c.x(),
        j = f.y() - c.y(),
        k = g.x() - c.x(),
        l = g.y() - c.y(),
        m = h.x() - c.x(),
        n = h.y() - c.y();
    c.points([i, j, k, l, m, n]);
    var o = new dwv.math.Point2D(f.x(), f.y()),
        p = new dwv.math.Point2D(g.x(), g.y()),
        q = new dwv.math.Point2D(h.x(), h.y()),
        r = new dwv.math.Line(o, p),
        s = new dwv.math.Line(p, q),
        t = dwv.math.getAngle(r, s),
        u = r.getInclination();
    t > 180 && (t = 360 - t, u += t);
    var v = t.toPrecision(4) + "°",
        w = (r.getMidpoint().getX() + s.getMidpoint().getX()) / 2,
        x = (r.getMidpoint().getY() + s.getMidpoint().getY()) / 2,
        y = {
            x: w,
            y: x - 15
        };
    d.position(y), d.text(v);
    var z = 33 * Math.min(r.getLength(), s.getLength()) / 100;
    e.innerRadius(z), e.outerRadius(z), e.angle(t), e.rotation(-u);
    var A = {
        x: g.x(),
        y: g.y()
    };
    e.position(A)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.RectangleFactory = function() {
    this.getNPoints = function() {
        return 2
    }, this.getTimeout = function() {
        return 0
    }
}, dwv.tool.RectangleFactory.prototype.create = function(a, b, c) {
    var d = new dwv.math.Rectangle(a[0], a[1]),
        e = new Kinetic.Rect({
            x: d.getBegin().getX(),
            y: d.getBegin().getY(),
            width: d.getWidth(),
            height: d.getHeight(),
            stroke: b.getLineColour(),
            strokeWidth: b.getScaledStrokeWidth(),
            name: "shape"
        }),
        f = c.quantifyRect(d),
        g = f.surface / 100,
        h = g.toPrecision(4) + " " + dwv.i18n("unit.cm2"),
        i = new Kinetic.Text({
            x: d.getBegin().getX(),
            y: d.getEnd().getY() + 10,
            text: h,
            fontSize: b.getScaledFontSize(),
            fontFamily: b.getFontFamily(),
            fill: b.getLineColour(),
            name: "text"
        }),
        j = new Kinetic.Group;
    return j.name("rectangle-group"), j.add(e), j.add(i), j
}, dwv.tool.UpdateRect = function(a, b) {
    var c = a.getParent(),
        d = c.getChildren(function(a) {
            return "shape" === a.name()
        })[0],
        e = c.getChildren(function(a) {
            return "text" === a.name()
        })[0],
        f = c.getChildren(function(a) {
            return "topLeft" === a.id()
        })[0],
        g = c.getChildren(function(a) {
            return "topRight" === a.id()
        })[0],
        h = c.getChildren(function(a) {
            return "bottomRight" === a.id()
        })[0],
        i = c.getChildren(function(a) {
            return "bottomLeft" === a.id()
        })[0];
    switch (a.id()) {
        case "topLeft":
            f.x(a.x()), f.y(a.y()), g.y(a.y()), i.x(a.x());
            break;
        case "topRight":
            g.x(a.x()), g.y(a.y()), f.y(a.y()), h.x(a.x());
            break;
        case "bottomRight":
            h.x(a.x()), h.y(a.y()), i.y(a.y()), g.x(a.x());
            break;
        case "bottomLeft":
            i.x(a.x()), i.y(a.y()), h.y(a.y()), f.x(a.x());
            break;
        default:
            console.error("Unhandled anchor id: " + a.id())
    }
    d.position(f.position());
    var j = g.x() - f.x(),
        k = i.y() - f.y();
    j && k && d.size({
        width: j,
        height: k
    });
    var l = new dwv.math.Point2D(f.x(), f.y()),
        m = new dwv.math.Point2D(h.x(), h.y()),
        n = new dwv.math.Rectangle(l, m),
        o = b.quantifyRect(n),
        p = o.surface / 100,
        q = p.toPrecision(4) + " cm2",
        r = {
            x: n.getBegin().getX(),
            y: n.getEnd().getY() + 10
        };
    e.position(r), e.text(q)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};
dwv.tool.RoiFactory = function() {
    this.getNPoints = function() {
        return 50
    }, this.getTimeout = function() {
        return 100
    }
}, dwv.tool.RoiFactory.prototype.create = function(a, b) {
    var c = new dwv.math.ROI;
    c.addPoints(a);
    for (var d = [], e = 0; e < c.getLength(); ++e) d.push(c.getPoint(e).getX()), d.push(c.getPoint(e).getY());
    var f = new Kinetic.Line({
            points: d,
            stroke: b.getLineColour(),
            strokeWidth: b.getScaledStrokeWidth(),
            name: "shape",
            closed: !0
        }),
        g = new Kinetic.Group;
    return g.name("roi-group"), g.add(f), g
}, dwv.tool.UpdateRoi = function(a) {
    var b = a.getParent(),
        c = b.getChildren(function(a) {
            return "shape" === a.name()
        })[0],
        d = b.getChildren(function(b) {
            return b.id() === a.id()
        })[0];
    d.x(a.x()), d.y(a.y());
    var e = c.points();
    e[a.id()] = a.x() - c.x(), e[a.id() + 1] = a.y() - c.y(), c.points(e)
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.Scroll = function(a) {
    var b = this,
        c = null;
    this.started = !1, this.mousedown = function(a) {
        b.started = !0, b.x0 = a._x, b.y0 = a._y
    }, this.mousemove = function(c) {
        if (b.started) {
            var d = c._y - b.y0,
                e = Math.abs(d) > 15;
            e && (d > 0 ? a.getViewController().incrementSliceNb() : a.getViewController().decrementSliceNb());
            var f = c._x - b.x0,
                g = Math.abs(f) > 15;
            g && (f > 0 ? a.getViewController().incrementFrameNb() : a.getViewController().decrementFrameNb()), g && (b.x0 = c._x), e && (b.y0 = c._y)
        }
    }, this.mouseup = function() {
        b.started && (b.started = !1)
    }, this.mouseout = function(a) {
        b.mouseup(a)
    }, this.touchstart = function(a) {
        b.mousedown(a)
    }, this.touchmove = function(a) {
        b.mousemove(a)
    }, this.touchend = function(a) {
        b.mouseup(a)
    }, this.DOMMouseScroll = function(b) {
        b.detail < 0 ? a.getViewController().incrementSliceNb() : a.getViewController().decrementSliceNb()
    }, this.mousewheel = function(b) {
        b.wheelDelta > 0 ? a.getViewController().incrementSliceNb() : a.getViewController().decrementSliceNb()
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        c = new dwv.gui.Scroll(a), c.setup()
    }, this.display = function(a) {
        c && c.display(a)
    }, this.init = function() {
        return 1 !== a.getNSlicesToLoad() || 1 !== a.getImage().getNumberOfFrames()
    }
}, dwv.tool.Scroll.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.Scroll.name"),
        brief: dwv.i18n("tool.Scroll.brief"),
        mouse: {
            mouse_drag: dwv.i18n("tool.Scroll.mouse_drag")
        },
        touch: {
            touch_drag: dwv.i18n("tool.Scroll.touch_drag")
        }
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.Toolbox = function(a, b) {
    var c = null,
        d = null,
        e = null;
    this.getToolList = function() {
        return a
    }, this.getSelectedTool = function() {
        return d
    }, this.setup = function() {
        if (0 !== Object.keys(a).length) {
            c = new dwv.gui.Toolbox(b), c.setup(a);
            for (var d in a) a[d].setup()
        }
    }, this.display = function(b) {
        0 !== Object.keys(a).length && c && c.display(b)
    }, this.init = function() {
        var b = Object.keys(a);
        if (0 !== b.length) {
            e = "";
            var d = [],
                f = null;
            for (var g in a) f = a[g].init(), f && "" === e && (e = g), d.push(f);
            this.setSelectedTool(e), c && c.initialise(d)
        }
    }, this.setSelectedTool = function(b) {
        if (!this.hasTool(b)) throw new Error("Unknown tool: '" + b + "'");
        d && d.display(!1), d = a[b], d.display(!0)
    }, this.reset = function() {
        d && d.display(!1), d = null, e = null
    }
}, dwv.tool.Toolbox.prototype.hasTool = function(a) {
    return this.getToolList()[a]
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.UndoStack = function(a) {
    var b = new dwv.gui.Undo(a),
        c = [];
    this.getStack = function() {
        return c
    };
    var d = 0;
    this.add = function(a) {
        c = c.slice(0, d), c.push(a), ++d, b.addCommandToUndoHtml(a.getName())
    }, this.undo = function() {
        d > 0 && (--d, c[d].undo(), b.enableInUndoHtml(!1))
    }, this.redo = function() {
        d < c.length && (c[d].execute(), ++d, b.enableInUndoHtml(!0))
    }, this.setup = function() {
        b.setup()
    }, this.initialise = function() {
        b.initialise()
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.WindowLevel = function(a) {
    var b = this,
        c = null;
    this.started = !1, this.mousedown = function(c) {
        b.started = !0, b.x0 = c._x, b.y0 = c._y, a.getViewController().setCurrentPosition2D(c._x, c._y)
    }, this.mousemove = function(c) {
        if (b.started) {
            var d = c._x - b.x0,
                e = b.y0 - c._y,
                f = parseInt(a.getViewController().getWindowLevel().center, 10) + e,
                g = parseInt(a.getViewController().getWindowLevel().width, 10) + d;
            a.getViewController().setWindowLevel(f, g), b.x0 = c._x, b.y0 = c._y
        }
    }, this.mouseup = function() {
        if (b.started) {
            b.started = !1;
            var d = parseInt(a.getViewController().getWindowLevel().center, 10),
                e = parseInt(a.getViewController().getWindowLevel().width, 10);
            a.getViewController().getPresets().manual = {
                center: d,
                width: e
            }, c && (c.initialise(), dwv.gui.setSelected(a.getElement("presetSelect"), "manual"))
        }
    }, this.mouseout = function(a) {
        b.mouseup(a)
    }, this.touchstart = function(a) {
        b.mousedown(a)
    }, this.touchmove = function(a) {
        b.mousemove(a)
    }, this.touchend = function(a) {
        b.mouseup(a)
    }, this.dblclick = function(b) {
        a.getViewController().setWindowLevel(parseInt(a.getImage().getRescaledValue(b._x, b._y, a.getViewController().getCurrentPosition().k), 10), parseInt(a.getViewController().getWindowLevel().width, 10))
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        c = new dwv.gui.WindowLevel(a), c.setup()
    }, this.display = function(b) {
        c && (null !== a.getImage().getPhotometricInterpretation().match(/MONOCHROME/) ? c.display(b) : c.display(!1))
    }, this.init = function() {
        return c && c.initialise(), !0
    }
}, dwv.tool.WindowLevel.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.WindowLevel.name"),
        brief: dwv.i18n("tool.WindowLevel.brief"),
        mouse: {
            mouse_drag: dwv.i18n("tool.WindowLevel.mouse_drag"),
            double_click: dwv.i18n("tool.WindowLevel.double_click")
        },
        touch: {
            touch_drag: dwv.i18n("tool.WindowLevel.touch_drag")
        }
    }
};
var dwv = dwv || {};
dwv.tool = dwv.tool || {}, dwv.tool.ZoomAndPan = function(a) {
    var b = this,
        c = null;
    this.started = !1, this.mousedown = function(a) {
        b.started = !0, b.x0 = a._xs, b.y0 = a._ys
    }, this.twotouchdown = function(a) {
        b.started = !0, b.x0 = a._x, b.y0 = a._y;
        var c = new dwv.math.Point2D(a._x, a._y),
            d = new dwv.math.Point2D(a._x1, a._y1);
        b.line0 = new dwv.math.Line(c, d), b.midPoint = b.line0.getMidpoint()
    }, this.mousemove = function(c) {
        if (b.started) {
            var d = c._xs - b.x0,
                e = c._ys - b.y0;
            a.stepTranslate(d, e), b.x0 = c._xs, b.y0 = c._ys
        }
    }, this.twotouchmove = function(c) {
        if (b.started) {
            var d = new dwv.math.Point2D(c._x, c._y),
                e = new dwv.math.Point2D(c._x1, c._y1),
                f = new dwv.math.Line(d, e),
                g = f.getLength() / b.line0.getLength();
            if (1 === g) {
                var h = c._y - b.y0;
                if (Math.abs(h) < 15) return;
                h > 0 ? a.getViewController().incrementSliceNb() : a.getViewController().decrementSliceNb()
            } else {
                var i = (g - 1) / 2;
                Math.abs(i) % .1 <= .05 && a.stepZoom(i, c._xs, c._ys)
            }
        }
    }, this.mouseup = function() {
        b.started && (b.started = !1)
    }, this.mouseout = function(a) {
        b.mouseup(a)
    }, this.touchstart = function(a) {
        var c = a.targetTouches;
        1 === c.length ? b.mousedown(a) : 2 === c.length && b.twotouchdown(a)
    }, this.touchmove = function(a) {
        var c = a.targetTouches;
        1 === c.length ? b.mousemove(a) : 2 === c.length && b.twotouchmove(a)
    }, this.touchend = function(a) {
        b.mouseup(a)
    }, this.DOMMouseScroll = function(b) {
        var c = -b.detail / 30;
        a.stepZoom(c, b._xs, b._ys)
    }, this.mousewheel = function(b) {
        var c = b.wheelDelta / 1200;
        a.stepZoom(c, b._xs, b._ys)
    }, this.keydown = function(b) {
        a.onKeydown(b)
    }, this.setup = function() {
        c = new dwv.gui.ZoomAndPan(a), c.setup()
    }, this.display = function(a) {
        c && c.display(a)
    }
}, dwv.tool.ZoomAndPan.prototype.getHelp = function() {
    return {
        title: dwv.i18n("tool.ZoomAndPan.name"),
        brief: dwv.i18n("tool.ZoomAndPan.brief"),
        mouse: {
            mouse_wheel: dwv.i18n("tool.ZoomAndPan.mouse_wheel"),
            mouse_drag: dwv.i18n("tool.ZoomAndPan.mouse_drag")
        },
        touch: {
            twotouch_pinch: dwv.i18n("tool.ZoomAndPan.twotouch_pinch"),
            touch_drag: dwv.i18n("tool.ZoomAndPan.touch_drag")
        }
    }
}, dwv.tool.ZoomAndPan.prototype.init = function() {
    return !0
};
var dwv = dwv || {};
dwv.browser = dwv.browser || {}, dwv.browser.hasFileApi = function() {
    var a = navigator.appVersion.indexOf("Safari") !== -1 && navigator.appVersion.indexOf("Chrome") === -1 && (navigator.appVersion.indexOf("5.0.") !== -1 || navigator.appVersion.indexOf("5.1.") !== -1);
    return a ? (console.warn("Assuming FileAPI support for Safari5..."), !0) : "FileReader" in window
}, dwv.browser.hasXmlHttpRequest = function() {
    return "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest
}, dwv.browser.hasTypedArray = function() {
    return "Uint8Array" in window && "Uint16Array" in window
}, dwv.browser._hasTypedArraySlice = "undefined" != typeof Uint8Array.prototype.slice, dwv.browser.hasTypedArraySlice = function() {
    return dwv.browser._hasTypedArraySlice
}, dwv.browser._hasFloat64Array = "Float64Array" in window, dwv.browser.hasFloat64Array = function() {
    return dwv.browser._hasFloat64Array
}, dwv.browser._hasClampedArray = "Uint8ClampedArray" in window, dwv.browser.hasClampedArray = function() {
    return dwv.browser._hasClampedArray
}, dwv.browser.check = function() {
    var a = "The application cannot be run.",
        b = "";
    if (!dwv.browser.hasFileApi()) throw b = "The File APIs are not supported in this browser. ", alert(b + a), new Error(b);
    if (!dwv.browser.hasXmlHttpRequest()) throw b = "The XMLHttpRequest is not supported in this browser. ", alert(b + a), new Error(b);
    if (!dwv.browser.hasTypedArray()) throw b = "The Typed arrays are not supported in this browser. ", alert(b + a), new Error(b);
    dwv.browser.hasTypedArraySlice() || (console.warn("The TypedArray.slice method is not supported in this browser. This may impair performance. "), Uint16Array.prototype.slice = function(a, b) {
        for (var c = b - a, d = new Uint16Array(c), e = 0; e < c; e++) d[e] = this[a + e];
        return d
    }, Uint8Array.prototype.slice = function(a, b) {
        for (var c = b - a, d = new Uint8Array(c), e = 0; e < c; e++) d[e] = this[a + e];
        return d
    }), dwv.browser.hasClampedArray() || (console.warn("The Uint8ClampedArray is not supported in this browser. This may impair performance. "), window.Uint8ClampedArray = window.Uint8Array), dwv.browser.hasFloat64Array() || (console.warn("The Float64Array is not supported in this browser. This may impair performance. "), window.Float64Array = window.Float32Array)
};
var dwv = dwv || {};
dwv.utils = dwv.utils || {};
var i18next = i18next || {},
    i18nextXHRBackend = i18nextXHRBackend || {},
    i18nextBrowserLanguageDetector = i18nextBrowserLanguageDetector || {};
dwv.i18nInitialise = function(a, b) {
    var c = "undefined" == typeof a ? "auto" : a,
        d = "undefined" == typeof b ? "" : b,
        e = {
            fallbackLng: "en",
            load: "languageOnly",
            backend: {
                loadPath: d + "/locales/{{lng}}/{{ns}}.json"
            }
        },
        f = i18next.use(i18nextXHRBackend);
    "auto" == c ? f.use(i18nextBrowserLanguageDetector) : e.lng = c, f.init(e)
}, dwv.i18nOnLoaded = function(a) {
    i18next.on("loaded", a)
}, dwv.i18n = function(a, b) {
    return i18next.t(a, b)
}, dwv.i18nExists = function(a, b) {
    return i18next.exists(a, b)
}, dwv.i18nPage = function() {
    for (var a = document.getElementsByTagName("*"), b = 0; b < a.length; ++b) "undefined" != typeof a[b].dataset.i18n && (a[b].innerHTML = dwv.i18n(a[b].dataset.i18n))
};
var dwv = dwv || {};
dwv.utils = dwv.utils || {}, dwv.utils.capitaliseFirstLetter = function(a) {
    var b = a;
    return a && (b = a.charAt(0).toUpperCase() + a.slice(1)), b
}, dwv.utils.splitKeyValueString = function(a) {
    var b = {};
    if (a)
        for (var c = a.split("&"), d = 0; d < c.length; ++d) {
            var e = c[d].split("=");
            b[e[0]] ? (b[e[0]] instanceof Array || (b[e[0]] = [b[e[0]]]), b[e[0]].push(e[1])) : b[e[0]] = e[1]
        }
    return b
};
var dwv = dwv || {};
dwv.utils = dwv.utils || {}, dwv.utils.ThreadPool = function(a) {
    var b = this;
    this.taskQueue = [], this.workerQueue = [], this.poolSize = a, this.init = function() {
        for (var c = 0; c < a; ++c) b.workerQueue.push(new dwv.utils.WorkerThread(b))
    }, this.addWorkerTask = function(a) {
        if (b.workerQueue.length > 0) {
            var c = b.workerQueue.shift();
            c.run(a)
        } else b.taskQueue.push(a)
    }, this.freeWorkerThread = function(a) {
        if (b.taskQueue.length > 0) {
            var c = b.taskQueue.shift();
            a.run(c)
        } else b.workerQueue.push(a)
    }
}, dwv.utils.WorkerThread = function(a) {
    function b(a) {
        c.workerTask.callback(a), c.parentPool.freeWorkerThread(c)
    }
    var c = this;
    this.parentPool = a, this.workerTask = {}, this.run = function(a) {
        if (this.workerTask = a, null !== this.workerTask.script) {
            var c = new Worker(a.script);
            c.addEventListener("message", b, !1), c.postMessage(a.startMessage)
        }
    }
}, dwv.utils.WorkerTask = function(a, b, c) {
    this.script = a, this.callback = b, this.startMessage = c
};
var dwv = dwv || {};
dwv.utils = dwv.utils || {}, dwv.utils.base = dwv.utils.base || {}, dwv.utils.splitUri = function(a) {
    var b = {},
        c = null;
    if (a && (c = a.indexOf("?")) !== -1) {
        b.base = a.substr(0, c);
        var d = a.indexOf("#");
        d === -1 && (d = a.length);
        var e = a.substr(c + 1, d - 1 - c);
        b.query = dwv.utils.splitKeyValueString(e)
    }
    return b
}, dwv.utils.getUriQuery = function(a) {
    var b = dwv.utils.splitUri(a);
    return 0 === Object.keys(b).length ? null : b.query
}, dwv.utils.base.decodeQuery = function(a, b) {
    a.type && "manifest" === a.type ? dwv.utils.decodeManifestQuery(a, b) : b(dwv.utils.decodeKeyValueUri(a.input, a.dwvReplaceMode))
}, dwv.utils.decodeKeyValueUri = function(a, b) {
    var c = [],
        d = "key";
    b && (d = b);
    var e = decodeURIComponent(a),
        f = dwv.utils.splitUri(e);
    if (0 === Object.keys(f).length) c.push(e);
    else {
        for (var g = Object.keys(f.query), h = null, i = 0; i < g.length; ++i)
            if (f.query[g[i]] instanceof Array) {
                h = g[i];
                break
            }
        if (h) {
            var j = f.query[h],
                k = f.base;
            "file" !== h && (k += "?");
            for (var l = !1, m = 0; m < g.length; ++m) g[m] !== h && (l && (k += "&"), k += g[m] + "=" + f.query[g[m]], l = !0);
            for (var n, o = 0; o < j.length; ++o) n = k, l && (n += "&"), "key" === d && (n += h + "="), n += j[o], c.push(n)
        } else c.push(e)
    }
    return c
}, dwv.utils.decodeManifestQuery = function(a, b) {
    var c = "";
    "/" === a.input[0] && (c = window.location.protocol + "//" + window.location.host), c += a.input;
    var d = function() {
            console.warn("RequestError while receiving manifest: " + this.status)
        },
        e = function() {
            b(dwv.utils.decodeManifest(this.responseXML, a.nslices))
        },
        f = new XMLHttpRequest;
    f.open("GET", decodeURIComponent(c), !0), f.responseType = "xml", f.onload = e, f.onerror = d, f.send(null)
}, dwv.utils.decodeManifest = function(a, b) {
    var c = [],
        d = a.getElementsByTagName("wado_query"),
        e = d[0].getAttribute("wadoURL"),
        f = e + "?requestType=WADO&contentType=application/dicom&",
        g = a.getElementsByTagName("Patient");
    g.length > 1 && console.warn("More than one patient, loading first one.");
    var h = g[0].getElementsByTagName("Study");
    h.length > 1 && console.warn("More than one study, loading first one.");
    var i = h[0].getAttribute("StudyInstanceUID"),
        j = h[0].getElementsByTagName("Series");
    j.length > 1 && console.warn("More than one series, loading first one.");
    var k = j[0].getAttribute("SeriesInstanceUID"),
        l = j[0].getElementsByTagName("Instance"),
        m = l.length;
    b < m && (m = b);
    for (var n = 0; n < m; ++n) {
        var o = l[n].getAttribute("SOPInstanceUID"),
            p = f + "&studyUID=" + i + "&seriesUID=" + k + "&objectUID=" + o;
        c.push(p)
    }
    return c
};
/*! jQuery.Flipster, v1.1.1 (built 2016-03-03) */ ! function(a, b, c) {
    "use strict";

    function d(a, b) {
        var c = null;
        return function() {
            var d = this,
                e = arguments;
            null === c && (c = setTimeout(function() {
                a.apply(d, e), c = null
            }, b))
        }
    }
    var e = function() {
            var a = {};
            return function(b) {
                if (a[b] !== c) return a[b];
                var d = document.createElement("div"),
                    e = d.style,
                    f = b.charAt(0).toUpperCase() + b.slice(1),
                    g = ["webkit", "moz", "ms", "o"],
                    h = (b + " " + g.join(f + " ") + f).split(" ");
                for (var i in h)
                    if (h[i] in e) return a[b] = h[i];
                return a[b] = !1
            }
        }(),
        f = "http://www.w3.org/2000/svg",
        g = function() {
            var a;
            return function() {
                if (a !== c) return a;
                var b = document.createElement("div");
                return b.innerHTML = "<svg/>", a = b.firstChild && b.firstChild.namespaceURI === f
            }
        }(),
        h = a(b),
        i = e("transform"),
        j = {
            itemContainer: "ul",
            itemSelector: "li",
            start: "center",
            fadeIn: 400,
            loop: !1,
            autoplay: !1,
            pauseOnHover: !0,
            style: "coverflow",
            spacing: -.6,
            click: !0,
            keyboard: !0,
            scrollwheel: !0,
            touch: !0,
            nav: !1,
            buttons: !1,
            buttonPrev: "Previous",
            buttonNext: "Next",
            onItemSwitch: !1
        },
        k = {
            main: "flipster",
            active: "flipster--active",
            container: "flipster__container",
            nav: "flipster__nav",
            navChild: "flipster__nav__child",
            navItem: "flipster__nav__item",
            navLink: "flipster__nav__link",
            navCurrent: "flipster__nav__item--current",
            navCategory: "flipster__nav__item--category",
            navCategoryLink: "flipster__nav__link--category",
            button: "flipster__button",
            buttonPrev: "flipster__button--prev",
            buttonNext: "flipster__button--next",
            item: "flipster__item",
            itemCurrent: "flipster__item--current",
            itemPast: "flipster__item--past",
            itemFuture: "flipster__item--future",
            itemContent: "flipster__item__content"
        },
        l = new RegExp("\\b(" + k.itemCurrent + "|" + k.itemPast + "|" + k.itemFuture + ")(.*?)(\\s|$)", "g"),
        m = new RegExp("\\s\\s+", "g");
    a.fn.flipster = function(b) {
        var e = "string" == typeof b ? !0 : !1;
        if (e) {
            var n = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var c = a(this).data("methods");
                return c[b] ? c[b].apply(this, n) : this
            })
        }
        var o = a.extend({}, j, b);
        return this.each(function() {
            function b(a) {
                var b = "next" === a ? o.buttonNext : o.buttonPrev;
                return "custom" !== o.buttons && g ? '<svg viewBox="0 0 13 20" xmlns="' + f + '" aria-labelledby="title"><title>' + b + '</title><polyline points="10,3 3,10 10,17"' + ("next" === a ? ' transform="rotate(180 6.5,10)"' : "") + "/></svg>" : b
            }

            function e(c) {
                return c = c || "next", a('<button class="' + k.button + " " + ("next" === c ? k.buttonNext : k.buttonPrev) + '" role="button" />').html(b(c)).on("click", function(a) {
                    v(c), a.preventDefault()
                })
            }

            function j() {
                o.buttons && J.length > 1 && (O.find("." + k.button).remove(), O.append(e("prev"), e("next")))
            }

            function n() {
                var b = {};
                !o.nav || J.length <= 1 || (L && L.remove(), L = a('<ul class="' + k.nav + '" role="navigation" />'), N = a(""), J.each(function(c) {
                    var d = a(this),
                        e = d.data("flip-category"),
                        f = d.data("flip-title") || d.attr("title") || c,
                        g = a('<a href="#" class="' + k.navLink + '">' + f + "</a>").data("index", c);
                    if (N = N.add(g), e) {
                        if (!b[e]) {
                            var h = a('<li class="' + k.navItem + " " + k.navCategory + '">'),
                                i = a('<a href="#" class="' + k.navLink + " " + k.navCategoryLink + '" data-flip-category="' + e + '">' + e + "</a>").data("category", e).data("index", c);
                            b[e] = a('<ul class="' + k.navChild + '" />'), N = N.add(i), h.append(i, b[e]).appendTo(L)
                        }
                        b[e].append(g)
                    } else L.append(g);
                    g.wrap('<li class="' + k.navItem + '">')
                }), L.on("click", "a", function(b) {
                    var c = a(this).data("index");
                    c >= 0 && (v(c), b.preventDefault())
                }), "after" === o.nav ? O.append(L) : O.prepend(L), M = L.find("." + k.navItem))
            }

            function p() {
                if (o.nav) {
                    var b = K.data("flip-category");
                    M.removeClass(k.navCurrent), N.filter(function() {
                        return a(this).data("index") === Q || b && a(this).data("category") === b
                    }).parent().addClass(k.navCurrent)
                }
            }

            function q() {
                O.css("transition", "none"), G.css("transition", "none"), J.css("transition", "none")
            }

            function r() {
                O.css("transition", ""), G.css("transition", ""), J.css("transition", "")
            }

            function s() {
                var b, c = 0;
                return J.each(function() {
                    b = a(this).height(), b > c && (c = b)
                }), c
            }

            function t(b) {
                return b && q(), H = G.width(), G.height(s()), H ? (I && (clearInterval(I), I = !1), void J.each(function(c) {
                    var d, e, f = a(this);
                    f.attr("class", function(a, b) {
                        return b && b.replace(l, "").replace(m, " ")
                    }), d = f.outerWidth(), 0 !== o.spacing && f.css("margin-right", d * o.spacing + "px"), e = f.position().left, P[c] = -1 * (e + d / 2 - H / 2), c === J.length - 1 && (u(), b && setTimeout(r, 1))
                })) : void(I = I || setInterval(function() {
                    t(b)
                }, 500))
            }

            function u() {
                var b, d, e, f = J.length;
                J.each(function(c) {
                    b = a(this), d = " ", c === Q ? (d += k.itemCurrent, e = f + 1) : Q > c ? (d += k.itemPast + " " + k.itemPast + "-" + (Q - c), e = c) : (d += k.itemFuture + " " + k.itemFuture + "-" + (c - Q), e = f - c), b.css("z-index", e).attr("class", function(a, b) {
                        return b && b.replace(l, "").replace(m, " ") + d
                    })
                }), Q >= 0 && (H && P[Q] !== c || t(!0), i ? G.css("transform", "translateX(" + P[Q] + "px)") : G.css({
                    left: P[Q] + "px"
                })), p()
            }

            function v(a) {
                var b = Q;
                if (!(J.length <= 1)) return "prev" === a ? Q > 0 ? Q-- : o.loop && (Q = J.length - 1) : "next" === a ? Q < J.length - 1 ? Q++ : o.loop && (Q = 0) : "number" == typeof a ? Q = a : a !== c && (Q = J.index(a)), K = J.eq(Q), Q !== b && o.onItemSwitch && o.onItemSwitch.call(O, J[Q], J[b]), u(), O
            }

            function w(a) {
                return o.autoplay = a || o.autoplay, clearInterval(R), R = setInterval(function() {
                    var a = Q;
                    v("next"), a !== Q || o.loop || clearInterval(R)
                }, o.autoplay), O
            }

            function x() {
                return clearInterval(R), R = 0, O
            }

            function y(a) {
                return x(), o.autoplay && a && (R = -1), O
            }

            function z() {
                t(!0), O.hide().css("visibility", "").addClass(k.active).fadeIn(o.fadeIn)
            }

            function A() {
                return G = O.find(o.itemContainer).addClass(k.container), J = G.find(o.itemSelector), J.length <= 1 ? void 0 : (J.addClass(k.item).each(function() {
                    var b = a(this);
                    b.children("." + k.itemContent).length || b.wrapInner('<div class="' + k.itemContent + '" />')
                }), o.click && J.on("click.flipster touchend.flipster", function(b) {
                    S || (a(this).hasClass(k.itemCurrent) || b.preventDefault(), v(this))
                }), j(), n(), Q >= 0 && v(Q), O)
            }

            function B(a) {
                o.keyboard && (a[0].tabIndex = 0, a.on("keydown.flipster", d(function(a) {
                    var b = a.which;
                    (37 === b || 39 === b) && (v(37 === b ? "prev" : "next"), a.preventDefault())
                }, 250, !0)))
            }

            function C(a) {
                if (o.scrollwheel) {
                    var b, c, e = !1,
                        f = 0,
                        g = 0,
                        i = 0;
                    a.on("mousewheel.flipster wheel.flipster", function() {
                        e = !0
                    }).on("mousewheel.flipster wheel.flipster", d(function(a) {
                        clearTimeout(g), g = setTimeout(function() {
                            f = 0, i = 0
                        }, 300), a = a.originalEvent, i += a.wheelDelta || -1 * (a.deltaY + a.deltaX), Math.abs(i) < 25 || (f++, b = i > 0 ? "prev" : "next", c !== b && (f = 0), c = b, (6 > f || f % 3 === 0) && v(b), i = 0)
                    }, 50)), h.on("mousewheel.flipster wheel.flipster", function(a) {
                        e && (a.preventDefault(), e = !1)
                    })
                }
            }

            function D(a) {
                if (o.touch) {
                    var b, c, e, f, g = !1,
                        h = d(v, 300);
                    a.on({
                        "touchstart.flipster": function(a) {
                            a = a.originalEvent, S = a.touches ? a.touches[0].clientX : a.clientX, g = a.touches ? a.touches[0].clientY : a.clientY
                        },
                        "touchmove.flipster": d(function(a) {
                            S !== !1 && (a = a.originalEvent, b = a.touches ? a.touches[0].clientX : a.clientX, c = a.touches ? a.touches[0].clientY : a.clientY, e = c - g, f = b - S, Math.abs(e) < 100 && Math.abs(f) >= 30 && (h(0 > f ? "next" : "prev"), S = b, a.preventDefault()))
                        }, 100),
                        "touchend.flipster touchcancel.flipster ": function() {
                            S = !1
                        }
                    })
                }
            }

            function E() {
                var a;
                if (O.css("visibility", "hidden"), A(), J.length <= 1) return void O.css("visibility", "");
                a = o.style ? "flipster--" + o.style.split(" ").join(" flipster--") : !1, O.addClass([k.main, i ? "flipster--transform" : " flipster--no-transform", a, o.click ? "flipster--click" : ""].join(" ")), o.start && (Q = "center" === o.start ? Math.floor(J.length / 2) : o.start), v(Q);
                var b = O.find("img");
                if (b.length) {
                    var c = 0;
                    b.on("load", function() {
                        c++, c >= b.length && z()
                    }), setTimeout(z, 750)
                } else z();
                h.on("resize.flipster", d(t, 400)), o.autoplay && w(), o.pauseOnHover && G.on("mouseenter.flipster", function() {
                    R ? y(!0) : x()
                }).on("mouseleave.flipster", function() {
                    -1 === R && w()
                }), B(O), C(G), D(G)
            }
            var F, G, H, I, J, K, L, M, N, O = a(this),
                P = [],
                Q = 0,
                R = !1,
                S = !1;
            F = {
                jump: v,
                next: function() {
                    return v("next")
                },
                prev: function() {
                    return v("prev")
                },
                play: w,
                stop: x,
                pause: y,
                index: A
            }, O.data("methods", F), O.hasClass(k.active) || E()
        })
    }
}(jQuery, window);

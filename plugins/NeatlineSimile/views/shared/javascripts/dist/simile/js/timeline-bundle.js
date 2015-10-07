/* custom file: belongs to /plugins/NeatlineSimile/views/shared/javascripts/dist/simile/js */

Timeline._Band = function (g, b, f) {
	if (g.autoWidth && typeof b.width == "string") {
		b.width = b.width.indexOf("%") > -1 ? 0 : parseInt(b.width)
	}
	this._timeline = g;
	this._bandInfo = b;
	this._index = f;
	this._locale = ("locale" in b) ? b.locale : Timeline.getDefaultLocale();
	this._timeZone = ("timeZone" in b) ? b.timeZone : 0;
	this._labeller = ("labeller" in b) ? b.labeller : (("createLabeller" in g.getUnit()) ? g.getUnit().createLabeller(this._locale, this._timeZone) : new Timeline.GregorianDateLabeller(this._locale, this._timeZone));
	this._theme = b.theme;
	this._zoomIndex = ("zoomIndex" in b) ? b.zoomIndex : 0;
	this._zoomSteps = ("zoomSteps" in b) ? b.zoomSteps : null;
	this._dragging = false;
	this._changing = false;
	this._originalScrollSpeed = 5;
	this._scrollSpeed = this._originalScrollSpeed;
	this._onScrollListeners = [];
	var a = this;
	this._syncWithBand = null;
	this._syncWithBandHandler = function (h) {
		a._onHighlightBandScroll()
	};
	this._selectorListener = function (h) {
		a._onHighlightBandScroll()
	};
	var d = this._timeline.getDocument().createElement("div");
	d.className = "timeline-band-input";
	this._timeline.addDiv(d);
	//this._keyboardInput = document.createElement("input");
	//this._keyboardInput.type = "text";
	//d.appendChild(this._keyboardInput);
	//SimileAjax.DOM.registerEventWithObject(this._keyboardInput, "keydown", this, "_onKeyDown");
	//SimileAjax.DOM.registerEventWithObject(this._keyboardInput, "keyup", this, "_onKeyUp");
	this._div = this._timeline.getDocument().createElement("div");
	this._div.id = "timeline-band-" + f;
	this._div.className = "timeline-band timeline-band-" + f;
	this._timeline.addDiv(this._div);
	SimileAjax.DOM.registerEventWithObject(this._div, "mousedown", this, "_onMouseDown");
	SimileAjax.DOM.registerEventWithObject(this._div, "mousemove", this, "_onMouseMove");
	SimileAjax.DOM.registerEventWithObject(this._div, "mouseup", this, "_onMouseUp");
	SimileAjax.DOM.registerEventWithObject(this._div, "mouseout", this, "_onMouseOut");
	SimileAjax.DOM.registerEventWithObject(this._div, "dblclick", this, "_onDblClick");
    
   //MK edit - following lines add mobile functionality. 
	SimileAjax.DOM.registerEventWithObject(this._div,"touchstart",this,"_onTouchStart");
	SimileAjax.DOM.registerEventWithObject(this._div,"touchmove",this,"_onTouchMove");
	Timeline._Band.prototype._onTouchStart=function(D,A,E)
{
    if(A.touches.length == 1)
    {
	var touch = A.changedTouches[0];
	this._dragX=touch.clientX;
	this._dragY=touch.clientY;
    }
}

Timeline._Band.prototype._onTouchMove=function(D,A,E)
{
    if(A.touches.length == 1)
    {
	A.preventDefault();
        var touch = A.changedTouches[0];
	var C=touch.clientX-this._dragX;
        var B=touch.clientY-this._dragY;
        this._dragX=touch.clientX;
        this._dragY=touch.clientY;
        this._moveEther(this._timeline.isHorizontal()?C:B);
	this._positionHighlight();
	this._fireOnScroll();
	this._setSyncWithBandDate();
    } 
};
//end of MK edits 
    
	var c = this._theme != null ? this._theme.mouseWheel : "scroll";
	if (c === "zoom" || c === "scroll" || this._zoomSteps) {
		if (SimileAjax.Platform.browser.isFirefox) {
			SimileAjax.DOM.registerEventWithObject(this._div, "DOMMouseScroll", this, "_onMouseScroll")
		} else {
			SimileAjax.DOM.registerEventWithObject(this._div, "mousewheel", this, "_onMouseScroll")
		}
	}
	this._innerDiv = this._timeline.getDocument().createElement("div");
	this._innerDiv.className = "timeline-band-inner";
	this._div.appendChild(this._innerDiv);
	this._ether = b.ether;
	b.ether.initialize(this, g);
	this._etherPainter = b.etherPainter;
	b.etherPainter.initialize(this, g);
	this._eventSource = b.eventSource;
	if (this._eventSource) {
		this._eventListener = {
			onAddMany : function () {
				a._onAddMany()
			},
			onClear : function () {
				a._onClear()
			}
		};
		this._eventSource.addListener(this._eventListener)
	}
	this._eventPainter = b.eventPainter;
	this._eventTracksNeeded = 0;
	this._eventTrackIncrement = 0;
	b.eventPainter.initialize(this, g);
	this._decorators = ("decorators" in b) ? b.decorators : [];
	for (var e = 0; e < this._decorators.length; e++) {
		this._decorators[e].initialize(this, g)
	}
};
Timeline._Band.SCROLL_MULTIPLES = 5;
Timeline._Band.prototype.dispose = function () {
	this.closeBubble();
	if (this._eventSource) {
		this._eventSource.removeListener(this._eventListener);
		this._eventListener = null;
		this._eventSource = null
	}
	this._timeline = null;
	this._bandInfo = null;
	this._labeller = null;
	this._ether = null;
	this._etherPainter = null;
	this._eventPainter = null;
	this._decorators = null;
	this._onScrollListeners = null;
	this._syncWithBandHandler = null;
	this._selectorListener = null;
	this._div = null;
	this._innerDiv = null;
	this._keyboardInput = null
};
Timeline._Band.prototype.addOnScrollListener = function (a) {
	this._onScrollListeners.push(a)
};
Timeline._Band.prototype.removeOnScrollListener = function (b) {
	for (var a = 0; a < this._onScrollListeners.length; a++) {
		if (this._onScrollListeners[a] == b) {
			this._onScrollListeners.splice(a, 1);
			break
		}
	}
};
Timeline._Band.prototype.setSyncWithBand = function (b, a) {
	if (this._syncWithBand) {
		this._syncWithBand.removeOnScrollListener(this._syncWithBandHandler)
	}
	this._syncWithBand = b;
	this._syncWithBand.addOnScrollListener(this._syncWithBandHandler);
	this._highlight = a;
	this._positionHighlight()
};
Timeline._Band.prototype.getLocale = function () {
	return this._locale
};
Timeline._Band.prototype.getTimeZone = function () {
	return this._timeZone
};
Timeline._Band.prototype.getLabeller = function () {
	return this._labeller
};
Timeline._Band.prototype.getIndex = function () {
	return this._index
};
Timeline._Band.prototype.getEther = function () {
	return this._ether
};
Timeline._Band.prototype.getEtherPainter = function () {
	return this._etherPainter
};
Timeline._Band.prototype.getEventSource = function () {
	return this._eventSource
};
Timeline._Band.prototype.getEventPainter = function () {
	return this._eventPainter
};
Timeline._Band.prototype.getTimeline = function () {
	return this._timeline
};
Timeline._Band.prototype.updateEventTrackInfo = function (a, b) {
	this._eventTrackIncrement = b;
	if (a > this._eventTracksNeeded) {
		this._eventTracksNeeded = a
	}
};
Timeline._Band.prototype.checkAutoWidth = function () {
	if (!this._timeline.autoWidth) {
		return
	}
	var c = this._eventPainter.getType() == "overview";
	var a = c ? this._theme.event.overviewTrack.autoWidthMargin : this._theme.event.track.autoWidthMargin;
	var d = Math.ceil((this._eventTracksNeeded + a) * this._eventTrackIncrement);
	d += c ? this._theme.event.overviewTrack.offset : this._theme.event.track.offset;
	var b = this._bandInfo;
	if (d != b.width) {
		b.width = d
	}
};
Timeline._Band.prototype.layout = function () {
	this.paint()
};
Timeline._Band.prototype.paint = function () {
	this._etherPainter.paint();
	this._paintDecorators();
	this._paintEvents()
};
Timeline._Band.prototype.softLayout = function () {
	this.softPaint()
};
Timeline._Band.prototype.softPaint = function () {
	this._etherPainter.softPaint();
	this._softPaintDecorators();
	this._softPaintEvents()
};
Timeline._Band.prototype.setBandShiftAndWidth = function (a, b) {
	//var c = this._keyboardInput.parentNode;
	var d = a + Math.floor(b / 2);
	if (this._timeline.isHorizontal()) {
		this._div.style.top = a + "px";
		this._div.style.height = b + "px";
		//c.style.top = d + "px";
		//c.style.left = "-1em"
	} else {
		this._div.style.left = a + "px";
		this._div.style.width = b + "px";
		//c.style.left = d + "px";
		//c.style.top = "-1em"
	}
};
Timeline._Band.prototype.getViewWidth = function () {
	if (this._timeline.isHorizontal()) {
		return this._div.offsetHeight
	} else {
		return this._div.offsetWidth
	}
};
Timeline._Band.prototype.setViewLength = function (a) {
	this._viewLength = a;
	this._recenterDiv();
	this._onChanging()
};
Timeline._Band.prototype.getViewLength = function () {
	return this._viewLength
};
Timeline._Band.prototype.getTotalViewLength = function () {
	return Timeline._Band.SCROLL_MULTIPLES * this._viewLength
};
Timeline._Band.prototype.getViewOffset = function () {
	return this._viewOffset
};
Timeline._Band.prototype.getMinDate = function () {
	return this._ether.pixelOffsetToDate(this._viewOffset)
};
Timeline._Band.prototype.getMaxDate = function () {
	return this._ether.pixelOffsetToDate(this._viewOffset + Timeline._Band.SCROLL_MULTIPLES * this._viewLength)
};
Timeline._Band.prototype.getMinVisibleDate = function () {
	return this._ether.pixelOffsetToDate(0)
};
Timeline._Band.prototype.getMinVisibleDateAfterDelta = function (a) {
	return this._ether.pixelOffsetToDate(a)
};
Timeline._Band.prototype.getMaxVisibleDate = function () {
	return this._ether.pixelOffsetToDate(this._viewLength)
};
Timeline._Band.prototype.getMaxVisibleDateAfterDelta = function (a) {
	return this._ether.pixelOffsetToDate(this._viewLength + a)
};
Timeline._Band.prototype.getCenterVisibleDate = function () {
	return this._ether.pixelOffsetToDate(this._viewLength / 2)
};
Timeline._Band.prototype.setMinVisibleDate = function (a) {
	if (!this._changing) {
		this._moveEther(Math.round(-this._ether.dateToPixelOffset(a)))
	}
};
Timeline._Band.prototype.setMaxVisibleDate = function (a) {
	if (!this._changing) {
		this._moveEther(Math.round(this._viewLength - this._ether.dateToPixelOffset(a)))
	}
};
Timeline._Band.prototype.setCenterVisibleDate = function (a) {
	if (!this._changing) {
		this._moveEther(Math.round(this._viewLength / 2 - this._ether.dateToPixelOffset(a)))
	}
};
Timeline._Band.prototype.dateToPixelOffset = function (a) {
	return this._ether.dateToPixelOffset(a) - this._viewOffset
};
Timeline._Band.prototype.pixelOffsetToDate = function (a) {
	return this._ether.pixelOffsetToDate(a + this._viewOffset)
};
Timeline._Band.prototype.createLayerDiv = function (c, a) {
	var b = this._timeline.getDocument().createElement("div");
	b.className = "timeline-band-layer" + (typeof a == "string" ? (" " + a) : "");
	b.style.zIndex = c;
	this._innerDiv.appendChild(b);
	var d = this._timeline.getDocument().createElement("div");
	d.className = "timeline-band-layer-inner";
	if (SimileAjax.Platform.browser.isIE) {
		d.style.cursor = "move"
	} else {
		d.style.cursor = "-moz-grab"
	}
	b.appendChild(d);
	return d
};
Timeline._Band.prototype.removeLayerDiv = function (a) {
	this._innerDiv.removeChild(a.parentNode)
};
Timeline._Band.prototype.scrollToCenter = function (a, b) {
	var c = this._ether.dateToPixelOffset(a);
	if (c < -this._viewLength / 2) {
		this.setCenterVisibleDate(this.pixelOffsetToDate(c + this._viewLength))
	} else {
		if (c > 3 * this._viewLength / 2) {
			this.setCenterVisibleDate(this.pixelOffsetToDate(c - this._viewLength))
		}
	}
	this._autoScroll(Math.round(this._viewLength / 2 - this._ether.dateToPixelOffset(a)), b)
};
Timeline._Band.prototype.showBubbleForEvent = function (b) {
	var a = this.getEventSource().getEvent(b);
	if (a) {
		var c = this;
		this.scrollToCenter(a.getStart(), function () {
			c._eventPainter.showBubble(a)
		})
	}
};
Timeline._Band.prototype.zoom = function (e, a, b, c) {
	if (!this._zoomSteps) {
		return
	}
	a += this._viewOffset;
	var d = this._ether.pixelOffsetToDate(a);
	var f = this._ether.zoom(e);
	this._etherPainter.zoom(f);
	this._moveEther(Math.round(-this._ether.dateToPixelOffset(d)));
	this._moveEther(a)
};
Timeline._Band.prototype._onMouseDown = function (c, a, b) {
	this.closeBubble();
	this._dragging = true;
	this._dragX = a.clientX;
	this._dragY = a.clientY
};
Timeline._Band.prototype._onMouseMove = function (c, a, b) {
	if (this._dragging) {
		var d = a.clientX - this._dragX;
		var e = a.clientY - this._dragY;
		this._dragX = a.clientX;
		this._dragY = a.clientY;
		this._moveEther(this._timeline.isHorizontal() ? d : e);
		this._positionHighlight()
	}
};
Timeline._Band.prototype._onMouseUp = function (c, a, b) {
	this._dragging = false;
	//this._keyboardInput.focus()
};
Timeline._Band.prototype._onMouseOut = function (c, d, b) {
	var a = SimileAjax.DOM.getEventRelativeCoordinates(d, c);
	a.x += this._viewOffset;
	if (a.x < 0 || a.x > c.offsetWidth || a.y < 0 || a.y > c.offsetHeight) {
		this._dragging = false
	}
};
Timeline._Band.prototype._onMouseScroll = function (g, f, c) {
	var d = new Date();
	d = d.getTime();
	if (!this._lastScrollTime || ((d - this._lastScrollTime) > 50)) {
		this._lastScrollTime = d;
		var e = 0;
		if (f.wheelDelta) {
			e = f.wheelDelta / 120
		} else {
			if (f.detail) {
				e = -f.detail / 3
			}
		}
		var h = this._theme.mouseWheel;
		if (this._zoomSteps || h === "zoom") {
			var i = SimileAjax.DOM.getEventRelativeCoordinates(f, g);
			if (e != 0) {
				var a;
				if (e > 0) {
					a = true
				}
				if (e < 0) {
					a = false
				}
				this._timeline.zoom(a, i.x, i.y, g)
			}
		} else {
			if (h === "scroll") {
				var b = 50 * (e < 0 ? -1 : 1);
				this._moveEther(b)
			}
		}
	}
	if (f.stopPropagation) {
		f.stopPropagation()
	}
	f.cancelBubble = true;
	if (f.preventDefault) {
		f.preventDefault()
	}
	f.returnValue = false
};
Timeline._Band.prototype._onDblClick = function (d, e, b) {
	var a = SimileAjax.DOM.getEventRelativeCoordinates(e, d);
	var c = a.x - (this._viewLength / 2 - this._viewOffset);
	this._autoScroll(-c)
};
Timeline._Band.prototype._onKeyDown = function (c, a, b) {
	if (!this._dragging) {
		switch (a.keyCode) {
		case 27:
			break;
		case 37:
		case 38:
			this._scrollSpeed = Math.min(50, Math.abs(this._scrollSpeed * 1.05));
			this._moveEther(this._scrollSpeed);
			break;
		case 39:
		case 40:
			this._scrollSpeed = -Math.min(50, Math.abs(this._scrollSpeed * 1.05));
			this._moveEther(this._scrollSpeed);
			break;
		default:
			return true
		}
		this.closeBubble();
		SimileAjax.DOM.cancelEvent(a);
		return false
	}
	return true
};
Timeline._Band.prototype._onKeyUp = function (c, a, b) {
	if (!this._dragging) {
		this._scrollSpeed = this._originalScrollSpeed;
		switch (a.keyCode) {
		case 35:
			this.setCenterVisibleDate(this._eventSource.getLatestDate());
			break;
		case 36:
			this.setCenterVisibleDate(this._eventSource.getEarliestDate());
			break;
		case 33:
			this._autoScroll(this._timeline.getPixelLength());
			break;
		case 34:
			this._autoScroll(-this._timeline.getPixelLength());
			break;
		default:
			return true
		}
		this.closeBubble();
		SimileAjax.DOM.cancelEvent(a);
		return false
	}
	return true
};
Timeline._Band.prototype._autoScroll = function (b, c) {
	var a = this;
	var d = SimileAjax.Graphics.createAnimation(function (f, e) {
			a._moveEther(e)
		}, 0, b, 1000, c);
	d.run()
};
Timeline._Band.prototype._moveEther = function (a) {
	this.closeBubble();
	if (!this._timeline.shiftOK(this._index, a)) {
		return
	}
	this._viewOffset += a;
	this._ether.shiftPixels(-a);
	if (this._timeline.isHorizontal()) {
		this._div.style.left = this._viewOffset + "px"
	} else {
		this._div.style.top = this._viewOffset + "px"
	}
	if (this._viewOffset > -this._viewLength * 0.5 || this._viewOffset < -this._viewLength * (Timeline._Band.SCROLL_MULTIPLES - 1.5)) {
		this._recenterDiv()
	} else {
		this.softLayout()
	}
	this._onChanging()
};
Timeline._Band.prototype._onChanging = function () {
	this._changing = true;
	this._fireOnScroll();
	this._setSyncWithBandDate();
	this._changing = false
};
Timeline._Band.prototype.busy = function () {
	return (this._changing)
};
Timeline._Band.prototype._fireOnScroll = function () {
	for (var a = 0; a < this._onScrollListeners.length; a++) {
		this._onScrollListeners[a](this)
	}
};
Timeline._Band.prototype._setSyncWithBandDate = function () {
	if (this._syncWithBand) {
		var a = this._ether.pixelOffsetToDate(this.getViewLength() / 2);
		this._syncWithBand.setCenterVisibleDate(a)
	}
};
Timeline._Band.prototype._onHighlightBandScroll = function () {
	if (this._syncWithBand) {
		var a = this._syncWithBand.getCenterVisibleDate();
		var b = this._ether.dateToPixelOffset(a);
		this._moveEther(Math.round(this._viewLength / 2 - b));
		if (this._highlight) {
			this._etherPainter.setHighlight(this._syncWithBand.getMinVisibleDate(), this._syncWithBand.getMaxVisibleDate())
		}
	}
};
Timeline._Band.prototype._onAddMany = function () {
	this._paintEvents()
};
Timeline._Band.prototype._onClear = function () {
	this._paintEvents()
};
Timeline._Band.prototype._positionHighlight = function () {
	if (this._syncWithBand) {
		var a = this._syncWithBand.getMinVisibleDate();
		var b = this._syncWithBand.getMaxVisibleDate();
		if (this._highlight) {
			this._etherPainter.setHighlight(a, b)
		}
	}
};
Timeline._Band.prototype._recenterDiv = function () {
	this._viewOffset = -this._viewLength * (Timeline._Band.SCROLL_MULTIPLES - 1) / 2;
	if (this._timeline.isHorizontal()) {
		this._div.style.left = this._viewOffset + "px";
		this._div.style.width = (Timeline._Band.SCROLL_MULTIPLES * this._viewLength) + "px"
	} else {
		this._div.style.top = this._viewOffset + "px";
		this._div.style.height = (Timeline._Band.SCROLL_MULTIPLES * this._viewLength) + "px"
	}
	this.layout()
};
Timeline._Band.prototype._paintEvents = function () {
	this._eventPainter.paint()
};
Timeline._Band.prototype._softPaintEvents = function () {
	this._eventPainter.softPaint()
};
Timeline._Band.prototype._paintDecorators = function () {
	for (var a = 0; a < this._decorators.length; a++) {
		this._decorators[a].paint()
	}
};
Timeline._Band.prototype._softPaintDecorators = function () {
	for (var a = 0; a < this._decorators.length; a++) {
		this._decorators[a].softPaint()
	}
};
Timeline._Band.prototype.closeBubble = function () {
	SimileAjax.WindowManager.cancelPopups()
};
Timeline.CompactEventPainter = function (a) {
	this._params = a;
	this._onSelectListeners = [];
	this._filterMatcher = null;
	this._highlightMatcher = null;
	this._frc = null;
	this._eventIdToElmt = {}

};
Timeline.CompactEventPainter.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._backLayer = null;
	this._eventLayer = null;
	this._lineLayer = null;
	this._highlightLayer = null;
	this._eventIdToElmt = null
};
Timeline.CompactEventPainter.prototype.addOnSelectListener = function (a) {
	this._onSelectListeners.push(a)
};
Timeline.CompactEventPainter.prototype.removeOnSelectListener = function (b) {
	for (var a = 0; a < this._onSelectListeners.length; a++) {
		if (this._onSelectListeners[a] == b) {
			this._onSelectListeners.splice(a, 1);
			break
		}
	}
};
Timeline.CompactEventPainter.prototype.getFilterMatcher = function () {
	return this._filterMatcher
};
Timeline.CompactEventPainter.prototype.setFilterMatcher = function (a) {
	this._filterMatcher = a
};
Timeline.CompactEventPainter.prototype.getHighlightMatcher = function () {
	return this._highlightMatcher
};
Timeline.CompactEventPainter.prototype.setHighlightMatcher = function (a) {
	this._highlightMatcher = a
};
Timeline.CompactEventPainter.prototype.paint = function () {
	var e = this._band.getEventSource();
	if (e == null) {
		return
	}
	this._eventIdToElmt = {};
	this._prepareForPainting();
	var d = this._params.theme;
	var g = d.event;
	var l = {
		trackOffset : "trackOffset" in this._params ? this._params.trackOffset : 10,
		trackHeight : "trackHeight" in this._params ? this._params.trackHeight : 10,
		tapeHeight : d.event.tape.height,
		tapeBottomMargin : "tapeBottomMargin" in this._params ? this._params.tapeBottomMargin : 2,
		labelBottomMargin : "labelBottomMargin" in this._params ? this._params.labelBottomMargin : 5,
		labelRightMargin : "labelRightMargin" in this._params ? this._params.labelRightMargin : 5,
		defaultIcon : g.instant.icon,
		defaultIconWidth : g.instant.iconWidth,
		defaultIconHeight : g.instant.iconHeight,
		customIconWidth : "iconWidth" in this._params ? this._params.iconWidth : g.instant.iconWidth,
		customIconHeight : "iconHeight" in this._params ? this._params.iconHeight : g.instant.iconHeight,
		iconLabelGap : "iconLabelGap" in this._params ? this._params.iconLabelGap : 2,
		iconBottomMargin : "iconBottomMargin" in this._params ? this._params.iconBottomMargin : 2
	};
	if ("compositeIcon" in this._params) {
		l.compositeIcon = this._params.compositeIcon;
		l.compositeIconWidth = this._params.compositeIconWidth || l.customIconWidth;
		l.compositeIconHeight = this._params.compositeIconHeight || l.customIconHeight
	} else {
		l.compositeIcon = l.defaultIcon;
		l.compositeIconWidth = l.defaultIconWidth;
		l.compositeIconHeight = l.defaultIconHeight
	}
	l.defaultStackIcon = "icon" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.icon : l.defaultIcon;
	l.defaultStackIconWidth = "iconWidth" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.iconWidth : l.defaultIconWidth;
	l.defaultStackIconHeight = "iconHeight" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.iconHeight : l.defaultIconHeight;
	var q = this._band.getMinDate();
	var o = this._band.getMaxDate();
	var a = (this._filterMatcher != null) ? this._filterMatcher : function (s) {
		return true
	};
	var b = (this._highlightMatcher != null) ? this._highlightMatcher : function (s) {
		return -1
	};
	var m = e.getEventIterator(q, o);
	var k = "stackConcurrentPreciseInstantEvents" in this._params && typeof this._params.stackConcurrentPreciseInstantEvents == "object";
	var c = "collapseConcurrentPreciseInstantEvents" in this._params && this._params.collapseConcurrentPreciseInstantEvents;
	if (c || k) {
		var f = [];
		var r = null;
		while (m.hasNext()) {
			var n = m.next();
			if (a(n)) {
				if (!n.isInstant() || n.isImprecise()) {
					this.paintEvent(n, l, this._params.theme, b(n))
				} else {
					if (r != null && r.getStart().getTime() == n.getStart().getTime()) {
						f[f.length - 1].push(n)
					} else {
						f.push([n]);
						r = n
					}
				}
			}
		}
		for (var i = 0; i < f.length; i++) {
			var h = f[i];
			if (h.length == 1) {
				this.paintEvent(h[0], l, this._params.theme, b(n))
			} else {
				var p = -1;
				for (var j = 0; p < 0 && j < h.length; j++) {
					p = b(h[j])
				}
				if (k) {
					this.paintStackedPreciseInstantEvents(h, l, this._params.theme, p)
				} else {
					this.paintCompositePreciseInstantEvents(h, l, this._params.theme, p)
				}
			}
		}
	} else {
		while (m.hasNext()) {
			var n = m.next();
			if (a(n)) {
				this.paintEvent(n, l, this._params.theme, b(n))
			}
		}
	}
	this._highlightLayer.style.display = "block";
	this._lineLayer.style.display = "block";
	this._eventLayer.style.display = "block"
};
Timeline.CompactEventPainter.prototype.softPaint = function () {};
Timeline.CompactEventPainter.prototype._prepareForPainting = function () {
	var b = this._band;
	if (this._backLayer == null) {
		this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
		this._backLayer.style.visibility = "hidden";
		var a = document.createElement("span");
		a.className = "timeline-event-label";
		this._backLayer.appendChild(a);
		this._frc = SimileAjax.Graphics.getFontRenderingContext(a)
	}
	this._frc.update();
	this._tracks = [];
	if (this._highlightLayer != null) {
		b.removeLayerDiv(this._highlightLayer)
	}
	this._highlightLayer = b.createLayerDiv(105, "timeline-band-highlights");
	this._highlightLayer.style.display = "none";
	if (this._lineLayer != null) {
		b.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = b.createLayerDiv(110, "timeline-band-lines");
	this._lineLayer.style.display = "none";
	if (this._eventLayer != null) {
		b.removeLayerDiv(this._eventLayer)
	}
	this._eventLayer = b.createLayerDiv(115, "timeline-band-events");
	this._eventLayer.style.display = "none"
};
Timeline.CompactEventPainter.prototype.paintEvent = function (d, c, b, a) {
	if (d.isInstant()) {
		this.paintInstantEvent(d, c, b, a)
	} else {
		this.paintDurationEvent(d, c, b, a)
	}
};
Timeline.CompactEventPainter.prototype.paintInstantEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseInstantEvent(d, c, b, a)
	} else {
		this.paintPreciseInstantEvent(d, c, b, a)
	}
};
Timeline.CompactEventPainter.prototype.paintDurationEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseDurationEvent(d, c, b, a)
	} else {
		this.paintPreciseDurationEvent(d, c, b, a)
	}
};
Timeline.CompactEventPainter.prototype.paintPreciseInstantEvent = function (g, i, c, d) {
	var b = {
		tooltip : g.getProperty("tooltip") || g.getText()
	};
	var j = {
		url : g.getIcon()
	};
	if (j.url == null) {
		j.url = i.defaultIcon;
		j.width = i.defaultIconWidth;
		j.height = i.defaultIconHeight;
		j.className = "timeline-event-icon-default"
	} else {
		j.width = g.getProperty("iconWidth") || i.customIconWidth;
		j.height = g.getProperty("iconHeight") || i.customIconHeight
	}
	var e = {
		text : g.getText(),
		color : g.getTextColor() || g.getColor(),
		className : g.getClassName()
	};
	var h = this.paintTapeIconLabel(g.getStart(), b, null, j, e, i, c, d);
	var f = this;
	var a = function (k, l, m) {
		return f._onClickInstantEvent(h.iconElmtData.elmt, l, g)
	};
	SimileAjax.DOM.registerEvent(h.iconElmtData.elmt, "mousedown", a);
	SimileAjax.DOM.registerEvent(h.labelElmtData.elmt, "mousedown", a);
	this._eventIdToElmt[g.getID()] = h.iconElmtData.elmt
};
Timeline.CompactEventPainter.prototype.paintCompositePreciseInstantEvents = function (h, j, a, c) {
	var g = h[0];
	var d = [];
	for (var b = 0; b < h.length; b++) {
		d.push(h[b].getProperty("tooltip") || h[b].getText())
	}
	var m = {
		tooltip : d.join("; ")
	};
	var k = {
		url : j.compositeIcon,
		width : j.compositeIconWidth,
		height : j.compositeIconHeight,
		className : "timeline-event-icon-composite"
	};
	var e = {
		text : String.substitute(this._params.compositeEventLabelTemplate, [h.length])
	};
	var i = this.paintTapeIconLabel(g.getStart(), m, null, k, e, j, a, c);
	var f = this;
	var l = function (o, p, n) {
		return f._onClickMultiplePreciseInstantEvent(i.iconElmtData.elmt, p, h)
	};
	SimileAjax.DOM.registerEvent(i.iconElmtData.elmt, "mousedown", l);
	SimileAjax.DOM.registerEvent(i.labelElmtData.elmt, "mousedown", l);
	for (var b = 0; b < h.length; b++) {
		this._eventIdToElmt[h[b].getID()] = i.iconElmtData.elmt
	}
};
Timeline.CompactEventPainter.prototype.paintStackedPreciseInstantEvents = function (w, ay, aE, al) {
	var x = "limit" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.limit : 10;
	var aj = "moreMessageTemplate" in this._params.stackConcurrentPreciseInstantEvents ? this._params.stackConcurrentPreciseInstantEvents.moreMessageTemplate : "%0 More Events";
	var z = x <= w.length - 2;
	var ao = this._band;
	var ae = function (a) {
		return Math.round(ao.dateToPixelOffset(a))
	};
	var ab = function (a) {
		var b = {
			url : a.getIcon()
		};
		if (b.url == null) {
			b.url = ay.defaultStackIcon;
			b.width = ay.defaultStackIconWidth;
			b.height = ay.defaultStackIconHeight;
			b.className = "timeline-event-icon-stack timeline-event-icon-default"
		} else {
			b.width = a.getProperty("iconWidth") || ay.customIconWidth;
			b.height = a.getProperty("iconHeight") || ay.customIconHeight;
			b.className = "timeline-event-icon-stack"
		}
		return b
	};
	var an = ab(w[0]);
	var u = 5;
	var am = 0;
	var aA = 0;
	var ar = 0;
	var v = 0;
	var aw = [];
	for (var au = 0; au < w.length && (!z || au < x); au++) {
		var aF = w[au];
		var aG = aF.getText();
		var s = ab(aF);
		var t = this._frc.computeSize(aG);
		var af = {
			text : aG,
			iconData : s,
			labelSize : t,
			iconLeft : an.width + au * u - s.width
		};
		af.labelLeft = an.width + au * u + ay.iconLabelGap;
		af.top = ar;
		aw.push(af);
		am = Math.min(am, af.iconLeft);
		ar += t.height;
		aA = Math.max(aA, af.labelLeft + t.width);
		v = Math.max(v, af.top + s.height)
	}
	if (z) {
		var aC = String.substitute(aj, [w.length - x]);
		var ai = this._frc.computeSize(aC);
		var ag = an.width + (x - 1) * u + ay.iconLabelGap;
		var av = ar;
		ar += ai.height;
		aA = Math.max(aA, ag + ai.width)
	}
	aA += ay.labelRightMargin;
	ar += ay.labelBottomMargin;
	v += ay.iconBottomMargin;
	var ak = ae(w[0].getStart());
	var r = [];
	var ac = Math.ceil(Math.max(v, ar) / ay.trackHeight);
	var ad = an.width + (w.length - 1) * u;
	for (var au = 0; au < ac; au++) {
		r.push({
			start : am,
			end : ad
		})
	}
	var aB = Math.ceil(ar / ay.trackHeight);
	for (var au = 0; au < aB; au++) {
		var aa = r[au];
		aa.end = Math.max(aa.end, aA)
	}
	var ax = this._fitTracks(ak, r);
	var i = ax * ay.trackHeight + ay.trackOffset;
	var aq = this._timeline.getDocument().createElement("div");
	aq.className = "timeline-event-icon-stack";
	aq.style.position = "absolute";
	aq.style.overflow = "visible";
	aq.style.left = ak + "px";
	aq.style.top = i + "px";
	aq.style.width = ad + "px";
	aq.style.height = v + "px";
	aq.innerHTML = "<div style='position: relative'></div>";
	this._eventLayer.appendChild(aq);
	var ah = this;
	var y = function (f) {
		try {
			var a = parseInt(this.getAttribute("index"));
			var c = aq.firstChild.childNodes;
			for (var e = 0; e < c.length; e++) {
				var b = c[e];
				if (e == a) {
					b.style.zIndex = c.length
				} else {
					b.style.zIndex = c.length - e
				}
			}
		} catch (d) {}

	};
	var aD = function (d) {
		var b = aw[d];
		var h = w[d];
		var f = h.getProperty("tooltip") || h.getText();
		var c = ah._paintEventLabel({
				tooltip : f
			}, {
				text : b.text
			}, ak + b.labelLeft, i + b.top, b.labelSize.width, b.labelSize.height, aE);
		c.elmt.setAttribute("index", d);
		c.elmt.onmouseover = y;
		var e = SimileAjax.Graphics.createTranslucentImage(b.iconData.url);
		var g = ah._timeline.getDocument().createElement("div");
		g.className = "timeline-event-icon" + ("className" in b.iconData ? (" " + b.iconData.className) : "");
		g.style.left = b.iconLeft + "px";
		g.style.top = b.top + "px";
		g.style.zIndex = (aw.length - d);
		g.appendChild(e);
		g.setAttribute("index", d);
		g.onmouseover = y;
		aq.firstChild.appendChild(g);
		var a = function (k, l, j) {
			return ah._onClickInstantEvent(c.elmt, l, h)
		};
		SimileAjax.DOM.registerEvent(g, "mousedown", a);
		SimileAjax.DOM.registerEvent(c.elmt, "mousedown", a);
		ah._eventIdToElmt[h.getID()] = g
	};
	for (var au = 0; au < aw.length; au++) {
		aD(au)
	}
	if (z) {
		var at = w.slice(x);
		var ap = this._paintEventLabel({
				tooltip : aC
			}, {
				text : aC
			}, ak + ag, i + av, ai.width, ai.height, aE);
		var az = function (c, a, b) {
			return ah._onClickMultiplePreciseInstantEvent(ap.elmt, a, at)
		};
		SimileAjax.DOM.registerEvent(ap.elmt, "mousedown", az);
		for (var au = 0; au < at.length; au++) {
			this._eventIdToElmt[at[au].getID()] = ap.elmt
		}
	}
};
Timeline.CompactEventPainter.prototype.paintImpreciseInstantEvent = function (g, i, c, d) {
	var b = {
		tooltip : g.getProperty("tooltip") || g.getText()
	};
	var k = {
		start : g.getStart(),
		end : g.getEnd(),
		latestStart : g.getLatestStart(),
		earliestEnd : g.getEarliestEnd(),
		isInstant : true
	};
	var j = {
		url : g.getIcon()
	};
	if (j.url == null) {
		j = null
	} else {
		j.width = g.getProperty("iconWidth") || i.customIconWidth;
		j.height = g.getProperty("iconHeight") || i.customIconHeight
	}
	var e = {
		text : g.getText(),
		color : g.getTextColor() || g.getColor(),
		className : g.getClassName()
	};
	var h = this.paintTapeIconLabel(g.getStart(), b, k, j, e, i, c, d);
	var f = this;
	var a = j != null ? function (n, l, m) {
		return f._onClickInstantEvent(h.iconElmtData.elmt, l, g)
	}
	 : function (n, l, m) {
		return f._onClickInstantEvent(h.labelElmtData.elmt, l, g)
	};
	SimileAjax.DOM.registerEvent(h.labelElmtData.elmt, "mousedown", a);
	SimileAjax.DOM.registerEvent(h.impreciseTapeElmtData.elmt, "mousedown", a);
	if (j != null) {
		SimileAjax.DOM.registerEvent(h.iconElmtData.elmt, "mousedown", a);
		this._eventIdToElmt[g.getID()] = h.iconElmtData.elmt
	} else {
		this._eventIdToElmt[g.getID()] = h.labelElmtData.elmt
	}
};
Timeline.CompactEventPainter.prototype.paintPreciseDurationEvent = function (g, i, c, d) {
	var b = {
		tooltip : g.getProperty("tooltip") || g.getText()
	};
	var k = {
		start : g.getStart(),
		end : g.getEnd(),
		isInstant : false
	};
	var j = {
		url : g.getIcon()
	};
	if (j.url == null) {
		j = null
	} else {
		j.width = g.getProperty("iconWidth") || i.customIconWidth;
		j.height = g.getProperty("iconHeight") || i.customIconHeight
	}
	var e = {
		text : g.getText(),
		color : g.getTextColor() || g.getColor(),
		className : g.getClassName()
	};
	var h = this.paintTapeIconLabel(g.getLatestStart(), b, k, j, e, i, c, d);
	var f = this;
	var a = j != null ? function (n, l, m) {
		return f._onClickInstantEvent(h.iconElmtData.elmt, l, g)
	}
	 : function (n, l, m) {
		return f._onClickInstantEvent(h.labelElmtData.elmt, l, g)
	};
	SimileAjax.DOM.registerEvent(h.labelElmtData.elmt, "mousedown", a);
	SimileAjax.DOM.registerEvent(h.tapeElmtData.elmt, "mousedown", a);
	if (j != null) {
		SimileAjax.DOM.registerEvent(h.iconElmtData.elmt, "mousedown", a);
		this._eventIdToElmt[g.getID()] = h.iconElmtData.elmt
	} else {
		this._eventIdToElmt[g.getID()] = h.labelElmtData.elmt
	}
};
Timeline.CompactEventPainter.prototype.paintImpreciseDurationEvent = function (g, i, c, d) {
	var b = {
		tooltip : g.getProperty("tooltip") || g.getText()
	};
	var k = {
		start : g.getStart(),
		end : g.getEnd(),
		latestStart : g.getLatestStart(),
		earliestEnd : g.getEarliestEnd(),
		isInstant : false
	};
	var j = {
		url : g.getIcon()
	};
	if (j.url == null) {
		j = null
	} else {
		j.width = g.getProperty("iconWidth") || i.customIconWidth;
		j.height = g.getProperty("iconHeight") || i.customIconHeight
	}
	var e = {
		text : g.getText(),
		color : g.getTextColor() || g.getColor(),
		className : g.getClassName()
	};
	var h = this.paintTapeIconLabel(g.getLatestStart(), b, k, j, e, i, c, d);
	var f = this;
	var a = j != null ? function (n, l, m) {
		return f._onClickInstantEvent(h.iconElmtData.elmt, l, g)
	}
	 : function (n, l, m) {
		return f._onClickInstantEvent(h.labelElmtData.elmt, l, g)
	};
	SimileAjax.DOM.registerEvent(h.labelElmtData.elmt, "mousedown", a);
	SimileAjax.DOM.registerEvent(h.tapeElmtData.elmt, "mousedown", a);
	if (j != null) {
		SimileAjax.DOM.registerEvent(h.iconElmtData.elmt, "mousedown", a);
		this._eventIdToElmt[g.getID()] = h.iconElmtData.elmt
	} else {
		this._eventIdToElmt[g.getID()] = h.labelElmtData.elmt
	}
};
Timeline.CompactEventPainter.prototype.paintTapeIconLabel = function (i, p, l, v, ah, g, af, e) {
	var m = this._band;
	var y = function (a) {
		return Math.round(m.dateToPixelOffset(a))
	};
	var ae = y(i);
	var h = [];
	var ag = 0;
	var ac = 0;
	var ab = 0;
	if (l != null) {
		ag = g.tapeHeight + g.tapeBottomMargin;
		ac = Math.ceil(g.tapeHeight / g.trackHeight);
		var ad = y(l.end) - ae;
		var s = y(l.start) - ae;
		for (var n = 0; n < ac; n++) {
			h.push({
				start : s,
				end : ad
			})
		}
		ab = g.trackHeight - (ag % g.tapeHeight)
	}
	var q = 0;
	var j = 0;
	if (v != null) {
		if ("iconAlign" in v && v.iconAlign == "center") {
			q = -Math.floor(v.width / 2)
		}
		j = q + v.width + g.iconLabelGap;
		if (ac > 0) {
			h[ac - 1].end = Math.max(h[ac - 1].end, j)
		}
		var z = v.height + g.iconBottomMargin + ab;
		while (z > 0) {
			h.push({
				start : q,
				end : j
			});
			z -= g.trackHeight
		}
	}
	var o = ah.text;
	var w = this._frc.computeSize(o);
	var r = w.height + g.labelBottomMargin + ab;
	var u = j + w.width + g.labelRightMargin;
	if (ac > 0) {
		h[ac - 1].end = Math.max(h[ac - 1].end, u)
	}
	for (var f = 0; r > 0; f++) {
		if (ac + f < h.length) {
			var k = h[ac + f];
			k.end = u
		} else {
			h.push({
				start : 0,
				end : u
			})
		}
		r -= g.trackHeight
	}
	var x = this._fitTracks(ae, h);
	var t = x * g.trackHeight + g.trackOffset;
	var aa = {};
	aa.labelElmtData = this._paintEventLabel(p, ah, ae + j, t + ag, w.width, w.height, af);
	if (l != null) {
		if ("latestStart" in l || "earliestEnd" in l) {
			aa.impreciseTapeElmtData = this._paintEventTape(p, l, g.tapeHeight, t, y(l.start), y(l.end), af.event.duration.impreciseColor, af.event.duration.impreciseOpacity, g, af)
		}
		if (!l.isInstant && "start" in l && "end" in l) {
			aa.tapeElmtData = this._paintEventTape(p, l, g.tapeHeight, t, ae, y("earliestEnd" in l ? l.earliestEnd : l.end), l.color, 100, g, af)
		}
	}
	if (v != null) {
		aa.iconElmtData = this._paintEventIcon(p, v, t + ag, ae + q, g, af)
	}
	return aa
};
Timeline.CompactEventPainter.prototype._fitTracks = function (d, g) {
	var b;
	for (b = 0; b < this._tracks.length; b++) {
		var e = true;
		for (var h = 0; h < g.length && (b + h) < this._tracks.length; h++) {
			var c = this._tracks[b + h];
			var a = g[h];
			if (d + a.start < c) {
				e = false;
				break
			}
		}
		if (e) {
			break
		}
	}
	for (var f = 0; f < g.length; f++) {
		this._tracks[b + f] = d + g[f].end
	}
	return b
};
Timeline.CompactEventPainter.prototype._paintEventIcon = function (g, f, b, c, e, d) {
	var h = SimileAjax.Graphics.createTranslucentImage(f.url);
	var a = this._timeline.getDocument().createElement("div");
	a.className = "timeline-event-icon" + ("className" in f ? (" " + f.className) : "");
	a.style.left = c + "px";
	a.style.top = b + "px";
	a.appendChild(h);
	if ("tooltip" in g && typeof g.tooltip == "string") {
		a.title = g.tooltip
	}
	this._eventLayer.appendChild(a);
	return {
		left : c,
		top : b,
		width : e.iconWidth,
		height : e.iconHeight,
		elmt : a
	}
};
Timeline.CompactEventPainter.prototype._paintEventLabel = function (i, e, b, h, d, g, a) {
	var f = this._timeline.getDocument();
	var c = f.createElement("div");
	c.className = "timeline-event-label";
	c.style.left = b + "px";
	c.style.width = (d + 1) + "px";
	c.style.top = h + "px";
	c.innerHTML = e.text;
	if ("tooltip" in i && typeof i.tooltip == "string") {
		c.title = i.tooltip
	}
	if ("color" in e && typeof e.color == "string") {
		c.style.color = e.color
	}
	if ("className" in e && typeof e.className == "string") {
		c.className += " " + e.className
	}
	this._eventLayer.appendChild(c);
	return {
		left : b,
		top : h,
		width : d,
		height : g,
		elmt : c
	}
};
Timeline.CompactEventPainter.prototype._paintEventTape = function (j, i, f, g, a, d, l, b, h, k) {
	var c = d - a;
	var e = this._timeline.getDocument().createElement("div");
	e.className = "timeline-event-tape";
	e.style.left = a + "px";
	e.style.top = g + "px";
	e.style.width = c + "px";
	e.style.height = f + "px";
	if ("tooltip" in j && typeof j.tooltip == "string") {
		e.title = j.tooltip
	}
	if (l != null && typeof i.color == "string") {
		e.style.backgroundColor = l
	}
	if ("backgroundImage" in i && typeof i.backgroundImage == "string") {
		e.style.backgroundImage = "url(" + backgroundImage + ")";
		e.style.backgroundRepeat = ("backgroundRepeat" in i && typeof i.backgroundRepeat == "string") ? i.backgroundRepeat : "repeat"
	}
	SimileAjax.Graphics.setOpacity(e, b);
	if ("className" in i && typeof i.className == "string") {
		e.className += " " + i.className
	}
	this._eventLayer.appendChild(e);
	return {
		left : a,
		top : g,
		width : c,
		height : f,
		elmt : e
	}
};
Timeline.CompactEventPainter.prototype._createHighlightDiv = function (a, f, d) {
	if (a >= 0) {
		var e = this._timeline.getDocument();
		var b = d.event;
		var g = b.highlightColors[Math.min(a, b.highlightColors.length - 1)];
		var c = e.createElement("div");
		c.style.position = "absolute";
		c.style.overflow = "hidden";
		c.style.left = (f.left - 2) + "px";
		c.style.width = (f.width + 4) + "px";
		c.style.top = (f.top - 2) + "px";
		c.style.height = (f.height + 4) + "px";
		this._highlightLayer.appendChild(c)
	}
};
Timeline.CompactEventPainter.prototype._onClickMultiplePreciseInstantEvent = function (c, a, f) {
	var b = SimileAjax.DOM.getPageCoordinates(c);
	this._showBubble(b.left + Math.ceil(c.offsetWidth / 2), b.top + Math.ceil(c.offsetHeight / 2), f);
	var d = [];
	for (var e = 0; e < f.length; e++) {
		d.push(f[e].getID())
	}
	this._fireOnSelect(d);
	a.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(a);
	return false
};
Timeline.CompactEventPainter.prototype._onClickInstantEvent = function (c, a, d) {
	var b = SimileAjax.DOM.getPageCoordinates(c);
	this._showBubble(b.left + Math.ceil(c.offsetWidth / 2), b.top + Math.ceil(c.offsetHeight / 2), [d]);
	this._fireOnSelect([d.getID()]);
	a.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(a);
	return false
};
Timeline.CompactEventPainter.prototype._onClickDurationEvent = function (b, f, e) {
	if ("pageX" in f) {
		var a = f.pageX;
		var c = f.pageY
	} else {
		var d = SimileAjax.DOM.getPageCoordinates(b);
		var a = f.offsetX + d.left;
		var c = f.offsetY + d.top
	}
	this._showBubble(a, c, [e]);
	this._fireOnSelect([e.getID()]);
	f.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(f);
	return false
};
Timeline.CompactEventPainter.prototype.showBubble = function (a) {
	var c = this._eventIdToElmt[a.getID()];
	if (c) {
		var b = SimileAjax.DOM.getPageCoordinates(c);
		this._showBubble(b.left + c.offsetWidth / 2, b.top + c.offsetHeight / 2, [a])
	}
};
Timeline.CompactEventPainter.prototype._showBubble = function (a, b, f) {
	var c = document.createElement("div");
	f = ("fillInfoBubble" in f) ? [f] : f;
	for (var d = 0; d < f.length; d++) {
		var e = document.createElement("div");
		c.appendChild(e);
		f[d].fillInfoBubble(e, this._params.theme, this._band.getLabeller())
	}
	SimileAjax.WindowManager.cancelPopups();
	SimileAjax.Graphics.createBubbleForContentAndPoint(c, a, b, this._params.theme.event.bubble.width)
};
Timeline.CompactEventPainter.prototype._fireOnSelect = function (b) {
	for (var a = 0; a < this._onSelectListeners.length; a++) {
		this._onSelectListeners[a](b)
	}
};
Timeline.SpanHighlightDecorator = function (a) {
	this._unit = a.unit != null ? a.unit : SimileAjax.NativeDateUnit;
	this._startDate = (typeof a.startDate == "string") ? this._unit.parseFromObject(a.startDate) : a.startDate;
	this._endDate = (typeof a.endDate == "string") ? this._unit.parseFromObject(a.endDate) : a.endDate;
	this._startLabel = a.startLabel != null ? a.startLabel : "";
	this._endLabel = a.endLabel != null ? a.endLabel : "";
	this._color = a.color;
	this._cssClass = a.cssClass != null ? a.cssClass : null;
	this._opacity = a.opacity != null ? a.opacity : 100;
	this._zIndex = (a.inFront != null && a.inFront) ? 113 : 10
};
Timeline.SpanHighlightDecorator.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._layerDiv = null
};
Timeline.SpanHighlightDecorator.prototype.paint = function () {
	if (this._layerDiv != null) {
		this._band.removeLayerDiv(this._layerDiv)
	}
	this._layerDiv = this._band.createLayerDiv(this._zIndex);
	this._layerDiv.setAttribute("name", "span-highlight-decorator");
	this._layerDiv.style.display = "none";
	var k = this._band.getMinDate();
	var d = this._band.getMaxDate();
	if (this._unit.compare(this._startDate, d) < 0 && this._unit.compare(this._endDate, k) > 0) {
		k = this._unit.later(k, this._startDate);
		d = this._unit.earlier(d, this._endDate);
		var j = this._band.dateToPixelOffset(k);
		var g = this._band.dateToPixelOffset(d);
		var h = this._timeline.getDocument();
		var e = function () {
			var l = h.createElement("table");
			l.insertRow(0).insertCell(0);
			return l
		};
		var c = h.createElement("div");
		c.className = "timeline-highlight-decorator";
		if (this._cssClass) {
			c.className += " " + this._cssClass
		}
		if (this._color != null) {
			c.style.backgroundColor = this._color
		}
		if (this._opacity < 100) {
			SimileAjax.Graphics.setOpacity(c, this._opacity)
		}
		this._layerDiv.appendChild(c);
		var f = e();
		f.className = "timeline-highlight-label timeline-highlight-label-start";
		var b = f.rows[0].cells[0];
		b.innerHTML = this._startLabel;
		if (this._cssClass) {
			b.className = "label_" + this._cssClass
		}
		this._layerDiv.appendChild(f);
		var i = e();
		i.className = "timeline-highlight-label timeline-highlight-label-end";
		var a = i.rows[0].cells[0];
		a.innerHTML = this._endLabel;
		if (this._cssClass) {
			a.className = "label_" + this._cssClass
		}
		this._layerDiv.appendChild(i);
		if (this._timeline.isHorizontal()) {
			c.style.left = j + "px";
			c.style.width = (g - j) + "px";
			f.style.right = (this._band.getTotalViewLength() - j) + "px";
			f.style.width = (this._startLabel.length) + "em";
			i.style.left = g + "px";
			i.style.width = (this._endLabel.length) + "em"
		} else {
			c.style.top = j + "px";
			c.style.height = (g - j) + "px";
			f.style.bottom = j + "px";
			f.style.height = "1.5px";
			i.style.top = g + "px";
			i.style.height = "1.5px"
		}
	}
	this._layerDiv.style.display = "block"
};
Timeline.SpanHighlightDecorator.prototype.softPaint = function () {};
Timeline.PointHighlightDecorator = function (a) {
	this._unit = a.unit != null ? a.unit : SimileAjax.NativeDateUnit;
	this._date = (typeof a.date == "string") ? this._unit.parseFromObject(a.date) : a.date;
	this._width = a.width != null ? a.width : 10;
	this._color = a.color;
	this._cssClass = a.cssClass != null ? a.cssClass : "";
	this._opacity = a.opacity != null ? a.opacity : 100
};
Timeline.PointHighlightDecorator.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._layerDiv = null
};
Timeline.PointHighlightDecorator.prototype.paint = function () {
	if (this._layerDiv != null) {
		this._band.removeLayerDiv(this._layerDiv)
	}
	this._layerDiv = this._band.createLayerDiv(10);
	this._layerDiv.setAttribute("name", "span-highlight-decorator");
	this._layerDiv.style.display = "none";
	var e = this._band.getMinDate();
	var c = this._band.getMaxDate();
	if (this._unit.compare(this._date, c) < 0 && this._unit.compare(this._date, e) > 0) {
		var a = this._band.dateToPixelOffset(this._date);
		var f = a - Math.round(this._width / 2);
		var d = this._timeline.getDocument();
		var b = d.createElement("div");
		b.className = "timeline-highlight-point-decorator";
		b.className += " " + this._cssClass;
		if (this._color != null) {
			b.style.backgroundColor = this._color
		}
		if (this._opacity < 100) {
			SimileAjax.Graphics.setOpacity(b, this._opacity)
		}
		this._layerDiv.appendChild(b);
		if (this._timeline.isHorizontal()) {
			b.style.left = f + "px";
			b.style.width = this._width
		} else {
			b.style.top = f + "px";
			b.style.height = this._width
		}
	}
	this._layerDiv.style.display = "block"
};
Timeline.PointHighlightDecorator.prototype.softPaint = function () {};
Timeline.DetailedEventPainter = function (a) {
	this._params = a;
	this._onSelectListeners = [];
	this._filterMatcher = null;
	this._highlightMatcher = null;
	this._frc = null;
	this._eventIdToElmt = {}

};
Timeline.DetailedEventPainter.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._backLayer = null;
	this._eventLayer = null;
	this._lineLayer = null;
	this._highlightLayer = null;
	this._eventIdToElmt = null
};
Timeline.DetailedEventPainter.prototype.getType = function () {
	return "detailed"
};
Timeline.DetailedEventPainter.prototype.addOnSelectListener = function (a) {
	this._onSelectListeners.push(a)
};
Timeline.DetailedEventPainter.prototype.removeOnSelectListener = function (b) {
	for (var a = 0; a < this._onSelectListeners.length; a++) {
		if (this._onSelectListeners[a] == b) {
			this._onSelectListeners.splice(a, 1);
			break
		}
	}
};
Timeline.DetailedEventPainter.prototype.getFilterMatcher = function () {
	return this._filterMatcher
};
Timeline.DetailedEventPainter.prototype.setFilterMatcher = function (a) {
	this._filterMatcher = a
};
Timeline.DetailedEventPainter.prototype.getHighlightMatcher = function () {
	return this._highlightMatcher
};
Timeline.DetailedEventPainter.prototype.setHighlightMatcher = function (a) {
	this._highlightMatcher = a
};
Timeline.DetailedEventPainter.prototype.paint = function () {
	var b = this._band.getEventSource();
	if (b == null) {
		return
	}
	this._eventIdToElmt = {};
	this._prepareForPainting();
	var f = this._params.theme.event;
	var h = Math.max(f.track.height, this._frc.getLineHeight());
	var i = {
		trackOffset : Math.round(this._band.getViewWidth() / 2 - h / 2),
		trackHeight : h,
		trackGap : f.track.gap,
		trackIncrement : h + f.track.gap,
		icon : f.instant.icon,
		iconWidth : f.instant.iconWidth,
		iconHeight : f.instant.iconHeight,
		labelWidth : f.label.width
	};
	var a = this._band.getMinDate();
	var c = this._band.getMaxDate();
	var e = (this._filterMatcher != null) ? this._filterMatcher : function (k) {
		return true
	};
	var d = (this._highlightMatcher != null) ? this._highlightMatcher : function (k) {
		return -1
	};
	var j = b.getEventReverseIterator(a, c);
	while (j.hasNext()) {
		var g = j.next();
		if (e(g)) {
			this.paintEvent(g, i, this._params.theme, d(g))
		}
	}
	this._highlightLayer.style.display = "block";
	this._lineLayer.style.display = "block";
	this._eventLayer.style.display = "block";
	this._band.updateEventTrackInfo(this._lowerTracks.length + this._upperTracks.length, i.trackIncrement)
};
Timeline.DetailedEventPainter.prototype.softPaint = function () {};
Timeline.DetailedEventPainter.prototype._prepareForPainting = function () {
	var b = this._band;
	if (this._backLayer == null) {
		this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
		this._backLayer.style.visibility = "hidden";
		var a = document.createElement("span");
		a.className = "timeline-event-label";
		this._backLayer.appendChild(a);
		this._frc = SimileAjax.Graphics.getFontRenderingContext(a)
	}
	this._frc.update();
	this._lowerTracks = [];
	this._upperTracks = [];
	if (this._highlightLayer != null) {
		b.removeLayerDiv(this._highlightLayer)
	}
	this._highlightLayer = b.createLayerDiv(105, "timeline-band-highlights");
	this._highlightLayer.style.display = "none";
	if (this._lineLayer != null) {
		b.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = b.createLayerDiv(110, "timeline-band-lines");
	this._lineLayer.style.display = "none";
	if (this._eventLayer != null) {
		b.removeLayerDiv(this._eventLayer)
	}
	this._eventLayer = b.createLayerDiv(110, "timeline-band-events");
	this._eventLayer.style.display = "none"
};
Timeline.DetailedEventPainter.prototype.paintEvent = function (d, c, b, a) {
	if (d.isInstant()) {
		this.paintInstantEvent(d, c, b, a)
	} else {
		this.paintDurationEvent(d, c, b, a)
	}
};
Timeline.DetailedEventPainter.prototype.paintInstantEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseInstantEvent(d, c, b, a)
	} else {
		this.paintPreciseInstantEvent(d, c, b, a)
	}
};
Timeline.DetailedEventPainter.prototype.paintDurationEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseDurationEvent(d, c, b, a)
	} else {
		this.paintPreciseDurationEvent(d, c, b, a)
	}
};
Timeline.DetailedEventPainter.prototype.paintPreciseInstantEvent = function (i, e, b, d) {
	var a = this._timeline.getDocument();
	var k = i.getText();
	var n = i.getStart();
	var m = Math.round(this._band.dateToPixelOffset(n));
	var t = Math.round(m + e.iconWidth / 2);
	var r = Math.round(m - e.iconWidth / 2);
	var p = this._frc.computeSize(k);
	var o = this._findFreeTrackForSolid(t, m);
	var s = this._paintEventIcon(i, o, r, e, b);
	var j = t + b.event.label.offsetFromLine;
	var f = o;
	var q = this._getTrackData(o);
	if (Math.min(q.solid, q.text) >= j + p.width) {
		q.solid = r;
		q.text = j
	} else {
		q.solid = r;
		j = m + b.event.label.offsetFromLine;
		f = this._findFreeTrackForText(o, j + p.width, function (u) {
				u.line = m - 2
			});
		this._getTrackData(f).text = r;
		this._paintEventLine(i, m, o, f, e, b)
	}
	var g = Math.round(e.trackOffset + f * e.trackIncrement + e.trackHeight / 2 - p.height / 2);
	var c = this._paintEventLabel(i, k, j, g, p.width, p.height, b);
	var h = this;
	var l = function (v, w, u) {
		return h._onClickInstantEvent(s.elmt, w, i)
	};
	SimileAjax.DOM.registerEvent(s.elmt, "mousedown", l);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", l);
	this._createHighlightDiv(d, s, b);
	this._eventIdToElmt[i.getID()] = s.elmt
};
Timeline.DetailedEventPainter.prototype.paintImpreciseInstantEvent = function (j, f, b, e) {
	var a = this._timeline.getDocument();
	var l = j.getText();
	var p = j.getStart();
	var d = j.getEnd();
	var n = Math.round(this._band.dateToPixelOffset(p));
	var w = Math.round(this._band.dateToPixelOffset(d));
	var x = Math.round(n + f.iconWidth / 2);
	var u = Math.round(n - f.iconWidth / 2);
	var r = this._frc.computeSize(l);
	var q = this._findFreeTrackForSolid(w, n);
	var t = this._paintEventTape(j, q, n, w, b.event.instant.impreciseColor, b.event.instant.impreciseOpacity, f, b);
	var v = this._paintEventIcon(j, q, u, f, b);
	var s = this._getTrackData(q);
	s.solid = u;
	var k = x + b.event.label.offsetFromLine;
	var o = k + r.width;
	var g;
	if (o < w) {
		g = q
	} else {
		k = n + b.event.label.offsetFromLine;
		o = k + r.width;
		g = this._findFreeTrackForText(q, o, function (y) {
				y.line = n - 2
			});
		this._getTrackData(g).text = u;
		this._paintEventLine(j, n, q, g, f, b)
	}
	var h = Math.round(f.trackOffset + g * f.trackIncrement + f.trackHeight / 2 - r.height / 2);
	var c = this._paintEventLabel(j, l, k, h, r.width, r.height, b);
	var i = this;
	var m = function (z, A, y) {
		return i._onClickInstantEvent(v.elmt, A, j)
	};
	SimileAjax.DOM.registerEvent(v.elmt, "mousedown", m);
	SimileAjax.DOM.registerEvent(t.elmt, "mousedown", m);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", m);
	this._createHighlightDiv(e, v, b);
	this._eventIdToElmt[j.getID()] = v.elmt
};
Timeline.DetailedEventPainter.prototype.paintPreciseDurationEvent = function (k, g, b, e) {
	var a = this._timeline.getDocument();
	var m = k.getText();
	var q = k.getStart();
	var d = k.getEnd();
	var p = Math.round(this._band.dateToPixelOffset(q));
	var u = Math.round(this._band.dateToPixelOffset(d));
	var s = this._frc.computeSize(m);
	var r = this._findFreeTrackForSolid(u);
	var f = k.getColor();
	f = f != null ? f : b.event.duration.color;
	var t = this._paintEventTape(k, r, p, u, f, 100, g, b);
	var n = this._getTrackData(r);
	n.solid = p;
	var l = p + b.event.label.offsetFromLine;
	var h = this._findFreeTrackForText(r, l + s.width, function (v) {
			v.line = p - 2
		});
	this._getTrackData(h).text = p - 2;
	this._paintEventLine(k, p, r, h, g, b);
	var i = Math.round(g.trackOffset + h * g.trackIncrement + g.trackHeight / 2 - s.height / 2);
	var c = this._paintEventLabel(k, m, l, i, s.width, s.height, b);
	var j = this;
	var o = function (v, w, x) {
		return j._onClickDurationEvent(t.elmt, w, k)
	};
	SimileAjax.DOM.registerEvent(t.elmt, "mousedown", o);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", o);
	this._createHighlightDiv(e, t, b);
	this._eventIdToElmt[k.getID()] = t.elmt
};
Timeline.DetailedEventPainter.prototype.paintImpreciseDurationEvent = function (n, g, b, e) {
	var a = this._timeline.getDocument();
	var p = n.getText();
	var t = n.getStart();
	var h = n.getLatestStart();
	var d = n.getEnd();
	var l = n.getEarliestEnd();
	var s = Math.round(this._band.dateToPixelOffset(t));
	var v = Math.round(this._band.dateToPixelOffset(h));
	var z = Math.round(this._band.dateToPixelOffset(d));
	var u = Math.round(this._band.dateToPixelOffset(l));
	var x = this._frc.computeSize(p);
	var w = this._findFreeTrackForSolid(z);
	var f = n.getColor();
	f = f != null ? f : b.event.duration.color;
	var i = this._paintEventTape(n, w, s, z, b.event.duration.impreciseColor, b.event.duration.impreciseOpacity, g, b);
	var y = this._paintEventTape(n, w, v, u, f, 100, g, b);
	var q = this._getTrackData(w);
	q.solid = s;
	var o = v + b.event.label.offsetFromLine;
	var j = this._findFreeTrackForText(w, o + x.width, function (A) {
			A.line = v - 2
		});
	this._getTrackData(j).text = v - 2;
	this._paintEventLine(n, v, w, j, g, b);
	var k = Math.round(g.trackOffset + j * g.trackIncrement + g.trackHeight / 2 - x.height / 2);
	var c = this._paintEventLabel(n, p, o, k, x.width, x.height, b);
	var m = this;
	var r = function (A, B, C) {
		return m._onClickDurationEvent(y.elmt, B, n)
	};
	SimileAjax.DOM.registerEvent(y.elmt, "mousedown", r);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", r);
	this._createHighlightDiv(e, y, b);
	this._eventIdToElmt[n.getID()] = y.elmt
};
Timeline.DetailedEventPainter.prototype._findFreeTrackForSolid = function (b, a) {
	for (var c = 0; true; c++) {
		if (c < this._lowerTracks.length) {
			var d = this._lowerTracks[c];
			if (Math.min(d.solid, d.text) > b && (!(a) || d.line > a)) {
				return c
			}
		} else {
			this._lowerTracks.push({
				solid : Number.POSITIVE_INFINITY,
				text : Number.POSITIVE_INFINITY,
				line : Number.POSITIVE_INFINITY
			});
			return c
		}
		if (c < this._upperTracks.length) {
			var d = this._upperTracks[c];
			if (Math.min(d.solid, d.text) > b && (!(a) || d.line > a)) {
				return -1 - c
			}
		} else {
			this._upperTracks.push({
				solid : Number.POSITIVE_INFINITY,
				text : Number.POSITIVE_INFINITY,
				line : Number.POSITIVE_INFINITY
			});
			return -1 - c
		}
	}
};
Timeline.DetailedEventPainter.prototype._findFreeTrackForText = function (b, d, f) {
	var c;
	var j;
	var i;
	var g;
	if (b < 0) {
		c = true;
		i = -b;
		j = this._findFreeUpperTrackForText(i, d);
		g = -1 - j
	} else {
		if (b > 0) {
			c = false;
			i = b + 1;
			j = this._findFreeLowerTrackForText(i, d);
			g = j
		} else {
			var h = this._findFreeUpperTrackForText(0, d);
			var e = this._findFreeLowerTrackForText(1, d);
			if (e - 1 <= h) {
				c = false;
				i = 1;
				j = e;
				g = j
			} else {
				c = true;
				i = 0;
				j = h;
				g = -1 - j
			}
		}
	}
	if (c) {
		if (j == this._upperTracks.length) {
			this._upperTracks.push({
				solid : Number.POSITIVE_INFINITY,
				text : Number.POSITIVE_INFINITY,
				line : Number.POSITIVE_INFINITY
			})
		}
		for (var a = i; a < j; a++) {
			f(this._upperTracks[a])
		}
	} else {
		if (j == this._lowerTracks.length) {
			this._lowerTracks.push({
				solid : Number.POSITIVE_INFINITY,
				text : Number.POSITIVE_INFINITY,
				line : Number.POSITIVE_INFINITY
			})
		}
		for (var a = i; a < j; a++) {
			f(this._lowerTracks[a])
		}
	}
	return g
};
Timeline.DetailedEventPainter.prototype._findFreeLowerTrackForText = function (a, b) {
	for (; a < this._lowerTracks.length; a++) {
		var c = this._lowerTracks[a];
		if (Math.min(c.solid, c.text) >= b) {
			break
		}
	}
	return a
};
Timeline.DetailedEventPainter.prototype._findFreeUpperTrackForText = function (a, b) {
	for (; a < this._upperTracks.length; a++) {
		var c = this._upperTracks[a];
		if (Math.min(c.solid, c.text) >= b) {
			break
		}
	}
	return a
};
Timeline.DetailedEventPainter.prototype._getTrackData = function (a) {
	return (a < 0) ? this._upperTracks[-a - 1] : this._lowerTracks[a]
};
Timeline.DetailedEventPainter.prototype._paintEventLine = function (e, j, a, d, h, i) {
	var g = Math.round(h.trackOffset + a * h.trackIncrement + h.trackHeight / 2);
	var f = Math.round(Math.abs(d - a) * h.trackIncrement);
	var b = "1px solid " + i.event.label.lineColor;
	var c = this._timeline.getDocument().createElement("div");
	c.style.position = "absolute";
	c.style.left = j + "px";
	c.style.width = i.event.label.offsetFromLine + "px";
	c.style.height = f + "px";
	if (a > d) {
		c.style.top = (g - f) + "px";
		c.style.borderTop = b
	} else {
		c.style.top = g + "px";
		c.style.borderBottom = b
	}
	c.style.borderLeft = b;
	this._lineLayer.appendChild(c)
};
Timeline.DetailedEventPainter.prototype._paintEventIcon = function (e, c, b, i, j) {
	var g = e.getIcon();
	g = g != null ? g : i.icon;
	var h = i.trackOffset + c * i.trackIncrement + i.trackHeight / 2;
	var f = Math.round(h - i.iconHeight / 2);
	var a = SimileAjax.Graphics.createTranslucentImage(g);
	var d = this._timeline.getDocument().createElement("div");
	d.style.position = "absolute";
	d.style.left = b + "px";
	d.style.top = f + "px";
	d.appendChild(a);
	d.style.cursor = "pointer";
	if (e._title != null) {
		d.title = e._title
	}
	this._eventLayer.appendChild(d);
	return {
		left : b,
		top : f,
		width : i.iconWidth,
		height : i.iconHeight,
		elmt : d
	}
};
Timeline.DetailedEventPainter.prototype._paintEventLabel = function (g, f, b, j, d, i, k) {
	var h = this._timeline.getDocument();
	var e = h.createElement("div");
	e.style.position = "absolute";
	e.style.left = b + "px";
	e.style.width = d + "px";
	e.style.top = j + "px";
	e.style.height = i + "px";
	e.style.backgroundColor = k.event.label.backgroundColor;
	SimileAjax.Graphics.setOpacity(e, k.event.label.backgroundOpacity);
	this._eventLayer.appendChild(e);
	var c = h.createElement("div");
	c.style.position = "absolute";
	c.style.left = b + "px";
	c.style.width = d + "px";
	c.style.top = j + "px";
	c.innerHTML = f;
	c.style.cursor = "pointer";
	if (g._title != null) {
		c.title = g._title
	}
	var a = g.getTextColor();
	if (a == null) {
		a = g.getColor()
	}
	if (a != null) {
		c.style.color = a
	}
	this._eventLayer.appendChild(c);
	return {
		left : b,
		top : j,
		width : d,
		height : i,
		elmt : c
	}
};
Timeline.DetailedEventPainter.prototype._paintEventTape = function (f, c, a, d, k, b, i, j) {
	var l = d - a;
	var m = j.event.tape.height;
	var g = i.trackOffset + c * i.trackIncrement + i.trackHeight / 2;
	var h = Math.round(g - m / 2);
	var e = this._timeline.getDocument().createElement("div");
	e.style.position = "absolute";
	e.style.left = a + "px";
	e.style.width = l + "px";
	e.style.top = h + "px";
	e.style.height = m + "px";
	e.style.backgroundColor = k;
	e.style.overflow = "hidden";
	e.style.cursor = "pointer";
	if (f._title != null) {
		e.title = f._title
	}
	SimileAjax.Graphics.setOpacity(e, b);
	this._eventLayer.appendChild(e);
	return {
		left : a,
		top : h,
		width : l,
		height : m,
		elmt : e
	}
};
Timeline.DetailedEventPainter.prototype._createHighlightDiv = function (a, f, d) {
	if (a >= 0) {
		var e = this._timeline.getDocument();
		var b = d.event;
		var g = b.highlightColors[Math.min(a, b.highlightColors.length - 1)];
		var c = e.createElement("div");
		c.style.position = "absolute";
		c.style.overflow = "hidden";
		c.style.left = (f.left - 2) + "px";
		c.style.width = (f.width + 4) + "px";
		c.style.top = (f.top - 2) + "px";
		c.style.height = (f.height + 4) + "px";
		c.style.background = g;
		this._highlightLayer.appendChild(c)
	}
};
Timeline.DetailedEventPainter.prototype._onClickInstantEvent = function (c, a, d) {
	var b = SimileAjax.DOM.getPageCoordinates(c);
	this._showBubble(b.left + Math.ceil(c.offsetWidth / 2), b.top + Math.ceil(c.offsetHeight / 2), d);
	this._fireOnSelect(d.getID());
	a.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(a);
	return false
};
Timeline.DetailedEventPainter.prototype._onClickDurationEvent = function (b, f, e) {
	if ("pageX" in f) {
		var a = f.pageX;
		var c = f.pageY
	} else {
		var d = SimileAjax.DOM.getPageCoordinates(b);
		var a = f.offsetX + d.left;
		var c = f.offsetY + d.top
	}
	this._showBubble(a, c, e);
	this._fireOnSelect(e.getID());
	f.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(f);
	return false
};
Timeline.DetailedEventPainter.prototype.showBubble = function (a) {
	var c = this._eventIdToElmt[a.getID()];
	if (c) {
		var b = SimileAjax.DOM.getPageCoordinates(c);
		this._showBubble(b.left + c.offsetWidth / 2, b.top + c.offsetHeight / 2, a)
	}
};
Timeline.DetailedEventPainter.prototype._showBubble = function (e, b, d) {
	var c = document.createElement("div");
	var a = this._params.theme.event.bubble;
	d.fillInfoBubble(c, this._params.theme, this._band.getLabeller());
	SimileAjax.WindowManager.cancelPopups();
	SimileAjax.Graphics.createBubbleForContentAndPoint(c, e, b, a.width, null, a.maxHeight)
};
Timeline.DetailedEventPainter.prototype._fireOnSelect = function (a) {
	for (var b = 0; b < this._onSelectListeners.length; b++) {
		this._onSelectListeners[b](a)
	}
};
Timeline.GregorianEtherPainter = function (a) {
	this._params = a;
	this._theme = a.theme;
	this._unit = a.unit;
	this._multiple = ("multiple" in a) ? a.multiple : 1
};
Timeline.GregorianEtherPainter.prototype.initialize = function (c, d) {
	this._band = c;
	this._timeline = d;
	this._backgroundLayer = c.createLayerDiv(0);
	this._backgroundLayer.setAttribute("name", "ether-background");
	this._backgroundLayer.className = "timeline-ether-bg";
	this._markerLayer = null;
	this._lineLayer = null;
	var b = ("align" in this._params && this._params.align != undefined) ? this._params.align : this._theme.ether.interval.marker[d.isHorizontal() ? "hAlign" : "vAlign"];
	var a = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
	this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, b, a);
	this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
};
Timeline.GregorianEtherPainter.prototype.setHighlight = function (a, b) {
	this._highlight.position(a, b)
};
Timeline.GregorianEtherPainter.prototype.paint = function () {
	if (this._markerLayer) {
		this._band.removeLayerDiv(this._markerLayer)
	}
	this._markerLayer = this._band.createLayerDiv(100);
	this._markerLayer.setAttribute("name", "ether-markers");
	this._markerLayer.style.display = "none";
	if (this._lineLayer) {
		this._band.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = this._band.createLayerDiv(1);
	this._lineLayer.setAttribute("name", "ether-lines");
	this._lineLayer.style.display = "none";
	var e = this._band.getMinDate();
	var b = this._band.getMaxDate();
	var a = this._band.getTimeZone();
	var c = this._band.getLabeller();
	SimileAjax.DateTime.roundDownToInterval(e, this._unit, a, this._multiple, this._theme.firstDayOfWeek);
	var d = this;
	var f = function (h) {
		for (var g = 0; g < d._multiple; g++) {
			SimileAjax.DateTime.incrementByInterval(h, d._unit)
		}
	};
	while (e.getTime() < b.getTime()) {
		this._intervalMarkerLayout.createIntervalMarker(e, c, this._unit, this._markerLayer, this._lineLayer);
		f(e)
	}
	this._markerLayer.style.display = "block";
	this._lineLayer.style.display = "block"
};
Timeline.GregorianEtherPainter.prototype.softPaint = function () {};
Timeline.GregorianEtherPainter.prototype.zoom = function (a) {
	if (a != 0) {
		this._unit += a
	}
};
Timeline.HotZoneGregorianEtherPainter = function (b) {
	this._params = b;
	this._theme = b.theme;
	this._zones = [{
			startTime : Number.NEGATIVE_INFINITY,
			endTime : Number.POSITIVE_INFINITY,
			unit : b.unit,
			multiple : 1
		}
	];
	for (var c = 0; c < b.zones.length; c++) {
		var f = b.zones[c];
		var d = SimileAjax.DateTime.parseGregorianDateTime(f.start).getTime();
		var g = SimileAjax.DateTime.parseGregorianDateTime(f.end).getTime();
		for (var e = 0; e < this._zones.length && g > d; e++) {
			var a = this._zones[e];
			if (d < a.endTime) {
				if (d > a.startTime) {
					this._zones.splice(e, 0, {
						startTime : a.startTime,
						endTime : d,
						unit : a.unit,
						multiple : a.multiple
					});
					e++;
					a.startTime = d
				}
				if (g < a.endTime) {
					this._zones.splice(e, 0, {
						startTime : d,
						endTime : g,
						unit : f.unit,
						multiple : (f.multiple) ? f.multiple : 1
					});
					e++;
					a.startTime = g;
					d = g
				} else {
					a.multiple = f.multiple;
					a.unit = f.unit;
					d = a.endTime
				}
			}
		}
	}
};
Timeline.HotZoneGregorianEtherPainter.prototype.initialize = function (c, d) {
	this._band = c;
	this._timeline = d;
	this._backgroundLayer = c.createLayerDiv(0);
	this._backgroundLayer.setAttribute("name", "ether-background");
	this._backgroundLayer.className = "timeline-ether-bg";
	this._markerLayer = null;
	this._lineLayer = null;
	var b = ("align" in this._params && this._params.align != undefined) ? this._params.align : this._theme.ether.interval.marker[d.isHorizontal() ? "hAlign" : "vAlign"];
	var a = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
	this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, b, a);
	this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
};
Timeline.HotZoneGregorianEtherPainter.prototype.setHighlight = function (a, b) {
	this._highlight.position(a, b)
};
Timeline.HotZoneGregorianEtherPainter.prototype.paint = function () {
	if (this._markerLayer) {
		this._band.removeLayerDiv(this._markerLayer)
	}
	this._markerLayer = this._band.createLayerDiv(100);
	this._markerLayer.setAttribute("name", "ether-markers");
	this._markerLayer.style.display = "none";
	if (this._lineLayer) {
		this._band.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = this._band.createLayerDiv(1);
	this._lineLayer.setAttribute("name", "ether-lines");
	this._lineLayer.style.display = "none";
	var b = this._band.getMinDate();
	var d = this._band.getMaxDate();
	var h = this._band.getTimeZone();
	var e = this._band.getLabeller();
	var c = this;
	var g = function (n, o) {
		for (var m = 0; m < o.multiple; m++) {
			SimileAjax.DateTime.incrementByInterval(n, o.unit)
		}
	};
	var a = 0;
	while (a < this._zones.length) {
		if (b.getTime() < this._zones[a].endTime) {
			break
		}
		a++
	}
	var l = this._zones.length - 1;
	while (l >= 0) {
		if (d.getTime() > this._zones[l].startTime) {
			break
		}
		l--
	}
	for (var i = a; i <= l; i++) {
		var j = this._zones[i];
		var f = new Date(Math.max(b.getTime(), j.startTime));
		var k = new Date(Math.min(d.getTime(), j.endTime));
		SimileAjax.DateTime.roundDownToInterval(f, j.unit, h, j.multiple, this._theme.firstDayOfWeek);
		SimileAjax.DateTime.roundUpToInterval(k, j.unit, h, j.multiple, this._theme.firstDayOfWeek);
		while (f.getTime() < k.getTime()) {
			this._intervalMarkerLayout.createIntervalMarker(f, e, j.unit, this._markerLayer, this._lineLayer);
			g(f, j)
		}
	}
	this._markerLayer.style.display = "block";
	this._lineLayer.style.display = "block"
};
Timeline.HotZoneGregorianEtherPainter.prototype.softPaint = function () {};
Timeline.HotZoneGregorianEtherPainter.prototype.zoom = function (a) {
	if (a != 0) {
		for (var b = 0; b < this._zones.length; ++b) {
			if (this._zones[b]) {
				this._zones[b].unit += a
			}
		}
	}
};
Timeline.YearCountEtherPainter = function (a) {
	this._params = a;
	this._theme = a.theme;
	this._startDate = SimileAjax.DateTime.parseGregorianDateTime(a.startDate);
	this._multiple = ("multiple" in a) ? a.multiple : 1
};
Timeline.YearCountEtherPainter.prototype.initialize = function (c, d) {
	this._band = c;
	this._timeline = d;
	this._backgroundLayer = c.createLayerDiv(0);
	this._backgroundLayer.setAttribute("name", "ether-background");
	this._backgroundLayer.className = "timeline-ether-bg";
	this._markerLayer = null;
	this._lineLayer = null;
	var b = ("align" in this._params) ? this._params.align : this._theme.ether.interval.marker[d.isHorizontal() ? "hAlign" : "vAlign"];
	var a = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
	this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, b, a);
	this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
};
Timeline.YearCountEtherPainter.prototype.setHighlight = function (a, b) {
	this._highlight.position(a, b)
};
Timeline.YearCountEtherPainter.prototype.paint = function () {
	if (this._markerLayer) {
		this._band.removeLayerDiv(this._markerLayer)
	}
	this._markerLayer = this._band.createLayerDiv(100);
	this._markerLayer.setAttribute("name", "ether-markers");
	this._markerLayer.style.display = "none";
	if (this._lineLayer) {
		this._band.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = this._band.createLayerDiv(1);
	this._lineLayer.setAttribute("name", "ether-lines");
	this._lineLayer.style.display = "none";
	var f = new Date(this._startDate.getTime());
	var b = this._band.getMaxDate();
	var c = this._band.getMinDate().getUTCFullYear() - this._startDate.getUTCFullYear();
	f.setUTCFullYear(this._band.getMinDate().getUTCFullYear() - c % this._multiple);
	var e = this;
	var a = function (h) {
		for (var g = 0; g < e._multiple; g++) {
			SimileAjax.DateTime.incrementByInterval(h, SimileAjax.DateTime.YEAR)
		}
	};
	var d = {
		labelInterval : function (i, g) {
			var h = i.getUTCFullYear() - e._startDate.getUTCFullYear();
			return {
				text : h,
				emphasized : h == 0
			}
		}
	};
	while (f.getTime() < b.getTime()) {
		this._intervalMarkerLayout.createIntervalMarker(f, d, SimileAjax.DateTime.YEAR, this._markerLayer, this._lineLayer);
		a(f)
	}
	this._markerLayer.style.display = "block";
	this._lineLayer.style.display = "block"
};
Timeline.YearCountEtherPainter.prototype.softPaint = function () {};
Timeline.QuarterlyEtherPainter = function (a) {
	this._params = a;
	this._theme = a.theme;
	this._startDate = SimileAjax.DateTime.parseGregorianDateTime(a.startDate)
};
Timeline.QuarterlyEtherPainter.prototype.initialize = function (c, d) {
	this._band = c;
	this._timeline = d;
	this._backgroundLayer = c.createLayerDiv(0);
	this._backgroundLayer.setAttribute("name", "ether-background");
	this._backgroundLayer.className = "timeline-ether-bg";
	this._markerLayer = null;
	this._lineLayer = null;
	var b = ("align" in this._params) ? this._params.align : this._theme.ether.interval.marker[d.isHorizontal() ? "hAlign" : "vAlign"];
	var a = ("showLine" in this._params) ? this._params.showLine : this._theme.ether.interval.line.show;
	this._intervalMarkerLayout = new Timeline.EtherIntervalMarkerLayout(this._timeline, this._band, this._theme, b, a);
	this._highlight = new Timeline.EtherHighlight(this._timeline, this._band, this._theme, this._backgroundLayer)
};
Timeline.QuarterlyEtherPainter.prototype.setHighlight = function (a, b) {
	this._highlight.position(a, b)
};
Timeline.QuarterlyEtherPainter.prototype.paint = function () {
	if (this._markerLayer) {
		this._band.removeLayerDiv(this._markerLayer)
	}
	this._markerLayer = this._band.createLayerDiv(100);
	this._markerLayer.setAttribute("name", "ether-markers");
	this._markerLayer.style.display = "none";
	if (this._lineLayer) {
		this._band.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = this._band.createLayerDiv(1);
	this._lineLayer.setAttribute("name", "ether-lines");
	this._lineLayer.style.display = "none";
	var e = new Date(0);
	var b = this._band.getMaxDate();
	e.setUTCFullYear(Math.max(this._startDate.getUTCFullYear(), this._band.getMinDate().getUTCFullYear()));
	e.setUTCMonth(this._startDate.getUTCMonth());
	var d = this;
	var a = function (f) {
		f.setUTCMonth(f.getUTCMonth() + 3)
	};
	var c = {
		labelInterval : function (g, f) {
			var h = (4 + (g.getUTCMonth() - d._startDate.getUTCMonth()) / 3) % 4;
			if (h != 0) {
				return {
					text : "Q" + (h + 1),
					emphasized : false
				}
			} else {
				return {
					text : "Y" + (g.getUTCFullYear() - d._startDate.getUTCFullYear() + 1),
					emphasized : true
				}
			}
		}
	};
	while (e.getTime() < b.getTime()) {
		this._intervalMarkerLayout.createIntervalMarker(e, c, SimileAjax.DateTime.YEAR, this._markerLayer, this._lineLayer);
		a(e)
	}
	this._markerLayer.style.display = "block";
	this._lineLayer.style.display = "block"
};
Timeline.QuarterlyEtherPainter.prototype.softPaint = function () {};
Timeline.EtherIntervalMarkerLayout = function (i, f, b, m, e) {
	var d = i.isHorizontal();
	if (d) {
		if (m == "Top") {
			this.positionDiv = function (n, o) {
				n.style.left = o + "px";
				n.style.top = "0px"
			}
		} else {
			this.positionDiv = function (n, o) {
				n.style.left = o + "px";
				n.style.bottom = "0px"
			}
		}
	} else {
		if (m == "Left") {
			this.positionDiv = function (n, o) {
				n.style.top = o + "px";
				n.style.left = "0px"
			}
		} else {
			this.positionDiv = function (n, o) {
				n.style.top = o + "px";
				n.style.right = "0px"
			}
		}
	}
	var a = b.ether.interval.marker;
	var g = b.ether.interval.line;
	var c = b.ether.interval.weekend;
	var j = (d ? "h" : "v") + m;
	var k = a[j + "Styler"];
	var h = a[j + "EmphasizedStyler"];
	var l = SimileAjax.DateTime.gregorianUnitLengths[SimileAjax.DateTime.DAY];
	this.createIntervalMarker = function (t, A, C, o, x) {
		var s = Math.round(f.dateToPixelOffset(t));
		if (e && C != SimileAjax.DateTime.WEEK) {
			var r = i.getDocument().createElement("div");
			r.className = "timeline-ether-lines";
			if (g.opacity < 100) {
				SimileAjax.Graphics.setOpacity(r, g.opacity)
			}
			if (d) {
				r.style.left = s + "px"
			} else {
				r.style.top = s + "px"
			}
			x.appendChild(r)
		}
		if (C == SimileAjax.DateTime.WEEK) {
			var z = b.firstDayOfWeek;
			var v = new Date(t.getTime() + (6 - z - 7) * l);
			var B = new Date(v.getTime() + 2 * l);
			var w = Math.round(f.dateToPixelOffset(v));
			var u = Math.round(f.dateToPixelOffset(B));
			var q = Math.max(1, u - w);
			var p = i.getDocument().createElement("div");
			p.className = "timeline-ether-weekends";
			if (c.opacity < 100) {
				SimileAjax.Graphics.setOpacity(p, c.opacity)
			}
			if (d) {
				p.style.left = w + "px";
				p.style.width = q + "px"
			} else {
				p.style.top = w + "px";
				p.style.height = q + "px"
			}
			x.appendChild(p)
		}
		var n = A.labelInterval(t, C);
		var y = i.getDocument().createElement("div");
		y.innerHTML = n.text;
		y.className = "timeline-date-label";
		if (n.emphasized) {
			y.className += " timeline-date-label-em"
		}
		this.positionDiv(y, s);
		o.appendChild(y);
		return y
	}
};
Timeline.EtherHighlight = function (e, b, c, d) {
	var a = e.isHorizontal();
	this._highlightDiv = null;
	this._createHighlightDiv = function () {
		if (this._highlightDiv == null) {
			this._highlightDiv = e.getDocument().createElement("div");
			this._highlightDiv.setAttribute("name", "ether-highlight");
			this._highlightDiv.className = "timeline-ether-highlight";
			var f = c.ether.highlightOpacity;
			if (f < 100) {
				SimileAjax.Graphics.setOpacity(this._highlightDiv, f)
			}
			d.appendChild(this._highlightDiv)
		}
	};
	this.position = function (h, f) {
		this._createHighlightDiv();
		var g = Math.round(b.dateToPixelOffset(h));
		var i = Math.round(b.dateToPixelOffset(f));
		var j = Math.max(i - g, 3);
		if (a) {
			this._highlightDiv.style.left = g + "px";
			this._highlightDiv.style.width = j + "px";
			this._highlightDiv.style.height = (b.getViewWidth() - 4) + "px"
		} else {
			this._highlightDiv.style.top = g + "px";
			this._highlightDiv.style.height = j + "px";
			this._highlightDiv.style.width = (b.getViewWidth() - 4) + "px"
		}
	}
};
Timeline.LinearEther = function (a) {
	this._params = a;
	this._interval = a.interval;
	this._pixelsPerInterval = a.pixelsPerInterval
};
Timeline.LinearEther.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._unit = a.getUnit();
	if ("startsOn" in this._params) {
		this._start = this._unit.parseFromObject(this._params.startsOn)
	} else {
		if ("endsOn" in this._params) {
			this._start = this._unit.parseFromObject(this._params.endsOn);
			this.shiftPixels(-this._timeline.getPixelLength())
		} else {
			if ("centersOn" in this._params) {
				this._start = this._unit.parseFromObject(this._params.centersOn);
				this.shiftPixels(-this._timeline.getPixelLength() / 2)
			} else {
				this._start = this._unit.makeDefaultValue();
				this.shiftPixels(-this._timeline.getPixelLength() / 2)
			}
		}
	}
};
Timeline.LinearEther.prototype.setDate = function (a) {
	this._start = this._unit.cloneValue(a)
};
Timeline.LinearEther.prototype.shiftPixels = function (b) {
	var a = this._interval * b / this._pixelsPerInterval;
	this._start = this._unit.change(this._start, a)
};
Timeline.LinearEther.prototype.dateToPixelOffset = function (b) {
	var a = this._unit.compare(b, this._start);
	return this._pixelsPerInterval * a / this._interval
};
Timeline.LinearEther.prototype.pixelOffsetToDate = function (b) {
	var a = b * this._interval / this._pixelsPerInterval;
	return this._unit.change(this._start, a)
};
Timeline.LinearEther.prototype.zoom = function (b) {
	var a = 0;
	var d = this._band._zoomIndex;
	var c = d;
	if (b && (d > 0)) {
		c = d - 1
	}
	if (!b && (d < (this._band._zoomSteps.length - 1))) {
		c = d + 1
	}
	this._band._zoomIndex = c;
	this._interval = SimileAjax.DateTime.gregorianUnitLengths[this._band._zoomSteps[c].unit];
	this._pixelsPerInterval = this._band._zoomSteps[c].pixelsPerInterval;
	a = this._band._zoomSteps[c].unit - this._band._zoomSteps[d].unit;
	return a
};
Timeline.HotZoneEther = function (a) {
	this._params = a;
	this._interval = a.interval;
	this._pixelsPerInterval = a.pixelsPerInterval;
	this._theme = a.theme
};
Timeline.HotZoneEther.prototype.initialize = function (e, f) {
	this._band = e;
	this._timeline = f;
	this._unit = f.getUnit();
	this._zones = [{
			startTime : Number.NEGATIVE_INFINITY,
			endTime : Number.POSITIVE_INFINITY,
			magnify : 1
		}
	];
	var a = this._params;
	for (var i = 0; i < a.zones.length; i++) {
		var g = a.zones[i];
		var h = this._unit.parseFromObject(g.start);
		var c = this._unit.parseFromObject(g.end);
		for (var b = 0; b < this._zones.length && this._unit.compare(c, h) > 0; b++) {
			var d = this._zones[b];
			if (this._unit.compare(h, d.endTime) < 0) {
				if (this._unit.compare(h, d.startTime) > 0) {
					this._zones.splice(b, 0, {
						startTime : d.startTime,
						endTime : h,
						magnify : d.magnify
					});
					b++;
					d.startTime = h
				}
				if (this._unit.compare(c, d.endTime) < 0) {
					this._zones.splice(b, 0, {
						startTime : h,
						endTime : c,
						magnify : g.magnify * d.magnify
					});
					b++;
					d.startTime = c;
					h = c
				} else {
					d.magnify *= g.magnify;
					h = d.endTime
				}
			}
		}
	}
	if ("startsOn" in this._params) {
		this._start = this._unit.parseFromObject(this._params.startsOn)
	} else {
		if ("endsOn" in this._params) {
			this._start = this._unit.parseFromObject(this._params.endsOn);
			this.shiftPixels(-this._timeline.getPixelLength())
		} else {
			if ("centersOn" in this._params) {
				this._start = this._unit.parseFromObject(this._params.centersOn);
				this.shiftPixels(-this._timeline.getPixelLength() / 2)
			} else {
				this._start = this._unit.makeDefaultValue();
				this.shiftPixels(-this._timeline.getPixelLength() / 2)
			}
		}
	}
};
Timeline.HotZoneEther.prototype.setDate = function (a) {
	this._start = this._unit.cloneValue(a)
};
Timeline.HotZoneEther.prototype.shiftPixels = function (a) {
	this._start = this.pixelOffsetToDate(a)
};
Timeline.HotZoneEther.prototype.dateToPixelOffset = function (a) {
	return this._dateDiffToPixelOffset(this._start, a)
};
Timeline.HotZoneEther.prototype.pixelOffsetToDate = function (a) {
	return this._pixelOffsetToDate(a, this._start)
};
Timeline.HotZoneEther.prototype.zoom = function (b) {
	var a = 0;
	var d = this._band._zoomIndex;
	var c = d;
	if (b && (d > 0)) {
		c = d - 1
	}
	if (!b && (d < (this._band._zoomSteps.length - 1))) {
		c = d + 1
	}
	this._band._zoomIndex = c;
	this._interval = SimileAjax.DateTime.gregorianUnitLengths[this._band._zoomSteps[c].unit];
	this._pixelsPerInterval = this._band._zoomSteps[c].pixelsPerInterval;
	a = this._band._zoomSteps[c].unit - this._band._zoomSteps[d].unit;
	return a
};
Timeline.HotZoneEther.prototype._dateDiffToPixelOffset = function (f, b) {
	var a = this._getScale();
	var e = f;
	var c = b;
	var i = 0;
	if (this._unit.compare(e, c) < 0) {
		var g = 0;
		while (g < this._zones.length) {
			if (this._unit.compare(e, this._zones[g].endTime) < 0) {
				break
			}
			g++
		}
		while (this._unit.compare(e, c) < 0) {
			var h = this._zones[g];
			var d = this._unit.earlier(c, h.endTime);
			i += (this._unit.compare(d, e) / (a / h.magnify));
			e = d;
			g++
		}
	} else {
		var g = this._zones.length - 1;
		while (g >= 0) {
			if (this._unit.compare(e, this._zones[g].startTime) > 0) {
				break
			}
			g--
		}
		while (this._unit.compare(e, c) > 0) {
			var h = this._zones[g];
			var d = this._unit.later(c, h.startTime);
			i += (this._unit.compare(d, e) / (a / h.magnify));
			e = d;
			g--
		}
	}
	return i
};
Timeline.HotZoneEther.prototype._pixelOffsetToDate = function (e, h) {
	var c = this._getScale();
	var f = h;
	if (e > 0) {
		var d = 0;
		while (d < this._zones.length) {
			if (this._unit.compare(f, this._zones[d].endTime) < 0) {
				break
			}
			d++
		}
		while (e > 0) {
			var a = this._zones[d];
			var b = c / a.magnify;
			if (a.endTime == Number.POSITIVE_INFINITY) {
				f = this._unit.change(f, e * b);
				e = 0
			} else {
				var g = this._unit.compare(a.endTime, f) / b;
				if (g > e) {
					f = this._unit.change(f, e * b);
					e = 0
				} else {
					f = a.endTime;
					e -= g
				}
			}
			d++
		}
	} else {
		var d = this._zones.length - 1;
		while (d >= 0) {
			if (this._unit.compare(f, this._zones[d].startTime) > 0) {
				break
			}
			d--
		}
		e = -e;
		while (e > 0) {
			var a = this._zones[d];
			var b = c / a.magnify;
			if (a.startTime == Number.NEGATIVE_INFINITY) {
				f = this._unit.change(f, -e * b);
				e = 0
			} else {
				var g = this._unit.compare(f, a.startTime) / b;
				if (g > e) {
					f = this._unit.change(f, -e * b);
					e = 0
				} else {
					f = a.startTime;
					e -= g
				}
			}
			d--
		}
	}
	return f
};
Timeline.HotZoneEther.prototype._getScale = function () {
	return this._interval / this._pixelsPerInterval
};
Timeline.EventUtils = {};
Timeline.EventUtils.getNewEventID = function () {
	if (this._lastEventID == null) {
		this._lastEventID = 0
	}
	this._lastEventID += 1;
	return "e" + this._lastEventID
};
Timeline.EventUtils.decodeEventElID = function (d) {
	var c = d.split("-");
	if (c[1] != "tl") {
		alert("Internal Timeline problem 101, please consult support");
		return {
			band : null,
			evt : null
		}
	}
	var e = Timeline.getTimelineFromID(c[2]);
	var b = e.getBand(c[3]);
	var a = b.getEventSource.getEvent(c[4]);
	return {
		band : b,
		evt : a
	}
};
Timeline.EventUtils.encodeEventElID = function (d, b, c, a) {
	return c + "-tl-" + d.timelineID + "-" + b.getIndex() + "-" + a.getID()
};
Timeline.GregorianDateLabeller = function (b, a) {
	this._locale = b;
	this._timeZone = a
};
Timeline.GregorianDateLabeller.monthNames = [];
Timeline.GregorianDateLabeller.dayNames = [];
Timeline.GregorianDateLabeller.labelIntervalFunctions = [];
Timeline.GregorianDateLabeller.getMonthName = function (b, a) {
	return Timeline.GregorianDateLabeller.monthNames[a][b]
};
Timeline.GregorianDateLabeller.prototype.labelInterval = function (a, b) {
	var c = Timeline.GregorianDateLabeller.labelIntervalFunctions[this._locale];
	if (c == null) {
		c = Timeline.GregorianDateLabeller.prototype.defaultLabelInterval
	}
	return c.call(this, a, b)
};
Timeline.GregorianDateLabeller.prototype.labelPrecise = function (a) {
	return SimileAjax.DateTime.removeTimeZoneOffset(a, this._timeZone).toUTCString()
};
Timeline.GregorianDateLabeller.prototype.defaultLabelInterval = function (f, e) {
	var d;
	var b = false;
	f = SimileAjax.DateTime.removeTimeZoneOffset(f, this._timeZone);
	switch (e) {
	case SimileAjax.DateTime.MILLISECOND:
		d = f.getUTCMilliseconds();
		break;
	case SimileAjax.DateTime.SECOND:
		d = f.getUTCSeconds();
		break;
	case SimileAjax.DateTime.MINUTE:
		var a = f.getUTCMinutes();
		if (a == 0) {
			d = f.getUTCHours() + ":00";
			b = true
		} else {
			d = a
		}
		break;
	case SimileAjax.DateTime.HOUR:
		d = f.getUTCHours() + "hr";
		break;
	case SimileAjax.DateTime.DAY:
		d = Timeline.GregorianDateLabeller.getMonthName(f.getUTCMonth(), this._locale) + " " + f.getUTCDate();
		break;
	case SimileAjax.DateTime.WEEK:
		d = Timeline.GregorianDateLabeller.getMonthName(f.getUTCMonth(), this._locale) + " " + f.getUTCDate();
		break;
	case SimileAjax.DateTime.MONTH:
		var a = f.getUTCMonth();
		if (a != 0) {
			d = Timeline.GregorianDateLabeller.getMonthName(a, this._locale);
			break
		}
	case SimileAjax.DateTime.YEAR:
	case SimileAjax.DateTime.DECADE:
	case SimileAjax.DateTime.CENTURY:
	case SimileAjax.DateTime.MILLENNIUM:
		var c = f.getUTCFullYear();
		if (c > 0) {
			d = f.getUTCFullYear()
		} else {
			d = (1 - c) + "BC"
		}
		b = (e == SimileAjax.DateTime.MONTH) || (e == SimileAjax.DateTime.DECADE && c % 100 == 0) || (e == SimileAjax.DateTime.CENTURY && c % 1000 == 0);
		break;
	default:
		d = f.toUTCString()
	}
	return {
		text : d,
		emphasized : b
	}
};
Timeline.OriginalEventPainter = function (a) {
	this._params = a;
	this._onSelectListeners = [];
	this._eventPaintListeners = [];
	this._filterMatcher = null;
	this._highlightMatcher = null;
	this._frc = null;
	this._eventIdToElmt = {}

};
Timeline.OriginalEventPainter.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._backLayer = null;
	this._eventLayer = null;
	this._lineLayer = null;
	this._highlightLayer = null;
	this._eventIdToElmt = null
};
Timeline.OriginalEventPainter.prototype.getType = function () {
	return "original"
};
Timeline.OriginalEventPainter.prototype.addOnSelectListener = function (a) {
	this._onSelectListeners.push(a)
};
Timeline.OriginalEventPainter.prototype.removeOnSelectListener = function (b) {
	for (var a = 0; a < this._onSelectListeners.length; a++) {
		if (this._onSelectListeners[a] == b) {
			this._onSelectListeners.splice(a, 1);
			break
		}
	}
};
Timeline.OriginalEventPainter.prototype.addEventPaintListener = function (a) {
	this._eventPaintListeners.push(a)
};
Timeline.OriginalEventPainter.prototype.removeEventPaintListener = function (b) {
	for (var a = 0; a < this._eventPaintListeners.length; a++) {
		if (this._eventPaintListeners[a] == b) {
			this._eventPaintListeners.splice(a, 1);
			break
		}
	}
};
Timeline.OriginalEventPainter.prototype.getFilterMatcher = function () {
	return this._filterMatcher
};
Timeline.OriginalEventPainter.prototype.setFilterMatcher = function (a) {
	this._filterMatcher = a
};
Timeline.OriginalEventPainter.prototype.getHighlightMatcher = function () {
	return this._highlightMatcher
};
Timeline.OriginalEventPainter.prototype.setHighlightMatcher = function (a) {
	this._highlightMatcher = a
};
Timeline.OriginalEventPainter.prototype.paint = function () {
	var b = this._band.getEventSource();
	if (b == null) {
		return
	}
	this._eventIdToElmt = {};
	this._fireEventPaintListeners("paintStarting", null, null);
	this._prepareForPainting();
	var f = this._params.theme.event;
	var h = Math.max(f.track.height, f.tape.height + this._frc.getLineHeight());
	var i = {
		trackOffset : f.track.offset,
		trackHeight : h,
		trackGap : f.track.gap,
		trackIncrement : h + f.track.gap,
		icon : f.instant.icon,
		iconWidth : f.instant.iconWidth,
		iconHeight : f.instant.iconHeight,
		labelWidth : f.label.width,
		maxLabelChar : f.label.maxLabelChar,
		impreciseIconMargin : f.instant.impreciseIconMargin
	};
	var a = this._band.getMinDate();
	var c = this._band.getMaxDate();
	var e = (this._filterMatcher != null) ? this._filterMatcher : function (k) {
		return true
	};
	var d = (this._highlightMatcher != null) ? this._highlightMatcher : function (k) {
		return -1
	};
	var j = b.getEventReverseIterator(a, c);
	while (j.hasNext()) {
		var g = j.next();
		if (e(g)) {
			this.paintEvent(g, i, this._params.theme, d(g))
		}
	}
	this._highlightLayer.style.display = "block";
	this._lineLayer.style.display = "block";
	this._eventLayer.style.display = "block";
	this._band.updateEventTrackInfo(this._tracks.length, i.trackIncrement);
	this._fireEventPaintListeners("paintEnded", null, null)
};
Timeline.OriginalEventPainter.prototype.softPaint = function () {};
Timeline.OriginalEventPainter.prototype._prepareForPainting = function () {
	var b = this._band;
	if (this._backLayer == null) {
		this._backLayer = this._band.createLayerDiv(0, "timeline-band-events");
		this._backLayer.style.visibility = "hidden";
		var a = document.createElement("span");
		a.className = "timeline-event-label";
		this._backLayer.appendChild(a);
		this._frc = SimileAjax.Graphics.getFontRenderingContext(a)
	}
	this._frc.update();
	this._tracks = [];
	if (this._highlightLayer != null) {
		b.removeLayerDiv(this._highlightLayer)
	}
	this._highlightLayer = b.createLayerDiv(105, "timeline-band-highlights");
	this._highlightLayer.style.display = "none";
	if (this._lineLayer != null) {
		b.removeLayerDiv(this._lineLayer)
	}
	this._lineLayer = b.createLayerDiv(110, "timeline-band-lines");
	this._lineLayer.style.display = "none";
	if (this._eventLayer != null) {
		b.removeLayerDiv(this._eventLayer)
	}
	this._eventLayer = b.createLayerDiv(115, "timeline-band-events");
	this._eventLayer.style.display = "none"
};
Timeline.OriginalEventPainter.prototype.paintEvent = function (d, c, b, a) {
	if (d.isInstant()) {
		this.paintInstantEvent(d, c, b, a)
	} else {
		this.paintDurationEvent(d, c, b, a)
	}
};
Timeline.OriginalEventPainter.prototype.paintInstantEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseInstantEvent(d, c, b, a)
	} else {
		this.paintPreciseInstantEvent(d, c, b, a)
	}
};
Timeline.OriginalEventPainter.prototype.paintDurationEvent = function (d, c, b, a) {
	if (d.isImprecise()) {
		this.paintImpreciseDurationEvent(d, c, b, a)
	} else {
		this.paintPreciseDurationEvent(d, c, b, a)
	}
};
Timeline.OriginalEventPainter.prototype.paintPreciseInstantEvent = function (j, e, b, d) {
	var a = this._timeline.getDocument();
	var l = j.getText();
	var p = j.getStart();
	var o = Math.round(this._band.dateToPixelOffset(p));
	var w = Math.round(o + e.iconWidth / 2);
	var u = Math.round(o - e.iconWidth / 2);
	var r = this._getLabelDivClassName(j);
	var t = this._frc.computeSize(l, r);
	var k = w + b.event.label.offsetFromLine;
	var n = k + t.width;
	var g = n;
	var h = this._findFreeTrack(j, g);
	var f = Math.round(e.trackOffset + h * e.trackIncrement + e.trackHeight / 2 - t.height / 2);
	var v = this._paintEventIcon(j, h, u, e, b, 0);
	var c = this._paintEventLabel(j, l, k, f, t.width, t.height, b, r, d);
	var s = [v.elmt, c.elmt];
	var i = this;
	var m = function (y, z, x) {
		return i._onClickInstantEvent(v.elmt, z, j)
	};
	SimileAjax.DOM.registerEvent(v.elmt, "mousedown", m);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", m);
	var q = this._createHighlightDiv(d, v, b, j);
	if (q != null) {
		s.push(q)
	}
	this._fireEventPaintListeners("paintedEvent", j, s);
	this._eventIdToElmt[j.getID()] = v.elmt;
	this._tracks[h] = u
};
Timeline.OriginalEventPainter.prototype.paintImpreciseInstantEvent = function (m, h, c, f) {
	var ac = this._timeline.getDocument();
	var o = m.getText();
	var s = m.getStart();
	var e = m.getEnd();
	var r = Math.round(this._band.dateToPixelOffset(s));
	var aa = Math.round(this._band.dateToPixelOffset(e));
	var ab = Math.round(r + h.iconWidth / 2);
	var y = Math.round(r - h.iconWidth / 2);
	var u = this._getLabelDivClassName(m);
	var w = this._frc.computeSize(o, u);
	var n = ab + c.event.label.offsetFromLine;
	var q = n + w.width;
	var j = Math.max(q, aa);
	var k = this._findFreeTrack(m, j);
	var ad = c.event.tape.height;
	var i = Math.round(h.trackOffset + k * h.trackIncrement + ad);
	var z = this._paintEventIcon(m, k, y, h, c, ad);
	var d = this._paintEventLabel(m, o, n, i, w.width, w.height, c, u, f);
	var g = m.getColor();
	g = g != null ? g : c.event.instant.impreciseColor;
	var x = this._paintEventTape(m, k, r, aa, g, c.event.instant.impreciseOpacity, h, c, 0);
	var v = [z.elmt, d.elmt, x.elmt];
	var l = this;
	var p = function (b, A, a) {
		return l._onClickInstantEvent(z.elmt, A, m)
	};
	SimileAjax.DOM.registerEvent(z.elmt, "mousedown", p);
	SimileAjax.DOM.registerEvent(x.elmt, "mousedown", p);
	SimileAjax.DOM.registerEvent(d.elmt, "mousedown", p);
	var t = this._createHighlightDiv(f, z, c, m);
	if (t != null) {
		v.push(t)
	}
	this._fireEventPaintListeners("paintedEvent", m, v);
	this._eventIdToElmt[m.getID()] = z.elmt;
	this._tracks[k] = y
};
Timeline.OriginalEventPainter.prototype.paintPreciseDurationEvent = function (l, g, b, e) {
	var a = this._timeline.getDocument();
	var n = l.getText();
	var r = l.getStart();
	var d = l.getEnd();
	var q = Math.round(this._band.dateToPixelOffset(r));
	var x = Math.round(this._band.dateToPixelOffset(d));
	var t = this._getLabelDivClassName(l);
	var v = this._frc.computeSize(n, t);
	var m = q;
	var p = m + v.width;
	var i = Math.max(p, x);
	var j = this._findFreeTrack(l, i);
	var h = Math.round(g.trackOffset + j * g.trackIncrement + b.event.tape.height);
	var f = l.getColor();
	f = f != null ? f : b.event.duration.color;
	var w = this._paintEventTape(l, j, q, x, f, 100, g, b, 0);
	var c = this._paintEventLabel(l, n, m, h, v.width, v.height, b, t, e);
	var u = [w.elmt, c.elmt];
	var k = this;
	var o = function (z, A, y) {
		return k._onClickDurationEvent(w.elmt, A, l)
	};
	SimileAjax.DOM.registerEvent(w.elmt, "mousedown", o);
	SimileAjax.DOM.registerEvent(c.elmt, "mousedown", o);
	var s = this._createHighlightDiv(e, w, b, l);
	if (s != null) {
		u.push(s)
	}
	this._fireEventPaintListeners("paintedEvent", l, u);
	this._eventIdToElmt[l.getID()] = w.elmt;
	this._tracks[j] = q
};
Timeline.OriginalEventPainter.prototype.paintImpreciseDurationEvent = function (o, g, ae, e) {
	var ad = this._timeline.getDocument();
	var q = o.getText();
	var u = o.getStart();
	var h = o.getLatestStart();
	var d = o.getEnd();
	var m = o.getEarliestEnd();
	var s = Math.round(this._band.dateToPixelOffset(u));
	var x = Math.round(this._band.dateToPixelOffset(h));
	var ac = Math.round(this._band.dateToPixelOffset(d));
	var w = Math.round(this._band.dateToPixelOffset(m));
	var y = this._getLabelDivClassName(o);
	var aa = this._frc.computeSize(q, y);
	var p = x;
	var t = p + aa.width;
	var k = Math.max(t, ac);
	var l = this._findFreeTrack(o, k);
	var j = Math.round(g.trackOffset + l * g.trackIncrement + ae.event.tape.height);
	var f = o.getColor();
	f = f != null ? f : ae.event.duration.color;
	var i = this._paintEventTape(o, l, s, ac, ae.event.duration.impreciseColor, ae.event.duration.impreciseOpacity, g, ae, 0);
	var ab = this._paintEventTape(o, l, x, w, f, 100, g, ae, 1);
	var af = this._paintEventLabel(o, q, p, j, aa.width, aa.height, ae, y, e);
	var z = [i.elmt, ab.elmt, af.elmt];
	var n = this;
	var r = function (b, c, a) {
		return n._onClickDurationEvent(ab.elmt, c, o)
	};
	SimileAjax.DOM.registerEvent(ab.elmt, "mousedown", r);
	SimileAjax.DOM.registerEvent(af.elmt, "mousedown", r);
	var v = this._createHighlightDiv(e, ab, ae, o);
	if (v != null) {
		z.push(v)
	}
	this._fireEventPaintListeners("paintedEvent", o, z);
	this._eventIdToElmt[o.getID()] = ab.elmt;
	this._tracks[l] = s
};
Timeline.OriginalEventPainter.prototype._encodeEventElID = function (b, a) {
	return Timeline.EventUtils.encodeEventElID(this._timeline, this._band, b, a)
};
Timeline.OriginalEventPainter.prototype._findFreeTrack = function (b, c) {
	var a = b.getTrackNum();
	if (a != null) {
		return a
	}
	for (var d = 0; d < this._tracks.length; d++) {
		var e = this._tracks[d];
		if (e > c) {
			break
		}
	}
	return d
};
Timeline.OriginalEventPainter.prototype._paintEventIcon = function (e, c, b, i, j, a) {
	var g = e.getIcon();
	g = g != null ? g : i.icon;
	var f;
	if (a > 0) {
		f = i.trackOffset + c * i.trackIncrement + a + i.impreciseIconMargin
	} else {
		var h = i.trackOffset + c * i.trackIncrement + i.trackHeight / 2;
		f = Math.round(h - i.iconHeight / 2)
	}
	var k = SimileAjax.Graphics.createTranslucentImage(g);
	var d = this._timeline.getDocument().createElement("div");
	d.className = this._getElClassName("timeline-event-icon", e, "icon");
	d.id = this._encodeEventElID("icon", e);
	d.style.left = b + "px";
	d.style.top = f + "px";
	d.appendChild(k);
	if (e._title != null) {
		d.title = e._title
	}
	this._eventLayer.appendChild(d);
	return {
		left : b,
		top : f,
		width : i.iconWidth,
		height : i.iconHeight,
		elmt : d
	}
};
Timeline.OriginalEventPainter.prototype._paintEventLabel = function (f, e, a, i, d, g, j, l, b) {
	var h = this._timeline.getDocument();
	var c = h.createElement("div");
	c.className = l;
	c.id = this._encodeEventElID("label", f);
	c.style.left = a + "px";
	c.style.width = d + "px";
	c.style.top = i + "px";
	c.innerHTML = e;
	if (f._title != null) {
		c.title = f._title
	}
	var k = f.getTextColor();
	if (k == null) {
		k = f.getColor()
	}
	if (k != null) {
		c.style.color = k
	}
	if (j.event.highlightLabelBackground && b >= 0) {
		c.style.background = this._getHighlightColor(b, j)
	}
	this._eventLayer.appendChild(c);
	return {
		left : a,
		top : i,
		width : d,
		height : g,
		elmt : c
	}
};
Timeline.OriginalEventPainter.prototype._paintEventTape = function (f, c, a, d, m, b, j, k, g) {
	var n = d - a;
	var o = k.event.tape.height;
	var i = j.trackOffset + c * j.trackIncrement;
	var e = this._timeline.getDocument().createElement("div");
	e.className = this._getElClassName("timeline-event-tape", f, "tape");
	e.id = this._encodeEventElID("tape" + g, f);
	e.style.left = a + "px";
	e.style.width = n + "px";
	e.style.height = o + "px";
	e.style.top = i + "px";
	if (f._title != null) {
		e.title = f._title
	}
	if (m != null) {
		e.style.backgroundColor = m
	}
	var h = f.getTapeImage();
	var l = f.getTapeRepeat();
	l = l != null ? l : "repeat";
	if (h != null) {
		e.style.backgroundImage = "url(" + h + ")";
		e.style.backgroundRepeat = l
	}
	SimileAjax.Graphics.setOpacity(e, b);
	this._eventLayer.appendChild(e);
	return {
		left : a,
		top : i,
		width : n,
		height : o,
		elmt : e
	}
};
Timeline.OriginalEventPainter.prototype._getLabelDivClassName = function (a) {
	return this._getElClassName("timeline-event-label", a, "label")
};
Timeline.OriginalEventPainter.prototype._getElClassName = function (c, d, a) {
	var b = d.getClassName(),
	e = [];
	if (b) {
		if (a) {
			e.push(a + "-" + b + " ")
		}
		e.push(b + " ")
	}
	e.push(c);
	return (e.join(""))
};
Timeline.OriginalEventPainter.prototype._getHighlightColor = function (a, c) {
	var b = c.event.highlightColors;
	return b[Math.min(a, b.length - 1)]
};
Timeline.OriginalEventPainter.prototype._createHighlightDiv = function (a, e, c, g) {
	var b = null;
	if (a >= 0) {
		var d = this._timeline.getDocument();
		var f = this._getHighlightColor(a, c);
		b = d.createElement("div");
		b.className = this._getElClassName("timeline-event-highlight", g, "highlight");
		b.id = this._encodeEventElID("highlight0", g);
		b.style.position = "absolute";
		b.style.overflow = "hidden";
		b.style.left = (e.left - 2) + "px";
		b.style.width = (e.width + 4) + "px";
		b.style.top = (e.top - 2) + "px";
		b.style.height = (e.height + 4) + "px";
		b.style.background = f;
		this._highlightLayer.appendChild(b)
	}
	return b
};
Timeline.OriginalEventPainter.prototype._onClickInstantEvent = function (c, a, d) {
	var b = SimileAjax.DOM.getPageCoordinates(c);
	this._showBubble(b.left + Math.ceil(c.offsetWidth / 2), b.top + Math.ceil(c.offsetHeight / 2), d);
	this._fireOnSelect(d.getID());
	a.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(a);
	return false
};
Timeline.OriginalEventPainter.prototype._onClickDurationEvent = function (b, f, e) {
	if ("pageX" in f) {
		var a = f.pageX;
		var c = f.pageY
	} else {
		var d = SimileAjax.DOM.getPageCoordinates(b);
		var a = f.offsetX + d.left;
		var c = f.offsetY + d.top
	}
	this._showBubble(a, c, e);
	this._fireOnSelect(e.getID());
	f.cancelBubble = true;
	SimileAjax.DOM.cancelEvent(f);
	return false
};
Timeline.OriginalEventPainter.prototype.showBubble = function (a) {
	var c = this._eventIdToElmt[a.getID()];
	if (c) {
		var b = SimileAjax.DOM.getPageCoordinates(c);
		this._showBubble(b.left + c.offsetWidth / 2, b.top + c.offsetHeight / 2, a)
	}
};
Timeline.OriginalEventPainter.prototype._showBubble = function (e, b, d) {
	var c = document.createElement("div");
	var a = this._params.theme.event.bubble;
	d.fillInfoBubble(c, this._params.theme, this._band.getLabeller());
	SimileAjax.WindowManager.cancelPopups();
	SimileAjax.Graphics.createBubbleForContentAndPoint(c, e, b, a.width, null, a.maxHeight)
};
Timeline.OriginalEventPainter.prototype._fireOnSelect = function (a) {
	for (var b = 0; b < this._onSelectListeners.length; b++) {
		this._onSelectListeners[b](a)
	}
};
Timeline.OriginalEventPainter.prototype._fireEventPaintListeners = function (b, a, c) {
	for (var d = 0; d < this._eventPaintListeners.length; d++) {
		this._eventPaintListeners[d](this._band, b, a, c)
	}
};
Timeline.OverviewEventPainter = function (a) {
	this._params = a;
	this._onSelectListeners = [];
	this._filterMatcher = null;
	this._highlightMatcher = null
};
Timeline.OverviewEventPainter.prototype.initialize = function (b, a) {
	this._band = b;
	this._timeline = a;
	this._eventLayer = null;
	this._highlightLayer = null
};
Timeline.OverviewEventPainter.prototype.getType = function () {
	return "overview"
};
Timeline.OverviewEventPainter.prototype.addOnSelectListener = function (a) {
	this._onSelectListeners.push(a)
};
Timeline.OverviewEventPainter.prototype.removeOnSelectListener = function (b) {
	for (var a = 0; a < this._onSelectListeners.length; a++) {
		if (this._onSelectListeners[a] == b) {
			this._onSelectListeners.splice(a, 1);
			break
		}
	}
};
Timeline.OverviewEventPainter.prototype.getFilterMatcher = function () {
	return this._filterMatcher
};
Timeline.OverviewEventPainter.prototype.setFilterMatcher = function (a) {
	this._filterMatcher = a
};
Timeline.OverviewEventPainter.prototype.getHighlightMatcher = function () {
	return this._highlightMatcher
};
Timeline.OverviewEventPainter.prototype.setHighlightMatcher = function (a) {
	this._highlightMatcher = a
};
Timeline.OverviewEventPainter.prototype.paint = function () {
	var b = this._band.getEventSource();
	if (b == null) {
		return
	}
	this._prepareForPainting();
	var f = this._params.theme.event;
	var h = {
		trackOffset : f.overviewTrack.offset,
		trackHeight : f.overviewTrack.height,
		trackGap : f.overviewTrack.gap,
		trackIncrement : f.overviewTrack.height + f.overviewTrack.gap
	};
	var a = this._band.getMinDate();
	var c = this._band.getMaxDate();
	var e = (this._filterMatcher != null) ? this._filterMatcher : function (j) {
		return true
	};
	var d = (this._highlightMatcher != null) ? this._highlightMatcher : function (j) {
		return -1
	};
	var i = b.getEventReverseIterator(a, c);
	while (i.hasNext()) {
		var g = i.next();
		if (e(g)) {
			this.paintEvent(g, h, this._params.theme, d(g))
		}
	}
	this._highlightLayer.style.display = "block";
	this._eventLayer.style.display = "block";
	this._band.updateEventTrackInfo(this._tracks.length, h.trackIncrement)
};
Timeline.OverviewEventPainter.prototype.softPaint = function () {};
Timeline.OverviewEventPainter.prototype._prepareForPainting = function () {
	var a = this._band;
	this._tracks = [];
	if (this._highlightLayer != null) {
		a.removeLayerDiv(this._highlightLayer)
	}
	this._highlightLayer = a.createLayerDiv(105, "timeline-band-highlights");
	this._highlightLayer.style.display = "none";
	if (this._eventLayer != null) {
		a.removeLayerDiv(this._eventLayer)
	}
	this._eventLayer = a.createLayerDiv(110, "timeline-band-events");
	this._eventLayer.style.display = "none"
};
Timeline.OverviewEventPainter.prototype.paintEvent = function (d, c, b, a) {
	if (d.isInstant()) {
		this.paintInstantEvent(d, c, b, a)
	} else {
		this.paintDurationEvent(d, c, b, a)
	}
};
Timeline.OverviewEventPainter.prototype.paintInstantEvent = function (e, f, i, d) {
	var h = e.getStart();
	var c = Math.round(this._band.dateToPixelOffset(h));
	var b = e.getColor(),
	a = e.getClassName();
	if (a) {
		b = null
	} else {
		b = b != null ? b : i.event.duration.color
	}
	var g = this._paintEventTick(e, c, b, 100, f, i);
	this._createHighlightDiv(d, g, i)
};
Timeline.OverviewEventPainter.prototype.paintDurationEvent = function (e, f, i, c) {
	var d = e.getLatestStart();
	var h = e.getEarliestEnd();
	var g = Math.round(this._band.dateToPixelOffset(d));
	var b = Math.round(this._band.dateToPixelOffset(h));
	var k = 0;
	for (; k < this._tracks.length; k++) {
		if (b < this._tracks[k]) {
			break
		}
	}
	this._tracks[k] = b;
	var l = e.getColor(),
	j = e.getClassName();
	if (j) {
		l = null
	} else {
		l = l != null ? l : i.event.duration.color
	}
	var a = this._paintEventTape(e, k, g, b, l, 100, f, i, j);
	this._createHighlightDiv(c, a, i)
};
Timeline.OverviewEventPainter.prototype._paintEventTape = function (g, c, a, f, m, b, j, k, l) {
	var i = j.trackOffset + c * j.trackIncrement;
	var d = f - a;
	var h = j.trackHeight;
	var e = this._timeline.getDocument().createElement("div");
	e.className = "timeline-small-event-tape";
	if (l) {
		e.className += " small-" + l
	}
	e.style.left = a + "px";
	e.style.width = d + "px";
	e.style.top = i + "px";
	e.style.height = h + "px";
	if (m) {
		e.style.backgroundColor = m
	}
	if (b < 100) {
		SimileAjax.Graphics.setOpacity(e, b)
	}
	this._eventLayer.appendChild(e);
	return {
		left : a,
		top : i,
		width : d,
		height : h,
		elmt : e
	}
};
Timeline.OverviewEventPainter.prototype._paintEventTick = function (f, b, a, c, i, j) {
	var g = j.event.overviewTrack.tickHeight;
	var h = i.trackOffset - g;
	var d = 1;
	var e = this._timeline.getDocument().createElement("div");
	e.className = "timeline-small-event-icon";
	e.style.left = b + "px";
	e.style.top = h + "px";
	var k = f.getClassName();
	if (k) {
		e.className += " small-" + k
	}
	if (c < 100) {
		SimileAjax.Graphics.setOpacity(e, c)
	}
	this._eventLayer.appendChild(e);
	return {
		left : b,
		top : h,
		width : d,
		height : g,
		elmt : e
	}
};
Timeline.OverviewEventPainter.prototype._createHighlightDiv = function (a, f, d) {
	if (a >= 0) {
		var e = this._timeline.getDocument();
		var b = d.event;
		var g = b.highlightColors[Math.min(a, b.highlightColors.length - 1)];
		var c = e.createElement("div");
		c.style.position = "absolute";
		c.style.overflow = "hidden";
		c.style.left = (f.left - 1) + "px";
		c.style.width = (f.width + 2) + "px";
		c.style.top = (f.top - 1) + "px";
		c.style.height = (f.height + 2) + "px";
		c.style.background = g;
		this._highlightLayer.appendChild(c)
	}
};
Timeline.OverviewEventPainter.prototype.showBubble = function (a) {};
Timeline.DefaultEventSource = function (a) {
	this._events = (a instanceof Object) ? a : new SimileAjax.EventIndex();
	this._listeners = []
};
Timeline.DefaultEventSource.prototype.addListener = function (a) {
	this._listeners.push(a)
};
Timeline.DefaultEventSource.prototype.removeListener = function (b) {
	for (var a = 0; a < this._listeners.length; a++) {
		if (this._listeners[a] == b) {
			this._listeners.splice(a, 1);
			break
		}
	}
};
Timeline.DefaultEventSource.prototype.loadXML = function (j, d) {
	var b = this._getBaseURL(d);
	var i = j.documentElement.getAttribute("wiki-url");
	var g = j.documentElement.getAttribute("wiki-section");
	var k = j.documentElement.getAttribute("date-time-format");
	var l = this._events.getUnit().getParser(k);
	var a = j.documentElement.firstChild;
	var h = false;
	while (a != null) {
		if (a.nodeType == 1) {
			var e = "";
			if (a.firstChild != null && a.firstChild.nodeType == 3) {
				e = a.firstChild.nodeValue
			}
			var c = (a.getAttribute("isDuration") === null && a.getAttribute("durationEvent") === null) || a.getAttribute("isDuration") == "false" || a.getAttribute("durationEvent") == "false";
			var f = new Timeline.DefaultEventSource.Event({
					id : a.getAttribute("id"),
					start : l(a.getAttribute("start")),
					end : l(a.getAttribute("end")),
					latestStart : l(a.getAttribute("latestStart")),
					earliestEnd : l(a.getAttribute("earliestEnd")),
					instant : c,
					text : a.getAttribute("title"),
					description : e,
					image : this._resolveRelativeURL(a.getAttribute("image"), b),
					link : this._resolveRelativeURL(a.getAttribute("link"), b),
					icon : this._resolveRelativeURL(a.getAttribute("icon"), b),
					color : a.getAttribute("color"),
					textColor : a.getAttribute("textColor"),
					hoverText : a.getAttribute("hoverText"),
					classname : a.getAttribute("classname"),
					tapeImage : a.getAttribute("tapeImage"),
					tapeRepeat : a.getAttribute("tapeRepeat"),
					caption : a.getAttribute("caption"),
					eventID : a.getAttribute("eventID"),
					trackNum : a.getAttribute("trackNum")
				});
			f._node = a;
			f.getProperty = function (m) {
				return this._node.getAttribute(m)
			};
			f.setWikiInfo(i, g);
			this._events.add(f);
			h = true
		}
		a = a.nextSibling
	}
	if (h) {
		this._fire("onAddMany", [])
	}
};
Timeline.DefaultEventSource.prototype.loadJSON = function (i, c) {
	var a = this._getBaseURL(c);
	var g = false;
	if (i && i.events) {
		var h = ("wikiURL" in i) ? i.wikiURL : null;
		var f = ("wikiSection" in i) ? i.wikiSection : null;
		var k = ("dateTimeFormat" in i) ? i.dateTimeFormat : null;
		var l = this._events.getUnit().getParser(k);
		for (var j = 0; j < i.events.length; j++) {
			var d = i.events[j];
			var b = d.isDuration || (d.durationEvent != null && !d.durationEvent);
			var e = new Timeline.DefaultEventSource.Event({
					id : ("id" in d) ? d.id : undefined,
					start : l(d.start),
					end : l(d.end),
					latestStart : l(d.latestStart),
					earliestEnd : l(d.earliestEnd),
					instant : b,
					text : d.title,
					description : d.description,
					image : this._resolveRelativeURL(d.image, a),
					link : this._resolveRelativeURL(d.link, a),
					icon : this._resolveRelativeURL(d.icon, a),
					color : d.color,
					textColor : d.textColor,
					hoverText : d.hoverText,
					classname : d.classname,
					tapeImage : d.tapeImage,
					tapeRepeat : d.tapeRepeat,
					caption : d.caption,
					eventID : d.eventID,
					trackNum : d.trackNum
				});
			e._obj = d;
			e.getProperty = function (m) {
				return this._obj[m]
			};
			e.setWikiInfo(h, f);
			this._events.add(e);
			g = true
		}
	}
	if (g) {
		this._fire("onAddMany", [])
	}
};
Timeline.DefaultEventSource.prototype.loadSPARQL = function (i, c) {
	var m = this._getBaseURL(c);
	var j = "iso8601";
	var k = this._events.getUnit().getParser(j);
	if (i == null) {
		return
	}
	var l = i.documentElement.firstChild;
	while (l != null && (l.nodeType != 1 || l.nodeName != "results")) {
		l = l.nextSibling
	}
	var h = null;
	var f = null;
	if (l != null) {
		h = l.getAttribute("wiki-url");
		f = l.getAttribute("wiki-section");
		l = l.firstChild
	}
	var g = false;
	while (l != null) {
		if (l.nodeType == 1) {
			var a = {};
			var d = l.firstChild;
			while (d != null) {
				if (d.nodeType == 1 && d.firstChild != null && d.firstChild.nodeType == 1 && d.firstChild.firstChild != null && d.firstChild.firstChild.nodeType == 3) {
					a[d.getAttribute("name")] = d.firstChild.firstChild.nodeValue
				}
				d = d.nextSibling
			}
			if (a.start == null && a.date != null) {
				a.start = a.date
			}
			var b = (a.isDuration === null && a.durationEvent === null) || a.isDuration == "false" || a.durationEvent == "false";
			var e = new Timeline.DefaultEventSource.Event({
					id : a.id,
					start : k(a.start),
					end : k(a.end),
					latestStart : k(a.latestStart),
					earliestEnd : k(a.earliestEnd),
					instant : b,
					text : a.title,
					description : a.description,
					image : this._resolveRelativeURL(a.image, m),
					link : this._resolveRelativeURL(a.link, m),
					icon : this._resolveRelativeURL(a.icon, m),
					color : a.color,
					textColor : a.textColor,
					hoverText : a.hoverText,
					caption : a.caption,
					classname : a.classname,
					tapeImage : a.tapeImage,
					tapeRepeat : a.tapeRepeat,
					eventID : a.eventID,
					trackNum : a.trackNum
				});
			e._bindings = a;
			e.getProperty = function (n) {
				return this._bindings[n]
			};
			e.setWikiInfo(h, f);
			this._events.add(e);
			g = true
		}
		l = l.nextSibling
	}
	if (g) {
		this._fire("onAddMany", [])
	}
};
Timeline.DefaultEventSource.prototype.add = function (a) {
	this._events.add(a);
	this._fire("onAddOne", [a])
};
Timeline.DefaultEventSource.prototype.addMany = function (a) {
	for (var b = 0; b < a.length; b++) {
		this._events.add(a[b])
	}
	this._fire("onAddMany", [])
};
Timeline.DefaultEventSource.prototype.clear = function () {
	this._events.removeAll();
	this._fire("onClear", [])
};
Timeline.DefaultEventSource.prototype.getEvent = function (a) {
	return this._events.getEvent(a)
};
Timeline.DefaultEventSource.prototype.getEventIterator = function (a, b) {
	return this._events.getIterator(a, b)
};
Timeline.DefaultEventSource.prototype.getEventReverseIterator = function (a, b) {
	return this._events.getReverseIterator(a, b)
};
Timeline.DefaultEventSource.prototype.getAllEventIterator = function () {
	return this._events.getAllIterator()
};
Timeline.DefaultEventSource.prototype.getCount = function () {
	return this._events.getCount()
};
Timeline.DefaultEventSource.prototype.getEarliestDate = function () {
	return this._events.getEarliestDate()
};
Timeline.DefaultEventSource.prototype.getLatestDate = function () {
	return this._events.getLatestDate()
};
Timeline.DefaultEventSource.prototype._fire = function (e, a) {
	for (var d = 0; d < this._listeners.length; d++) {
		var c = this._listeners[d];
		if (e in c) {
			try {
				c[e].apply(c, a)
			} catch (b) {
				SimileAjax.Debug.exception(b)
			}
		}
	}
};
Timeline.DefaultEventSource.prototype._getBaseURL = function (a) {
	if (a.indexOf("://") < 0) {
		var b = this._getBaseURL(document.location.href);
		if (a.substr(0, 1) == "/") {
			a = b.substr(0, b.indexOf("/", b.indexOf("://") + 3)) + a
		} else {
			a = b + a
		}
	}
	var c = a.lastIndexOf("/");
	if (c < 0) {
		return ""
	} else {
		return a.substr(0, c + 1)
	}
};
Timeline.DefaultEventSource.prototype._resolveRelativeURL = function (a, b) {
	if (a == null || a == "") {
		return a
	} else {
		if (a.indexOf("://") > 0) {
			return a
		} else {
			if (a.substr(0, 1) == "/") {
				return b.substr(0, b.indexOf("/", b.indexOf("://") + 3)) + a
			} else {
				return b + a
			}
		}
	}
};
Timeline.DefaultEventSource.Event = function (a) {
	function b(e) {
		return (a[e] != null && a[e] != "") ? a[e] : null
	}
	var c = a.id ? a.id.trim() : "";
	this._id = c.length > 0 ? c : Timeline.EventUtils.getNewEventID();
	this._instant = a.instant || (a.end == null);
	this._start = a.start;
	this._end = (a.end != null) ? a.end : a.start;
	this._latestStart = (a.latestStart != null) ? a.latestStart : (a.instant ? this._end : this._start);
	this._earliestEnd = (a.earliestEnd != null) ? a.earliestEnd : this._end;
	var d = [];
	if (this._start > this._latestStart) {
		this._latestStart = this._start;
		d.push("start is > latestStart")
	}
	if (this._start > this._earliestEnd) {
		this._earliestEnd = this._latestStart;
		d.push("start is > earliestEnd")
	}
	if (this._start > this._end) {
		this._end = this._earliestEnd;
		d.push("start is > end")
	}
	if (this._latestStart > this._earliestEnd) {
		this._earliestEnd = this._latestStart;
		d.push("latestStart is > earliestEnd")
	}
	if (this._latestStart > this._end) {
		this._end = this._earliestEnd;
		d.push("latestStart is > end")
	}
	if (this._earliestEnd > this._end) {
		this._end = this._earliestEnd;
		d.push("earliestEnd is > end")
	}
	this._eventID = b("eventID");
	this._text = (a.text != null) ? SimileAjax.HTML.deEntify(a.text) : "";
	if (d.length > 0) {
		this._text += " PROBLEM: " + d.join(", ")
	}
	this._description = SimileAjax.HTML.deEntify(a.description);
	this._image = b("image");
	this._link = b("link");
	this._title = b("hoverText");
	this._title = b("caption");
	this._icon = b("icon");
	this._color = b("color");
	this._textColor = b("textColor");
	this._classname = b("classname");
	this._tapeImage = b("tapeImage");
	this._tapeRepeat = b("tapeRepeat");
	this._trackNum = b("trackNum");
	if (this._trackNum != null) {
		this._trackNum = parseInt(this._trackNum)
	}
	this._wikiURL = null;
	this._wikiSection = null
};
Timeline.DefaultEventSource.Event.prototype = {
	getID : function () {
		return this._id
	},
	isInstant : function () {
		return this._instant
	},
	isImprecise : function () {
		return this._start != this._latestStart || this._end != this._earliestEnd
	},
	getStart : function () {
		return this._start
	},
	getEnd : function () {
		return this._end
	},
	getLatestStart : function () {
		return this._latestStart
	},
	getEarliestEnd : function () {
		return this._earliestEnd
	},
	getEventID : function () {
		return this._eventID
	},
	getText : function () {
		return this._text
	},
	getDescription : function () {
		return this._description
	},
	getImage : function () {
		return this._image
	},
	getLink : function () {
		return this._link
	},
	getIcon : function () {
		return this._icon
	},
	getColor : function () {
		return this._color
	},
	getTextColor : function () {
		return this._textColor
	},
	getClassName : function () {
		return this._classname
	},
	getTapeImage : function () {
		return this._tapeImage
	},
	getTapeRepeat : function () {
		return this._tapeRepeat
	},
	getTrackNum : function () {
		return this._trackNum
	},
	getProperty : function (a) {
		return null
	},
	getWikiURL : function () {
		return this._wikiURL
	},
	getWikiSection : function () {
		return this._wikiSection
	},
	setWikiInfo : function (b, a) {
		this._wikiURL = b;
		this._wikiSection = a
	},
	fillDescription : function (a) {
		a.innerHTML = this._description
	},
	fillWikiInfo : function (b) {
		b.style.display = "none";
		if (this._wikiURL == null || this._wikiSection == null) {
			return
		}
		var c = this.getProperty("wikiID");
		if (c == null || c.length == 0) {
			c = this.getText()
		}
		if (c == null || c.length == 0) {
			return
		}
		b.style.display = "inline";
		c = c.replace(/\s/g, "_");
		var d = this._wikiURL + this._wikiSection.replace(/\s/g, "_") + "/" + c;
		var a = document.createElement("a");
		a.href = d;
		a.target = "new";
		a.innerHTML = Timeline.strings[Timeline.clientLocale].wikiLinkLabel;
		b.appendChild(document.createTextNode("["));
		b.appendChild(a);
		b.appendChild(document.createTextNode("]"))
	},
	fillTime : function (a, b) {
		if (this._instant) {
			if (this.isImprecise()) {
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._start)));
				a.appendChild(a.ownerDocument.createElement("br"));
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._end)))
			} else {
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._start)))
			}
		} else {
			if (this.isImprecise()) {
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._start) + " ~ " + b.labelPrecise(this._latestStart)));
				a.appendChild(a.ownerDocument.createElement("br"));
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._earliestEnd) + " ~ " + b.labelPrecise(this._end)))
			} else {
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._start)));
				a.appendChild(a.ownerDocument.createElement("br"));
				a.appendChild(a.ownerDocument.createTextNode(b.labelPrecise(this._end)))
			}
		}
	},
	fillInfoBubble : function (d, n, f) {
		var h = d.ownerDocument;
		var i = this.getText();
		var k = this.getLink();
		var c = this.getImage();
		if (c != null) {
			var a = h.createElement("img");
			a.src = c;
			n.event.bubble.imageStyler(a);
			d.appendChild(a)
		}
		var g = h.createElement("div");
		var b = h.createTextNode(i);
		if (k != null) {
			var j = h.createElement("a");
			j.href = k;
			j.appendChild(b);
			g.appendChild(j)
		} else {
			g.appendChild(b)
		}
		n.event.bubble.titleStyler(g);
		d.appendChild(g);
		var e = h.createElement("div");
		this.fillDescription(e);
		n.event.bubble.bodyStyler(e);
		d.appendChild(e);
		var l = h.createElement("div");
		this.fillTime(l, f);
		n.event.bubble.timeStyler(l);
		d.appendChild(l);
		var m = h.createElement("div");
		this.fillWikiInfo(m);
		n.event.bubble.wikiStyler(m);
		d.appendChild(m)
	}
};
Timeline.ClassicTheme = new Object();
Timeline.ClassicTheme.implementations = [];
Timeline.ClassicTheme.create = function (b) {
	if (b == null) {
		b = Timeline.getDefaultLocale()
	}
	var a = Timeline.ClassicTheme.implementations[b];
	if (a == null) {
		a = Timeline.ClassicTheme._Impl
	}
	return new a()
};
Timeline.ClassicTheme._Impl = function () {
	this.firstDayOfWeek = 0;
	this.autoWidth = false;
	this.autoWidthAnimationTime = 500;
	this.timeline_start = null;
	this.timeline_stop = null;
	this.ether = {
		backgroundColors : [],
		highlightOpacity : 50,
		interval : {
			line : {
				show : true,
				opacity : 25
			},
			weekend : {
				opacity : 30
			},
			marker : {
				hAlign : "Bottom",
				vAlign : "Right"
			}
		}
	};
	this.event = {
		track : {
			height : 10,
			gap : 2,
			offset : 2,
			autoWidthMargin : 1.5
		},
		overviewTrack : {
			offset : 20,
			tickHeight : 6,
			height : 2,
			gap : 1,
			autoWidthMargin : 5
		},
		tape : {
			height : 4
		},
		instant : {
			icon : Timeline.urlPrefix + "images/dull-blue-circle.png",
			iconWidth : 10,
			iconHeight : 10,
			impreciseOpacity : 20,
			impreciseIconMargin : 3
		},
		duration : {
			impreciseOpacity : 20
		},
		label : {
			backgroundOpacity : 50,
			offsetFromLine : 3
		},
		highlightColors : ["#FFFF00", "#FFC000", "#FF0000", "#0000FF"],
		highlightLabelBackground : false,
		bubble : {
			width : 250,
			maxHeight : 0,
			titleStyler : function (a) {
				a.className = "timeline-event-bubble-title"
			},
			bodyStyler : function (a) {
				a.className = "timeline-event-bubble-body"
			},
			imageStyler : function (a) {
				a.className = "timeline-event-bubble-image"
			},
			wikiStyler : function (a) {
				a.className = "timeline-event-bubble-wiki"
			},
			timeStyler : function (a) {
				a.className = "timeline-event-bubble-time"
			}
		}
	};
	this.mouseWheel = "scroll"
};
Timeline.version = "2.3.0";
Timeline.ajax_lib_version = SimileAjax.version;
Timeline.display_version = Timeline.version + " (with Ajax lib " + Timeline.ajax_lib_version + ")";
Timeline.strings = {};
Timeline.HORIZONTAL = 0;
Timeline.VERTICAL = 1;
Timeline._defaultTheme = null;
Timeline.getDefaultLocale = function () {
	return Timeline.clientLocale
};
Timeline.create = function (d, e, c, b) {
	if (Timeline.timelines == null) {
		Timeline.timelines = []
	}
	var f = Timeline.timelines.length;
	Timeline.timelines[f] = null;
	var a = new Timeline._Impl(d, e, c, b, f);
	Timeline.timelines[f] = a;
	return a
};
Timeline.createBandInfo = function (h) {
	var g = ("theme" in h) ? h.theme : Timeline.getDefaultTheme();
	var a = ("eventSource" in h) ? h.eventSource : null;
	var f = new Timeline.LinearEther({
			centersOn : ("date" in h) ? h.date : new Date(),
			interval : SimileAjax.DateTime.gregorianUnitLengths[h.intervalUnit],
			pixelsPerInterval : h.intervalPixels,
			theme : g
		});
	var b = new Timeline.GregorianEtherPainter({
			unit : h.intervalUnit,
			multiple : ("multiple" in h) ? h.multiple : 1,
			theme : g,
			align : ("align" in h) ? h.align : undefined
		});
	var e = {
		showText : ("showEventText" in h) ? h.showEventText : true,
		theme : g
	};
	if ("eventPainterParams" in h) {
		for (var d in h.eventPainterParams) {
			e[d] = h.eventPainterParams[d]
		}
	}
	if ("trackHeight" in h) {
		e.trackHeight = h.trackHeight
	}
	if ("trackGap" in h) {
		e.trackGap = h.trackGap
	}
	var c = ("overview" in h && h.overview) ? "overview" : ("layout" in h ? h.layout : "original");
	var i;
	if ("eventPainter" in h) {
		i = new h.eventPainter(e)
	} else {
		switch (c) {
		case "overview":
			i = new Timeline.OverviewEventPainter(e);
			break;
		case "detailed":
			i = new Timeline.DetailedEventPainter(e);
			break;
		default:
			i = new Timeline.OriginalEventPainter(e)
		}
	}
	return {
		width : h.width,
		eventSource : a,
		timeZone : ("timeZone" in h) ? h.timeZone : 0,
		ether : f,
		etherPainter : b,
		eventPainter : i,
		theme : g,
		zoomIndex : ("zoomIndex" in h) ? h.zoomIndex : 0,
		zoomSteps : ("zoomSteps" in h) ? h.zoomSteps : null
	}
};
Timeline.createHotZoneBandInfo = function (h) {
	var g = ("theme" in h) ? h.theme : Timeline.getDefaultTheme();
	var a = ("eventSource" in h) ? h.eventSource : null;
	var f = new Timeline.HotZoneEther({
			centersOn : ("date" in h) ? h.date : new Date(),
			interval : SimileAjax.DateTime.gregorianUnitLengths[h.intervalUnit],
			pixelsPerInterval : h.intervalPixels,
			zones : h.zones,
			theme : g
		});
	var b = new Timeline.HotZoneGregorianEtherPainter({
			unit : h.intervalUnit,
			zones : h.zones,
			theme : g,
			align : ("align" in h) ? h.align : undefined
		});
	var e = {
		showText : ("showEventText" in h) ? h.showEventText : true,
		theme : g
	};
	if ("eventPainterParams" in h) {
		for (var d in h.eventPainterParams) {
			e[d] = h.eventPainterParams[d]
		}
	}
	if ("trackHeight" in h) {
		e.trackHeight = h.trackHeight
	}
	if ("trackGap" in h) {
		e.trackGap = h.trackGap
	}
	var c = ("overview" in h && h.overview) ? "overview" : ("layout" in h ? h.layout : "original");
	var i;
	if ("eventPainter" in h) {
		i = new h.eventPainter(e)
	} else {
		switch (c) {
		case "overview":
			i = new Timeline.OverviewEventPainter(e);
			break;
		case "detailed":
			i = new Timeline.DetailedEventPainter(e);
			break;
		default:
			i = new Timeline.OriginalEventPainter(e)
		}
	}
	return {
		width : h.width,
		eventSource : a,
		timeZone : ("timeZone" in h) ? h.timeZone : 0,
		ether : f,
		etherPainter : b,
		eventPainter : i,
		theme : g,
		zoomIndex : ("zoomIndex" in h) ? h.zoomIndex : 0,
		zoomSteps : ("zoomSteps" in h) ? h.zoomSteps : null
	}
};
Timeline.getDefaultTheme = function () {
	if (Timeline._defaultTheme == null) {
		Timeline._defaultTheme = Timeline.ClassicTheme.create(Timeline.getDefaultLocale())
	}
	return Timeline._defaultTheme
};
Timeline.setDefaultTheme = function (a) {
	Timeline._defaultTheme = a
};
Timeline.loadXML = function (a, c) {
	var b = function (e, f, g) {
		alert("Failed to load data xml from " + a + "\n" + e)
	};
	var d = function (e) {
		var f = e.responseXML;
		if (!f.documentElement && e.responseStream) {
			f.load(e.responseStream)
		}
		c(f, a)
	};
	SimileAjax.XmlHttp.get(a, b, d)
};
Timeline.loadJSON = function (url, f) {
	var fError = function (statusText, status, xmlhttp) {
		alert("Failed to load json data from " + url + "\n" + statusText)
	};
	var fDone = function (xmlhttp) {
		f(eval("(" + xmlhttp.responseText + ")"), url)
	};
	SimileAjax.XmlHttp.get(url, fError, fDone)
};
Timeline.getTimelineFromID = function (a) {
	return Timeline.timelines[a]
};
Timeline.writeVersion = function (a) {
	document.getElementById(a).innerHTML = this.display_version
};
Timeline._Impl = function (d, e, c, b, a) {
	SimileAjax.WindowManager.initialize();
	this._containerDiv = d;
	this._bandInfos = e;
	this._orientation = c == null ? Timeline.HORIZONTAL : c;
	this._unit = (b != null) ? b : SimileAjax.NativeDateUnit;
	this._starting = true;
	this._autoResizing = false;
	this.autoWidth = e && e[0] && e[0].theme && e[0].theme.autoWidth;
	this.autoWidthAnimationTime = e && e[0] && e[0].theme && e[0].theme.autoWidthAnimationTime;
	this.timelineID = a;
	this.timeline_start = e && e[0] && e[0].theme && e[0].theme.timeline_start;
	this.timeline_stop = e && e[0] && e[0].theme && e[0].theme.timeline_stop;
	this.timeline_at_start = false;
	this.timeline_at_stop = false;
	this._initialize()
};
Timeline._Impl.prototype.dispose = function () {
	for (var a = 0; a < this._bands.length; a++) {
		this._bands[a].dispose()
	}
	this._bands = null;
	this._bandInfos = null;
	this._containerDiv.innerHTML = "";
	Timeline.timelines[this.timelineID] = null
};
Timeline._Impl.prototype.getBandCount = function () {
	return this._bands.length
};
Timeline._Impl.prototype.getBand = function (a) {
	return this._bands[a]
};
Timeline._Impl.prototype.finishedEventLoading = function () {
	this._autoWidthCheck(true);
	this._starting = false
};
Timeline._Impl.prototype.layout = function () {
	this._autoWidthCheck(true);
	this._distributeWidths()
};
Timeline._Impl.prototype.paint = function () {
	for (var a = 0; a < this._bands.length; a++) {
		this._bands[a].paint()
	}
};
Timeline._Impl.prototype.getDocument = function () {
	return this._containerDiv.ownerDocument
};
Timeline._Impl.prototype.addDiv = function (a) {
	this._containerDiv.appendChild(a)
};
Timeline._Impl.prototype.removeDiv = function (a) {
	this._containerDiv.removeChild(a)
};
Timeline._Impl.prototype.isHorizontal = function () {
	return this._orientation == Timeline.HORIZONTAL
};
Timeline._Impl.prototype.isVertical = function () {
	return this._orientation == Timeline.VERTICAL
};
Timeline._Impl.prototype.getPixelLength = function () {
	return this._orientation == Timeline.HORIZONTAL ? this._containerDiv.offsetWidth : this._containerDiv.offsetHeight
};
Timeline._Impl.prototype.getPixelWidth = function () {
	return this._orientation == Timeline.VERTICAL ? this._containerDiv.offsetWidth : this._containerDiv.offsetHeight
};
Timeline._Impl.prototype.getUnit = function () {
	return this._unit
};
Timeline._Impl.prototype.getWidthStyle = function () {
	return this._orientation == Timeline.HORIZONTAL ? "height" : "width"
};
Timeline._Impl.prototype.loadXML = function (e, c) {
	var a = this;
	var b = function (f, g, h) {
		alert("Failed to load data xml from " + e + "\n" + f);
		a.hideLoadingMessage()
	};
	var d = function (f) {
		try {
			var g = f.responseXML;
			if (!g.documentElement && f.responseStream) {
				g.load(f.responseStream)
			}
			c(g, e)
		}
		finally {
			a.hideLoadingMessage()
		}
	};
	this.showLoadingMessage();
	window.setTimeout(function () {
		SimileAjax.XmlHttp.get(e, b, d)
	}, 0)
};
Timeline._Impl.prototype.loadJSON = function (url, f) {
	var tl = this;
	var fError = function (statusText, status, xmlhttp) {
		alert("Failed to load json data from " + url + "\n" + statusText);
		tl.hideLoadingMessage()
	};
	var fDone = function (xmlhttp) {
		try {
			f(eval("(" + xmlhttp.responseText + ")"), url)
		}
		finally {
			tl.hideLoadingMessage()
		}
	};
	this.showLoadingMessage();
	window.setTimeout(function () {
		SimileAjax.XmlHttp.get(url, fError, fDone)
	}, 0)
};
Timeline._Impl.prototype._autoWidthScrollListener = function (a) {
	a.getTimeline()._autoWidthCheck(false)
};
Timeline._Impl.prototype._autoWidthCheck = function (e) {
	var a = this;
	var f = a._starting;
	var d = 0;
	function c() {
		var h = a.getWidthStyle();
		if (f) {
			a._containerDiv.style[h] = d + "px"
		} else {
			a._autoResizing = true;
			var g = {};
			g[h] = d + "px";
			SimileAjax.jQuery(a._containerDiv).animate(g, a.autoWidthAnimationTime, "linear", function () {
				a._autoResizing = false
			})
		}
	}
	function b() {
		var h = 0;
		var i = a.getPixelWidth();
		if (a._autoResizing) {
			return
		}
		for (var g = 0; g < a._bands.length; g++) {
			a._bands[g].checkAutoWidth();
			h += a._bandInfos[g].width
		}
		if (h > i || e) {
			d = h;
			c();
			a._distributeWidths()
		}
	}
	if (!a.autoWidth) {
		return
	}
	b()
};
Timeline._Impl.prototype._initialize = function () {
	var b = this._containerDiv;
	var e = b.ownerDocument;
	b.className = b.className.split(" ").concat("timeline-container").join(" ");
	var g = (this.isHorizontal()) ? "horizontal" : "vertical";
	b.className += " timeline-" + g;
	while (b.firstChild) {
		b.removeChild(b.firstChild)
	}
	var a = SimileAjax.Graphics.createTranslucentImage(Timeline.urlPrefix + (this.isHorizontal() ? "images/copyright-vertical.png" : "images/copyright.png"));
	a.className = "timeline-copyright";
	a.title = "Timeline copyright SIMILE - www.code.google.com/p/simile-widgets/";
	SimileAjax.DOM.registerEvent(a, "click", function () {
		window.location = "http://code.google.com/p/simile-widgets/"
	});
	b.appendChild(a);
	this._bands = [];
	for (var h = 0; h < this._bandInfos.length; h++) {
		var c = new Timeline._Band(this, this._bandInfos[h], h);
		this._bands.push(c)
	}
	this._distributeWidths();
	for (var h = 0; h < this._bandInfos.length; h++) {
		var d = this._bandInfos[h];
		if ("syncWith" in d) {
			this._bands[h].setSyncWithBand(this._bands[d.syncWith], ("highlight" in d) ? d.highlight : false)
		}
	}
	if (this.autoWidth) {
		for (var h = 0; h < this._bands.length; h++) {
			this._bands[h].addOnScrollListener(this._autoWidthScrollListener)
		}
	}
	var f = SimileAjax.Graphics.createMessageBubble(e);
	f.containerDiv.className = "timeline-message-container";
	b.appendChild(f.containerDiv);
	f.contentDiv.className = "timeline-message";
	f.contentDiv.innerHTML = "<img src='" + Timeline.urlPrefix + "images/progress-running.gif' /> Loading...";
	this.showLoadingMessage = function () {
		f.containerDiv.style.display = "block"
	};
	this.hideLoadingMessage = function () {
		f.containerDiv.style.display = "none"
	}
};
Timeline._Impl.prototype._distributeWidths = function () {
	var h = this.getPixelLength();
	var c = this.getPixelWidth();
	var b = 0;
	for (var i = 0; i < this._bands.length; i++) {
		var e = this._bands[i];
		var f = this._bandInfos[i];
		var j = f.width;
		var a;
		if (typeof j == "string") {
			var g = j.indexOf("%");
			if (g > 0) {
				var d = parseInt(j.substr(0, g));
				a = Math.round(d * c / 100)
			} else {
				a = parseInt(j)
			}
		} else {
			a = j
		}
		e.setBandShiftAndWidth(b, a);
		e.setViewLength(h);
		b += a
	}
};
Timeline._Impl.prototype.shiftOK = function (g, h) {
	var d = h > 0,
	a = h < 0;
	if ((d && this.timeline_start == null) || (a && this.timeline_stop == null) || (h == 0)) {
		return (true)
	}
	var b = false;
	for (var e = 0; e < this._bands.length && !b; e++) {
		b = this._bands[e].busy()
	}
	if (b) {
		return (true)
	}
	if ((d && this.timeline_at_start) || (a && this.timeline_at_stop)) {
		return (false)
	}
	var f = false;
	for (var e = 0; e < this._bands.length && !f; e++) {
		var c = this._bands[e];
		if (d) {
			f = (e == g ? c.getMinVisibleDateAfterDelta(h) : c.getMinVisibleDate()) >= this.timeline_start
		} else {
			f = (e == g ? c.getMaxVisibleDateAfterDelta(h) : c.getMaxVisibleDate()) <= this.timeline_stop
		}
	}
	if (d) {
		this.timeline_at_start = !f;
		this.timeline_at_stop = false
	} else {
		this.timeline_at_stop = !f;
		this.timeline_at_start = false
	}
	return (f)
};
Timeline._Impl.prototype.zoom = function (e, a, b, c) {
	var f = new RegExp("^timeline-band-([0-9]+)$");
	var d = null;
	var g = f.exec(c.id);
	if (g) {
		d = parseInt(g[1])
	}
	if (d != null) {
		this._bands[d].zoom(e, a, b, c)
	}
	this.paint()
};
Timeline.NativeDateUnit = new Object();
Timeline.NativeDateUnit.createLabeller = function (b, a) {
	return new Timeline.GregorianDateLabeller(b, a)
};
Timeline.NativeDateUnit.makeDefaultValue = function () {
	return new Date()
};
Timeline.NativeDateUnit.cloneValue = function (a) {
	return new Date(a.getTime())
};
Timeline.NativeDateUnit.getParser = function (a) {
	if (typeof a == "string") {
		a = a.toLowerCase()
	}
	return (a == "iso8601" || a == "iso 8601") ? Timeline.DateTime.parseIso8601DateTime : Timeline.DateTime.parseGregorianDateTime
};
Timeline.NativeDateUnit.parseFromObject = function (a) {
	return Timeline.DateTime.parseGregorianDateTime(a)
};
Timeline.NativeDateUnit.toNumber = function (a) {
	return a.getTime()
};
Timeline.NativeDateUnit.fromNumber = function (a) {
	return new Date(a)
};
Timeline.NativeDateUnit.compare = function (b, c) {
	var d,
	a;
	if (typeof b == "object") {
		d = b.getTime()
	} else {
		d = Number(b)
	}
	if (typeof c == "object") {
		a = c.getTime()
	} else {
		a = Number(c)
	}
	return d - a
};
Timeline.NativeDateUnit.earlier = function (b, a) {
	return Timeline.NativeDateUnit.compare(b, a) < 0 ? b : a
};
Timeline.NativeDateUnit.later = function (b, a) {
	return Timeline.NativeDateUnit.compare(b, a) > 0 ? b : a
};
Timeline.NativeDateUnit.change = function (a, b) {
	return new Date(a.getTime() + b)
};

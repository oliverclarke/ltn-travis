/// Garbage scraped from travisltn.topsonic.aero

var selectedLanguage = 'LANG_UNDEFINED';
selectedLanguage = 'LANG_ENGLISH';
var date_months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var date_dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var date_Today = ' (Today)';
var MonthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var WeekDayName1 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var WeekDayName2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var CancelTextCalendar = 'Cancel';
// Klasse ChartControl
function ChartControl(objID_, panelID_, selectID_, chartOptions_) {
  // Membervariablen initialisieren:
  this.chartObject = new google.visualization.AreaChart(document.getElementById(objID_));
  this.chartData = new google.visualization.DataTable();
  this.lastChartTime = 0;
  this.lastChartEntryNMTState = NMTState.Unknown;
  this.preLastChartEntryNMTState = NMTState.Unknown;
  this.chartObjectID = objID_;
  this.chartPanelID = panelID_;
  this.chartSelectID = selectID_;
  this.chartOptions = chartOptions_;
  // Initialisierung des Datenmembers
  this.chartData.addColumn('string', '');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addColumn('number', 'Level');
  this.chartData.addRows(301);
  // 5 Minuten!
  // Beschriftung X-Achse:
  this.chartData.setValue(0, 0, '-5 min');
  this.chartData.setValue(150, 0, '-2,5 min');
  this.chartData.setValue(300, 0, 'Now');
  var me = this;
  google.visualization.events.addListener(this.chartObject, 'select', function() {
    me.chartSelectHandler();
  });
  google.visualization.events.addListener(this.chartObject, 'onmouseover', function(e) {
    me.chartMouseOverHandler(e);
  });
  google.visualization.events.addListener(this.chartObject, 'onmouseout', function(e) {
    me.chartMouseOutHandler(e);
  });
  document.getElementById(objID_).onmouseout = function(e) {
    me.setSelectedValue('', 0, false);
  };
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _chartcontrol_prototype_called == 'undefined') {
    _chartcontrol_prototype_called = true;
    ChartControl.prototype.addNewValue = addNewValue;
    ChartControl.prototype.addNewDistanceValue = addNewDistanceValue;
    ChartControl.prototype.onRemove = onRemove;
    ChartControl.prototype.redraw = redraw;
    ChartControl.prototype.update = update;
    ChartControl.prototype.reset = reset;
    ChartControl.prototype.setSelectedValue = setSelectedValue;
    ChartControl.prototype.chartSelectHandler = chartSelectHandler;
    ChartControl.prototype.chartMouseOverHandler = chartMouseOverHandler;
    ChartControl.prototype.chartMouseOutHandler = chartMouseOutHandler;
  }
  function onRemove() {
    if (this.chartObject) google.visualization.events.removeAllListeners(this.chartObject);
    this.chartData.removeRows(0, 301);
    this.chartData.removeColumns(0, 7);
    this.chartObject = null;
    this.chartData = null;
    this.lastChartTime = null;
    this.lastChartEntryNMTState = null;
    this.preLastChartEntryNMTState = null;
    this.chartObjectID = null;
    this.chartPanelID = null;
    this.chartSelectID = null;
    this.chartOptions = null;
  }
  function addNewValue(timeString) {
    this.chartData.setFormattedValue(0, 0, null);
    this.chartData.setFormattedValue(150, 0, null);
    this.chartData.removeRow(0);
    this.chartData.addRows(1);
    this.chartData.setValue(300, 0, timeString);
    this.chartData.setFormattedValue(0, 0, '-5 min');
    this.chartData.setFormattedValue(150, 0, '-2,5 min');
  }
  function addNewDistanceValue(valueString, ad) {
    var value = parseInt(valueString);
    this.chartData.setFormattedValue(0, 0, null);
    this.chartData.setFormattedValue(150, 0, null);
    this.chartData.removeRow(0);
    this.chartData.addRows(1);
    this.chartData.setValue(300, 0, valueString);
    if (ad == 'A') {
      var xValue = value + 30000;
      this.chartData.setFormattedValue(0, 0, xValue.toString());
      var xValue = value + 15000;
      this.chartData.setFormattedValue(150, 0, xValue.toString());
      xValue = null;
    } else {
      var xValue = value - 30000;
      if (xValue < 0) this.chartData.setFormattedValue(0, 0, '');
      else this.chartData.setFormattedValue(0, 0, xValue.toString());
      var xValue = value - 15000;
      if (xValue < 0) this.chartData.setFormattedValue(150, 0, '');
      else this.chartData.setFormattedValue(150, 0, xValue.toString());
      xValue = null;
    }
  }
  function redraw() {
    this.chartObject.draw(this.chartData, this.chartOptions);
  }
  function update(time, nmt, track, small) {
    if (this.objID != null && this.objID != '' && !document.getElementById(this.objID)) return;
    var roundedCurTime = Math.round(time);
    // Wird ein neues Objekt selektiert, dann laden wir auch gleich die 301 Sekunden vor dem aktuellen Zeitpunkt:
    if (nmt != null || track != null) {
      if (this.lastChartTime <= 0) this.lastChartTime = roundedCurTime - 301;
      if (this.chartPanelID && this.chartPanelID != '')
        document.getElementById(this.chartPanelID).style.display = 'block';
    }
    // Aktuellen Wert in Chart eintragen
    if (nmt != null) {
      // Passende Optionen fuer NMT-Anzeige
      if (small) this.chartOptions = chartOptionsNMTFlag;
      else this.chartOptions = chartOptionsNMT;
      if (this.lastChartTime <= 0) this.lastChartTime = roundedCurTime - 1;
      for (var h = this.lastChartTime + 1; h <= roundedCurTime; h++) {
        var curLevel = nmt.getCurrentLevelForNMTComplete(h);
        var nmtState = nmt.getNMTStateWithLevel(h, curLevel);
        if (nmtState != NMTState.Unknown) {
          this.addNewValue(systemTime2TimePartString(h));
          this.chartData.setValue(300, nmtState, curLevel);
          this.chartData.setProperty(300, 0, 'unixTime', h);
          // Achtung: Wenn wir von einer Farbe zur anderen wechseln, dann muss eine Verbindungslinie gelegt werden!
          // Dafuer verdoppeln wir die letzten beiden Punkte, um einen sanften Uebergang zu haben.
          if (this.lastChartEntryNMTState > NMTState.Unknown) {
            if (this.lastChartEntryNMTState < nmtState) {
              this.chartData.setValue(
                300,
                this.lastChartEntryNMTState,
                this.chartData.getValue(300, nmtState),
              );
            }
            if (this.lastChartEntryNMTState > nmtState) {
              this.chartData.setValue(
                299,
                nmtState,
                this.chartData.getValue(299, this.lastChartEntryNMTState),
              );
              if (this.preLastChartEntryNMTState > NMTState.Unknown)
                this.chartData.setValue(
                  298,
                  nmtState,
                  this.chartData.getValue(298, this.preLastChartEntryNMTState),
                );
            }
          }
          this.preLastChartEntryNMTState = this.lastChartEntryNMTState;
          this.lastChartEntryNMTState = nmtState;
        }
        this.lastChartTime = h;
        curLevel = null;
        nmtState = null;
      }
      this.redraw();
    } // Track selektiert? Dann ClimbProfile anzeigen:
    else if (track != null) {
      // Passende Optionen fuer Track-Anzeige
      if (!this.chartOptions) this.chartOptions = chartOptionsTrack;
      if (this.lastChartTime <= 0) this.lastChartTime = roundedCurTime - 1;
      for (var h = this.lastChartTime + 1; h <= roundedCurTime; h++) {
        var curHeight = getCurrentHeightForFlight(track, h);
        if (curHeight < 100000 && curHeight > -999) {
          var timeString = systemTime2TimePartString(roundedCurTime);
          this.addNewValue(systemTime2TimePartString(h));
          this.chartData.setValue(300, NMTState.Standard, curHeight);
          this.chartData.setValue(300, NMTState.BelowThreshold, arpHeight);
          this.chartData.setProperty(300, 0, 'unixTime', h);
          timeString = null;
          // Bei gr��eren Werten Skalierung wechseln:
          if (curHeight >= 30000) this.chartOptions = chartOptionsTrack40000;
          else if (curHeight >= 25000) this.chartOptions = chartOptionsTrack30000;
          else if (curHeight >= 20000) this.chartOptions = chartOptionsTrack25000;
          else if (curHeight >= 15000) this.chartOptions = chartOptionsTrack20000;
        }
        this.lastChartTime = h;
        curHeight = null;
      }
      this.redraw();
    }
    if (nmt == null && track == null) {
      // Ggf. muss Chart geleert werden - z.B. wenn Track verschwunden.
      if (this.lastChartTime > 1) {
        this.reset();
        this.redraw();
      }
    }
    roundedCurTime = null;
  }
  function reset() {
    if (
      this.chartObjectID &&
      this.chartObjectID != '' &&
      this.chartPanelID &&
      this.chartPanelID != '' &&
      document.getElementById(this.chartObjectID)
    ) {
      document.getElementById(this.chartPanelID).style.display = 'none';
    }
    this.chartData.removeRows(0, 301);
    this.chartData.addRows(301);
    // 5 Minuten!
    this.lastChartTime = 0;
    this.lastChartEntryNMTState = NMTState.Unknown;
    this.secondLastChartEntryNMTState = NMTState.Unknown;
    this.setSelectedValue('', 0, false);
    this.chartOptions = null;
  }
  function setSelectedValue(message, nmtState, extended) {
    if (!this.chartSelectID || this.chartSelectID == '') return;
    if (message != '') document.getElementById(this.chartSelectID).style.display = 'block';
    else document.getElementById(this.chartSelectID).style.display = 'none';
    if (extended) document.getElementById(this.chartSelectID).style.height = '32px';
    else document.getElementById(this.chartSelectID).style.height = '17px';
    var imgString = '';
    if (nmtState == NMTState.Standard) imgString = "<img src='images/chartSelectedBlau.gif'>";
    if (nmtState == NMTState.BelowThreshold)
      imgString = "<img src='images/chartSelectedGruen.gif'>";
    if (nmtState == NMTState.AboveThreshold) imgString = "<img src='images/chartSelectedGelb.gif'>";
    if (nmtState == NMTState.NoiseEvent) imgString = "<img src='images/chartSelectedOrange.gif'>";
    if (nmtState == NMTState.Downtime) imgString = "<img src='images/chartSelectedGrau.gif'>";
    if (nmtState == NMTState.Error) imgString = "<img src='images/chartSelectedRot.gif'>";
    $('#' + this.chartSelectID).html(imgString + '&nbsp;&nbsp;' + message);
    imgString = null;
  }
  function chartSelectHandler() {
    this.chartObject.setSelection(); // Hier wird nix selektiert!
  }
  function chartMouseOverHandler(e) {
    if (!this.chartSelectID || this.chartSelectID == '') return;
    var message = '';
    var nmtState = NMTState.Unknown;
    var extendedText = false;
    if (e != null && e['row'] != null && this.chartData.getValue(e['row'], 0) != null) {
      var nmt = getSelectedNMT();
      var track = getSelectedTrack();
      if (nmt != null) {
        var timeString = this.chartData.getValue(e['row'], 0);
        var valueStr = '';
        // Bestimme Laermwert und gleichzeitig den NMT-Status:
        for (var j = NMTState.Standard; j <= NMTState.Downtime; j++) {
          if (this.chartData.getFormattedValue(e['row'], j) != '') {
            valueStr = parseFloat(this.chartData.getFormattedValue(e['row'], j)).toFixed(1);
            valueStr += ' dB(A)';
            nmtState = j;
          }
        }
        var currentNE = nmt.getNoiseEvent(this.chartData.getProperty(e['row'], 0, 'unixTime'));
        if (currentNE != null) {
          extendedText = true;
          valueStr += '<br/>Max.: ';
          valueStr += currentNE.getLasMax().toFixed(1);
          valueStr += ' dB(A) - ';
          valueStr += systemTime2TimePartString(currentNE.getTLasMax());
        }
        message += timeString + ' - ' + valueStr;
        timeString = null;
        valueStr = null;
        currentNE = null;
      } else if (track != null) {
        var timeString = this.chartData.getValue(e['row'], 0);
        var valueStr = this.chartData.getValue(e['row'], 1);
        message += timeString + ' - ' + valueStr + ' ft';
        timeString = null;
        valueStr = null;
      }
    }
    this.setSelectedValue(message, nmtState, extendedText);
    message = null;
    nmtState = null;
    extendedText = null;
  }
  function chartMouseOutHandler(e) {
    if (!this.chartSelectID || this.chartSelectID == '') return;
    this.setSelectedValue('', 0, false);
    document.getElementById(this.chartSelectID).style.display = 'none';
  }
}
// Klasse TrackDetails
function TrackDetails(l, v) {
  // Membervariablen initialisieren:
  this.label = l;
  this.value = v;
  this.highlighted = false;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _trackdetails_prototype_called == 'undefined') {
    _trackdetails_prototype_called = true;
    TrackDetails.prototype.getLabel = getLabel;
    TrackDetails.prototype.setLabel = setLabel;
    TrackDetails.prototype.getValue = getValue;
    TrackDetails.prototype.setValue = setValue;
    TrackDetails.prototype.getHighlighted = getHighlighted;
    TrackDetails.prototype.setHighlighted = setHighlighted;
  }
  // Plot Zugriffsmethoden:
  function getLabel() {
    return this.label;
  }
  function setLabel(label) {
    this.label = label;
  }
  function getValue() {
    return this.value;
  }
  function setValue(value) {
    this.value = value;
  }
  function getHighlighted() {
    return this.highlighted;
  }
  function setHighlighted(highlighted) {
    this.highlighted = highlighted;
  }
}
// Klasse Plot
function Plot() {
  // Membervariablen initialisieren:
  this.latitude = -1;
  this.longitude = -1;
  this.heading = -1;
  this.speed = -1;
  this.flightLevel = -1000;
  this.timeValue = 0;
  this.distanceToAirport = -1;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  // lat="51.887594"
  // lon="-0.295787"
  // speed="135"
  // heading="259"
  // flightlevel="1279"
  // time="759"/>
  if (typeof _plot_prototype_called == 'undefined') {
    _plot_prototype_called = true;
    Plot.prototype.getLatitude = getLatitude;
    Plot.prototype.setLatitude = setLatitude;
    Plot.prototype.getLongitude = getLongitude;
    Plot.prototype.setLongitude = setLongitude;
    Plot.prototype.getHeading = getHeading;
    Plot.prototype.setHeading = setHeading;
    Plot.prototype.getSpeed = getSpeed;
    Plot.prototype.setSpeed = setSpeed;
    Plot.prototype.getFlightLevel = getFlightLevel;
    Plot.prototype.setFlightLevel = setFlightLevel;
    Plot.prototype.getTimeValue = getTimeValue;
    Plot.prototype.setTimeValue = setTimeValue;
    Plot.prototype.getDistanceToAirport = getDistanceToAirport;
    Plot.prototype.setDistanceToAirport = setDistanceToAirport;
  }
  // Plot Zugriffsmethoden:
  function getLatitude() {
    return this.latitude;
  }
  function setLatitude(l) {
    this.latitude = l;
  }
  function getLongitude() {
    return this.longitude;
  }
  function setLongitude(l) {
    this.longitude = l;
  }
  function getHeading() {
    return this.heading;
  }
  function setHeading(h) {
    this.heading = h;
  }
  function getSpeed() {
    return this.speed;
  }
  function setSpeed(s) {
    this.speed = s;
  }
  function getFlightLevel() {
    return this.flightLevel;
  }
  function setFlightLevel(l) {
    this.flightLevel = l;
  }
  function getTimeValue() {
    return this.timeValue;
  }
  function setTimeValue(t) {
    this.timeValue = t;
  }
  function getDistanceToAirport() {
    return this.distanceToAirport;
  }
  function setDistanceToAirport(d) {
    this.distanceToAirport = d;
  }
}
// Klasse FlightTrack
function FlightTrack() {
  // Membervariablen initialisieren:
  this.flightNo = '';
  this.flightID = -1;
  this.ad = '';
  this.rwy = '';
  this.ssr = '';
  this.att = '';
  this.airport = '';
  this.airportname = '';
  this.carrier = '';
  this.registration = '';
  this.actype = '';
  this.acversion = '';
  this.azbGroup = '';
  this.zpegel = 0;
  this.okt1 = 0;
  this.okt2 = 0;
  this.okt3 = 0;
  this.okt4 = 0;
  this.okt5 = 0;
  this.okt6 = 0;
  this.okt7 = 0;
  this.okt8 = 0;
  this.grenzhoeheSub1 = 0;
  this.grenzhoeheSub2 = 0;
  this.grenzhoeheSub3 = 0;
  this.zPegelKorrSub1 = 0;
  this.zPegelKorrSub2 = 0;
  this.zPegelKorrSub3 = 0;
  this.grenzhoeheUnten = 0;
  this.grenzhoeheMitte = 0;
  this.grenzhoeheOben = 0;
  this.zPegelKorr = 0;
  this.callsign = '';
  this.acclass = 0;
  this.azb99 = 0;
  this.plots = new Array();
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _flighttrack_prototype_called == 'undefined') {
    _flighttrack_prototype_called = true;
    FlightTrack.prototype.getFlightNo = getFlightNo;
    FlightTrack.prototype.setFlightNo = setFlightNo;
    FlightTrack.prototype.getFlightID = getFlightID;
    FlightTrack.prototype.setFlightID = setFlightID;
    FlightTrack.prototype.getAD = getAD;
    FlightTrack.prototype.setAD = setAD;
    FlightTrack.prototype.getRWY = getRWY;
    FlightTrack.prototype.setRWY = setRWY;
    FlightTrack.prototype.getSSR = getSSR;
    FlightTrack.prototype.setSSR = setSSR;
    FlightTrack.prototype.getATT = getATT;
    FlightTrack.prototype.setATT = setATT;
    FlightTrack.prototype.getAirport = getAirport;
    FlightTrack.prototype.setAirport = setAirport;
    FlightTrack.prototype.getAirportName = getAirportName;
    FlightTrack.prototype.setAirportName = setAirportName;
    FlightTrack.prototype.getCarrier = getCarrier;
    FlightTrack.prototype.setCarrier = setCarrier;
    FlightTrack.prototype.getRegistration = getRegistration;
    FlightTrack.prototype.setRegistration = setRegistration;
    FlightTrack.prototype.getACType = getACType;
    FlightTrack.prototype.setACType = setACType;
    FlightTrack.prototype.getACVersion = getACVersion;
    FlightTrack.prototype.setACVersion = setACVersion;
    FlightTrack.prototype.getAZBGroup = getAZBGroup;
    FlightTrack.prototype.setAZBGroup = setAZBGroup;
    FlightTrack.prototype.getZPegel = getZPegel;
    FlightTrack.prototype.setZPegel = setZPegel;
    FlightTrack.prototype.getOkt1 = getOkt1;
    FlightTrack.prototype.setOkt1 = setOkt1;
    FlightTrack.prototype.getOkt2 = getOkt2;
    FlightTrack.prototype.setOkt2 = setOkt2;
    FlightTrack.prototype.getOkt3 = getOkt3;
    FlightTrack.prototype.setOkt3 = setOkt3;
    FlightTrack.prototype.getOkt4 = getOkt4;
    FlightTrack.prototype.setOkt4 = setOkt4;
    FlightTrack.prototype.getOkt5 = getOkt5;
    FlightTrack.prototype.setOkt5 = setOkt5;
    FlightTrack.prototype.getOkt6 = getOkt6;
    FlightTrack.prototype.setOkt6 = setOkt6;
    FlightTrack.prototype.getOkt7 = getOkt7;
    FlightTrack.prototype.setOkt7 = setOkt7;
    FlightTrack.prototype.getOkt8 = getOkt8;
    FlightTrack.prototype.setOkt8 = setOkt8;
    FlightTrack.prototype.getOktValue = getOktValue;
    FlightTrack.prototype.getGrenzhoeheSub1 = getGrenzhoeheSub1;
    FlightTrack.prototype.setGrenzhoeheSub1 = setGrenzhoeheSub1;
    FlightTrack.prototype.getGrenzhoeheSub2 = getGrenzhoeheSub2;
    FlightTrack.prototype.setGrenzhoeheSub2 = setGrenzhoeheSub2;
    FlightTrack.prototype.getGrenzhoeheSub3 = getGrenzhoeheSub3;
    FlightTrack.prototype.setGrenzhoeheSub3 = setGrenzhoeheSub3;
    FlightTrack.prototype.getZPegelKorrSub1 = getZPegelKorrSub1;
    FlightTrack.prototype.setZPegelKorrSub1 = setZPegelKorrSub1;
    FlightTrack.prototype.getZPegelKorrSub2 = getZPegelKorrSub2;
    FlightTrack.prototype.setZPegelKorrSub2 = setZPegelKorrSub2;
    FlightTrack.prototype.getZPegelKorrSub3 = getZPegelKorrSub3;
    FlightTrack.prototype.setZPegelKorrSub3 = setZPegelKorrSub3;
    FlightTrack.prototype.getGrenzhoeheUnten = getGrenzhoeheUnten;
    FlightTrack.prototype.setGrenzhoeheUnten = setGrenzhoeheUnten;
    FlightTrack.prototype.getGrenzhoeheMitte = getGrenzhoeheMitte;
    FlightTrack.prototype.setGrenzhoeheMitte = setGrenzhoeheMitte;
    FlightTrack.prototype.getGrenzhoeheOben = getGrenzhoeheOben;
    FlightTrack.prototype.setGrenzhoeheOben = setGrenzhoeheOben;
    FlightTrack.prototype.getZPegelKorr = getZPegelKorr;
    FlightTrack.prototype.setZPegelKorr = setZPegelKorr;
    FlightTrack.prototype.getCallsign = getCallsign;
    FlightTrack.prototype.setCallsign = setCallsign;
    FlightTrack.prototype.getACClass = getACClass;
    FlightTrack.prototype.setACClass = setACClass;
    FlightTrack.prototype.getAZB99 = getAZB99;
    FlightTrack.prototype.setAZB99 = setAZB99;
    FlightTrack.prototype.getPlots = getPlots;
    FlightTrack.prototype.addPlot = addPlot;
    FlightTrack.prototype.clearPlots = clearPlots;
    FlightTrack.prototype.getTimeLastScanned = getTimeLastScanned;
    FlightTrack.prototype.getTimeFirstScanned = getTimeFirstScanned;
    FlightTrack.prototype.isActive = isActive;
    FlightTrack.prototype.updateDistanceToAirport = updateDistanceToAirport;
  }
  // FlightTrack Zugriffsmethoden:
  function getFlightNo() {
    return this.flightNo;
  }
  function setFlightNo(no) {
    this.flightNo = no;
  }
  function getFlightID() {
    return this.flightID;
  }
  function setFlightID(id) {
    this.flightID = id;
  }
  function getAD() {
    return this.ad;
  }
  function setAD(ad) {
    this.ad = ad;
  }
  function getRWY() {
    return this.rwy;
  }
  function setRWY(rwy) {
    this.rwy = rwy;
  }
  function getSSR() {
    return this.ssr;
  }
  function setSSR(ssr) {
    this.ssr = ssr;
  }
  function getATT() {
    return this.att;
  }
  function setATT(att) {
    this.att = att;
  }
  function getAirport() {
    return this.airport;
  }
  function setAirport(airport) {
    this.airport = airport;
  }
  function getAirportName() {
    return this.airportName;
  }
  function setAirportName(airportName) {
    this.airportName = airportName;
  }
  function getCarrier() {
    return this.carrier;
  }
  function setCarrier(c) {
    this.carrier = c;
  }
  function getRegistration() {
    return this.registration;
  }
  function setRegistration(r) {
    this.registration = r;
  }
  function getACType() {
    return this.actype;
  }
  function setACType(t) {
    this.actype = t;
  }
  function getACVersion() {
    return this.acversion;
  }
  function setACVersion(t) {
    this.acversion = t;
  }
  function getAZBGroup() {
    return this.azbGroup;
  }
  function setAZBGroup(g) {
    this.azbGroup = g;
  }
  function getZPegel() {
    return this.zpegel;
  }
  function setZPegel(z) {
    this.zpegel = z;
  }
  function getOkt1() {
    return this.okt1;
  }
  function setOkt1(o) {
    this.okt1 = o;
  }
  function getOkt2() {
    return this.okt2;
  }
  function setOkt2(o) {
    this.okt2 = o;
  }
  function getOkt3() {
    return this.okt3;
  }
  function setOkt3(o) {
    this.okt3 = o;
  }
  function getOkt4() {
    return this.okt4;
  }
  function setOkt4(o) {
    this.okt4 = o;
  }
  function getOkt5() {
    return this.okt5;
  }
  function setOkt5(o) {
    this.okt5 = o;
  }
  function getOkt6() {
    return this.okt6;
  }
  function setOkt6(o) {
    this.okt6 = o;
  }
  function getOkt7() {
    return this.okt7;
  }
  function setOkt7(o) {
    this.okt7 = o;
  }
  function getOkt8() {
    return this.okt8;
  }
  function setOkt8(o) {
    this.okt8 = o;
  }
  function getOktValue(i) {
    switch (i) {
      case 0:
        return this.okt1;
        break;
      case 1:
        return this.okt2;
        break;
      case 2:
        return this.okt3;
        break;
      case 3:
        return this.okt4;
        break;
      case 4:
        return this.okt5;
        break;
      case 5:
        return this.okt6;
        break;
      case 6:
        return this.okt7;
        break;
      case 7:
        return this.okt8;
        break;
      default:
        return 0;
    }
  }
  function getGrenzhoeheSub1() {
    return this.grenzhoeheSub1;
  }
  function setGrenzhoeheSub1(g) {
    this.grenzhoeheSub1 = g;
  }
  function getGrenzhoeheSub2() {
    return this.grenzhoeheSub2;
  }
  function setGrenzhoeheSub2(g) {
    this.grenzhoeheSub2 = g;
  }
  function getGrenzhoeheSub3() {
    return this.grenzhoeheSub3;
  }
  function setGrenzhoeheSub3(g) {
    this.grenzhoeheSub3 = g;
  }
  function getZPegelKorrSub1() {
    return this.zPegelKorrSub1;
  }
  function setZPegelKorrSub1(g) {
    this.zPegelKorrSub1 = g;
  }
  function getZPegelKorrSub2() {
    return this.zPegelKorrSub2;
  }
  function setZPegelKorrSub2(g) {
    this.zPegelKorrSub2 = g;
  }
  function getZPegelKorrSub3() {
    return this.zPegelKorrSub3;
  }
  function setZPegelKorrSub3(g) {
    this.zPegelKorrSub3 = g;
  }
  function getGrenzhoeheUnten() {
    return this.grenzhoeheUnten;
  }
  function setGrenzhoeheUnten(g) {
    this.grenzhoeheUnten = g;
  }
  function getGrenzhoeheMitte() {
    return this.grenzhoeheMitte;
  }
  function setGrenzhoeheMitte(g) {
    this.grenzhoeheMitte = g;
  }
  function getGrenzhoeheOben() {
    return this.grenzhoeheOben;
  }
  function setGrenzhoeheOben(g) {
    this.grenzhoeheOben = g;
  }
  function getZPegelKorr() {
    return this.zPegelKorr;
  }
  function setZPegelKorr(g) {
    this.zPegelKorr = g;
  }
  function getCallsign() {
    return this.callsign;
  }
  function setCallsign(c) {
    this.callsign = c;
  }
  function getACClass() {
    return this.acclass;
  }
  function setACClass(acc) {
    this.acclass = acc;
  }
  function getAZB99() {
    return this.azb99;
  }
  function setAZB99(az) {
    this.azb99 = az;
  }
  function getPlots() {
    return this.plots;
  }
  function addPlot(newPlot) {
    this.plots.push(newPlot);
  }
  function clearPlots() {
    var l = this.plots.length;
    for (var x = 0; x < l; x++) {
      this.plots[0] = null;
      this.plots.shift();
    }
    x = null;
    l = null;
  }
  function getTimeLastScanned() {
    if (this.plots.length > 0) return this.plots[this.plots.length - 1].getTimeValue();
    else return -1;
  }
  function getTimeFirstScanned() {
    if (this.plots.length > 0) return this.plots[0].getTimeValue();
    else return -1;
  }
  function isActive(t) {
    if (this.plots.length > 0 && t >= this.getTimeFirstScanned() && t <= this.getTimeLastScanned())
      return true;
    else return false;
  }
  function updateDistanceToAirport() {
    var l = this.plots.length;
    if (this.getAD() === 'D') {
      var thrPosition = airportData.getThrPosition(this.rwy);
      for (var x = 0; x < l; x++) {
        var curPos = new google.maps.LatLng(
          this.plots[x].getLatitude(),
          this.plots[x].getLongitude(),
        );
        if (x == 0) {
          this.plots[x].setDistanceToAirport(
            google.maps.geometry.spherical.computeDistanceBetween(thrPosition, curPos),
          );
        } else {
          var prePos = new google.maps.LatLng(
            this.plots[x - 1].getLatitude(),
            this.plots[x - 1].getLongitude(),
          );
          this.plots[x].setDistanceToAirport(
            this.plots[x - 1].getDistanceToAirport() +
              google.maps.geometry.spherical.computeDistanceBetween(prePos, curPos),
          );
          prePos = null;
        }
        curPos = null;
      }
      x = null;
      thrPosition = null;
    } else if (this.getAD() === 'A') {
      var thrPosition = airportData.getOppositeThrPosition(this.rwy);
      for (var x = l - 1; x >= 0; x--) {
        var curPos = new google.maps.LatLng(
          this.plots[x].getLatitude(),
          this.plots[x].getLongitude(),
        );
        if (x == l - 1) {
          this.plots[x].setDistanceToAirport(
            google.maps.geometry.spherical.computeDistanceBetween(thrPosition, curPos),
          );
        } else {
          var prePos = new google.maps.LatLng(
            this.plots[x + 1].getLatitude(),
            this.plots[x + 1].getLongitude(),
          );
          this.plots[x].setDistanceToAirport(
            this.plots[x + 1].getDistanceToAirport() +
              google.maps.geometry.spherical.computeDistanceBetween(prePos, curPos),
          );
          prePos = null;
        }
        curPos = null;
      }
      x = null;
      thrPosition = null;
    }
    l = null;
  }
}
// Klasse TopWebTrack
function TopWebTrack() {
  // Membervariablen initialisieren:
  this.trackData = null;
  this.marker = null;
  this.polyline = null;
  this.completePolyline = null;
  this.flagRect = null;
  this.airplaneIcon = null;
  this.selectedState = false;
  this.indexFirstVisiblePlot = -1;
  this.indexLastVisiblePlot = -1;
  this.indexLastHeightAccess = 0;
  this.indexLastDistanceAccess = 0;
  this.plotsBeforeStartTime = 0;
  this.closestApproachDistance = -1;
  this.closestApproachAngle = -1;
  this.closestApproachHeading = -1;
  this.closestApproachTime = -1;
  this.mouseOver = false;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _topwebtrack_prototype_called == 'undefined') {
    _topwebtrack_prototype_called = true;
    TopWebTrack.prototype.getTrackData = getTrackData;
    TopWebTrack.prototype.setTrackData = setTrackData;
    TopWebTrack.prototype.getMarker = getMarker;
    TopWebTrack.prototype.setMarker = setMarker;
    TopWebTrack.prototype.getPolyline = getPolyline;
    TopWebTrack.prototype.setPolyline = setPolyline;
    TopWebTrack.prototype.getCompletePolyline = getCompletePolyline;
    TopWebTrack.prototype.setCompletePolyline = setCompletePolyline;
    TopWebTrack.prototype.getFlagRect = getFlagRect;
    TopWebTrack.prototype.setFlagRect = setFlagRect;
    TopWebTrack.prototype.getAirplaneIcon = getAirplaneIcon;
    TopWebTrack.prototype.setAirplaneIcon = setAirplaneIcon;
    TopWebTrack.prototype.isSelected = isSelected;
    TopWebTrack.prototype.setSelected = setSelected;
    TopWebTrack.prototype.setPolylineVisible = setPolylineVisible;
    TopWebTrack.prototype.setIndexFirstVisiblePlot = setIndexFirstVisiblePlot;
    TopWebTrack.prototype.getIndexFirstVisiblePlot = getIndexFirstVisiblePlot;
    TopWebTrack.prototype.setIndexLastVisiblePlot = setIndexLastVisiblePlot;
    TopWebTrack.prototype.getIndexLastVisiblePlot = getIndexLastVisiblePlot;
    TopWebTrack.prototype.setIndexLastHeightAccess = setIndexLastHeightAccess;
    TopWebTrack.prototype.getIndexLastHeightAccess = getIndexLastHeightAccess;
    TopWebTrack.prototype.setIndexLastDistanceAccess = setIndexLastDistanceAccess;
    TopWebTrack.prototype.getIndexLastDistanceAccess = getIndexLastDistanceAccess;
    TopWebTrack.prototype.setPlotsBeforeStartTime = setPlotsBeforeStartTime;
    TopWebTrack.prototype.getPlotsBeforeStartTime = getPlotsBeforeStartTime;
    TopWebTrack.prototype.incPlotsBeforeStartTime = incPlotsBeforeStartTime;
    TopWebTrack.prototype.setClosestApproachDistance = setClosestApproachDistance;
    TopWebTrack.prototype.getClosestApproachDistance = getClosestApproachDistance;
    TopWebTrack.prototype.setClosestApproachAngle = setClosestApproachAngle;
    TopWebTrack.prototype.getClosestApproachAngle = getClosestApproachAngle;
    TopWebTrack.prototype.setClosestApproachHeading = setClosestApproachHeading;
    TopWebTrack.prototype.getClosestApproachHeading = getClosestApproachHeading;
    TopWebTrack.prototype.setClosestApproachTime = setClosestApproachTime;
    TopWebTrack.prototype.getClosestApproachTime = getClosestApproachTime;
    TopWebTrack.prototype.calculateClosestApproach = calculateClosestApproach;
    TopWebTrack.prototype.setMouseOver = setMouseOver;
    TopWebTrack.prototype.getMouseOver = getMouseOver;
    TopWebTrack.prototype.getFlagString = getFlagString;
  }
  // TopWebTrack Zugriffsmethoden:
  function getTrackData() {
    return this.trackData;
  }
  function setTrackData(trackData) {
    this.trackData = trackData;
  }
  function getMarker() {
    return this.marker;
  }
  function setMarker(marker) {
    this.marker = marker;
  }
  function getPolyline() {
    return this.polyline;
  }
  function setPolyline(polyline) {
    this.polyline = polyline;
  }
  function getCompletePolyline() {
    return this.completePolyline;
  }
  function setCompletePolyline(polyline) {
    this.completePolyline = polyline;
  }
  function getFlagRect() {
    return this.flagRect;
  }
  function setFlagRect(flagRect) {
    this.flagRect = flagRect;
  }
  function getAirplaneIcon() {
    return this.airplaneIcon;
  }
  function setAirplaneIcon(airplaneIcon) {
    this.airplaneIcon = airplaneIcon;
  }
  function isSelected() {
    return this.selectedState;
  }
  function setSelected(sel) {
    if (this.selectedState == sel) return;
    if (!sel) this.setMouseOver(false);
    var me = this;
    this.selectedState = sel;
    if (this.getPolyline() != null) {
      if (sel)
        this.getPolyline().setOptions({
          strokeWeight: 3,
          strokeOpacity: 1,
        });
      else
        this.getPolyline().setOptions({
          strokeWeight: 2,
          strokeOpacity: 0.8,
        });
    }
    if (this.getCompletePolyline() != null) {
      if (sel)
        this.getCompletePolyline().setOptions({
          strokeWeight: 2,
          strokeOpacity: 0.4,
        });
      else
        this.getCompletePolyline().setOptions({
          strokeWeight: 2,
          strokeOpacity: 0.2,
        });
    }
    var apIcon = this.getAirplaneIcon();
    if (apIcon != null) {
      apIcon.setSelected(sel);
      // Es ist zum Kotzen mit diesem IE! Man kann dem Icon-Rotator leider nicht beibringen, dass er nur die Bild-Url im IE aendern soll.
      // Daher mal wieder eine Extrawurst: AirplaneIcon wird ganz neu angelegt mit anderem Icon
      if (ieVersion > 0) {
        // Neue Flag anlegen:
        var ap = new AirplaneIcon(
          apIcon.getPosition(),
          apIcon.getUrl(),
          apIcon.getHeading(),
          apIcon.getSize(),
        );
        var handler = createMarkerClickHandler(ap, me, true);
        google.maps.event.addListener(ap, 'click', handler);
        google.maps.event.addListener(ap, 'mouseover', function() {
          me.setMouseOver(true);
          loadFlightTrack(me, globalSystemTime);
        });
        google.maps.event.addListener(ap, 'mouseout', function() {
          me.setMouseOver(false);
          if (!me.isSelected() && !flagsForall) clearFlagRectObject(me);
        });
        this.setAirplaneIcon(ap);
        ap.draw();
        ap = null;
        apIcon.setMap(null);
        google.maps.event.clearInstanceListeners(apIcon);
      }
    }
    apIcon = null;
    if (this.getFlagRect() != null) {
      this.getFlagRect().setSelected(sel);
    }
    if (sel) {
      complaintParams.setSelectedTrack(this);
    } else {
      complaintParams.setSelectedTrack(null);
    }
    var reg = convertRegistrationString(this.getTrackData().getRegistration());
    if (sel && reg != '') {
      // iFrame unsichtbar machen, da wir sonst tempor�r das vorherige Bild wieder eingeblendet bekommen.
      // Wird �ber das onLoad des iFrames automatisch wieder angezeigt .....
      document.getElementById('iframeACPicture').style.display = 'none';
      document.getElementById('iframeACPicture').src = './getACPic.php?reg=' + reg;
    } else {
      document.getElementById('iframeACPicture').src = './images/NoACPicture.png';
    }
    reg = null;
  }
  function setPolylineVisible(vis) {
    if (this.getPolyline() != null) {
      if (vis) {
        if (this.selectedState)
          this.getPolyline().setOptions({
            strokeWeight: 3,
            strokeOpacity: 1,
          });
        else
          this.getPolyline().setOptions({
            strokeWeight: 2,
            strokeOpacity: 0.8,
          });
      } else
        this.getPolyline().setOptions({
          strokeWeight: 0,
          strokeOpacity: 0,
        });
    }
    if (this.getCompletePolyline() != null) {
      if (vis) {
        if (this.selectedState)
          this.getCompletePolyline().setOptions({
            strokeWeight: 2,
            strokeOpacity: 0.6,
          });
        else
          this.getCompletePolyline().setOptions({
            strokeWeight: 2,
            strokeOpacity: 0.4,
          });
      } else
        this.getCompletePolyline().setOptions({
          strokeWeight: 0,
          strokeOpacity: 0,
        });
    }
  }
  function getIndexFirstVisiblePlot() {
    return this.indexFirstVisiblePlot;
  }
  function setIndexFirstVisiblePlot(i) {
    this.indexFirstVisiblePlot = i;
  }
  function getIndexLastVisiblePlot() {
    return this.indexLastVisiblePlot;
  }
  function setIndexLastVisiblePlot(i) {
    this.indexLastVisiblePlot = i;
  }
  function getIndexLastHeightAccess() {
    return this.indexLastHeightAccess;
  }
  function setIndexLastHeightAccess(i) {
    this.indexLastHeightAccess = i;
  }
  function getIndexLastDistanceAccess() {
    return this.indexLastDistanceAccess;
  }
  function setIndexLastDistanceAccess(i) {
    this.indexLastDistanceAccess = i;
  }
  function getPlotsBeforeStartTime() {
    return this.plotsBeforeStartTime;
  }
  function setPlotsBeforeStartTime(i) {
    this.plotsBeforeStartTime = i;
  }
  function incPlotsBeforeStartTime() {
    this.plotsBeforeStartTime++;
  }
  function getClosestApproachDistance() {
    return this.closestApproachDistance;
  }
  function setClosestApproachDistance(d) {
    this.closestApproachDistance = d;
  }
  function getClosestApproachAngle() {
    return this.closestApproachAngle;
  }
  function setClosestApproachAngle(a) {
    this.closestApproachAngle = a;
  }
  function getClosestApproachHeading() {
    return this.closestApproachHeading;
  }
  function setClosestApproachHeading(h) {
    this.closestApproachHeading = h;
  }
  function getClosestApproachTime() {
    return this.closestApproachTime;
  }
  function setClosestApproachTime(t) {
    this.closestApproachTime = t;
  }
  function calculateClosestApproach(homePos, homeHght) {
    // Zunaechst bisherige Werte loeschen:
    this.closestApproachDistance = -1;
    this.closestApproachAngle = -1;
    this.closestApproachHeading = -1;
    this.closestApproachTime = -1;
    // Neuberechnung: suche den Plot mit der kuerzesten Distanz zur homePos und halte fuer diese alle notwendigen Infos fest!
    var curHeight, curTrackPosition, horizDistance, diagDistance, curPlotTime;
    var caDistance = -1;
    var caAngle = -1;
    var caHeading = -1;
    var caTime = -1;
    var plots = this.getTrackData().getPlots();
    if (!plots) return;
    var l = plots.length;
    for (var x = 0; x < l; x++) {
      curHeight = plots[x].getFlightLevel() * 0.30479 - homeHght;
      // Wir brauchen die Hoehe �ber dem Grund an der Home-Position, nicht ueber NN!
      if (curHeight > 200000) continue;
      if (curHeight > 100000 || curHeight < -999) curHeight = 0;
      curTrackPosition = new google.maps.LatLng(plots[x].getLatitude(), plots[x].getLongitude());
      horizDistance = google.maps.geometry.spherical.computeDistanceBetween(
        homePos,
        curTrackPosition,
      );
      diagDistance = Math.sqrt(horizDistance * horizDistance + curHeight * curHeight);
      curPlotTime = plots[x].getTimeValue();
      if (diagDistance < caDistance || caDistance < 0) {
        caDistance = diagDistance;
        caAngle = Math.atan(curHeight / horizDistance) * (45 / Math.atan(1));
        caHeading = google.maps.geometry.spherical.computeHeading(homePos, curTrackPosition);
        if (caHeading < 0) caHeading += 360;
        caTime = curPlotTime;
      }
      // Die Punkte zwischen den Plots m�ssen interpoliert werden, damit wirklich der geringste Abstand gefunden wird.
      // Schlie�lich werden die Werte sp�ter auch interpoliert - f�r jede Sekunde ein Wert .....
      if (x < l - 1) {
        var nextPlotTime = plots[x + 1].getTimeValue();
        var plotTimeDiff = nextPlotTime - curPlotTime;
        for (var y = curPlotTime + 1; y < nextPlotTime; y++) {
          var factorCurrent = (y - curPlotTime) / plotTimeDiff;
          var factorNext = (nextPlotTime - y) / plotTimeDiff;
          curHeight =
            (plots[x].getFlightLevel() * factorCurrent +
              plots[x + 1].getFlightLevel() * factorNext) *
              0.30479 -
            homeHght;
          if (curHeight > 200000) continue;
          if (curHeight > 100000 || curHeight < -999) curHeight = 0;
          curTrackPosition = new google.maps.LatLng(
            plots[x].getLatitude() * factorCurrent + plots[x + 1].getLatitude() * factorNext,
            plots[x].getLongitude() * factorCurrent + plots[x + 1].getLongitude() * factorNext,
          );
          horizDistance = google.maps.geometry.spherical.computeDistanceBetween(
            homePos,
            curTrackPosition,
          );
          diagDistance = Math.round(
            Math.sqrt(horizDistance * horizDistance + curHeight * curHeight),
          );
          if (diagDistance < caDistance || caDistance < 0) {
            caDistance = diagDistance;
            caAngle = Math.atan(curHeight / horizDistance) * (45 / Math.atan(1));
            caHeading = google.maps.geometry.spherical.computeHeading(homePos, curTrackPosition);
            if (caHeading < 0) caHeading += 360;
            caTime = y;
          }
          factorCurrent = null;
          factorNext = null;
        }
        y = null;
        nextPlotTime = null;
        plotTimeDiff = null;
      }
    }
    if (caDistance >= 0) {
      this.closestApproachDistance = caDistance;
      this.closestApproachAngle = caAngle;
      this.closestApproachHeading = caHeading;
      this.closestApproachTime = caTime;
    }
    curHeight = null;
    curTrackPosition = null;
    horizDistance = null;
    diagDistance = null;
    caDistance = null;
    caAngle = null;
    caHeading = null;
    plots = null;
    l = null;
    curTime = null;
    x = null;
  }
  function getMouseOver() {
    return this.mouseOver;
  }
  function setMouseOver(b) {
    this.mouseOver = b;
  }
  function getFlagString(currentPlot, forceFullText) {
    var trackData = this.trackData;
    if (trackData == null) return '';
    var flagText = "<span style='line-height:18px; font-size:9pt; vertical-align:top;'><b>";
    // Flugnummer dicker
    if (trackData.getFlightNo() != '') flagText += trackData.getFlightNo();
    else flagText += trackData.getCallsign();
    flagText += '</b></span>';
    if (!bigFlags && !forceFullText && !this.selectedState) {
      // Wenn nur die Kurzflags angezeigt werden, dann sind wir hier schon fertig
      return flagText;
    }
    flagText += '<br />';
    var flightLevel = Math.round(currentPlot.getFlightLevel());
    if (flightLevel < 100000 && flightLevel > -999) {
      flagText += flightLevel;
      if (flightLevel != '') {
        flagText += ' ft (';
        var flightLevelMeter = Math.round(flightLevel * 0.030479) * 10;
        flagText += flightLevelMeter + ' m)';
        flightLevelMeter = null;
      }
      flagText += '<br />';
    }
    flightLevel = null;
    var speed = currentPlot.getSpeed();
    flagText += Math.round(speed);
    if (speed != '') {
      flagText += ' KN';
      flagText += ' (';
      var speedKmH = Math.round(speed * 1.852);
      flagText += speedKmH + ' km/h)';
      speedKmH = null;
    }
    speed = null;
    flagText += '<br />' + trackData.getAirportName();
    trackData = null;
    return flagText;
  }
}
// Klasse NMTLevel
function NMTLevel() {
  // Membervariablen initialisieren:
  this.time = 0;
  this.level = -1;
  // Reference members for the prototype so that they are created only once, saving memory
  if (typeof _nmtlevel_prototype_called == 'undefined') {
    _nmtlevel_prototype_called = true;
    NMTLevel.prototype.getTime = getTime;
    NMTLevel.prototype.setTime = setTime;
    NMTLevel.prototype.getLevel = getLevel;
    NMTLevel.prototype.setLevel = setLevel;
  }
  // NMTLevel Zugriffsmethoden:
  function getTime() {
    return this.time;
  }
  function setTime(t) {
    this.time = t;
  }
  function getLevel() {
    return this.level;
  }
  function setLevel(l) {
    this.level = l;
  }
}
// Klasse NoiseEvent
function NoiseEvent() {
  // Membervariablen initialisieren:
  this.tstart = 0;
  this.tstop = 0;
  this.tlasmax = 0;
  this.lasmax = -1;
  this.actype = '';
  // Reference members for the prototype so that they are created only once, saving memory
  if (typeof _noiseevent_prototype_called == 'undefined') {
    _noiseevent_prototype_called = true;
    NoiseEvent.prototype.getTStart = getTStart;
    NoiseEvent.prototype.setTStart = setTStart;
    NoiseEvent.prototype.getTStop = getTStop;
    NoiseEvent.prototype.setTStop = setTStop;
    NoiseEvent.prototype.getTLasMax = getTLasMax;
    NoiseEvent.prototype.setTLasMax = setTLasMax;
    NoiseEvent.prototype.getLasMax = getLasMax;
    NoiseEvent.prototype.setLasMax = setLasMax;
    NoiseEvent.prototype.getACType = getACType;
    NoiseEvent.prototype.setACType = setACType;
  }
  // NoiseEvent Zugriffsmethoden:
  function getTStart() {
    return this.tstart;
  }
  function setTStart(t) {
    this.tstart = t;
  }
  function getTStop() {
    return this.tstop;
  }
  function setTStop(t) {
    this.tstop = t;
  }
  function getTLasMax() {
    return this.tlasmax;
  }
  function setTLasMax(t) {
    this.tlasmax = t;
  }
  function getLasMax() {
    return this.lasmax;
  }
  function setLasMax(l) {
    this.lasmax = l;
  }
  function getACType() {
    return this.actype;
  }
  function setACType(a) {
    this.actype = a;
  }
}
// Klasse Downtime
function Downtime() {
  // Membervariablen initialisieren:
  this.tbegin = 0;
  this.tend = 0;
  // Reference members for the prototype so that they are created only once, saving memory
  if (typeof _downtime_prototype_called == 'undefined') {
    _downtime_prototype_called = true;
    Downtime.prototype.getTBegin = getTBegin;
    Downtime.prototype.setTBegin = setTBegin;
    Downtime.prototype.getTEnd = getTEnd;
    Downtime.prototype.setTEnd = setTEnd;
  }
  // Downtime Zugriffsmethoden:
  function getTBegin() {
    return this.tbegin;
  }
  function setTBegin(t) {
    this.tbegin = t;
  }
  function getTEnd() {
    return this.tend;
  }
  function setTEnd(t) {
    this.tend = t;
  }
}
// Klasse NMT
function NMT() {
  // Membervariablen initialisieren:
  this.nmtId = 0;
  this.latitude = -1;
  this.longitude = -1;
  this.nmtName = '';
  this.shortcut = '';
  this.height = -1;
  this.callDate = '';
  this.startTime = '';
  this.tries = -1;
  this.statusNoise = -1;
  this.numberNoiseEvents = -1;
  this.nmtStatus = -1;
  this.active = -1;
  this.levelStart = -1;
  this.levelStartNight = -1;
  this.firstLevelTime = 0;
  this.levels = new Array();
  this.selectedState = false;
  this.iconRect = null;
  this.noiseEvents = new Array();
  this.downtimes = new Array();
  this.currentLevel = 0;
  this.indexLastUsedLevel = 0;
  this.flagRect = null;
  this.mouseOver = false;
  // Reference members for the prototype so that they are created only once, saving memory
  if (typeof _nmt_prototype_called == 'undefined') {
    _nmt_prototype_called = true;
    NMT.prototype.getNmtId = getNmtId;
    NMT.prototype.setNmtId = setNmtId;
    NMT.prototype.getLatitude = getLatitude;
    NMT.prototype.setLatitude = setLatitude;
    NMT.prototype.getLongitude = getLongitude;
    NMT.prototype.setLongitude = setLongitude;
    NMT.prototype.getNmtName = getNmtName;
    NMT.prototype.setNmtName = setNmtName;
    NMT.prototype.getShortcut = getShortcut;
    NMT.prototype.setShortcut = setShortcut;
    NMT.prototype.getHeight = getHeight;
    NMT.prototype.setHeight = setHeight;
    NMT.prototype.getCallDate = getCallDate;
    NMT.prototype.setCallDate = setCallDate;
    NMT.prototype.getStartTime = getStartTime;
    NMT.prototype.setStartTime = setStartTime;
    NMT.prototype.getTries = getTries;
    NMT.prototype.setTries = setTries;
    NMT.prototype.getStatusNoise = getStatusNoise;
    NMT.prototype.setStatusNoise = setStatusNoise;
    NMT.prototype.getNumberNoiseEvents = getNumberNoiseEvents;
    NMT.prototype.setNumberNoiseEvents = setNumberNoiseEvents;
    NMT.prototype.getNmtStatus = getNmtStatus;
    NMT.prototype.setNmtStatus = setNmtStatus;
    NMT.prototype.getActive = getActive;
    NMT.prototype.setActive = setActive;
    NMT.prototype.getLevelStart = getLevelStart;
    NMT.prototype.setLevelStart = setLevelStart;
    NMT.prototype.getLevelStartNight = getLevelStartNight;
    NMT.prototype.setLevelStartNight = setLevelStartNight;
    NMT.prototype.getStartLevelForTime = getStartLevelForTime;
    NMT.prototype.getFirstLevelTime = getFirstLevelTime;
    NMT.prototype.setFirstLevelTime = setFirstLevelTime;
    NMT.prototype.getLevels = getLevels;
    NMT.prototype.addLevel = addLevel;
    NMT.prototype.clearLevels = clearLevels;
    NMT.prototype.isSelected = isSelected;
    NMT.prototype.setSelected = setSelected;
    NMT.prototype.setIconRect = setIconRect;
    NMT.prototype.getIconRect = getIconRect;
    NMT.prototype.getNoiseEvents = getNoiseEvents;
    NMT.prototype.addNoiseEvent = addNoiseEvent;
    NMT.prototype.clearNoiseEvents = clearNoiseEvents;
    NMT.prototype.getNoiseEvent = getNoiseEvent;
    NMT.prototype.getDowntimes = getDowntimes;
    NMT.prototype.addDowntime = addDowntime;
    NMT.prototype.clearDowntimes = clearDowntimes;
    NMT.prototype.getDowntime = getDowntime;
    NMT.prototype.getTimeLastLevel = getTimeLastLevel;
    NMT.prototype.getCurrentLevel = getCurrentLevel;
    NMT.prototype.setCurrentLevel = setCurrentLevel;
    NMT.prototype.getIndexLastUsedLevel = getIndexLastUsedLevel;
    NMT.prototype.setIndexLastUsedLevel = setIndexLastUsedLevel;
    NMT.prototype.decrementIndexLastUsedLevel = decrementIndexLastUsedLevel;
    NMT.prototype.getNMTState = getNMTState;
    NMT.prototype.getNMTStateWithLevel = getNMTStateWithLevel;
    NMT.prototype.getCurrentLevelForNMT = getCurrentLevelForNMT;
    NMT.prototype.getCurrentLevelForNMTComplete = getCurrentLevelForNMTComplete;
    NMT.prototype.getFlagRect = getFlagRect;
    NMT.prototype.setFlagRect = setFlagRect;
    NMT.prototype.setMouseOver = setMouseOver;
    NMT.prototype.getMouseOver = getMouseOver;
    NMT.prototype.getFlagString = getFlagString;
  }
  // NMT Zugriffsmethoden:
  function getNmtId() {
    return this.nmtId;
  }
  function setNmtId(nmtId) {
    this.nmtId = nmtId;
  }
  function getLatitude() {
    return this.latitude;
  }
  function setLatitude(latitude) {
    this.latitude = latitude;
  }
  function getLongitude() {
    return this.longitude;
  }
  function setLongitude(longitude) {
    this.longitude = longitude;
  }
  function getNmtName() {
    return this.nmtName;
  }
  function setNmtName(nmtName) {
    this.nmtName = nmtName;
  }
  function getShortcut() {
    return this.shortcut;
  }
  function setShortcut(shortcut) {
    this.shortcut = shortcut;
  }
  function getHeight() {
    return this.height;
  }
  function setHeight(height) {
    this.height = height;
  }
  function getCallDate() {
    return this.callDate;
  }
  function setCallDate(callDate) {
    this.callDate = callDate;
  }
  function getStartTime() {
    return this.startTime;
  }
  function setStartTime(startTime) {
    this.startTime = startTime;
  }
  function getTries() {
    return this.tries;
  }
  function setTries(tries) {
    this.tries = tries;
  }
  function getStatusNoise() {
    return this.statusNoise;
  }
  function setStatusNoise(statusNoise) {
    this.statusNoise = statusNoise;
  }
  function getNumberNoiseEvents() {
    return this.numberNoiseEvents;
  }
  function setNumberNoiseEvents(numberNoiseEvents) {
    this.numberNoiseEvents = numberNoiseEvents;
  }
  function getNmtStatus() {
    return this.nmtStatus;
  }
  function setNmtStatus(nmtStatus) {
    this.nmtStatus = nmtStatus;
  }
  function getActive() {
    return this.active;
  }
  function setActive(active) {
    this.active = active;
  }
  function getLevelStart() {
    return this.levelStart;
  }
  function setLevelStart(levelStart) {
    this.levelStart = levelStart;
  }
  function getLevelStartNight() {
    return this.levelStartNight;
  }
  function setLevelStartNight(levelStartNight) {
    this.levelStartNight = levelStartNight;
  }
  function getStartLevelForTime(time) {
    var d = new Date(time * 1000);
    if (d.getHours() >= 6 && d.getHours() < 22) {
      d = null;
      return this.levelStart;
    } else {
      d = null;
      return this.levelStartNight;
    }
  }
  function getFirstLevelTime() {
    return this.firstLevelTime;
  }
  function setFirstLevelTime(firstLevelTime) {
    this.firstLevelTime = firstLevelTime;
  }
  function getLevels() {
    return this.levels;
  }
  function addLevel(newLevel) {
    this.levels.push(newLevel);
  }
  function clearLevels() {
    var l = this.levels.length;
    for (var x = 0; x < l; x++) {
      this.levels[0] = null;
      this.levels.shift();
    }
    x = null;
    l = null;
  }
  function isSelected() {
    return this.selectedState;
  }
  function setSelected(sel) {
    this.selectedState = sel;
    if (this.iconRect) this.iconRect.setSelectedItem(sel);
  }
  function getIconRect() {
    return this.iconRect;
  }
  function setIconRect(iconRect) {
    this.iconRect = iconRect;
  }
  function getNoiseEvents() {
    return this.noiseEvents;
  }
  function addNoiseEvent(newNE) {
    this.noiseEvents.push(newNE);
  }
  function clearNoiseEvents() {
    var l = this.noiseEvents.length;
    for (var x = 0; x < l; x++) {
      this.noiseEvents[0] = null;
      this.noiseEvents.shift();
    }
    x = null;
    l = null;
  }
  function getNoiseEvent(t) {
    var l = this.noiseEvents.length;
    for (var x = 0; x < l; x++) {
      if (this.noiseEvents[x].getTStart() <= t && this.noiseEvents[x].getTStop() >= t)
        return this.noiseEvents[x];
    }
    l = null;
    return null; // Nix gefunden
  }
  function getDowntimes() {
    return this.downtimes;
  }
  function addDowntime(newDT) {
    this.downtimes.push(newDT);
  }
  function clearDowntimes() {
    var l = this.downtimes.length;
    for (var x = 0; x < l; x++) {
      this.downtimes[0] = null;
      this.downtimes.shift();
    }
    x = null;
    l = null;
  }
  function getDowntime(t) {
    var l = this.downtimes.length;
    for (var x = 0; x < l; x++) {
      if (this.downtimes[x].getTBegin() <= t && this.downtimes[x].getTEnd() >= t)
        return this.downtimes[x];
    }
    l = null;
    return null; // Nix gefunden
  }
  function getTimeLastLevel() {
    if (this.levels.length > 0) return this.levels[this.levels.length - 1].getTime();
    else return -1;
  }
  function getCurrentLevel() {
    return this.currentLevel;
  }
  function setCurrentLevel(l) {
    this.currentLevel = l;
  }
  function getIndexLastUsedLevel() {
    return this.indexLastUsedLevel;
  }
  function setIndexLastUsedLevel(i) {
    this.indexLastUsedLevel = i;
  }
  function decrementIndexLastUsedLevel() {
    if (this.indexLastUsedLevel > 0) this.indexLastUsedLevel--;
  }
  function getFlagRect() {
    return this.flagRect;
  }
  function setFlagRect(flagRect) {
    this.flagRect = flagRect;
  }
  function getMouseOver() {
    return this.mouseOver;
  }
  function setMouseOver(b) {
    this.mouseOver = b;
  }
  function getNMTState(sysTime) {
    var state = NMTState.Unknown;
    var level = this.getCurrentLevelForNMT(sysTime);
    if (level > 20) {
      if (this.getDowntime(sysTime) != null) state = NMTState.Downtime;
      else if (this.getNoiseEvent(sysTime) != null) state = NMTState.NoiseEvent;
      else if (level < this.getStartLevelForTime(utcToAirportTimePlusLocal(sysTime)))
        state = NMTState.BelowThreshold;
      else if (level < 90) state = NMTState.AboveThreshold;
      else state = NMTState.Error;
    }
    level = null;
    return state;
  }
  function getNMTStateWithLevel(sysTime, level) {
    var state = NMTState.Unknown;
    if (level > 20) {
      if (this.getDowntime(sysTime) != null) state = NMTState.Downtime;
      else if (this.getNoiseEvent(sysTime) != null) state = NMTState.NoiseEvent;
      else if (level < this.getStartLevelForTime(utcToAirportTimePlusLocal(sysTime)))
        state = NMTState.BelowThreshold;
      else if (level < 90) state = NMTState.AboveThreshold;
      else state = NMTState.Error;
    }
    return state;
  }
  function getCurrentLevelForNMT(currentTime) {
    var curLevel = 0;
    var levels = this.getLevels();
    var i;
    var roundedCurTime = Math.round(currentTime);
    for (i = this.getIndexLastUsedLevel(); i < levels.length; i++) {
      if (levels[i] != null && Math.round(levels[i].getTime()) == roundedCurTime) {
        this.setIndexLastUsedLevel(i);
        // Merken, damit wir spaeter genau da mit der Suche beginnen koennen!
        curLevel = levels[i].getLevel();
        break;
      }
    }
    levels = null;
    roundedCurTime = null;
    i = null;
    return curLevel;
  }
  function getCurrentLevelForNMTComplete(currentTime) {
    var curLevel = 0;
    var levels = this.getLevels();
    var i;
    var roundedCurTime = Math.round(currentTime);
    var startIndex = 0;
    if (this.getIndexLastUsedLevel() >= 5) startIndex = this.getIndexLastUsedLevel() - 5;
    for (i = startIndex; i < levels.length; i++) {
      if (levels[i] != null && Math.round(levels[i].getTime()) == roundedCurTime) {
        curLevel = levels[i].getLevel();
        break;
      }
    }
    if (curLevel < 0.000001) {
      // Nix gefunden? Dann nochmal am Anfang beginnen!
      for (i = 0; i <= startIndex; i++) {
        if (levels[i] != null && Math.round(levels[i].getTime()) == roundedCurTime) {
          curLevel = levels[i].getLevel();
          break;
        }
      }
    }
    levels = null;
    roundedCurTime = null;
    startIndex = null;
    i = null;
    return curLevel;
  }
  function getFlagString(currentLevel, currentDT, currentNE, sysTime) {
    var flagText = '<b>';
    flagText += 'NMT' + ' ' + this.getNmtId();
    flagText += '<br />' + replaceUmlaute(this.getNmtName()) + '</b><br />';
    // Status
    if (currentDT) flagText += 'Downtime';
    else if (currentLevel > 20) flagText += 'Running';
    else flagText += 'No data';
    return flagText;
  }
}
// Die m�glichen Gr��en des FlagRectangles:
FlagRectType = {
  FlightBig: 0,
  FlightSmall: 1,
  NMTNormal: 2,
};
function FlagRectangle(type, point, ftext, sel) {
  google.maps.OverlayView.call(this);
  this.type_ = type;
  this.point_ = point;
  this.flagtext_ = ftext;
  this.selected_ = sel;
  this.div_ = null;
  this.prj_ = null;
  this.posDirty_ = true;
  this.setMap(map);
  this.jqID_ = null;
  this.jqTextAreaID_ = null;
  this.zIndex_ = 11;
  this.chartObject_ = null;
}
FlagRectangle.prototype = new google.maps.OverlayView();
// Quasi Destruktor und Copy-Konstruktor:
FlagRectangle.prototype.onRemove = function() {
  google.maps.event.clearInstanceListeners(this.div_);
  if (this.chartObject_) this.chartObject_.onRemove();
  if (this.div_ && this.div_.parentNode) this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
FlagRectangle.prototype.copy = function() {
  return new FlagRectangle(this.point_, this.flagtext_);
};
FlagRectangle.prototype.setPosition = function(point) {
  this.point_ = point;
};
FlagRectangle.prototype.getPosition = function() {
  return this.point_;
};
FlagRectangle.prototype.setFlagText = function(ftext) {
  this.flagtext_ = ftext;
};
FlagRectangle.prototype.setPosDirty = function(b) {
  this.posDirty_ = b;
};
FlagRectangle.prototype.setZIndex = function(z) {
  this.zIndex_ = z;
};
FlagRectangle.prototype.setSelected = function(s) {
  if (!this.div_) return;
  if (this.selected_ == s && this.prj_ != null) return;
  this.selected_ = s;
  if (s) {
    this.div_.style.color = 'white';
    this.div_.style.backgroundColor = 'cornflowerblue';
    this.div_.style.border = '1px solid white';
    this.div_.style.zIndex = this.zIndex_ + 1;
  } else {
    this.div_.style.color = '#333333';
    this.div_.style.backgroundColor = '#EEEEEE';
    this.div_.style.border = '1px solid cornflowerblue';
    this.div_.style.zIndex = this.zIndex_;
  }
};
FlagRectangle.prototype.setDrawParams = function(b, p, t, s) {
  this.setType(b);
  this.point_ = p;
  this.flagtext_ = t;
  this.setSelected(s);
};
FlagRectangle.prototype.setType = function(s) {
  if (!this.div_) return;
  if (s != this.type_ || this.prj_ == null) {
    this.type_ = s;
    if (s == FlagRectType.FlightBig) {
      this.div_.style.width = '110px';
      this.div_.style.height = '71px';
      this.div_.style.textAlign = 'left';
    } else if (s == FlagRectType.FlightSmall) {
      this.div_.style.width = '55px';
      this.div_.style.height = '15px';
      this.div_.style.textAlign = 'center';
    } else if (s == FlagRectType.NMTNormal) {
      this.div_.style.width = '150px';
      this.div_.style.height = '101px';
      this.div_.style.textAlign = 'left';
    }
  }
};
FlagRectangle.prototype.slideUp = function(f) {
  if (!this.div_) return;
  $(this.jqID_).slideUp('slow', f);
};
FlagRectangle.prototype.slideDown = function() {
  if (!this.div_) return;
  $(this.jqID_).slideDown('slow');
};
FlagRectangle.prototype.stop = function(clearQueue, jumpToEnd) {
  if (!this.div_) return;
  $(this.jqID_).stop(clearQueue, jumpToEnd);
};
FlagRectangle.prototype.clearQueue = function() {
  if (!this.div_) return;
  $(this.jqID_).clearQueue();
};
FlagRectangle.prototype.redrawChart = function() {
  if (this.chartObject_) this.chartObject_.redraw();
};
// Redraw the rectangle based on the current projection and zoom level
FlagRectangle.prototype.draw = function() {
  var me = this;
  var div = this.div_;
  if (!div) {
    div = this.div_ = document.createElement('DIV');
    div.id = 'FlagRectangle' + itemCounter++;
    div.style.display = 'none';
    div.style.border = '1px solid black';
    div.style.backgroundColor = '#EEEEEE';
    div.style.MozBorderRadius = '3px';
    div.style.borderRadius = '3px';
    div.style.KhtmlBorderRadius = '3px';
    div.style.position = 'absolute';
    div.style.overflow = 'hidden';
    if (this.type_ == FlagRectType.NMTNormal) {
      div.style.lineHeight = '11px';
      div.style.padding = '0px';
    } else {
      div.style.lineHeight = '11px';
      // Bei den Flugzeug-Flags immer gerade Zahlen waehlen - ansonsten huepft der Text auf und ab!
      div.style.padding = '3px';
    }
    div.style.zIndex = this.zIndex_;
    div.style.opacity = '0.9';
    div.style.MozOpacity = '0.9';
    div.style.filter = 'alpha(opacity=90)';
    div.style.fontFamily = 'Helvetica, Verdana, Tahoma, Arial, Sans-serif';
    div.style.fontSize = '8pt';
    div.style.verticalAlign = 'top';
    div.style.boxShadow = '0px 3px 8px 0px rgba(0, 0, 0, 0.6)';
    div.style.color = '#333333';
    div.style.cursor = 'pointer';
    this.jqID_ = '#' + div.id;
    this.jqTextAreaID_ = '#' + div.id;
    this.setType(this.type_);
    this.setSelected(this.selected_);
    google.maps.event.addDomListener(div, 'click', function(event) {
      google.maps.event.trigger(me, 'click');
    });
    // Then add the overlay to the DOM
    var panes = this.getPanes();
    if (panes) panes.overlayImage.appendChild(div);
    panes = null;
    this.prj_ = this.getProjection();
    if (this.type_ == FlagRectType.NMTNormal) {
      var textArea = document.createElement('DIV');
      textArea.id = 'TextArea' + itemCounter++;
      textArea.style.width = '150px';
      textArea.style.height = '45px';
      textArea.style.float = 'left';
      textArea.style.position = 'relative';
      textArea.style.paddingLeft = '3px';
      textArea.style.paddingRight = '3px';
      textArea.style.paddingTop = '3px';
      div.appendChild(textArea);
      this.jqTextAreaID_ = '#' + textArea.id;
      textArea = null;
      var flagChart = document.createElement('DIV');
      flagChart.id = 'FlagChart' + itemCounter++;
      flagChart.style.width = '150px';
      flagChart.style.height = '65px';
      flagChart.style.float = 'left';
      flagChart.style.position = 'relative';
      flagChart.style.backgroundColor = 'white';
      flagChart.style.paddingTop = '3px';
      div.appendChild(flagChart);
      this.chartObject_ = new ChartControl(flagChart.id, '', '', chartOptionsNMTFlag);
      flagChart = null;
    }
    $(this.jqID_).slideDown('slow');
  }
  if (this.prj_) {
    var c = this.prj_.fromLatLngToDivPixel(this.point_);
    if (c != null) {
      div.style.left = Math.round(c.x + 8) + 'px';
      div.style.top = Math.round(c.y + 5) + 'px';
      c = null;
    }
    $(this.jqTextAreaID_).html(this.flagtext_);
    if (this.chartObject_) {
      this.chartObject_.update(globalSystemTime, nmtUnderCursor, null, true);
    }
  }
  div = null;
};
// ------------------------------------------
function AirplaneIcon(point, url, heading, size) {
  google.maps.OverlayView.call(this);
  this.point_ = point;
  this.url_ = url;
  this.size_ = size;
  this.halfsize_ = Math.round(size / 2);
  this.prj_ = null;
  this.selected_ = null;
  this.setMap(map);
  this.img_ = null;
  this.heading_ = Math.round(heading);
  // immer nur ganzzahlig!
  this.lastHeading_ = -1;
  this.jqID_ = null;
}
AirplaneIcon.prototype = new google.maps.OverlayView();
// Quasi Destruktor und Copy-Konstruktor:
AirplaneIcon.prototype.onRemove = function() {
  if (this.img_ && this.img_.parentNode) this.img_.parentNode.removeChild(this.img_);
  this.img_ = null;
  this.jqID_.remove();
  this.point_ = null;
  this.url_ = null;
  this.size_ = null;
  this.halfsize_ = null;
  this.prj_ = null;
  this.selected_ = null;
  this.setMap(null);
  this.heading_ = null;
  this.lastHeading_ = null;
  this.opacity_ = 1;
};
AirplaneIcon.prototype.copy = function() {
  return new AirplaneIcon(this.point_, this.url_, this.size_);
};
AirplaneIcon.prototype.setPosition = function(point) {
  this.point_ = point;
};
AirplaneIcon.prototype.getPosition = function() {
  return this.point_;
};
AirplaneIcon.prototype.setUrl = function(url) {
  this.url_ = url;
};
AirplaneIcon.prototype.getUrl = function() {
  return this.url_;
};
AirplaneIcon.prototype.setHeading = function(h) {
  this.heading_ = Math.round(h);
};
AirplaneIcon.prototype.getHeading = function() {
  return this.heading_;
};
AirplaneIcon.prototype.setOpacity = function(o) {
  this.opacity_ = o;
};
AirplaneIcon.prototype.getOpacity = function() {
  return this.opacity_;
};
AirplaneIcon.prototype.getSize = function() {
  return this.size_;
};
AirplaneIcon.prototype.setDrawParams = function(point, heading) {
  this.point_ = point;
  this.heading_ = Math.round(heading);
};
AirplaneIcon.prototype.setSelected = function(s) {
  if (!this.img_) return;
  if (this.selected_ == s) return;
  this.selected_ = s;
  if (s) {
    var indexPunkt = this.url_.lastIndexOf('.png');
    if (indexPunkt >= 0) this.url_ = this.url_.slice(0, indexPunkt) + '-selected.png';
    indexPunkt = null;
    this.img_.style.zIndex = '5';
  } else {
    var indexSel = this.url_.lastIndexOf('-selected');
    if (indexSel >= 0) this.url_ = this.url_.slice(0, indexSel) + '.png';
    indexSel = null;
    this.img_.style.zIndex = '4';
  }
  if (this.img_.src != this.url_) {
    this.img_.src = this.url_;
    this.jqID_ = $('#' + this.img_.id);
    this.jqID_.rotate(this.heading_);
  }
};
AirplaneIcon.prototype.createIcon = function() {
  var me = this;
  this.img_ = document.createElement('IMG');
  this.img_.id = 'IMG_' + itemCounter++;
  this.img_.style.position = 'absolute';
  this.img_.style.zIndex = '4';
  this.img_.style.cursor = 'pointer';
  this.img_.style.width = this.size_ + 'px';
  this.img_.style.height = this.size_ + 'px';
  this.img_.src = this.url_;
  google.maps.event.addDomListener(this.img_, 'click', function(event) {
    google.maps.event.trigger(me, 'click');
  });
  google.maps.event.addDomListener(this.img_, 'mouseover', function(event) {
    google.maps.event.trigger(me, 'mouseover');
  });
  google.maps.event.addDomListener(this.img_, 'mouseout', function(event) {
    google.maps.event.trigger(me, 'mouseout');
  });
  // Then add the overlay to the DOM
  var panes = this.getPanes();
  if (panes) panes.overlayImage.appendChild(this.img_);
  panes = null;
  this.prj_ = this.getProjection();
};
// Redraw the rectangle based on the current projection and zoom level
AirplaneIcon.prototype.draw = function() {
  if (!this.img_) this.createIcon();
  if (this.prj_) {
    var c = this.prj_.fromLatLngToDivPixel(this.point_);
    if (c != null) {
      this.jqID_ = $('#' + this.img_.id);
      // Flugzeug-Symbol in die richtige Richtung drehen
      // Da das rotate (vor allem im IE!) teuer ist, drehen wir nur bei Heading-�nderungen um mehr als 5 Grad!
      if (this.lastHeading_ < 0 || Math.abs(this.lastHeading_ - this.heading_) > 5) {
        this.lastHeading_ = this.heading_;
        this.jqID_.rotate(this.heading_);
      }
      this.jqID_.setPosition(
        Math.round(c.y - this.halfsize_),
        Math.round(c.x - this.halfsize_),
        this.opacity_,
      );
      c = null;
    }
  }
};
// ------------------------------------------
function NMTRectangle(point, icon, text, selItem) {
  google.maps.OverlayView.call(this);
  this.point_ = point;
  this.icon_ = icon;
  this.lastIcon_ = '';
  this.higherPrio_ = false;
  this.text_ = text;
  this.selItem_ = selItem;
  this.div_ = null;
  this.prj_ = null;
  this.posDirty_ = true;
  this.jqID_ = null;
  this.setMap(map);
}
NMTRectangle.prototype = new google.maps.OverlayView();
// Quasi Destruktor und Copy-Konstruktor:
NMTRectangle.prototype.onRemove = function() {
  if (this.div_ && this.div_.parentNode) this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
NMTRectangle.prototype.copy = function() {
  return new NMTRectangle(this.point_, this.icon_, this.text_, this.selItem_);
};
NMTRectangle.prototype.setPosition = function(point) {
  this.point_ = point;
};
NMTRectangle.prototype.setIcon = function(icon) {
  this.icon_ = icon;
};
NMTRectangle.prototype.setText = function(text) {
  this.text_ = text;
};
NMTRectangle.prototype.setPosDirty = function(b) {
  this.posDirty_ = b;
};
NMTRectangle.prototype.setHigherPrio = function(b) {
  this.higherPrio_ = b;
};
NMTRectangle.prototype.setSelectedItem = function(selItem) {
  if (this.selItem_ == selItem) return;
  this.selItem_ = selItem;
  if (this.div_) {
    if (selItem) {
      this.div_.style.color = '#333333';
      var indexPunkt = this.icon_.lastIndexOf('.png');
      if (indexPunkt >= 0) this.icon_ = this.icon_.slice(0, indexPunkt) + 'Selected.png';
      indexPunkt = null;
    } else {
      this.div_.style.color = '#333333';
      var indexSel = this.icon_.lastIndexOf('Selected');
      if (indexSel >= 0) this.icon_ = this.icon_.slice(0, indexSel) + '.png';
      indexSel = null;
    }
    if (this.div_.style.backgroundImage != "url('" + this.icon_ + "')")
      this.div_.style.backgroundImage = "url('" + this.icon_ + "')";
  }
};
NMTRectangle.prototype.setDrawParams = function(icon, text, selItem) {
  this.icon_ = icon;
  this.text_ = text;
  this.selItem_ = selItem;
};
// Redraw the rectangle based on the current projection and zoom level
NMTRectangle.prototype.draw = function() {
  var me = this;
  var div = this.div_;
  if (!div) {
    // Create a overlay text DIV
    div = this.div_ = document.createElement('DIV');
    div.id = 'NMTRectangle' + itemCounter++;
    div.style.position = 'absolute';
    div.style.zIndex = '10';
    if (this.higherPrio_) div.style.zIndex = '11';
    if (ieVersion < 0 || ieVersion > 8) {
      // Fruehere IEs k�nnen leider transparente PNGs nicht weiter transparent machen
      div.style.opacity = '0.9';
      div.style.filter = 'alpha(opacity=90)';
    }
    div.style.fontFamily = 'Helvetica, Verdana, Tahoma, Arial, Sans-serif';
    div.style.fontSize = '8pt';
    div.style.textAlign = 'center';
    div.style.fontWeight = 'bold';
    div.style.paddingTop = '9px';
    div.style.cursor = 'pointer';
    div.style.color = '#333333';
    div.style.width = '32px';
    div.style.height = '23px';
    google.maps.event.addDomListener(div, 'click', function(event) {
      google.maps.event.trigger(me, 'click');
    });
    google.maps.event.addDomListener(div, 'mouseover', function(event) {
      google.maps.event.trigger(me, 'mouseover');
    });
    google.maps.event.addDomListener(div, 'mouseout', function(event) {
      google.maps.event.trigger(me, 'mouseout');
    });
    // Then add the overlay to the DOM
    var panes = this.getPanes();
    if (panes) panes.overlayImage.appendChild(div);
    panes = null;
    this.prj_ = this.getProjection();
    this.jqID_ = $('#' + div.id);
  }
  // Muessen wir sicherheitshalber machen, da es hier teilweise Fehler gab und die NMTs dann niemals angezeigt wurden.
  if (!this.prj_) this.prj_ = this.getProjection();
  if (this.prj_) {
    var c = this.prj_.fromLatLngToDivPixel(this.point_);
    if (c != null) {
      // Werte hier m�ssen mit obigen korrespondieren (genau die H�lfte der Breite!)
      this.jqID_.css({
        left: Math.round(c.x - 16) + 'px',
        top: Math.round(c.y - 16) + 'px',
      });
      c = null;
    }
    if (this.icon_ != this.lastIcon_) {
      this.lastIcon_ = this.icon_;
      this.jqID_.css('background-image', "url('" + this.icon_ + "')");
    }
    this.jqID_.html(this.text_);
  }
  div = null;
};
// Klasse RunwayData
function RunwayData() {
  // Membervariablen initialisieren:
  this.designator1_ = '';
  this.designator2_ = '';
  this.thr1lon_ = 0;
  this.thr1lat_ = 0;
  this.thr2lon_ = 0;
  this.thr2lat_ = 0;
  this.bearing1_ = 0;
  this.bearing2_ = 0;
  this.elevation1_ = 0;
  this.elevation2_ = 0;
  this.length_ = 0;
  this.width_ = 0;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _runwaydata_prototype_called == 'undefined') {
    _runwaydata_prototype_called = true;
    RunwayData.prototype.getDesignator1 = getDesignator1;
    RunwayData.prototype.setDesignator1 = setDesignator1;
    RunwayData.prototype.getDesignator2 = getDesignator2;
    RunwayData.prototype.setDesignator2 = setDesignator2;
    RunwayData.prototype.getThr1Lon = getThr1Lon;
    RunwayData.prototype.setThr1Lon = setThr1Lon;
    RunwayData.prototype.getThr1Lat = getThr1Lat;
    RunwayData.prototype.setThr1Lat = setThr1Lat;
    RunwayData.prototype.getThr2Lon = getThr2Lon;
    RunwayData.prototype.setThr2Lon = setThr2Lon;
    RunwayData.prototype.getThr2Lat = getThr2Lat;
    RunwayData.prototype.setThr2Lat = setThr2Lat;
    RunwayData.prototype.getBearing1 = getBearing1;
    RunwayData.prototype.setBearing1 = setBearing1;
    RunwayData.prototype.getBearing2 = getBearing2;
    RunwayData.prototype.setBearing2 = setBearing2;
    RunwayData.prototype.getElevation1 = getElevation1;
    RunwayData.prototype.setElevation1 = setElevation1;
    RunwayData.prototype.getElevation2 = getElevation2;
    RunwayData.prototype.setElevation2 = setElevation2;
    RunwayData.prototype.getLength = getLength;
    RunwayData.prototype.setLength = setLength;
    RunwayData.prototype.getWidth = getWidth;
    RunwayData.prototype.setWidth = setWidth;
  }
  // RunwayData Zugriffsmethoden:
  function getDesignator1() {
    return this.designator1_;
  }
  function setDesignator1(d) {
    this.designator1_ = d;
  }
  function getDesignator2() {
    return this.designator2_;
  }
  function setDesignator2(d) {
    this.designator2_ = d;
  }
  function getThr1Lon() {
    return this.thr1lon_;
  }
  function setThr1Lon(l) {
    this.thr1lon_ = l;
  }
  function getThr1Lat() {
    return this.thr1lat_;
  }
  function setThr1Lat(l) {
    this.thr1lat_ = l;
  }
  function getThr2Lon() {
    return this.thr2lon_;
  }
  function setThr2Lon(l) {
    this.thr2lon_ = l;
  }
  function getThr2Lat() {
    return this.thr2lat_;
  }
  function setThr2Lat(l) {
    this.thr2lat_ = l;
  }
  function getBearing1() {
    return this.bearing1_;
  }
  function setBearing1(b) {
    this.bearing1_ = b;
  }
  function getBearing2() {
    return this.bearing2_;
  }
  function setBearing2(b) {
    this.bearing2_ = b;
  }
  function getElevation1() {
    return this.elevation1_;
  }
  function setElevation1(e) {
    this.elevation1_ = e;
  }
  function getElevation2() {
    return this.elevation2_;
  }
  function setElevation2(e) {
    this.elevation2_ = e;
  }
  function getLength() {
    return this.length_;
  }
  function setLength(l) {
    this.length_ = l;
  }
  function getWidth() {
    return this.width_;
  }
  function setWidth(l) {
    this.width_ = l;
  }
}
// Klasse AirportData
function AirportData() {
  // Membervariablen initialisieren:
  this.name_ = '';
  this.company_ = '';
  this.icao_ = '';
  this.iata_ = '';
  this.lon_ = 0;
  this.lat_ = 0;
  this.height_ = 0;
  this.rwys_ = new Array();
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _airportdata_prototype_called == 'undefined') {
    _airportdata_prototype_called = true;
    AirportData.prototype.getName = getName;
    AirportData.prototype.setName = setName;
    AirportData.prototype.getCompany = getCompany;
    AirportData.prototype.setCompany = setCompany;
    AirportData.prototype.getIcao = getIcao;
    AirportData.prototype.setIcao = setIcao;
    AirportData.prototype.getIata = getIata;
    AirportData.prototype.setIata = setIata;
    AirportData.prototype.getLon = getLon;
    AirportData.prototype.setLon = setLon;
    AirportData.prototype.getLat = getLat;
    AirportData.prototype.setLat = setLat;
    AirportData.prototype.getHeight = getHeight;
    AirportData.prototype.setHeight = setHeight;
    AirportData.prototype.getRwys = getRwys;
    AirportData.prototype.addRwy = addRwy;
    AirportData.prototype.clearRwys = clearRwys;
    AirportData.prototype.getThrPosition = getThrPosition;
    AirportData.prototype.getOppositeThrPosition = getOppositeThrPosition;
  }
  // AirportData Zugriffsmethoden:
  function getName() {
    return this.name_;
  }
  function setName(n) {
    this.name_ = n;
  }
  function getCompany() {
    return this.company_;
  }
  function setCompany(c) {
    this.company_ = c;
  }
  function getIcao() {
    return this.icao_;
  }
  function setIcao(i) {
    this.icao_ = i;
  }
  function getIata() {
    return this.iata_;
  }
  function setIata(i) {
    this.iata_ = i;
  }
  function getLon() {
    return this.lon_;
  }
  function setLon(l) {
    this.lon_ = l;
  }
  function getLat() {
    return this.lat_;
  }
  function setLat(l) {
    this.lat_ = l;
  }
  function getHeight() {
    return this.height_;
  }
  function setHeight(h) {
    this.height_ = h;
  }
  function getRwys() {
    return this.rwys_;
  }
  function addRwy(newRwy) {
    this.rwys_.push(newRwy);
  }
  function clearRwys() {
    var l = this.rwys_.length;
    for (var x = 0; x < l; x++) {
      this.rwys_[0] = null;
      this.rwys_.shift();
    }
    x = null;
    l = null;
  }
  function getThrPosition(rwy) {
    // Wenn Runway nicht vorhanden, dann geben wir die ARP-Position zurueck
    var pos = arpPosition;
    var l = this.rwys_.length;
    for (var x = 0; x < l; x++) {
      if (this.rwys_[x].getDesignator1() == rwy) {
        pos = new google.maps.LatLng(this.rwys_[x].getThr1Lat(), this.rwys_[x].getThr1Lon());
        break;
      }
      if (this.rwys_[x].getDesignator2() == rwy) {
        pos = new google.maps.LatLng(this.rwys_[x].getThr2Lat(), this.rwys_[x].getThr2Lon());
        break;
      }
    }
    l = null;
    return pos;
  }
  function getOppositeThrPosition(rwy) {
    // Wenn Runway nicht vorhanden, dann geben wir die ARP-Position zurueck
    var pos = arpPosition;
    var l = this.rwys_.length;
    for (var x = 0; x < l; x++) {
      if (this.rwys_[x].getDesignator1() == rwy) {
        pos = new google.maps.LatLng(this.rwys_[x].getThr2Lat(), this.rwys_[x].getThr2Lon());
        break;
      }
      if (this.rwys_[x].getDesignator2() == rwy) {
        pos = new google.maps.LatLng(this.rwys_[x].getThr1Lat(), this.rwys_[x].getThr1Lon());
        break;
      }
    }
    l = null;
    return pos;
  }
}
// Class TravisParams for the program parameters with which the software can be controlled externally
function TravisParams() {
  // Membervariablen initialisieren:
  this.flightComplaintReplayPeriod = 600;
  this.liveDelayTimeInMinutes = 120;
  this.serverPath = 'localhost';
  this.overlayPath = 'localhost';
  // Tempoparameter der Anzeige:
  this.jQueryTimerLength = 40;
  this.moveAirplaneTimerLength = 250;
  this.updateNMTTimerLength = 1000;
  this.updateSystemTimeTimerLength = 125;
  this.garbageCollectTimerLength = 2000;
  // Tempo der Turbo-Anzeige
  this.jQueryTimerLengthTurbo = 20;
  this.moveAirplaneTimerLengthTurbo = 50;
  this.updateSystemTimeTimerLengthTurbo = 25;
  this.showCompleteTracksForAllFlights = false;
  // Radius um die NMT, innerhalb dessen keine Pegelberechnung durchgef�hrt wird
  this.nmtRadiusNoLevelCalculation = 0;
  // Initialwerte zur Parametrisierung des Programmaufrufs:
  this.initialStartTime = 0;
  this.initialDisplaySpeed = 1;
  this.initialHomeAddressLat = -1000;
  this.initialHomeAddressLon = -1000;
  this.initialSelectedFlight = '';
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _travis_params_prototype_called == 'undefined') {
    _travis_params_prototype_called = true;
    TravisParams.prototype.getFlightComplaintReplayPeriod = getFlightComplaintReplayPeriod;
    TravisParams.prototype.setFlightComplaintReplayPeriod = setFlightComplaintReplayPeriod;
    TravisParams.prototype.getLiveDelayTimeInMinutes = getLiveDelayTimeInMinutes;
    TravisParams.prototype.setLiveDelayTimeInMinutes = setLiveDelayTimeInMinutes;
    TravisParams.prototype.getServerPath = getServerPath;
    TravisParams.prototype.setServerPath = setServerPath;
    TravisParams.prototype.getOverlayPath = getOverlayPath;
    TravisParams.prototype.setOverlayPath = setOverlayPath;
    TravisParams.prototype.getJQueryTimerLength = getJQueryTimerLength;
    TravisParams.prototype.setJQueryTimerLength = setJQueryTimerLength;
    TravisParams.prototype.getMoveAirplaneTimerLength = getMoveAirplaneTimerLength;
    TravisParams.prototype.setMoveAirplaneTimerLength = setMoveAirplaneTimerLength;
    TravisParams.prototype.getUpdateNMTTimerLength = getUpdateNMTTimerLength;
    TravisParams.prototype.setUpdateNMTTimerLength = setUpdateNMTTimerLength;
    TravisParams.prototype.getUpdateSystemTimeTimerLength = getUpdateSystemTimeTimerLength;
    TravisParams.prototype.setUpdateSystemTimeTimerLength = setUpdateSystemTimeTimerLength;
    TravisParams.prototype.getGarbageCollectTimerLength = getGarbageCollectTimerLength;
    TravisParams.prototype.setGarbageCollectTimerLength = setGarbageCollectTimerLength;
    TravisParams.prototype.getJQueryTimerLengthTurbo = getJQueryTimerLengthTurbo;
    TravisParams.prototype.setJQueryTimerLengthTurbo = setJQueryTimerLengthTurbo;
    TravisParams.prototype.getMoveAirplaneTimerLengthTurbo = getMoveAirplaneTimerLengthTurbo;
    TravisParams.prototype.setMoveAirplaneTimerLengthTurbo = setMoveAirplaneTimerLengthTurbo;
    TravisParams.prototype.getUpdateSystemTimeTimerLengthTurbo = getUpdateSystemTimeTimerLengthTurbo;
    TravisParams.prototype.setUpdateSystemTimeTimerLengthTurbo = setUpdateSystemTimeTimerLengthTurbo;
    TravisParams.prototype.getShowCompleteTracksForAllFlights = getShowCompleteTracksForAllFlights;
    TravisParams.prototype.setShowCompleteTracksForAllFlights = setShowCompleteTracksForAllFlights;
    TravisParams.prototype.getNmtRadiusNoLevelCalculation = getNmtRadiusNoLevelCalculation;
    TravisParams.prototype.setNmtRadiusNoLevelCalculation = setNmtRadiusNoLevelCalculation;
    TravisParams.prototype.getInitialStartTime = getInitialStartTime;
    TravisParams.prototype.setInitialStartTime = setInitialStartTime;
    TravisParams.prototype.getInitialDisplaySpeed = getInitialDisplaySpeed;
    TravisParams.prototype.setInitialDisplaySpeed = setInitialDisplaySpeed;
    TravisParams.prototype.getInitialHomeAddressLat = getInitialHomeAddressLat;
    TravisParams.prototype.setInitialHomeAddressLat = setInitialHomeAddressLat;
    TravisParams.prototype.getInitialHomeAddressLon = getInitialHomeAddressLon;
    TravisParams.prototype.setInitialHomeAddressLon = setInitialHomeAddressLon;
    TravisParams.prototype.getInitialSelectedFlight = getInitialSelectedFlight;
    TravisParams.prototype.setInitialSelectedFlight = setInitialSelectedFlight;
    TravisParams.prototype.initParams = initParams;
  }
  // Zugriffsmethoden:
  function getFlightComplaintReplayPeriod() {
    return this.flightComplaintReplayPeriod;
  }
  function setFlightComplaintReplayPeriod(t) {
    this.flightComplaintReplayPeriod = t;
  }
  function getLiveDelayTimeInMinutes() {
    return this.liveDelayTimeInMinutes;
  }
  function setLiveDelayTimeInMinutes(t) {
    this.liveDelayTimeInMinutes = t;
  }
  function getServerPath() {
    return this.serverPath;
  }
  function setServerPath(t) {
    this.serverPath = t;
  }
  function getOverlayPath() {
    return this.overlayPath;
  }
  function setOverlayPath(t) {
    this.overlayPath = t;
  }
  function getJQueryTimerLength() {
    return this.jQueryTimerLength;
  }
  function setJQueryTimerLength(t) {
    this.jQueryTimerLength = t;
  }
  function getMoveAirplaneTimerLength() {
    return this.moveAirplaneTimerLength;
  }
  function setMoveAirplaneTimerLength(t) {
    this.moveAirplaneTimerLength = t;
  }
  function getUpdateNMTTimerLength() {
    return this.updateNMTTimerLength;
  }
  function setUpdateNMTTimerLength(t) {
    this.updateNMTTimerLength = t;
  }
  function getUpdateSystemTimeTimerLength() {
    return this.updateSystemTimeTimerLength;
  }
  function setUpdateSystemTimeTimerLength(t) {
    this.updateSystemTimeTimerLength = t;
  }
  function getGarbageCollectTimerLength() {
    return this.garbageCollectTimerLength;
  }
  function setGarbageCollectTimerLength(t) {
    this.garbageCollectTimerLength = t;
  }
  function getJQueryTimerLengthTurbo() {
    return this.jQueryTimerLengthTurbo;
  }
  function setJQueryTimerLengthTurbo(t) {
    this.jQueryTimerLengthTurbo = t;
  }
  function getMoveAirplaneTimerLengthTurbo() {
    return this.moveAirplaneTimerLengthTurbo;
  }
  function setMoveAirplaneTimerLengthTurbo(t) {
    this.moveAirplaneTimerLengthTurbo = t;
  }
  function getUpdateSystemTimeTimerLengthTurbo() {
    return this.updateSystemTimeTimerLengthTurbo;
  }
  function setUpdateSystemTimeTimerLengthTurbo(t) {
    this.updateSystemTimeTimerLengthTurbo = t;
  }
  function getShowCompleteTracksForAllFlights() {
    return this.showCompleteTracksForAllFlights;
  }
  function setShowCompleteTracksForAllFlights(t) {
    this.showCompleteTracksForAllFlights = t;
  }
  function getNmtRadiusNoLevelCalculation() {
    return this.nmtRadiusNoLevelCalculation;
  }
  function setNmtRadiusNoLevelCalculation(t) {
    this.nmtRadiusNoLevelCalculation = t;
  }
  function getInitialStartTime() {
    return this.initialStartTime;
  }
  function setInitialStartTime(i) {
    this.initialStartTime = i;
  }
  function getInitialDisplaySpeed() {
    return this.initialDisplaySpeed;
  }
  function setInitialDisplaySpeed(i) {
    this.initialDisplaySpeed = i;
  }
  function getInitialHomeAddressLat() {
    return this.initialHomeAddressLat;
  }
  function setInitialHomeAddressLat(i) {
    this.initialHomeAddressLat = i;
  }
  function getInitialHomeAddressLon() {
    return this.initialHomeAddressLon;
  }
  function setInitialHomeAddressLon(i) {
    this.initialHomeAddressLon = i;
  }
  function getInitialSelectedFlight() {
    return this.initialSelectedFlight;
  }
  function setInitialSelectedFlight(i) {
    this.initialSelectedFlight = i;
  }
  function initParams() {
    this.flightComplaintReplayPeriod = 900;
    this.liveDelayTimeInMinutes = 20;
    this.serverPath = 'https://travisltn.topsonic.aero/';
    this.overlayPath = '';
    this.jQueryTimerLength = 40;
    this.moveAirplaneTimerLength = 250;
    this.updateNMTTimerLength = 1000;
    this.updateSystemTimeTimerLength = 125;
    this.garbageCollectTimerLength = 2000;
    this.jQueryTimerLengthTurbo = 20;
    this.moveAirplaneTimerLengthTurbo = 50;
    this.updateSystemTimeTimerLengthTurbo = 25;
    this.nmtRadiusNoLevelCalculation = 500;
  }
}
// Klasse ComplaintParams fuer die Parameter einer Beschwerde
function ComplaintParams() {
  // Membervariablen initialisieren:
  this.tbegin = -1;
  this.tend = -1;
  this.active = false;
  this.complaintFlightsRunning = false;
  this.lastOffset = -1;
  this.sliderInMotion = false;
  this.currentComplaintType = ComplaintType.Unknown;
  this.selectedTrack = null;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _complaint_params_prototype_called == 'undefined') {
    _complaint_params_prototype_called = true;
    ComplaintParams.prototype.getTBegin = getTBegin;
    ComplaintParams.prototype.setTBegin = setTBegin;
    ComplaintParams.prototype.getTEnd = getTEnd;
    ComplaintParams.prototype.setTEnd = setTEnd;
    ComplaintParams.prototype.getActive = getActive;
    ComplaintParams.prototype.setActive = setActive;
    ComplaintParams.prototype.getComplaintFlightsRunning = getComplaintFlightsRunning;
    ComplaintParams.prototype.setComplaintFlightsRunning = setComplaintFlightsRunning;
    ComplaintParams.prototype.getLastOffset = getLastOffset;
    ComplaintParams.prototype.setLastOffset = setLastOffset;
    ComplaintParams.prototype.getSliderInMotion = getSliderInMotion;
    ComplaintParams.prototype.setSliderInMotion = setSliderInMotion;
    ComplaintParams.prototype.getCurrentComplaintType = getCurrentComplaintType;
    ComplaintParams.prototype.setCurrentComplaintType = setCurrentComplaintType;
    ComplaintParams.prototype.setSelectedTrack = setSelectedTrack;
    ComplaintParams.prototype.getSelectedTrack = getSelectedTrack;
  }
  // Zugriffsmethoden:
  function getTBegin() {
    return this.tbegin;
  }
  function setTBegin(t) {
    this.tbegin = t;
  }
  function getTEnd() {
    return this.tend;
  }
  function setTEnd(t) {
    this.tend = t;
  }
  function getActive() {
    return this.active;
  }
  function setActive(b) {
    this.active = b;
    if (!b) {
      this.tbegin = -1;
      this.tend = -1;
      this.lastOffset = -1;
      this.sliderInMotion = false;
      this.currentComplaintType = ComplaintType.Unknown;
      this.selectedTrack = null;
      if (this.complaintFlightsRunning) {
        this.complaintFlightsRunning = false;
      }
    }
  }
  function getComplaintFlightsRunning() {
    return this.complaintFlightsRunning;
  }
  function setComplaintFlightsRunning(b) {
    this.complaintFlightsRunning = b;
  }
  function getLastOffset() {
    return this.lastOffset;
  }
  function setLastOffset(t) {
    this.lastOffset = t;
  }
  function getSliderInMotion() {
    return this.sliderInMotion;
  }
  function setSliderInMotion(b) {
    this.sliderInMotion = b;
  }
  function getCurrentComplaintType() {
    return this.currentComplaintType;
  }
  function setCurrentComplaintType(t) {
    this.currentComplaintType = t;
  }
  function setSelectedTrack(t) {
    if (this.active) {
      if (t && t.getTrackData()) {
        $('#complaintSpecificSelectedFlightField').val(
          t.getTrackData().getFlightNo() + ' - ' + t.getTrackData().getCarrier(),
        );
        this.selectedTrack = t;
      } else {
        $('#complaintSpecificSelectedFlightField').val('');
        this.selectedTrack = null;
      }
    }
  }
  function getSelectedTrack(t) {
    return this.selectedTrack;
  }
}
// Klasse MapOverlayData
function MapOverlayDescription(name, src, metric, time, type, id) {
  // Membervariablen initialisieren:
  this.name_ = name;
  this.src_ = src;
  this.metric_ = metric;
  this.time_ = time;
  this.type_ = type;
  this.ID_ = id;
  // Member hier f�r den Prototyp referenzieren, damit sie nur einmal angelegt werden, was Speicher spart
  if (typeof _mapoverlaydescription_prototype_called == 'undefined') {
    _mapoverlaydescription_prototype_called = true;
    MapOverlayDescription.prototype.getName = getName;
    MapOverlayDescription.prototype.setName = setName;
    MapOverlayDescription.prototype.getSource = getSource;
    MapOverlayDescription.prototype.setSource = setSource;
    MapOverlayDescription.prototype.getMetric = getMetric;
    MapOverlayDescription.prototype.setMetric = setMetric;
    MapOverlayDescription.prototype.getTime = getTime;
    MapOverlayDescription.prototype.setTime = setTime;
    MapOverlayDescription.prototype.getType = getType;
    MapOverlayDescription.prototype.setType = setType;
    MapOverlayDescription.prototype.getID = getID;
    MapOverlayDescription.prototype.setID = setID;
  }
  // AirportData Zugriffsmethoden:
  function getName() {
    return this.name_;
  }
  function setName(n) {
    this.name_ = n;
  }
  function getSource() {
    return this.src_;
  }
  function setSource(s) {
    this.src_ = s;
  }
  function getMetric() {
    return this.metric_;
  }
  function setMetric(m) {
    this.metric_ = m;
  }
  function getTime() {
    return this.time_;
  }
  function setTime(t) {
    this.time_ = t;
  }
  function getType() {
    return this.type_;
  }
  function setType(t) {
    this.type_ = t;
  }
  function getID() {
    return this.ID_;
  }
  function setID(i) {
    this.ID_ = i;
  }
}
// Initialisierung der Tabs:
window.addEvent('domready', function() {
  if (!navigator.cookieEnabled) {
    alert(
      'Please enable cookies in your browser options to save your settings for the next start of this application!',
    );
  }
  // Flugplantabelle initialisieren:
  $('.flexme').flexigrid({
    sortname: 'Time',
    sortorder: 'asc',
    resizable: false,
    singleSelect: true,
    striped: true,
    dataType: 'json',
    height: 'auto',
    width: 'auto',
    onChangeSort: function(name, order) {
      sortGrid('#flexme', order);
    },
    colModel: [
      {
        display: '',
        name: 'AD',
        width: 8,
        sortable: false,
        align: 'left',
        process: procFlightTableEvent,
      },
      {
        display: 'Time',
        name: 'Time',
        width: 50,
        sortable: true,
        align: 'left',
        process: procFlightTableEvent,
      },
      {
        display: 'Flight',
        name: 'Flight',
        width: 50,
        sortable: true,
        align: 'left',
        process: procFlightTableEvent,
      },
      {
        display: 'From/To',
        name: 'FromTo',
        width: 135,
        sortable: true,
        align: 'left',
        process: procFlightTableEvent,
      },
      {
        display: 'Height [ft]',
        name: 'Height',
        width: 47,
        sortable: true,
        align: 'right',
        process: procFlightTableEvent,
      },
    ],
  });
  $('#homeMenu > li').hover(
    function() {
      if (obj) {
        obj.find('ul').fadeOut('fast');
        obj = null;
      }
      $(this)
        .find('ul')
        .fadeIn('fast');
    },
    function() {
      obj = $(this);
      setTimeout('checkHover()', 400);
    },
  );
  $('#topbarWeather').hover(
    function() {
      var pos = $('#topbarWeather').offset();
      pos.top += 25;
      $('#weatherPanel').css({
        top: pos.top + 'px',
        left: pos.left + 'px',
      });
      $('#weatherPanel').slideDown();
    },
    function() {
      $('#weatherPanel').slideUp();
    },
  );
  $('#topFunctionButtonNMTReport').hover(
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '87px' }, 300);
    },
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '22px' }, 200);
    },
  );
  $('#topFunctionButtonAirportReport').hover(
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '87px' }, 300);
    },
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '22px' }, 200);
    },
  );
  $('#topFunctionButtonAddressLookup').hover(
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '207px' }, 300);
    },
    function() {
      stopTopFunctionAnimations();
      $(this).animate({ height: '22px' }, 200);
    },
  );
});
// Globales Zugriffsobjekt fuer alle TraVis-Parameter
var travisOptions = new TravisParams();
travisOptions.initParams();
// GoogleMaps-Objekt fuer Karte und Overlay fuer Nachtmodus
var map;
var nightcurtain;
var mapOverlay;
var firstLoadAfterOpen = true;
// Um festzustellen, wann der allererste Ladevorgang nach Oeffnen der Seite laeuft
// Damit wir die Sonnen- und Daemmerungsdaten nicht immer neu berechnen muessen, werden sie hier gespeichert:
var lastSunriseCalcDay = 0;
var sunriseTime = 0;
var sunsetTime = 0;
var beginMorningDawn = 0;
var endMorningDawn = 0;
var beginEveningDawn = 0;
var endEveningDawn = 0;
// Icons der Flugzeuge: werden vorgeladen, gespeichert und dann nur noch benutzt.
var departureIconSmall2;
var departureIconSmall4;
var departureIconBig2;
var departureIconBig4;
var departureIconSmall2Sel;
var departureIconSmall4Sel;
var departureIconBig2Sel;
var departureIconBig4Sel;
var arrivalIconSmall2;
var arrivalIconSmall4;
var arrivalIconBig2;
var arrivalIconBig4;
var arrivalIconSmall2Sel;
var arrivalIconSmall4Sel;
var arrivalIconBig2Sel;
var arrivalIconBig4Sel;
var heliIcon;
var vfrIcon;
var heliIconSel;
var vfrIconSel;
// Detail-Anzeigen in einem Bubble-Fenster
var infoWindow = new google.maps.InfoWindow();
// Aktuell auf der linken Seite geöffnetes Panel:
var currentOpenLeftPanel = null;
var airportData = new AirportData();
arrayTracks = new Array();
arrayNMTs = new Array();
arrayRoutes = new Array();
arrayDistanceMarkers = new Array();
var distanceMarkerLine = null;
// Der Display-Mode sagt uns, in welchem Anzeigemodus wir uns befinden:
TWState = {
  Live: 0,
  LiveDelayed: 1,
  Historical: 2,
  Paused: 3,
  Stopped: 4,
};
var currentState = TWState.Live;
// Diese Waitcounter sorgen dafuer, dass bestimmte Aktionen in loadOverlays nicht bei jedem Durchlauf ausgefuehrt werden.
var lastLiveAction = 0;
var numofWeatherLoad = 0;
// ReplaySpeed ist die Geschwindigkeit, in der historische Daten abgespielt werden
// 1 = Realgeschwindigkeit
// 2 = doppelte Geschwindigkeit
// usw.
var replaySpeed = 1;
// TurboMode bedeutet fluessigere Bewegungen in der Anzeige, aber hoehere CPU-Belastung (Parameter in TopWebSettings.php)
var turboMode = false;
// Andere Standardeinstellung in Frankfurt:
// Einstellungen fuer Flag-Anzeige und andere Anzeigen:
var bigFlags = false;
var flagsForall = false;
var flyoverFlags = true;
var nightMode = true;
var bShowFlightTable = true;
var bFlightTableVisible = false;
// Sortierreihenfolge in Flugtabelle:
var currentFlightTableSortingOrder = 'asc';
// Zaehler zum eindeutigen benennen von DOM-Objekten - wird bei Benutzung automatisch inkrementiert
var itemCounter = 0;
// tailLength ist die Laenge des angezeigten Schweifs in Sekunden - es werden also immer nur die
// Plots angezeigt, die innerhalb der Zeitspanne von <tailLength> Sekunden vor dem aktuellen Zeitpunkt gemessen wurden.
// < 0 = keine Beschraenkung -> alle Plots werden angezeigt
//   0 = Nur der letzte Punkt wird angezeigt
// > 0 = Nur Plots, die in diesen Zeitraum fallen, werden angezeigt! Der letzte Plot wird aber immer angezeigt !!!
var tailLength = 90;
// Wert ist einstellbar - 90 entspricht der mittleren Flugspur-Länge
// Startzeitpunkt der historischen Daten
// Werden gesetzt, wenn man den Historisch-Modus startet. Beim Stoppen oder Starten des Live-Modus wird die Variable auf 0 gesetzt
var historicStartTime = 0;
var historicStartTimeString = '';
var historicStartServerTime = 0;
// Aktuelle Uhrzeit zu Beginn eines historischen Anzeigelaufes
var adjustStartServerTimeAfterLoad = false;
// Kennzeichner: Startzeit muss nach der Wartezeit neu belegt werden
// Zuletzt eingestellter Offset-Wert beim Verschieben des Zeitbereiches im Complaint Modul
ComplaintType = {
  Unknown: 0,
  Specific: 1,
  General: 2,
};
var complaintParams = new ComplaintParams();
// Globale Systemzeit - wird regelmäßig in updateSystemTime berechnet und kann dann in anderen Methoden ohne weitere Berechnung genutzt werden
var globalSystemTime = 0;
// Zeitlicher Abstand zwischen der Zeitzone des Airports und UTC (wird vom Server geliefert)
var offsetAirportToUTC = 0;
// Pool-Daten
var historicPoolUpdateTime = 0;
// Zeitpunkt, zu dem die aktuelle Pause begonnen wurde
var pauseStartTime = 0;
// Laenge der Pausen bei der aktuellen Abspielung der historischen Daten
var currentPauseLength = 0;
var stopTimeCalculation = false;
// Erster Uebergabeparameter beim Aufruf der PHP-Datei ist eine Zufallszahl, die aus der Uhrzeit ermittelt wird
// und quasi als SessionID an den Namen der XML-Datei angehaengt wird:
var sessionID = 0;
generate_new_session_id();
// Index des selektierten Elements (nur einer der beiden kann gesetzt sein!
var selectedTrack = -1;
var selectedNMT = -1;
// NMT, das sich aktuell unter dem Mauszeiger befindet
var nmtUnderCursor = null;
// Bei Klicks auf die von OverlayView abgeleiteten Objekte bekommen erst die ein Klick-Event und dann auch noch die Map.
// Der zweite Klick muss dann nat  ignoriert werden!
var ignoreNextMapClick = false;
// Geladene Daten werden hier gespeichert (entspricht dem aktuellen Inhalt der zuletzt geladenen XML-Datei)
var loadedRoutes;
// Sollen Trackdaten und/oder Pegeldaten angezeigt werden?
var bShowTrackData = true;
var bShowNMTData = true;
var currentSelectedRoute = '';
// Zeitspanne der im System vorhandenen Noise Events (zum Fetten der Tage im Kalender)
var startFirstNoiseEvent = 0;
var endLastNoiseEvent = 0;
// Damit immer nur dann ein Request losgeschickt werden kann, wenn keiner mehr unterwegs ist, merken wir uns hier den entsprechenden Status.
// Das machen wir, damit sich die Requests nicht gegenseitig ueberholen - die Antwortzeit vom Server ist eben nicht immer konstant.
var trackRequestActive = false;
// Zum Beschleunigen der ClosestApproach-Anzeige:
var closestApproachVisible = false;
var lastClosestApproachType = '';
// Map Overlays (INM und/oder TrackFootprint)
var mapOverlayObjects = null;
var overlayMonth = '0';
var overlayYear = '0';
var arrayMapOverlayData = new Array();
var footprintOverlay = null;
// Timer
var wetterTimer;
var loadTimer;
var airplaneTimer;
var nmtAndFriendsTimer;
var systemTimeTimer;
var garbageCollectTimer;
// Marker fuer den aktuellen Standpunkt des Benutzers
var homeMarker = null;
var homePosition = arpPosition;
var homeHeight = 0;
// Hoehe ueber NN (wird fuer die Distanzgrafik benoetigt)
var homePositionInsideNMTRadius = false;
// Klassendekarationen fuer FlightTrack, Plot, NMT, NMTLevel - der Uebersichtlichkeit halber ausgelagert
function isTouchDevice() {
  return typeof window.ontouchstart != 'undefined';
}
function generate_new_session_id() {
  var t = new Date();
  sessionStartTime = t.getTime();
  t = null;
  sessionID = Math.floor(sessionStartTime * Math.random());
}
function start_live_action() {
  closeSpeedPanel();
  showDelayPanel();
  stopTimeCalculation = true;
  fadein_dimmer();
  // Remove old data and remove selections:
  clearAllTrackData();
  clearAllNMTData();
  selectedTrack = -1;
  selectedNMT = -1;
  HideClosestApproach();
  chartBig.reset();
  generate_new_session_id();
  trackRequestActive = false;
  // Next request can be started! If there is one left, it will be ignored!
  set_status_time_string('Loading live data .....');
  historicStartTime = 0;
  historicStartServerTime = 0;
  historicPoolUpdateTime = 0;
  pauseStartTime = 0;
  currentPauseLength = 0;
  if (travisOptions.getLiveDelayTimeInMinutes() > 0) {
    // Corresponds to the historical mode with fixed delay!
    var curTime = getCurrentTime();
    historicStartTime = curTime - travisOptions.getLiveDelayTimeInMinutes() * 60;
    // Of course, faster is not possible at realtime!
    replaySpeed = 1;
    // Record the current server time at the start time of the historical data
    historicStartServerTime = curTime;
    adjustStartServerTimeAfterLoad = true;
    currentState = TWState.LiveDelayed;
    historicPoolUpdateTime = 0;
    curTime = null;
  } else {
    currentState = TWState.Live;
  }
  // Live-Button is selected:
  show_live();
  activateSpeedButtons(false);
  updateDataPanel();
  numofWeatherLoad = 0;
  startAllTimerFunctions();
  fadeout_dimmer();
}
function timeStringToDateTime(timeString) {
  var x = timeString.split(' ');
  if (x.length < 2) {
    return 0; // FEHLER
  }
  var date = x[0];
  var time = x[1];
  var y = date.split('.');
  if (y.length < 3) {
    return 0; // FEHLER
  }
  var yearTOP = y[2];
  var startTime = Date.parse(y[1] + '/' + y[0] + '/' + yearTOP + ' ' + time);
  if (isNaN(startTime)) {
    return 0; // FEHLER
  }
  var currentStartTime = new Date(startTime);
  var histTime = startTime / 1000;
  x = null;
  date = null;
  time = null;
  y = null;
  yearTOP = null;
  startTime = null;
  currentStartTime = null;
  return histTime;
}
function convertInputToStartDateTime(timeString) {
  var x = timeString.split(' ');
  if (x.length < 2) {
    alert(unescape('You must enter a valid date!'));
    doNotLoadWeather = false;
    return false; // FEHLER
  }
  var date = x[0];
  var time = x[1];
  var y = date.split('.');
  if (y.length < 3) {
    alert(unescape('You must enter a valid date!'));
    doNotLoadWeather = false;
    return false; // FEHLER
  }
  var yearTOP = y[2];
  var startTime = Date.parse(y[1] + '/' + y[0] + '/' + yearTOP + ' ' + time);
  if (isNaN(startTime)) {
    // Da war wohl was mit den Eingaben falsch!
    alert(unescape('You must enter a valid date!'));
    doNotLoadWeather = false;
    return false; // FEHLER
  }
  var currentStartTime = new Date(startTime);
  var histTime = startTime / 1000 - currentStartTime.getTimezoneOffset() * 60;
  // In UTC umrechnen!
  // Startzeit darf nat�rlich nicht nach der Live-Zeit liegen!
  var curTime = getCurrentTime();
  if (histTime >= curTime - travisOptions.getLiveDelayTimeInMinutes() * 60 + offsetAirportToUTC) {
    // Da war wohl was mit den Eingaben falsch!
    alert(unescape('Start time must be earlier than Live time!'));
    doNotLoadWeather = false;
    return false; // FEHLER
  }
  // Alles OK! Startzeit �bernehmen!
  historicStartTime = histTime;
  historicStartTimeString = y[0] + '-' + y[1] + '-' + yearTOP + ' ' + time + ':00';
  startTime = null;
  currentStartTime = null;
  histTime = null;
  curTime = null;
  set_status_time_string('Loading data for ' + timeString + ' .....');
  x = null;
  y = null;
  date = null;
  time = null;
  return true;
}
function ChangeStartDateTime(t) {
  var currentStartTime = new Date(t * 1000);
  var histTime = t - currentStartTime.getTimezoneOffset() * 60;
  // In UTC umrechnen!
  // Startzeit darf nat�rlich nicht nach der Live-Zeit liegen!
  var curTime = getCurrentTime();
  if (histTime >= curTime - travisOptions.getLiveDelayTimeInMinutes() * 60 + offsetAirportToUTC) {
    // Da war wohl was mit den Eingaben falsch!
    alert(unescape('Start time must be earlier than Live time!'));
    doNotLoadWeather = false;
    return false; // FEHLER
  }
  // Alles OK! Startzeit �bernehmen!
  historicStartTime = histTime;
  var yearTOP = currentStartTime.getFullYear();
  var timeString = '';
  if (currentStartTime.getDate() < 10) timeString += '0';
  timeString += currentStartTime.getDate() + '.';
  if (currentStartTime.getMonth() < 9) timeString += '0';
  timeString += currentStartTime.getMonth() + 1 + '.' + yearTOP + ' ';
  if (currentStartTime.getHours() < 10) timeString += '0';
  timeString += currentStartTime.getHours() + ':';
  if (currentStartTime.getMinutes() < 10) timeString += '0';
  timeString += +currentStartTime.getMinutes();
  var timeStringWithSeconds = timeString + ':';
  if (currentStartTime.getSeconds() < 10) timeStringWithSeconds += '0';
  timeStringWithSeconds += +currentStartTime.getSeconds();
  historicStartTimeString = timeStringWithSeconds;
  set_status_time_string('Loading data for ' + timeStringWithSeconds + ' .....');
  document.getElementById('datefield').value = timeString;
  t = null;
  currentStartTime = null;
  histTime = null;
  curTime = null;
  timeString = null;
  timeStringWithSeconds = null;
  x = null;
  y = null;
  date = null;
  time = null;
  return true;
}
function start_archive_action() {
  closeDelayPanel();
  showSpeedPanel();
  stopTimeCalculation = true;
  fadein_dimmer();
  currentState = TWState.Historical;
  activateSpeedButtons(true);
  // Alte Daten entfernen und Selektionen aufheben:
  clearAllTrackData();
  clearAllNMTData();
  selectedTrack = -1;
  selectedNMT = -1;
  HideClosestApproach();
  chartBig.reset();
  generate_new_session_id();
  trackRequestActive = false;
  // Naechster Request kann gestartet werden! Falls noch einer unterwegs ist, wird dieser ignoriert!
  pauseStartTime = 0;
  currentPauseLength = 0;
  historicPoolUpdateTime = 0;
  if (complaintParams.getComplaintFlightsRunning()) replaySpeed = 1;
  else replaySpeed = parseInt($('#sliderSpeed').slider('value'));
  // Aktuelle Serverzeit zum Startzeitpunkt der historischen Daten festhalten
  historicStartServerTime = getCurrentTime();
  adjustStartServerTimeAfterLoad = true;
  updateDataPanel();
  numofWeatherLoad = 0;
  startAllTimerFunctions();
  fadeout_dimmer();
}
function startArchiveModeWithSelectedDate(dateString) {
  // Eingegebene Zeit in Systemzeit umwandeln
  if (convertInputToStartDateTime(dateString)) start_archive_action();
}
function setComplaintSpecificTime(dateString) {
  document.getElementById('datefieldComplaintSpecific').value = dateString;
}
function start_archive_action_with_params(t, speed, lat, lon) {
  if (ChangeStartDateTime(t)) {
    if (speed > 0.9 && speed < 25.1) {
      $('#sliderSpeed').slider('value', Math.round(speed));
      replaySpeed = parseInt($('#sliderSpeed').slider('value'));
    }
    if (lat > -900 && lon > -900) {
      homePositionChanged(new google.maps.LatLng(lat, lon));
      show_home_location(true);
    }
    start_archive_action();
  } else start_live_action();
}
function startAllTimerFunctions() {
  updateSystemTime();
  loadOverlays();
  moveAirplanes();
  updateNMTAndFriends();
  garbageCollectTimer = setTimeout('garbageCollect()', 10000);
}
function stopAllTimerFunctions() {
  clearTimeout(loadTimer);
  clearTimeout(airplaneTimer);
  clearTimeout(nmtAndFriendsTimer);
  clearTimeout(systemTimeTimer);
  clearTimeout(garbageCollectTimer);
}
function activateSpeedButtons(b) {
  return; //XXX	if (b)
  //XXX	{
  //XXX		document.getElementById("idSlower").style.backgroundImage = "url('images/langsamer.gif')";
  //XXX		document.getElementById("idFaster").style.backgroundImage = "url('images/schneller.gif')";
  //XXX	}
  //XXX	else
  //XXX	{
  //XXX		document.getElementById("idSlower").style.backgroundImage = "url('images/langsamerGrau.gif')";
  //XXX		document.getElementById("idFaster").style.backgroundImage = "url('images/schnellerGrau.gif')";
  //XXX	}
}
function show_replay() {
  $('#container_livemessage').stop(true, true);
  $('#container_timeinput').stop(true, true);
  document.getElementById('container_timeinput').style.display = 'block';
  $('#container_livemessage').animate({ opacity: 0 }, 1000);
  $('#container_timeinput').animate({ opacity: 1 }, 1000);
}
function show_live() {
  $('#container_livemessage').stop(true, true);
  $('#container_timeinput').stop(true, true);
  $('#container_livemessage').animate({ opacity: 1 }, 1000);
  $('#container_timeinput').animate({ opacity: 0 }, 1000, function() {
    document.getElementById('container_timeinput').style.display = 'none';
  });
}
function close_data_container() {}
function open_data_container() {}
function set_status_time_string(statustext) {
  $('#currentTime').html(statustext);
}
function fadeout_dimmer() {
  $('#map_dimmer').animate({ opacity: 0 }, 1000, function() {
    document.getElementById('map_dimmer').style.display = 'none';
  });
}
function fadein_dimmer() {
  document.getElementById('map_dimmer').style.display = 'block';
  $('#map_dimmer').show(10);
  $('#map_dimmer').animate({ opacity: 0.5 }, 1000);
}
function pause() {
  if (currentState == TWState.Stopped) return;
  // FALL 1: Pause beenden
  if (currentState == TWState.Paused) {
    currentState = TWState.Historical;
    // ReplaySpeed muss im Archiv immer eingestellt werden koennen!
    showSpeedPanel();
    if (pauseStartTime > 0) {
      var curTime = getCurrentTime();
      // Aktuelle Pause zur Gesamtpausenlaenge addieren:
      if (curTime > pauseStartTime) {
        currentPauseLength = currentPauseLength + curTime - pauseStartTime;
      }
      curTime = null;
    }
    document.getElementById('idPause').style.backgroundImage = "url('images/pause2.gif')";
    startAllTimerFunctions();
  } // FALL 2: Pause beginnen (egal in welchem Modus!)
  else {
    set_status_time_string(
      'Paused at ' + timeToString(utcToAirportTimePlusLocal(globalSystemTime)),
    );
    currentState = TWState.Paused;
    pauseStartTime = getCurrentTime();
    document.getElementById('idPause').style.backgroundImage = "url('images/resume2.gif')";
    stopAllTimerFunctions();
  }
}
function stop_action() {
  if (currentState == TWState.Stopped) return;
  fadein_dimmer();
  currentState = TWState.Stopped;
  stopAllTimerFunctions();
  document.getElementById('idPause').style.backgroundImage = "url('images/pauseGrau.png')";
  set_status_time_string('System stopped !');
  historicStartTime = 0;
  historicStartServerTime = 0;
  pauseStartTime = 0;
  currentPauseLength = 0;
  historicPoolUpdateTime = 0;
}
function getNextReplaySpeed(v) {
  switch (parseInt(v)) {
    case 1:
      return 2;
      break;
    case 2:
      return 3;
      break;
    case 3:
      return 5;
      break;
    case 5:
      return 10;
      break;
    case 10:
      return 20;
      break;
    case 20:
      return 20;
      break;
  }
  return 20;
}
function getPrevReplaySpeed(v) {
  switch (parseInt(v)) {
    case 1:
      return 1;
      break;
    case 2:
      return 1;
      break;
    case 3:
      return 2;
      break;
    case 5:
      return 3;
      break;
    case 10:
      return 5;
      break;
    case 20:
      return 10;
      break;
  }
  return 1;
}
function showTrackData(box) {
  bShowTrackData = box.checked;
  setTrackPolylineObjectsVisible(bShowTrackData);
  redrawData();
}
function showNMTData(box) {
  bShowNMTData = box.checked;
  if (!bShowNMTData) clearNMTMapObjects();
  redrawData();
}
function showRoutes(box) {
  currentSelectedRoute = document.getElementById('k-routes').value;
  redrawData();
}
function replaySpeedChanged() {
  if (currentState == TWState.Live || currentState == TWState.LiveDelayed) return;
  // Muss schon hier bestimmt werden, da nach der Speed-�nderung ein falsches Ergebnis berechnet wird!
  var curSysTime = globalSystemTime;
  replaySpeed = parseInt($('#sliderSpeed').slider('value'));
  // Da die Systemzeit mit Hilfe des Replay Speed berechnet wird, tun wir so, als ob wie hier eine neue Session starten.
  historicStartTime = curSysTime;
  historicStartServerTime = getCurrentTime();
  // Pause muss dann auch genau hier quasi neu beginnen! Falls wir uns im Pausenmodus befinden .....
  if (currentState == TWState.Paused) {
    currentPauseLength = 0;
    pauseStartTime = historicStartServerTime;
  }
  curSysTime = null;
}
function mapTypeChanged(box) {
  var newMapType = box.value;
  if (newMapType == 'TraVis') map.setMapTypeId('TraVisMapStyle');
  else if (newMapType == 'terrain') map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  else if (newMapType == 'satellite') map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  else if (newMapType == 'roadmap') map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  else if (newMapType == 'hybrid') map.setMapTypeId(google.maps.MapTypeId.HYBRID);
  else if (newMapType == 'OSM') map.setMapTypeId('OSM');
  else if (newMapType == 'OSM-BW') map.setMapTypeId('OSM-BW');
  if (newMapType == 'OSM' || newMapType == 'OSM-BW') $('#osmAttribution').fadeIn('fast');
  else $('#osmAttribution').fadeOut('fast');
}
function tailLengthChanged(box) {
  var newTailLength = box.value;
  tailLength = newTailLength;
  setTrackPolylineObjectsVisible(newTailLength != 0);
  clearTrackPolylineObjects();
  // Alte Linien entfernen, damit komplett neu gezeichnet wird!
  redrawData();
}
function overlayMonthChanged(box) {
  overlayMonth = box.value;
  loadMapOverlayList();
}
function overlayYearChanged(box) {
  overlayYear = box.value;
  loadMapOverlayList();
}
function showHomeMenu(e) {
  var p = mapOverlay.getProjection().fromLatLngToContainerPixel(e.latLng);
  var mapPos = $('#map').offset();
  $('#homeMenu').offset({
    top: p.y + mapPos.top,
    left: p.x + mapPos.left,
  });
  $('#homeMenu').fadeIn('fast');
  delete p;
  delete mapPos;
}
function homeInfo() {
  closeHomeMenu();
  var p = mapOverlay.getProjection().fromLatLngToContainerPixel(homePosition);
  var mapPos = $('#map').offset();
  $('#homePanel').css({
    top: p.y + mapPos.top + 'px',
    left: p.x + mapPos.left + 'px',
  });
  var distanceToARP = google.maps.geometry.spherical.computeDistanceBetween(
    homePosition,
    arpPosition,
  );
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: homePosition }, function(results, status) {
    var detailsText =
      '<b>Position: </b>' +
      homePosition.lat().toFixed(6) +
      ', ' +
      homePosition.lng().toFixed(6) +
      '<br /><b>Height above sea level: </b>' +
      homeHeight.toFixed(0) +
      ' m<br /><b>Distance to airport: </b>' +
      distanceToARP.toFixed(0) +
      ' m';
    if (status == google.maps.GeocoderStatus.OK && results[1]) {
      detailsText += '<br /><b>Address: </b>' + results[1].formatted_address;
    }
    $('#homeDetails').html(detailsText);
    $('#homePanel').fadeIn('fast');
    detailsText = null;
  });
  delete p;
  delete mapPos;
}
// Berechne die Entfernung zur n�chsten Messstelle! Innerhalb eines bestimmten Radius wird keine Pegelberechnung durchgef�hrt.
function calculateHomePositionInsideNMTRadius() {
  var len = arrayNMTs.length;
  var minDistance = 999999999;
  for (var x = 0; x < len; x++) {
    var nmtPos = new google.maps.LatLng(arrayNMTs[x].getLatitude(), arrayNMTs[x].getLongitude());
    var dist = google.maps.geometry.spherical.computeDistanceBetween(homePosition, nmtPos);
    if (dist < minDistance) minDistance = dist;
    nmtPos = null;
    dist = null;
  }
  homePositionInsideNMTRadius = minDistance <= travisOptions.getNmtRadiusNoLevelCalculation();
}
function homeDelete() {
  closeHomeMenu();
  hide_home_location();
  closeHomePanel();
}
function closeHomeMenu() {
  $('#homeMenu').css({
    display: 'none',
    top: '0',
    left: '0',
  });
}
function updateBigFlags(box) {
  bigFlags = box.checked;
}
function updateFlagsForall(box) {
  flagsForall = box.checked;
}
function updateCompleteTracksForAll(box) {
  travisOptions.setShowCompleteTracksForAllFlights(box.checked);
}
function updateFlyoverFlags(box) {
  flyoverFlags = box.checked;
}
function updateNightMode(box) {
  nightMode = box.checked;
}
function updateTurboMode(box) {
  turboMode = box.checked;
  if (turboMode) jQuery.fx.interval = travisOptions.getJQueryTimerLengthTurbo();
  else jQuery.fx.interval = travisOptions.getJQueryTimerLength();
}
function updateShowFlightTable(box) {
  bShowFlightTable = box.checked;
}
function toggleShowFlightTable() {
  bShowFlightTable = !bShowFlightTable;
}
// Funktion zum Einrichten von Markern mit einem Infotext beim Draufklicken
function createARPMarker(point, bubbleText, infoText) {
  var iconSize = new google.maps.Size(17, 8);
  var iconAnchor = new google.maps.Point(8, 4);
  var icon = new google.maps.MarkerImage(
    'images/AirportLogo.gif',
    null,
    null,
    iconAnchor,
    iconSize,
  );
  var opts = {
    icon: icon,
    position: point,
    map: map,
    title: infoText,
    zIndex: 1,
  };
  var marker = new google.maps.Marker(opts);
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent("<span style='color:#333333'>" + bubbleText + '</span>');
    infoWindow.setPosition(point);
    infoWindow.open(map);
  });
  icon = null;
  opts = null;
  iconSize = null;
  iconAnchor = null;
  return marker;
}
function deselectAllItems() {
  stopMeasureDistance();
  deselectAllNMTMarkers();
  deselectAllTracks();
  HideClosestApproach();
  HideSelectedText2();
  HideWebReporting();
  chartBig.reset();
  chartBig.redraw();
}
function createMarkerClickHandler(marker, track, clickOnFlag) {
  return function() {
    deselectAllItems();
    closeHomeMenu();
    var len = arrayTracks.length;
    for (var x = 0; x < len; x++) {
      if (
        arrayTracks[x].getTrackData().getCallsign() == track.getTrackData().getCallsign() &&
        arrayTracks[x].getTrackData().getFlightID() == track.getTrackData().getFlightID()
      ) {
        selectedTrack = x;
        break;
      }
    }
    len = null;
    x = null;
    track.setSelected(true);
    updateDataPanel();
    // Daten-Tab anzeigen!
    redrawData();
    updateSelectionInFlightTable();
    if (clickOnFlag) ignoreNextMapClick = true;
    return false;
  };
}
function createMarkerClickHandlerForNMT(nmtMarker, nmt) {
  return function() {
    deselectAllItems();
    closeHomeMenu();
    var len = arrayNMTs.length;
    for (var x = 0; x < len; x++) {
      if (arrayNMTs[x].getShortcut() == nmt.getShortcut()) {
        selectedNMT = x;
        break;
      }
    }
    len = null;
    x = null;
    nmt.setSelected(true);
    updateDataPanel();
    // Daten-Tab anzeigen!
    redrawData();
    updateSelectionInFlightTable();
    ignoreNextMapClick = true;
    return false;
  };
}
function createMapClickHandler() {
  // Klick auf die Map (au�erhalb aller Overlays!)
  return function(overlay, point) {
    closeHomeMenu();
    closeHomePanel();
    closeSetupPanel();
    // Dieser Map-Click erfolgt nach einem Klick auf ein Rectangle und muss daher ignoriert werden!
    if (ignoreNextMapClick) {
      ignoreNextMapClick = false;
      return false;
    }
    // Selektion bei Klick in den Hintergrund aufheben!
    deselectAllItems();
    updateDataPanel();
    updateSelectionInFlightTable();
    return false;
  };
}
function createMapClickRightHandler() {
  // Rechtsklick auf die Map - startet Distanz-Messung
  return function(event) {
    closeHomeMenu();
    var markerIcon = new google.maps.MarkerImage(
      'http://www.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png',
      new google.maps.Size(32, 32),
      new google.maps.Point(0, 0),
      new google.maps.Point(16, 31),
    );
    var shadow = new google.maps.MarkerImage(
      'http://www.google.com/intl/en_us/mapfiles/ms/micons/msmarker.shadow.png',
      new google.maps.Size(59, 32),
      new google.maps.Point(0, 0),
      new google.maps.Point(16, 31),
    );
    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      shadow: shadow,
      icon: markerIcon,
    });
    arrayDistanceMarkers.push(marker);
    var path = distanceMarkerLine.getPath();
    path.push(event.latLng);
    distanceMarkerLine.setPath(path);
    markerIcon = null;
    marker = null;
    path = null;
    computeDistance();
    return false;
  };
}
function stopMeasureDistance() {
  // Distanzmessung beenden und alle Marker und Linien und Ergebnisanzeigen entfernen
  var len = arrayDistanceMarkers.length;
  for (var x = 0; x < len; x++) {
    arrayDistanceMarkers[0].setMap(null);
    arrayDistanceMarkers.shift();
  }
  var path = distanceMarkerLine.getPath();
  len = path.length;
  for (var y = 0; y < len; y++) {
    path.pop();
  }
  distanceMarkerLine.setPath(path);
  len = null;
  path = null;
  x = null;
  y = null;
  document.getElementById('measureDistance').style.display = 'none';
}
function computeDistance() {
  // Gesamtdistanz zwischen den Messpunkten bestimmen und anzeigen
  var len = arrayDistanceMarkers.length;
  if (len > 1) {
    var totalDistance = 0;
    for (var x = 1; x < len; x++) {
      totalDistance += google.maps.geometry.spherical.computeDistanceBetween(
        arrayDistanceMarkers[x - 1].position,
        arrayDistanceMarkers[x].position,
      );
    }
    x = null;
    document.getElementById('measureDistance').style.display = 'block';
    $('#measureDistance').html(
      '<b>' +
        'Total distance: ' +
        Math.round(totalDistance) +
        ' m</b><br />' +
        'End measurement with left click!',
    );
  }
  len = null;
}
function createTrackPolyline(points, ad, bSelected, bDimmed) {
  // Selektierte Tracks werden dicker gezeichnet:
  var lineWidth = 2;
  if (bSelected) lineWidth = 3;
  if (bDimmed) lineWidth = lineWidth - 1;
  if (ad == 'A') {
    // Parameter: Punkte-Array, Farbe der Polygon-Linie, Dicke der Linie in Punkten, Durchsichtigkeit (je naeher an 1, desto weniger durchsichtig)
    var opts = {
      map: map,
      path: points,
      strokeColor: '#E0001B',
      strokeWeight: lineWidth,
      zIndex: 3,
    };
    return new google.maps.Polyline(opts);
  } else {
    var opts = {
      map: map,
      path: points,
      strokeColor: '#0C65AA',
      strokeWeight: lineWidth,
      zIndex: 3,
    };
    return new google.maps.Polyline(opts);
  }
  lineWidth = null;
}
// Anzeige der Daten aktualisieren. Ist z.B. dann noetig, wenn die Selektion geaendert wurde.
function redrawData() {
  // Wenn kein Track selektiert ist, dann koennen auch keine Daten dazu angezeigt werden!
  // Dies kann zum Beispiel dann noetig sein, wenn ein Flug gelandet ist und damit vom Radar verschwindet -
  // dann sollen nicht weiterhin dessen Daten angezeigt werden.
  updateSelectedText(globalSystemTime); // Und auch die Routen neu laden:
  //XXXX	loadRoutesData( loadedRoutes);  //XXXX VORERST NICHT!
}
function clearTrackPolylineObject(track) {
  if (track.getPolyline() != null) {
    track.getPolyline().setMap(null);
    google.maps.event.clearInstanceListeners(track.getPolyline());
    track.setPolyline(null);
  }
  if (track.getCompletePolyline() != null) {
    track.getCompletePolyline().setMap(null);
    track.setCompletePolyline(null);
  }
}
function clearTrackMarkerObject(track) {
  if (track.getAirplaneIcon() != null) {
    track.getAirplaneIcon().setMap(null);
    google.maps.event.clearInstanceListeners(track.getAirplaneIcon());
    track.getAirplaneIcon().onRemove();
    track.setAirplaneIcon(null);
  }
}
function clearFlagRectObject(track) {
  var flagRect = track.getFlagRect();
  if (flagRect != null) {
    flagRect.slideUp(function() {
      if (!flagRect) return;
      // Kann waehrend des slideUp von der Garbage Collection abgeraeumt worden sein.
      flagRect.setMap(null);
      google.maps.event.clearInstanceListeners(flagRect);
      track.setFlagRect(null);
    });
  }
  flagRect = null;
}
function clearFlagRectObjectNMT(nmt) {
  var flagRect = nmt.getFlagRect();
  if (flagRect != null) {
    flagRect.slideUp(function() {
      if (!flagRect) return;
      // Kann waehrend des slideUp von der Garbage Collection abgeraeumt worden sein.
      flagRect.setMap(null);
      google.maps.event.clearInstanceListeners(flagRect);
      nmt.setFlagRect(null);
    });
  }
  flagRect = null;
}
function clearTrackPolylineObjects() {
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    // Polylines:
    if (arrayTracks[x] != null) {
      clearTrackPolylineObject(arrayTracks[x]);
      arrayTracks[x].setIndexLastVisiblePlot(-1);
      arrayTracks[x].setIndexFirstVisiblePlot(-1);
      arrayTracks[x].setIndexLastHeightAccess(0);
      arrayTracks[x].setPlotsBeforeStartTime(0);
    }
  }
  x = null;
  len = null;
}
function setTrackPolylineObjectsVisible(vis) {
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    // Polylines:
    if (arrayTracks[x] != null) {
      arrayTracks[x].setPolylineVisible(vis);
    }
  }
  x = null;
  len = null;
}
function clearTrackMarkerObjects() {
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    // Markers
    if (arrayTracks[x] != null) {
      clearTrackMarkerObject(arrayTracks[x]);
    }
  }
  x = null;
  len = null;
}
function clearTrackFlagRectObjects() {
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    // FlagRects
    if (arrayTracks[x] != null) {
      clearFlagRectObject(arrayTracks[x]);
    }
  }
  x = null;
  len = null;
}
function clearCompleteTrack(track) {
  clearTrackPolylineObject(track);
  clearTrackMarkerObject(track);
  clearFlagRectObject(track);
  track.setTrackData(null);
  track = null;
}
function clearTrackMapObjects(track) {
  clearTrackPolylineObject(track);
  clearTrackMarkerObject(track);
  clearFlagRectObject(track);
}
function clearAllTrackMapObjects() {
  clearTrackPolylineObjects();
  clearTrackMarkerObjects();
  clearTrackFlagRectObjects();
}
function clearAllTrackDataObjects() {
  // Track-Datenobjekte loeschen:
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    arrayTracks[x].setTrackData(null);
  }
  x = null;
  len = null;
}
function clearAllTrackData() {
  clearAllTrackMapObjects();
  clearAllTrackDataObjects();
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    arrayTracks[0] = null;
    arrayTracks.shift();
  }
  selectedTrack = -1;
  x = null;
  len = null;
}
function deselectAllNMTMarkers() {
  // Alle NMT-Daten loeschen:
  var len = arrayNMTs.length;
  for (var x = 0; x < len; x++) {
    arrayNMTs[x].setSelected(false);
  }
  x = null;
  len = null;
  selectedNMT = -1;
  HideWebReporting();
}
function deselectAllTracks() {
  // Alle NMT-Daten loeschen:
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    arrayTracks[x].setSelected(false);
  }
  x = null;
  len = null;
  selectedTrack = -1;
  updateSelectionInFlightTable();
}
function clearNMTMapObjects() {
  // Alle NMT-Daten loeschen:
  var len = arrayNMTs.length;
  for (var x = 0; x < len; x++) {
    if (arrayNMTs[x].getIconRect()) {
      arrayNMTs[x].getIconRect().setMap(null);
      google.maps.event.clearInstanceListeners(arrayNMTs[x].getIconRect());
      arrayNMTs[x].setIconRect(null);
      arrayNMTs[x].setIndexLastUsedLevel(0);
    }
  }
  x = null;
  len = null;
}
function clearNMTDataObjects() {
  // NMT-Datenobjekte loeschen:
  var len = arrayNMTs.length;
  for (var x = 0; x < len; x++) {
    arrayNMTs[0] = null;
    arrayNMTs.shift();
  }
  delete x;
  delete len;
}
function clearAllNMTData() {
  clearNMTMapObjects();
  clearNMTDataObjects();
  HideWebReporting();
}
function getDetails(flightTrack, sysTime) {
  arrayDetails = new Array();
  if (flightTrack == null || flightTrack.getTrackData() == null) return arrayDetails;
  var trackData = flightTrack.getTrackData();
  var label = '';
  var value = '';
  // CARRIER:
  label = 'Carrier:';
  value = trackData.getCarrier();
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // RUNWAY:
  label = 'Runway:';
  value = trackData.getRWY();
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // AIRPORT:
  if (trackData.getAD() == 'D') {
    label = 'To:';
  } else {
    label = 'From:';
  }
  if (trackData.getAirportName() != '') {
    value = trackData.getAirportName();
  }
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // ATD/ATA:
  if (trackData.getAD() == 'D') label = 'ATD:';
  else label = 'ATA:';
  value = trackData.getATT();
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // CALLSIGN:
  label = 'Callsign:';
  value = trackData.getCallsign();
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // CALLSIGN:
  label = 'Registration:';
  value = trackData.getRegistration();
  arrayDetails.push(new TrackDetails(label, value));
  value = '';
  // Gut, dass wir uns in loadFlightTrack den letzten Plot-Index gemerkt haben!
  var plots = trackData.getPlots();
  var lastPlot = plots[flightTrack.getIndexLastVisiblePlot()];
  // FLIGHT LEVEL:
  if (lastPlot) {
    var flightLevel = lastPlot.getFlightLevel();
    if (flightLevel < 100000 && flightLevel > -999) {
      label = 'Height:';
      value = flightLevel;
      if (flightLevel != '') {
        value += ' ft';
        // Zusaetzliche Anzeige in Metern:
        value += ' (';
        var flightLevelMeter = Math.round(flightLevel * 0.030479) * 10;
        value += flightLevelMeter;
        value += ' m)';
        flightLevelMeter = null;
      }
      flightLevel = null;
      arrayDetails.push(new TrackDetails(label, value));
      value = '';
    }
  }
  // SPEED:
  if (lastPlot) {
    var speed = lastPlot.getSpeed();
    label = 'Speed:';
    value = Math.round(speed);
    if (speed != '') {
      value += ' KN';
      // Zusaetzliche Anzeige in km/h:
      value += ' (';
      var speedKmH = Math.round(speed * 1.852);
      value += speedKmH;
      value += ' km/h)';
      speedKmH = null;
    }
    speed = null;
    arrayDetails.push(new TrackDetails(label, value));
    value = '';
  }
  // HEADING:
  if (lastPlot) {
    var head = lastPlot.getHeading();
    var headRound = Math.round(head);
    label = 'Heading:';
    value = headRound;
    if (head != '') {
      value += '&deg; (';
      value += headingToDirection(head) + ')';
    }
    head = null;
    headRound = null;
    arrayDetails.push(new TrackDetails(label, value));
    value = '';
  }
  // HEADING:
  if (lastPlot) {
    var dist = lastPlot.getDistanceToAirport();
    var distRound = Math.round(dist / 100) / 10;
    label = 'Distance airport:';
    value = distRound;
    if (dist != '') {
      value += ' km';
    }
    dist = null;
    distRound = null;
    arrayDetails.push(new TrackDetails(label, value));
  }
  plots = null;
  currentPlotIndex = null;
  lastPlot = null;
  trackData = null;
  label = null;
  value = null;
  return arrayDetails;
}
function getInfoString(flightTrack) {
  var infoText = '(no flightnumber)';
  if (flightTrack == null || flightTrack.getTrackData() == null) return infoText;
  var trackData = flightTrack.getTrackData();
  if (trackData.getFlightNo() != '') {
    infoText = trackData.getFlightNo();
  } else if (trackData.getCallsign() != '') {
    infoText = trackData.getCallsign();
  }
  if (trackData.getAirport() != '') {
    infoText = infoText + ' - ' + trackData.getAirport();
  }
  return infoText;
}
function getSelectedTrack() {
  if (selectedTrack >= 0) return arrayTracks[selectedTrack];
  return null;
}
function existsSelectedTrack() {
  return selectedTrack >= 0;
}
function setSelectedText(selText, selHead) {
  $('#container_selected_track_description').html(
    '<p><span class="basictext">' + selText + '</span></p>',
  );
  $('#container_selected_track_description2').html('');
  $('#container_title_seltrack').html(selHead);
}
function setSelectedData(arrValues, selHead) {
  var selTrackText = '';
  var len = arrValues.length;
  for (var x = 0; x < len; x++) {
    if (arrValues[x].getValue() != '') {
      if (arrValues[x].getHighlighted())
        selTrackText += "<div id='container_selected_track_label_highlight'>";
      else selTrackText += "<div id='container_selected_track_label'>";
      selTrackText += arrValues[x].getLabel();
      if (arrValues[x].getHighlighted())
        selTrackText += "</div><div id='container_selected_track_value_highlight'>";
      else selTrackText += "</div><div id='container_selected_track_value'>";
      selTrackText += arrValues[x].getValue();
      selTrackText += '</div>';
    }
  }
  $('#container_selected_track_description').html(selTrackText);
  $('#container_title_seltrack').html(selHead);
  selTrackText = null;
  len = null;
}
function setSelectedDataPart2(arrValues) {
  var selTrackText = '';
  var len = arrValues.length;
  for (var x = 0; x < len; x++) {
    if (arrValues[x].getValue() != '') {
      if (arrValues[x].getHighlighted())
        selTrackText += "<div id='container_selected_track_label_highlight'>";
      else selTrackText += "<div id='container_selected_track_label'>";
      selTrackText += arrValues[x].getLabel();
      if (arrValues[x].getHighlighted())
        selTrackText += "</div><div id='container_selected_track_value_highlight'>";
      else selTrackText += "</div><div id='container_selected_track_value'>";
      selTrackText += arrValues[x].getValue();
      selTrackText += '</div>';
    }
  }
  if (selTrackText != '') ShowSelectedText2();
  $('#container_selected_track_description2').html(selTrackText);
  selTrackText = null;
  len = null;
}
function updateSelectedText(t) {
  var selTrack = getSelectedTrack();
  if (selTrack != null) {
    var title = 'Flight';
    title += ': ';
    if (selTrack.getTrackData().getFlightNo() != '') title += selTrack.getTrackData().getFlightNo();
    else title += selTrack.getTrackData().getCallsign();
    setSelectedData(getDetails(selTrack, t), title);
    setSelectedDataPart2('');
    HideWebReporting();
    selTrack = null;
    title = null;
  } else {
    var selNMT = getSelectedNMT();
    if (selNMT != null) {
      var title = 'NMT' + ' ' + selNMT.getNmtId() + ' ' + replaceUmlaute(selNMT.getNmtName());
      setSelectedData(getDetailsNMTPart1(selNMT, t), title);
      setSelectedDataPart2(getDetailsNMTPart2(selNMT, t));
      ShowWebReporting();
      selNMT = null;
    } else {
      setSelectedText('', 'SELECTED TRACK/NMT');
    }
  }
}
function getDetailsNMTPart1(nmt, sysTime) {
  arrayDetails = new Array();
  var label = '';
  var value = '';
  var curDT = nmt.getDowntime(sysTime);
  var curLevel = nmt.getCurrentLevel();
  // H�HE:
  label = 'Height:';
  value = nmt.getHeight();
  value += ' meters';
  arrayDetails.push(new TrackDetails(label, value));
  // STATUS:
  label = 'Status:';
  if (curDT != null) value = 'Downtime';
  else if (curLevel > 20) value = 'Running';
  else value = 'No data';
  arrayDetails.push(new TrackDetails(label, value));
  if (curLevel > 20) {
    var nmtState = nmt.getNMTStateWithLevel(sysTime, curLevel);
    var colorSpan = '';
    switch (nmtState) {
      case NMTState.BelowThreshold:
        var colorSpan = "<span style='color:" + nmtChartBelowThresholdColor + "'><b>";
        break;
      case NMTState.AboveThreshold:
        var colorSpan = "<span style='color:" + nmtChartAboveThresholdColor + "'><b>";
        break;
      case NMTState.NoiseEvent:
        var colorSpan = "<span style='color:" + nmtChartNoiseEventColor + "'><b>";
        break;
      case NMTState.Error:
        var colorSpan = "<span style='color:" + nmtChartErrorColor + "'><b>";
        break;
      case NMTState.Downtime:
        var colorSpan = "<span style='color:" + nmtChartDowntimeColor + "'><b>";
        break;
      default:
        var colorSpan = "<span style='color:" + nmtChartStandardColor + "'><b>";
        break;
    }
    nmtState = null;
    label = '<br />Current level:';
    // Levelwert wird in der aktuellen NMT-Farbe (abh. vom Status) dargestellt!
    value = '<br />' + colorSpan + curLevel.toFixed(1);
    value += ' dB(A)' + '</b></span>';
    arrayDetails.push(new TrackDetails(label, value));
    colorSpan = null;
  }
  curLevel = null;
  curDT = null;
  return arrayDetails;
}
function getDetailsNMTPart2(nmt, sysTime) {
  arrayDetails = new Array();
  var label = '';
  var value = '';
  var curDT = nmt.getDowntime(sysTime);
  // NoiseEvents nicht in Ausfallzeiten anzeigen!
  if (curDT == null) {
    var curNE = nmt.getNoiseEvent(sysTime);
    if (curNE != null) {
      label = 'Flight Noise Event:';
      var curStartTime = new Date((curNE.getTStart() + offsetAirportToUTC) * 1000);
      value =
        timeToTimeString(
          curNE.getTStart() + offsetAirportToUTC + curStartTime.getTimezoneOffset() * 60,
        ) +
        ' - ' +
        timeToTimeString(
          curNE.getTStop() + offsetAirportToUTC + curStartTime.getTimezoneOffset() * 60,
        );
      var newDetails = new TrackDetails(label, value);
      newDetails.setHighlighted = true;
      arrayDetails.push(newDetails);
      newDetails = null;
      label = 'Maximum: ';
      value = curNE.getLasMax();
      value +=
        ' dB(A) - ' +
        timeToTimeString(
          curNE.getTLasMax() + offsetAirportToUTC + curStartTime.getTimezoneOffset() * 60,
        );
      arrayDetails.push(new TrackDetails(label, value));
      label = 'Aircraft type:';
      value = curNE.getACType();
      arrayDetails.push(new TrackDetails(label, value));
      curNE = null;
      curStartTime = null;
    }
  }
  if (curDT != null) {
    label = 'Downtime:';
    var curStartTime = new Date((curDT.getTBegin() + offsetAirportToUTC) * 1000);
    value =
      timeToTimeString(
        curDT.getTBegin() + offsetAirportToUTC + curStartTime.getTimezoneOffset() * 60,
      ) +
      ' - ' +
      timeToTimeString(
        curDT.getTEnd() + offsetAirportToUTC + curStartTime.getTimezoneOffset() * 60,
      );
    var newDetails = new TrackDetails(label, value);
    newDetails.setHighlighted = true;
    arrayDetails.push(newDetails);
    newDetails = null;
    curDT = null;
    curStartTime = null;
  }
  return arrayDetails;
}
function getCurrentHeightForFlight(track, currentTime) {
  var curHeight = 500000;
  if (track == null || track.getTrackData() == null) return curHeight;
  var plots = track.getTrackData().getPlots();
  var i;
  var roundedCurTime = Math.round(currentTime);
  var lastIndex = track.getIndexLastHeightAccess();
  for (i = lastIndex; i < plots.length; i++) {
    if (plots[i] != null) {
      var plotTime = Math.round(plots[i].getTimeValue());
      if (plotTime >= roundedCurTime) {
        // Vor dem ersten Plot oder genau erster Plot:
        if (i == 0) {
          if (plotTime > roundedCurTime) break;
          else {
            curHeight = parseFloat(plots[0].getFlightLevel());
            break;
          }
        }
        // Ab hier ist klar, dass i > 0 ist!
        var prevPlotTime = Math.round(plots[i - 1].getTimeValue());
        if (plotTime == roundedCurTime) {
          curHeight = parseFloat(plots[i].getFlightLevel());
          break;
        } else {
          var prevHeightValue = parseFloat(plots[i - 1].getFlightLevel());
          var curHeightValue = parseFloat(plots[i].getFlightLevel());
          curHeight =
            (curHeightValue * (roundedCurTime - prevPlotTime) +
              prevHeightValue * (plotTime - roundedCurTime)) /
            (plotTime - prevPlotTime);
          prevHeightValue = null;
          curHeightValue = null;
          break;
        }
        track.setIndexLastHeightAccess(i); // Merken, damit wir spaeter genau da mit der Suche beginnen koennen!
      }
    }
  }
  // Falls noch nix gefunden, nochmal ganz unten anfangen:
  if (curHeight >= 500000 && lastIndex > 0) {
    for (i = 0; i < lastIndex; i++) {
      if (plots[i] != null) {
        var plotTime = Math.round(plots[i].getTimeValue());
        if (plotTime >= roundedCurTime) {
          // Vor dem ersten Plot oder genau erster Plot:
          if (i == 0) {
            if (plotTime > roundedCurTime) break;
            else {
              curHeight = parseFloat(plots[0].getFlightLevel());
              break;
            }
          }
          // Ab hier ist klar, dass i > 0 ist!
          var prevPlotTime = Math.round(plots[i - 1].getTimeValue());
          if (plotTime == roundedCurTime) {
            curHeight = parseFloat(plots[i].getFlightLevel());
            break;
          } else {
            var prevHeightValue = parseFloat(plots[i - 1].getFlightLevel());
            var curHeightValue = parseFloat(plots[i].getFlightLevel());
            curHeight =
              (curHeightValue * (roundedCurTime - prevPlotTime) +
                prevHeightValue * (plotTime - roundedCurTime)) /
              (plotTime - prevPlotTime);
            prevHeightValue = null;
            curHeightValue = null;
            break;
          }
          track.setIndexLastHeightAccess(i); // Merken, damit wir spaeter genau da mit der Suche beginnen koennen!
        }
      }
    }
  }
  plots = null;
  roundedCurTime = null;
  i = null;
  lastIndex = null;
  if (curHeight > 100000 || curHeight < -999) curHeight = -1000;
  return Math.round(curHeight);
}
function getCurrentDistanceForFlight(track, currentTime) {
  var curDist = 500000;
  if (track == null || track.getTrackData() == null) return curDist;
  var plots = track.getTrackData().getPlots();
  var i;
  var roundedCurTime = Math.round(currentTime);
  var lastIndex = track.getIndexLastDistanceAccess();
  for (i = lastIndex; i < plots.length; i++) {
    if (plots[i] != null) {
      var plotTime = Math.round(plots[i].getTimeValue());
      if (plotTime >= roundedCurTime) {
        // Vor dem ersten Plot oder genau erster Plot:
        if (i == 0) {
          if (plotTime > roundedCurTime) break;
          else {
            curDist = parseFloat(plots[0].getDistanceToAirport());
            break;
          }
        }
        // Ab hier ist klar, dass i > 0 ist!
        var prevPlotTime = Math.round(plots[i - 1].getTimeValue());
        if (plotTime == roundedCurTime) {
          curDist = parseFloat(plots[i].getDistanceToAirport());
          break;
        } else {
          var prevDistValue = parseFloat(plots[i - 1].getDistanceToAirport());
          var curDistValue = parseFloat(plots[i].getDistanceToAirport());
          curDist =
            (curDistValue * (roundedCurTime - prevPlotTime) +
              prevDistValue * (plotTime - roundedCurTime)) /
            (plotTime - prevPlotTime);
          prevDistValue = null;
          curDistValue = null;
          break;
        }
        track.setIndexLastDistanceAccess(i); // Merken, damit wir spaeter genau da mit der Suche beginnen koennen!
      }
    }
  }
  // Falls noch nix gefunden, nochmal ganz unten anfangen:
  if (curDist >= 500000 && lastIndex > 0) {
    for (i = 0; i < lastIndex; i++) {
      if (plots[i] != null) {
        var plotTime = Math.round(plots[i].getTimeValue());
        if (plotTime >= roundedCurTime) {
          // Vor dem ersten Plot oder genau erster Plot:
          if (i == 0) {
            if (plotTime > roundedCurTime) break;
            else {
              curDist = parseFloat(plots[0].getDistanceToAirport());
              break;
            }
          }
          // Ab hier ist klar, dass i > 0 ist!
          var prevPlotTime = Math.round(plots[i - 1].getTimeValue());
          if (plotTime == roundedCurTime) {
            curDist = parseFloat(plots[i].getDistanceToAirport());
            break;
          } else {
            var prevDistValue = parseFloat(plots[i - 1].getDistanceToAirport());
            var curDistValue = parseFloat(plots[i].getDistanceToAirport());
            curDist =
              (curDistValue * (roundedCurTime - prevPlotTime) +
                prevDistValue * (plotTime - roundedCurTime)) /
              (plotTime - prevPlotTime);
            prevDistValue = null;
            curDistValue = null;
            break;
          }
          track.setIndexLastDistanceAccess(i); // Merken, damit wir spaeter genau da mit der Suche beginnen koennen!
        }
      }
    }
  }
  plots = null;
  roundedCurTime = null;
  i = null;
  lastIndex = null;
  if (curDist > 1000000 || curDist < -999) curDist = -1000;
  return Math.round(curDist);
}
function getSelectedNMT() {
  if (selectedNMT >= 0) return arrayNMTs[selectedNMT];
  return null;
}
function getNMTUnderCursor() {
  return null;
}
function existsSelectedNMT() {
  return selectedNMT >= 0;
}
function timeToString(intTimeInSeconds) {
  var time = new Date(intTimeInSeconds * 1000);
  var stringTime = '';
  if (time.getDate() < 10) stringTime += '0';
  stringTime += time.getDate() + '.';
  if (time.getMonth() < 9) stringTime += '0';
  stringTime += time.getMonth() + 1 + '.';
  stringTime += time.getFullYear() + ' ';
  if (time.getHours() < 10) stringTime += '0';
  stringTime += time.getHours() + ':';
  if (time.getMinutes() < 10) stringTime += '0';
  stringTime += time.getMinutes() + ':';
  if (time.getSeconds() < 10) stringTime += '0';
  stringTime += time.getSeconds();
  time = null;
  return stringTime;
}
function timeToTimeString(intTimeInSeconds) {
  var time = new Date(intTimeInSeconds * 1000);
  var stringTime = '';
  if (time.getHours() < 10) stringTime += '0';
  stringTime += time.getHours() + ':';
  if (time.getMinutes() < 10) stringTime += '0';
  stringTime += time.getMinutes() + ':';
  if (time.getSeconds() < 10) stringTime += '0';
  stringTime += time.getSeconds();
  time = null;
  return stringTime;
}
function timeToTimeStringNoSeconds(intTimeInSeconds) {
  var time = new Date(intTimeInSeconds * 1000);
  var stringTime = '';
  if (time.getHours() < 10) stringTime += '0';
  stringTime += time.getHours() + ':';
  if (time.getMinutes() < 10) stringTime += '0';
  stringTime += time.getMinutes();
  time = null;
  return stringTime;
}
function headingToDirection(h) {
  var dir = '';
  if (h > 348.75 || h <= 11.25) dir = 'N';
  else if (h <= 33.75) dir = 'NNE';
  else if (h <= 56.25) dir = 'NE';
  else if (h <= 78.75) dir = 'ENE';
  else if (h <= 101.25) dir = 'E';
  else if (h <= 123.75) dir = 'ESE';
  else if (h <= 146.25) dir = 'SE';
  else if (h <= 168.75) dir = 'SSE';
  else if (h <= 191.25) dir = 'S';
  else if (h <= 213.75) dir = 'SSW';
  else if (h <= 236.25) dir = 'SW';
  else if (h <= 258.75) dir = 'WSW';
  else if (h <= 281.25) dir = 'W';
  else if (h <= 303.75) dir = 'WNW';
  else if (h <= 326.25) dir = 'NW';
  else if (h <= 348.75) dir = 'NNW';
  return dir;
}
function getCurrentSystemTime() {
  var systemTime;
  var serverTime = getCurrentTime();
  if (
    currentState == TWState.Historical ||
    currentState == TWState.LiveDelayed ||
    currentState == TWState.Paused
  ) {
    systemTime = historicStartTime;
    if (serverTime > historicStartServerTime) {
      // Aktuelle Pause zur Gesamtpausenlaenge addieren:
      var curPause = 0;
      if (currentState == TWState.Paused && serverTime > pauseStartTime) {
        curPause = serverTime - pauseStartTime;
      }
      systemTime =
        systemTime +
        (serverTime - historicStartServerTime - currentPauseLength - curPause) * replaySpeed;
    }
  } else {
    systemTime = serverTime;
  }
  serverTime = null;
  return systemTime;
}
function systemTime2FullString(sysTime) {
  var currentTime = new Date((sysTime + offsetAirportToUTC) * 1000);
  return timeToString(sysTime + offsetAirportToUTC + currentTime.getTimezoneOffset() * 60);
}
function systemTime2TimePartString(sysTime) {
  var currentTime = new Date((sysTime + offsetAirportToUTC) * 1000);
  return timeToTimeString(sysTime + offsetAirportToUTC + currentTime.getTimezoneOffset() * 60);
}
function updateCurrentSystemTime(t) {
  // Anzeige der aktuellen Systemzeit aktualisieren:
  set_status_time_string('System time: ' + t);
}
function HideSelectedText2() {
  $('#container_selected_track_description2').slideUp(); //	document.getElementById("container_selected_track_description2").style.display = "none";
}
function ShowSelectedText2() {
  $('#container_selected_track_description2').slideDown(); //	document.getElementById("container_selected_track_description2").style.display = "block";
}
function HideWebReporting() {
  document.getElementById('idStatistik').style.display = 'none';
  document.getElementById('container_webreport').style.display = 'none';
}
function ShowWebReporting() {
  document.getElementById('idStatistik').style.display = 'block';
  document.getElementById('container_webreport').style.display = 'block';
}
function updateSystemStatus(t) {}
function updateProfileDistanceTab() {
  var canShowClimbProfile = false;
  var canShowClosestApproach = false;
  var canShowAircraftPicture = false;
  var numofFlightDisplays = 0;
  canShowClimbProfile = true;
  numofFlightDisplays++;
  canShowClosestApproach = true;
  numofFlightDisplays++;
  canShowAircraftPicture = true;
  numofFlightDisplays++;
  var aTrackIsSelected = existsSelectedTrack();
  if (numofFlightDisplays > 1) {
    numofFlightDisplays = 0;
    if (canShowClimbProfile && aTrackIsSelected) {
      document.getElementById('p2tabsecond0').style.display = 'block';
      numofFlightDisplays++;
    } else document.getElementById('p2tabsecond0').style.display = 'none';
    if (canShowClosestApproach && aTrackIsSelected && homeMarker) {
      document.getElementById('p2tabsecond1').style.display = 'block';
      numofFlightDisplays++;
    } else document.getElementById('p2tabsecond1').style.display = 'none';
    if (canShowAircraftPicture && aTrackIsSelected) {
      document.getElementById('p2tabsecond2').style.display = 'block';
      numofFlightDisplays++;
    } else document.getElementById('p2tabsecond2').style.display = 'none';
  }
  if (numofFlightDisplays < 2) {
    document.getElementById('p2tabsecond0').style.display = 'none';
    document.getElementById('p2tabsecond1').style.display = 'none';
    document.getElementById('p2tabsecond2').style.display = 'none';
  }
  canShowClimbProfile = null;
  canShowClosestApproach = null;
  canShowAircraftPicture = null;
  numofFlightDisplays = null;
  aTrackIsSelected = null;
}
function getCurrentTime() {
  var currentTime = new Date();
  return currentTime.getTime() / 1000;
}
function getQuadrant(point, center) {
  var quadrant = 0;
  if (point.lat() > center.lat() && point.lng() > center.lng()) {
    quadrant = 1;
  }
  if (point.lat() > center.lat() && point.lng() < center.lng()) {
    quadrant = 2;
  }
  if (point.lat() < center.lat() && point.lng() < center.lng()) {
    quadrant = 3;
  }
  if (point.lat() < center.lat() && point.lng() > center.lng()) {
    quadrant = 4;
  }
  return quadrant;
}
function getPointOnArc(longitude, upperBorderLatitude, lowerBorderLatitude, center, radius) {
  var lastDistance = 100000;
  var bestPoint = center;
  var i = 0;
  while (lastDistance > 0.001 && i < 100) {
    var upperPoint = new google.maps.LatLng(upperBorderLatitude, longitude);
    var distanceAtUpperBorder = Math.abs(upperPoint.distanceFrom(center));
    var lowerPoint = new google.maps.LatLng(lowerBorderLatitude, longitude);
    var distanceAtLowerBorder = Math.abs(lowerPoint.distanceFrom(center));
    var middlePoint = new google.maps.LatLng(
      (upperBorderLatitude + lowerBorderLatitude) / 2,
      longitude,
    );
    var distanceAtMiddle = Math.abs(middlePoint.distanceFrom(center));
    // 1. Fall: Gesuchter Punkt liegt zwischen Upper und Middle -> dann muss der Radius des Kreises in diesem Bereich liegen
    if (
      (distanceAtUpperBorder < radius && distanceAtMiddle > radius) ||
      (distanceAtUpperBorder > radius && distanceAtMiddle < radius)
    ) {
      lowerBorderLatitude = middlePoint.lat();
      if (distanceAtUpperBorder < distanceAtMiddle) {
        lastDistance = Math.abs(distanceAtUpperBorder - radius);
        bestPoint = upperPoint;
      } else {
        lastDistance = Math.abs(distanceAtMiddle - radius);
        bestPoint = middlePoint;
      }
    } else if (
      (distanceAtLowerBorder < radius && distanceAtMiddle > radius) ||
      (distanceAtLowerBorder > radius && distanceAtMiddle < radius)
    ) {
      upperBorderLatitude = middlePoint.lat();
      if (distanceAtLowerBorder < distanceAtMiddle) {
        lastDistance = Math.abs(distanceAtLowerBorder - radius);
        bestPoint = lowerPoint;
      } else {
        lastDistance = Math.abs(distanceAtMiddle - radius);
        bestPoint = middlePoint;
      }
    } else {
    }
    upperPoint = null;
    i++;
  }
  if (i >= 100) bestPoint = center;
  lastDistance = null;
  distanceAtUpperBorder = null;
  lowerPoint = null;
  distanceAtLowerBorder = null;
  middlePoint = null;
  distanceAtMiddle;
  return bestPoint;
}
function getPointOnExtendedArc(
  newPoint,
  dSteigungGerade,
  targetDistance,
  negativeDirection,
  centerArc,
) {
  var stepWidth = 0.01;
  if (negativeDirection) stepWidth = -0.01;
  var bestPoint = new google.maps.LatLng(
    newPoint.lat() + dSteigungGerade * stepWidth,
    newPoint.lng() + stepWidth,
  );
  var currentDistance = Math.abs(newPoint.distanceFrom(bestPoint));
  bestPoint = new google.maps.LatLng(
    newPoint.lat() + (dSteigungGerade * stepWidth * targetDistance) / currentDistance,
    newPoint.lng() + (stepWidth * targetDistance) / currentDistance,
  );
  stopWidth = null;
  currentDistance = null;
  return bestPoint;
}
function GetMaxDiffLongitude(centerArc, radius) {
  var curLongitude = centerArc.lng();
  var curPoint = new google.maps.LatLng(centerArc.lat(), curLongitude);
  var lastStep = 0.1;
  var lastDistance = curPoint.distanceFrom(centerArc) - radius;
  while (Math.abs(lastDistance) > 0.001) {
    if (lastDistance < 0) curLongitude = curLongitude + lastStep;
    else curLongitude = curLongitude - lastStep;
    curPoint = new google.maps.LatLng(centerArc.lat(), curLongitude);
    lastDistance = curPoint.distanceFrom(centerArc) - radius;
    lastStep = lastStep / 2;
  }
  curPoint = null;
  lastStep = null;
  lastDistance = null;
  return Math.abs(curLongitude - centerArc.lng());
}
function GetMaxDiffLatitude(centerArc, radius) {
  var curLatitude = centerArc.lat();
  var curPoint = new google.maps.LatLng(curLatitude, centerArc.lng());
  var lastStep = 0.1;
  var lastDistance = curPoint.distanceFrom(centerArc) - radius;
  while (Math.abs(lastDistance) > 0.001) {
    if (lastDistance < 0) curLatitude = curLatitude + lastStep;
    else curLatitude = curLatitude - lastStep;
    curPoint = new google.maps.LatLng(curLatitude, centerArc.lng());
    lastDistance = curPoint.distanceFrom(centerArc) - radius;
    lastStep = lastStep / 2;
  }
  curPoint = null;
  lastStep = null;
  lastDistance = null;
  return Math.abs(curLatitude - centerArc.lat());
}
// Bestimmt den Drehwinkel des uebergebenen Kurvenpunktes im uebergebenenen Quadranten (Ergebnis kann also maximal 90 Grad sein!)
function getTurnAngleInQuadrant(point, center, quadrant, isTurnRight) {
  // Bilde ein rechtwinkliges Dreieck zwischen Koordinaten-Mittelpunkt, Startpunkt (bzw. Endpunkt) und dem
  // auf die X-Achse (in Hoehe des Mittelpunktes) projizierten Startpunktes (bzw. Endpunktes)
  // Damit kann man die Kurvenwinkel am Start- bzw. Endpunkt bestimmen
  var projectionPoint = new google.maps.LatLng(center.lat(), point.lng());
  if (quadrant == 1 || quadrant == 3)
    projectionPoint = new google.maps.LatLng(point.lat(), center.lng());
  var ankathete = projectionPoint.distanceFrom(center);
  var gegenkathete = projectionPoint.distanceFrom(point);
  var angle = (Math.atan(gegenkathete / ankathete) / Math.PI) * 180;
  projectionPoint = null;
  ankathete = null;
  gegenkathete = null;
  // Bei Linkskurven ist es genau anders rum, also der Restwinkel bis 90 Grad!
  if (!isTurnRight) angle = 90 - angle;
  return angle;
}
function setDebugText(text) {
  $('#container_help').html(text);
}
function appendDebugText(text) {
  document.getElementById('container_help').innerHTML += text;
}
function downloadUrl(url, callback) {
  var request = window.ActiveXObject
    ? new ActiveXObject('Microsoft.XMLHTTP')
    : new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      callback(request.responseText, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}
function xmlParse(str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }
  if (typeof DOMParser != 'undefined') {
    return new DOMParser().parseFromString(str, 'text/xml');
  }
  return createElement('div', null);
}
function replaceUmlaute(str) {
  var newString = str.replace(/�/g, '&auml;');
  newString = newString.replace(/�/g, '&ouml;');
  newString = newString.replace(/�/g, '&uuml;');
  newString = newString.replace(/�/g, '&Auml;');
  newString = newString.replace(/�/g, '&Ouml;');
  newString = newString.replace(/�/g, '&Uuml;');
  newString = newString.replace(/�/g, '&szlig;');
  return newString;
}
function utcToAirportTimePlusLocal(time) {
  time = time + offsetAirportToUTC;
  var currentTime = new Date(time * 1000);
  time = time + currentTime.getTimezoneOffset() * 60;
  currentTime = null;
  return time;
}
function buildFilenameForNMTIcon(nmt, sysTime) {
  var iconUrl = './images/';
  var nmtStatus = nmt.getNMTState(sysTime);
  if (nmtStatus != NMTState.Unknown) {
    switch (nmtStatus) {
      case NMTState.Downtime:
        iconUrl += 'nmtGrau';
        break;
      case NMTState.NoiseEvent:
        iconUrl += 'nmtOrange';
        break;
      case NMTState.BelowThreshold:
        iconUrl += 'nmtGruen';
        break;
      case NMTState.AboveThreshold:
        iconUrl += 'nmtGelb';
        break;
      case NMTState.Error:
        iconUrl += 'nmtRot';
        break;
      default:
        iconUrl += 'nmtGruen';
        break;
    }
  } else {
    var currentNE = nmt.getNoiseEvent(sysTime);
    var currentDT = nmt.getDowntime(sysTime);
    if (currentDT != null) iconUrl += 'nmtGrauSmall';
    else if (currentNE != null) iconUrl += 'nmtOrangeSmall';
    else if (nmt.getNmtStatus() & 2) iconUrl += 'nmtRotSmall';
    else if (nmt.getNmtStatus() & 4) iconUrl += 'nmtGelbSmall';
    else iconUrl += 'nmtTuerkisSmall';
  }
  nmtStatus = null;
  if (nmt.isSelected()) iconUrl += 'Selected';
  iconUrl += '.png';
  return iconUrl;
}
function timeToServerString(t) {
  // Zun�chst die FRAPORT-Zeit in aktuelle Zeit umrechnen, damit das anschlie�end erzeugte Date-Objekt die richtige Zeit erzeugt!
  t += offsetAirportToUTC;
  var currentTime = new Date(t * 1000);
  t += currentTime.getTimezoneOffset() * 60;
  currentTime = null;
  var d = new Date(t * 1000);
  var s = '';
  var mon = d.getMonth() + 1;
  if (d.getDate() < 10) s += '0';
  s += d.getDate() + '-';
  if (mon < 10) s += '0';
  s += mon + '-' + d.getFullYear() + ' ';
  if (d.getHours() < 10) s += '0';
  s += d.getHours() + ':';
  if (d.getMinutes() < 10) s += '0';
  s += d.getMinutes() + ':';
  if (d.getSeconds() < 10) s += '0';
  s += d.getSeconds();
  d = null;
  mon = null;
  return s;
}
function setCheckValue(strControlID, check) {
  if (document.getElementById(strControlID)) {
    document.getElementById(strControlID).setProperty('checked', check);
    FancyForm.update(document.getElementById(strControlID).getParent());
  }
}
function getCheckValue(strControlID) {
  var ret = false;
  if (document.getElementById(strControlID))
    ret = document.getElementById(strControlID).getProperty('checked');
  return ret;
}
function openWebReporting(modeParam) {
  var url = 'https://travisltn.topsonic.aero/WebReport/mst.php';
  if (selectedNMT >= 0) {
    var selNMT = getSelectedNMT();
    url = 'https://travisltn.topsonic.aero/WebReport/mst.php?nmtid=';
    url += selNMT.getNmtId();
    selNMT = null;
    if (modeParam != '') url += '&' + modeParam;
  } else {
    if (modeParam != '') url += '?' + modeParam;
  }
  window.open(url, '_blank');
  url = null;
}
function closeNmtHelp() {
  document.getElementById('nmtHelpContainer').style.display = 'none';
}
function closeHomePanel() {
  $('#homePanel').fadeOut('fast');
}
function complaintStartSpecific() {
  if (
    document.getElementById('complPrename').value.trim().length == 0 ||
    document.getElementById('complName').value.trim().length == 0 ||
    document.getElementById('complTel').value.trim().length == 0 ||
    document.getElementById('complMail').value.trim().length == 0 ||
    document.getElementById('complStreet').value.trim().length == 0 ||
    document.getElementById('complPostcode').value.trim().length == 0 ||
    document.getElementById('complCity').value.trim().length == 0
  ) {
    var dialog = $('<div>Please fill in all fields that are marked with an asterisk.</div>').dialog(
      {
        title: 'Complaint',
        height: 150,
        modal: true,
        show: {
          effect: 'blind',
          duration: 500,
        },
        buttons: [
          {
            text: 'OK',
            click: function() {
              dialog.remove();
              dialog = null;
            },
          },
        ],
      },
    );
  } else {
    // Adresse suchen:
    showComplainerAddress();
    $('#complaintPageStart').fadeOut('slow', function() {
      $('#complaintPageSpecific').fadeIn('slow');
    });
    complaintParams.setCurrentComplaintType(ComplaintType.Specific);
  }
}
function complaintStartGeneral() {
  if (
    document.getElementById('complPrename').value.trim().length == 0 ||
    document.getElementById('complName').value.trim().length == 0 ||
    document.getElementById('complTel').value.trim().length == 0 ||
    document.getElementById('complMail').value.trim().length == 0 ||
    document.getElementById('complStreet').value.trim().length == 0 ||
    document.getElementById('complPostcode').value.trim().length == 0 ||
    document.getElementById('complCity').value.trim().length == 0
  ) {
    var dialog = $('<div>Please fill in all fields that are marked with an asterisk.</div>').dialog(
      {
        title: 'Complaint',
        height: 150,
        modal: true,
        show: {
          effect: 'blind',
          duration: 500,
        },
        buttons: [
          {
            text: 'OK',
            click: function() {
              dialog.remove();
              dialog = null;
            },
          },
        ],
      },
    );
  } else {
    // Adresse suchen:
    showComplainerAddress();
    $('#complaintPageStart').fadeOut('slow', function() {
      $('#complaintPageGeneral').fadeIn('slow');
    });
    complaintParams.setCurrentComplaintType(ComplaintType.General);
  }
}
function complaintSpecificSummary() {
  if (document.getElementById('datefieldComplaintSpecific').value.trim().length == 0) {
    var dialog = $('<div>Please fill in all fields that are marked with an asterisk.</div>').dialog(
      {
        title: 'Complaint',
        height: 150,
        modal: true,
        show: {
          effect: 'blind',
          duration: 500,
        },
        buttons: [
          {
            text: 'OK',
            click: function() {
              dialog.remove();
              dialog = null;
            },
          },
        ],
      },
    );
  } else {
    var textSummary = '';
    $('#container_first_title_complaint_summary').html('Summary flight complaint');
    textSummary +=
      '<b>NAME:</b> ' +
      document.getElementById('complPrename').value +
      ' ' +
      document.getElementById('complName').value +
      '<br />';
    textSummary += '<b>PHONE:</b> ' + document.getElementById('complTel').value + '<br />';
    textSummary += '<b>EMAIL:</b> ' + document.getElementById('complMail').value + '<br />';
    textSummary +=
      '<b>ADDRESS:</b> ' +
      document.getElementById('complStreet').value +
      ', ' +
      document.getElementById('complPostcode').value +
      ' ' +
      document.getElementById('complCity').value +
      '<br /><br />';
    textSummary +=
      '<b>TIME OF DISTURBANCE:</b><br />' +
      document.getElementById('datefieldComplaintSpecific').value +
      '<br />';
    textSummary +=
      '<b>TYPE OF DISTURBANCE:</b><br />' +
      $('#k-complaintTypeSpecific :selected').text() +
      '<br />';
    textSummary +=
      '<b>FLIGHT:</b> ' +
      document.getElementById('complaintSpecificSelectedFlightField').value +
      '<br />';
    textSummary +=
      '<b>ANSWER:</b> ' + $('#k-responseFormatSpecific :selected').text() + '<br /><br />';
    textSummary +=
      '<b>DESCRIPTION:</b><br />' + document.getElementById('complaintDescriptionSpecific').value;
    $('#complaintSummary').html(textSummary);
    $('#complaintPageSpecific').fadeOut('slow', function() {
      $('#complaintPageSummary').fadeIn('slow');
    });
    textSummary = null;
  }
}
function complaintGeneralSummary() {
  var textSummary = '';
  $('#container_first_title_complaint_summary').html('Summary general complaint');
  textSummary +=
    '<b>NAME:</b> ' +
    document.getElementById('complPrename').value +
    ' ' +
    document.getElementById('complName').value +
    '<br />';
  textSummary += '<b>PHONE:</b> ' + document.getElementById('complTel').value + '<br />';
  textSummary += '<b>EMAIL:</b> ' + document.getElementById('complMail').value + '<br />';
  textSummary +=
    '<b>ADDRESS:</b> ' +
    document.getElementById('complStreet').value +
    ', ' +
    document.getElementById('complPostcode').value +
    ' ' +
    document.getElementById('complCity').value +
    '<br /><br />';
  textSummary +=
    '<b>TYPE OF DISTURBANCE:</b><br />' + $('#k-complaintTypeGeneral :selected').text() + '<br />';
  textSummary +=
    '<b>ANSWER:</b> ' + $('#k-responseFormatGeneral :selected').text() + '<br /><br />';
  textSummary +=
    '<b>DESCRIPTION:</b><br />' + document.getElementById('complaintDescriptionGeneral').value;
  $('#complaintSummary').html(textSummary);
  $('#complaintPageGeneral').fadeOut('slow', function() {
    $('#complaintPageSummary').fadeIn('slow');
  });
  textSummary = null;
}
function complaintSpecificBackToStart() {
  $('#complaintPageSpecific').fadeOut('slow', function() {
    $('#complaintPageStart').fadeIn('slow');
  });
  complaintParams.setCurrentComplaintType(ComplaintType.Unknown);
}
function complaintGeneralBackToStart() {
  $('#complaintPageGeneral').fadeOut('slow', function() {
    $('#complaintPageStart').fadeIn('slow');
  });
  complaintParams.setCurrentComplaintType(ComplaintType.Unknown);
}
function complaintSummaryBackToStart() {
  $('#complaintPageSummary').fadeOut('slow', function() {
    $('#complaintPageStart').fadeIn('slow');
  });
  complaintParams.setCurrentComplaintType(ComplaintType.Unknown);
}
function complaintSummaryBackToSpecific() {
  $('#complaintPageSummary').fadeOut('slow', function() {
    $('#complaintPageSpecific').fadeIn('slow');
  });
}
function complaintSummaryBackToGeneral() {
  $('#complaintPageSummary').fadeOut('slow', function() {
    $('#complaintPageGeneral').fadeIn('slow');
  });
}
function complaintSubmit() {
  // Absenden der Beschwerde!
  // Dazu starten wir ein PHP-Skript, dem wir alle eingegebenen Daten �bergeben, damit diese in die Datenbank geschrieben werden k�nnen
  var request;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    alert(
      unescape(
        'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
      ),
    );
    return;
  }
  if (request) {
    try {
      // Urspruenglich so geplant:
      // var daten = new FormData(); .....
      // FormData gibt's aber im IE erst ab Version 10  :-(
      var daten = '';
      daten += 'firstname=' + document.getElementById('complPrename').value;
      daten += '&name=' + document.getElementById('complName').value;
      daten += '&tel=' + document.getElementById('complTel').value;
      daten += '&mail=' + document.getElementById('complMail').value;
      daten += '&street=' + document.getElementById('complStreet').value;
      daten += '&address2=' + document.getElementById('complAddress2').value;
      daten += '&postcode=' + document.getElementById('complPostcode').value;
      daten += '&city=' + document.getElementById('complCity').value;
      daten += '&lat=' + homePosition.lat().toFixed(6);
      daten += '&lon=' + homePosition.lng().toFixed(6);
      if (getCheckValue('idSendConfirmMail')) daten += '&sendconfirm=1';
      else daten += '&sendconfirm=0';
      if (getCheckValue('idContactAllowed')) daten += '&contactAllowed=1';
      else daten += '&contactAllowed=0';
      if (complaintParams.getCurrentComplaintType() == ComplaintType.Specific) {
        daten += '&type=' + 'specific';
        daten +=
          '&time=' +
          timeStringToDateTime(document.getElementById('datefieldComplaintSpecific').value);
        if (complaintParams.getSelectedTrack() && complaintParams.getSelectedTrack().getTrackData())
          daten +=
            '&flight=' +
            complaintParams
              .getSelectedTrack()
              .getTrackData()
              .getFlightID();
        daten += '&spectype=' + document.getElementById('k-complaintTypeSpecific').value;
        daten += '&answer=' + document.getElementById('k-responseFormatSpecific').value;
        daten +=
          '&description=' +
          encodeURIComponent(document.getElementById('complaintDescriptionSpecific').value);
      } else {
        daten += '&type=' + 'general';
        daten += '&spectype=' + document.getElementById('k-complaintTypeGeneral').value;
        daten += '&answer=' + document.getElementById('k-responseFormatGeneral').value;
        daten +=
          '&description=' +
          encodeURIComponent(document.getElementById('complaintDescriptionGeneral').value);
      }
      daten = encodeURI(daten);
      //XXX			alert( travisOptions.getServerPath() + 'saveComplaintData.php?' + daten);
      request.open('GET', travisOptions.getServerPath() + 'saveComplaintData.php?' + daten, true);
    } catch (e) {
      alert(unescape('Problem Communicating with Server\n' + e));
    }
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        // Rueckgabe-XML parsen:
        var xmlData = xmlParse(request.responseText);
        if (xmlData) {
          var data = xmlData.getElementsByTagName('data');
          if (data.length > 0) {
            var returnValue = data[0].getElementsByTagName('return');
            if (returnValue.length > 0 && returnValue[0].firstChild.nodeValue == '1') {
              $('#complaintPageSummary').fadeOut('slow', function() {
                $('#complaintPageEnd').fadeIn('slow');
              });
            } else {
              // Im Fehlerfall den Anwender benachrichtigen
              var dialog = $(
                '<div>The system is unable to save your complaint. Please try again!</div>',
              ).dialog({
                title: 'Complaint',
                height: 150,
                modal: true,
                show: {
                  effect: 'blind',
                  duration: 500,
                },
                buttons: [
                  {
                    text: 'OK',
                    click: function() {
                      dialog.remove();
                      dialog = null;
                    },
                  },
                ],
              });
            }
          }
        }
      }
    };
    // HTTP-Request abschicken!
    try {
      request.send();
    } catch (e) {
      alert(unescape('Problem Sending to Server\n' + e));
    }
  }
}
function complaintEnd() {
  // Nach erfolgreicher Speicherung der Beschwerdedaten alle Eingabefelder leeren und Beschwerdeeingabe zuruecksetzen
  complaintParams.setCurrentComplaintType(ComplaintType.Unknown);
  showComplaintFlightsSlider(false);
  $('#complaintPageEnd').fadeOut('slow', function() {
    $('#complaintPageStart').fadeIn('slow');
  });
  $('#complaintPanel').animate({ width: 'toggle' }, 400);
  currentOpenLeftPanel = null;
  $('#complaintLink').css('backgroundImage', 'url(images/complaint.png)');
  complaintParams.setActive(false);
  start_live_action(); // In den Live-Modus zur�ckwechseln!
}
function complaintContinue() {
  $('#complaintPageEnd').fadeOut('slow', function() {
    $('#complaintPageStart').fadeIn('slow');
  });
  complaintParams.setCurrentComplaintType(ComplaintType.Unknown);
}
function showComplainerAddress() {
  var geocoder = new google.maps.Geocoder();
  var address =
    $('#complStreet').val() +
    ' ' +
    $('#complAddress2').val() +
    ' ' +
    $('#complPostcode').val() +
    ' ' +
    $('#complCity').val();
  geocoder.geocode(
    {
      address: address,
      region: 'de',
    },
    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        homePositionChanged(results[0].geometry.location);
        show_home_location(true);
      } else {
        if (status == google.maps.GeocoderStatus.ZERO_RESULTS)
          alert(
            unescape(
              "TraVis could'nt find your address - please check completeness and correct spelling!",
            ),
          );
        else alert(unescape("TraVis could'nt start the address lookup. Please try again later!"));
      }
    },
  );
  geocoder = null;
  address = null;
}
function loadComplaintFlights() {
  $('#complaintSpecificSelectedFlightField').val('');
  // Eingegebene Zeit in Systemzeit umwandeln
  if (!convertInputToStartDateTime(document.getElementById('datefieldComplaintSpecific').value))
    return;
  // Vorerst keine aktuellen Zeiten mehr bestimmen! Wir starten gerade was Neues.
  stopTimeCalculation = true;
  // Alles anhalten, damit es kein Durcheinander gibt!
  stopAllTimerFunctions();
  // W�hrend des Ladevorgangs sollen keine Wetterdaten geladen werden!
  doNotLoadWeather = true;
  complaintParams.setLastOffset(travisOptions.getFlightComplaintReplayPeriod());
  complaintParams.setTBegin(historicStartTime - travisOptions.getFlightComplaintReplayPeriod());
  complaintParams.setTEnd(historicStartTime + travisOptions.getFlightComplaintReplayPeriod());
  complaintParams.setComplaintFlightsRunning(true);
  // Neue historische Systemzeit muss vor dem Starten ermittelt werden!
  currentState = TWState.Historical;
  updateSystemTime();
  start_archive_action();
  var currentStartTime = new Date(complaintParams.getTBegin() * 1000);
  $('#complaintSliderTimeLeft').html(
    timeToTimeStringNoSeconds(
      historicStartTime +
        currentStartTime.getTimezoneOffset() * 60 -
        travisOptions.getFlightComplaintReplayPeriod(),
    ),
  );
  $('#complaintSliderTimeMiddle').html(
    timeToTimeStringNoSeconds(historicStartTime + currentStartTime.getTimezoneOffset() * 60),
  );
  $('#complaintSliderTimeRight').html(
    timeToTimeStringNoSeconds(
      historicStartTime +
        currentStartTime.getTimezoneOffset() * 60 +
        travisOptions.getFlightComplaintReplayPeriod(),
    ),
  );
  showComplaintFlightsSlider(true);
  doNotLoadWeather = false;
}
function showComplaintFlightsSlider(b) {
  if (b) {
    $('#sliderComplaintFlights').slider('value', travisOptions.getFlightComplaintReplayPeriod());
    $('#sliderComplaintFlights').fadeIn();
    $('#complaintSliderTimeLeft').fadeIn();
    $('#complaintSliderTimeMiddle').fadeIn();
    $('#complaintSliderTimeRight').fadeIn();
    $('#complaintSpecificHelp').fadeIn();
    $('#complaintSpecificSelectedFlight').fadeIn();
  } else {
    $('#sliderComplaintFlights').fadeOut();
    $('#complaintSliderTimeLeft').fadeOut();
    $('#complaintSliderTimeMiddle').fadeOut();
    $('#complaintSliderTimeRight').fadeOut();
    $('#complaintSpecificHelp').fadeOut();
    $('#complaintSpecificSelectedFlight').fadeOut();
  }
}
function restartComplaintFlights(newOffset) {
  deselectAllItems();
  updateDataPanel();
  $('#complaintSpecificSelectedFlightField').val('');
  stopAllTimerFunctions();
  complaintParams.setComplaintFlightsRunning(false);
  var currentStartTime = new Date(complaintParams.getTBegin() * 1000);
  var histTime = complaintParams.getTBegin() - offsetAirportToUTC;
  // Aus UTC umrechnen!
  // Diese Objekte muessen neu angelegt werden!
  clearAllTrackMapObjects();
  clearNMTMapObjects();
  // Zeitparameter neu setzen
  historicStartTime = histTime + newOffset;
  historicStartServerTime = getCurrentTime();
  // Complaint-Parameter anpassen
  complaintParams.setComplaintFlightsRunning(true);
  complaintParams.setLastOffset(newOffset);
  complaintParams.setSliderInMotion(false);
  startAllTimerFunctions();
  currentStartTime = null;
  histTime = null;
}
function startComplaintSlider(value) {
  complaintParams.setSliderInMotion(true);
}
function lookupAddress() {
  var geocoder = new google.maps.Geocoder();
  var address =
    $('#addrStreet').val() + ' ' + $('#addrPostcode').val() + ' ' + $('#addrCity').val();
  geocoder.geocode(
    {
      address: address,
      region: 'de',
    },
    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        homePositionChanged(results[0].geometry.location);
        show_home_location(true);
      } else {
        if (status == google.maps.GeocoderStatus.ZERO_RESULTS)
          alert(
            unescape(
              "TraVis could'nt find your address - please check completeness and correct spelling!",
            ),
          );
        else alert(unescape("TraVis could'nt start the address lookup. Please try again later!"));
      }
    },
  );
  geocoder = null;
  address = null;
}
function showOverlays() {
  // Zuvor angezeigte Overlays entfernen:
  hideOverlays();
  var paramList = '';
  var mnth = parseInt(overlayMonth);
  if (mnth > 0) mnth--;
  // Die Date-Klasse numeriert die Monate von 0 bis 11 .....
  var date = new Date(parseInt(overlayYear), mnth, 1);
  for (var i = 0; i < arrayMapOverlayData.length; i++) {
    var el = document.getElementById('idOverlayFootprintInput_' + i);
    if (el && el.checked) {
      if (paramList != '') paramList += ',';
      paramList += arrayMapOverlayData[i].getID();
    }
  }
  loadMapOverlays(paramList);
}
function hideOverlays() {
  removeOverlayData();
  if (footprintOverlay) {
    footprintOverlay.setMap(null);
    footprintOverlay = null;
  }
  $('#mapOverlayPanel').slideUp();
  $('#inmInfoBoxHeader').slideUp();
  $('#footprintInfoBoxHeader').slideUp();
  $('#inmInfoBox').slideUp();
  $('#footprintInfoBox').slideUp();
}
function loadMapOverlayList() {
  var mapOverlayHtml = '';
  $('#mapoverlay_container').html('');
  var mth = overlayMonth;
  if (mth == 0) mth++;
  var chosenDate = new Date(overlayYear, mth - 1, 1, 0, 0, 0, 0);
  for (var i = 0; i < arrayMapOverlayData.length; i++) {
    var curOverlay = arrayMapOverlayData[i];
    // Zeitvergleich ist fuzzy, um Zeitzonen-Probleme auszuklammern. Wir benutzen eh nur Monats- und Jahreswerte!
    // Sollte sich das irgendwann aendern, dann muss auch das hier geaendert werden!
    if (
      Math.abs(chosenDate.getTime() / 1000 - curOverlay.getTime()) < 87000 &&
      ((overlayMonth == 0 && curOverlay.getType() == 'Year') ||
        (overlayMonth > 0 && curOverlay.getType() != 'Year'))
    ) {
      mapOverlayHtml +=
        "<label class='f_radio DeselectableRadio' style='width: 500px; height: 25px; padding-right: 0; margin-bottom: 5px;' id='idOverlayFootprint_" +
        i +
        "'><input type='radio' class='DeselectableRadio' id='idOverlayFootprintInput_" +
        i +
        "' name='";
      mapOverlayHtml += curOverlay.getSource();
      mapOverlayHtml += "' />";
      mapOverlayHtml +=
        curOverlay.getName() + '<br />' + curOverlay.getSource() + ' - ' + curOverlay.getMetric();
      mapOverlayHtml += '</label>';
    }
    curOverlay = null;
  }
  $('#mapoverlay_container').html(mapOverlayHtml);
  for (var i = 0; i < arrayMapOverlayData.length; i++) {
    var el = document.getElementById('idOverlayFootprint_' + i);
    if (el) FancyForm.add(el);
    el = null;
  }
  mapOverlayHtml = null;
  i = null;
  mth = null;
  chosenDate = null;
}
// Fuer's Kontextmen�
var obj = null;
function checkHover() {
  if (obj) {
    obj.find('ul').fadeOut('fast');
  }
}
function updateDataPanel() {
  if (existsSelectedTrack() || existsSelectedNMT()) {
    $('#dataPanel').slideDown();
  } else {
    $('#dataPanel').slideUp();
  }
}
function stopAllPanelAnimation() {
  $('#dataPanel').stop(true, true);
  $('#infoPanel').stop(true, true);
  $('#detailsPanel').stop(true, true);
  $('#complaintPanel').stop(true, true);
}
function toggleSetupPanel() {
  $('#setupPanel').stop(true, true);
  if ($('#setupPanel').is(':visible')) {
    $('#setupPanel').slideUp();
    $('#setupLink').css('backgroundImage', 'url(images/setup.png)');
  } else {
    var pos = $('#setupButton').offset();
    pos.top += 26;
    pos.left -= 2;
    $('#setupPanel').css({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    $('#setupPanel').slideDown();
    $('#setupLink').css('backgroundImage', 'url(images/setupActive.png)');
  }
}
function closeSetupPanel() {
  $('#setupPanel').stop(true, true);
  if ($('#setupPanel').is(':visible')) {
    $('#setupPanel').slideUp();
    $('#setupLink').css('backgroundImage', 'url(images/setup.png)');
  }
}
function toggleHinweisPanel() {}
function closeHinweisPanel() {}
function showSpeedPanel() {
  $('#speedPanel').stop(true, true);
  var pos = $('#currentTime').offset();
  pos.top += 22;
  pos.left -= 12;
  $('#speedPanel').css({
    top: pos.top + 'px',
    left: pos.left + 'px',
  });
  $('#speedPanel').slideDown(400, function() {
    pos.top += $('#speedPanel').height() + 5;
    $('#infoPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    $('#detailsPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    $('#complaintPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    pos = null;
  });
}
function closeSpeedPanel() {
  var pos = $('#speedPanel').offset();
  $('#speedPanel').stop(true, true);
  if ($('#speedPanel').is(':visible')) {
    $('#speedPanel').slideUp();
    $('#infoPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    $('#detailsPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    $('#complaintPanel').animate({
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
  }
  pos = null;
}
function showDelayPanel() {
  $('#delayPanel').stop(true, true);
  var pos = $('#currentTime').offset();
  pos.top += 22;
  pos.left -= 12;
  $('#delayPanel').css({
    top: pos.top + 'px',
    left: pos.left + 'px',
  });
  $('#delayPanel').slideDown();
  setTimeout('closeDelayPanel()', 5000);
}
function closeDelayPanel() {
  $('#delayPanel').stop(true, true);
  if ($('#delayPanel').is(':visible')) {
    $('#delayPanel').slideUp();
  }
}
function showInfoPanel() {
  stopAllPanelAnimation();
  // Info-Panel schliessen
  if (currentOpenLeftPanel && currentOpenLeftPanel[0] == $('#infoPanel')[0]) {
    $('#infoPanel').animate({ width: 'toggle' }, 400);
    currentOpenLeftPanel = null;
    $('#infoLink').css('backgroundImage', 'url(images/info.png)');
    return;
  }
  // Info-Panel �ffnen - vorher kein Panel geoeffnet
  if (!currentOpenLeftPanel) {
    $('#infoPanel').animate({ width: 'toggle' }, 400);
    currentOpenLeftPanel = $('#infoPanel');
    $('#infoLink').css('backgroundImage', 'url(images/infoActive.png)');
  } // Info-Panel �ffnen - vorher geoeffnetes Panel schliessen
  else {
    if (currentOpenLeftPanel[0] == $('#complaintPanel')[0]) {
      var dialog = $('<div>Would you like to discard your complaint?</div>').dialog({
        height: 150,
        modal: true,
        title: 'Complaint',
        show: {
          effect: 'blind',
          duration: 500,
        },
        buttons: [
          {
            text: 'Yes',
            click: function() {
              dialog.remove();
              dialog = null;
              showComplaintFlightsSlider(false);
              complaintParams.setActive(false);
              $('#complaintPanel').animate({ width: 'toggle' }, 400, function() {
                $('#infoPanel').animate({ width: 'toggle' }, 400);
                currentOpenLeftPanel = $('#infoPanel');
              });
              resetAllLeftPanelIcons();
              $('#infoLink').css('backgroundImage', 'url(images/infoActive.png)');
            },
          },
          {
            text: 'No',
            click: function() {
              dialog.remove();
              dialog = null;
            },
          },
        ],
      });
    } else {
      currentOpenLeftPanel.animate({ width: 'toggle' }, 400, function() {
        $('#infoPanel').animate({ width: 'toggle' }, 400);
        currentOpenLeftPanel = $('#infoPanel');
      });
      resetAllLeftPanelIcons();
      $('#infoLink').css('backgroundImage', 'url(images/infoActive.png)');
    }
  }
}
function showDetailsPanel() {
  stopAllPanelAnimation();
  // Details-Panel schliessen
  if (currentOpenLeftPanel && currentOpenLeftPanel[0] == $('#detailsPanel')[0]) {
    $('#detailsPanel').animate({ width: 'toggle' }, 400);
    currentOpenLeftPanel = null;
    $('#helpLink').css('backgroundImage', 'url(images/help.png)');
    return;
  }
  // Details-Panel �ffnen - vorher kein Panel geoeffnet
  if (!currentOpenLeftPanel) {
    $('#detailsPanel').animate({ width: 'toggle' }, 400);
    currentOpenLeftPanel = $('#detailsPanel');
    $('#helpLink').css('backgroundImage', 'url(images/helpActive.png)');
  } // Details-Panel �ffnen - vorher geoeffnetes Panel schliessen
  else {
    if (currentOpenLeftPanel[0] == $('#complaintPanel')[0]) {
      var dialog = $('<div>Would you like to discard your complaint?</div>').dialog({
        height: 150,
        modal: true,
        title: 'Complaint',
        show: {
          effect: 'blind',
          duration: 500,
        },
        buttons: [
          {
            text: 'Yes',
            click: function() {
              dialog.remove();
              dialog = null;
              showComplaintFlightsSlider(false);
              complaintParams.setActive(false);
              $('#complaintPanel').animate({ width: 'toggle' }, 400, function() {
                $('#detailsPanel').animate({ width: 'toggle' }, 400);
                currentOpenLeftPanel = $('#detailsPanel');
              });
              resetAllLeftPanelIcons();
              $('#helpLink').css('backgroundImage', 'url(images/helpActive.png)');
            },
          },
          {
            text: 'No',
            click: function() {
              dialog.remove();
              dialog = null;
            },
          },
        ],
      });
    } else {
      currentOpenLeftPanel.animate({ width: 'toggle' }, 400, function() {
        $('#detailsPanel').animate({ width: 'toggle' }, 400);
        currentOpenLeftPanel = $('#detailsPanel');
      });
      resetAllLeftPanelIcons();
      $('#helpLink').css('backgroundImage', 'url(images/helpActive.png)');
    }
  }
}
function showComplaintPanel(bToggle) {
  closeHomeMenu();
  // Falls ueber das Kontextmenue am Home-Symbol gestartet
  stopAllPanelAnimation();
  // Mit dem Complaint-Button wird der Beschwerdebereich geschlossen:
  if (bToggle && currentOpenLeftPanel && currentOpenLeftPanel[0] == $('#complaintPanel')[0]) {
    var dialog = $('<div>Would you like to discard your complaint?</div>').dialog({
      height: 150,
      modal: true,
      title: 'Complaint',
      show: {
        effect: 'blind',
        duration: 500,
      },
      buttons: [
        {
          text: 'Yes',
          click: function() {
            dialog.remove();
            dialog = null;
            showComplaintFlightsSlider(false);
            $('#complaintPanel').animate({ width: 'toggle' }, 400);
            currentOpenLeftPanel = null;
            $('#complaintLink').css('backgroundImage', 'url(images/complaint.png)');
            complaintParams.setActive(false);
          },
        },
        {
          text: 'No',
          click: function() {
            dialog.remove();
            dialog = null;
          },
        },
      ],
    });
  } else if (!currentOpenLeftPanel) {
    $('#complaintPanel').animate({ width: 'toggle' }, 400);
    currentOpenLeftPanel = $('#complaintPanel');
    $('#complaintLink').css('backgroundImage', 'url(images/complaintActive.png)');
    complaintParams.setActive(true);
  } else if (currentOpenLeftPanel[0] != $('#complaintPanel')[0]) {
    currentOpenLeftPanel.animate({ width: 'toggle' }, 400, function() {
      currentOpenLeftPanel = $('#complaintPanel');
      $('#complaintPanel').animate({ width: 'toggle' }, 400);
    });
    resetAllLeftPanelIcons();
    $('#complaintLink').css('backgroundImage', 'url(images/complaintActive.png)');
    complaintParams.setActive(true);
  }
}
function resetAllLeftPanelIcons() {
  $('#infoLink').css('backgroundImage', 'url(images/info.png)');
  $('#helpLink').css('backgroundImage', 'url(images/help.png)');
  $('#complaintLink').css('backgroundImage', 'url(images/complaint.png)');
}
function selectNearestFlight(pos) {
  var nearestDistance = 1000000;
  var nearestFlight;
  var nearestTrackID = -1;
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    var curTrack = arrayTracks[x];
    if (curTrack && curTrack.getAirplaneIcon()) {
      var horizDistance = google.maps.geometry.spherical.computeDistanceBetween(
        pos,
        curTrack.getAirplaneIcon().getPosition(),
      );
      if (horizDistance < nearestDistance) {
        nearestDistance = horizDistance;
        nearestFlight = curTrack;
        nearestTrackID = x;
      }
      horizDistance = null;
    }
    curTrack = null;
  }
  if (nearestFlight) {
    deselectAllItems();
    closeHomeMenu();
    selectedTrack = nearestTrackID;
    nearestFlight.setSelected(true);
    updateDataPanel();
    // Daten-Tab anzeigen!
    redrawData();
    updateSelectionInFlightTable();
  }
  nearestDistance = null;
  nearestFlight = null;
  nearestTrackID = null;
  len = null;
}
// Unsere Registrations haben keinen Bindestrich - den braucht airliners.net aber zum Anzeigen der Fotos. Also rein mit dem Strich!
function convertRegistrationString(reg) {
  if (!reg || reg == '') return '';
  var reg1 = reg.substr(0, 1);
  var reg2 = reg.substr(0, 2);
  var reg3 = reg.substr(0, 3);
  var reg4 = reg.substr(0, 4);
  if (reg2 == 'D2' || reg2 == 'D4' || reg2 == 'D6') reg = reg2 + '-' + reg.substr(2);
  else if (reg1 == 'D') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'B') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'F') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == '2') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'I') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'M') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'G') reg = reg1 + '-' + reg.substr(1);
  else if (reg1 == 'N') reg = reg1 + '-' + reg.substr(1);
  else if (
    reg2 == 'CC' ||
    reg2 == 'C5' ||
    reg2 == 'C3' ||
    reg2 == 'C6' ||
    reg2 == 'CU' ||
    reg2 == 'CN' ||
    reg2 == 'C9' ||
    reg2 == 'C2' ||
    reg2 == 'CR' ||
    reg2 == 'CS' ||
    reg2 == 'CX'
  )
    reg = reg2 + '-' + reg.substr(2);
  else if (reg1 == 'C') reg = reg1 + '-' + reg.substr(1);
  else if (
    reg2 == 'P4' ||
    reg2 == 'PP' ||
    reg2 == 'PR' ||
    reg2 == 'PS' ||
    reg2 == 'PT' ||
    reg2 == 'PU' ||
    reg2 == 'PK' ||
    reg2 == 'PH' ||
    reg2 == 'PJ' ||
    reg2 == 'P2'
  )
    reg = reg2 + '-' + reg.substr(2);
  else if (reg1 == 'P') reg = reg1 + '-' + reg.substr(1);
  else if (
    reg2 == 'ZA' ||
    reg2 == 'Z6' ||
    reg2 == 'ZJ' ||
    reg2 == 'Z3' ||
    reg2 == 'ZK' ||
    reg2 == 'ZP' ||
    reg2 == 'ZS' ||
    reg2 == 'ZT' ||
    reg2 == 'ZU'
  )
    reg = reg2 + '-' + reg.substr(2);
  else if (reg1 == 'Z') reg = reg1 + '-' + reg.substr(1);
  else if (reg3 == 'A9C' || reg3 == '9XR' || reg3 == 'A4O') reg = reg3 + '-' + reg.substr(3);
  else if (reg4 == 'RDPL') reg = reg4 + '-' + reg.substr(4);
  else reg = reg2 + '-' + reg.substr(2);
  reg1 = null;
  reg2 = null;
  reg3 = null;
  reg4 = null;
  return reg;
}
// Status, in dem ein NMT sich befindet - entspricht den Farben der NMT-Symbole
NMTState = {
  Unknown: 0,
  Standard: 1,
  BelowThreshold: 2,
  AboveThreshold: 3,
  NoiseEvent: 4,
  Error: 5,
  Downtime: 6,
};
// Zum Unterdruecken des Ladens der Wetterdaten:
var doNotLoadWeather = false;
var nmtChartStandardColor = '#6698FF';
var nmtChartBelowThresholdColor = '#84AE34';
var nmtChartAboveThresholdColor = '#f5c624';
var nmtChartNoiseEventColor = '#F87217';
var nmtChartErrorColor = '#D4221C';
var nmtChartDowntimeColor = '#ACAEAC';
var trackChartColor = '#6698FF';
// Chartanzeige initialisieren:
var chartOptionsNMT = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [
    nmtChartStandardColor,
    nmtChartBelowThresholdColor,
    nmtChartAboveThresholdColor,
    nmtChartNoiseEventColor,
    nmtChartErrorColor,
    nmtChartDowntimeColor,
  ],
  legend: { position: 'none' },
  curveType: 'function',
  chartArea: {
    left: 47,
    top: 15,
  },
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 40,
      max: 100,
    },
    minValue: 40,
    maxValue: 100,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 7,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'dB(A)',
  },
  axisTitlesPosition: 'out',
};
var chartOptionsNMTFlag = {
  titlePosition: 'none',
  axisTitlesPosition: 'none',
  width: 175,
  height: 65,
  fontSize: 8,
  backgroundColor: 'white',
  colors: [
    nmtChartStandardColor,
    nmtChartBelowThresholdColor,
    nmtChartAboveThresholdColor,
    nmtChartNoiseEventColor,
    nmtChartErrorColor,
    nmtChartDowntimeColor,
  ],
  legend: { position: 'none' },
  curveType: 'function',
  chartArea: {
    left: 20,
    top: 5,
  },
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 0,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 8,
    },
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 40,
      max: 100,
    },
    minValue: 40,
    maxValue: 100,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 4,
    },
    textStyle: {
      color: '#666666',
      fontSize: 8,
    },
  },
};
var chartOptionsTrack = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [trackChartColor],
  legend: { position: 'none' },
  chartArea: {
    left: 47,
    top: 15,
  },
  curveType: 'function',
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 0,
      max: 15000,
    },
    minValue: 0,
    maxValue: 15000,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 6,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'ft',
  },
  axisTitlesPosition: 'out',
};
var chartOptionsTrack20000 = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [trackChartColor],
  legend: { position: 'none' },
  chartArea: {
    left: 47,
    top: 15,
  },
  curveType: 'function',
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 0,
      max: 20000,
    },
    minValue: 0,
    maxValue: 20000,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 6,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'ft',
  },
  axisTitlesPosition: 'out',
};
var chartOptionsTrack25000 = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [trackChartColor],
  legend: { position: 'none' },
  chartArea: {
    left: 47,
    top: 15,
  },
  curveType: 'function',
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 0,
      max: 25000,
    },
    minValue: 0,
    maxValue: 25000,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 6,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'ft',
  },
  axisTitlesPosition: 'out',
};
var chartOptionsTrack30000 = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [trackChartColor],
  legend: { position: 'none' },
  chartArea: {
    left: 47,
    top: 15,
  },
  curveType: 'function',
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 0,
      max: 30000,
    },
    minValue: 0,
    maxValue: 30000,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 6,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'ft',
  },
  axisTitlesPosition: 'out',
};
var chartOptionsTrack40000 = {
  titlePosition: 'none',
  width: 365,
  height: 220,
  fontSize: 10,
  backgroundColor: 'white',
  colors: [trackChartColor],
  legend: { position: 'none' },
  chartArea: {
    left: 47,
    top: 15,
  },
  curveType: 'function',
  focusTarget: 'category',
  tooltip: { trigger: 'none' },
  trigger: 'none',
  hAxis: {
    showTextEvery: 150,
    baselineColor: '#CCCCCC',
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    maxAlternation: 2,
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      min: 0,
      max: 40000,
    },
    minValue: 0,
    maxValue: 40000,
    baselineColor: '#CCCCCC',
    gridlines: {
      color: '#CCCCCC',
      count: 6,
    },
    textStyle: {
      color: '#666666',
      fontSize: 9,
    },
    titleTextStyle: {
      color: '#666666',
      fontSize: 10,
      italic: false,
    },
    title: 'ft',
  },
  axisTitlesPosition: 'out',
};
var chartBig;
function stopTopFunctionAnimations() {
  $('#topFunctionButtonNMTReport').finish();
  $('#topFunctionButtonLevelCalc').finish();
  $('#topFunctionButtonAirportReport').finish();
  $('#topFunctionButtonAddressLookup').finish();
  $('#topFunctionButtonOverlays').finish();
}
function center_on_airport() {
  map.panTo(arpPosition);
}
function center_on_own_position() {
  if (homeMarker == null) return;
  map.panTo(homePosition);
}
function zoominMap() {
  map.setZoom(map.getZoom() + 1);
}
function zoomoutMap() {
  if (map.getZoom() > 0) map.setZoom(map.getZoom() - 1);
}
function toggleBounce() {
  if (homeMarker == null) return;
  closeHomeMenu();
  if (homeMarker.getAnimation() != null) {
    homeMarker.setAnimation(null);
  }
}
function homePositionChanged(latlng) {
  // Eigene Position auf der Karte geaendert -> Closest-Approach-Daten neu berechnen (sind ja abhaengig von dieser Position)
  homePosition = latlng;
  // Auch die Meereshoehe der eigenen Position muss berechnet werden (fuer die Distanzgrafik)
  homeHeight = 0;
  var elevator = new google.maps.ElevationService();
  var locations = [latlng];
  var positionalRequest = { locations: locations };
  elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK && results[0]) homeHeight = results[0].elevation;
    calculateClosestApproach(); // Darf erst dann berechnet werden, wenn die Hoehendaten bekannt sind!
  });
  elevator = null;
  locations = null;
  positionalRequest = null;
  closeHomePanel(); // Berechne die Entfernung zur nächsten Messstelle! Innerhalb eines bestimmten Radius wird keine Pegelberechnung durchgeführt.
}
function show_home_location(anim) {
  // Wenn Home-Position schon markiert, dann zentriere sie. Ansonsten neuen HomeMarker anlegen!
  if (homeMarker != null) {
    homeMarker.setPosition(homePosition);
    map.panTo(homePosition);
  } else {
    if (anim)
      homeMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: homePosition,
        icon: 'images/homeMarker.png',
        zIndex: 1313,
      });
    else
      homeMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: homePosition,
        icon: 'images/homeMarker.png',
        zIndex: 1313,
      });
    google.maps.event.addListener(homeMarker, 'click', toggleBounce);
    google.maps.event.addListener(homeMarker, 'rightclick', function(ev) {
      showHomeMenu(ev);
    });
    google.maps.event.addListener(homeMarker, 'dragend', function(ev) {
      homePositionChanged(ev.latLng);
    });
    google.maps.event.addListener(homeMarker, 'dragstart', function(ev) {
      closeHomeMenu();
    });
  }
  document.getElementById('idOwnPosition').style.backgroundImage = "url('images/ownPosition.png')";
}
function hide_home_location() {
  // Home-Position-Marker entfernen
  if (homeMarker != null) {
    homeMarker.setMap(null);
    homeMarker = null;
  }
  document.getElementById('idOwnPosition').style.backgroundImage =
    "url('images/ownPositionGrau.png')";
}
function readCookies() {
  var c = GetCookie('TopWeb-ShowBigFlags');
  if (c != null) bigFlags = c === 'true';
  setCheckValue('idBigFlags', bigFlags);
  c = GetCookie('TopWeb-FlagsForAll');
  if (c != null) flagsForall = c === 'true';
  setCheckValue('idFlagsForAll', flagsForall);
  c = GetCookie('TopWeb-ShowFlyoverFlags');
  if (c != null) flyoverFlags = c === 'true';
  setCheckValue('idFlyoverFlags', flyoverFlags);
  c = GetCookie('TopWeb-ShowNightMode');
  if (c != null) nightMode = c === 'true';
  setCheckValue('idNightMode', nightMode);
  c = GetCookie('TopWeb-ShowFlightTable');
  if (c != null) bShowFlightTable = c === 'true';
  setCheckValue('idShowFlightTable', bShowFlightTable);
  c = GetCookie('TopWeb-TurboMode');
  if (c != null) turboMode = c === 'true';
  setCheckValue('idTurboMode', turboMode);
  c = GetCookie('TopWeb-ShowTracks');
  if (c != null) bShowTrackData = c === 'true';
  setCheckValue('idTracksCheck', bShowTrackData);
  c = GetCookie('TopWeb-ShowNMTs');
  if (c != null) bShowNMTData = c === 'true';
  setCheckValue('idNMTCheck', bShowNMTData);
  c = GetCookie('TopWeb-ShowCompleteTracks');
  if (c != null) travisOptions.setShowCompleteTracksForAllFlights(c === 'true');
  setCheckValue('idCompleteTracksForAll', travisOptions.getShowCompleteTracksForAllFlights());
  var ci = GetCookie('TopWeb-ReplaySpeed');
  if (ci != null && !isNaN(ci) && document.getElementById('sliderSpeed')) {
    $('#sliderSpeed').slider('value', ci);
    replaySpeed = parseInt($('#sliderSpeed').slider('value'));
  }
  ci = GetCookie('TopWeb-TailLength');
  if (ci != null && !isNaN(ci) && document.getElementById('k-tailLength')) {
    tailLength = ci;
    $option = $(
      '#dk_container_' + 'k-tailLength' + ' .dk_options a[data-dk-dropdown-value="' + ci + '"]',
    );
    $option.trigger('click');
  } else {
    $option = $(
      '#dk_container_' +
        'k-tailLength' +
        ' .dk_options a[data-dk-dropdown-value="' +
        tailLength +
        '"]',
    );
    $option.trigger('click');
  }
  ci = GetCookie('TopWeb-MapType');
  if (ci && ci != '') {
    map.setMapTypeId(ci);
    $option = $(
      '#dk_container_' + 'k-mapType' + ' .dk_options a[data-dk-dropdown-value="' + ci + '"]',
    );
    $option.trigger('click');
    if (ci == 'OSM' || ci == 'OSM-BW') $('#osmAttribution').fadeIn('fast');
    else $('#osmAttribution').fadeOut('fast');
  } else {
    map.setMapTypeId('TraVisMapStyle');
    $option = $('#dk_container_' + 'k-mapType' + ' .dk_options a[data-dk-dropdown-value="TraVis"]');
    $option.trigger('click');
    $('#osmAttribution').fadeOut('fast');
  }
  c = GetCookie('TopWeb-HomePositionMarker');
  if (c != null && c === 'true') {
    cLat = GetCookie('TopWeb-HomePositionLat');
    cLon = GetCookie('TopWeb-HomePositionLon');
    homePositionChanged(new google.maps.LatLng(cLat, cLon));
    show_home_location(true);
    cLat = null;
    cLon = null;
  } else {
    hide_home_location();
  }
  c = null;
  ci = null;
}
function writeCookies() {
  var expdate = new Date();
  FixCookieDate(expdate);
  expdate.setTime(expdate.getTime() + 365 * 24 * 60 * 60 * 1000);
  // 1 Jahr gueltig
  SetCookie('TopWeb-ShowBigFlags', bigFlags, expdate);
  SetCookie('TopWeb-FlagsForAll', flagsForall, expdate);
  SetCookie('TopWeb-ShowFlyoverFlags', flyoverFlags, expdate);
  SetCookie('TopWeb-ShowNightMode', nightMode, expdate);
  SetCookie('TopWeb-ShowFlightTable', bShowFlightTable, expdate);
  SetCookie('TopWeb-TurboMode', turboMode, expdate);
  SetCookie('TopWeb-ShowTracks', bShowTrackData, expdate);
  SetCookie('TopWeb-ShowNMTs', bShowNMTData, expdate);
  SetCookie(
    'TopWeb-ShowCompleteTracks',
    travisOptions.getShowCompleteTracksForAllFlights(),
    expdate,
  );
  if (document.getElementById('sliderSpeed'))
    SetCookie('TopWeb-ReplaySpeed', $('#sliderSpeed').slider('value'), expdate);
  SetCookie('TopWeb-TailLength', tailLength, expdate);
  if (map != null) SetCookie('TopWeb-MapType', map.getMapTypeId());
  if (homeMarker != null) {
    SetCookie('TopWeb-HomePositionMarker', true, expdate);
    SetCookie('TopWeb-HomePositionLat', homePosition.lat(), expdate);
    SetCookie('TopWeb-HomePositionLon', homePosition.lng(), expdate);
  } else {
    SetCookie('TopWeb-HomePositionMarker', false, expdate);
  }
  expdate = null;
}
// Function for loading parsed XML data
// Has been implemented as a separate feature because it is also used in redrawing.
function loadData(parsedData) {
  // Ggf. Aktuelle Serverzeit zum Startzeitpunkt der historischen Daten festhalten
  if (
    (currentState == TWState.Historical || currentState == TWState.LiveDelayed) &&
    adjustStartServerTimeAfterLoad
  ) {
    historicStartServerTime = getCurrentTime();
    adjustStartServerTimeAfterLoad = false;
  }
  // Neue Trackdaten anzeigen:
  if (parsedData != null && parsedData.documentElement != null) {
    var systemSettings = parsedData.documentElement.getElementsByTagName('sysSet');
    var isToday = 0;
    var currentSystemTime = 0;
    var firstLoad = false;
    if (systemSettings.length > 0) {
      // Anzeige der aktuellen Systemzeit aktualisieren:
      if (currentState != TWState.Historical && currentState != TWState.LiveDelayed)
        updateCurrentSystemTime(systemSettings[0].getAttribute('ts'));
      // ACHTUNG! Uebergeben wird UTC! Die muessen wir noch umwandeln in Lokalzeit!
      currentSystemTime = systemSettings[0].getAttribute('t');
      // Die Zeitdifferenz zwischen Airport und UTC:
      offsetAirportToUTC = parseInt(systemSettings[0].getAttribute('utc'));
      // Beim ersten Mal muessen wir die Startzeit und die Systemzeit anpassen, da erst jetzt die Zeitdifferenz zwischen UTC und Airport bekannt ist!
      // Beim Live-Modus nicht noetig, da hier eh nur mit Zeitstempeln und nicht mit String-Zeitangaben gearbeitet wird.
      if (historicPoolUpdateTime < 1) {
        if (currentState != TWState.LiveDelayed) historicStartTime -= offsetAirportToUTC;
        firstLoad = true;
      }
    } else {
      return;
    }
    var systemStatus = parsedData.documentElement.getElementsByTagName('sysStat');
    if (systemStatus.length > 0) {
      startFirstNoiseEvent = parseInt(systemStatus[0].getAttribute('minNENum'));
      endLastNoiseEvent = parseInt(systemStatus[0].getAttribute('maxNENum'));
    }
    systemStatus = null;
    // Alte NMT- und Trackdaten loeschen.
    // Nicht fuer Historienmodus, da alle Objekte in loadOverlays abgeraeumt werden!
    if (currentState != TWState.Historical && currentState != TWState.LiveDelayed) {
      clearAllNMTData();
      clearAllTrackData();
    }
    var newDataLoaded = stopTimeCalculation;
    stopTimeCalculation = false;
    updateSystemTime();
    if (newDataLoaded)
      $('#currentTime').animate({ color: 'red' }, 500, 'linear', function() {
        $('#currentTime').effect('pulsate', { times: 2 }, 600);
        $('#currentTime').animate({ color: '#333333' }, 1100);
      });
    newDataLoaded = null;
    if (numofWeatherLoad < 1) {
      doNotLoadWeather = false;
      loadWeather();
    }
    var nmts = parsedData.documentElement.getElementsByTagName('nmt');
    for (var k = 0; k < nmts.length; k++) {
      var curNMT = nmts[k];
      var nmt = null;
      // Suche nach vorhandenem NMT-Objekt:
      var len = arrayNMTs.length;
      var curShortcut = curNMT.getAttribute('short');
      for (var x = 0; x < len; x++) {
        if (arrayNMTs[x].getShortcut() == curShortcut) {
          nmt = arrayNMTs[x];
          break;
        }
      }
      // Wenn keins gefunden wurde, dann legen wir ein neues an:
      if (nmt == null) {
        nmt = new NMT();
        nmt.setShortcut(curShortcut);
        arrayNMTs.push(nmt);
      }
      x = null;
      len = null;
      nmt.setNmtId(parseInt(curNMT.getAttribute('id')));
      nmt.setLatitude(parseFloat(curNMT.getAttribute('lat')));
      nmt.setLongitude(parseFloat(curNMT.getAttribute('lon')));
      nmt.setNmtName(curNMT.getAttribute('name'));
      nmt.setHeight(parseInt(curNMT.getAttribute('height')));
      nmt.setNmtStatus(parseInt(curNMT.getAttribute('status')));
      nmt.setCallDate(curNMT.getAttribute('calldate'));
      nmt.setStartTime(curNMT.getAttribute('starttime'));
      nmt.setTries(parseInt(curNMT.getAttribute('tries')));
      nmt.setStatusNoise(parseInt(curNMT.getAttribute('statusnoise')));
      nmt.setNumberNoiseEvents(parseInt(curNMT.getAttribute('numbernoiseevents')));
      if (isToday > 0) {
      } else {
        nmt.setLevelStart(parseInt(curNMT.getAttribute('lstart')) / 10);
        nmt.setLevelStartNight(parseInt(curNMT.getAttribute('lstartnight')) / 10);
        nmt.setFirstLevelTime(parseInt(curNMT.getAttribute('firstTime')));
      }
      var curNMTTime = nmt.getFirstLevelTime();
      var levels = curNMT.getElementsByTagName('l');
      for (var l = 0; l < levels.length; l++) {
        var levelCSV = levels[l].getAttribute('v');
        var splitResult = levelCSV.split(';');
        var lastLoadedLevelTime = nmt.getTimeLastLevel();
        for (n = 0; n < splitResult.length; n++) {
          if (curNMTTime > lastLoadedLevelTime) {
            var newLevel = new NMTLevel();
            var levelValue = parseInt(splitResult[n]) / 10;
            // Sonderbehandlung von Spezialwerten, die leider in diesem Wert enthalten sein können!
            if (levelValue > 599 || levelValue < 20) levelValue = 20;
            else if (levelValue > 400) levelValue -= 400;
            else if (levelValue > 200) levelValue -= 200;
            else if (levelValue > 199) levelValue = 20;
            newLevel.setLevel(levelValue);
            newLevel.setTime(curNMTTime);
            // Zeiten werden nicht vom Server uebertragen, da sie fortlaufend sind! Spart Uebertragungszeit!
            nmt.addLevel(newLevel);
            newLevel = null;
          }
          curNMTTime++;
        }
        levelCSV = null;
        splitResult = null;
        lastLoadedLevelTime = null;
      }
      curNMTTime = null;
      levels = null;
      curShortcut = null;
      var nes = curNMT.getElementsByTagName('ne');
      for (var m = 0; m < nes.length; m++) {
        var curNE = nes[m];
        var newNE = new NoiseEvent();
        newNE.setTLasMax(parseInt(curNE.getAttribute('tlas')));
        newNE.setLasMax(parseInt(curNE.getAttribute('las')) / 10);
        newNE.setTStart(parseInt(curNE.getAttribute('tstart')));
        newNE.setTStop(parseInt(curNE.getAttribute('tstop')));
        var act = curNE.getAttribute('actype');
        if (act != null) newNE.setACType(act);
        nmt.addNoiseEvent(newNE);
        newNE = null;
        curNE = null;
        act = null;
      }
      nes = null;
      var dts = curNMT.getElementsByTagName('dt');
      for (var n = 0; n < dts.length; n++) {
        var curDT = dts[n];
        var newDT = new Downtime();
        newDT.setTBegin(parseInt(curDT.getAttribute('tbeg')));
        newDT.setTEnd(parseInt(curDT.getAttribute('tend')));
        nmt.addDowntime(newDT);
        newDT = null;
        curDT = null;
      }
      dts = null;
      // Aktuelles NMT fuer aktuelle Systemzeit laden, aber nur aktive NMTs!
      if (currentState != TWState.Historical && currentState != TWState.LiveDelayed)
        loadNMT(nmt, currentSystemTime);
      nmt = null;
      curNMT;
    }
    nmts = null;
    // Berechne die Entfernung zur nächsten Messstelle! Innerhalb eines bestimmten Radius wird keine Pegelberechnung durchgeführt.
    var tracks = parsedData.documentElement.getElementsByTagName('trk');
    for (var i = 0; i < tracks.length; i++) {
      var curTrack = tracks[i];
      var topwebTrack = null;
      // Suche nach vorhandenem Track-Objekt:
      var len = arrayTracks.length;
      for (var x = 0; x < len; x++) {
        // IN ORIGINAL WITH CALLSIGN COMPARISONS - SUFFICIENTLY SUFFERING IN LTN NO MORE THAN BLANKS IN CURRENT PLOTS CALLSIGN
        //XXX							if ( arrayTracks[x].getTrackData().getCallsign() == curTrack.getAttribute( "cs") &&
        //XXX									 arrayTracks[x].getTrackData().getFlightID() == curTrack.getAttribute( "id"))
        if (arrayTracks[x].getTrackData().getFlightID() == curTrack.getAttribute('id')) {
          topwebTrack = arrayTracks[x];
        }
      }
      // Wenn keins gefunden wurde, dann legen wir ein neues an:
      var isNewTrack = false;
      if (topwebTrack == null) {
        topwebTrack = new TopWebTrack();
        newTrack = new FlightTrack();
        topwebTrack.setTrackData(newTrack);
        arrayTracks.push(topwebTrack);
        isNewTrack = true;
        newTrack = null;
      }
      x = null;
      len = null;
      topwebTrack.getTrackData().setFlightNo(curTrack.getAttribute('fNo'));
      topwebTrack.getTrackData().setFlightID(curTrack.getAttribute('id'));
      topwebTrack.getTrackData().setAD(curTrack.getAttribute('ad'));
      topwebTrack.getTrackData().setRWY(curTrack.getAttribute('rwy'));
      topwebTrack.getTrackData().setSSR(curTrack.getAttribute('ssr'));
      topwebTrack.getTrackData().setATT(curTrack.getAttribute('att'));
      topwebTrack.getTrackData().setAirport(curTrack.getAttribute('ap'));
      // Fuer eine Uebergangszeit lassen wir auch den alten Mechanismus ueber apname noch drin. Kann irgendwann entfallen!
      var airportname = '';
      if (selectedLanguage === 'LANG_GERMAN') airportname = curTrack.getAttribute('airportInt');
      else airportname = curTrack.getAttribute('airport');
      if (airportname === '') airportname = curTrack.getAttribute('apname');
      topwebTrack.getTrackData().setAirportName(airportname);
      airportname = null;
      topwebTrack.getTrackData().setCarrier(curTrack.getAttribute('carr'));
      topwebTrack.getTrackData().setRegistration(curTrack.getAttribute('reg'));
      topwebTrack.getTrackData().setACType(curTrack.getAttribute('act'));
      topwebTrack.getTrackData().setACVersion(curTrack.getAttribute('acv'));
      topwebTrack.getTrackData().setCallsign(curTrack.getAttribute('cs'));
      topwebTrack.getTrackData().setACClass(parseInt(curTrack.getAttribute('acc')));
      topwebTrack.getTrackData().setAZB99(parseInt(curTrack.getAttribute('azb')));
      var trackpoints = curTrack.getElementsByTagName('p');
      var firstPlotTime = 0;
      // Zeitstempel des letzten Plots festhalten (also time_last_scanned) - wir fuer Plausibilitaetspruefung benoetigt
      var timeLastScanned = 0;
      if (trackpoints.length > 0)
        timeLastScanned = parseInt(trackpoints[trackpoints.length - 1].getAttribute('t'));
      for (var j = 0; j < trackpoints.length; j++) {
        var curPlot = trackpoints[j];
        var plotTime = parseInt(curPlot.getAttribute('t'));
        // Plausi-Check: Zeitstempel darf nicht groesser als beim letzten Plot sein!
        // Genau das tritt in Hannover leider ab und zu auf ... solche Plots fliegen jetzt raus!
        if (j > 0 && plotTime > timeLastScanned) continue;
        if (j > 0) plotTime += firstPlotTime;
        else firstPlotTime = plotTime;
        // Nur Daten, die wirklich neu sind, in das Plot-Array eintragen!
        if (plotTime <= topwebTrack.getTrackData().getTimeLastScanned()) continue;
        var newPlot = new Plot();
        newPlot.setLatitude(parseFloat(curPlot.getAttribute('a')));
        newPlot.setLongitude(parseFloat(curPlot.getAttribute('n')));
        newPlot.setHeading(curPlot.getAttribute('h'));
        newPlot.setSpeed(curPlot.getAttribute('s'));
        var fl = parseInt(curPlot.getAttribute('l'));
        if (fl < 100000 && fl > -999) newPlot.setFlightLevel(curPlot.getAttribute('l'));
        fl = null;
        newPlot.setTimeValue(plotTime);
        // Auch die Plots vor der aktuellen Zeit werden geladen (wegen der Steigprofil-Grafik)
        topwebTrack.getTrackData().addPlot(newPlot);
        newPlot = null;
        plotTime = null;
        curPlot = null;
      }
      // Distance to airport fuer jeden Plot bestimmen:
      topwebTrack.getTrackData().updateDistanceToAirport();
      // Aktuellen Track fuer aktuelle Systemzeit laden:
      if (currentState != TWState.Historical && currentState != TWState.LiveDelayed)
        loadFlightTrack(topwebTrack, currentSystemTime);
      topwebTrack = null;
      isNewTrack = null;
      trackpoints = null;
      firstPlotTime = null;
      curTrack = null;
    }
    tracks = null;
    // Falls per Parameter ein zu selektierender Flug angegeben ist, dann wird dieser beim ersten Laden markiert!
    if (firstLoad && travisOptions.getInitialSelectedFlight() != '')
      selectTrackByFlightnumber(travisOptions.getInitialSelectedFlight());
    // Pool wurde gefuellt, der Endtermin des Pools muss vermerkt werden, damit spaeter festgestellt werden kann, wann der Pool erneut aktualisiert werden muss.
    historicPoolUpdateTime =
      parseInt(systemSettings[0].getAttribute('t')) +
      parseInt(systemSettings[0].getAttribute('intL'));
    // Nach dem Fuellen des Pools muss fuer alle Tracks der Closest Approach zum Home-Marker berechnet werden:
    calculateClosestApproach();
    // Wenn kein Track selektiert ist, dann koennen auch keine Daten dazu angezeigt werden!
    // Dies kann zum Beispiel dann noetig sein, wenn ein Flug gelandet ist und damit vom Radar verschwindet -
    // dann sollen nicht weiterhin dessen Daten angezeigt werden.
    if (currentState != TWState.Historical || currentState == TWState.LiveDelayed)
      updateSelectedText(0);
    systemSettings = null;
    isToday = null;
    currentSystemTime = null;
    firstLoad = null;
  }
  firstLoadAfterOpen = false;
}
function loadFlightTrack(track, sysTime) {
  if (!track) return;
  var currentTrackData = track.getTrackData();
  if (!currentTrackData) return;
  var trackpoints = currentTrackData.getPlots();
  var numofTrackPoints = trackpoints.length;
  if (numofTrackPoints <= 0) return;
  // Wenn Track erst nach der aktuellen Systemzeit beginnt, dann muessen wir (noch) nichts tun!
  if (
    (currentState == TWState.Historical || currentState == TWState.LiveDelayed) &&
    (trackpoints[0].getTimeValue() > sysTime ||
      trackpoints[numofTrackPoints - 1].getTimeValue() < sysTime)
  ) {
    return;
  }
  // Ggf. wird eine zusätzliche Linie mit der kompletten Flugspur angezeigt:
  if (!track.getCompletePolyline()) {
    var points = [];
    var trackObject = createTrackPolyline(
      points,
      currentTrackData.getAD(),
      track.isSelected(),
      true,
    );
    track.setCompletePolyline(trackObject);
  }
  var path = track.getCompletePolyline().getPath();
  var numofCompleteLine = path.getLength();
  for (var j = numofCompleteLine; j < numofTrackPoints; j++) {
    var currentPlot = trackpoints[j];
    if (!currentPlot) continue;
    var point = new google.maps.LatLng(currentPlot.getLatitude(), currentPlot.getLongitude());
    path.insertAt(path.getLength(), point);
  }
  if (
    track.isSelected() ||
    travisOptions.getShowCompleteTracksForAllFlights() ||
    complaintParams.getComplaintFlightsRunning()
  )
    track.getCompletePolyline().setMap(map);
  else track.getCompletePolyline().setMap(null);
  if (!track.getPolyline()) {
    var points = [];
    var trackObject = createTrackPolyline(
      points,
      currentTrackData.getAD(),
      track.isSelected(),
      false,
    );
    track.setPolyline(trackObject);
    trackObject.setMap(map);
    // Zaehle die Plots, die vor der Systemzeit liegen - die duerfen nicht angezeigt werden
    var plotsBeforeSysTime = 0;
    if (tailLength >= 0) {
      for (var x = 0; x < numofTrackPoints; x++) {
        if (sysTime - trackpoints[x].getTimeValue() > tailLength) plotsBeforeSysTime++;
        else break;
      }
      x = null;
    }
    track.setPlotsBeforeStartTime(plotsBeforeSysTime);
    // Option "Zeige Flugspuren" beachten!
    track.setPolylineVisible(bShowTrackData);
  }
  // Letzter (ggf. berechneter) Punkt mit Flugzeug-Icon muss aus dem Polygon wieder entfernt werden!
  var path = track.getPolyline().getPath();
  if (path.getLength() > 0) path.removeAt(path.getLength() - 1);
  var pointPlane;
  for (var j = track.getIndexLastVisiblePlot() + 1; j < numofTrackPoints; j++) {
    var currentPlot = trackpoints[j];
    if (!currentPlot) continue;
    // Zeige nur den Schweif der letzten Plots an (es sei denn, es soll komplett alles angezeigt werden)
    // Diese letzten Punkte werden ueber die zeitliche Distanz bestimmt!
    var timeValue = currentPlot.getTimeValue();
    var timeDist = sysTime - timeValue;
    var point = new google.maps.LatLng(currentPlot.getLatitude(), currentPlot.getLongitude());
    // Letzter Punkt gefunden! Berechne fuer Flugzeug-Icon und die Flag eine Zwischenposition zur Systemzeit
    if (j > 0 && (timeDist < 0 || j == numofTrackPoints - 1)) {
      var heading = currentPlot.getHeading();
      var flightOutOfRadarArea = false;
      pointPlane = point;
      if (j < numofTrackPoints) {
        currentPlot = trackpoints[j - 1];
        // letzten Plot vor Systemzeit nehmen!
        var timedistBetweenPlots = timeValue - currentPlot.getTimeValue();
        var factorCurrent = (sysTime - currentPlot.getTimeValue()) / timedistBetweenPlots;
        var factorNext = (timeValue - sysTime) / timedistBetweenPlots;
        // Wenn zwei Plots weit auseinander liegen, dann fehlen hier sicherlich einige und es macht dann keinen Sinn, das Heading zu interpolieren!
        if (timedistBetweenPlots > 15) {
          flightOutOfRadarArea = true;
          var curPosition = new google.maps.LatLng(
            currentPlot.getLatitude(),
            currentPlot.getLongitude(),
          );
          var nextPosition = new google.maps.LatLng(point.lat(), point.lng());
          heading = google.maps.geometry.spherical.computeHeading(curPosition, nextPosition);
          curPosition = null;
          nextPosition = null;
        } else {
          // Vorsicht: Um NORD herum ist das Berechnen des Heading schwierig, weil dort der Uebergang von 359 zu 0 erfolgt.
          var headingCurrent = parseInt(currentPlot.getHeading());
          var headingNext = parseInt(heading);
          if (headingCurrent > 270 && headingNext < 90) headingNext += 360;
          if (headingCurrent < 90 && headingNext > 270) headingCurrent += 360;
          heading = headingNext * factorCurrent + headingCurrent * factorNext;
          if (heading >= 360) heading -= 360;
        }
        pointPlane = new google.maps.LatLng(
          point.lat() * factorCurrent + currentPlot.getLatitude() * factorNext,
          point.lng() * factorCurrent + currentPlot.getLongitude() * factorNext,
        );
        timedistBetweenPlots = null;
        factorCurrent = null;
        factorNext = null;
        headingCurrent = null;
        headingNext = null;
      }
      if (flagsForall || track.isSelected() || (track.getMouseOver() && flyoverFlags)) {
        var flagtext = track.getFlagString(currentPlot, track.getMouseOver() && flyoverFlags);
        var size =
          bigFlags || track.isSelected() || (track.getMouseOver() && flyoverFlags)
            ? FlagRectType.FlightBig
            : FlagRectType.FlightSmall;
        if (!track.getFlagRect()) {
          // Neue Flag anlegen:
          var flag = new FlagRectangle(size, pointPlane, flagtext, track.isSelected());
          var handler = createMarkerClickHandler(flag, track, true);
          google.maps.event.addListener(flag, 'click', handler);
          track.setFlagRect(flag);
          flag = null;
        } else {
          var flag = track.getFlagRect();
          flag.setDrawParams(size, pointPlane, flagtext, track.isSelected());
          flag.draw();
          flag = null;
        }
        track.getFlagRect().slideDown();
        flagtext = null;
        size = null;
      } else {
        // Wenn kein Flag angezeigt werden soll, dann wegschmeissen:
        clearFlagRectObject(track);
      }
      // Flugzeug-Symbol:
      var airplaneIcon = track.getAirplaneIcon();
      if (!airplaneIcon) {
        var iconPlane = null;
        var iconSize = 0;
        // Groesse und Typ des Symbols abhaengig vom AC-Type
        var acc = currentTrackData.getACClass();
        switch (acc) {
          case 0:
            iconSize = 36;
            iconPlane = currentTrackData.getAD() === 'D' ? departureIconSmall2 : arrivalIconSmall2;
            break;
          case 1:
            iconSize = 44;
            iconPlane = currentTrackData.getAD() === 'D' ? departureIconBig2 : arrivalIconBig2;
            break;
          case 2:
            iconSize = 44;
            iconPlane = currentTrackData.getAD() === 'D' ? departureIconBig4 : arrivalIconBig4;
            break;
          case 3:
            iconSize = 36;
            iconPlane = currentTrackData.getAD() === 'D' ? departureIconSmall4 : arrivalIconSmall4;
            break;
          case 4:
            iconSize = 25;
            iconPlane = vfrIcon;
            break;
          case 5:
            iconSize = 25;
            iconPlane = heliIcon;
            break;
          default:
            iconSize = 36;
            iconPlane = currentTrackData.getAD() === 'D' ? departureIconSmall2 : arrivalIconSmall2;
            break;
        }
        // Neue Flag anlegen:
        airplaneIcon = new AirplaneIcon(pointPlane, iconPlane.src, heading, iconSize);
        var handler = createMarkerClickHandler(airplaneIcon, track, true);
        google.maps.event.addListener(airplaneIcon, 'click', handler);
        google.maps.event.addListener(airplaneIcon, 'mouseover', function() {
          track.setMouseOver(true);
          loadFlightTrack(track, globalSystemTime);
        });
        google.maps.event.addListener(airplaneIcon, 'mouseout', function() {
          track.setMouseOver(false);
          if (!track.isSelected() && !flagsForall) clearFlagRectObject(track);
        });
        track.setAirplaneIcon(airplaneIcon);
        airplaneIcon.draw();
      } else {
        airplaneIcon.setPosition(pointPlane);
        airplaneIcon.setHeading(heading);
        if (flightOutOfRadarArea) airplaneIcon.setOpacity(0.3);
        else airplaneIcon.setOpacity(1);
        airplaneIcon.draw();
      }
      heading = null;
      iconPlane = null;
      iconSize = null;
      acc = null;
      iconIndex = null;
      airplaneIcon = null;
      break;
    } else {
      if (timeDist >= 0 && (tailLength < 0 || timeDist <= tailLength)) {
        path.insertAt(path.getLength(), point);
        track.setIndexLastVisiblePlot(j);
      }
    }
    point = null;
    timeValue = null;
    timeDist = null;
  }
  // Letzter (ggf. berechneter) Punkt mit Flugzeug-Icon muss mit dem Polygon verbunden werden!
  if (pointPlane != null) {
    path.insertAt(path.getLength(), pointPlane);
  }
  pointPlane = null;
  points = null;
  j = null;
  // Die Plots, die schon veraltet sind, loeschen!
  if (tailLength >= 0 && path != null) {
    var plotsBeforeStartTime = track.getPlotsBeforeStartTime();
    while (true) {
      if (
        numofTrackPoints > plotsBeforeStartTime &&
        sysTime - trackpoints[plotsBeforeStartTime].getTimeValue() > tailLength
      ) {
        plotsBeforeStartTime++;
        path.removeAt(0);
      } else {
        break;
      }
    }
    track.setPlotsBeforeStartTime(plotsBeforeStartTime);
    plotsBeforeStartTime = null;
  }
  trackpoints = null;
  currentTrackData = null;
  path = null;
  numofTrackPoints = null;
}
function loadNMT(nmt, sysTime) {
  var levels = nmt.getLevels();
  var currentNE = nmt.getNoiseEvent(sysTime);
  var currentDT = nmt.getDowntime(sysTime);
  var isSelected = nmt.isSelected();
  // Wenn NMT-Daten erst nach der aktuellen Systemzeit beginnen oder schon vorher enden, dann muessen wir nichts laden!
  if (
    (currentState == TWState.Historical || currentState == TWState.LiveDelayed) &&
    levels.length > 0 &&
    (levels[0].getTime() > sysTime || levels[levels.length - 1].getTime() < sysTime)
  )
    return;
  var currentLevel = nmt.getCurrentLevelForNMT(sysTime);
  nmt.setCurrentLevel(currentLevel);
  var nmtText = '';
  var iconUrl = buildFilenameForNMTIcon(nmt, sysTime, isSelected, currentNE, currentDT);
  if (currentLevel > 20) nmtText = currentLevel.toFixed(1);
  var nmtIcon = nmt.getIconRect();
  if (!nmtIcon) {
    // Neues NMT-Icon anlegen:
    var position = new google.maps.LatLng(nmt.getLatitude(), nmt.getLongitude());
    nmtIcon = new NMTRectangle(position, iconUrl, nmtText, isSelected);
    nmt.setIconRect(nmtIcon);
    nmtIcon.setMap(map);
    var nmtHandler = createMarkerClickHandlerForNMT(nmtIcon, nmt);
    google.maps.event.addListener(nmtIcon, 'click', nmtHandler);
    google.maps.event.addListener(nmtIcon, 'mouseover', function() {
      nmt.setMouseOver(true);
      nmtUnderCursor = nmt;
      if (bShowNMTData) loadNMT(nmt, globalSystemTime);
      if (nmt.getFlagRect()) nmt.getFlagRect().redrawChart();
    });
    google.maps.event.addListener(nmtIcon, 'mouseout', function() {
      nmt.setMouseOver(false);
      nmtUnderCursor = null;
      clearFlagRectObjectNMT(nmt);
    });
    position = null;
  } else {
    nmtIcon.setDrawParams(iconUrl, nmtText, isSelected);
    nmtIcon.draw();
  }
  // NMTs haben bei Mouseover jetzt ebenfalls eine Flag:
  if (nmt.getMouseOver() && flyoverFlags) {
    var flagtext = nmt.getFlagString(currentLevel, currentDT, currentNE);
    if (!nmt.getFlagRect()) {
      // Neue Flag anlegen:
      var position = new google.maps.LatLng(nmt.getLatitude(), nmt.getLongitude());
      var flag = new FlagRectangle(FlagRectType.NMTNormal, position, flagtext, false);
      flag.setZIndex(10);
      var handler = createMarkerClickHandler(flag, nmt, true);
      google.maps.event.addListener(flag, 'click', handler);
      nmt.setFlagRect(flag);
      flag = null;
      position = null;
    } else {
      var flag = nmt.getFlagRect();
      flag.setDrawParams(FlagRectType.NMTNormal, flag.getPosition(), flagtext, false);
      flag.draw();
      flag = null;
    }
    flagtext = null;
  } else {
    // Wenn kein Flag angezeigt werden soll, dann wegschmeissen:
    clearFlagRectObjectNMT(nmt);
  }
  nmtIcon = null;
  levels = null;
  currentNE = null;
  currentDT = null;
  nmtText = null;
  isSelected = null;
}
function moveAirplanes() {
  clearTimeout(airplaneTimer);
  for (var i = 0; i < arrayTracks.length; i++) {
    loadFlightTrack(arrayTracks[i], globalSystemTime);
  }
  i = null;
  if (turboMode)
    airplaneTimer = setTimeout('moveAirplanes()', travisOptions.getMoveAirplaneTimerLengthTurbo());
  else airplaneTimer = setTimeout('moveAirplanes()', travisOptions.getMoveAirplaneTimerLength());
}
function updateNMTAndFriends() {
  clearTimeout(nmtAndFriendsTimer);
  for (var j = 0; j < arrayNMTs.length; j++) {
    if (bShowNMTData) loadNMT(arrayNMTs[j], globalSystemTime);
    if (arrayNMTs[j].getFlagRect()) arrayNMTs[j].getFlagRect().redrawChart();
  }
  j = null;
  updateSystemStatus(globalSystemTime);
  updateSelectedText(globalSystemTime);
  updateProfileDistanceTab();
  updateFlightTable();
  if (chartBig) chartBig.update(globalSystemTime, getSelectedNMT(), getSelectedTrack(), false);
  updateClosestApproach(globalSystemTime);
  if (selectedTrack >= 0) ShowAircraftPicture();
  else HideAircraftPicture();
  // Tag/Nacht-Darstellung aktualisieren
  adjustNightCurtain();
  nmtAndFriendsTimer = setTimeout('updateNMTAndFriends()', travisOptions.getUpdateNMTTimerLength());
}
function updateSystemTime() {
  clearTimeout(systemTimeTimer);
  if (!stopTimeCalculation) {
    globalSystemTime = getCurrentSystemTime();
    updateCurrentSystemTime(systemTime2FullString(globalSystemTime));
  }
  if (
    complaintParams.getComplaintFlightsRunning() &&
    !complaintParams.getSliderInMotion() &&
    !stopTimeCalculation
  ) {
    var currentStartTime = new Date(complaintParams.getTBegin() * 1000);
    //XXX DAS MUESSTE MAN EIGENTLICH VEREINHEITLICHEN KOENNEN - ABER WIE ???
    $('#sliderComplaintFlights').slider(
      'value',
      globalSystemTime - complaintParams.getTBegin() + offsetAirportToUTC,
    );
    currentStartTime = null;
  }
  if (turboMode)
    systemTimeTimer = setTimeout(
      'updateSystemTime()',
      travisOptions.getUpdateSystemTimeTimerLengthTurbo(),
    );
  else
    systemTimeTimer = setTimeout(
      'updateSystemTime()',
      travisOptions.getUpdateSystemTimeTimerLength(),
    );
}
function garbageCollect() {
  clearTimeout(garbageCollectTimer);
  // Garbage Collection: alte Tracks, Levels und NoiseEvents werden abgeraeumt:
  for (var i = 0; i < arrayTracks.length; i++) {
    // Veraltete Tracks muessen abgeraeumt werden:
    if (arrayTracks[i].getTrackData().getTimeLastScanned() < globalSystemTime) {
      if (complaintParams.getComplaintFlightsRunning())
        // Wenn eine Beschwerde angelegt wird, dann dürfen nur die Map-Objekte entfernt werden!
        clearTrackMapObjects(arrayTracks[i]);
      else clearCompleteTrack(arrayTracks[i]);
      if (selectedTrack == i) {
        selectedTrack = -1;
        updateDataPanel();
      } else if (selectedTrack > i && !complaintParams.getComplaintFlightsRunning()) {
        selectedTrack--;
      }
      if (!complaintParams.getComplaintFlightsRunning()) {
        arrayTracks[i] = null;
        arrayTracks.splice(i, 1);
        i--; // Muss sein, da durch das Splice alle folgenden Indizes um 1 verkleinert werden!
      }
    }
  }
  i = null;
  if (!complaintParams.getComplaintFlightsRunning()) {
    for (var j = 0; j < arrayNMTs.length; j++) {
      // Hier muessen wir nicht mehr benoetigte Levels und NoiseEvents abraeumen:
      var arrLevels = arrayNMTs[j].getLevels();
      while (arrLevels.length > 0 && arrLevels[0].getTime() < globalSystemTime - 305) {
        // Die 5 sicherheitshalber um Rundungsfehler auszuschliessen
        arrLevels[0] = null;
        arrLevels.shift();
        arrayNMTs[j].decrementIndexLastUsedLevel();
      }
      arrLevels = null;
      var arrNE = arrayNMTs[j].getNoiseEvents();
      while (arrNE.length > 0 && arrNE[0].getTStop() < globalSystemTime - 305) {
        arrNE[0] = null;
        arrNE.shift();
      }
      arrNE = null;
      var arrDT = arrayNMTs[j].getDowntimes();
      while (arrDT.length > 0 && arrDT[0].getTEnd() < globalSystemTime - 305) {
        arrDT[0] = null;
        arrDT.shift();
      }
      arrDT = null;
    }
    j = null; // Wegen eines Fehlers im IE bleiben manchmal Flugzeug-Symbole auf Position 0,0 liegen. Hiermit hoffentlich nicht mehr:
    //XXX Ist noch nicht zu Ende programmiert .....
    //XXX				if ( ieVersion > 0)
    //XXX				{
    //XXX					for ( var k = 0; k < arrayAirplaneIcons.length; k++)
    //XXX					{
    //XXX						var curAirplane = arrayAirplaneIcons[j];
    //XXX						if ( curAirplane.
    //XXX					}
    //XXX				}
  }
  garbageCollectTimer = setTimeout(
    'garbageCollect()',
    travisOptions.getGarbageCollectTimerLength(),
  );
}
function sortGrid(table, order) {
  currentFlightTableSortingOrder = order;
  // Remove all characters in c from s.
  var stripChar = function(s, c) {
    var r = '';
    for (var i = 0; i < s.length; i++) {
      r += c.indexOf(s.charAt(i)) >= 0 ? '' : s.charAt(i);
    }
    return r;
  };
  // Test for characters accepted in numeric values.
  var isNumeric = function(s) {
    var valid = '0123456789.,- ';
    var result = true;
    var c;
    for (var i = 0; i < s.length && result; i++) {
      c = s.charAt(i);
      if (valid.indexOf(c) <= -1) {
        result = false;
      }
    }
    return result;
  };
  // Sort table rows.
  var asc = order == 'asc';
  var rows = $(table)
    .find('tbody > tr')
    .get();
  var column = $(table)
    .parent('.bDiv')
    .siblings('.hDiv')
    .find('table tr th')
    .index($('th.sorted', '.flexigrid:has(' + table + ')'));
  rows.sort(function(a, b) {
    var keyA = $(asc ? a : b)
      .children('td')
      .eq(column)
      .text()
      .toUpperCase();
    var keyB = $(asc ? b : a)
      .children('td')
      .eq(column)
      .text()
      .toUpperCase();
    if ((isNumeric(keyA) || keyA.length < 1) && (isNumeric(keyB) || keyB.length < 1)) {
      keyA = stripChar(keyA, ', ');
      keyB = stripChar(keyB, ', ');
      if (keyA.length < 1) keyA = 0;
      if (keyB.length < 1) keyB = 0;
      keyA = new Number(parseFloat(keyA));
      keyB = new Number(parseFloat(keyB));
    }
    return keyA > keyB ? 1 : keyA < keyB ? -1 : 0;
  });
  // Rebuild the table body.
  $.each(rows, function(index, row) {
    $(table)
      .children('tbody')
      .append(row);
  });
  // Fix styles
  $(table)
    .find('tr')
    .removeClass('erow');
  // Clear the striping.
  $(table)
    .find('tr:odd')
    .addClass('erow');
  // Add striping to odd numbered rows.
  $(table)
    .find('td.sorted')
    .removeClass('sorted');
  // Clear sorted class from table cells.
  $(table)
    .find('tr')
    .each(function() {
      $(this)
        .find('td:nth(' + column + ')')
        .addClass('sorted'); //Add sorted class to sorted column cells.
    });
}
function updateFlightTable() {
  if (!bShowFlightTable) {
    if (bFlightTableVisible) {
      $('#flightTableContainer').slideUp(500, function() {
        document.getElementById('map_dimmer').style.display = 'none';
      });
      $('#dataPanel').css({ top: '38px' });
      bFlightTableVisible = false;
    }
    return;
  } else {
    if (!bFlightTableVisible) {
      $('#flightTableContainer').slideDown(500);
      bFlightTableVisible = true;
    }
  }
  var tabRows = document.getElementById('flexme').rows;
  var rows = Array();
  var flights = Array();
  var heights = Array();
  var atts = Array();
  var dests = Array();
  var numofTracks = arrayTracks.length;
  // Eine Zeile fuer jeden aktuellen Flug in die Tabelle laden:
  for (var i = 0; i < numofTracks; i++) {
    var track = arrayTracks[i];
    if (!track) continue;
    var trackData = track.getTrackData();
    if (!trackData) continue;
    var trackpoints = trackData.getPlots();
    if (!trackpoints) continue;
    var numofPlots = trackpoints.length;
    if (
      numofPlots > 0 &&
      trackpoints[0].getTimeValue() <= globalSystemTime &&
      globalSystemTime <= trackpoints[numofPlots - 1].getTimeValue()
    ) {
      var curFlightNo = trackData.getFlightNo();
      var curHeight = getCurrentHeightForFlight(track, globalSystemTime);
      var curATT = trackData.getATT().substr(11);
      var curDest = trackData.getAirportName();
      if (curHeight > -999) {
        heights.push(curHeight);
        atts.push(curATT);
        dests.push(curDest);
        rows.push({
          id: i + 1,
          cell: [trackData.getAD(), curATT, curFlightNo, curDest, curHeight],
        });
      } else {
        heights.push('');
        atts.push('');
        dests.push('');
        rows.push({
          id: i + 1,
          cell: [trackData.getAD(), curATT, curFlightNo, curDest, ''],
        });
      }
      flights.push(curFlightNo);
      curFlightNo = null;
      curHeight = null;
      curATT = null;
      curDest = null;
    }
    trackpoints = null;
    trackData = null;
    track = null;
    numofPlots = null;
  }
  var reloadTable = false;
  var tableFlights = Array();
  var numofTableRows = tabRows.length;
  for (var j = 0; j < numofTableRows; j++) {
    var td = tabRows[j].cells;
    var curFlightNo = $(td[2]).text();
    if (jQuery.inArray(curFlightNo, flights) >= 0) {
      tableFlights.push(curFlightNo);
    } else {
      reloadTable = true;
      break;
    }
  }
  if (!reloadTable) {
    var numofFlights = flights.length;
    for (var j = 0; j < numofFlights; j++) {
      var pos = jQuery.inArray(flights[j], tableFlights);
      if (pos >= 0) {
        // Daten aktualisieren:
        var td = tabRows[pos].cells;
        if ($(td[1]).text() != atts[j] || $(td[3]).text() != dests[j]) {
          reloadTable = true;
          break;
        }
        $(td[4])
          .text(heights[j])
          .width('47px')
          .css('text-align', 'right')
          .css('padding', '4px 2px 2px 2px');
      } else {
        reloadTable = true;
        break;
      }
    }
    numofFlights = null;
    j = 0;
  }
  if (reloadTable) {
    $('#flexme').flexAddData(
      eval({
        total: rows.length,
        page: 1,
        rows: rows,
      }),
    );
    // Tabelle wieder sortieren:
    sortGrid('#flexme', currentFlightTableSortingOrder);
    var selTrack = getSelectedTrack();
    // Zeilensymbol setzen: rot fuer Starts, gruen fuer Landungen
    var numofTableRows = tabRows.length;
    for (i = 0; i < numofTableRows; i++) {
      var td = tabRows[i].cells;
      var procIcon = "url('images/arrowArrival.png')";
      if ($(td[0]).text() == 'D') {
        procIcon = "url('images/arrowDeparture.png')";
      }
      $(td[0])
        .text('')
        .width('8pt')
        .css('background-image', procIcon);
      if (
        selTrack &&
        selTrack.getTrackData() &&
        selTrack.getTrackData().getFlightNo() == $(td[2]).text()
      ) {
        if (tabRows[i] && tabRows[i].addClass) tabRows[i].addClass('trSelected');
      }
      procIcon = null;
    }
    $('#dataPanel').css({ top: $('#flightTableContainer').outerHeight() + 38 + 'px' });
    selTrack = null;
  }
  rows = null;
  i = null;
  j = null;
  tabRows = null;
  flights = null;
  heights = null;
  numofTracks = null;
}
function procFlightTableEvent(celDiv, id) {
  $(celDiv).click(function() {
    closeSetupPanel();
    var rows = document.getElementById('flexme').rows;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].id.substr(3) == parseInt(id))
        selectTrackByFlightnumber($(rows[i].cells[2]).text());
    }
    centerOnSelectedTrack();
    updateDataPanel();
  });
}
function getFlightnumberForTableRow(id) {
  var row = document.getElementById('flexme').rows[parseInt(id - 0)];
  if (parseInt(row.id - 0) == parseInt(id - 0)) return $(row.cells[2]).text();
}
function selectTrackByFlightnumber(flightNo) {
  deselectAllItems();
  var len = arrayTracks.length;
  for (var x = 0; x < len; x++) {
    if (arrayTracks[x].getTrackData() && arrayTracks[x].getTrackData().getFlightNo() == flightNo) {
      selectedTrack = x;
      arrayTracks[x].setSelected(true);
      break;
    }
  }
  len = null;
  x = null;
}
function updateSelectionInFlightTable() {
  var tab = document.getElementById('flexme');
  if (!tab) return;
  var selTrack = getSelectedTrack();
  var tabRows = tab.rows;
  var numofTableRows = tabRows.length;
  for (i = 0; i < numofTableRows; i++) {
    var td = tabRows[i].cells;
    if (ieVersion <= 0 || ieVersion > 8) {
      if (selTrack && selTrack.getTrackData().getFlightNo() == $(td[2]).text())
        tabRows[i].addClass('trSelected');
      else tabRows[i].removeClass('trSelected');
    }
    td = null;
  }
  numofTableRows = null;
  tabRows = null;
  tab = null;
  selTrack = null;
}
function centerOnSelectedTrack() {
  var track;
  if (selectedTrack >= 0) track = arrayTracks[selectedTrack];
  if (track && track.getAirplaneIcon()) map.panTo(track.getAirplaneIcon().getPosition());
}
// Diese Funktion soll die Trackdaten regelmaessig aktualisieren.
// Sie ruft dazu falls noetig ein PHP-Skript auf, das die notwendigen Daten in eine XML-Datei schreibt und per AJAX uebergibt.
function loadOverlays() {
  //XXXXX				$("k-mapType").val( "TraVis").trigger('change');
  // Timer beenden, falls die Methode nicht ueber den Timer aufgerufen wird
  clearTimeout(loadTimer);
  // Im History-Modus kann die Zeit wegen hoeherem Abspieltempo die Live-Zeit ueberholen! Dann wechseln wir in den Live-Modus!
  var curTime = getCurrentTime();
  if (
    currentState == TWState.Historical &&
    globalSystemTime >= curTime - travisOptions.getLiveDelayTimeInMinutes() * 60
  ) {
    if (
      historicPoolUpdateTime >= 1 ||
      globalSystemTime - offsetAirportToUTC >=
        curTime - travisOptions.getLiveDelayTimeInMinutes() * 60
    ) {
      start_live_action();
      return;
    }
  }
  // Im Beschwerde-Modus wird nur ein bestimmter Zeitbereich abgespielt. Ist dieser ueberschritten, dann halten wir an!
  if (
    complaintParams.getComplaintFlightsRunning() &&
    historicPoolUpdateTime >= 1 &&
    globalSystemTime >= complaintParams.getTEnd() - offsetAirportToUTC
  ) {
    loadComplaintFlights();
    return;
  }
  // Wenn historische Ereignisse aus dem Puffer gelesen werden koennen, dann tun wir das auch:
  if (
    (currentState == TWState.Historical || currentState == TWState.LiveDelayed) &&
    historicPoolUpdateTime > 0
  ) {
    // Wenn der Pool noch ausreichend gefuellt ist, dann koennen wir hier Feierabend machen!
    // Ansonsten machen wir weiter und aktualisieren den Pool ab der aktuellen Systemzeit
    // Auch dann, wenn noch ein Request an den Server laeuft - dann duerfen wir keinen zweiten starten!
    if (historicPoolUpdateTime > globalSystemTime + replaySpeed * 15) {
      loadTimer = setTimeout('loadOverlays()', 1000);
      return;
    }
  }
  // Wenn noch ein Request unterwegs ist, dann koennen wir uns den Rest sparen. Ansonsten kommt es naemlich zu einem Zustand, in dem
  // sich die Requests gegenseitig ueberholen und blockieren.
  if (trackRequestActive) {
    loadTimer = setTimeout('loadOverlays()', 1000);
    return;
  }
  if (currentState != TWState.Paused && currentState != TWState.Stopped) {
    var phpTimeParameter = '';
    if (currentState == TWState.Historical || currentState == TWState.LiveDelayed) {
      if (historicPoolUpdateTime < 1) {
        if (currentState == TWState.LiveDelayed)
          phpTimeParameter = '&histTime=' + parseInt(historicStartTime + 0.5);
        else {
          if (complaintParams.getTBegin() > 0) {
            var stringTime = timeToServerString(complaintParams.getTBegin() - offsetAirportToUTC);
            phpTimeParameter = '&histTimeString=' + stringTime;
            stringTime = null;
          } else {
            phpTimeParameter = '&histTimeString=' + historicStartTimeString;
          }
        }
      } else {
        if (complaintParams.getTBegin() > 0) {
          var stringTime = timeToServerString(complaintParams.getTBegin() - offsetAirportToUTC);
          phpTimeParameter = '&histTimeString=' + stringTime;
          stringTime = null;
        } else {
          var stringTime = timeToServerString(globalSystemTime);
          phpTimeParameter = '&histTimeString=' + stringTime;
          stringTime = null;
        }
      }
      // Hier wird bei historischen Daten auch die Dauer (in Sekunden) des Puffers angegeben, der gefuellt werden soll.
      // Es werden dann durch die PHP-Datei alle Daten ermittelt, die in diesen Zeitraum fallen. Und die muessen dann gepuffert werden!
      if (
        complaintParams.getComplaintFlightsRunning() &&
        complaintParams.getTBegin() > 0 &&
        complaintParams.getTEnd() > 0
      ) {
        phpTimeParameter =
          phpTimeParameter +
          '&histLength=' +
          (complaintParams.getTEnd() - complaintParams.getTBegin());
      } else {
        var time2Load = Math.round(replaySpeed * 60);
        phpTimeParameter = phpTimeParameter + '&histLength=' + time2Load;
        time2Load = null;
      }
    }
    // Generate HTTP request to call getTravisData.php:
    var request;
    try {
      request = new XMLHttpRequest();
    } catch (e) {
      alert(
        unescape(
          'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
        ),
      );
      return;
    }
    if (request) {
      try {
        // travisOptions.getServerPath() = "https://travisltn.topsonic.aero/"
        //XXX alert( travisOptions.getServerPath() + 'getTravisData.php' + '?session=' + sessionID + phpTimeParameter);
        request.open(
          'GET',
          travisOptions.getServerPath() +
            'getTravisData.php' +
            '?session=' +
            sessionID +
            phpTimeParameter,
          true,
        );
      } catch (e) {
        alert(unescape('Problem Communicating with Server\n' + e));
      }
      phpTimeParameter = null;
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (currentState != TWState.Paused && currentState != TWState.Stopped) {
            // Now show the flight traces
            // These are generated from the tracks.xml XML file generated by the PHP call
            // This Math.random thing prevents the XML file from being cached in the browser! And that is important at this point !!!
            var xmlFileName =
              travisOptions.getServerPath() +
              'xmlSessionData/tracks' +
              sessionID +
              '.xml?r=' +
              Math.random();
            downloadUrl(xmlFileName, function(data, responseCode) {
              if (responseCode == 200) {
                loadData(xmlParse(data));
                request = null;
                trackRequestActive = false; // Naechster Request kann gestartet werden!
              } else {
                set_status_time_string('Server not responding .....');
              }
            });
            // Runde schliessende Klammer kommt von GDownloadUrl
            xmlFileName = null;
          }
        }
      };
      // HTTP-Request abschicken!
      try {
        trackRequestActive = true;
        request.send(null);
      } catch (e) {
        alert(unescape('Problem Sending to Server\n' + e));
      }
    }
  }
  loadTimer = setTimeout('loadOverlays()', 2000);
}
function HideClosestApproach() {
  document.getElementById('p2panelsecond1').style.display = 'none';
  closestApproachVisible = false;
}
function HideAircraftPicture() {
  document.getElementById('p2panelsecond2').style.display = 'none';
}
function ShowAircraftPicture() {
  document.getElementById('p2panelsecond2').style.display = 'block';
}
function updateClosestApproach(histTime) {
  var roundedCurTime = Math.round(histTime);
  var selTrack = getSelectedTrack();
  if (
    selTrack != null &&
    homeMarker != null &&
    selTrack.getTrackData() != null &&
    selTrack.getAirplaneIcon() != null
  ) {
    if (!closestApproachVisible) {
      document.getElementById('p2panelsecond1').style.display = 'block';
      closestApproachVisible = true;
    }
    if (selTrack.getTrackData().getAD() != lastClosestApproachType) {
      lastClosestApproachType = selTrack.getTrackData().getAD();
      if (lastClosestApproachType == 'A')
        document.getElementById('closestApproach').style.backgroundImage =
          "url('images/ClosestApproachArrival.png')";
      else
        document.getElementById('closestApproach').style.backgroundImage =
          "url('images/ClosestApproachDeparture.png')";
    }
    var curHeight = getCurrentHeightForFlight(selTrack, roundedCurTime) * 0.30479 - homeHeight;
    // Hoehe ueber der Home-Position, nicht ueber NN!
    if (curHeight > 100000) {
      // Am Ende des Tracks gibt es Probleme bei der Hoehenberechnung
      roundedCurTime = null;
      selTrack = null;
      curHeight = null;
      return;
    }
    if (curHeight < -300) curHeight = 0;
    var curTrackPosition = selTrack.getAirplaneIcon().getPosition();
    var horizDistance = google.maps.geometry.spherical.computeDistanceBetween(
      homePosition,
      curTrackPosition,
    );
    var heading = google.maps.geometry.spherical.computeHeading(homePosition, curTrackPosition);
    if (heading < 0) heading += 360;
    $('#closestApproachHeight').html(Math.round(curHeight) + ' m');
    $('#closestApproachHorzDist').html(Math.round(horizDistance) + ' m');
    var diagDistance = Math.round(Math.sqrt(horizDistance * horizDistance + curHeight * curHeight));
    if (diagDistance < Math.round(selTrack.getClosestApproachDistance()))
      diagDistance = Math.round(selTrack.getClosestApproachDistance());
    $('#closestApproachDiagDist').html(diagDistance + ' m');
    $('#closestApproachAngle').html(
      (Math.round(Math.atan(curHeight / horizDistance) * (450 / Math.atan(1))) / 10).toFixed(1) +
        '&deg;',
    );
    if (currentState != TWState.Live) {
      var head = selTrack.getClosestApproachHeading();
      var headRound = Math.round(head);
      if (headRound > 359) headRound = 0;
      $('#closestApproachNearest').html(
        'Closest Approach:' +
          '<br />' +
          Math.round(selTrack.getClosestApproachDistance()) +
          ' m / ' +
          (Math.round(selTrack.getClosestApproachAngle() * 10) / 10).toFixed(1) +
          '&deg; (' +
          timeToTimeString(selTrack.getClosestApproachTime()) +
          ')<br />' +
          'Direction: ' +
          headRound +
          '&deg; (' +
          headingToDirection(head) +
          ')',
      );
      head = null;
      headRound = null;
    } else {
      // Im Live-Modus koennen wir die kuerzeste Distanz nicht bestimmen!
      $('#closestApproachNearest').html('');
    }
    curHeight = null;
    curTrackPosition = null;
    horizDistance = null;
    diagDistance = null;
    heading = null;
  } else {
    document.getElementById('p2panelsecond1').style.display = 'none';
    closestApproachVisible = false;
  }
  roundedCurTime = null;
  selTrack = null;
}
function calculateClosestApproach() {
  if (homeMarker != null) {
    var len = arrayTracks.length;
    for (var x = 0; x < len; x++) {
      if (arrayTracks[x]) arrayTracks[x].calculateClosestApproach(homePosition, homeHeight);
    }
  }
}
function loadRoutesData(parsedData) {
  // Geladene Daten werden gespeichert, damit auch ein adhoc-Redraw ohne Anrufung des Servers moeglich ist!
  loadedRoutes = parsedData;
  // Alte Routen-Daten loeschen:
  var arrLengthRoutes = arrayRoutes.length;
  for (var z = 0; z < arrLengthRoutes; z++) {
    arrayRoutes[0].setMap(null);
    arrayRoutes[0] = null;
    arrayRoutes.shift();
  }
  z = null;
  arrLengthRoutes = null;
  if (parsedData != null && parsedData.documentElement != null) {
    var routes = parsedData.documentElement.getElementsByTagName('route');
    // Fuellen der ComboBox zur Auswahl der Routen:
    selectText = '<option value="None">' + 'None' + '</option>';
    for (var r = 0; r < routes.length; r++) {
      selectText += '<option value=';
      selectText += routes[r].getAttribute('name');
      selectText += '-';
      selectText += routes[r].getAttribute('runway');
      selectText += '>';
      selectText += routes[r].getAttribute('name');
      selectText += ' - ';
      selectText += routes[r].getAttribute('runway');
      selectText += '</option>';
    }
    selectText += '<option value="All">' + 'All' + '</option>';
    $('#k-routes').html(selectText);
    if (currentSelectedRoute != '')
      document.getElementById('k-routes').value = currentSelectedRoute;
    for (var k = 0; k < routes.length; k++) {
      // Anzeigefilter beachten (einstellbar ueber ComboBox)
      var currentRouteValue =
        routes[k].getAttribute('name') + '-' + routes[k].getAttribute('runway');
      if (
        currentSelectedRoute == '' ||
        currentSelectedRoute == 'None' ||
        (currentRouteValue != currentSelectedRoute && currentSelectedRoute != 'All')
      )
        continue;
      var segments = routes[k].getElementsByTagName('segment');
      var pointsLeft = [];
      var pointsRight = [];
      for (var j = 0; j < segments.length; j++) {
        var segmentType = parseInt(segments[j].getAttribute('type'));
        var leftStart = new google.maps.LatLng(
          parseFloat(segments[j].getAttribute('left_start_lat')),
          parseFloat(segments[j].getAttribute('left_start_lon')),
        );
        var leftEnd = new google.maps.LatLng(
          parseFloat(segments[j].getAttribute('left_end_lat')),
          parseFloat(segments[j].getAttribute('left_end_lon')),
        );
        var rightStart = new google.maps.LatLng(
          parseFloat(segments[j].getAttribute('right_start_lat')),
          parseFloat(segments[j].getAttribute('right_start_lon')),
        );
        var rightEnd = new google.maps.LatLng(
          parseFloat(segments[j].getAttribute('right_end_lat')),
          parseFloat(segments[j].getAttribute('right_end_lon')),
        );
        // Bei Geraden wird einfach eine gerade Linie zwischen Start- und Endpunkt erzeugt:
        if (segmentType == 0) {
          pointsLeft.push(leftStart);
          pointsLeft.push(leftEnd);
          pointsRight.push(rightStart);
          pointsRight.push(rightEnd);
        }
        // Bei Kurven wird es deutlich schwieriger:
        if (segmentType == 1 || segmentType == 2) {
          // Kurve
          // Kurvenwerte aus der XML-Datenstruktur lesen:
          var centerArc = new google.maps.LatLng(
            parseFloat(segments[j].getAttribute('arc_center_lat')),
            parseFloat(segments[j].getAttribute('arc_center_lon')),
          );
          var centerLineStart = new google.maps.LatLng(
            parseFloat(segments[j].getAttribute('center_start_lat')),
            parseFloat(segments[j].getAttribute('center_start_lon')),
          );
          var centerLineEnd = new google.maps.LatLng(
            parseFloat(segments[j].getAttribute('center_end_lat')),
            parseFloat(segments[j].getAttribute('center_end_lon')),
          );
          var startWidthLeft = parseInt(segments[j].getAttribute('startwidthleft'));
          var startWidthRight = parseInt(segments[j].getAttribute('startwidthright'));
          var endWidthLeft = parseInt(segments[j].getAttribute('endwidthleft'));
          var endWidthRight = parseInt(segments[j].getAttribute('endwidthright'));
          var turnRadius = parseInt(segments[j].getAttribute('turnradius'));
          var leftRadius = leftStart.distanceFrom(centerArc);
          var centerRadius = rightStart.distanceFrom(centerArc);
          var rightRadius = leftStart.distanceFrom(centerArc);
          var turnAngle = parseInt(segments[j].getAttribute('turnangle'));
          // Quadranten des Start- und Endpunktes im Verhaeltnis zum Kreismittelpunkt bestimmen:
          var startQuadrant = getQuadrant(centerLineStart, centerArc);
          var endQuadrant = getQuadrant(centerLineEnd, centerArc);
          var realLeftRadius = leftStart.distanceFrom(centerArc);
          var realRightRadius = rightStart.distanceFrom(centerArc);
          var realMiddleRadius = centerLineStart.distanceFrom(centerArc);
          // Berechne den maximalen Longitude-Wert, um den man vom Mittelpunkt des Kreises abweichen darf
          // Der wird natuerlich auf Hoehe des Mittelpunktes erreicht
          var maxDiffLongitudeLeft = GetMaxDiffLongitude(centerArc, realLeftRadius);
          var maxDiffLatitudeLeft = GetMaxDiffLatitude(centerArc, realLeftRadius) + 0.01;
          var maxDiffLongitudeRight = GetMaxDiffLongitude(centerArc, realRightRadius);
          var maxDiffLatitudeRight = GetMaxDiffLatitude(centerArc, realRightRadius) + 0.01;
          var maxDiffLongitudeCenter = GetMaxDiffLongitude(centerArc, realMiddleRadius);
          var maxDiffLatitudeCenter = GetMaxDiffLatitude(centerArc, realMiddleRadius) + 0.01;
          // Wenn ein Quadrant 0 ist, dann stimmt hier was nicht!
          if (startQuadrant > 0 && endQuadrant > 0) {
            // Die Schrittweite, um den die Longitude beim "Abtastverfahren" verschoben wird.
            // Kleinere Werte machen die Kurven sanfter, allerdings dauert's dann auch deutlich laenger!
            var changeLongitude = 0.003;
            // Startpunkte der beiden Begrenzungslinien werden auf jeden Fall hinzugefuegt
            pointsLeft.push(leftStart);
            pointsRight.push(rightStart);
            // Rechts- oder Linkskurve ???
            var isRightTurn = true;
            if (segmentType == 1) {
              isRightTurn = false;
            }
            // Abarbeiten der vier Quadranten:
            var currentQuadrant = startQuadrant;
            var angleInPreviousQuadrants = 0;
            for (var iQuadrant = 1; iQuadrant <= 4; iQuadrant++) {
              // Grenzwerte fuer Longitude setzen (unterschiedlich fuer Links- und Rechtskurven:
              var startLongInThisQuadrant = centerArc.lng();
              var endLongInThisQuadrant = centerArc.lng();
              if (!isRightTurn) {
                if (currentQuadrant == 1)
                  startLongInThisQuadrant = centerArc.lng() + maxDiffLongitudeCenter;
                if (currentQuadrant == 2)
                  endLongInThisQuadrant = centerArc.lng() - maxDiffLongitudeCenter;
                if (currentQuadrant == 3)
                  startLongInThisQuadrant = centerArc.lng() - maxDiffLongitudeCenter;
                if (currentQuadrant == 4)
                  endLongInThisQuadrant = centerArc.lng() + maxDiffLongitudeCenter;
              }
              if (isRightTurn) {
                if (currentQuadrant == 1)
                  endLongInThisQuadrant = centerArc.lng() + maxDiffLongitudeCenter;
                if (currentQuadrant == 2)
                  startLongInThisQuadrant = centerArc.lng() - maxDiffLongitudeCenter;
                if (currentQuadrant == 3)
                  endLongInThisQuadrant = centerArc.lng() - maxDiffLongitudeCenter;
                if (currentQuadrant == 4)
                  startLongInThisQuadrant = centerArc.lng() + maxDiffLongitudeCenter;
              }
              if (endQuadrant == currentQuadrant) endLongInThisQuadrant = centerLineEnd.lng();
              if (startQuadrant == currentQuadrant) startLongInThisQuadrant = centerLineStart.lng();
              // Wir arbeiten mit Drehwinkeln innerhalb der Quadranten, um bei nicht konstant breiten Kurven den richtigen Abstand zur Mittellinie berechnen zu k?n
              // Hier halten wir als Vergleichswert den Winkel des Startpunktes im aktuellen Quadranten fest:
              var startAngle = getTurnAngleInQuadrant(
                centerLineStart,
                centerArc,
                currentQuadrant,
                isRightTurn,
              );
              if (currentQuadrant != startQuadrant) startAngle = 0;
              // Maximalwerte bestimmen und Schrittrichtung setzen:
              var lngStep = changeLongitude;
              var maxLatitude = centerArc.lat();
              // var minLatitude = centerArc.lat() - maxDiffLatitudeLeft;
              var minLatitude = centerArc.lat() - maxDiffLatitudeCenter;
              if (currentQuadrant == 1 || currentQuadrant == 2) {
                // maxLatitude = centerArc.lat() + maxDiffLatitudeLeft;
                maxLatitude = centerArc.lat() + maxDiffLatitudeCenter;
                minLatitude = centerArc.lat();
              }
              if (
                (isRightTurn && (currentQuadrant == 3 || currentQuadrant == 4)) ||
                (!isRightTurn && (currentQuadrant == 1 || currentQuadrant == 2))
              ) {
                lngStep = -changeLongitude;
              }
              // In dieser Schleife werden die neuen Punkte der Kurve bestimmt. Dazu gehen wir schrittweise nach links oder rechts und
              // bestimmen den passenden Latitude-Wert dazu.
              // Das sieht ein bisschen kompliziert aus (besonders die Abbruchbedingung in der for-Schleife), aber das liegt daran, dass ich
              // Links- und Rechtskurven in einem Abwasch erledigen wollte. Ansonsten waere 'ne Menge Code doppelt gewesen.
              for (
                var newLong = startLongInThisQuadrant + lngStep;
                (isRightTurn &&
                  (((currentQuadrant == 1 || currentQuadrant == 2) &&
                    newLong <= endLongInThisQuadrant) ||
                    ((currentQuadrant == 3 || currentQuadrant == 4) &&
                      newLong >= endLongInThisQuadrant))) ||
                (!isRightTurn &&
                  (((currentQuadrant == 3 || currentQuadrant == 4) &&
                    newLong <= endLongInThisQuadrant) ||
                    ((currentQuadrant == 1 || currentQuadrant == 2) &&
                      newLong >= endLongInThisQuadrant)));
                newLong = newLong + lngStep
              ) {
                // Neuen Punkt auf der Mittellinie bestimmen und die Steigung der Geraden zwischen diesem Punkt
                // und dem Kreismittelpunkt sowie den aktuellen Drehwinkel bestimmen
                var newPoint = getPointOnArc(
                  newLong,
                  maxLatitude,
                  minLatitude,
                  centerArc,
                  realMiddleRadius,
                );
                var dSteigungGerade =
                  (newPoint.lat() - centerArc.lat()) / (newPoint.lng() - centerArc.lng());
                var curAngle =
                  getTurnAngleInQuadrant(newPoint, centerArc, currentQuadrant, isRightTurn) -
                  startAngle +
                  angleInPreviousQuadrants;
                // Wenn der Winkel zum gefundenen Punkt innerhalb des erlaubten Bereiches liegt, dann wird der Punkt hinzugefuegt
                if (curAngle <= turnAngle) {
                  // Abstand von der Mittellinie berechnen (muss nicht unbedingt konstant sein)
                  var targetDistanceLeft =
                    startWidthLeft + (curAngle / turnAngle) * (endWidthLeft - startWidthLeft);
                  var targetDistanceRight =
                    startWidthRight + (curAngle / turnAngle) * (endWidthRight - startWidthRight);
                  // Festlegen, ob die Verschiebung des gefundenen Punktes in negative Richtung erfolgen soll:
                  var targetDirectionLeftNegative = false;
                  if (isRightTurn && (currentQuadrant == 2 || currentQuadrant == 3))
                    targetDirectionLeftNegative = true;
                  if (!isRightTurn && (currentQuadrant == 1 || currentQuadrant == 4))
                    targetDirectionLeftNegative = true;
                  var targetDirectionRightNegative = !targetDirectionLeftNegative;
                  // Vom gefundenen Punkt auf der Mittellinie ausgehend die korrespondierenden Punkte auf der linken und rechten Seite bestimmen
                  // und in das Array der Routenbegrenzungspunkte einf?
                  pointsLeft.push(
                    getPointOnExtendedArc(
                      newPoint,
                      dSteigungGerade,
                      targetDistanceLeft,
                      targetDirectionLeftNegative,
                      centerArc,
                    ),
                  );
                  pointsRight.push(
                    getPointOnExtendedArc(
                      newPoint,
                      dSteigungGerade,
                      targetDistanceRight,
                      targetDirectionRightNegative,
                      centerArc,
                    ),
                  );
                }
                newPoint = null;
                dSteigungGerade = null;
                curAngle = null;
              }
              if (currentQuadrant == endQuadrant) {
                break;
              } else {
                if (isRightTurn) {
                  currentQuadrant--;
                  if (currentQuadrant < 1) currentQuadrant = 4;
                } else {
                  currentQuadrant++;
                  if (currentQuadrant > 4) currentQuadrant = 1;
                }
                angleInPreviousQuadrants += 90 - startAngle;
              }
            }
            // Endpunkt immer hinzufuegen
            pointsLeft.push(leftEnd);
            pointsRight.push(rightEnd);
          }
        }
        leftStart = null;
        leftEnd = null;
        rightStart = null;
        rightEnd = null;
      }
      // Die Punkte des rechten Pfades werden in umgekehrter Reihenfolge an den linken angehaengt.
      // Anschliessend wird das Polygon durch erneutes Hinzufuegen des Startpunktes geschlossen.
      pointsRight.reverse();
      var pointsAll = pointsLeft.concat(pointsRight);
      pointsAll.push(pointsLeft[0]);
      // Parameter: Punkte-Array, Farbe der Polygon-Linie, Dicke der Linie in Punkten, Durchsichtigkeit (je naeher an 1, desto weniger durchsichtig)
      var polygon = new GPolygon(pointsAll, '#00ff00', 2, 0.6, '#00ff00', 0.2);
      arrayRoutes.push(polygon);
      polygon.setMap(map);
    }
    routes = null;
  }
}
// Diese Funktion soll die Routen einmalig laden und die entsprechenden Bereiche auf der Karte anlegen.
// Sie ruft dazu ein PHP-Skript auf, dass die notwendigen Daten in eine XML-Datei schreibt.
function loadRoutes() {
  //XXXXX
  return;
  //XXXXX
  var request;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    alert(
      unescape(
        'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
      ),
    );
    return;
  }
  if (request) {
    try {
      request.open('GET', travisOptions.getServerPath() + 'getRoutes.php', true);
    } catch (e) {
      alert(unescape('Problem Communicating with Server\n' + e));
    }
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        // Routen werden aus der XML-Datei routes.xml erzeugt, die durch den PHP-Aufruf generiert wurde
        downloadUrl(travisOptions.getServerPath() + 'xmlSessionData/routes.xml', function(
          data,
          responseCode,
        ) {
          if (responseCode == 200) {
            loadRoutesData(xmlParse(data));
            request = null;
          }
        }); // Runde schliessende Klammer kommt von GDownloadUrl
      }
    };
    // HTTP-Request abschicken!
    try {
      request.send(null);
    } catch (e) {
      alert(unescape('Problem Sending to Server\n' + e));
    }
  }
}
// Diese Funktion soll die Flughafen- und Runway-Daten einmalig laden und die entsprechenden Bereiche auf der Karte anlegen.
// Sie ruft dazu ein PHP-Skript auf, dass die notwendigen Daten in eine XML-Datei schreibt.
function loadAirport() {
  var request;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    alert(
      unescape(
        'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
      ),
    );
    return;
  }
  if (request) {
    try {
      request.open('GET', travisOptions.getServerPath() + 'getAirportData.php', true);
    } catch (e) {
      alert(unescape('Problem Communicating with Server\n' + e));
    }
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        // Routen werden aus der XML-Datei routes.xml erzeugt, die durch den PHP-Aufruf generiert wurde
        downloadUrl(travisOptions.getServerPath() + 'xmlSessionData/airport.xml', function(
          data,
          responseCode,
        ) {
          if (responseCode == 200) {
            loadAirportData(xmlParse(data));
            request = null;
          }
        }); // Runde schliessende Klammer kommt von GDownloadUrl
      }
    };
    // HTTP-Request abschicken!
    try {
      request.send(null);
    } catch (e) {
      alert(unescape('Problem Sending to Server\n' + e));
    }
  }
}
function loadAirportData(parsedData) {
  // ARP wird mit einem Symbol markiert
  if (parsedData != null && parsedData.documentElement != null) {
    var airport = parsedData.documentElement.getElementsByTagName('airport');
    if (airport.length > 0) {
      var curAirport = airport[0];
      airportData.setName(curAirport.getAttribute('name'));
      airportData.setCompany(curAirport.getAttribute('company'));
      airportData.setIcao(curAirport.getAttribute('icao'));
      airportData.setIata(curAirport.getAttribute('iata'));
      airportData.setLat(parseFloat(curAirport.getAttribute('lat')));
      airportData.setLon(parseFloat(curAirport.getAttribute('lon')));
      airportData.setHeight(parseFloat(curAirport.getAttribute('height')));
      curAirport = null;
    }
    // Runways werden mit grauen Linien dargestellt
    var runways = parsedData.documentElement.getElementsByTagName('rwy');
    for (var i = 0; i < runways.length; i++) {
      var rwy = new RunwayData();
      rwy.setDesignator1(runways[i].getAttribute('designator1'));
      rwy.setDesignator2(runways[i].getAttribute('designator2'));
      rwy.setThr1Lat(parseFloat(runways[i].getAttribute('thr1_lat')));
      rwy.setThr1Lon(parseFloat(runways[i].getAttribute('thr1_lon')));
      rwy.setThr2Lat(parseFloat(runways[i].getAttribute('thr2_lat')));
      rwy.setThr2Lon(parseFloat(runways[i].getAttribute('thr2_lon')));
      rwy.setBearing1(parseFloat(runways[i].getAttribute('bearing1')));
      rwy.setBearing2(parseFloat(runways[i].getAttribute('bearing2')));
      rwy.setElevation1(parseFloat(runways[i].getAttribute('elevation1')));
      rwy.setElevation2(parseFloat(runways[i].getAttribute('elevation2')));
      rwy.setLength(parseFloat(runways[i].getAttribute('length')));
      rwy.setWidth(parseFloat(runways[i].getAttribute('width')));
      airportData.addRwy(rwy);
      var points = [];
      var point1 = new google.maps.LatLng(rwy.getThr1Lat(), rwy.getThr1Lon());
      points.push(point1);
      var point2 = new google.maps.LatLng(rwy.getThr2Lat(), rwy.getThr2Lon());
      points.push(point2);
      var rwyOptions = {
        map: map,
        path: points,
        strokeColor: '#000000',
        strokeOpacity: 0.5,
        strokeWeight: 3,
      };
      runwayObject = new google.maps.Polyline(rwyOptions);
      rwyOptions = null;
      point1 = null;
      point2 = null;
      points = null;
    }
    i = null;
    runways = null;
  }
}
function loadWeather() {
  if (doNotLoadWeather) return;
  // Timer beenden, falls die Methode nicht ueber den Timer aufgerufen wird
  clearTimeout(wetterTimer);
  if (currentState != TWState.Paused && currentState != TWState.Stopped) {
    var request;
    try {
      request = new XMLHttpRequest();
    } catch (e) {
      alert(
        unescape(
          'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
        ),
      );
      return;
    }
    if (request) {
      try {
        var phpTimeParameter = '&time=';
        phpTimeParameter += Math.round(globalSystemTime);
        request.open(
          'GET',
          travisOptions.getServerPath() +
            'getWeatherData.php' +
            '?session=' +
            sessionID +
            phpTimeParameter,
          true,
        ); //XXX								alert( travisOptions.getServerPath() + 'getWeatherData.php' + '?session=' + sessionID + phpTimeParameter);
      } catch (e) {
        alert(unescape('Problem Communicating with Server\n' + e));
      }
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          // Wetterdaten werden aus der XML-Datei weather.xml erzeugt, die durch den PHP-Aufruf generiert wurde
          downloadUrl(
            travisOptions.getServerPath() +
              'xmlSessionData/weather' +
              sessionID +
              '.xml?r=' +
              Math.random(),
            function(data, responseCode) {
              if (responseCode == 200) {
                loadWeatherData(xmlParse(data));
                request = null;
              }
            },
          ); // Runde schliessende Klammer kommt von GDownloadUrl
        }
      };
      // HTTP-Request abschicken!
      try {
        request.send(null);
      } catch (e) {
        alert(unescape('Problem Sending to Server\n' + e));
      }
    }
  }
  doNotLoadWeather = false;
  wetterTimer = setTimeout('loadWeather()', 11000);
}
function loadWeatherData(parsedData) {
  if (parsedData != null && parsedData.documentElement != null) {
    var weather = parsedData.documentElement.getElementsByTagName('weather');
    if (weather.length > 0) {
      var curWeather = weather[0];
      time = utcToAirportTimePlusLocal(parseInt(curWeather.getAttribute('time')));
      windspeed = parseFloat(curWeather.getAttribute('windspeed'));
      windspeed = Math.round(windspeed * 10) / 10;
      winddir = parseFloat(curWeather.getAttribute('winddir'));
      temp = parseFloat(curWeather.getAttribute('temp'));
      humidity = parseFloat(curWeather.getAttribute('humidity'));
      airpressure = parseFloat(curWeather.getAttribute('airpressure'));
      dewpoint = parseFloat(curWeather.getAttribute('dewpoint'));
      precipitate = parseFloat(curWeather.getAttribute('precipitate'));
      rain = curWeather.getAttribute('rain');
      if (rain === 'Y') rain = 'J';
      snow = curWeather.getAttribute('snow');
      if (snow === 'Y') rain = 'J';
      thunderstorm = curWeather.getAttribute('thunderstorm');
      if (thunderstorm === 'Y') rain = 'J';
      precipitateIntens = curWeather.getAttribute('precipitateIntens');
      visibility = parseFloat(curWeather.getAttribute('visibility'));
      cover = curWeather.getAttribute('cover');
      // Titel der Wetterbox aktualisieren (mit Datum der Wettermeldung)
      var timeString = timeToString(time);
      weather_title = 'WEATHER DATA' + '&nbsp;&nbsp;' + timeString;
      $('#container_title_weather').html(weather_title);
      document.getElementById('container_windrose').style.display = 'block';
      // Windanzeige abhaengig von Richtung und Geschwindigkeit setzen
      var windtext = '';
      var windIconPath = './Wetter/';
      if (windspeed < 0.5) {
        windIconPath += 'windStill';
        windtext = 'Windless';
      } else if (windspeed < 5.5) {
        windIconPath += 'windSchwach';
        windtext = 'Light wind';
      } else if (windspeed < 10.8) {
        windIconPath += 'windMaessig';
        windtext = unescape('Moderate wind');
      } else if (windspeed < 17.2) {
        windIconPath += 'windFrisch';
        windtext = 'Fresh wind';
      } else {
        windIconPath += 'windStark';
        windtext = 'Strong wind';
      }
      var windIconPathSmall = windIconPath;
      if (windIconPath != '') {
        windIconPath += '.png';
        windIconPathSmall += 'Klein.png';
      }
      if (numofWeatherLoad < 1) {
        var pos = $('#topbarWeather').offset();
        pos.top += 25;
        $('#weatherPanel').css({
          top: pos.top + 'px',
          left: pos.left + 'px',
        });
        $('#weatherPanel').show();
      }
      $('#windrichtung').attr('src', windIconPath);
      $('#windrichtung').attr('title', windtext);
      $('#windrichtung').changeImage(windIconPath);
      $('#windrichtung').rotatePos(winddir, 43, 199, 1);
      // Total doof! Beim ersten Mal stimmte oft die Position nicht - da muss man dann eben zweimal rotieren:
      if (numofWeatherLoad < 1) $('#windrichtung').rotatePos(winddir, 43, 199, 1);
      if (numofWeatherLoad < 1) {
        $('#weatherPanel').slideUp();
      }
      $('#topWindIcon').attr('src', windIconPathSmall);
      $('#topWindIcon').attr('title', windtext);
      $('#topWindIcon').changeImage(windIconPathSmall);
      var pos = $('#topbarWeather').offset();
      pos.left += 62;
      pos.top -= 2;
      $('#topWindIcon').rotatePos(winddir, pos.top, pos.left, 1);
      // Total doof! Beim ersten Mal stimmte oft die Position nicht - da muss man dann eben zweimal rotieren:
      if (numofWeatherLoad < 1) $('#topWindIcon').rotatePos(winddir, pos.top, pos.left, 1);
      $('#topWindspeedText').html(windspeed.toFixed(1) + ' m/s');
      var precip = 'No';
      if (precipitateIntens != '') {
        precip = 'Yes';
      }
      if (windspeed > 8) {
        document.getElementById('container_extremwind').style.display = 'block';
      } else {
        document.getElementById('container_extremwind').style.display = 'none';
      }
      // Textanzeige aktualisieren
      $('#container_wetterdaten').html(
        '<b>' +
          temp.toFixed(1) +
          ' &deg;C - ' +
          airpressure +
          ' hPa</b><br />' +
          'Humidity: ' +
          humidity +
          '%<br />' +
          'Wind speed: ' +
          windspeed +
          ' m/s<br />' +
          'Wind direction: ' +
          Math.round(winddir) +
          '&deg (' +
          headingToDirection(winddir) +
          ')<br />' +
          'Precipitation: ' +
          precip,
      );
      // Wetterbild aendern!
      isNight = getSunriseTime(time) > time || getSunsetTime(time) < time;
      wetterpath = './Wetter/';
      var wetternr = 0;
      var wetterbild = '';
      if (cover === 'SKC' || cover === 'CAVOK' || cover === 'CLR') wetternr = isNight ? 13 : 1;
      // sonnig/klar
      else if (cover === 'FEW' && (precipitateIntens === '' || (rain == 'N' && snow == 'N')))
        wetternr = isNight ? 14 : 2;
      // heiter
      else if (cover === 'SCT' && (precipitateIntens === '' || (rain == 'N' && snow == 'N')))
        wetternr = isNight ? 15 : 4;
      // wolkig
      else if (cover === 'BKN' && (precipitateIntens === '' || (rain == 'N' && snow == 'N')))
        wetternr = isNight ? 16 : 6;
      // bewoelkt
      else if (cover === 'OVC' && (precipitateIntens === '' || (rain == 'N' && snow == 'N')))
        wetternr = 7;
      // bedeckt
      else if (cover === 'OVC' && precipitateIntens === 'L' && rain == 'J') wetternr = 18;
      // leichter Regen
      else if (cover === 'OVC' && precipitateIntens === 'M' && rain == 'J') wetternr = 19;
      // maessiger Regen
      else if (cover === 'OVC' && precipitateIntens === 'H' && rain == 'J') wetternr = 20;
      // starker Regen
      else if (cover != 'OVC' && rain === 'J') wetternr = isNight ? 34 : 33;
      // Regenschauer
      else if (cover === 'OVC' && thunderstorm === 'J') wetternr = isNight ? 35 : 22;
      // Gewitter
      else if (cover != 'OVC' && thunderstorm === 'J') wetternr = 21;
      // Gewitterschauer
      else if (rain === 'J' && snow === 'J') wetternr = 28;
      // Schneeregen
      else if (snow === 'J' && precipitateIntens === 'L') wetternr = 29;
      // leichter Schneefall
      else if (snow === 'J' && precipitateIntens === 'M') wetternr = 30;
      // maessiger Schneefall
      else if (snow === 'J' && precipitateIntens === 'H') wetternr = 31;
      // starker Schneefall
      else if (visibility < 300 && visibility > 0) wetternr = 36;
      // Nebel
      else if (
        (cover === '' || cover == null) &&
        rain != 'J' &&
        snow != 'J' &&
        thunderstorm != 'J' &&
        precipitateIntens === '' &&
        (visibility >= 300 || visibility <= 0)
      )
        wetternr = isNight ? 13 : 1;
      // sonnig/klar?
      if (wetternr < 1) wetterbild = "url('" + wetterpath + "noweather.gif')";
      // Wettersituation passt in kein Schema -> kein Bild .....
      else wetterbild = "url('" + wetterpath + wetternr + ".gif')";
      var wettertext = '';
      switch (wetternr) {
        case 1:
          wettertext = 'Sunny';
          break;
        case 2:
          wettertext = 'Fair';
          break;
        case 4:
          wettertext = 'Cloudy';
          break;
        case 6:
          wettertext = 'Cloudy';
          break;
        case 7:
          wettertext = 'Overcast';
          break;
        case 13:
          wettertext = 'Clear';
          break;
        case 14:
          wettertext = 'Fair';
          break;
        case 15:
          wettertext = 'Cloudy';
          break;
        case 16:
          wettertext = 'Cloudy';
          break;
        case 18:
          wettertext = 'Light rain';
          break;
        case 19:
          wettertext = unescape('Rain');
          break;
        case 20:
          wettertext = 'Heavy rain';
          break;
        case 21:
          wettertext = 'Thundershower';
          break;
        case 22:
          wettertext = 'Thunderstorm';
          break;
        case 28:
          wettertext = 'Sleet';
          break;
        case 29:
          wettertext = 'Light snowfall';
          break;
        case 30:
          wettertext = unescape('Snowfall');
          break;
        case 31:
          wettertext = 'Heavy snowfall';
          break;
        case 33:
          wettertext = 'Shower';
          break;
        case 34:
          wettertext = 'Shower';
          break;
        case 35:
          wettertext = 'Thundershower';
          break;
        case 36:
          wettertext = 'Fog';
          break;
      }
      document.getElementById('container_wetter').style.backgroundImage = wetterbild;
      document.getElementById('container_wetter').title = wettertext;
      if (wetternr < 1)
        document.getElementById('topWeatherIcon').setAttribute('src', wetterpath + 'noweather.gif');
      else
        document
          .getElementById('topWeatherIcon')
          .setAttribute('src', wetterpath + wetternr + '.gif');
      document.getElementById('topWeatherIcon').title = wettertext;
      $('#topWeatherTemp').html(temp.toFixed(0) + '&deg;C');
      time = null;
      windspeed = null;
      winddir = null;
      temp = null;
      humidity = null;
      airpressure = null;
      dewpoint = null;
      precipitate = null;
      rain = null;
      snow = null;
      thunderstorm = null;
      precipitateIntens = null;
      visibility = null;
      cover = null;
      timeString = null;
      weather_title = null;
      windIconPath = null;
      isNight = null;
      wetterbild = null;
      wettertext = null;
      wetternr = null;
      windtext = null;
    }
  }
  weather = null;
  numofWeatherLoad++;
}
function loadMapOverlays(objectIDs) {
  var request;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    alert(
      unescape(
        'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
      ),
    );
    return;
  }
  if (request) {
    try {
      var phpParameter = '&ids=' + objectIDs;
      request.open(
        'GET',
        travisOptions.getServerPath() +
          'getMapOverlayData.php' +
          '?session=' +
          sessionID +
          phpParameter,
        true,
      ); //XXX								alert( travisOptions.getServerPath() + 'getMapOverlayData.php' + '?session=' + sessionID + phpParameter);
    } catch (e) {
      alert(unescape('Problem Communicating with Server\n' + e));
    }
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        downloadUrl(
          travisOptions.getServerPath() +
            'xmlSessionData/overlays' +
            sessionID +
            '.xml?r=' +
            Math.random(),
          function(data, responseCode) {
            if (responseCode == 200) {
              loadMapOverlayData(xmlParse(data));
              request = null;
            }
          },
        ); // Runde schliessende Klammer kommt von GDownloadUrl
      }
    };
    // HTTP-Request abschicken!
    try {
      request.send(null);
    } catch (e) {
      alert(unescape('Problem Sending to Server\n' + e));
    }
  }
}
function loadMapOverlayData(parsedData) {
  if (parsedData != null && parsedData.documentElement != null) {
    $('#mapOverlayPanel').slideDown();
    var mapOverlayData = parsedData.documentElement.getElementsByTagName('mapOverlay');
    var loadedINM = false;
    var loadedFootprint = false;
    for (i = 0; i < mapOverlayData.length; i++) {
      var curOverlay = mapOverlayData[i];
      // Laden von INM-Overlays:
      if (curOverlay.getAttribute('source') == 'INM') {
        geoJSON = curOverlay.getAttribute('overlay');
        geoJSON = geoJSON.replace(/'/g, '"');
        // Zunächst den alten Inhalt des Overlay-Containers löschen
        removeOverlayData();
        // Und dann den neuen Inhalt hinzufügen:
        var data = JSON.parse(geoJSON);
        mapOverlayObjects = map.data.addGeoJson(data);
        // Add some style.
        map.data.setStyle(function(feature) {
          return {
            fillColor: feature.getProperty('color'),
            fillOpacity: 0.35,
            strokeWeight: 0,
          };
        });
        // Set mouseover event for each feature.
        map.data.addListener('mouseover', function(event) {
          $('#inmInfoBox').html(
            'Value under cursor:<br />' +
              event.feature.getProperty('value').lower +
              ' - ' +
              event.feature.getProperty('value').upper +
              ' dB(A)',
          );
        });
        map.data.addListener('mouseout', function(event) {
          $('#inmInfoBox').html('Value under cursor:');
        });
        $('#inmInfoBoxName').html(
          curOverlay.getAttribute('name') + '<br/>' + curOverlay.getAttribute('description'),
        );
        loadedINM = true;
      }
      // Laden von TrackFootprint-Overlays:
      if (curOverlay.getAttribute('source') == 'TrackFootprint') {
        json = curOverlay.getAttribute('overlay');
        json = json.replace(/'/g, '"');
        var jsonObj = JSON.parse(json);
        footprintOverlay = new google.maps.GroundOverlay(
          travisOptions.getOverlayPath() + curOverlay.getAttribute('filename'),
          jsonObj.imageBounds,
          {
            opacity: 0.6,
            clickable: true,
          },
        );
        footprintOverlay.setMap(map);
        var colscaleHtml =
          "<div style='float: left; width: 255px; padding-bottom: 5px;'>Color scale:</div><div style='height:13px; float: left; padding-right: 5px;'><b>" +
          jsonObj.colorscale[0].between +
          '</b></div>';
        for (var i = 0; i < jsonObj.colorscale.length; i++) {
          if (jsonObj.colorscale[i].between)
            colscaleHtml +=
              "<div style='height:15px; width:15px; float: left; background-color:" +
              jsonObj.colorscale[i].color +
              "' title='" +
              jsonObj.colorscale[i].between +
              ' - ' +
              jsonObj.colorscale[i].and +
              "'></div>";
          else if (jsonObj.colorscale[i].above)
            colscaleHtml +=
              "<div style='height:15px; width:15px; float: left; background-color:" +
              jsonObj.colorscale[i].color +
              "' title='&ge; " +
              jsonObj.colorscale[i].above +
              "'></div>";
        }
        if (jsonObj.colorscale[jsonObj.colorscale.length - 1].above)
          colscaleHtml +=
            "<div style='height:13px; float: left; padding-left: 5px;'><b>&ge;" +
            jsonObj.colorscale[jsonObj.colorscale.length - 1].above +
            '</b></div>';
        else
          colscaleHtml +=
            "<div style='height:13px; float: left; padding-left: 5px;'><b>" +
            jsonObj.colorscale[jsonObj.colorscale.length - 1].and +
            '</b></div>';
        $('#footprintInfoBox').html(colscaleHtml);
        $('#footprintInfoBoxName').html(
          curOverlay.getAttribute('name') + '<br/>' + curOverlay.getAttribute('description'),
        );
        loadedFootprint = true;
      }
    }
    if (loadedINM) {
      $('#inmInfoBoxHeader').slideDown();
      $('#inmInfoBoxName').slideDown();
      $('#inmInfoBox').slideDown();
    } else {
      $('#inmInfoBoxHeader').slideUp();
      $('#inmInfoBoxName').slideUp();
      $('#inmInfoBox').slideUp();
    }
    if (loadedFootprint) {
      $('#footprintInfoBoxHeader').slideDown();
      $('#footprintInfoBoxName').slideDown();
      $('#footprintInfoBox').slideDown();
    } else {
      $('#footprintInfoBoxHeader').slideUp();
      $('#footprintInfoBoxName').slideUp();
      $('#footprintInfoBox').slideUp();
    }
  }
}
function removeOverlayData() {
  if (!mapOverlayObjects) return;
  for (var i = 0; i < mapOverlayObjects.length; i++) map.data.remove(mapOverlayObjects[i]);
}
function adjustNightCurtain() {
  if (currentState != TWState.Paused && currentState != TWState.Stopped) {
    // Nacht-Modus kann auch ausgeschaltet werden
    if (!nightMode) {
      nightcurtain.setOptions({ fillOpacity: 0 });
      return;
    }
    var curTime = globalSystemTime;
    // Nur beim Tageswechsel die Sonnendaten neu berechnen!
    if (beginOfDay(curTime * 1000) != lastSunriseCalcDay) {
      lastSunriseCalcDay = beginOfDay(curTime * 1000);
      sunriseTime = getSunriseTime(curTime);
      sunsetTime = getSunsetTime(curTime);
      // Daemm.erung beginnt 30 Minuten vor Auf- und Untergang und endet 30 Minuten danach.
      beginMorningDawn = sunriseTime - 1800;
      endMorningDawn = sunriseTime + 1800;
      beginEveningDawn = sunsetTime - 1800;
      endEveningDawn = sunsetTime + 1800;
    }
    var newOpacity = 0;
    if (beginMorningDawn < curTime && curTime < endMorningDawn)
      newOpacity = ((endMorningDawn - curTime) * 0.6) / 3600;
    else if (beginEveningDawn < curTime && curTime < endEveningDawn)
      newOpacity = ((curTime - beginEveningDawn) * 0.6) / 3600;
    else if (curTime > endEveningDawn || curTime < beginMorningDawn) newOpacity = 0.6;
    nightcurtain.setOptions({ fillOpacity: newOpacity });
    curTime = null;
    newOpacity = null;
  }
}
function fullscreen() {
  // Umschalten in den Vollbild-Modus
  var elem = document.getElementById('content');
  if (isInFullscreen()) {
    // Zurueck in den normalen Bildschirm-Modus
    if (elem.requestFullscreen) document.exitFullScreen();
    else if (elem.mozRequestFullScreen) document.mozCancelFullScreen();
    else if (elem.webkitRequestFullScreen) document.webkitCancelFullScreen();
  } else {
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullScreen) elem.webkitRequestFullScreen();
  }
}
function isInFullscreen() {
  var elem = document.getElementById('content');
  if (elem.requestFullscreen) return document.fullScreen;
  else if (elem.mozRequestFullScreen) return document.mozFullScreen;
  else if (elem.webkitRequestFullScreen) return document.webkitIsFullScreen;
  else return false;
}
function changeFullscreen() {
  if (isInFullscreen())
    document.getElementById('idFullscreen').style.backgroundImage =
      "url('images/normalscreen.png')";
  else
    document.getElementById('idFullscreen').style.backgroundImage = "url('images/fullscreen.png')";
}
function load() {
  // Controls initialisieren:
  $('.default').dropkick();
  var tooltipSpeed = $('.tooltipSpeed');
  tooltipSpeed.hide();
  document.addEventListener('fullscreenchange', changeFullscreen, false);
  document.addEventListener('mozfullscreenchange', changeFullscreen, false);
  document.addEventListener('webkitfullscreenchange', changeFullscreen, false);
  var tooltipComplaint = $('.tooltipComplaint');
  tooltipComplaint.hide();
  var sliderComplaint = $('#sliderComplaintFlights');
  var posComplaintSlider = sliderComplaint.offset();
  $('#sliderComplaintFlights').slider({
    animate: 'fast',
    range: 'min',
    max: 2 * travisOptions.getFlightComplaintReplayPeriod(),
    min: 0,
    step: 10,
    value: travisOptions.getFlightComplaintReplayPeriod(),
    stop: function(event, ui) {
      tooltipComplaint.fadeOut('fast');
      restartComplaintFlights(ui.value);
    },
    slide: function(event, ui) {
      var value = ui.value;
      var currentStartTime = new Date(complaintParams.getTBegin() * 1000);
      tooltipComplaint
        .css('left', posComplaintSlider.left + 7 + value * 0.12)
        .css('top', posComplaintSlider.top + 95)
        .text(
          timeToTimeStringNoSeconds(
            complaintParams.getTBegin() + currentStartTime.getTimezoneOffset() * 60 + value,
          ),
        );
    },
    start: function(event, ui) {
      tooltipComplaint.fadeIn('fast');
      startComplaintSlider(ui.value);
    },
  });
  var sliderSpeed = $('#sliderSpeed');
  var posSpeedSlider = sliderSpeed.offset();
  sliderSpeed.slider({
    animate: 'fast',
    range: 'min',
    max: 25,
    min: 1,
    step: 1,
    value: 1,
    start: function(event, ui) {
      tooltipSpeed.fadeIn('fast');
    },
    slide: function(event, ui) {
      var value = ui.value;
      tooltipSpeed
        .css('left', posSpeedSlider.left + 138 + value * 3)
        .css('top', posSpeedSlider.top - 3)
        .text(ui.value + 'x');
    },
    stop: function(event, ui) {
      tooltipSpeed.fadeOut('fast');
      replaySpeedChanged();
    },
  });
  $('#draggable').draggable({
    helper: 'clone',
    stop: function(e) {
      var mapPos = $('#map').offset();
      var point = new google.maps.Point(e.pageX - mapPos.left + 2, e.pageY - mapPos.top + 12);
      homePosition = mapOverlay.getProjection().fromContainerPixelToLatLng(point);
      show_home_location(false);
    },
  });
  if (isTouchDevice())
    document.getElementById('draggable').addEventListener(
      'click',
      function() {
        homePosition = arpPosition;
        show_home_location(false);
      },
      false,
    );
  $('#buttonLookupAddress')
    .button()
    .click(function() {
      lookupAddress();
    });
  $('#buttonShowAddress')
    .button()
    .click(function() {
      showComplainerAddress();
    });
  $('#buttonStartSpecificComplaint')
    .button()
    .click(function() {
      complaintStartSpecific();
    });
  $('#buttonStartGeneralComplaint')
    .button()
    .click(function() {
      complaintStartGeneral();
    });
  $('#buttonLoadComplaintFlights')
    .button()
    .click(function() {
      loadComplaintFlights();
    });
  $('#buttonComplaintSpecificBackToStart')
    .button()
    .click(function() {
      complaintSpecificBackToStart();
    });
  $('#buttonComplaintSpecificSummary')
    .button()
    .click(function() {
      complaintSpecificSummary();
    });
  $('#buttonComplaintGeneralBackToStart')
    .button()
    .click(function() {
      complaintGeneralBackToStart();
    });
  $('#buttonComplaintGeneralSummary')
    .button()
    .click(function() {
      complaintGeneralSummary();
    });
  $('#buttonComplaintSummaryBack')
    .button()
    .click(function() {
      if (complaintParams.getCurrentComplaintType() == ComplaintType.Specific)
        complaintSummaryBackToSpecific();
      else complaintSummaryBackToGeneral();
    });
  $('#buttonComplaintSummarySubmit')
    .button()
    .click(function() {
      complaintSubmit();
    });
  $('#buttonComplaintEnd')
    .button()
    .click(function() {
      complaintEnd();
    });
  $('#buttonComplaintContinue')
    .button()
    .click(function() {
      complaintContinue();
    });
  // Zunaechst checken wir, ob XMLHttpRequest funktioniert:
  try {
    var request = new XMLHttpRequest();
  } catch (e) {
    alert(
      unescape(
        'AJAX interface does not answer. Please check your internet options (e.g. XMLHTTP option must be activated)!',
      ),
    );
    return;
  }
  var myStyle = [
    {
      featureType: 'administrative.province',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      stylers: [{ hue: '#2c3e50' }, { saturation: 30 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ lightness: 95 }, { visibility: 'simplified' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];
  // Neuen StyledMapType namens TraVis anlegen!
  var travisMap = new google.maps.StyledMapType(myStyle, { name: 'TraVis' });
  // This function is called once when the script is started.
  // It creates the map and centers it on the ARP of the airport (fixed or call via DB?)
  var myOptions = {
    zoom: 11,
    center: arpPosition,
    mapTypeControl: false,
    panControl: false,
    navigationControl: false,
    scaleControl: true,
    scaleControlOptions: { position: google.maps.ControlPosition.BOTTOM_CENTER },
    zoomControl: false,
    overviewMapControl: true,
    overviewMapControlOptions: { opened: true },
    streetViewControl: false,
  };
  map = new google.maps.Map(document.getElementById('map'), myOptions);
  myOptions = null;
  // TraVis MapStyle mit der Karte verbinden
  map.mapTypes.set('TraVisMapStyle', travisMap);
  map.setMapTypeId('TraVisMapStyle');
  $('#k-mapType').dropkick('select', 'TraVis');
  // OpenStreetMap tile server
  map.mapTypes.set(
    'OSM',
    new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return 'http://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
      },
      tileSize: new google.maps.Size(256, 256),
      name: 'OpenStreetMap',
      maxZoom: 18,
    }),
  );
  map.setMapTypeId('OSM');
  // OpenStreetMap schwarz/weiß
  map.mapTypes.set(
    'OSM-BW',
    new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return (
          'http://a.tiles.wmflabs.org/bw-mapnik/' + zoom + '/' + coord.x + '/' + coord.y + '.png'
        );
      },
      tileSize: new google.maps.Size(256, 256),
      name: 'OpenStreetMap-BW',
      maxZoom: 18,
    }),
  );
  map.setMapTypeId('OSM-BW');
  nightcurtain = new google.maps.Circle({
    center: arpPosition,
    radius: 10000000,
    strokeWeight: 0,
    fillColor: '#000000',
    fillOpacity: 0,
    map: map,
  });
  mapOverlay = new google.maps.OverlayView();
  mapOverlay.draw = function() {};
  mapOverlay.setMap(map);
  var mcHandler = createMapClickHandler();
  currentClickHandler = google.maps.event.addListener(map, 'click', mcHandler);
  google.maps.event.addListener(nightcurtain, 'click', mcHandler);
  mcHandler = null;
  var mcrHandler = createMapClickRightHandler();
  google.maps.event.addListener(map, 'rightclick', mcrHandler);
  google.maps.event.addListener(nightcurtain, 'rightclick', mcrHandler);
  mcrHandler = null;
  var plOpts = {
    map: map,
    strokeColor: '#FFA500',
    strokeOpacity: 1,
    strokeWeight: 2,
  };
  distanceMarkerLine = new google.maps.Polyline(plOpts);
  plOpts = null;
  // Noch ein paar Handler:
  google.maps.event.addListener(map, 'center_changed', function() {
    closeHomeMenu();
  });
  google.maps.event.addListener(map, 'bounds_changed', function() {
    closeHomeMenu();
    for (var j = 0; j < arrayNMTs.length; j++) {
      if (arrayNMTs[j].getIconRect()) {
        arrayNMTs[j].getIconRect().draw();
      }
    }
    j = null;
  });
  // Muss sein, da ansonsten alle Marker auf Mobilgeraeten huepfen! Es muss mindestens ein Marker vorhanden sein!
  var blindMarker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(0, 0),
    icon: 'images/invisible.png',
  });
  blindMarker = null;
  // Routen laden:
  // Daten des Flughafens laden:
  loadAirport();
  // Gespeicherte Cookies auslesen:
  readCookies();
  chartBig = new ChartControl('chartControl', 'p2panelsecond0', 'chartSelection', null);
  // ACHTUNG! IE8 !!!
  // Damit die Achsen im IE8 vernuenftig angezeigt werden, muessen wir das draw initial aufrufen und das Control anschliessend
  // mit dem resetChartControl ganz schnell wieder unsichtbar machen. Das ist sooooo schlecht!
  chartBig.redraw();
  chartBig.reset();
  // NMT-Symbole preloaden:
  var img = new Image();
  img.src = 'images/nmtOrange.png';
  img = new Image();
  img.src = 'images/nmtOrangeSelected.png';
  img = new Image();
  img.src = 'images/nmtGrau.png';
  img = new Image();
  img.src = 'images/nmtGrauSelected.png';
  img = new Image();
  img.src = 'images/nmtGruen.png';
  img = new Image();
  img.src = 'images/nmtGruenSelected.png';
  img = new Image();
  img.src = 'images/nmtGelb.png';
  img = new Image();
  img.src = 'images/nmtGelbSelected.png';
  img = new Image();
  img.src = 'images/nmtRot.png';
  img = new Image();
  img.src = 'images/nmtRotSelected.png';
  img = new Image();
  img.src = 'images/nmtOrangeSmall.png';
  img = new Image();
  img.src = 'images/nmtOrangeSmallSelected.png';
  img = new Image();
  img.src = 'images/nmtGrauSmall.png';
  img = new Image();
  img.src = 'images/nmtGrauSmallSelected.png';
  img = new Image();
  img.src = 'images/nmtGruenSmall.png';
  img = new Image();
  img.src = 'images/nmtGruenSmallSelected.png';
  img = new Image();
  img.src = 'images/nmtGelbSmall.png';
  img = new Image();
  img.src = 'images/nmtGelbSmallSelected.png';
  img = new Image();
  img.src = 'images/nmtRotSmall.png';
  img = new Image();
  img.src = 'images/nmtRotSmallSelected.png';
  img = new Image();
  img.src = 'images/nmtTuerkisSmall.png';
  img = new Image();
  img.src = 'images/nmtTuerkisSmallSelected.png';
  img = null;
  // Flugzeug-Symbole preloaden:
  departureIconSmall2 = new Image();
  departureIconSmall2.src = './Flugzeug/Small/2TWDeparture/Icon.png';
  departureIconSmall2Sel = new Image();
  departureIconSmall2Sel.src = './Flugzeug/Small/2TWDeparture/Icon-selected.png';
  departureIconSmall4 = new Image();
  departureIconSmall4.src = './Flugzeug/Small/4TWDeparture/Icon.png';
  departureIconSmall4Sel = new Image();
  departureIconSmall4Sel.src = './Flugzeug/Small/4TWDeparture/Icon-selected.png';
  departureIconBig2 = new Image();
  departureIconBig2.src = './Flugzeug/Big/2TWDeparture/Icon.png';
  departureIconBig2Sel = new Image();
  departureIconBig2Sel.src = './Flugzeug/Big/2TWDeparture/Icon-selected.png';
  departureIconBig4 = new Image();
  departureIconBig4.src = './Flugzeug/Big/4TWDeparture/Icon.png';
  departureIconBig4Sel = new Image();
  departureIconBig4Sel.src = './Flugzeug/Big/4TWDeparture/Icon-selected.png';
  arrivalIconSmall2 = new Image();
  arrivalIconSmall2.src = './Flugzeug/Small/2TWArrival/Icon.png';
  arrivalIconSmall2Sel = new Image();
  arrivalIconSmall2Sel.src = './Flugzeug/Small/2TWArrival/Icon-selected.png';
  arrivalIconSmall4 = new Image();
  arrivalIconSmall4.src = './Flugzeug/Small/4TWArrival/Icon.png';
  arrivalIconSmall4Sel = new Image();
  arrivalIconSmall4Sel.src = './Flugzeug/Small/4TWArrival/Icon-selected.png';
  arrivalIconBig2 = new Image();
  arrivalIconBig2.src = './Flugzeug/Big/2TWArrival/Icon.png';
  arrivalIconBig2Sel = new Image();
  arrivalIconBig2Sel.src = './Flugzeug/Big/2TWArrival/Icon-selected.png';
  arrivalIconBig4 = new Image();
  arrivalIconBig4.src = './Flugzeug/Big/4TWArrival/Icon.png';
  arrivalIconBig4Sel = new Image();
  arrivalIconBig4Sel.src = './Flugzeug/Big/4TWArrival/Icon-selected.png';
  heliIcon = new Image();
  heliIcon.src = './Flugzeug/Heli/Icon.png';
  heliIconSel = new Image();
  heliIconSel.src = './Flugzeug/Heli/Icon-selected.png';
  vfrIcon = new Image();
  vfrIcon.src = './Flugzeug/VFR/Icon.png';
  vfrIconSel = new Image();
  vfrIconSel.src = './Flugzeug/VFR/Icon-selected.png';
  // Sonstige Symbole preloaden:
  var imgWind = new Image();
  imgWind.src = 'images/windStark.png';
  imgWind = new Image();
  imgWind.src = 'images/windStarkKlein.png';
  imgWind = new Image();
  imgWind.src = 'images/windFrisch.png';
  imgWind = new Image();
  imgWind.src = 'images/windFrischKlein.png';
  imgWind = new Image();
  imgWind.src = 'images/windMaessig.png';
  imgWind = new Image();
  imgWind.src = 'images/windMaessigKlein.png';
  imgWind = new Image();
  imgWind.src = 'images/windSchwach.png';
  imgWind = new Image();
  imgWind.src = 'images/windSchwachKlein.png';
  imgWind = new Image();
  imgWind.src = 'images/windStill.png';
  imgWind = new Image();
  imgWind.src = 'images/windStillKlein.png';
  // Datenschutz-Dialog:
  var dialog = $(
    '<div style="text-align: left;"><b>How we collect your data</b><br />We collect the personal data you submit to us when you write to us or speak with us.<br /><br /><b>What data will we collect</b><br />We may collect your name, telephone numbers, email address, address, signature, photographic images, vehicle registration numbers, dates of attending the airport, payment details, proofs of identification (including passports, driving licences etc), medical records.<br /><br /><b>Why we need your data</b><br />We need to know your personal data for the purposes of<br />1. corresponding with you;<br />2. investigating and recording any incidents you may inform us of; and<br />3. demonstrating compliance with our legal obligations to our regulators.<br />If we do not collect your personal data, we may not be able to fulfil these purposes. We will only collect the personal data about you which we need for these purposes alone.<br />The lawful basis for our processing of your personal data is based on our legitimate interest in dealing with your complaint or correspondence.<br /><br /><b>What we do with your data</b><br />All the personal data we process is processed by our staff in the UK. We may provide your data to:<br />1. our sub-contractors for the purposes of investigating a complaint or enquiry;<br />2. airlines, concessionaires or any other party operating at the airport to which a complaint or enquiry relates for the purposes of their answering or addressing such complaint or enquiry;<br />3. our regulators for the purpose of demonstrating compliance with our legal obligations;<br />4. our insurers or solicitors for the purpose of dealing with any potential legal claims; and<br />5. law enforcement agencies for the purposes of their investigations.<br />Your data will not be transferred outside of the UK by us or any 3rd parties. We do not use personal data in connection with any automated decision making.<br /><br /><b>How long we keep your data</b><br />We may keep the data we collect about you for up to 12 months unless:<br />1. we are asked to retain such information for a longer period by any law enforcement agency, in which case we will keep it for such period as is required by the relevant law enforcement agency;<br />2. the data relates to a potential legal claim in respect of personal injury, in which case we may keep such data for up to 3 years;<br />3. the data relates to any other legal claim; in which case we may keep such data for up to 6 years;<br />4. the data relates to noise complaints, in which case we may keep such data for up to 4 years; or<br />5. there are ongoing legal proceedings in respect of which the data is relevant, in which case we may keep the data for the duration of such legal proceedings.<br />After the applicable time period set out above the data will be destroyed.</div>',
  ).dialog({
    title: 'PRIVACY NOTICE',
    height: 500,
    width: 800,
    modal: true,
    show: {
      effect: 'blind',
      duration: 500,
    },
    buttons: [
      {
        text: 'OK',
        click: function() {
          dialog.remove();
          dialog = null;
          // We start in live mode - except if external parameters are specified!
          if (travisOptions.getInitialStartTime() > 0)
            setTimeout(
              'start_archive_action_with_params( travisOptions.getInitialStartTime(), travisOptions.getInitialDisplaySpeed(), travisOptions.getInitialHomeAddressLat(), travisOptions.getInitialHomeAddressLon())',
              2000,
            );
          else setTimeout('start_live_action()', 2000);
        },
      },
    ],
  }); // OHNE DEN STARTDIALOG EINFACH SO:
  //				// We start in live mode - except if external parameters are specified!
  //				if ( travisOptions.getInitialStartTime() > 0)
  //					setTimeout( "start_archive_action_with_params( travisOptions.getInitialStartTime(), travisOptions.getInitialDisplaySpeed(), travisOptions.getInitialHomeAddressLat(), travisOptions.getInitialHomeAddressLon())", 2000);
  //				else
  //					setTimeout( "start_live_action()", 2000);
}

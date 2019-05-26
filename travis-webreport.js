/// Garbage scraped from travisltn.topsonic.aero

var selectedLanguage = 'LANG_UNDEFINED';

selectedLanguage = 'LANG_ENGLISH';
arrayMonths = new Array(
  '-',
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
);
arrayShortMonths = new Array(
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
);
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

function generate_new_session_id() {
  var t = new Date();
  sessionStartTime = t.getTime();
  t = null;
  sessionID = Math.floor(sessionStartTime * Math.random());
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

function getCurrentTimeBase() {
  var timeBase = 0;
  if (selectedMonth <= 0 && selectedDay <= 0) timeBase = 2;
  else if (selectedDay <= 0) timeBase = 1;

  return timeBase;
}

function GetDaysInMonth(iFullYear, iMonth) {
  return new Date(iFullYear, iMonth % 12, 0).getDate();
}

function getHeaderTitle(header) {
  // �berschrift anpassen:
  var headline = header + ' ';
  if (selectedDay > 0 && selectedMonth > 0) headline += selectedDay + '. ';
  if (selectedMonth > 0) headline += arrayMonths[selectedMonth] + ' ';
  headline += selectedYear + ' - ' + arrayNMTNames[selectedNMTIndex];

  return headline;
}

function getHeaderTitleNoNMT(header) {
  // �berschrift anpassen:
  var headline = header + ' ';
  if (selectedDay > 0 && selectedMonth > 0) headline += selectedDay + '. ';
  if (selectedMonth > 0) headline += arrayMonths[selectedMonth] + ' ';
  headline += selectedYear;

  return headline;
}

function getSelectedDateString() {
  var dateString = '';
  if (selectedDay > 0 && selectedMonth > 0) dateString += selectedDay + '. ';
  if (selectedMonth > 0) dateString += arrayMonths[selectedMonth] + ' ';
  dateString += selectedYear;

  return dateString;
}

function getIndexForNMTId(nmtid) {
  for (var i = 0; i < arrayNMTIDs.length; i++) {
    if (arrayNMTIDs[i] == nmtid) return i;
  }
}

function getCoordinateString(coordDecimal) {
  var grad = parseInt(coordDecimal);
  var nurMinuten = ((coordDecimal - grad) * 60).toString();
  var minuten = parseInt(nurMinuten);
  var nurSekunden = (nurMinuten - minuten) * 60;
  var sekunden = Math.round(nurSekunden * 1000) / 1000;

  return grad + '&deg; ' + minuten + '&prime; ' + sekunden + '&Prime;';
}
// Erster Uebergabeparameter beim Aufruf der PHP-Datei ist eine Zufallszahl, die aus der Uhrzeit ermittelt wird
// und quasi als SessionID an den Namen der XML-Datei angehaengt wird:
var sessionID = 0;
generate_new_session_id();

var trackRequestActive = false;

// Datenobjekte f�r die Einstellparameter (NMT und Zeit);
var selectedNMTID = 1;
var selectedDay = 0;
var selectedMonth = 0;
var selectedYear = 0;
var startMonth = 0;
var selectedNMTIndex = 0;

arrayNMTIDs = new Array('0');
arrayNMTNames = new Array('-');
arrayNMTValidFroms = new Array('0');
arrayNMTValidTos = new Array('0');

// Tabellen- und Diagrammobjekte
var tableDataFrequency;
var tableDataFrequencyForTable;
var tableDataFrequencyHistDay;
var tableDataFrequencyHistNight;

var tableDataFrequency6vM;
var tableDataFrequencyForTable6vM;
var tableDataFrequencyHistDay6vM;
var tableDataFrequencyHistNight6vM;

var chartFrequency;
var tableFrequency;
var tableFrequencyHistDay;
var tableFrequencyHistNight;

var tableDataNoiseStatFLG;
var tableDataNoiseStatFLGForTable;
var chartNoiseStatFLG;
var tableNoiseStatFLG;
var tableDataNoiseStatEU;
var tableDataNoiseStatEUForTable;
var chartNoiseStatEU;
var tableNoiseStatEU;

var chartFlightCount;
var tableFlightCount;
var tableDataFlightCount;
var tableDataFlightCountForTable;
var tableDataFlightCount6vM;
var tableDataFlightCountForTable6vM;
var chartDirection;
var tableDirection;
var tableDataDirection;
var tableDataDirectionForTable;
var tableDataDirection6vM;
var tableDataDirectionForTable6vM;

var tableTypemix;
var tableDataTypemixForTable;
var tableDataTypemixForTable6vM;

arrayNMTIDs.push(1);
arrayNMTNames.push('NMT01 Frogmore');
arrayNMTValidFroms.push('916790400');
selectedNMTIndex = arrayNMTIDs.length - 1;
arrayNMTIDs.push(2);
arrayNMTNames.push('NMT02 Grove Farm');
arrayNMTValidFroms.push('916790400');
arrayNMTValidTos.push('');
arrayNMTIDs.push(3);
arrayNMTNames.push('NMT03 Pepsal End Farm');
arrayNMTValidFroms.push('916790400');
arrayNMTValidTos.push('');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1493852400');
arrayNMTValidTos.push('');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1496790000');
arrayNMTValidTos.push('1496790000');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1497826800');
arrayNMTValidTos.push('1497826800');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1498604400');
arrayNMTValidTos.push('1498604400');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1506639600');
arrayNMTValidTos.push('1506639600');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1526338800');
arrayNMTValidTos.push('1526338800');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1529535600');
arrayNMTValidTos.push('1529535600');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1536015600');
arrayNMTValidTos.push('1536015600');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1536188400');
arrayNMTValidTos.push('1536188400');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1548115200');
arrayNMTValidTos.push('1548115200');
arrayNMTIDs.push(5);
arrayNMTNames.push('NMT05 Mobile NMT 2');
arrayNMTValidFroms.push('1557183600');
arrayNMTValidTos.push('1557183600');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1493852400');
arrayNMTValidTos.push('');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1493938800');
arrayNMTValidTos.push('1493938800');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1502924400');
arrayNMTValidTos.push('1502924400');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1504825200');
arrayNMTValidTos.push('1504825200');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1506294000');
arrayNMTValidTos.push('1506294000');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1508281200');
arrayNMTValidTos.push('1508281200');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1530572400');
arrayNMTValidTos.push('1530572400');
arrayNMTIDs.push(6);
arrayNMTNames.push('NMT06 Mobile NMT 3');
arrayNMTValidFroms.push('1534114800');
arrayNMTValidTos.push('1534114800');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1493852400');
arrayNMTValidTos.push('');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1493938800');
arrayNMTValidTos.push('1493938800');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1503961200');
arrayNMTValidTos.push('1503961200');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1505775600');
arrayNMTValidTos.push('1505775600');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1518652800');
arrayNMTValidTos.push('1518652800');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1526338800');
arrayNMTValidTos.push('1526338800');
arrayNMTIDs.push(7);
arrayNMTNames.push('NMT07 Mobile NMT 4');
arrayNMTValidFroms.push('1537138800');
arrayNMTValidTos.push('1537138800');
arrayNMTIDs.push(8);
arrayNMTNames.push('NMT08 Mobile NMT 5');
arrayNMTValidFroms.push('0');
arrayNMTValidTos.push('');
arrayNMTIDs.push(8);
arrayNMTNames.push('NMT08 Mobile NMT 5');
arrayNMTValidFroms.push('1541721600');
arrayNMTValidTos.push('1541721600');
arrayNMTIDs.push(8);
arrayNMTNames.push('NMT08 Mobile NMT 5');
arrayNMTValidFroms.push('1556233200');
arrayNMTValidTos.push('1556233200');
arrayNMTIDs.push(9);
arrayNMTNames.push('NMT09 Mobile NMT 6');
arrayNMTValidFroms.push('1536015600');
arrayNMTValidTos.push('');
arrayNMTIDs.push(9);
arrayNMTNames.push('NMT09 Mobile NMT 6');
arrayNMTValidFroms.push('1536620400');
arrayNMTValidTos.push('1536620400');
arrayNMTIDs.push(9);
arrayNMTNames.push('NMT09 Mobile NMT 6');
arrayNMTValidFroms.push('1554332400');
arrayNMTValidTos.push('1554332400');
arrayNMTIDs.push(10);
arrayNMTNames.push('NMT10 Mobile NMT 7');
arrayNMTValidFroms.push('1542240000');
arrayNMTValidTos.push('');
arrayNMTValidTos.push('');
startMonth = 1554073200;
var ServerPath = 'http://travisltn.topsonic.aero/WebReport/';

function setCheckValue(strControlID, check) {
  if (document.getElementById(strControlID)) {
    document.getElementById(strControlID).setProperty('checked', check);
    FancyForm.update(document.getElementById(strControlID).getParent());
  }
}

function showNumofFlightsYear() {
  setCheckValue('idNumofFlightsYear', true);
  setCheckValue('idNumofFlights6vM', false);

  var StyleRows = {
    tableRow: 'TableRowCentered',
    tableCell: 'TableCellCentered',
    selectedTableRow: 'TableCellSelected',
    hoverTableRow: 'TableCellSelected',
  };
  var tableWidth = tableDataFlightCountForTable.getNumberOfColumns() * 52 + 25;

  chartFlightCount.draw(tableDataFlightCount, {
    titlePosition: 'none',
    fontSize: 10,
    colors: ['#bbc0c3', '#4fbaad'],
    chartArea: { left: 50, top: 10, height: 170 },
    width: 750,
    height: 220,
    legend: { position: 'right' },
    hAxis: { slantedText: false, maxAlternation: 1 },
    axisTitlesPosition: 'out',
    animation: { duration: 1000, easing: 'inAndOut' },
    isStacked: true,
    connectSteps: false,
    areaOpacity: 1.0,
  });
  tableFlightCount.draw(tableDataFlightCountForTable, {
    allowHtml: true,
    titlePosition: 'none',
    alternatingRowStyle: false,
    sort: 'disable',
    width: tableWidth,
    cssClassNames: StyleRows,
  });
}

function showNumofFlights6vM() {
  setCheckValue('idNumofFlightsYear', false);
  setCheckValue('idNumofFlights6vM', true);

  var StyleRows = {
    tableRow: 'TableRowCentered',
    tableCell: 'TableCellCentered',
    selectedTableRow: 'TableCellSelected',
    hoverTableRow: 'TableCellSelected',
  };
  var tableWidth = tableDataFlightCountForTable.getNumberOfColumns() * 52 + 25;

  chartFlightCount.draw(tableDataFlightCount6vM, {
    titlePosition: 'none',
    fontSize: 10,
    colors: ['#bbc0c3', '#4fbaad'],
    chartArea: { left: 50, top: 10, height: 170 },
    width: 750,
    height: 220,
    legend: { position: 'right' },
    hAxis: { slantedText: false, maxAlternation: 1 },
    axisTitlesPosition: 'out',
    animation: { duration: 1000, easing: 'inAndOut' },
    isStacked: true,
    connectSteps: false,
    areaOpacity: 1.0,
  });
  tableFlightCount.draw(tableDataFlightCountForTable6vM, {
    allowHtml: true,
    titlePosition: 'none',
    alternatingRowStyle: false,
    sort: 'disable',
    width: tableWidth,
    cssClassNames: StyleRows,
  });
}

function showDirectionYear() {
  setCheckValue('idDirectionYear', true);
  setCheckValue('idDirection6vM', false);

  var StyleRows = {
    tableRow: 'TableRowCentered',
    tableCell: 'TableCellCentered',
    selectedTableRow: 'TableCellSelected',
    hoverTableRow: 'TableCellSelected',
  };
  var tableWidth = tableDataDirectionForTable.getNumberOfColumns() * 52 + 25;

  chartDirection.draw(tableDataDirection, {
    titlePosition: 'none',
    fontSize: 10,
    colors: ['#bbc0c3', '#4fbaad'],
    chartArea: { left: 50, top: 10, height: 170 },
    width: 750,
    height: 220,
    legend: { position: 'right' },
    vAxis: { titleTextStyle: { italic: false }, title: 'Percent' },
    hAxis: { slantedText: false, maxAlternation: 1 },
    axisTitlesPosition: 'out',
    animation: { duration: 1000, easing: 'inAndOut' },
    isStacked: true,
    connectSteps: false,
    areaOpacity: 1.0,
  });
  tableDirection.draw(tableDataDirectionForTable, {
    allowHtml: true,
    titlePosition: 'none',
    alternatingRowStyle: false,
    sort: 'disable',
    width: tableWidth,
    cssClassNames: StyleRows,
  });
}

function showDirection6vM() {
  setCheckValue('idDirectionYear', false);
  setCheckValue('idDirection6vM', true);

  var StyleRows = {
    tableRow: 'TableRowCentered',
    tableCell: 'TableCellCentered',
    selectedTableRow: 'TableCellSelected',
    hoverTableRow: 'TableCellSelected',
  };
  var tableWidth = tableDataDirectionForTable.getNumberOfColumns() * 52 + 25;

  chartDirection.draw(tableDataDirection6vM, {
    titlePosition: 'none',
    fontSize: 10,
    colors: ['#bbc0c3', '#4fbaad'],
    chartArea: { left: 50, top: 10, height: 170 },
    width: 750,
    height: 220,
    legend: { position: 'right' },
    vAxis: { titleTextStyle: { italic: false }, title: 'Percent' },
    hAxis: { slantedText: false, maxAlternation: 1 },
    axisTitlesPosition: 'out',
    animation: { duration: 1000, easing: 'inAndOut' },
    isStacked: true,
    connectSteps: false,
    areaOpacity: 1.0,
  });
  tableDirection.draw(tableDataDirectionForTable6vM, {
    allowHtml: true,
    titlePosition: 'none',
    alternatingRowStyle: false,
    sort: 'disable',
    width: tableWidth,
    cssClassNames: StyleRows,
  });
}

function showTypemixYear() {}

function showTypemix6vM() {}

function showLMaxFrequencyYear() {
  setCheckValue('idLMaxFrequencyYear', true);
  setCheckValue('idLMaxFrequency6vM', false);

  if (tableDataFrequency.getNumberOfRows() > 0) {
    var StyleRows = {
      tableRow: 'TableRowCentered',
      tableCell: 'TableCellCentered',
      selectedTableRow: 'TableCellSelected',
      hoverTableRow: 'TableCellSelected',
    };
    var tableFreqWidth = tableDataFrequencyForTable.getNumberOfColumns() * 80;
    var tableFreqHistWidth = tableDataFrequencyHistDay.getNumberOfColumns() * 80;

    chartFrequency.draw(tableDataFrequency, {
      titlePosition: 'none',
      fontSize: 10,
      colors: ['#A266A7', '#bbc0c3'],
      chartArea: { left: 80, top: 10, height: 170 },
      width: 950,
      height: 250,
      legend: { position: 'right' },
      hAxis: {
        slantedText: false,
        maxAlternation: 1,
        titleTextStyle: { italic: false },
        title: 'dB(A)',
      },
      axisTitlesPosition: 'out',
      animation: { duration: 1000, easing: 'inAndOut' },
    });
    tableFrequency.draw(tableDataFrequencyForTable, {
      allowHtml: true,
      titlePosition: 'none',
      enableInteractivity: false,
      alternatingRowStyle: false,
      height: 200,
      width: tableFreqWidth,
      sort: 'disable',
      cssClassNames: StyleRows,
    });
    tableFrequencyHistDay.draw(tableDataFrequencyHistDay, {
      allowHtml: true,
      titlePosition: 'none',
      alternatingRowStyle: false,
      width: tableFreqHistWidth,
      sort: 'disable',
      cssClassNames: StyleRows,
    });
    //XXX			tableFrequencyHistNight.draw( tableDataFrequencyHistNight, { allowHtml: true, titlePosition: 'none', alternatingRowStyle: false, width:tableFreqHistWidth, sort:'disable', cssClassNames: StyleRows });

    $('#freqchart_div').slideDown(200);
    $('#freqtable_div').slideDown(200);
    $('#freqhistdaytable_div').slideDown(200);
    //XXX			$("#freqhistnighttable_div").slideDown( 200);
    $('#lmaxFreqNoData').hide();
  } else {
    $('#freqchart_div').slideUp(200);
    $('#freqtable_div').slideUp(200);
    $('#freqhistdaytable_div').slideUp(200);
    //XXX			$("#freqhistnighttable_div").slideUp( 200);
    $('#lmaxFreqNoData').show();
  }
}

function showLMaxFrequency6vM() {
  setCheckValue('idLMaxFrequencyYear', false);
  setCheckValue('idLMaxFrequency6vM', true);

  if (tableDataFrequency6vM.getNumberOfRows() > 0) {
    var StyleRows = {
      tableRow: 'TableRowCentered',
      tableCell: 'TableCellCentered',
      selectedTableRow: 'TableCellSelected',
      hoverTableRow: 'TableCellSelected',
    };
    var tableFreqWidth = tableDataFrequencyForTable.getNumberOfColumns() * 80;
    var tableFreqHistWidth = tableDataFrequencyHistDay.getNumberOfColumns() * 80;

    chartFrequency.draw(tableDataFrequency6vM, {
      titlePosition: 'none',
      fontSize: 10,
      colors: ['#A266A7', '#bbc0c3'],
      chartArea: { left: 80, top: 10, height: 170 },
      width: 950,
      height: 250,
      legend: { position: 'right' },
      hAxis: {
        slantedText: false,
        maxAlternation: 1,
        titleTextStyle: { italic: false },
        title: 'dB(A)',
      },
      axisTitlesPosition: 'out',
      animation: { duration: 1000, easing: 'inAndOut' },
    });
    tableFrequency.draw(tableDataFrequencyForTable6vM, {
      allowHtml: true,
      titlePosition: 'none',
      enableInteractivity: false,
      alternatingRowStyle: false,
      height: 200,
      width: tableFreqWidth,
      sort: 'disable',
      cssClassNames: StyleRows,
    });
    tableFrequencyHistDay.draw(tableDataFrequencyHistDay6vM, {
      allowHtml: true,
      titlePosition: 'none',
      alternatingRowStyle: false,
      width: tableFreqHistWidth,
      sort: 'disable',
      cssClassNames: StyleRows,
    });
    //XXX			tableFrequencyHistNight.draw( tableDataFrequencyHistNight6vM, { allowHtml: true, titlePosition: 'none', alternatingRowStyle: false, width:tableFreqHistWidth, sort:'disable', cssClassNames: StyleRows });

    $('#freqchart_div').slideDown(200);
    $('#freqtable_div').slideDown(200);
    $('#freqhistdaytable_div').slideDown(200);
    //XXX			$("#freqhistnighttable_div").slideDown( 200);
    $('#lmaxFreqNoData').hide();
  } else {
    $('#freqchart_div').slideUp(200);
    $('#freqtable_div').slideUp(200);
    $('#freqhistdaytable_div').slideUp(200);
    //XXX			$("#freqhistnighttable_div").slideUp( 200);
    $('#lmaxFreqNoData').show();
  }
}

function updateDateFields() {
  if (selectedMonth == 0) selectedDay = 0;

  // Tag-Box mit den Tagen des aktuellen Monats f�llen (zwischen 28 und 31)
  optionsDropbox = "<option value='0'>-</option>";
  var daysInMonth = 0;
  if (selectedMonth > 0) {
    daysInMonth = GetDaysInMonth(selectedYear, selectedMonth);
    for (i = 1; i <= daysInMonth; i++) {
      optionsDropbox += "<option value='" + i + "'>" + i + '</option>';
    }
  }

  // Box fuer den Tag neu laden und falls moeglich den zuvor eingestellten Tag wieder einstellen
  var oriDay = $('#k-Tag').dropkick('getValue');
  $('#k-Tag').html(optionsDropbox);
  $('#k-Tag').dropkick('reload');
  if (selectedDay > 0 && selectedDay <= daysInMonth) {
    $('#k-Tag').dropkick('setValue', oriDay);
  } else {
    $('#k-Tag').dropkick('setValue', 0);
    selectedDay = 0;
  }
}

function changedNMT(obj) {
  selectedNMTIndex = parseInt(obj.value);
}
function changedTag(obj) {
  selectedDay = parseInt(obj.value);
  loadNMTListForCurrentTime(true);
}
function changedMonat(obj) {
  selectedMonth = parseInt(obj.value);
  updateDateFields();
  loadNMTListForCurrentTime(true);
}
function changedJahr(obj) {
  selectedYear = parseInt(obj.value);
  updateDateFields();
  loadNMTListForCurrentTime(true);
}

function toggleAccordionState(obj) {
  obj
    .toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom')
    .find('> .ui-icon')
    .toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s')
    .end()
    .next()
    .toggleClass('ui-accordion-content-active')
    .slideToggle();
}

function loadNMTListForCurrentTime(reload) {
  $('#k-NMT').html('');

  var day = selectedDay;
  var month = selectedMonth - 1;
  if (selectedDay <= 0) day = 1;
  if (selectedMonth <= 0) month = 0;

  var fromDate = new Date(selectedYear, month, day, 0, 0, 0);
  var toDate = new Date(selectedYear + 1, month, day, 0, 0, 0);
  if (selectedDay > 0) toDate = new Date(selectedYear, month, day + 1, 0, 0, 0);
  else if (selectedMonth > 0) toDate = new Date(selectedYear, month + 1, day, 0, 0, 0);

  var optionsDropbox = '';
  var firstLoadedNMTIndex = -1;
  for (var i = 1; i < arrayNMTIDs.length; i++) {
    var validFrom = new Date(arrayNMTValidFroms[i] * 1000);
    var validTo = new Date(arrayNMTValidTos[i] * 1000);

    if ((fromDate < validTo || arrayNMTValidTos[i] == '') && toDate > validFrom) {
      var validString = '';
      optionsDropbox +=
        "<option value='" + i + "'>" + replaceUmlaute(arrayNMTNames[i]) + validString + '</option>';
      if (firstLoadedNMTIndex < 0) firstLoadedNMTIndex = i;
    }
  }
  $('#k-NMT').html(optionsDropbox);
  if (reload) $('#k-NMT').dropkick('reload');
  if (reload && firstLoadedNMTIndex >= 0) selectedNMTIndex = firstLoadedNMTIndex;
}

function load() {
  setCheckValue('idNumofFlightsYear', true);
  setCheckValue('idNumofFlights6vM', false);
  setCheckValue('idDirectionYear', true);
  setCheckValue('idDirection6vM', false);
  setCheckValue('idLMaxFrequencyYear', true);
  setCheckValue('idLMaxFrequency6vM', false);

  // Aktuellen Startmonat �bernehmen - nur den Monat, nicht den Tag, da wir mit der Monatsansicht starten wollen!
  if (startMonth > 0) {
    var a = new Date(startMonth * 1000);
    selectedMonth = a.getMonth() + 1;
    selectedYear = a.getFullYear();
  }

  // Tag-Box mit Zahlen von 1 bis 31 f�llen
  var optionsDropbox = "<option value='0'>-</option>";
  for (i = 1; i <= GetDaysInMonth(selectedYear, selectedMonth); i++) {
    optionsDropbox += "<option value='" + i + "'>" + i + '</option>';
  }
  $('#k-Tag').html(optionsDropbox);

  // Monat-Box mit den Monatsnamen f�llen
  optionsDropbox = '';
  for (i = 0; i < 13; i++) {
    optionsDropbox += "<option value='" + i + "'>" + arrayMonths[i] + '</option>';
  }
  $('#k-Monat').html(optionsDropbox);

  // Jahr-Box mit Zahlen von 2008 bis zum aktuellen Jahr f�llen
  var jetzt = new Date();
  var jetztJahr = jetzt.getFullYear();
  optionsDropbox = '';
  for (i = 2008; i <= jetztJahr; i++) {
    optionsDropbox += "<option value='" + i + "'>" + i + '</option>';
  }
  $('#k-Jahr').html(optionsDropbox);

  // Bekannte NMTs in die Messstellen-Box eintragen
  loadNMTListForCurrentTime(false);

  // Optionen in Dropdowns einf�gen:
  $('.default').dropkick({
    change: function() {
      $(this).change();
    },
  });

  // Startwerte f�r die Datumseinstellung und die NMT-Auswahl setzen:
  $('#k-Monat').dropkick('setValue', selectedMonth);
  $('#k-Jahr').dropkick('setValue', selectedYear);
  if (selectedNMTIndex > 0) $('#k-NMT').dropkick('setValue', selectedNMTIndex);

  // Anzahl der Tage des Monats aktualisieren:
  updateDateFields();

  // Messstelleninfo initial �ffnen
  toggleAccordionState($('#lmaxFrequency'));
  toggleAccordionState($('#noiseStatEU'));
  toggleAccordionState($('#numofFlights'));
  toggleAccordionState($('#direction'));

  // Tabellenobjekte anlegen
  tableDataFrequency = new google.visualization.DataTable();
  tableDataFrequencyForTable = new google.visualization.DataTable();
  tableDataFrequencyHistDay = new google.visualization.DataTable();
  tableDataFrequencyHistNight = new google.visualization.DataTable();
  tableDataFrequency6vM = new google.visualization.DataTable();
  tableDataFrequencyForTable6vM = new google.visualization.DataTable();
  tableDataFrequencyHistDay6vM = new google.visualization.DataTable();
  tableDataFrequencyHistNight6vM = new google.visualization.DataTable();
  tableFrequency = new google.visualization.Table(document.getElementById('freqtable_div'));
  chartFrequency = new google.visualization.ColumnChart(document.getElementById('freqchart_div'));
  tableFrequencyHistDay = new google.visualization.Table(
    document.getElementById('freqhistdaytable_div'),
  );
  //XXX		tableFrequencyHistNight = new google.visualization.Table( document.getElementById('freqhistnighttable_div'));
  tableDataNoiseStatEU = new google.visualization.DataTable();
  tableDataNoiseStatEUForTable = new google.visualization.DataTable();
  tableNoiseStatEU = new google.visualization.Table(document.getElementById('noisetableEU_div'));
  chartNoiseStatEU = new google.visualization.ColumnChart(
    document.getElementById('noisechartEU_div'),
  );
  tableDataFlightCount = new google.visualization.DataTable();
  tableDataFlightCountForTable = new google.visualization.DataTable();
  tableDataFlightCount6vM = new google.visualization.DataTable();
  tableDataFlightCountForTable6vM = new google.visualization.DataTable();
  chartFlightCount = new google.visualization.SteppedAreaChart(
    document.getElementById('flightCountChart_div'),
  );
  tableFlightCount = new google.visualization.Table(
    document.getElementById('flightCountTable_div'),
  );
  tableDataDirection = new google.visualization.DataTable();
  tableDataDirectionForTable = new google.visualization.DataTable();
  tableDataDirection6vM = new google.visualization.DataTable();
  tableDataDirectionForTable6vM = new google.visualization.DataTable();
  chartDirection = new google.visualization.SteppedAreaChart(
    document.getElementById('directionChart_div'),
  );
  tableDirection = new google.visualization.Table(document.getElementById('directionTable_div'));

  // Daten f�r das �bergebene NMT laden
  updateData();
}

function updateData() {
  if (selectedNMTIndex <= 0) return;

  // In LTN Uebersichtskarte abhaengig vom NMT setzen:
  if (selectedNMTIndex == 1)
    document.getElementById('imgOverviewMap').src = './images/D08Operations.gif';
  else document.getElementById('imgOverviewMap').src = './images/D26Operations.gif';

  // HTTP-Request zum Aufruf von WRDataLoader.php erzeugen:
  var request;
  try {
    request = new XMLHttpRequest();
  } catch (e) {
    return;
  }
  if (request) {
    try {
      var validFrom = new Date(arrayNMTValidFroms[selectedNMTIndex] * 1000);
      var validString = validFrom.getFullYear() + '-';
      if (validFrom.getMonth() < 9) validString += '0';
      validString += validFrom.getMonth() + 1 + '-';
      if (validFrom.getDate() < 10) validString += '0';
      validString += validFrom.getDate();

      request.open(
        'GET',
        ServerPath +
          'WRDataLoader.php' +
          '?session=' +
          sessionID +
          '&nmtid=' +
          arrayNMTIDs[selectedNMTIndex] +
          '&day=' +
          selectedDay +
          '&month=' +
          selectedMonth +
          '&year=' +
          selectedYear +
          '&nmtValidDate=' +
          validString,
        true,
      );

      //XXX				 alert( ServerPath + 'WRDataLoader.php' + '?session=' + sessionID + '&nmtid=' + arrayNMTIDs[selectedNMTIndex] + '&day=' + selectedDay + '&month=' + selectedMonth + '&year=' + selectedYear + '&nmtValidDate=' + validString);
    } catch (e) {
      alert('Problem Communicating with Server\n' + e);
    }

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        // Die werden aus der XML-Datei tracks.xml erzeugt, die durch den PHP-Aufruf generiert wurde
        // Dieses Math.random-Dings verhindert, dass die XML-Datei im Browser gecached wird! Und das ist an dieser Stelle wichtig !!!
        var xmlFileName = ServerPath + 'xmlSessionData/wr' + sessionID + '.xml?r=' + Math.random();

        downloadUrl(xmlFileName, function(data, responseCode) {
          if (responseCode == 200) {
            loadData(xmlParse(data));
            request = null;
            trackRequestActive = false; // Naechster Request kann gestartet werden!
          }
          //XXX									else
          //XXX									{
          //XXX											set_status_time_string( "TEXT_WAITING_FOR_SERVER");	//XXX									}
        }); // Runde schliessende Klammer kommt von GDownloadUrl

        xmlFileName = null;
      }
    };

    // HTTP-Request abschicken!
    try {
      trackRequestActive = true;
      request.send(null);
    } catch (e) {
      alert('Problem Sending to Server\n' + e);
    }
  }
}

function clearTableData(t) {
  t.removeRows(0, t.getNumberOfRows());
  t.removeColumns(0, t.getNumberOfColumns());
}

function loadNMTData(xmlData) {
  // ------------------------------
  // DATEN DER AKTUELLEN MESSSTELLE
  // ------------------------------

  var nmtLabel = '';
  var nmtValue = '';
  var curNMT = xmlData.documentElement.getElementsByTagName('currentNMT');

  if (curNMT && curNMT.length > 0) {
    nmtLabel =
      'Name:' +
      '<br />' +
      'Position:' +
      '<br />' +
      'Height:' +
      '<br />' +
      'Start/Stop level:' +
      '<br />' +
      'Meteorology:' +
      '<br />' +
      'Availability:' +
      '<br />' +
      'Measuring device:' +
      '<br />' +
      'Microphone:';
    nmtValue += curNMT[0].getAttribute('shortName') + ' ' + curNMT[0].getAttribute('name');
    nmtValue += '<br />';
    var lat = getCoordinateString(curNMT[0].getAttribute('latitude'));
    var lon = getCoordinateString(curNMT[0].getAttribute('longitude'));
    nmtValue +=
      "<a href='http://maps.google.de/maps?ll=" +
      lat +
      ',' +
      lon +
      '&spn=0.1,0.1&z=14&t=m&q=' +
      lat +
      ',' +
      lon +
      "' target='_blank'>" +
      lat +
      ' - ' +
      lon +
      '</a>';
    nmtValue += '<br />';
    nmtValue += curNMT[0].getAttribute('height') + ' m above sea level';
    nmtValue += '<br />';
    var daystartoffset = parseInt(curNMT[0].getAttribute('dayStartOffset'));
    var nightstartoffset = parseInt(curNMT[0].getAttribute('nightStartOffset'));
    if (daystartoffset > 0 || nightstartoffset > 0) {
      nmtValue +=
        'Dynamisch - Offset: ' +
        (daystartoffset / 10.0).toString() +
        ' dB(A) daytime / ' +
        (nightstartoffset / 10.0).toString() +
        ' dB(A) nighttime';
    } else {
      nmtValue +=
        (parseInt(curNMT[0].getAttribute('daylstart')) / 10.0).toString() +
        ' dB(A) daytime / ' +
        (parseInt(curNMT[0].getAttribute('nightlstart')) / 10.0).toString() +
        ' dB(A) nighttime';
    }
    nmtValue += '<br />';
    var meteo = parseInt(curNMT[0].getAttribute('hasMeteo'));
    if (meteo > 0) nmtValue += 'Yes';
    else nmtValue += 'No';
    nmtValue += '<br />';
    if (curNMT[0].getAttribute('availability') != '') {
      nmtAvailability = parseFloat(curNMT[0].getAttribute('availability'));
      nmtValue += Math.round(nmtAvailability).toString() + ' % (' + getSelectedDateString() + ')';
    } else {
      nmtValue += '-';
    }
    nmtValue += '<br />';
    nmtValue += curNMT[0].getAttribute('comment');
    nmtValue += '<br />';
    nmtValue += curNMT[0].getAttribute('mikrofon');
  }
}

function loadLMaxFrequency(xmlData) {
  // ------------------
  // PEGELHAEUFIGKEITEN
  // ------------------

  var curPH = xmlData.documentElement.getElementsByTagName('lMaxFrequency');
  var curPH6vM = xmlData.documentElement.getElementsByTagName('lMaxFrequency6vM');

  // Zunaechst alte Daten loeschen:
  clearTableData(tableDataFrequency);
  clearTableData(tableDataFrequencyForTable);
  clearTableData(tableDataFrequency6vM);
  clearTableData(tableDataFrequencyForTable6vM);
  $('#freqchart_div').hide();
  $('#freqtable_div').hide();

  // Auch die Kopfzeile
  $('#txtLMaxFrequency').html('Noise Event Distribution of Departures');

  if (curPH.length > 0) {
    $('#freqchart_div').show();
    $('#freqtable_div').show();
    $('#lmaxFreqNoData').hide();

    tableDataFrequency.addColumn('string', 'Level');
    //XXX			tableDataFrequency.addColumn('number', 'Day');
    tableDataFrequency.addColumn('number', 'Frequency');
    //XXX 		tableDataFrequency.addColumn('number', 'Night');
    tableDataFrequencyForTable.addColumn('string', 'Level');
    //XXX			tableDataFrequencyForTable.addColumn('string', 'Day');
    tableDataFrequencyForTable.addColumn('string', 'Frequency');
    //XXX 		tableDataFrequencyForTable.addColumn('string', 'Night');

    // �berschrift anpassen:
    $('#txtLMaxFrequency').html(getHeaderTitle('Noise Event Distribution of Departures - '));
  }

  var lastLevelclass = 0;
  for (i = 0; i < curPH.length; i++) {
    // Nicht belegte LevelClasses zwischen minimal und maximal belegter Levelclass werden mit Nullen aufgef�llt!
    var curLevelclass = parseInt(curPH[i].getAttribute('levelclass'));
    while (lastLevelclass > 0 && lastLevelclass + 1 < curLevelclass) {
      lastLevelclass++;
      //XXX				tableDataFrequency.addRows([ [lastLevelclass.toString(), 0, 0] ]);
      //XXX				tableDataFrequencyForTable.addRows([ [lastLevelclass.toString(), "0", "0"] ]);
      tableDataFrequency.addRows([[lastLevelclass.toString(), 0]]);
      tableDataFrequencyForTable.addRows([[lastLevelclass.toString(), '0']]);
    }
    //XXX			tableDataFrequency.addRows([
    //XXX				[curLevelclass.toString(), parseInt( curPH[i].getAttribute("numberday")) + parseInt( curPH[i].getAttribute("numberevening")), parseInt( curPH[i].getAttribute("numbernight"))]
    //XXX			]);
    //XXX			tableDataFrequencyForTable.addRows([
    //XXX				[curLevelclass.toString(), ( parseInt( curPH[i].getAttribute("numberday")) + parseInt( curPH[i].getAttribute("numberevening"))).toString(), parseInt( curPH[i].getAttribute("numbernight")).toString()]
    //XXX			]);
    tableDataFrequency.addRows([
      [
        curLevelclass.toString(),
        parseInt(curPH[i].getAttribute('numberday')) +
          parseInt(curPH[i].getAttribute('numberevening')) +
          parseInt(curPH[i].getAttribute('numbernight')),
      ],
    ]);
    tableDataFrequencyForTable.addRows([
      [
        curLevelclass.toString(),
        (
          parseInt(curPH[i].getAttribute('numberday')) +
          parseInt(curPH[i].getAttribute('numberevening')) +
          parseInt(curPH[i].getAttribute('numbernight'))
        ).toString(),
      ],
    ]);

    lastLevelclass = curLevelclass;
  }

  if (curPH6vM.length > 0) {
    //XXX			tableDataFrequency6vM.addColumn('string', 'Level'); tableDataFrequency6vM.addColumn('number', 'Day'); tableDataFrequency6vM.addColumn('number', 'Night');
    //XXX			tableDataFrequencyForTable6vM.addColumn('string', 'Level'); tableDataFrequencyForTable6vM.addColumn('string', 'Day'); tableDataFrequencyForTable6vM.addColumn('string', 'Night');
    tableDataFrequency6vM.addColumn('string', 'Level');
    tableDataFrequency6vM.addColumn('number', 'Frequency');
    //XXX			tableDataFrequency6vM.addColumn('number', 'Day');
    tableDataFrequencyForTable6vM.addColumn('string', 'Level');
    //XXX			tableDataFrequencyForTable6vM.addColumn('string', 'Day');
    tableDataFrequencyForTable6vM.addColumn('string', 'Frequency');
  }

  lastLevelclass = 0;
  for (i = 0; i < curPH6vM.length; i++) {
    // Nicht belegte LevelClasses zwischen minimal und maximal belegter Levelclass werden mit Nullen aufgef�llt!
    var curLevelclass = parseInt(curPH6vM[i].getAttribute('levelclass'));
    while (lastLevelclass > 0 && lastLevelclass + 1 < curLevelclass) {
      lastLevelclass++;
      //XXX				tableDataFrequency.addRows([ [lastLevelclass.toString(), 0, 0] ]);
      //XXX				tableDataFrequencyForTable.addRows([ [lastLevelclass.toString(), "0", "0"] ]);
      tableDataFrequency.addRows([[lastLevelclass.toString(), 0]]);
      tableDataFrequencyForTable.addRows([[lastLevelclass.toString(), '0']]);
    }
    //XXX			tableDataFrequency6vM.addRows([
    //XXX				[curLevelclass.toString(), parseInt( curPH6vM[i].getAttribute("numberday")) + parseInt( curPH6vM[i].getAttribute("numberevening")), parseInt( curPH6vM[i].getAttribute("numbernight"))]
    //XXX			]);
    //XXX			tableDataFrequencyForTable6vM.addRows([
    //XXX				[curLevelclass.toString(), ( parseInt( curPH6vM[i].getAttribute("numberday")) + parseInt( curPH6vM[i].getAttribute("numberevening"))).toString(), parseInt( curPH6vM[i].getAttribute("numbernight")).toString()]
    //XXX			]);
    tableDataFrequency6vM.addRows([
      [
        curLevelclass.toString(),
        parseInt(curPH6vM[i].getAttribute('numberday')) +
          parseInt(curPH6vM[i].getAttribute('numberevening')) +
          parseInt(curPH6vM[i].getAttribute('numbernight')),
      ],
    ]);
    tableDataFrequencyForTable6vM.addRows([
      [
        curLevelclass.toString(),
        (
          parseInt(curPH6vM[i].getAttribute('numberday')) +
          parseInt(curPH6vM[i].getAttribute('numberevening')) +
          parseInt(curPH6vM[i].getAttribute('numbernight'))
        ).toString(),
      ],
    ]);

    lastLevelclass = curLevelclass;
  }

  // -------------------------------
  // HISTORIE DER PEGELHAEUFIGKEITEN
  // -------------------------------

  var timeBase = getCurrentTimeBase();

  var curPHH;
  var curPHH6vM = null;
  if (timeBase == 2) {
    curPHH = xmlData.documentElement.getElementsByTagName('lMaxFrequencyHistoryYear');
    curPHH6vM = xmlData.documentElement.getElementsByTagName('lMaxFrequencyHistory6vM');
    $('#lMaxFrequencyYear').show();
  } else if (timeBase == 1) {
    curPHH = xmlData.documentElement.getElementsByTagName('lMaxFrequencyHistoryMonth');
    $('#lMaxFrequencyYear').hide();
  } else {
    curPHH = xmlData.documentElement.getElementsByTagName('lMaxFrequencyHistoryDay');
    $('#lMaxFrequencyYear').hide();
  }

  // Zunaechst alte Daten loeschen:
  clearTableData(tableDataFrequencyHistDay);
  clearTableData(tableDataFrequencyHistNight);
  clearTableData(tableDataFrequencyHistDay6vM);
  clearTableData(tableDataFrequencyHistNight6vM);
  $('#freqhistdaytable_div').hide();
  //XXX		$("#freqhistnighttable_div").hide();

  if (curPHH.length > 0) {
    $('#freqhistdaytable_div').show();
    //XXX			$("#freqhistnighttable_div").show();
    $('#lmaxFreqHistNoData').hide();

    var curPHHSets = curPHH[0].getElementsByTagName('lMaxFrequencySet');

    tableDataFrequencyHistDay.addColumn('string', '');
    //XXX			tableDataFrequencyHistNight.addColumn('string', '');

    // Z�hle zun�chst, wieviele verschiedene Zeiten wir haben:
    var lastTimestamp = 0;
    var numberOfTimestamps = 0;
    for (i = 0; i < curPHHSets.length; i++) {
      var curTimestamp = parseInt(curPHHSets[i].getAttribute('timestamp'));
      if (curTimestamp != lastTimestamp) {
        numberOfTimestamps++;
        lastTimestamp = curTimestamp;
      }
    }

    if (timeBase == 0) {
      for (var i = numberOfTimestamps - 1; i >= 0; i--) {
        var currentDate = new Date(selectedYear, selectedMonth - 1, selectedDay, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() - i);
        tableDataFrequencyHistDay.addColumn(
          'string',
          currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
        );
        //XXX					tableDataFrequencyHistNight.addColumn('string', currentDate.getDate().toString() + "." + (currentDate.getMonth()+1).toString() + ".");
      }
    }
    if (timeBase == 1) {
      for (var i = 13 - numberOfTimestamps; i < 12; i++) {
        if (i == 0 && numberOfTimestamps > 12) {
          tableDataFrequencyHistDay.addColumn(
            'string',
            arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
          );
          //XXX						tableDataFrequencyHistNight.addColumn('string', arrayShortMonths[ selectedMonth] + " " + (selectedYear-1));
        } else {
          tableDataFrequencyHistDay.addColumn('string', arrayShortMonths[(selectedMonth + i) % 12]);
          //XXX						tableDataFrequencyHistNight.addColumn('string', arrayShortMonths[ (selectedMonth+i) % 12]);
        }
      }
      tableDataFrequencyHistDay.addColumn(
        'string',
        arrayShortMonths[selectedMonth] + ' ' + selectedYear,
      );
      //XXX				tableDataFrequencyHistNight.addColumn('string', arrayShortMonths[ selectedMonth] + " " + selectedYear);
    }
    if (timeBase == 2) {
      for (var i = selectedYear - (numberOfTimestamps - 1); i <= selectedYear; i++) {
        tableDataFrequencyHistDay.addColumn('string', i.toString());
        //XXX					tableDataFrequencyHistNight.addColumn('string', i.toString());
      }
    }

    lastTimestamp = 0;
    var timeIndex = 0;
    var arrDataDay = new Array(150); // Wir sehen 150 Klassen vor! F�r die dB-Werte 0 bis 149! Eigentlich �berdimensioniert, aber egal!
    //XXX			var arrDataNight = new Array(150);

    for (i = 0; i < arrDataDay.length; ++i) {
      // Zweidimensionales Array mit Nullen initialisiert
      arrDataDay[i] = new Array(numberOfTimestamps + 1);
      arrDataDay[i][0] = i.toString();
      for (j = 1; j < numberOfTimestamps + 1; j++) arrDataDay[i][j] = '0';
    }
    //XXX			for ( i = 0; i < arrDataNight.length; ++i)
    //XXX			{
    //XXX				// Zweidimensionales Array mit Nullen initialisiert
    //XXX				arrDataNight[i] = new Array(numberOfTimestamps+1);
    //XXX				arrDataNight[i][0] = i.toString();
    //XXX				for ( j = 1; j < numberOfTimestamps+1; j++) arrDataNight[i][j] = "0";
    //XXX			}

    var minIndex = 0;
    var maxIndex = 149;
    for (i = 0; i < curPHHSets.length; i++) {
      var curTimestamp = parseInt(curPHHSets[i].getAttribute('timestamp'));
      if (curTimestamp != lastTimestamp) {
        timeIndex++;
        lastTimestamp = curTimestamp;
      }
      var noiseIndex = parseInt(curPHHSets[i].getAttribute('levelclass'));
      if (noiseIndex >= 0 && noiseIndex < 150 && timeIndex < numberOfTimestamps + 1) {
        arrDataDay[noiseIndex][0] = noiseIndex.toString();
        //XXX					arrDataNight[noiseIndex][0] = noiseIndex.toString();
        //XXX					arrDataDay[noiseIndex][timeIndex] = ( parseInt( curPHHSets[i].getAttribute("numberday")) + parseInt( curPHHSets[i].getAttribute("numberevening"))).toString();
        arrDataDay[noiseIndex][timeIndex] = (
          parseInt(curPHHSets[i].getAttribute('numberday')) +
          parseInt(curPHHSets[i].getAttribute('numberevening')) +
          parseInt(curPHHSets[i].getAttribute('numbernight'))
        ).toString();
        //XXX					arrDataNight[noiseIndex][timeIndex] = parseInt( curPHHSets[i].getAttribute("numbernight")).toString();

        if (minIndex == 0 || noiseIndex < minIndex) minIndex = noiseIndex;
        if (maxIndex == 149 || noiseIndex > maxIndex) maxIndex = noiseIndex;
      }
    }

    for (i = 0; i < arrDataDay.length; ++i) {
      if (i >= minIndex && i <= maxIndex) {
        tableDataFrequencyHistDay.addRow(arrDataDay[i]);
      }
    }
    //XXX			for ( i = 0; i < arrDataNight.length; ++i)
    //XXX			{
    //XXX				if ( i >= minIndex && i <= maxIndex)
    //XXX				{
    //XXX					tableDataFrequencyHistNight.addRow( arrDataNight[i]);
    //XXX				}
    //XXX			}

    // Erste und letzte (aktuelle) Spalte in den History-Tabellen hervorheben
    for (i = 0; i < tableDataFrequencyHistDay.getNumberOfRows(); i++) {
      tableDataFrequencyHistDay.setProperty(
        i,
        tableDataFrequencyHistDay.getNumberOfColumns() - 1,
        'style',
        'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
      );
      //XXX				tableDataFrequencyHistNight.setProperty( i, tableDataFrequencyHistNight.getNumberOfColumns()-1, 'style', 'background-color: #F6F6F6; color: DarkRed; font-weight: bold;');
    }
    for (i = 0; i < tableDataFrequencyHistDay.getNumberOfRows(); i++) {
      tableDataFrequencyHistDay.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; font-weight: bold;',
      );
      //XXX				tableDataFrequencyHistNight.setProperty( i, 0, 'style', 'background-color: #F6F6F6; font-weight: bold;');
    }
    for (i = 0; i < tableDataFrequencyForTable.getNumberOfRows(); i++) {
      tableDataFrequencyForTable.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; font-weight: bold;',
      );
    }
  } else {
    $('#freqhistdaytable_div').slideUp(200);
    //XXX			$("#freqhistnighttable_div").slideUp( 200);
    $('#lmaxFreqHistNoData').show();
  }

  if (timeBase == 2 && curPHH6vM && curPHH6vM.length > 0) {
    var curPHHSets = curPHH6vM[0].getElementsByTagName('lMaxFrequencySet');

    tableDataFrequencyHistDay6vM.addColumn('string', 'Frequency');
    //XXX			tableDataFrequencyHistDay6vM.addColumn('string', 'Day');
    //XXX			tableDataFrequencyHistNight6vM.addColumn('string', 'Night');

    // Z�hle zun�chst, wieviele verschiedene Zeiten wir haben:
    var lastTimestamp6vM = 0;
    var numberOfTimestamps6vM = 0;
    for (i = 0; i < curPHHSets.length; i++) {
      var curTimestamp6vM = parseInt(curPHHSets[i].getAttribute('timestamp'));
      if (curTimestamp6vM != lastTimestamp6vM) {
        numberOfTimestamps6vM++;
        lastTimestamp6vM = curTimestamp6vM;
      }
    }

    for (var i = selectedYear - (numberOfTimestamps6vM - 1); i <= selectedYear; i++) {
      tableDataFrequencyHistDay6vM.addColumn('string', i.toString());
      //XXX				tableDataFrequencyHistNight6vM.addColumn('string', i.toString());
    }

    lastTimestamp6vM = 0;
    var timeIndex6vM = 0;
    var arrDataDay6vM = new Array(150); // Wir sehen 150 Klassen vor! F�r die dB-Werte 0 bis 149! Eigentlich �berdimensioniert, aber egal!
    var arrDataNight6vM = new Array(150);

    for (i = 0; i < arrDataDay6vM.length; ++i) {
      // Zweidimensionales Array mit Nullen initialisiert
      arrDataDay6vM[i] = new Array(numberOfTimestamps6vM + 1);
      arrDataDay6vM[i][0] = i.toString();
      for (j = 1; j < numberOfTimestamps6vM + 1; j++) arrDataDay6vM[i][j] = '0';
    }
    //XXX			for ( i = 0; i < arrDataNight6vM.length; ++i)
    //XXX			{
    //XXX				// Zweidimensionales Array mit Nullen initialisiert
    //XXX				arrDataNight6vM[i] = new Array(numberOfTimestamps6vM+1);
    //XXX				arrDataNight6vM[i][0] = i.toString();
    //XXX				for ( j = 1; j < numberOfTimestamps6vM+1; j++) arrDataNight6vM[i][j] = "0";
    //XXX			}

    var minIndex6vM = 0;
    var maxIndex6vM = 149;
    for (i = 0; i < curPHHSets.length; i++) {
      var curTimestamp6vM = parseInt(curPHHSets[i].getAttribute('timestamp'));
      if (curTimestamp6vM != lastTimestamp6vM) {
        timeIndex6vM++;
        lastTimestamp6vM = curTimestamp6vM;
      }
      var noiseIndex6vM = parseInt(curPHHSets[i].getAttribute('levelclass'));
      if (noiseIndex6vM >= 0 && noiseIndex6vM < 150 && timeIndex6vM < numberOfTimestamps6vM + 1) {
        arrDataDay6vM[noiseIndex6vM][0] = noiseIndex6vM.toString();
        //XXX					arrDataNight6vM[noiseIndex6vM][0] = noiseIndex6vM.toString();
        arrDataDay6vM[noiseIndex6vM][timeIndex6vM] = (
          parseInt(curPHHSets[i].getAttribute('numberday')) +
          parseInt(curPHHSets[i].getAttribute('numberevening'))
        ).toString();
        //XXX					arrDataDay6vM[noiseIndex6vM][timeIndex6vM] = ( parseInt( curPHHSets[i].getAttribute("numberday")) + parseInt( curPHHSets[i].getAttribute("numberevening")) + parseInt( curPHHSets[i].getAttribute("numbernight"))).toString();
        //XXX					arrDataNight6vM[noiseIndex6vM][timeIndex6vM] = parseInt( curPHHSets[i].getAttribute("numbernight")).toString();

        if (minIndex6vM == 0 || noiseIndex6vM < minIndex6vM) minIndex6vM = noiseIndex6vM;
        if (maxIndex6vM == 149 || noiseIndex6vM > maxIndex6vM) maxIndex6vM = noiseIndex6vM;
      }
    }

    for (i = minIndex6vM; i <= maxIndex6vM; ++i) {
      tableDataFrequencyHistDay6vM.addRow(arrDataDay6vM[i]);
      //XXX					tableDataFrequencyHistNight6vM.addRow( arrDataNight6vM[i]);
    }

    // Erste und letzte (aktuelle) Spalte in den History-Tabellen hervorheben
    for (i = 0; i < tableDataFrequencyHistDay6vM.getNumberOfRows(); i++) {
      tableDataFrequencyHistDay6vM.setProperty(
        i,
        tableDataFrequencyHistDay6vM.getNumberOfColumns() - 1,
        'style',
        'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
      );
      //XXX				tableDataFrequencyHistNight6vM.setProperty( i, tableDataFrequencyHistNight6vM.getNumberOfColumns()-1, 'style', 'background-color: #F6F6F6; color: DarkRed; font-weight: bold;');
    }
    for (i = 0; i < tableDataFrequencyHistDay6vM.getNumberOfRows(); i++) {
      tableDataFrequencyHistDay6vM.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; font-weight: bold;',
      );
      //XXX				tableDataFrequencyHistNight6vM.setProperty( i, 0, 'style', 'background-color: #F6F6F6; font-weight: bold;');
    }
    for (i = 0; i < tableDataFrequencyForTable6vM.getNumberOfRows(); i++) {
      tableDataFrequencyForTable6vM.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; font-weight: bold;',
      );
    }
  }

  // Tabellen und Diagramm zeichnen:
  // Standardmaessig wird das Gesamtjahr angezeigt!
  showLMaxFrequencyYear();
}

function loadNoiseStat(xmlData) {
  // ----------------
  // DAUERSCHALLPEGEL
  // ----------------

  var timeBase = getCurrentTimeBase();

  var curNoiseStat;
  var curNoiseStat6vM;
  if (timeBase == 2) {
    curNoiseStat = xmlData.documentElement.getElementsByTagName('noiseStatYear');
    curNoiseStat6vM = xmlData.documentElement.getElementsByTagName('noiseStat6vM');
  } else if (timeBase == 1) {
    curNoiseStat = xmlData.documentElement.getElementsByTagName('noiseStatMonth');
    curNoiseStat6vM = xmlData.documentElement.getElementsByTagName('noiseStatMonth');
  } else {
    curNoiseStat = xmlData.documentElement.getElementsByTagName('noiseStatDay');
    curNoiseStat6vM = xmlData.documentElement.getElementsByTagName('noiseStatDay');
  }
  // Zunaechst alte Daten loeschen:
  clearTableData(tableDataNoiseStatEU);
  clearTableData(tableDataNoiseStatEUForTable);
  $('#noisechartEU_div').hide();
  $('#noisetableEU_div').hide();

  // Auch die Kopfzeile
  $('#txtNoiseStatEU').html('Equivalent continuous sound levels of aircraft sound');

  // UND DAS GLEICH NOCHMAL, ABER JETZT F�R DAS GANZJAHR (EU-UMGEBUNGSL�RMRICHTLINIE)
  if (curNoiseStat && curNoiseStat.length > 0) {
    $('#noisechartEU_div').show();
    $('#noisetableEU_div').show();
    $('#noiseStatEUNoData').hide();

    var curNoiseSets = curNoiseStat[0].getElementsByTagName('noiseStatSet');

    if (timeBase == 2) tableDataNoiseStatEU.addColumn('string', 'Year');
    else if (timeBase == 1) tableDataNoiseStatEU.addColumn('string', 'Month');
    else tableDataNoiseStatEU.addColumn('string', 'Day');

    tableDataNoiseStatEU.addColumn('number', 'Lden');
    tableDataNoiseStatEU.addColumn('number', 'Lnight');
    tableDataNoiseStatEUForTable.addColumn('string', '');

    var ldenForTable = new Array('L<sub>den</sub>');
    var leqNightForTable = new Array('L<sub>night</sub>');

    for (i = 0; i < curNoiseSets.length; i++) {
      var curLDEN = parseFloat(curNoiseSets[i].getAttribute('lden'));
      var curLEQNight = parseFloat(curNoiseSets[i].getAttribute('leqnight'));
      ldenForTable.push(curLDEN.toString());
      leqNightForTable.push(curLEQNight.toString());

      if (timeBase == 0) {
        var currentDate = new Date(selectedYear, selectedMonth - 1, selectedDay, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() - (curNoiseSets.length - i - 1));
        tableDataNoiseStatEU.addRow([
          currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
          curLDEN,
          curLEQNight,
        ]);
        tableDataNoiseStatEUForTable.addColumn(
          'string',
          currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
        );
      } else if (timeBase == 1) {
        if (i == 0 && curNoiseSets.length > 12) {
          tableDataNoiseStatEU.addRow([
            arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
            curLDEN,
            curLEQNight,
          ]);
          tableDataNoiseStatEUForTable.addColumn(
            'string',
            arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
          );
        } else if (i == curNoiseSets.length - 1) {
          tableDataNoiseStatEU.addRow([
            arrayShortMonths[selectedMonth] + ' ' + selectedYear,
            curLDEN,
            curLEQNight,
          ]);
          tableDataNoiseStatEUForTable.addColumn(
            'string',
            arrayShortMonths[selectedMonth] + ' ' + selectedYear,
          );
        } else {
          tableDataNoiseStatEU.addRow([
            arrayShortMonths[(selectedMonth + (13 - curNoiseSets.length) + i) % 12],
            curLDEN,
            curLEQNight,
          ]);
          tableDataNoiseStatEUForTable.addColumn(
            'string',
            arrayShortMonths[(selectedMonth + (13 - curNoiseSets.length) + i) % 12],
          );
        }
      } else if (timeBase == 2) {
        var y = selectedYear - (curNoiseSets.length - i - 1);
        tableDataNoiseStatEU.addRow([y.toString(), curLDEN, curLEQNight]);
        tableDataNoiseStatEUForTable.addColumn('string', y.toString());
      }
    }

    tableDataNoiseStatEUForTable.addRow(ldenForTable);
    tableDataNoiseStatEUForTable.addRow(leqNightForTable);

    // �berschrift anpassen:
    $('#txtNoiseStatEU').html(
      getHeaderTitle('Equivalent continuous sound levels of aircraft sound - '),
    );

    var formatter = new google.visualization.NumberFormat({ fractionDigits: 1 });
    formatter.format(tableDataNoiseStatEU, 1);
    formatter.format(tableDataNoiseStatEU, 2);

    // Erste Spalte breiter, damit kein Zeilenumbruch erfolgt und letzte (aktuelle) Spalte hervorheben
    for (i = 0; i < 2; i++) {
      tableDataNoiseStatEUForTable.setProperty(
        i,
        tableDataNoiseStatEUForTable.getNumberOfColumns() - 1,
        'style',
        'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
      );
      tableDataNoiseStatEUForTable.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; width: 75px; font-weight: bold;',
      );
    }

    var StyleRows = {
      tableRow: 'TableRowCentered',
      tableCell: 'TableCellCentered',
      selectedTableRow: 'TableCellSelected',
      hoverTableRow: 'TableCellSelected',
    };
    var tableWidth = tableDataNoiseStatEUForTable.getNumberOfColumns() * 52 + 25;
    chartNoiseStatEU.draw(tableDataNoiseStatEU, {
      titlePosition: 'none',
      fontSize: 10,
      colors: ['#A266A7', '#788187'],
      chartArea: { left: 50, top: 10, height: 170 },
      width: 750,
      height: 220,
      legend: { position: 'right' },
      vAxis: {
        titleTextStyle: { italic: false },
        title: 'dB(A)',
        viewWindow: { min: 0, max: 80 },
        minValue: 0,
        maxValue: 80,
        gridlines: { count: 9 },
      },
      axisTitlesPosition: 'out',
      animation: { duration: 1000, easing: 'inAndOut' },
    });
    tableNoiseStatEU.draw(tableDataNoiseStatEUForTable, {
      allowHtml: true,
      titlePosition: 'none',
      alternatingRowStyle: false,
      sort: 'disable',
      width: tableWidth,
      cssClassNames: StyleRows,
    });
  } else {
    $('#noisechartEU_div').slideUp(200);
    $('#noisetableEU_div').slideUp(200);
    $('#noiseStatEUNoData').show();
  }
}

function loadFlightCountData(xmlData) {
  // -----------------------------
  // ANZAHL FLUGBEWEGUNGEN UND BRV
  // -----------------------------

  var timeBase = getCurrentTimeBase();

  var curFlightCount;
  var curFlightCount6vM;
  if (timeBase == 2) {
    curFlightCount = xmlData.documentElement.getElementsByTagName('flightCountYear');
    curFlightCount6vM = xmlData.documentElement.getElementsByTagName('flightCount6vM');
    $('#numofFlightsYear').show();
    $('#directionYear').show();
  } else if (timeBase == 1) {
    curFlightCount = xmlData.documentElement.getElementsByTagName('flightCountMonth');
    curFlightCount6vM = xmlData.documentElement.getElementsByTagName('flightCountMonth');
    $('#numofFlightsYear').hide();
    $('#directionYear').hide();
  } else {
    curFlightCount = xmlData.documentElement.getElementsByTagName('flightCountDay');
    curFlightCount6vM = xmlData.documentElement.getElementsByTagName('flightCountDay');
    $('#numofFlightsYear').hide();
    $('#directionYear').hide();
  }

  // Zunaechst alte Daten loeschen:
  clearTableData(tableDataFlightCount);
  clearTableData(tableDataFlightCountForTable);
  clearTableData(tableDataFlightCount6vM);
  clearTableData(tableDataFlightCountForTable6vM);
  clearTableData(tableDataDirection);
  clearTableData(tableDataDirectionForTable);
  clearTableData(tableDataDirection6vM);
  clearTableData(tableDataDirectionForTable6vM);
  $('#flightCountChart_div').hide();
  $('#flightCountTable_div').hide();
  $('#directionChart_div').hide();
  $('#directionTable_div').hide();

  // Auch die Kopfzeile
  $('#txtNumofFlights').html('Number of flights');
  $('#txtDirection').html('Operation directions');

  if (curFlightCount.length > 0) {
    $('#flightCountChart_div').show();
    $('#flightCountTable_div').show();
    $('#directionChart_div').show();
    $('#directionTable_div').show();
    $('#flightCountNoData').hide();
    $('#directionNoData').hide();

    var curFlightCountSets = curFlightCount[0].getElementsByTagName('flightCountSet');

    if (timeBase == 2) {
      tableDataFlightCount.addColumn('string', 'Year');
      tableDataDirection.addColumn('string', 'Year');
      tableDataFlightCount6vM.addColumn('string', 'Year');
      tableDataDirection6vM.addColumn('string', 'Year');
    } else if (timeBase == 1) {
      tableDataFlightCount.addColumn('string', 'Month');
      tableDataDirection.addColumn('string', 'Month');
    } else {
      tableDataFlightCount.addColumn('string', 'Day');
      tableDataDirection.addColumn('string', 'Day');
    }

    tableDataFlightCount.addColumn('number', 'Night');
    tableDataFlightCount.addColumn('number', 'Day');
    tableDataFlightCountForTable.addColumn('string', '');
    tableDataDirection.addColumn('number', '26');
    tableDataDirection.addColumn('number', '08');
    tableDataDirectionForTable.addColumn('string', '');
    tableDataDirectionForTable.addColumn('string', '');
    if (timeBase == 2) {
      tableDataFlightCount6vM.addColumn('number', 'Night');
      tableDataFlightCount6vM.addColumn('number', 'Day');
      tableDataFlightCountForTable6vM.addColumn('string', '');
      tableDataDirection6vM.addColumn('number', '26');
      tableDataDirection6vM.addColumn('number', '08');
      tableDataDirectionForTable6vM.addColumn('string', '');
      tableDataDirectionForTable6vM.addColumn('string', '');
    }

    var dayForTable = new Array('Day');
    var nightForTable = new Array('Night');
    var eastForTable = new Array('08');
    var westForTable = new Array('26');
    var eastNBForTable = new Array('08', '');
    var westNBForTable = new Array('26', '');
    var eastSBForTable = new Array('', 'SB');
    var westSBForTable = new Array('', 'SB');
    var eastwestTotalForTable = new Array('Total', '');

    var dayForTable6vM = new Array('Day');
    var nightForTable6vM = new Array('Night');
    var eastForTable6vM = new Array('08');
    var westForTable6vM = new Array('26');
    var eastNBForTable6vM = new Array('08', '');
    var westNBForTable6vM = new Array('26', '');
    var eastSBForTable6vM = new Array('', 'SB');
    var westSBForTable6vM = new Array('', 'SB');
    var eastwestTotalForTable6vM = new Array('Total', '');

    var curDay = 0;
    var curNight = 0;
    var curDay6vM = 0;
    var curNight6vM = 0;
    var lastTimestamp = 0;
    var lastTimestamp6vM = 0;
    var dataSetIndex = 0;
    var dataSetIndex6vM = 0;
    var numofDataSets = 0;
    var numofDataSets6vM = 0;
    var completeDay = 0;
    var completeDay6vM = 0;
    var completeNight = 0;
    var completeNight6vM = 0;

    var curWestSB = 0;
    var curWestNB = 0;
    var curEastSB = 0;
    var curEastNB = 0;

    // Zun�chst die Anzahl der geladenen Datens�tze pr�fen (z.B. in Berlin besteht ein Datensatz aus mehreren FlightCountSets!)
    for (i = 0; i < curFlightCountSets.length; i++) {
      var curTimestamp = parseInt(curFlightCountSets[i].getAttribute('timestamp'));
      if (curTimestamp != lastTimestamp) {
        numofDataSets++;
      }
      lastTimestamp = curTimestamp;
    }
    lastTimestamp = 0;

    var curTimestamp = 0;

    // Dann alle FlightCountSets durchnudeln:
    for (i = 0; i <= curFlightCountSets.length; i++) {
      var newDataSet = false;

      if (i < curFlightCountSets.length)
        curTimestamp = parseInt(curFlightCountSets[i].getAttribute('timestamp'));
      else curTimestamp = 0;

      if (lastTimestamp != 0 && curTimestamp != lastTimestamp) {
        dayForTable.push(curDay.toString());
        nightForTable.push(curNight.toString());
        completeDay = curDay;
        completeNight = curNight;
        curDay = 0;
        curNight = 0;
        newDataSet = true;

        var curWest = curWestSB + curWestNB;
        var curEast = curEastSB + curEastNB;

        var curWestPercent = curWest > 0 ? Math.round((curWest * 100) / (curWest + curEast)) : 0;
        var curEastPercent = 100 - curWestPercent;
        var curEastNBPercent = curEast > 0 ? Math.round((curEastNB / curEast) * curEastPercent) : 0;
        var curEastSBPercent = curEastPercent - curEastNBPercent;
        var curWestNBPercent = curWest > 0 ? Math.round((curWestNB / curWest) * curWestPercent) : 0;
        var curWestSBPercent = curWestPercent - curWestNBPercent;

        eastForTable.push(curEastPercent.toString());
        westForTable.push(curWestPercent.toString());
        eastNBForTable.push(curEastNBPercent.toString() + ' %');
        eastSBForTable.push(curEastSBPercent.toString() + ' %');
        westNBForTable.push(curWestNBPercent.toString() + ' %');
        westSBForTable.push(curWestSBPercent.toString() + ' %');
        eastwestTotalForTable.push('100 %');

        // Werte zur�cksetzen f�r n�chsten Durchlauf:
        curWestSB = 0;
        curWestNB = 0;
        curEastSB = 0;
        curEastNB = 0;
        curWestSB = 0;
        curWestNB = 0;
        curEastSB = 0;
        curEastNB = 0;
      }

      if (i < curFlightCountSets.length) {
        if (
          curFlightCountSets[i].getAttribute('rwy') == '26L' ||
          curFlightCountSets[i].getAttribute('rwy') == '25L'
        )
          curWestSB =
            parseInt(curFlightCountSets[i].getAttribute('numberday')) +
            parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
            parseInt(curFlightCountSets[i].getAttribute('numbernight'));

        if (
          curFlightCountSets[i].getAttribute('rwy') == '26' ||
          curFlightCountSets[i].getAttribute('rwy') == '26R' ||
          curFlightCountSets[i].getAttribute('rwy') == '25R'
        )
          curWestNB =
            parseInt(curFlightCountSets[i].getAttribute('numberday')) +
            parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
            parseInt(curFlightCountSets[i].getAttribute('numbernight'));

        if (
          curFlightCountSets[i].getAttribute('rwy') == '08R' ||
          curFlightCountSets[i].getAttribute('rwy') == '07R'
        )
          curEastSB =
            parseInt(curFlightCountSets[i].getAttribute('numberday')) +
            parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
            parseInt(curFlightCountSets[i].getAttribute('numbernight'));

        if (
          curFlightCountSets[i].getAttribute('rwy') == '08' ||
          curFlightCountSets[i].getAttribute('rwy') == '08L' ||
          curFlightCountSets[i].getAttribute('rwy') == '07L'
        )
          curEastNB =
            parseInt(curFlightCountSets[i].getAttribute('numberday')) +
            parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
            parseInt(curFlightCountSets[i].getAttribute('numbernight'));

        curDay +=
          parseInt(curFlightCountSets[i].getAttribute('numberday')) +
          parseInt(curFlightCountSets[i].getAttribute('numberevening'));
        curNight += parseInt(curFlightCountSets[i].getAttribute('numbernight'));
      }

      lastTimestamp = curTimestamp;

      if (newDataSet || i == curFlightCountSets.length) {
        if (timeBase == 0) {
          var currentDate = new Date(selectedYear, selectedMonth - 1, selectedDay, 0, 0, 0);
          currentDate.setDate(currentDate.getDate() - (numofDataSets - dataSetIndex - 1));
          tableDataFlightCount.addRow([
            currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
            completeNight,
            completeDay,
          ]);
          tableDataFlightCountForTable.addColumn(
            'string',
            currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
          );
          tableDataDirection.addRow([
            currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
            curWestPercent,
            curEastPercent,
          ]);
          tableDataDirectionForTable.addColumn(
            'string',
            currentDate.getDate().toString() + '.' + (currentDate.getMonth() + 1).toString() + '.',
          );
        } else if (timeBase == 1) {
          if (dataSetIndex == 0 && numofDataSets > 12) {
            tableDataFlightCount.addRow([
              arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
              completeNight,
              completeDay,
            ]);
            tableDataFlightCountForTable.addColumn(
              'string',
              arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
            );
            tableDataDirection.addRow([
              arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
              curWestPercent,
              curEastPercent,
            ]);
            tableDataDirectionForTable.addColumn(
              'string',
              arrayShortMonths[selectedMonth] + ' ' + (selectedYear - 1),
            );
          } else if (dataSetIndex == numofDataSets - 1) {
            tableDataFlightCount.addRow([
              arrayShortMonths[selectedMonth] + ' ' + selectedYear,
              completeNight,
              completeDay,
            ]);
            tableDataFlightCountForTable.addColumn(
              'string',
              arrayShortMonths[selectedMonth] + ' ' + selectedYear,
            );
            tableDataDirection.addRow([
              arrayShortMonths[selectedMonth] + ' ' + selectedYear,
              curWestPercent,
              curEastPercent,
            ]);
            tableDataDirectionForTable.addColumn(
              'string',
              arrayShortMonths[selectedMonth] + ' ' + selectedYear,
            );
          } else {
            var numofLackingMonths = 13 - numofDataSets;
            tableDataFlightCount.addRow([
              arrayShortMonths[(selectedMonth + dataSetIndex + numofLackingMonths) % 12],
              completeNight,
              completeDay,
            ]);
            tableDataFlightCountForTable.addColumn(
              'string',
              arrayShortMonths[(selectedMonth + dataSetIndex + numofLackingMonths) % 12],
            );
            tableDataDirection.addRow([
              arrayShortMonths[(selectedMonth + dataSetIndex + numofLackingMonths) % 12],
              curWestPercent,
              curEastPercent,
            ]);
            tableDataDirectionForTable.addColumn(
              'string',
              arrayShortMonths[(selectedMonth + dataSetIndex + numofLackingMonths) % 12],
            );
          }
        } else if (timeBase == 2) {
          var y = selectedYear - (numofDataSets - dataSetIndex - 1);
          tableDataFlightCount.addRow([y.toString(), completeNight, completeDay]);
          tableDataFlightCountForTable.addColumn('string', y.toString());
          tableDataDirection.addRow([y.toString(), curWestPercent, curEastPercent]);
          tableDataDirectionForTable.addColumn('string', y.toString());
        }

        // Immer eine Leerzeile einfuegen, damit die Balken getrennt sind!
        if (i < curFlightCountSets.length) {
          tableDataFlightCount.addRow(['', null, null]);
          tableDataDirection.addRow(['', null, null]);
        }

        // Muss nach erfolgreicher Verarbeitung zur�ckgesetzt werden!
        completeDay = 0;
        completeNight = 0;

        // N�chster Datensatz
        dataSetIndex++;
      }
    }

    if (timeBase == 2) {
      curWestSB = 0;
      curWestNB = 0;
      curEastSB = 0;
      curEastNB = 0;

      if (curFlightCount6vM && curFlightCount6vM[0]) {
        curFlightCountSets = curFlightCount6vM[0].getElementsByTagName('flightCountSet');

        // Zun�chst die Anzahl der geladenen Datens�tze pr�fen (z.B. in Berlin besteht ein Datensatz aus mehreren FlightCountSets!)
        for (i = 0; i < curFlightCountSets.length; i++) {
          var curTimestamp6vM = parseInt(curFlightCountSets[i].getAttribute('timestamp'));
          if (curTimestamp6vM != lastTimestamp6vM) {
            numofDataSets6vM++;
          }
          lastTimestamp6vM = curTimestamp6vM;
        }
        lastTimestamp6vM = 0;

        for (i = 0; i < curFlightCountSets.length; i++) {
          var newDataSet = false;

          var curTimestamp6vM = parseInt(curFlightCountSets[i].getAttribute('timestamp'));

          if (lastTimestamp6vM != 0 && curTimestamp6vM != lastTimestamp6vM) {
            dayForTable6vM.push(curDay6vM.toString());
            nightForTable6vM.push(curNight6vM.toString());
            completeDay6vM = curDay6vM;
            completeNight6vM = curNight6vM;
            curDay6vM = 0;
            curNight6vM = 0;
            newDataSet = true;

            var curWest = curWestSB + curWestNB;
            var curEast = curEastSB + curEastNB;

            var curWestPercent =
              curWest > 0 ? Math.round((curWest * 100) / (curWest + curEast)) : 0;
            var curEastPercent = 100 - curWestPercent;
            var curEastNBPercent =
              curEast > 0 ? Math.round((curEastNB / curEast) * curEastPercent) : 0;
            var curEastSBPercent = curEastPercent - curEastNBPercent;
            var curWestNBPercent =
              curWest > 0 ? Math.round((curWestNB / curWest) * curWestPercent) : 0;
            var curWestSBPercent = curWestPercent - curWestNBPercent;

            eastForTable6vM.push(curEastPercent.toString());
            westForTable6vM.push(curWestPercent.toString());
            eastNBForTable6vM.push(curEastNBPercent.toString() + ' %');
            eastSBForTable6vM.push(curEastSBPercent.toString() + ' %');
            westNBForTable6vM.push(curWestNBPercent.toString() + ' %');
            westSBForTable6vM.push(curWestSBPercent.toString() + ' %');
            eastwestTotalForTable6vM.push('100 %');
          }
          lastTimestamp6vM = curTimestamp6vM;

          if (
            curFlightCountSets[i].getAttribute('rwy') == '26L' ||
            curFlightCountSets[i].getAttribute('rwy') == '25L'
          )
            curWestSB =
              parseInt(curFlightCountSets[i].getAttribute('numberday')) +
              parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
              parseInt(curFlightCountSets[i].getAttribute('numbernight'));
          if (
            curFlightCountSets[i].getAttribute('rwy') == '26' ||
            curFlightCountSets[i].getAttribute('rwy') == '26R' ||
            curFlightCountSets[i].getAttribute('rwy') == '25R'
          )
            curWestNB =
              parseInt(curFlightCountSets[i].getAttribute('numberday')) +
              parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
              parseInt(curFlightCountSets[i].getAttribute('numbernight'));
          if (
            curFlightCountSets[i].getAttribute('rwy') == '08R' ||
            curFlightCountSets[i].getAttribute('rwy') == '07R'
          )
            curEastSB =
              parseInt(curFlightCountSets[i].getAttribute('numberday')) +
              parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
              parseInt(curFlightCountSets[i].getAttribute('numbernight'));
          if (
            curFlightCountSets[i].getAttribute('rwy') == '08' ||
            curFlightCountSets[i].getAttribute('rwy') == '08L' ||
            curFlightCountSets[i].getAttribute('rwy') == '07L'
          )
            curEastNB =
              parseInt(curFlightCountSets[i].getAttribute('numberday')) +
              parseInt(curFlightCountSets[i].getAttribute('numberevening')) +
              parseInt(curFlightCountSets[i].getAttribute('numbernight'));

          curDay6vM +=
            parseInt(curFlightCountSets[i].getAttribute('numberday')) +
            parseInt(curFlightCountSets[i].getAttribute('numberevening'));
          curNight6vM += parseInt(curFlightCountSets[i].getAttribute('numbernight'));

          if (i == curFlightCountSets.length - 1) {
            dayForTable6vM.push(curDay6vM.toString());
            nightForTable6vM.push(curNight6vM.toString());
            completeDay6vM = curDay6vM;
            completeNight6vM = curNight6vM;
            newDataSet = true;

            var curWest = curWestSB + curWestNB;
            var curEast = curEastSB + curEastNB;

            var curWestPercent =
              curWest > 0 ? Math.round((curWest * 100) / (curWest + curEast)) : 0;
            var curEastPercent = 100 - curWestPercent;
            var curEastNBPercent =
              curEast > 0 ? Math.round((curEastNB / curEast) * curEastPercent) : 0;
            var curEastSBPercent = curEastPercent - curEastNBPercent;
            var curWestNBPercent =
              curWest > 0 ? Math.round((curWestNB / curWest) * curWestPercent) : 0;
            var curWestSBPercent = curWestPercent - curWestNBPercent;

            eastForTable6vM.push(curEastPercent.toString());
            westForTable6vM.push(curWestPercent.toString());
            eastNBForTable6vM.push(curEastNBPercent.toString() + ' %');
            eastSBForTable6vM.push(curEastSBPercent.toString() + ' %');
            westNBForTable6vM.push(curWestNBPercent.toString() + ' %');
            westSBForTable6vM.push(curWestSBPercent.toString() + ' %');
            eastwestTotalForTable6vM.push('100 %');
          }

          if (newDataSet) {
            var y = selectedYear - (numofDataSets6vM - dataSetIndex6vM - 1);
            tableDataFlightCount6vM.addRow([y.toString(), completeNight6vM, completeDay6vM]);
            tableDataFlightCountForTable6vM.addColumn('string', y.toString());
            tableDataDirection6vM.addRow([y.toString(), curWestPercent, curEastPercent]);
            tableDataDirectionForTable6vM.addColumn('string', y.toString());

            // Immer eine Leerzeile einfuegen, damit die Balken getrennt sind!
            if (i < curFlightCountSets.length - 1) {
              tableDataFlightCount6vM.addRow(['', null, null]);
              tableDataDirection6vM.addRow(['', null, null]);
            }

            // Muss nach erfolgreicher Verarbeitung zur�ckgesetzt werden!
            completeDay6vM = 0;
            completeNight6vM = 0;

            // N�chster Datensatz
            dataSetIndex6vM++;
          }
        }
      }
    }

    tableDataFlightCountForTable.addRow(dayForTable);
    tableDataFlightCountForTable.addRow(nightForTable);
    tableDataDirectionForTable.addRow(eastNBForTable);
    tableDataDirectionForTable.addRow(westNBForTable);
    tableDataDirectionForTable.addRow(eastwestTotalForTable);

    if (timeBase == 2) {
      tableDataFlightCountForTable6vM.addRow(dayForTable6vM);
      tableDataFlightCountForTable6vM.addRow(nightForTable6vM);
      tableDataDirectionForTable6vM.addRow(eastNBForTable6vM);
      tableDataDirectionForTable6vM.addRow(westNBForTable6vM);
      tableDataDirectionForTable6vM.addRow(eastwestTotalForTable6vM);
    }

    // �berschrift anpassen:
    $('#txtNumofFlights').html(getHeaderTitleNoNMT('Number of flights - '));
    $('#txtDirection').html(getHeaderTitleNoNMT('Operation directions - '));

    var formatter = new google.visualization.NumberFormat({ fractionDigits: 0 });
    formatter.format(tableDataFlightCount, 1);
    formatter.format(tableDataFlightCount, 2);
    formatter.format(tableDataDirection, 1);
    formatter.format(tableDataDirection, 2);
    if (timeBase == 2) {
      formatter.format(tableDataFlightCount6vM, 1);
      formatter.format(tableDataFlightCount6vM, 2);
      formatter.format(tableDataDirection6vM, 1);
      formatter.format(tableDataDirection6vM, 2);
    }

    // Erste Spalte breiter, damit kein Zeilenumbruch erfolgt und letzte (aktuelle) Spalte hervorheben
    for (i = 0; i < 2; i++) {
      tableDataFlightCountForTable.setProperty(
        i,
        tableDataFlightCountForTable.getNumberOfColumns() - 1,
        'style',
        'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
      );
      tableDataFlightCountForTable.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; width: 75px; font-weight: bold;',
      );
      if (timeBase == 2) {
        tableDataFlightCountForTable6vM.setProperty(
          i,
          tableDataFlightCountForTable6vM.getNumberOfColumns() - 1,
          'style',
          'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
        );
        tableDataFlightCountForTable6vM.setProperty(
          i,
          0,
          'style',
          'background-color: #F6F6F6; width: 75px; font-weight: bold;',
        );
      }
    }
    for (i = 0; i < tableDataFlightCountForTable.getNumberOfRows(); i++) {
      tableDataDirectionForTable.setProperty(
        i,
        tableDataDirectionForTable.getNumberOfColumns() - 1,
        'style',
        'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
      );
      tableDataDirectionForTable.setProperty(
        i,
        0,
        'style',
        'background-color: #F6F6F6; width: 75px; font-weight: bold;',
      );
      if (timeBase == 2) {
        tableDataDirectionForTable6vM.setProperty(
          i,
          tableDataDirectionForTable6vM.getNumberOfColumns() - 1,
          'style',
          'background-color: #F6F6F6; color: DarkRed; font-weight: bold;',
        );
        tableDataDirectionForTable6vM.setProperty(
          i,
          0,
          'style',
          'background-color: #F6F6F6; width: 75px; font-weight: bold;',
        );
      }
    }

    // Standardmaessig wird das Gesamtjahr angezeigt!
    showNumofFlightsYear();
    showDirectionYear();
  } else {
    $('#flightCountChart_div').slideUp(200);
    $('#flightCountTable_div').slideUp(200);
    $('#directionChart_div').slideUp(200);
    $('#directionTable_div').slideUp(200);
    $('#flightCountNoData').show();
    $('#directionNoData').show();
  }
}

function loadTypemix(xmlData) {}

function loadRouteUsage(xmlData) {
  // ---------------------------------
  // ROUTENABSCHNITTSBELEGUNGS-TABELLE
  // ---------------------------------
}

// In dieser Methode werden die Anzeigebereiche mit Daten gefuellt. Der uebergebene XML-String kommt aus dem AJAX-Aufruf der entsprechenden Server-Funktion.
// Jeder Teilbereich der Seite wird einzeln geladen
function loadData(xmlData) {
  var nmtAvailability = 0.0;
  var curNMT = xmlData.documentElement.getElementsByTagName('currentNMT');
  if (curNMT && curNMT[0] && curNMT[0].getAttribute('availability') != '') {
    nmtAvailability = parseFloat(curNMT[0].getAttribute('availability'));
  }

  loadNMTData(xmlData);

  if (nmtAvailability >= 50.0) {
    loadLMaxFrequency(xmlData);
    loadNoiseStat(xmlData);
  } else {
    clearTableData(tableDataFrequency);
    clearTableData(tableDataFrequencyForTable);
    clearTableData(tableDataFrequency6vM);
    clearTableData(tableDataFrequencyForTable6vM);
    $('#freqchart_div').hide();
    $('#freqtable_div').hide();
    clearTableData(tableDataFrequencyHistDay);
    clearTableData(tableDataFrequencyHistNight);
    clearTableData(tableDataFrequencyHistDay6vM);
    clearTableData(tableDataFrequencyHistNight6vM);
    $('#freqhistdaytable_div').hide();
    $('#freqhistnighttable_div').hide();
    $('#txtLMaxFrequency').html('Noise Event Distribution of Departures');

    clearTableData(tableDataNoiseStatEU);
    clearTableData(tableDataNoiseStatEUForTable);
    $('#noisechartFLG_div').hide();
    $('#noisetableFLG_div').hide();
    $('#noisechartEU_div').hide();
    $('#noisetableEU_div').hide();
    $('#txtNoiseStatEU').html('Equivalent continuous sound levels of aircraft sound');

    $('#freqchart_div').slideUp(200);
    $('#freqtable_div').slideUp(200);
    $('#freqhistdaytable_div').slideUp(200);
    $('#freqhistnighttable_div').slideUp(200);
    $('#lmaxFreqNoData').show();
    $('#lmaxFreqHistNoData').show();
    $('#noiseStatEUNoData').show();
  }

  loadFlightCountData(xmlData);
  loadTypemix(xmlData);
  loadRouteUsage(xmlData);
}

function unload() {
  // Hier sp�ter die Cookies schreiben (z.B. ge�ffnete Rubriken merken)
}

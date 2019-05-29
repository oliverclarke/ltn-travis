import axios from 'axios';
import moment from 'moment';
import { parseString } from 'xml2js';

const BASE_URL = 'https://travisltn.topsonic.aero';
const SESSION_ID = 100; // this is a bit nonsensical. Basically a random number so that you can go grab the XML file it generates afterwards.
const NMT_STATIC_DATE = '1999-01-20'; // For some reason the web client always outputs this.
const LIVE_DATA_DELAY = 20; // in minutes

function getData() {
  return axios.get(`https://travisltn.topsonic.aero/WebReport/xmlSessionData/wr${SESSION_ID}.xml`);
}

function parseData(data) {
  const flights = data.WRData.flightCountDay[0].flightCountSet;
  Object.keys(flights).forEach((key) => {
    flights.key['$'].timestamp = moment.unix(flights.key['$'].timestamp);
  });
  return data;
}

// http://travisltn.topsonic.aero/WebReport/WRDataLoader.php?session=1134968647415&nmtid=1&day=25&month=5&year=2019&nmtValidDate=1999-01-20
function prepReportData(params) {
  const { date, nmtId } = params;
  const parsedDate = moment(date);

  return axios.get('https://travisltn.topsonic.aero/WebReport/WRDataLoader.php', {
    params: {
      session: SESSION_ID,
      nmtid: nmtId,
      day: parsedDate.day(),
      month: parsedDate.date(),
      year: parsedDate.year(),
      nmtValidDate: NMT_STATIC_DATE,
    },
  });
}

export const getWebReport = async (params) => {
  const { nmtId, date } = params;
  console.table(params);
  await prepReportData({ nmtId, date });
  const data = await getData();
  return new Promise((resolve, reject) => {
    parseString(data.data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseData(result));
      }
    });
  });
};

function prepTrackData(time) {
  const date = moment(time);
  return axios.get('https://travisltn.topsonic.aero/getTravisData.php', {
    params: {
      session: SESSION_ID,
      histTime: date.unix(),
      histLength: 60,
    },
  });
}

function getTrackData() {
  return axios.get(`https://travisltn.topsonic.aero/xmlSessionData/tracks${SESSION_ID}.xml`);
}

// function parseTracks(data) {
// data.tracks.trk.
// }

function validateDatetime(datetime) {
  console.log(`Datetime of ${datetime} requested. Limiting to previous ${LIVE_DATA_DELAY} mintes`);
  return moment.min(moment(datetime), moment().subtract(LIVE_DATA_DELAY, 'minute'));
}

export const getTracks = async (params) => {
  let { time } = params;
  time = validateDatetime(time);
  console.log(`Date time value is '${time}.`);
  await prepTrackData(time);
  const data = await getTrackData();
  return new Promise((resolve, reject) => {
    parseString(data.data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

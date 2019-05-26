import axios from 'axios';
import moment from 'moment';
import { parseString } from 'xml2js';

const BASE_URL = 'https://travisltn.topsonic.aero';
const SESSION_ID = 100; // this is a bit nonsensical. Basically a random number so that you can go grab the XML file it generates afterwards.
const NMT_STATIC_DATE = '1999-01-20'; // For some reason the web client always outputs this.

function getData() {
  return axios.get(`https://travisltn.topsonic.aero/WebReport/xmlSessionData/wr${SESSION_ID}.xml`);
}

function parseData(data) {
  const flights = data.WRData.flightCountDay[0].flightCountSet;

  Object.keys(flights).forEach((key) => {
    flights[key]['$'].timestamp = moment.unix(flights[key]['$'].timestamp);
  });
  return data;
}

// http://travisltn.topsonic.aero/WebReport/WRDataLoader.php?session=1134968647415&nmtid=1&day=25&month=5&year=2019&nmtValidDate=1999-01-20
function prepData(nmtId, inputDate) {
  const date = moment(inputDate);

  return axios.get('https://travisltn.topsonic.aero/WebReport/WRDataLoader.php', {
    params: {
      session: SESSION_ID,
      nmtid: nmtId,
      day: date.day(),
      month: date.date(),
      year: date.year(),
      nmtValidDate: NMT_STATIC_DATE,
    },
  });
}

const returnData = async (params) => {
  const { nmtId, date } = params;
  console.table(params);
  await prepData(nmtId, date);
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

export default returnData;

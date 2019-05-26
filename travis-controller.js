import axios from 'axios';
import { parseString } from 'xml2js';

const BASE_URL = 'https://travisltn.topsonic.aero';
const SESSION_ID = 100; // this is a bit nonsensical. Basically a random number so that you can go grab the XML file it generates afterwards.
const NMT_STATIC_DATE = '1999-01-20'; // For some reason the web client always outputs this.

function getData() {
  return axios.get(`https://travisltn.topsonic.aero/WebReport/xmlSessionData/wr${SESSION_ID}.xml`);
}

// http://travisltn.topsonic.aero/WebReport/WRDataLoader.php?session=1134968647415&nmtid=1&day=25&month=5&year=2019&nmtValidDate=1999-01-20
function prepData(nmtId) {
  return axios.get('https://travisltn.topsonic.aero/WebReport/WRDataLoader.php', {
    params: {
      session: SESSION_ID,
      nmtid: nmtId,
      day: 25,
      month: 4,
      year: 2019,
      nmtValidDate: NMT_STATIC_DATE,
    },
  });
}

const returnData = async (params) => {
  const { nmtId } = params;
  console.table(params);
  await prepData(nmtId);
  const data = await getData();
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

export default returnData;

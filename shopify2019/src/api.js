import fetch from 'isomorphic-fetch';

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


function fixString(str) {
  return entities.decode(str);
}


export async function getData() {
  let data = await fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000');
  // console.log('this is the data: ', data);
  let jsonData = await data.json();
  console.log('this is the nice data: ', jsonData);
  // console.log('this is the nice version of the body: ', fixString(jsonData[0].body));
  return jsonData;
}

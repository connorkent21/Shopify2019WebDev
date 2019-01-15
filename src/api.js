import fetch from 'isomorphic-fetch';


export async function getData() {
  let data = await fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000');
  let jsonData = await data.json();
  console.log('this is the nice data: ', jsonData);
  return jsonData;
}

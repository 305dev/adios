const fs = require('fs');
const server = require('@fwd/server');

const download_image = (url, image_path) => server.http({ url, responseType: 'stream', }).then( response =>
  new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(image_path))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  }),
);

(async () => {

	var dataset = []

  var politicians = await server.http.get(`https://api.fwd.dev/sheets?sheetId=1okB1ifW8i5ZKd49i9kb6-szfZ_b1cfNfm20MLqIWg_8&worksheetId=National&limit=1000`)
  for (var national_person of politicians.data.items) dataset.push(national_person)

  await server.sleep(100)

  var florida = await server.http.get(`https://api.fwd.dev/sheets?sheetId=1okB1ifW8i5ZKd49i9kb6-szfZ_b1cfNfm20MLqIWg_8&worksheetId=Florida&limit=1000`)
  for (var florida_person of florida.data.items) dataset.push(florida_person)

	await server.write('./dataset.json', JSON.stringify(dataset, null, 4))

})()

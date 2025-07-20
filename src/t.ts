import fs from 'fs';
import {google} from 'googleapis';
import path from 'path';

let OAuth2 = google.auth.OAuth2;

// import data from "../client_secret.json" assert { type: "json" };

const {web}:{web:Record<string, any>}= JSON.parse(fs.readFileSync(path.join(process.cwd(), 'client_secret.json'), 'utf8'));
const {
    client_secret,
    client_id,
    redirect_uris
} = web;

let oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
)

console.log(web);



//import readline from 'readline';


// var clientSecret = credentials.installed.client_secret;
// var clientId = credentials.installed.client_id;
// var redirectUrl = credentials.installed.redirect_uris[0];
// var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
// let OAuth2 = google.auth.OAuth2;

// new OAuth2( 

// // If modifying these scopes, delete your previously saved credentials
// // at ~/.credentials/youtube-nodejs-quickstart.json
// var SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the YouTube API.
//   //@ts-ignore
//   authorize(JSON.parse(content), getChannel);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
//   //@ts-ignore

// function authorize(credentials, callback) {
//   var clientSecret = credentials.installed.client_secret;
//   var clientId = credentials.installed.client_id;
//   var redirectUrl = credentials.installed.redirect_uris[0];
//   var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//           //@ts-ignore

//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
//   //@ts-ignore

// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter the code from that page here: ', function(code) {
//     rl.close();
//       //@ts-ignore

//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   });
// }

// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
//   //@ts-ignore

// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//       //@ts-ignore

//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//     if (err) throw err;
//     console.log('Token stored to ' + TOKEN_PATH);
//   });
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
//   //@ts-ignore

// function getChannel(auth) {
//   var service = google.youtube('v3');
//   service.channels.list({
//     auth: auth,
//       //@ts-ignore
//     part: 'snippet,contentDetails,statistics',
//     forUsername: 'GoogleDevelopers'
//       //@ts-ignore
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var channels = response.data.items;
//     if (channels.length == 0) {
//       console.log('No channel found.');
//     } else {
//       console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
//                   'it has %s views.',
//                   channels[0].id,
//                   channels[0].snippet.title,
//                   channels[0].statistics.viewCount);
//     }
//   });
// }









// import { google, youtube_v3 } from 'googleapis';
// import fs from 'fs';



// const auth = new google.auth.GoogleAuth({
//   keyFile: `autopublisher-dev-c40884c90686.json`,
//   scopes: ['https://www.googleapis.com/auth/youtube.upload']
// });

// const youtube = google.youtube({ version: 'v3', auth });




// ( async () => {

//     let token = await auth.getAccessToken();

//     const videoMetadata = {
//         snippet: {
//             title: 'Ma vidéo uploadée via API',
//             description: 'Description de ma vidéo',
//             tags: ['nodejs', 'youtube', 'api'],
//             categoryId: '22', // Catégorie "People & Blogs"
//             defaultLanguage: 'fr',
//             defaultAudioLanguage: 'fr'
//         },
//         status: {
//             privacyStatus: 'private', // 'public', 'unlisted', 'private'
//             selfDeclaredMadeForKids: false
//         }
//     };

//     const response = await youtube.videos.insert({
//         part: ['snippet', 'status'],
//         requestBody: videoMetadata,
//         media: {
//         body: fs.createReadStream('output.mp4') 
//         }
//     });
//     console.log(response.data.id)

// })()


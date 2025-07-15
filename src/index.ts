import "dotenv/config";

import { chromium } from 'playwright';
import path from 'path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import OpenAI from 'openai';
import { ElevenLabsClient, stream } from '@elevenlabs/elevenlabs-js';
import { Readable } from 'stream';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const instructions = `
Tu es journaliste économique. Tu reçois chaque jour une liste brute d'actualités d'entreprise sous ce format :

[Exemple]

Implanet: la gamme JAZZ homologuée en Chine
Renault: abaisse ses objectifs 2025 à l'issue du 1er semestre

Ta mission : rédiger un **résumé oral fluide, dynamique et informatif**, d’environ **30-40 secondes**, reprenant les **6 à 7 actualités les plus significatives ou stratégiques** du jour.

Contraintes :
- Sois **précis et factuel**, reprends les **noms d'entreprises, chiffres, lieux et annonces** exactement comme donnés.
- Priorise les infos à fort impact (résultats, fusions, investissements, départs de dirigeants, innovations, régulations...).
- Structure le texte comme un **flash info radio ou podcast économique**.
- **Pas de listes**, juste un **paragraphe fluide**, ton professionnel, accessible et rythmé.

Le format de sortie attendu est le résumé prêt à être lu à l'oral, sans balises ni formatage, ni contexte additionnel.
`;

const prompt = `
    18:33	Implanet: la gamme JAZZ homologuée en Chine
    18:19	Renault: abaisse ses objectifs 2025 à l'issue du 1er semestre
    18:11	Renault: Duncan Minto nommé directeur général intérimaire
    18:06	Air Liquide: va investir plus de 50 M$ aux États-Unis
    17:37	Orange: BlackRock franchit les 5% des votes
    17:22	Alstom: BlackRock franchit les 5% du capital et des votes
    17:11	Estée Lauder: deux administratrices sur le départ
    17:02	Constellium: projet d'aluminium intelligent bouclé en Allemagne
    16:52	PepsiCo: collaboration stratégique avec Cargill
    16:45	Allianz: participation minoritaire dans l'hyperscaler Yondr
    16:30	GE Vernova: investit 100 M$ sur 2 ans en Pennsylvanie
    16:21	Eli Lilly: une approbation dans la maladie de Crohn au Canada
    16:10	Uber: partenariat stratégique pluriannuel avec Baidu
    16:00	Salesforce: déploiement d'Agentforce chez PepsiCo
    15:53	L'Oréal: le titre recule, Barclays juge la valorisation élevée
    15:35	BNY-Mellon: BPA accru de 27% au 2e trimestre
    15:03	PepsiCo: partenariat avec Salesforce pour l'IA
    14:26	Citigroup: marchés et gestion de fortune soutiennent les résultats
    14:00	Wells Fargo: progression de 20% du BPA trimestriel
    13:40	BlackRock: hausse de 16% du BPA au 2e trimestre
    13:20	JPMorgan Chase: baisse de 14% du BPA au 2e trimestre
    13:00	Société Générale: cède ses parts dans Société Générale Cameroun
    12:50	Michelin: notes de crédit confirmées par Scope et Moody's
    12:40	RWE: une nouvelle étape importante pour le parc éolien de Sofia
    12:31	Atos: un accord-cadre dans la gestion des identités et des accès
    12:21	Allianz: série de nominations au sein de la division 'Commercial'
    12:07	thyssenkrupp nucera: objectif de résultat opérationnel resserré pour 2024/2025
    11:51	BT: mise sur la 5G pour optimiser le Sail GP à Portsmouth
    11:19	J&J: présentera ses innovations neurovasculaires au congrès SNIS
    10:38	BBVA: un nouveau patron de la banque numérique en Italie
    10:20	Drone Volt: lancement de la production aux USA
    10:13	ING: plus de 40% du programme de rachat d'actions réalisé
    10:01	Nissan: va transférer la production de l'usine d'Oppama
    09:50	Biophytis: partenariat dans la découverte de médicaments via l'IA
    09:41	Nvidia: vers une reprise des ventes de puces H20 en Chine
    09:33	Rio Tinto: un nouveau CEO pour la fin août
    09:18	CDA: gain d'une nouvelle DSP en Savoie
    09:00	Valeo: module 5-en-1 choisi par un constructeur chinois
    08:43	Solvay: réduction d'objectif d'EBITDA pour 2025
    08:10	Mercialys: acquisition à 100% d'Hyperthétis Participations
    07:45	Ericsson: retour aux bénéfices au 2e trimestre
    07:20	SES: derniers feux verts obtenus pour le rachat d'Intelsat
`;


( async () => {

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env['ELEVENLABS_API_KEY'],
});

const response = await client.responses.create({
  model: 'gpt-4o',
  instructions,
  input: prompt,
});



// openai
let responseText = "";
if ( process.env['OPENAI_DEBUG'] === 'true' ) {
    console.log("OPENAI DEBUG MODE")
    responseText = "Dans l'actualité économique aujourd'hui, Renault annonce une révision à la baisse de ses objectifs pour 2025 après le premier semestre, tout en nommant Duncan Minto comme directeur général intérimaire. Air Liquide s'apprête à investir plus de 50 millions de dollars aux États-Unis, renforçant ainsi sa présence outre-Atlantique. De son côté, Orange voit BlackRock franchir le seuil des 5% des droits de vote, une indication de confiance de la part de ce géant de l'investissement. Constellium finalise avec succès son projet d'aluminium intelligent en Allemagne, illustrant son engagement dans l'innovation. Aux États-Unis, GE Vernova investit 100 millions de dollars sur deux ans en Pennsylvanie, confirmant sa stratégie de développement durable. Enfin, Société Générale cède ses parts dans sa filiale camerounaise, marquant une étape clé dans sa réorganisation internationale."
} else {
    responseText = response.output_text;
}


// TTS
if ( process.env['ELEVENLABS_DEBUG'] === 'true' ) {
    console.log("ELEVENLABS DEBUG MODE")
} else {
    const audioStream = await elevenlabs.textToSpeech.stream(process.env['ELEVENLABS_VOICE_ID']!, {
        text: responseText,
        modelId: 'eleven_multilingual_v2',
    });
    // option 1: play the streamed audio locally
    // await stream(Readable.from(audioStream as any) as any);
    
    let audioChunks: Buffer[] = [];
    for await (const chunk of (audioStream as any)) {
        console.log("Received audio chunk of size:", chunk.length);
        audioChunks.push(Buffer.from(chunk));
    }
    fs.writeFileSync(path.resolve(__dirname, '../elevenlabs/output.mp3'), Buffer.concat(audioChunks));
}

// Grab some images for video illustration
// TODO => nul a chié les images il faut utiiser autre chose que cette merde.
// TODO => Récupérer les categories ( nom de société ) avec le prompt ( renvoyer du JSON)
const PREFIX = "Société";
const searchTerms = [encodeURIComponent(`${PREFIX} NVIDIA`), encodeURIComponent(`${PREFIX} Rio Tinto`)]; // TODO using prompt chatgpt

const promises = searchTerms.map(async (term) => {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${term}&per_page=1`, {
      headers: {
        "Authorization": process.env['PEXELS_API_KEY']!,
      },
    });
    return Promise.resolve({
        data: await res.json(),
        term: term,
    })
});

const imgResult = await Promise.all(promises);
imgResult.forEach( (resultObj) => {
    console.log(`img src ${resultObj.term}`, resultObj.data.photos[0]?.src.original);
})

// FFMPEG video generation
// TODO


// Upload to YouTube shorts 
// TODO

// Upload to TikTok
// TODO


})();
import { chromium } from 'playwright';
import path from 'path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

( async () => {

    // ffmpeg -loop 1 -i image.png -i audio.mp3 -c:v libx264 -c:a copy -pix_fmt yuv420p -vf scale=1920:1080 -shortest -y output.mp4
    const test = spawn('ffmpeg', [
        "-loop",
        "1",
        "-i",
        "image.png",
        "-i",
        "audio.mp3",
        "-c:v",
        "libx264",
        "-c:a",
        "copy",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale=1920:1080",
        "-shortest",
        "-y",
        "output.mp4"
    ]
    );

    test.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    test.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    test.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    // const optionsParse = {
    //     titles: {
    //         DECLARATION_DES_DIRIGEANTS: "Déclaration des dirigeants",
    //         OPA: "Offre publique d'acquision",
    //         SHORT: "Déclaration des positions courtes nettes"
    //     }
    // }

    // const freshData = []

    // const browser = await chromium.launch({
    //     executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // nothing will just use playwright's bundled Chromium
    //     headless: false,
    //     args: ['--start-maximized']
    //     // downloadsPath : path.resolve(process.cwd(), 'downloads'),
    // });

    // const page = await browser.newPage();
    // await page.goto('https://bdif.amf-france.org/fr');

    // await page.waitForSelector('.card-title', { timeout: 3000 });
    // await page.waitForSelector('.info .publication-info', { timeout: 3000 });
    // await page.waitForSelector('mat-card mat-card-actions button mat-icon', { timeout: 3000 });
    // await page.waitForSelector('mat-button-toggle', { timeout: 3000 });
    // await page.waitForSelector('.research-button button', { timeout: 3000 });

    // const filterBtns = await page.locator('mat-button-toggle').all();
    // const researchBtn = page.locator('.research-button button').first();

    // let index = 0;
    // for ( const btn of filterBtns) {
    //     if ( index === 1 || index === 3 || index === 5 ) {
    //         await btn.click();
    //     }
    //     index++;
    // }
    // await page.waitForTimeout(1000); // wait for the page to update
    // await researchBtn.click();

    // await page.waitForSelector('.more-results', { timeout: 3000 });
    // const moreBtn = page.locator('.more-results').first();
    
    // // TODO => if pub info is the date of now continue
    // await moreBtn.click();
    // await page.waitForTimeout(3000); // wait for the page to update
    // await moreBtn.click();
    // await page.waitForTimeout(3000); // wait for the page to update
    // await moreBtn.click();

    // const cardsTitles = await page.locator('.card-title').all();
    // const publicationInfos = await page.locator('.publication-info'). all();
    // const dlBtns = await page.locator('mat-card mat-card-actions button mat-icon').all();

    // for ( const pubInfo of publicationInfos) {
    //     const text = await pubInfo.textContent();
    //     console.log(text);
    // }





    // const downloadPromise = page.waitForEvent('download');
    // await dlBtns[0].click();
    // const download = await downloadPromise;
    // await download.saveAs(path.resolve(process.cwd(), 'downloads', download.suggestedFilename()));
    

    

    // const dlPath = await download.path();
    // console.log(`Download started: ${dlPath} -> ${download.suggestedFilename()}`);
    // await download.saveAs(path.resolve(process.cwd(), download.suggestedFilename()));



    // for ( const btn of dlBtns) {
    //     const text = await btn.textContent();
    //     if (text === 'download') {
    //         await btn.click();
    //         await page.waitForTimeout(1000); // wait for download to start
    //     }
    // }
    
    // for ( const title of cardsTitles) {
    //     const text = await title.textContent();
    //     console.log(text);
    // }

    // for ( const publicationInfo of publicationInfos) {
    //     const text = await publicationInfo.textContent();
    //     console.log(text);
    // }

})()



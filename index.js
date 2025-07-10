import { chromium } from 'playwright';


const optionsParse = {
    titles: {
        DECLARATION_DES_DIRIGEANTS: "Déclaration des dirigeants",
        OPA: "Offre publique d'acquision",
        SHORT: "Déclaration des positions courtes nettes"
    }
}

( async () => {
    const browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto('https://bdif.amf-france.org/fr');

    const data = await page.waitForSelector('.card-title', { timeout: 3000 });
    const elements = await page.locator('.card-title').all();    
 
    for ( const element of elements) {
        const text = await element.textContent();
        console.log(text);
    }

})()



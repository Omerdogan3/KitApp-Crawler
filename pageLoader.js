let pageLoader = async(category) =>{	
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
	await page.emulate(iPhone);
	await page.goto("http://www.dr.com.tr/One-Cikan-Kategoriler");
	await page.click(`#ph-topic > div.page-body > div > div > div > div:nth-child(`+ category + `) > a > img`); 
}

module.exports.pageLoader;

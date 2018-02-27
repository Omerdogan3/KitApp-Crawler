const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];


let pageLoader = async() =>{
	
}



let scapeDr = async (category, step, next) => {
  const browser = await puppeteer.launch({headless: false});
  
  const page = await browser.newPage();
  await page.emulate(iPhone);
  
  await page.goto("http://www.dr.com.tr/One-Cikan-Kategoriler");
  
  await page.click(`#ph-topic > div.page-body > div > div > div > div:nth-child(`+ category + `) > a > img`); 
  
	if(next === true){
			const nextButton = '#catPageContent > div.container.pager-content > ul > li:nth-child(7) > a.next';
			await page.waitForSelector(nextButton);
			await page.click(nextButton);
			return null;
	}

  const findedBook = '#container > div:nth-child('+ step + ') > div > a:nth-child(1) > figure > img';
  await page.waitForSelector(findedBook);
  await page.click(findedBook);
  await page.waitFor(4000);
  

  const result = await page.evaluate(() => {
    let title = document.querySelector('h1').innerText;

    const productDetails = "#catPageContent > section.product-details > div.container > div.all-details > div.specs > ";

    let author = document.querySelector(productDetails + 'div:nth-child(1) > span > a > span').innerText;
    let publisher = document.querySelector(productDetails + 'div:nth-child(2) > h2 > a').innerText;
    let ISBN = document.querySelector(productDetails + " ul > li:nth-child(3)").innerText;
		let summary = document.querySelector("#catPageContent > section.product-details > div.container > div.summary").innerText;
		
    return {
        ISBN,
        title,
        author,
        publisher,
        summary
    }
});

  await browser.close();
  console.log(result.ISBN);
  return result;
};

let step;
async function processArray(){
    for(let category=2; category<23; ++i){
        let nextPage = false;
        for(step=83; step<=85; step=step+2){
            if(step>83){
                nextPage = true;
								await scapeDr(category,1,nextPage);
            }else{
							await scapeDr(category,step,nextPage);
						}
            
        }
        
    }
    console.log('Done!');
}

processArray();




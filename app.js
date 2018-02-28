const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const fs = require('fs');

let browser;
let page;

let scapeDr = async (firstLaunch, category, step, next) => {
  
  if(firstLaunch){
      browser = await puppeteer.launch({headless: true,args: [
        `--window-size=${ 400 },${ 800 }`
      ]});
      page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto("http://www.dr.com.tr/One-Cikan-Kategoriler");
      await page.click(`#ph-topic > div.page-body > div > div > div > div:nth-child(`+ category + `) > a > img`); 
  }

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
    let author;
    let publisher;
    let ISBN;
    let stars;
    let summary;
    let title = document.querySelector('h1').innerText;

    const productDetails = "#catPageContent > section.product-details > div.container > div.all-details > div.specs > ";

    if(document.querySelector(productDetails + 'div:nth-child(1) > span > a > span') != null){
      author = document.querySelector(productDetails + 'div:nth-child(1) > span > a > span').innerText;
    }
    if(document.querySelector(productDetails + 'div:nth-child(2) > h2 > a') != null){
      publisher = document.querySelector(productDetails + 'div:nth-child(2) > h2 > a').innerText;
    }
    if(document.querySelector(productDetails + " ul > li:nth-child(3)")!= null){
      ISBN = document.querySelector(productDetails + " ul > li:nth-child(3)").innerText;
    }
    if(document.querySelector("#catPageContent > section.product-details > div.container > div.head > div:nth-child(2) > span")!= null){
      stars =document.querySelector("#catPageContent > section.product-details > div.container > div.head > div:nth-child(2) > span").innerText;
    }
    if(document.querySelector("#catPageContent > section.product-details > div.container > div.summary")!=null){
      summary = document.querySelector("#catPageContent > section.product-details > div.container > div.summary").innerText;
    }

    return {
        ISBN,
        title,
        author,
        stars,
        publisher,
        summary
    }
  });

  //eger ki datayi alamazsa tekrardan geri gitmesini onlemek icin.
  if(page.url().startsWith('http://www.dr.com.tr/kategori/') === false){
    await page.goBack();
  }
  

  console.log(result.title);
  return result;
};

let step;
let firstLaunch = true;
async function processArray(){
    for(let category=2; category<=24; category=category+2){
        let nextPage = false;
        for(step=1; step<=85; step=step+2){
            if(step>83){
                nextPage = true;
                await scapeDr(firstLaunch,category,1,nextPage);
                firstLaunch = true;
            }else{
							await scapeDr(firstLaunch,category, step,nextPage);
							firstLaunch = false;
						}   
        }
    }
    console.log('Done!');
}

processArray();




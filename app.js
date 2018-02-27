const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

let scapeDr = async (category, step) => {
  const browser = await puppeteer.launch({headless: false});
  
  const page = await browser.newPage();
  await page.emulate(iPhone);
  
  await page.goto("http://www.dr.com.tr/One-Cikan-Kategoriler");
  
  await page.click(`#ph-topic > div.page-body > div > div > div > div:nth-child(`+ category + `) > a > img`); 
  
  const findedBook = '#container > div:nth-child(' + step +  ') > div > a.item-name > h3';
  await page.waitForSelector(findedBook);
  await page.click(findedBook);
  await page.waitFor(6000);


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
  return result;
};

// scapeDr().then((value)=>{
//     console.log(value);
// });


var usingItNow = function(callback) {
    callback(2,3);
};

for(var i=2; i<6; ++i){
    usingItNow(scapeDr);
}




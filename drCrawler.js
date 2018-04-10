const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
var _connection = require('./database/DBconnection');
var util = require('util');

let browser;
let page;

module.exports = scapeDr = async (firstLaunch, category, step, next, isScroll) => {
  
  // console.log(isScroll);
  if(firstLaunch){
      browser = await puppeteer.launch({headless: false, args: [
        `--window-size=${ 400 },${ 800 }`
      ]});
      page = await browser.newPage();
      page.setDefaultNavigationTimeout(300000);
      
      await page.emulate(iPhone);
      await page.goto("http://www.dr.com.tr/One-Cikan-Kategoriler");
      page.on('error', msg => { browser.refresh(); });
      page.on('pageerror', msg => { browser.refresh();  });
      
      await page.click(`#ph-topic > div.page-body > div > div > div > div:nth-child(`+ category + `) > a > img`); 
  }

	if(next === true){
      const nextButton = '#catPageContent > div.container.pager-content > ul > li:nth-child(7) > a.next';
      
      // await page.$$eval('a', anchors => {
      //   anchors.map(anchor => {
      //       if(anchor.class == 'next') {
      //           anchor.click();
      //           return
      //         }
      //     })
      // });

			await page.waitForSelector(nextButton);
      await page.click(nextButton);
      await page.waitFor(5000);
      return null;
	}
  
  const findedBook = '#container > div:nth-child('+ step + ') > div > a:nth-child(1) > figure > img';
  await page.waitForSelector(findedBook);
  
  const tmpUrl = page.url();
  await page.click(findedBook);
  await page.waitFor(2000);
  if(tmpUrl === page.url()){
    //console.log('returned');
    return;
  }

  await page.waitFor(4000);
  
  const result = await page.evaluate(() => {
    let author;
    let publisher;
    let ISBN;
    let stars;
    let category;
    let summary;
    let imageLink;
    let title = document.querySelector('h1').innerText;
    let productId = document.URL;

    const productDetails = "#catPageContent > section.product-details > div.container > div.all-details > div.specs > ";
    
    if(document.querySelector(productDetails + " ul > li:nth-child(3)")!= null){
      ISBN = document.querySelector(productDetails + " ul > li:nth-child(3)").innerText;
    }
    if(document.querySelector(productDetails + 'div:nth-child(1) > span > a > span') != null){
      author = document.querySelector(productDetails + 'div:nth-child(1) > span > a > span').innerText;
    }
    if(document.querySelector('#publisherName') != null){
      publisher = document.querySelector('#publisherName').innerText;
    }
    if(document.querySelector("#catPageContent > section.product-details > div.container > div.head > div:nth-child(2) > span")!= null){
      stars =document.querySelector("#catPageContent > section.product-details > div.container > div.head > div:nth-child(2) > span").innerText;
    }
    if(document.querySelector("#catPageContent > section.sub-categories > div > div > ul > li.lastElement > a")!= null){
      category =document.querySelector("#catPageContent > section.sub-categories > div > div > ul > li.lastElement > a").innerText;
    }
    if(document.querySelector("#catPageContent > section.product-details > div.container > div.all-details > div.images > figure > a")!= null){
      imageLink =document.querySelector("#catPageContent > section.product-details > div.container > div.all-details > div.images > figure > a").getAttribute('href');
    }
    if(document.querySelector("#catPageContent > section.product-details > div.container > div.summary")!=null){
      summary = document.querySelector("#catPageContent > section.product-details > div.container > div.summary").innerText;
    }

    return {
        ISBN: ISBN.slice(6),
        title,
        author,
        stars,
        publisher,
        category,
        imageLink,
        summary: summary.replace(/['"]+/g, ''),
        productId
    }
  });

  //eger ki datayi alamazsa tekrardan geri gitmesini onlemek icin.
  if(page.url().startsWith('http://www.dr.com.tr/kategori/') === false){
    await page.goBack();
  }
  
  return result;
};

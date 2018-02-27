const Nick = require("nickjs")
const nick = new Nick()
// process.env.CHROME_PATH="C:\Program Files(x86)\Google\ChromeBeta\Application"

nick.newTab().then(async (tab) => {

	await tab.open("http://www.dr.com.tr/CokSatanlar/Kitap")
	//await tab.untilVisible("#hnmain") // Make sure we have loaded the right page
	await tab.inject("../injectables/jquery-3.0.0.min.js") // We're going to use jQuery to scrape

	// Evaluate a function in the current page DOM context. Execution is sandboxed: page has no access to the Nick context
	// In other words: Open the browser inspector to execute this function in the console
	const hackerNewsLinks = await tab.evaluate((arg, callback) => {
		const data = []
		$(".cell").each((index, element) => {
			var tmp = $(element).children(index);
			data.push({
				site: "DR",
				name: tmp.find(".ellipsis").text(),
				price: tmp.find(".price").text(),
				author: tmp.find(".who").find("media-type").text(),
				publisher: tmp.find(".who mb10").text()
			})
		})
		callback(null, data)
	})

	await buster.setResultObject(hackerNewsLinks) // Send the result back to Phantombuster
	await tab.screenshot("dr.png") // Why not take a screenshot while we're at it?

})
.then(() => {
	console.log("Job done!")
	nick.exit()
})
.catch((err) => {
	console.log(`Something went wrong: ${err}`)
	nick.exit(1)
})






// import Nick from '../Nick'

// const nick = new Nick()

// nick.initialize().then(() => {
// 	nick.newTab().then((tab) => {
// 		tab.open("phantombuster.fr", (err, res) => {
// 			console.log("open err: " + err)
// 			console.log("open res: " + res)
// 			tab.exit()
// 		})
// 	}).catch((err) => {
// 		console.log("catch: " + JSON.stringify(err, undefined, 2))
// 		console.log("catch: " + err)
// 	})
// })
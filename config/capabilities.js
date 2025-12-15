module.exports = [
    {
	"browserName": "Chrom",
	"browserVersion": "143.0",
	"LT:Options": {
        'build': 'Playwright Build',
        'name': 'Playwright Test for chrome',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
		"video": true,
		"platform": "Windows 10",
		
		"console": true
    }
},
{
	"browserName": "pw-firefox",
	"browserVersion": "137.0",
	"LT:Options": {
        'build': 'Playwright Build',
        'name': 'Playwright Test for macOS',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
		"video": true,
		"platform": "macOS Sonoma",
		
		"console": true
	}

},


]
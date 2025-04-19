var express = require('express');
const { scrapeData } = require('../public/javascripts/scrape');
var router = express.Router();
var scrape = require('../public/javascripts/scrape')

/* GET home page. */
router.get('/', function (req, res, next) {

    // URL of the page we want to scrape
    const url = "https://mugshots.com/US-States/Michigan/Alcona-County-MI/";



    scrape.scrapeData(url).then((img) => {
        console.log(img)
        // console.log('src is:' + imgSource)
        console.log('router test')

        res.render('index', { title: 'sadasd', imgSource: img });
    })

});

module.exports = router;

var express = require('express');
const { scrapeData } = require('../public/javascripts/scrape');
var router = express.Router();
var scrape = require('../public/javascripts/scrape')

/* GET home page. */
router.get('/', function (req, res, next) {

    // URL of the page we want to scrape
    const url = "https://mugshots.com/US-States/Michigan/Alcona-County-MI/";



    scrape.getCriminals(2).then((data) => {
        // console.log(data)

        res.render('index', { title: 'sadasd',
                            data: data,});
    })

    // res.render('index', {
    //     title: 'sadasd',
    //     data: [
    //         {
    //         img: "./images/mugshot_1.jpg",
    //         name: 'Alistair Crowley',
    //         crime: "Loving too much."
    //     },
    //     {
    //         img: "./images/mugshot_2.jpg",
    //         name: 'Abigail Cummins',
    //         crime: "Being a cow."
    //     }]
    // });

});

module.exports = router;

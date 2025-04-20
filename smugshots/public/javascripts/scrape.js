// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseURL = "https://mugshots.com"

// Async function for retrieving a list of criminals from a random county
async function getCriminals() {
    try {
        // Fetch HTML of the page we want to scrape
        let { data } = await axios.get(baseURL + '/US-States');
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const states = $("#subcategories").find("a");

        let random = Math.floor(Math.random() * states.length);

        console.log(states.eq(random).attr('href'));

        const stateURL = states.eq(random).attr('href');

        getCounty(stateURL)
    } catch (err) {
        console.error(err);
    }
}

async function getCounty(stateURL) {
    try {
        // Fetch HTML of the page we want to scrape
        let { data } = await axios.get(baseURL + stateURL);
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const counties = $("#subcategories").find("a");

        let random = Math.floor(Math.random() * counties.length);

        console.log(counties.eq(random).attr('href'));

        const countyURL = counties.eq(random).attr('href');

        getCriminalList(countyURL)

    } catch (err) {
        console.error(err);
    }
}

async function getCriminalList(countyURL) {
    try {
        // Fetch HTML of the page we want to scrape
        let { data } = await axios.get("https://mugshots.com/US-States/Maine/Cumberland-County-ME/");
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const criminals = $(".gallery-listing").find(".image-preview");

        let random = Math.floor(Math.random() * criminals.length);

        console.log(criminals.eq(random).attr('href'));

        const criminalURL = criminals.eq(random).attr('href');

        getCriminalData(criminalURL)


    } catch (err) {
        console.error(err);
    }
}

async function getCriminalData(criminalURL) {
    try {
        // Fetch HTML of the page we want to scrape
        let { data } = await axios.get(baseURL + criminalURL);
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const img = $("img.hidden-narrow");
        console.log(img.attr('src'));

        const name = $(".category-breadcrumbs>span:last-child");
        console.log(name.text());

        const crime = $("#Convictions").find("tr").eq(1).find("td");
        console.log(crime.eq(0).text());
        //console.log(crime.eq(0).text())




    } catch (err) {
        console.error(err);
    }
}



// Async function which scrapes the data
async function scrapeData(url) {
    try {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const listItems = $(".image-preview");
        // Stores data for all countries
        const mugshots = [];
        // Use .each method to loop through the li we selected

        const mugshot = $(".image-preview")

        // console.log($(listItems).attr('href'))
        // console.log($(listItems).find('img').attr('src'))
        return $(listItems).find('img').attr('src')
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    scrapeData: scrapeData,
    getCriminals: getCriminals
}
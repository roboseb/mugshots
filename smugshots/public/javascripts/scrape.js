// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

//Async function which scrapes the data
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
    scrapeData: scrapeData
}
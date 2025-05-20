// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseURL = "https://mugshots.com"

// Async function for retrieving a list of criminals from a random county
async function getCriminals(amount) {
    try {
        // Fetch HTML of the page we want to scrape
        let { data } = await axios.get(baseURL + '/US-States');
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const states = $("#subcategories").find("a");

        let random = Math.floor(Math.random() * states.length);

        //console.log(states.eq(random).attr('href'));

        const stateURL = states.eq(random).attr('href');

        getCounty(stateURL)

        const countyURL = await getCounty(stateURL);
        const criminalList = await getCriminalList(countyURL, amount);
        let criminalData = []

        // Create an array with the desired amount of criminal data objects.
        for (let i = 0; i < amount; i++) {
            let data = await getCriminalData(criminalList[i]);

            criminalData.push(data);
            

            if (i == amount - 1) {
                //console.log('done with data', criminalData.length)
                return criminalData;
            }
        }
  
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

        //console.log(counties.eq(random).attr('href'));

        const countyURL = counties.eq(random).attr('href');

        return countyURL;

    } catch (err) {
        console.error(err);
    }
}

async function getCriminalList(countyURL, amount) {
    try {

        let criminalList = []

        // Fetch HTML of the page we want to scrape
        // This link will be replaced with the passed countyURL argument if fully random selection is implemented.
        let { data } = await axios.get("https://mugshots.com/US-States/Alabama/DeKalb-County-AL/");
        // Load HTML we fetched in the previous line
        let $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const criminals = $(".gallery-listing").find(".image-preview");

        for (let i = 0; i < amount; i++) {
            let random = Math.floor(Math.random() * criminals.length);

            console.log("http://mugshots.com" + criminals.eq(random).attr('href'));

            while (criminals.eq(random).find(".image").find('img').length < 1) {
                console.log("no image found")
                random = Math.floor(Math.random() * criminals.length);
            }

            //console.log(criminals.eq(random).find(".image").find("img").length)

            criminalList.push(criminals.eq(random).attr('href'));
        }

        return criminalList;


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
        const img = $("img.hidden-narrow").attr('src');

        const name = $(".category-breadcrumbs>span:last-child").text();

        const methods = {
            0 : $("#Charges").find("tr").eq(1).find("td").eq(0).text(),
            1 : $("span:contains('Offense')").next().text(),
            2 : $("span:contains('Charges')").next().text(),
            3 : $("#Offenses").find("tr").eq(0).find("td").text(),
            4 : $("span:contains('Charges')").next().find("li").text(),
            5 : $(".field>div:contains('Charges')").next().find("li").text(),
        }

        let crime;

        // Iterate through all crime checking methods. Break if one works.
        for  (let i = 0; i < Object.keys(methods).length; i++) {
            crime = methods[i]

            if (crime != '') {
                console.log('Crime found!', crime, i);
                break;
            }
        }

        // Search for a new criminal if crime details are not present.

        if (crime == "N/A") {
            console.log('No crime data... Trying again.')
            return null;
        }

        console.log(`Crime: ${crime}`)
   


        const criminalData = createCriminal(img, name, crime);
        return criminalData;

    } catch (err) {
        console.error(err);
    }
}

const createCriminal = (img, name, crime) => {
    return {
        img: img,
        name: name,
        crime: crime
    }
}

module.exports = {
    getCriminals: getCriminals
}
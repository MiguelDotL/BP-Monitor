if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const puppeteer = require("puppeteer");
const sendSMS = require("./send-sms");
const bpCareers = "https://bibleproject.rippling-ats.com/";
const careerSection = ".jobs-content";
const noJobs = "No open positions at this time";
const minutes = 60000;
const timeInterval = 5 * minutes;

async function scrape() {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(bpCareers);
    var element = await page.waitForSelector(careerSection);
    var text = await page.evaluate((element) => element.textContent, element);

    text.replace(/[\r\n\t]/gm, "").replace(
        "Career Opportunities",
        "Career Opportunities: \n\n"
    );
    await browser.close();

    return text;
}

const careerOpportunities = async () => {
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    let timeStamp = `[${date} - ${time}]`;
    scrape()
        .then((result) => {
            if (!result.includes(noJobs)) {
                sendSMS(result);
                console.log(result);
            } else {
                setTimeout(careerOpportunities, timeInterval);
                console.log(`${timeStamp} - ${noJobs}...`);
            }
        })
        .catch((error) => console.log(error));
};

careerOpportunities();

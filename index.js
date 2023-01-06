const puppeteer = require("puppeteer");

// starting Puppeteer
puppeteer
  .launch()
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://cra-crawl.vercel.app/");
    await page.waitForSelector(".fruits-list");

    let heading = await page.evaluate(() => {
      const h1 = document.body.querySelector("h1");

      return h1.innerText;
    });

    console.log({ heading });

    let allFruits = await page.evaluate(() => {
      const fruitsList = document.body.querySelectorAll(".fruits-list li");

      let fruits = [];

      fruitsList.forEach((value) => {
        fruits.push(value.innerText);
      });
      return fruits;
    });

    console.log({ allFruits });
    // closing the browser
    await browser.close();
  })
  .catch(function (err) {
    console.error(err);
  });

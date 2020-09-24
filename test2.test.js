const playwright = require("playwright-chromium");
jest.setTimeout(50000);
let browser;
let context;

  beforeAll(async () => {
  browser = await playwright.chromium.launch({
    headless: false,
    slowMo: 1000,
    logger: {
      isEnabled: (name, severity) => name === 'browser',
      log: (name, severity, message, args) => console.log(`${name}`, `${message})`)
    }
  });
  });
 beforeEach(async () => {
  context= await browser.newContext();
 });

 afterEach(async () => {
   await context.close();
 });

  afterAll(async() => {
   await browser.close();
   });

describe("UI", () => {
  let page;

  test("1 Open iFrame", async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/frames');
    frame = await page.frame({ url: 'https://the-internet.herokuapp.com/iframe' });
    await page.click('a[href="/iframe"]');
    await page.waitForTimeout(3000);
  });

  test("2 Open login form in frame", async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.w3schools.com/html/html_iframe.asp');
    const frames = await page.frames();
    const frame = frames[1];
    await frame.waitForSelector('iframe');
    await page.click('#w3loginbtn');
    await page.waitForSelector('#w3loginbtn');
  });

  test("3 - Open menu ", async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.click('#rmenu');
    await page.waitForSelector('#rmenu',{ timeout: 1000});
  });

  test(" 4 -Find earth ", async () => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://bitaps.com');
      await page.click('#myearth');
      await page.waitForSelector('#myearth',{ timeout: 1000});
    });

  test(" 5 -Find footer ", async () => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://bitaps.com');
      await page.click('#footer');
      await page.waitForSelector('#footer',{ timeout: 1000});
  });

  test(" 6 -Search transaction ", async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.click('#search-box');
    await page.waitForSelector('#search-box', { timeout: 1000 });
    await page.type('#search-box', '123');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
  });

  test(" 7 -Open scan-qr ", async () => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://bitaps.com');
      await page.click('.scan-qr');
      await page.waitForSelector('.scan-qr', { timeout: 1000 });
      await page.waitForTimeout(3000);
    });

  test(" 8 -View pool-statistics ", async () => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.click('#pool-statistics');
    await page.waitForSelector('#pool-statistics', { timeout: 1000 });
    await page.waitForTimeout(3000);
  });

});
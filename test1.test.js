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
    test("1 Launch browser>Open page", async () => {
        page = await browser.newPage();
        await page.goto('https://the-internet.herokuapp.com');
    });
    test("2- Add/Remove Elements", async () => {
        await page.click('[href="/add_remove_elements/"]');
        await page.click('button[onclick="addElement()"]');
        await page.waitForSelector(".added-manually");
    });
    test("3 Basic_auth", async () => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin',
            }
        });
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/basic_auth');
        await page.waitForTimeout(3000);
    });
    test("4 Checkboxes", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        await page.check('#checkboxes :nth-child(1)');
        await page.uncheck('#checkboxes :nth-child(3)');
    });
    
    test("5 Context menu", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/context_menu');
        await page.click('#hot-spot', { button: 'right' });
        await page.waitForTimeout(3000);
    });
  
    test("6 Digest auth", async () => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin',
            }
        });
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/digest_auth');
        //assertion
        await page.waitForSelector('text=Congratulations! You must have the proper credentials.');
    });

    test("7 Dropdown", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/dropdown');
        await page.selectOption('#dropdown', '2');
    });
    test("8 Disabled input", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
        await page.click('#input-example [type="button"]');
        await page.waitForSelector('[type="text"]:not([disabled])');
    });
    test("9 Login form", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://the-internet.herokuapp.com/login");
        await page.type('#username', 'tomsmith');
        await page.type('#password', 'SuperSecretPassword!');
        await page.click('[type="submit"]');
        await page.waitForSelector('[href="/logout"]');
        await page.waitForTimeout(5000);
    });

    test("10 Notification message", async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://the-internet.herokuapp.com/notification_message");
        await page.click('a[href="/notification_message"]');
        await page.waitForSelector('#flash');
  
    });
});
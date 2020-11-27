import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer";

const isDev = process.env.NODE_ENV === "development";
const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const getOptions = async isDev => {
  
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  }
  
  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  };
};

export const getPerformance = async (req, res) => {

  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  /*var url = "https://allied-techs.com";

  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();
  await page.goto(url); // change to your website
  
  const performanceEntries = JSON.parse(
      await page.evaluate(() => JSON.stringify(
          performance.getEntriesByType("navigation")[0]
      )) 
  );

  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(
        performance.timing
    )) 
  );*/

  console.log(req.headers);

  //save to Bubble DB
  const response = await fetch("https://marketheart.allied-techs.com/api/1.1/obj/Urls");
  var myFetchedData = await response.json();

  //trigger Bubble Workflow
  /*var baseUrl = "https://marketheart.allied-techs.com/api/1.1/wf/testendpoint?url=";
  response = await fetch();*/

  res.statusCode = 200
  res.json(myFetchedData)
  //myFetchedData

  return { res };
};

export default getPerformance;

//https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings
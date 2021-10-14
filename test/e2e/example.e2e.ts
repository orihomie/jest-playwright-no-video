import { config } from './configs/config';
import { newJestContext } from './helpers/playwright-helpers';

describe('test', () => {
  jest.setTimeout(1000 * 60 * 10);

  beforeAll(async () => {
    await page.close();
  });

  test('go to google', async () => {
    let newContext = await newJestContext(
      browser,
      { recordVideo: config.recordVideo },
      { testName: expect.getState().currentTestName },
    );

    let newPage = await newContext.newPage();
    await newPage.goto("https://google.com", { waitUntil: 'domcontentloaded' });

  });

  test('go to yandex', async () => {
    let newContext = await newJestContext(
      browser,
      { recordVideo: config.recordVideo },
      { testName: expect.getState().currentTestName },
    );

    let newPage = await newContext.newPage();
    await newPage.goto("https://ya.ru", { waitUntil: 'domcontentloaded' });

  });

  afterAll(() => {
  });
});

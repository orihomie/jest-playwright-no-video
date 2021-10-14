import { unlink } from 'fs';
import path from 'path';

import { Frame, Browser, BrowserContext, BrowserContextOptions, Page } from 'playwright-core';

export interface JestContextOptions {
  testName: string;
}

async function videNameEditor(page: Page, dir: string, name: string, prefix?: string) {

  let videSize = `${page.viewportSize().height}x${page.viewportSize().width}`;
  let nameEscaped = name.replace(/ /g, '_');
  let fileName = `${prefix ? `${prefix}_` : ''}${nameEscaped}_${Date.now()}_${videSize}.webm`;

  let video = page.video();

  if (!video) return;

  try {
    await video.saveAs(path.join(dir, fileName));
  } catch {}

  try {
    let videoPath = await video.path();
    unlink(videoPath, () => {});
  } catch {}
}

export function addVideoCloseCrashHooks(page: Page, dir: string, testName: string) {
  page.addListener('close', async (p) => await videNameEditor(p, dir, testName, 'close'));
  page.addListener('crash', async (p) => await videNameEditor(page, dir, testName, 'crash'));
}

export async function newJestContext(
  browser: Browser,
  options?: BrowserContextOptions,
  jestOptions?: JestContextOptions,
): Promise<BrowserContext> {
  let newContext = await browser.newContext(options);

  newContext.on('page', (newPage) => addVideoCloseCrashHooks(newPage, options.recordVideo.dir, jestOptions.testName));

  return newContext;
}

/* Search frames by attribute and attribute's value
 * @param frames Initial frames array
 * @param attributeName
 * @param attributeValues
 *
 * const frames = await filterFramesByAttribute(page.frames(), 'class', 'auth-form-new__inner-iframe');
 * */
export async function filterFramesByAttribute(frames: Array<Frame>, attributeName: string, attributeValue: string) {
  const result = [];

  for (const frame of frames) {
    try {
      const handle = await frame.frameElement();
      const value = await handle.getAttribute(attributeName);

      if (value === attributeValue && !result.includes(frame)) {
        result.push(frame);
      }
    } catch (e) {}
  }

  return result;
}

export const config = {
  baseUrl: process.env.BASE_URL,
  recordVideo: {
    dir: process.env.ARTIFACTS_DIR || '/tmp/test-results',
  },
};

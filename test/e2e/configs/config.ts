export const config = {
  baseUrl: process.env.BASE_URL,
  recordVideo: {
    dir: process.env.TESTS_VIDEO_DIR || '/tmp/test-results',
  },
};

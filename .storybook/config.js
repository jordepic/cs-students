import { configure } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";

// import "../src/index.css";

const req = require.context("../src/stories", true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

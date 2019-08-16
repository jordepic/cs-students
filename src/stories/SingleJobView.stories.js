import React from "react";
import { storiesOf } from "@storybook/react";

import SingleJobView from "../components/SingleJobView";

const basic_job = {
  imgLink:
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  companyName: "Google",
  companyUrl: "google.com",
  title: "Software Engineer",
  description: "Coding. Isn't that nice!"
};

storiesOf("Single Job View", module).add("basic", () => (
  <SingleJobView job={basic_job} />
));

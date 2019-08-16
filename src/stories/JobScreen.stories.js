import React from "react";
import { storiesOf } from "@storybook/react";

import JobScreen from "../components/JobScreen";

const basic_job = {
  imgLink:
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  companyName: "Google",
  companyUrl: "google.com",
  title: "Software Engineer",
  description: "Coding. Isn't that nice!"
};

const job_2 = Object.assign({}, basic_job);
job_2.companyName = "LinkedIn";
job_2.companyUrl = "linkedin.com";
job_2.imgLink =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";

const job_3 = Object.assign({}, basic_job);
job_3.companyName = "Netflix";
job_3.companyUrl = "netflix.com";
job_3.imgLink =
  "https://cdn.vox-cdn.com/thumbor/_bCV_w5p7SrZVsZG1RvRAhBOeBU=/39x0:3111x2048/1820x1213/filters:focal(39x0:3111x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png";

storiesOf("JobScreen", module).add("basic", () => (
  <JobScreen jobs={[basic_job, job_2, job_3]} />
));

import React from "react";
import { storiesOf } from "@storybook/react";

import LoadingModal from "../components/LoadingModal";

storiesOf("Loading Modal", module).add("basic", () => <LoadingModal />);

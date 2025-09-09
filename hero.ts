const themes = require("./theme");
const sizes = require("./sizes");

import { heroui } from "@heroui/react";
export default heroui({
    addCommonColors: false,
    defaultTheme: 'light',
    defaultExtendTheme: 'light',
    themes: themes,
    layout: sizes.extend,
});
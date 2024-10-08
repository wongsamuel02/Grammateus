import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node, 
        ...globals.jest // Adding Jest globals
      } 
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",  // Automatically detect the React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",  // Turn off the rule that requires React in scope
      "react/no-unescaped-entities": "off",  // Disable the rule enforcing escaped entities in JSX
    },
  },
];

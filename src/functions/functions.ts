// Functions Main Runner

import { quickLinksDropdown, profileDropdown } from "./dropdowns";

class FunctionLoader {
  constructor() {
    quickLinksDropdown();
    profileDropdown();
  }
}

export const Functions = new FunctionLoader();

// Functions Main Runner

import { quickLinksDropdown, profileDropdown, notificationDropdown } from "./dropdowns";

class FunctionLoader {
  constructor() {
    quickLinksDropdown();
    profileDropdown();
    notificationDropdown();
  }
}

export const Functions = new FunctionLoader();

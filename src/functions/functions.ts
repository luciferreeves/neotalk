// Functions Main Runner

import { quickLinksDropdown, profileDropdown, notificationDropdown } from "./dropdowns";
import { statusTracker } from "./statusTracker";

class FunctionLoader {
  constructor() {
    quickLinksDropdown();
    profileDropdown();
    notificationDropdown();
    statusTracker();
  }
}

export const Functions = new FunctionLoader();

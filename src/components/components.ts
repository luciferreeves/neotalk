// Components Main Runner

import { loginComponent } from "./loginComponent";

class ComponentLoader {
  constructor() {
    loginComponent();
  }
}

export const Components = new ComponentLoader();

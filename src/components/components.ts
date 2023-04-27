// Components Main Runner

import { loginComponent } from "./loginComponent";
import { notificationsComponent } from "./notficationComponent";

class ComponentLoader {
  constructor() {
    loginComponent();
    notificationsComponent();
  }
}

export const Components = new ComponentLoader();

// Components Main Runner

import { loginComponent } from "./loginComponent";
import { notificationsComponent, notificationDropdownComponent } from "./notficationComponent";

class ComponentLoader {
  constructor() {
    loginComponent();
    notificationsComponent();
    notificationDropdownComponent();
  }
}

export const Components = new ComponentLoader();

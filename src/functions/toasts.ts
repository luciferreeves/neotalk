// Site wide stackable toasts for notifications

export function notify(message: { title: string; body: string }) {
  const notification = document.createElement("div");
  const container: HTMLElement | null =
    document.getElementById("notification-box");
  notification.classList.add("notification");

  const icon = document.createElement("i");
  icon.classList.add("uil", "uil-bell", "notification-icon");
  notification.appendChild(icon);

  const notfiyDiv = document.createElement("div");
  const title = document.createElement("h3");
  title.innerText = message.title;
  const body = document.createElement("p");
  body.innerText = message.body;
  notfiyDiv.appendChild(title);
  notfiyDiv.appendChild(body);
  notification.appendChild(notfiyDiv);

  // add the new notification to the container
  container?.appendChild(notification);

  // remove the oldest notification if there are more than 5
  if ((container?.children.length as number) > 5) {
    container?.removeChild(container.children[0]);
  }

  // show the new notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // hide the notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hide");
    setTimeout(() => {
      try {
        container?.removeChild(notification);
      } catch {
        // do nothing
      }
    }, 300);
  }, 5000);
}

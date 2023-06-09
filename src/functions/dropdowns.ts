import { mutationObserver } from "../handlers/mutationObserver";

export const quickLinksDropdown = () => {
  const quickDropdown: HTMLElement | null =
    document.getElementById("quickDropdown");

  // Handle Quick Links Dropdown Behavior
  document.addEventListener("click", (e) => {
    if (quickDropdown && quickDropdown.style.display === "block") {
      if (
        e.target !== quickDropdown &&
        e.target !== document.getElementById("quickLinks")
      ) {
        quickDropdown.style.display = "none";
      }
    }
  });

  document.getElementById("quickLinks")?.addEventListener("click", () => {
    if (quickDropdown && quickDropdown.style.display === "none") {
      quickDropdown.style.display = "block";
    } else if (quickDropdown) {
      quickDropdown.style.display = "none";
    }
  });
};

export const profileDropdown = () => {
  mutationObserver("profileDropdown", () => {
    const profileDropdown: HTMLElement | null = document.getElementById("profileDropdown");

    document.addEventListener("click", (e) => {
      if (profileDropdown && profileDropdown.style.display === "block") {
        if (
          e.target !== profileDropdown &&
          e.target !== document.getElementById("profile")
        ) {
          profileDropdown.style.display = "none";
        }
      }
    });

    document.getElementById("profile")?.addEventListener("click", () => {
      if (profileDropdown && profileDropdown.style.display === "none") {
        profileDropdown.style.display = "block";
      } else if (profileDropdown) {
        profileDropdown.style.display = "none";
      }
    });
  });
};

export const notificationDropdown = () => {
  mutationObserver("notificationDropdown", () => {
    const notificationDropdown: HTMLElement | null = document.getElementById("notificationDropdown");

    document.addEventListener("click", (e) => {
      if (notificationDropdown && notificationDropdown.style.display === "flex") {
        if (
          e.target !== notificationDropdown &&
          e.target !== document.getElementById("notificationsButton")
        ) {
          notificationDropdown.style.display = "none";
        }
      }
    });

    document.getElementById("notificationsButton")?.addEventListener("click", () => {
      if (notificationDropdown && notificationDropdown.style.display === "none") {
        notificationDropdown.style.display = "flex";
      } else if (notificationDropdown) {
        notificationDropdown.style.display = "none";
      }
    });
  });
}

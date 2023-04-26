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
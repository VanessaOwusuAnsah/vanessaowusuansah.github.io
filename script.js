const validTabs = ["about", "research", "teaching", "quantbridge", "cv"];

function showTab(tabName, shouldScroll = true) {
  const selected = validTabs.includes(tabName) ? tabName : "about";

  document.querySelectorAll("[data-tab]").forEach((button) => {
    const isActive = button.dataset.tab === selected;
    button.classList.toggle("active", isActive);
    if (button.getAttribute("role") === "tab") {
      button.setAttribute("aria-selected", String(isActive));
    }
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== `${selected}-panel`;
  });

  const quantBridgeActive = selected === "quantbridge";
  document.querySelector(".site-layout").classList.toggle("quant-layout", quantBridgeActive);
  document.querySelector(".profile-card").hidden = quantBridgeActive;
  document.getElementById("footerText").textContent = quantBridgeActive
    ? "© 2026 Vanessa Owusu Ansah · Lancaster, UK · QuantBridge is a joint initiative with Kingsford Onyina and Danny Turkson · Last updated August 2026"
    : "© 2026 Vanessa Owusu Ansah · Lancaster, UK · Last updated August 2026";

  history.replaceState(null, "", `#${selected}`);
  if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => showTab(button.dataset.tab));
});

showTab(location.hash.slice(1), false);

const draftNotice = "Draft under preparation. The latest version will be uploaded soon.";
document.querySelectorAll("[data-research-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.target);
    const controls = button.closest(".publication-actions").querySelectorAll("[data-research-toggle]");
    const isAlreadyOpen = button.classList.contains("active");

    controls.forEach((control) => {
      control.classList.remove("active");
      control.setAttribute("aria-expanded", "false");
    });

    if (isAlreadyOpen) {
      panel.hidden = true;
      return;
    }

    const showAbstract = button.dataset.researchToggle === "abstract" && panel.dataset.abstract;
    panel.querySelector("p").textContent = showAbstract ? panel.dataset.abstract : draftNotice;
    panel.classList.toggle("draft-detail", !showAbstract);
    panel.hidden = false;
    button.classList.add("active");
    button.setAttribute("aria-expanded", "true");
  });
});

const themeToggle = document.getElementById("themeToggle");
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function updateThemeLabel() {
  const next = currentTheme() === "light" ? "night" : "day";
  themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
  themeToggle.setAttribute("title", `Switch to ${next} mode`);
}
themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("voa-theme", next); } catch (error) { /* The theme still works without storage. */ }
  updateThemeLabel();
});
updateThemeLabel();

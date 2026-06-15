(function () {
  const STORAGE_KEY = "rtlChatInputEnabled";
  const STYLE_ID = "rtl-chat-input-style";
  const MARK = "data-rtl-chat-input";

  const selectors = [
    "textarea",
    "input[type='text']",
    "input[type='search']",
    "[contenteditable='true']",
    "[role='textbox']",
    ".ProseMirror"
  ].join(",");

  let enabled = true;
  let observer = null;

  function api() {
    return typeof browser !== "undefined" ? browser : chrome;
  }

  async function getEnabled() {
    try {
      const result = await api().storage.local.get(STORAGE_KEY);
      return result[STORAGE_KEY] !== false;
    } catch (_) {
      return true;
    }
  }

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [${MARK}="true"] {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: plaintext !important;
        writing-mode: horizontal-tb !important;
      }

      [${MARK}="true"]::placeholder {
        direction: rtl !important;
        text-align: right !important;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function isEditableInput(element) {
    if (!element || element.disabled || element.readOnly) return false;

    const tag = element.tagName ? element.tagName.toLowerCase() : "";
    if (tag === "textarea") return true;

    if (tag === "input") {
      const type = (element.getAttribute("type") || "text").toLowerCase();
      return ["text", "search", "email", "url", "tel"].includes(type);
    }

    return element.isContentEditable || element.getAttribute("role") === "textbox";
  }

  function applyTo(element) {
    if (!isEditableInput(element)) return;

    element.setAttribute(MARK, "true");
    element.setAttribute("dir", "rtl");
    element.style.direction = "rtl";
    element.style.textAlign = "right";
    element.style.unicodeBidi = "plaintext";
  }

  function removeFrom(element) {
    if (!element || element.getAttribute(MARK) !== "true") return;

    element.removeAttribute(MARK);
    if (element.getAttribute("dir") === "rtl") element.removeAttribute("dir");
    element.style.removeProperty("direction");
    element.style.removeProperty("text-align");
    element.style.removeProperty("unicode-bidi");
  }

  function scan(root = document) {
    if (!enabled) return;

    installStyle();
    if (root.matches && root.matches(selectors)) applyTo(root);
    root.querySelectorAll?.(selectors).forEach(applyTo);
  }

  function clearAll() {
    document.querySelectorAll(`[${MARK}="true"]`).forEach(removeFrom);
  }

  function startObserver() {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        });
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function stopObserver() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  async function setEnabled(nextEnabled) {
    enabled = nextEnabled;

    if (enabled) {
      scan();
      startObserver();
    } else {
      stopObserver();
      clearAll();
    }
  }

  getEnabled().then(setEnabled);

  api().storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes[STORAGE_KEY]) return;
    setEnabled(changes[STORAGE_KEY].newValue !== false);
  });
})();

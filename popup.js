const STORAGE_KEY = "rtlChatInputEnabled";
const checkbox = document.getElementById("enabled");
const api = typeof browser !== "undefined" ? browser : chrome;

api.storage.local.get(STORAGE_KEY).then((result) => {
  checkbox.checked = result[STORAGE_KEY] !== false;
});

checkbox.addEventListener("change", () => {
  api.storage.local.set({
    [STORAGE_KEY]: checkbox.checked
  });
});

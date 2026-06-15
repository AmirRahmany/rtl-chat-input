# RTL Chat Input for Firefox

A small Firefox extension that makes chat input boxes right-to-left and easier to use when typing mixed Persian and English text.

## What it does

- Right-aligns common chat input fields.
- Sets text direction to RTL.
- Improves mixed Persian/English typing with `unicode-bidi: plaintext`.
- Works on textareas, text inputs, `contenteditable` editors, and textbox-like fields.
- Includes a simple on/off popup.

## Why

Many chat websites are designed around left-to-right typing. When Persian and English words are written together, the cursor position, punctuation, and word order can become confusing.

This extension applies better RTL defaults to editable chat fields so Persian text feels natural while English words inside the sentence stay readable.

## Installation

### Temporary install for testing

1. Open Firefox.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click `Load Temporary Add-on`.
4. Select the `manifest.json` file from this project folder.

Firefox will keep the extension installed until the browser is restarted.

### Install from a ZIP

1. Download or clone this repository.
2. Extract the ZIP file if needed.
3. Load `manifest.json` from the extracted folder using Firefox's temporary add-on page.

## Usage

After installing, open any chat page and click inside the message input. The input should become right-aligned automatically.

Click the extension icon to turn the behavior on or off.

## Files

- `manifest.json`: Firefox extension metadata and permissions.
- `content.js`: Applies RTL styling to editable fields on web pages.
- `popup.html`: Extension popup UI.
- `popup.css`: Popup styling.
- `popup.js`: Saves and restores the on/off setting.

## Built with

- JavaScript
- HTML
- CSS
- Firefox WebExtensions API

## Notes

This extension uses Manifest V2 for better Firefox compatibility.

It does not read, collect, or send your typed text anywhere. It only changes the styling and direction behavior of editable input fields in the browser.

## License

MIT

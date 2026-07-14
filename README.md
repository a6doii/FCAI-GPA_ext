# FCAI GPA Calculator 🎓

A lightweight **Chrome extension** that calculates your **GPA**, **total credit hours**, and
**number of courses** directly from the FCAI (Faculty of Computers and Artificial Intelligence)
student portal — no manual data entry, no spreadsheets. Just open your grades page and click.

**Version:** 1.0 · **Manifest:** V3

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Permissions](#permissions)
- [Known Issues](#known-issues)
- [Author](#author)

---

## Features

- 📊 Calculates your **GPA** from the grades shown on the FCAI website.
- ⏱️ Reports your **total credit hours**.
- 📚 Counts the **number of courses**.
- 🖱️ Simple popup with **Calculate** and **Refresh** buttons.
- ⚡ Runs entirely in your browser — your data never leaves your machine.

## How It Works

The extension uses a **content script** that reads the grades table on the active FCAI page,
extracts each course's grade and credit hours, and computes a weighted GPA along with the
totals. The popup (`popup.html` + `popup.js`) triggers the calculation and displays the result;
the **Refresh** button re-reads the page in case your grades view has changed.

Because it works on whatever page is currently open (`activeTab`), you run it while viewing your
own grades — nothing is collected or sent anywhere.

## Installation

Since the extension isn't on the Chrome Web Store, load it in developer mode:

1. Download or clone this repository:
   ```bash
   git clone https://github.com/a6doii/FCAI-GPA_ext.git
   ```
2. Open Chrome and go to **`chrome://extensions`**.
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.
5. The **FCAI GPA Calculator** icon will appear in your toolbar.

> Works in any Chromium-based browser that supports Manifest V3 (Chrome, Edge, Brave, etc.).

## Usage

1. Log in to the FCAI student portal and open your **grades page**.
2. Click the **FCAI GPA Calculator** icon in the toolbar.
3. Press **Calculate GPA**.
4. Your GPA, total credit hours, and number of courses appear in the popup.
5. Use **Refresh** if you navigate to a different grades view and want to recalculate.

## Project Structure

```
FCAI-GPA_ext/
├── manifest.json     # Extension configuration (Manifest V3)
├── popup.html        # Popup UI
├── popup.js          # Popup logic + result display
├── content.js        # Reads grades from the page and computes GPA
├── icon16.png        # Toolbar / store icons
├── icon48.png
└── icon128.png
```

## Permissions

- **`activeTab`** — access the currently open tab (your grades page) when you click the button.
- **`scripting`** — inject the calculation script into that page.

The extension requests no broad host permissions and stores no personal data.

## Known Issues

- The icon paths in `manifest.json` point to an `icons/` folder (e.g. `icons/icon16.png`),
  but the icon files currently live in the project root. Either move the PNGs into an `icons/`
  folder or update the paths in `manifest.json` to `icon16.png`, `icon48.png`, and
  `icon128.png` so the icons load correctly.

## Author

Made by **AlHussain Abdo** — 2025.
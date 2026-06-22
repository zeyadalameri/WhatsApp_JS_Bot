# WhatsApp JavaScript Bot

A local WhatsApp Web automation bot built with Node.js and `whatsapp-web.js`. The bot connects to WhatsApp Web, listens for incoming messages from private chats and groups, extracts useful message metadata, and stores structured logs in JSON format.

## Features

- Connects to WhatsApp Web through QR authentication
- Saves the local session for reuse
- Listens for incoming private and group messages
- Extracts message text, sender ID, chat information, and timestamp
- Attempts to identify phone numbers from WhatsApp JIDs when available
- Stores received messages in a JSON file
- Useful as a prototype for automation, monitoring, and message-processing workflows

## Tech Stack

- **Runtime:** Node.js
- **Automation:** whatsapp-web.js
- **Browser engine:** Puppeteer/Chromium workflow through whatsapp-web.js
- **Data storage:** JSON

## Project Structure

```text
.
├── bot.js              # Main bot logic
├── package.json        # Node.js dependencies and scripts
├── messages_js.json    # Stored message logs
└── .gitignore
```

## My Role

- Built the Node.js automation workflow
- Implemented WhatsApp Web session handling
- Parsed incoming message metadata
- Stored structured logs in JSON format

## Getting Started

```bash
npm install
node bot.js
```

After starting the bot, scan the QR code with WhatsApp to create a session.

## Academic / Technical Relevance

This project demonstrates:

- Event-driven programming
- Local automation workflows
- JSON data handling
- Web-based messaging automation
- Practical backend scripting with Node.js

## What I Learned

- Working with event-driven JavaScript applications
- Using third-party libraries for web automation
- Structuring message data for later processing
- Handling local sessions in automation projects

## Important Note

This project is intended for learning and controlled automation experiments. It should be used responsibly and in compliance with WhatsApp's terms and applicable privacy rules.

## Author

**Zeyad Alameri**  
Information Technology Graduate | Full-Stack Developer  
GitHub: [@zeyadalameri](https://github.com/zeyadalameri)

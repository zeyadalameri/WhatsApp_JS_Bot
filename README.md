# WhatsApp Web Monitor - Node.js Prototype

A learning prototype built with `whatsapp-web.js` that connects to WhatsApp Web, observes incoming messages, and saves structured records locally.

## What It Does

- Displays a QR code for first-time authentication
- Reuses a local `LocalAuth` session
- Listens for incoming message events
- Records message text and available sender metadata in JSON
- Runs a lightweight syntax check through the package test script

## Tech Stack

- Node.js
- whatsapp-web.js
- Puppeteer
- qrcode-terminal
- JSON

## Getting Started

```bash
npm install
npm start
```

Run `npm test` for the included JavaScript syntax check. Authentication state and captured messages are local-only and excluded by `.gitignore`.

## My Role

I implemented the WhatsApp client lifecycle, QR authentication, message-event handling, metadata extraction, and local persistence as an automation exercise.

## Project Status and Limitations

This is a learning/automation prototype, not a production messaging system. It does not send automated replies or use the official WhatsApp Business Platform. Browser automation and private client libraries may break when WhatsApp Web changes, and message data requires careful consent and privacy handling.

## License

No open-source license has been declared.

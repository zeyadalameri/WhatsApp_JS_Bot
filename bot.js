
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1) تفعيل تخزين الجلسة + تثبيت نسخة ويب ثابتة لتفادي الأخطاء
const client = new Client({
  authStrategy: new LocalAuth(),                           // يحفظ الجلسة في .wwebjs_auth [web:165]
  webVersionCache: {                                       // يربط نسخة ويب معروفة
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
  },                                                       // مثال موثّق لحل مشاكل النسخ [web:145][web:161]
  puppeteer: { headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

// 2) QR أول مرة فقط
client.on('qr', qr => {
  console.log('Scan this QR:');
  qrcode.generate(qr, { small: true });
});

// 3) جاهزية
client.on('ready', () => console.log('✅ WhatsApp bot is ready!'));

client.on('message', async (msg) => {
  try {
    const chat = await msg.getChat();
    const senderJid = msg.author || msg.from;           // JID المرسل
    let senderPhone = null;

    // خريطة بسيطة لعدم تكرار محاولة الحل
    globalThis._lidTried = globalThis._lidTried || new Set();

    if (/@c\.us$/.test(senderJid)) {
      senderPhone = senderJid.replace('@c.us', '');
    } else if (/@lid$/.test(senderJid) && !globalThis._lidTried.has(senderJid)) {
      // محاولة حل الرقم بفتح لوحة معلومات الجهة
      globalThis._lidTried.add(senderJid);
      try {
        // افتح الدردشة الحالية (مفتوحة أصلاً) ثم افتح معلومات جهة الاتصال
        await chat.sendSeen();
        // زر معلومات جهة الاتصال في أعلى الهيدر
        const [page] = await client.pupBrowser.pages();
        await page.waitForSelector('header', { timeout: 5000 });
        // اضغط على عنوان الدردشة لفتح اللوحة
        await page.click('header');
        // انتظر اللوحة الجانبية ووجود أي رقم هاتف نمطي
        await page.waitForSelector("[data-animate-modal-body] *, [role='dialog'] *, [data-testid*='contact-info']", { timeout: 6000 }).catch(()=>{});
        // ابحث عن نص يشبه رقم هاتف دولي
        const maybeNumber = await page.evaluate(() => {
          const text = document.body.innerText || '';
          const m = text.match(/\+?\d{6,15}/);
          return m ? m[0] : null;
        });
        if (maybeNumber) senderPhone = maybeNumber.replace(/\D/g, '');
        // أغلق اللوحة بالهروب
        await page.keyboard.press('Escape').catch(()=>{});
      } catch (e) {
        // إذا لم ننجح نترك senderPhone=null
      }
    }

    const data = {
      sender_jid: senderJid,
      sender_phone: senderPhone,
      chat_name: chat.name || (chat.isGroup ? 'مجموعة' : 'خاص'),
      is_group: !!chat.isGroup,
      body: msg.body,
      timestamp: new Date().toISOString()
    };

    const file = 'messages_js.json';
    const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    list.push(data);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
    console.log('📩 Saved:', data);

  } catch (e) {
    console.error('Error handling message:', e);
  }
});
client.initialize();
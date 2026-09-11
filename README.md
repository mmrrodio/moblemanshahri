# مبلمان شهری جعفری

سایت رسمی **مبلمان شهری جعفری**

## ساختار پوشه‌ها و فایل‌ها

```
moblemanshahri/
├── index.html          ← صفحه اصلی
├── about.html          ← درباره ما
├── contact.html        ← تماس با ما
├── rest.html           ← استراحت و توقف
├── traffic.html        ← ترافیک و حمل‌ونقل
├── info.html           ← اطلاعات و ارتباطات
├── lighting.html       ← روشنایی
├── services.html       ← خدمات و پاکیزگی
├── security.html       ← امنیتی و حفاظتی
├── artistic.html       ← زیباسازی و هنری
├── custom.html         ← طراحی سفارشی
├── css/
│   └── style.css
├── js/
│   └── main.js
├── audio/
│   └── web.mp3         ← فایل موزیک پس‌زمینه (حتماً اضافه کنید)
└── images/
    ├── welcome/        ← خوش آمدید.jpg
    ├── main/           ← main.jpg
    ├── rest/           ← 01.jpg تا 20.jpg
    ├── traffic/
    ├── info/
    ├── lighting/
    ├── services/
    ├── security/
    ├── artistic/
    ├── custom/
    ├── about/
    └── contact/
```

## راهنمای قرار دادن عکس‌ها

| صفحه              | پوشه عکس          | نام فایل‌های پیشنهادی      |
|-------------------|-------------------|----------------------------|
| صفحه اصلی         | images/welcome/   | خوش آمدید.jpg              |
| صفحه اصلی         | images/main/      | main.jpg                   |
| استراحت و توقف    | images/rest/      | 01.jpg ... 20.jpg          |
| ترافیک و حمل‌ونقل | images/traffic/   | 01.jpg ... 20.jpg          |
| اطلاعات و ارتباطات| images/info/      | 01.jpg ... 20.jpg          |
| روشنایی           | images/lighting/  | 01.jpg ... 20.jpg          |
| خدمات و پاکیزگی   | images/services/  | 01.jpg ... 20.jpg          |
| امنیتی و حفاظتی   | images/security/  | 01.jpg ... 20.jpg          |
| زیباسازی و هنری   | images/artistic/  | 01.jpg ... 20.jpg          |
| طراحی سفارشی      | images/custom/    | 01.jpg ... 20.jpg          |
| درباره ما         | images/about/     | هر نامی                    |
| تماس با ما        | images/contact/   | هر نامی                    |

پس از قرار دادن عکس‌ها، در فایل HTML مربوطه خط‌های `img-placeholder` را با تگ `<img src="images/.../01.jpg" alt="...">` جایگزین کنید.

## موزیک

فایل `web.mp3` را داخل پوشه `audio/` قرار دهید.  
موزیک فقط با **اولین کلیک کاربر** شروع می‌شود و با جابه‌جایی بین صفحات قطع نمی‌شود (با sessionStorage مدیریت شده).

## دیپلوی روی GitHub Pages

1. محتویات این پوشه را در ریپازیتوری `https://github.com/mmrrodio/moblemanshahri` آپلود کنید.
2. در Settings → Pages، منبع را روی شاخه `main` و مسیر `/ (root)` قرار دهید.
3. سایت در آدرس `https://mmrrodio.github.io/moblemanshahri/` در دسترس خواهد بود.

## اطلاعات تماس موجود در سایت

- تلفن: ۰۹۱۲۱۰۱۳۳۸۴
- ایمیل: moblemanshahrijafari@proton.me
- فیسبوک: https://www.facebook.com/Moblaman.Shahri.Jafari/
- ایکس: https://x.com/mmrrodio

---
طراحی و پیاده‌سازی برای مبلمان شهری جعفری

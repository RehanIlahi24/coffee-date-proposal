# ☕❤️ Coffee Date Proposal Experience

A cute, viral-style, multi-step web experience that asks someone on a coffee
date — then emails you their answers. **100% frontend. No backend.** Built with
React + Vite, Tailwind CSS, Framer Motion, canvas-confetti, and EmailJS.

![hearts](public/heart.svg)

## ✨ Features

- 6-step romantic flow with smooth slide/fade transitions
- A playful **"No" button** that dodges the cursor and begs you to reconsider 😭
- Glassmorphism card, animated pastel gradient, floating hearts background
- Selectable emoji chips **and** free-text input for each question
- 🎉 Confetti + answer recap on the final screen
- Answers emailed to you in one message via **EmailJS** (no server needed)
- Mobile-first, accessible (respects `prefers-reduced-motion`)

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. The app runs in **demo mode** until you add your
EmailJS keys (answers are logged to the console instead of emailed).

## 📩 Connecting EmailJS (to actually receive answers)

1. Create a free account at <https://www.emailjs.com/>.
2. **Email Services** → add a service (Gmail, Outlook, …) → copy the **Service ID**.
3. **Email Templates** → create a template. Put these variables in the body:

   ```
   New coffee date response! 💖

   ☕ Coffee date: {{date_answer}}
   😏 Real date:   {{confirm_answer}}
   📍 Café:        {{place}}
   📅 When:        {{when}}
   🍰 Dessert:     {{dessert}}

   🕒 {{timestamp}}
   ```

   (Or just drop `{{message}}` in — it contains the whole formatted block.)
   Set the template's **To** field to your own email. Copy the **Template ID**.
4. **Account → General** → copy your **Public Key**.
5. Create a `.env` file (copy `.env.example`) and fill in:

   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```

   Restart `npm run dev`. You can also hardcode the values in
   [`src/emailConfig.js`](src/emailConfig.js).

## ☁️ Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import it on <https://vercel.com> — it auto-detects **Vite** (build:
   `vite build`, output: `dist`).
3. In **Project → Settings → Environment Variables**, add the same three
   `VITE_EMAILJS_*` variables.
4. Deploy. Done — share the link 💌

No backend, no database, no API routes.

## 🗂️ Project structure

```
src/
  App.jsx                 # flow + state machine + EmailJS submit
  emailConfig.js          # EmailJS keys (env-based)
  index.css               # Tailwind + glass/gradient styles
  components/
    FloatingHearts.jsx    # background drifting emoji
    RunawayButton.jsx     # the dodging "No" button
    ChipSelect.jsx        # emoji chips + custom text input
    WhenPicker.jsx        # date & time picker
    ProgressHearts.jsx    # heart progress indicator
    Celebration.jsx       # final confetti + recap screen
```

## 🧠 State

A single object drives everything:

```js
form = { date: '', confirm: '', place: '', when: '', dessert: '' }
```

Made with ❤️ & ☕

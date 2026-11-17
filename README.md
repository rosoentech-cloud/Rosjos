# Rosjos Tutoring Website

Live address: https://rosjos.rosoen.com

## What's in this folder

- `index.html`: home page
- `services/index.html`: services overview
- `services/high-school/`, `services/college/`, `services/test-prep/`, `services/writing-feedback/`: service pages
- `404.html`: shown when a page can't be found
- `sitemap.xml` and `robots.txt`: help search engines find and index the pages
- `CNAME`: tells GitHub Pages to serve the site at rosjos.rosoen.com
- `assets/styles.css`: the design
- `assets/site.js`: your contact details (the SITE block at the top) and page behavior
- `assets/favicon.svg`, `assets/logo.png`, `assets/og-image.png`: brand images

## Upload to your repository

1. Open your repository on GitHub.
2. Click **Add file**, then **Upload files**.
3. Extract the zip file, then drag the contents of the folder into the upload area. Upload the contents, not the folder itself, so `index.html` and `CNAME` sit at the top level of the repository.
4. Replace existing files if GitHub asks, then click **Commit changes**.
5. Wait about a minute, then open **Settings**, then **Pages** to confirm the custom domain and HTTPS status.

## Update contact details

Open `assets/site.js` and edit the SITE block at the top:

- `whatsappNumber`: your WhatsApp number with the country code and no + sign or spaces
- `email`: leave empty to hide the email buttons until you have an address
- `phone`: your phone number as you want it displayed

If you change the phone number, also update the `"telephone"` value in the structured data of the HTML files.

## Set up search engines

1. In Google Search Console (search.google.com/search-console), add the property `https://rosjos.rosoen.com` and verify it.
2. Submit the sitemap: `https://rosjos.rosoen.com/sitemap.xml`.
3. Check the structured data with Google's Rich Results Test (search.google.com/test/rich-results).
4. Check speed with PageSpeed Insights (pagespeed.web.dev).
5. Share a link on WhatsApp to confirm the preview image and title appear.

## Adding or changing a service page

Copy an existing folder in `services/`, then update the title, meta description, canonical link, Open Graph tags, headings, and FAQs. Add the new page to `sitemap.xml`, to the Services links in the header and footer of every page, and to the service cards on `index.html` and `services/index.html`.

## Chat widget

The chat box appears in the bottom-right corner of every page and always shows "Online now" by default. It answers common questions instantly from a list of set answers, then offers "Continue on WhatsApp" or an email link with the visitor's question filled in.

- **Keep the status accurate.** In `assets/chat.js`, the `CHAT` setting `showOnlineStatus` controls the status. Leave it on only while someone can reply on WhatsApp, or set it to `false` to show "Away, we'll reply soon".
- **Edit the answers.** The `ENTRIES` list in `assets/chat.js` holds the keywords and replies. Keep the answers consistent with your services and prices.
- **Contact details** come from the SITE block in `assets/site.js`, so the WhatsApp and email handoffs always match your contact settings.

The chat answers from fixed text. It doesn't use AI, so it won't answer anything outside the list. Visitors can always reach you through WhatsApp or email.

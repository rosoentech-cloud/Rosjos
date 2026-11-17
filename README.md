# Rosjos Tutoring Website

A multi-page, SEO-ready tutoring website that you can host for free on GitHub Pages.

## What's included

- `index.html`: home page
- `services/index.html`: services overview
- `services/high-school/`, `services/college/`, `services/test-prep/`, `services/writing-feedback/`: one page per service
- `404.html`: shown when a page can't be found
- `sitemap.xml` and `robots.txt`: help search engines find and index your pages
- `assets/styles.css`: the design
- `assets/site.js`: your contact details (the SITE block at the top) and page behavior
- `assets/favicon.svg`, `assets/logo.png`, `assets/og-image.png`: brand images for browser tabs, search results, and link previews

Every page includes a unique title and meta description, a canonical link, Open Graph and Twitter preview tags, JSON-LD structured data (organization, service, breadcrumb, and FAQ markup), breadcrumb navigation, and one main heading per page.

## Before you publish

1. **Set your real domain.** Every page, `sitemap.xml`, and `robots.txt` currently use `https://www.example.com` as a placeholder. Use find and replace across the whole folder to change it to your address, such as `https://yourname.github.io/tutoring-site` or `https://www.yourdomain.com`. Use the exact final address with no trailing slash. Search engines rely on these addresses, so this step matters for SEO.
2. **Update your contact details** in the SITE block at the top of `assets/site.js`. Leave `email` empty to hide the email buttons until you have an address.
3. **Update the phone number in the structured data** if you change it. Search for the old number, which appears as `"telephone"` in the JSON-LD blocks of the HTML files, and replace it.
4. **Review the page text** and replace anything that doesn't describe your business exactly.
5. **Optional:** once you have social profiles, add their links to a `sameAs` list in the organization data on `index.html`.

## Publish on GitHub Pages

1. Create a new repository on github.com and set it to Public.
2. Upload every file and folder, including `services/` and `assets/`. You can drag the whole folder into GitHub's upload page, or use Git from inside the `tutoring-site` folder:

   ```bash
   git init
   git add .
   git commit -m "Initial tutoring website"
   git branch -M main
   git remote add origin https://github.com/your-username/tutoring-site.git
   git push -u origin main
   ```

3. Go to **Settings**, then **Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, and click **Save**.
4. When the site is live, turn on **Enforce HTTPS** on the same page.

## Set up search engines

1. Open Google Search Console (search.google.com/search-console), add your site, and verify ownership.
2. Submit your sitemap: `https://your-domain/sitemap.xml`.
3. Check the structured data with Google's Rich Results Test (search.google.com/test/rich-results).
4. Check speed and mobile usability with PageSpeed Insights (pagespeed.web.dev).
5. Share a link in WhatsApp or on social media to confirm the preview image and title appear correctly.

## Adding or changing a service page

Copy an existing folder in `services/`, then update the title, meta description, canonical link, Open Graph tags, headings, and FAQs. Then add the new page to `sitemap.xml`, to the Services links in the header and footer of every page, and to the service cards on `index.html` and `services/index.html`.

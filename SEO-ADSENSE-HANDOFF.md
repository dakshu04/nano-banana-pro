# SnapMod SEO and AdSense handoff

Updated: October 23, 2026

## What the Search Console export showed

- 245 clicks and 4,549 impressions in the exported three-month period (5.39% CTR).
- 225 of 245 clicks came from mobile. Desktop CTR was only 1.43% at an average position of 8.81.
- Google reported only the homepage and sign-in page. The sign-in page should not be a search landing page.
- Most impressions were brand-name or typo variants such as “snapmody” and “snapmods,” not creator-tool queries.

## Changes in this source

- Correct domain and public URLs in the generated sitemap.
- Public crawling rules plus blocks for API, dashboard, sign-in, and sign-up routes.
- Canonical metadata, improved page descriptions, social metadata, Google verification, AdSense publisher metadata, SoftwareApplication schema, and FAQ schema.
- Noindex metadata for all dashboard pages and authentication pages.
- Lowercase root `ads.txt` with publisher ID `pub-6044278578685946`.
- AdSense loader restricted to public content pages; private product screens are ad-free.
- Added About, Contact, Privacy, Terms, Acceptable Use, and three original tool guides.
- Added responsible-use, consent, rights, limitations, and human-review guidance.
- Fixed build-time initialization of payment and storage clients so missing runtime secrets do not break compilation.

## Before deployment

1. Confirm `support@snapmod.xyz` exists and can receive mail. If not, create it or replace it everywhere before publishing.
2. Review the Privacy Policy and Terms for your exact business entity, location, retention practices, refund rules, and legal requirements. They are a strong operational draft, not legal advice.
3. Keep the production Clerk, database, Supabase, Dodo Payments, and Google AI environment variables configured in the hosting dashboard.
4. Deploy this source to the production project that serves `https://snapmod.xyz`.

## Verify immediately after deployment

Open each URL in a private browser window and confirm it returns HTTP 200:

- `https://snapmod.xyz/`
- `https://snapmod.xyz/about`
- `https://snapmod.xyz/contact`
- `https://snapmod.xyz/privacy`
- `https://snapmod.xyz/terms`
- `https://snapmod.xyz/acceptable-use`
- `https://snapmod.xyz/tools/ai-face-swap`
- `https://snapmod.xyz/tools/background-remover`
- `https://snapmod.xyz/tools/ai-script-writer`
- `https://snapmod.xyz/robots.txt`
- `https://snapmod.xyz/sitemap.xml`
- `https://snapmod.xyz/ads.txt`

The last URL must display exactly:

`google.com, pub-6044278578685946, DIRECT, f08c47fec0942fa0`

## Google Search Console steps

1. Open the `https://snapmod.xyz/` property.
2. Go to **Sitemaps**.
3. Remove any submitted sitemap that uses `snapmod.xyz.com` or lists nonexistent pages.
4. Under **Add a new sitemap**, enter `sitemap.xml`, then click **Submit**.
5. Use **URL inspection** for the homepage and each of the three `/tools/` URLs.
6. For each URL, click **Test live URL**. If the test succeeds, click **Request indexing**. Do not repeatedly request indexing.
7. Inspect `/sign-in` once. After Google recrawls it, an exclusion such as “Excluded by noindex” is correct.
8. Open **Indexing → Pages** after 7–14 days. Confirm the nine sitemap URLs are discovered and investigate only genuine errors; excluded account/API routes are intentional.
9. Open **Experience → Core Web Vitals** and fix any production URLs marked Poor. Pay particular attention to mobile because it supplies most current traffic.
10. In **Performance → Search results**, compare the latest 28 days with the previous 28 days. Track clicks and impressions for “AI face swap,” “background remover,” “AI script writer,” and related long-tail queries—not only the SnapMod brand.

## Google AdSense steps

1. In AdSense, open **Sites → snapmod.xyz** and confirm the site is spelled exactly as the canonical domain.
2. Choose **Check for updates** for `ads.txt` after deployment. Google says verification can take several days and low-request sites can take up to a month.
3. Confirm site ownership using the AdSense code or meta-tag method. Both publisher metadata and the public-page AdSense loader are now present in the source.
4. Open **Privacy & messaging → European regulations → Create message**.
5. Select `snapmod.xyz`, add `https://snapmod.xyz/privacy`, enable a clear “Do not consent” choice, review the English variants, and publish the message. Google requires a certified CMP for personalized ads in the EEA, UK, and Switzerland.
6. In Auto Ads page exclusions, exclude `/dashboard/*`, `/sign-in/*`, `/sign-up/*`, and API routes as a second protection. The code already avoids loading AdSense on those pages.
7. Check **Policy center** for the exact issue description. The screenshot by itself is only a generic “meet programme policies” prompt.
8. Do not remove and re-add the site; Google says doing so can delay review.
9. Wait until the deployment is live, the sitemap is processed, policy/contact links work, and several public pages are indexed. Then tick the policy confirmation and click **Resubmit** once.

AdSense approval is controlled by Google and cannot be guaranteed. Continue publishing genuinely original, first-hand creator guidance and case studies; do not mass-produce thin AI articles just to increase page count.

Official references:

- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/12171612
- https://support.google.com/adsense/answer/10960768
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

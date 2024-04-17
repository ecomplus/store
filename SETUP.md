# Store

[Cloud Commerce](https://github.com/ecomplus/cloud-commerce): the new Store template

[:brazil: Tradução em português](./SETUP.pt-BR.md)

## Getting started

1. Start creating new project on [Firebase console](https://console.firebase.google.com/):
    - Set a nice project name (ID) and remember it;
    - Disable (recommended) Google Analytics for Firebase, will not be used by default;

2. Go to _Creation > Firestore Database_ page (on sidebar) and _Create database_:
    - Just bypass with default production mode and rules;
    - Select region `us-east4` (recommended, or multi-region `nam5 (us-central)`);

3. Go to _Creation > Storage_ page and click _Let's start_:
    - Just bypass with default production mode and same (pre-selected) region;

4. Go to _Creation > Authentication_ and click _Get started_:
    - Click _Native providers > Email/password_ and enable _Email link (login without password)_;
    - Go to Authentication configurations and add your store domain(s) to authorized list;
    - Optionally, add other provides by _Smartphone_ (SMS, generates additional costs) and/or social media;

5. Go to :gear: _> Project configurations_ e edit:
    - _Default location for GCP resources_: Same Firestore region (`us-east4`);
    - _Public settings > Publicly displayed name_: Your store name;
    - _Public settings > Support email_ (optional);
    - Under _Your apps_ create a new Web app:
        + Re-enter the store name and enable Firebase Hosting for the new app;
        + Copy only the value of the `firebaseConfig` object and replace at `functions/ssr/src/scripts/InlineScripts.astro`;
        + Just click to continue in the next steps until confirmation and return to the console;

6. Firebase free plan doesn't support sending external HTTP requests, so you'll need to upgrade to _Blaze_ (on demand) plan;

7. [Use this template](https://github.com/ecomplus/store/generate) to generate a new repository for your store;

Proceed with:
- [Better way using command line](#first-deploy-on-cli)
- [Only in browser](#browser-only-setup) (may be easier but less safe, not recommended)

#### First deploy on CLI

8. Setup and first deploy from your terminal with [Firebase CLI](https://firebase.google.com/docs/cli):
```bash
# Install `firebase-tools` and login
npm install -g firebase-tools && firebase login
```
```bash
# Clone your new store repository
git clone git@github.com:{gh-user}/{new-store}.git
cd {new-store}
npm i
```

<details open>
<summary>With <a href="https://cloud.google.com/sdk/docs/install">gcloud CLI</a> (optional) installed</summary>

```bash
# Run project configuration and deploy on GitHub Actions
FIREBASE_PROJECT_ID={project-id} npm run setup
```

> [!NOTE]
> Account key created automatically with only required permissions using gcloud CLI (skip steps 6 and 7).

</details>

<details>
<summary>Without gcloud CLI</summary>

```bash
# Run project configuration and first deploy
FIREBASE_PROJECT_ID={project-id} npm run setup -- --no-gcloud
npm run deploy
```

8. [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) for your Firebase project directly on Google Cloud Platform:
    - Name it _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Describe it _A service account with permission to deploy Cloud Commerce from the GitHub repository to Firebase_;
    - Continue and select the following roles to the service account:
        1. _Firebase Admin_
        2. _API Keys Viewer_
        3. _Cloud Run Viewer_
        4. _Cloud Functions Admin_
        5. _Artifact Registry Admin_
        6. _App Engine Creator_
        7. _App Engine Admin_
        8. _Cloud Scheduler Admin_
        8. _Service Account User_

9. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

</details>

10. Set the following secrets to your GitHub repository (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Paste the generated Google Cloud key JSON
    - `ECOM_AUTHENTICATION_ID`: Get from CLI setup output
    - `ECOM_API_KEY`: Get from CLI setup output

:checkered_flag: :checkered_flag: :checkered_flag: **All done, congrats!**

---

#### Browser-only setup

> [!WARNING]
> This configuration option is less secure, we recommend [first deploy on CLI](#first-deploy-on-cli) instead.

8. [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) for your Firebase project directly on Google Cloud Platform:
    - Name it _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Describe it _A service account with ALL permissions to deploy Cloud Commerce from the GitHub to Firebase_;
    - Continue and select the role _Quick access > Basic > Proprietary_;

9. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

10. Set the following secrets to your GitHub repository (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Paste the generated Google Cloud key JSON
    - `ECOM_STORE_ID`: Copy your _Store ID_ on the [e-com.plus admin](https://ecomplus.app/)
    - `ECOM_AUTHENTICATION_ID`: Copy your _Authentication ID_ on the [e-com.plus admin](https://ecomplus.app/)
    - `ECOM_API_KEY`: Copy your _API Key_ on the [e-com.plus admin](https://ecomplus.app/)

## Production best practices

Firebase Hosting CDN is fast, but [doesn't support cache _Stale-While-Revalidate_](https://firebase.google.com/docs/hosting/manage-cache) ([context and feature request](https://firebase.uservoice.com/forums/948424-general/suggestions/47179505-hosting-cdn-cache-stale-while-revalidate)) and Hosting proxy + Cloud Functions (even without cold starts) will never take less than 1s (TTFB will probably take ~2s). We like "instant" responses but want to keep dynamic server rendered views (for less client-side JS), so stale caching is a must and so we need another CDN layer on production (when pointing the custom domain).

- **Recommended** way using [bunny.net](https://bunny.net/) CDN with Perma Cache and Edge Rules for ISR:
    + Get your API key from bunny.net dashboard account details;
    + Save it with a GitHub repository secret named `BUNNYNET_API_KEY`;
    + Edit _.github/build-and-deploy_ file (add 1) and commit with message **_[run:bunny-setup]_**.

- OR using [bunny.net](https://bunny.net/) CDN with Stale Cache for SWR:
    + Pull zone with your Firebase Hosting https://_project_.web.app domain as origin URL;
    + SSL + Force SSL enabled (prevents http://* redirects to origin domain);
    + **_Smart Cache_ disabled** (cache all MIME types respecting response headers);
    + Caching _Query String Sort_ enabled (awesome for image transformations);
    + Caching _Strip Response Cookies_ enabled;
    + **[Stale Cache](https://bunny.net/blog/introducing-stale-cache-more-efficient-cache-handling/) while origin offline and while updating enabled**;
    + Other origin and caching configurations may be disabled;
    + You might want to disable some zones in routing configuration depending on store target.

- OR using [Cloudflare](https://www.cloudflare.com/) Worker for ISR/SWR:
    + SSL full;
    + Page rule for \*/\* (any route) with _Cache Level: Cache Everything_;
    + [_Cache Reserve_](https://www.cloudflare.com/products/cache-reserve/) with Tiered Cache;
    + DNS **proxied** A entry pointing to your Firebase Hosting IP;
    + Worker _swr_ script with source (_quick edit_) copied from [`cloud-commerce/packages/ssr/cloudflare/swr-worker.js`](https://raw.githubusercontent.com/ecomplus/cloud-commerce/main/packages/ssr/cloudflare/swr-worker.js).

> [!NOTE]
> You may want to remove or edit the default LICENSE file before publishing your store content.

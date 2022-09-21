# Store

[Cloud Commerce](https://github.com/ecomplus/cloud-commerce): the new Store template

[:brazil: Tradução em português](./README.pt-BR.md)

## Getting started

1. Start creating new project on [Firebase console](https://console.firebase.google.com/), set a nice project name (ID) and remember it;

2. Go to _Creation > Firestore Database_ page (on sidebar) and _create database_:
    - Just bypass with default production mode and rules;
    - Select region `southamerica-east1` (recommended, or multi-region `nam5 (us-central)`);

3. Firebase free plan doesn't support sending external HTTP requests, so you'll need to upgrade to _Blaze_ (on demand) plan;

4. [Use this template](https://github.com/ecomplus/store/generate) to generate a new repository for your store;

Proceed with:
- [Better way using command line](#first-deploy-on-cli)
- [Only in browser](#browser-only-setup) (may be easier but less safe, not recommended)

#### First deploy on CLI

5. Setup and first deploy from your terminal with [Firebase CLI](https://firebase.google.com/docs/cli):
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

> **Note**  
> Account key created automatically with only required permissions using gcloud CLI (skip steps 6 and 7).

</details>

<details>
<summary>Without gcloud CLI</summary>

```bash
# Run project configuration and first deploy
FIREBASE_PROJECT_ID={project-id} npm run setup -- --no-gcloud
npm run deploy
```

6. [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) for your Firebase project directly on Google Cloud Platform:
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

7. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

</details>

8. Set the following secrets to your GitHub repository (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Paste the generated Google Cloud key JSON
    - `ECOM_AUTHENTICATION_ID`: Get from CLI setup output
    - `ECOM_API_KEY`: Get from CLI setup output

:checkered_flag: :checkered_flag: :checkered_flag: **All done, congrats!**

---

#### Browser-only setup

> **Warning**  
> This configuration option is less secure, we recommend [first deploy on CLI](#first-deploy-on-cli) instead.

5. [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) for your Firebase project directly on Google Cloud Platform:
    - Name it _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Describe it _A service account with ALL permissions to deploy Cloud Commerce from the GitHub to Firebase_;
    - Continue and select the role _Quick access > Basic > Proprietary_;

6. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

7. Set the following secrets to your GitHub repository (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Paste the generated Google Cloud key JSON
    - `ECOM_STORE_ID`: Copy your _Store ID_ on the [E-Com Plus admin](https://ecomplus.app/)
    - `ECOM_AUTHENTICATION_ID`: Copy your _Authentication ID_ on the [E-Com Plus admin](https://ecomplus.app/)
    - `ECOM_API_KEY`: Copy your _API Key_ on the [E-Com Plus admin](https://ecomplus.app/)

# Store

[Cloud Commerce](https://github.com/ecomplus/cloud-commerce): the new Store template

## Getting started

1. Start creating new project on [Firebase console](https://console.firebase.google.com/):
    - Set a nice project name (ID) and remember it;
    - You may enable Firebase Analytics for enhanced remote config options and A/B testing;

2. Go to _Firestore Database_ page (on sidebar) and _create database_:
    - Just bypass with default production mode and rules;
    - Select region `us-east1` (recommended);

3. Firebase free plan doesn't support sending external HTTP requests, so you'll need to upgrade to _Blaze_ (on demand) plan;

4. [Use this template](https://github.com/ecomplus/store/generate) to generate a new repository for your store;

5. [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts) for your Firebase project directly on Google Cloud Platform:
    - Name it _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Describe it _A service account with permission to deploy to Cloud Commerce from the GitHub repository to Firebase_;
    - Continue and select the following roles to the service account:
        1. Firebase Admin (_Administrador do Firebase_)
        2. API Keys Viewer (_Leitor de chaves de API_)
        3. Cloud Run Viewer (_Leitor do Cloud Run_)
        4. Cloud Functions Admin (_Administrador do Cloud Functions_)
        5. Artifact Registry Admin (_Administrador do Artifact Registry_)
        6. App Engine Creator (_Criador do App Engine_)
        7. App Engine Admin (_Administrador do App Engine_)

6. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

7. Add a _secret_ to your GitHub repository with name `FIREBASE_SERVICE_ACCOUNT` and paste the key JSON;

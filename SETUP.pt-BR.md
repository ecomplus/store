# Store

[Cloud Commerce](https://github.com/ecomplus/cloud-commerce): template para nova loja

[:us: English version](./SETUP.md)

## Começando

1. Comece criando um novo projeto no [Firebase console](https://console.firebase.google.com/):
    - Insira um bom nome (ID) para o projeto e lembre-se dele;
    - Desative (recomendado) Google Analytics for Firebase, não será utilizado por padrão;

2. Com o projeto criado, vá para _Criação > Firestore Database_ (menu lateral) e clique em _Criar banco de dados_:
    - Pule com o modo e as regras de produção padrão;
    - Selecione a região `us-east4` ([recomendado](https://github.com/ecomplus/cloud-commerce/issues/164));

3. Vá para _Criação > Authentication_ e clique em _Vamos começar_:
    - Clique em _Provedores nativos > E-mail/senha_ e ative _Link do e-mail (login sem senha)_;
    - Opcionalmente, adicione outros fornecedores por _Smartphone_ (SMS, gera custos adicionais) e/ou redes sociais;

4. Vá para :gear: _> Configurações do projeto_ e edite:
    - _Local padrão dos recursos do GCP_: mesma região do Firestore (`us-east4`);
    - _Configurações públicas > Nome exibido ao público_: O nome da sua loja;
    - _Configurações públicas > E-mail para suporte_ (opcional);
    - Em _Seus aplicativos_ crie um app Web:
        + Insira novamente o nome da loja e ativa Firebase Hosting para o novo app;
        + Copie apenas o valor do objeto `firebaseConfig` e substitua em `functions/ssr/src/scripts/InlineScripts.astro`;
        + Apenas clique em prosseguir nos próximos passos até confirmar e voltar para o console;

5. O plano gratuito do Firebase não é compatível com o envio de solicitações HTTP externas, portanto você precisará fazer upgrade para o plano _Blaze_ (sob demanda) no canto inferior esquerdo do console do Firebase;

6. [Use esse template](https://github.com/ecomplus/store/generate) para gerar um novo repositório para sua loja;

Prossiga com:
- [Melhor maneira usando a linha de comando](#primeiro-deploy-em-cli)
- [Apenas no navegador](#setup-somente-do-navegador) (pode ser mais fácil mas menos seguro, não recomendado)

#### Primeiro deploy em CLI

7. Setup e primeiro deploy pelo terminal com [Firebase CLI](https://firebase.google.com/docs/cli):
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
<summary>Com <a href="https://cloud.google.com/sdk/docs/install">gcloud CLI</a> (opcional) instalado</summary>

```bash
# Run project configuration and deploy on GitHub Actions
FIREBASE_PROJECT_ID={project-id} npm run setup
```

> **Note**  
> Chave de conta criada automaticamente apenas com as permissões necessárias usando gcloud CLI (pule as etapas 6 e 7).

</details>

<details>
<summary>Sem gcloud CLI</summary>

```bash
# Run project configuration and first deploy
FIREBASE_PROJECT_ID={project-id} npm run setup -- --no-gcloud
npm run deploy
```

7. [Crie uma conta de serviço](https://console.cloud.google.com/iam-admin/serviceaccounts) para seu projeto do Firebase diretamente no Google Cloud Platform:
    - Nomeie _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Descreva como _A service account with permission to deploy Cloud Commerce from the GitHub repository to Firebase_;
    - Continue e selecione as seguintes permissões:
        1. _Administrador do Firebase_
        2. _Leitor de chaves de API_
        3. _Leitor do Cloud Run_
        4. _Administrador do Cloud Functions_
        5. _Administrador do Artifact Registry_
        6. _Criador do App Engine_
        7. _Administrador do App Engine_
        8. _Administrador do Cloud Scheduler_
        9. _Usuário da conta de serviço_

8. De volta na lista de contas de serviço, clique nos 3 pontos (ações) and selecione _Gerenciar chaves_, crie e faça o download de uma nova chave JSON para a conta recém criada;

</details>

9. Configure os seguintes secrets no seu repositório do GitHub (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Cole o JSON da chave do Google Cloud gerada
    - `ECOM_AUTHENTICATION_ID`: Pegue no output do setup no CLI
    - `ECOM_API_KEY`: Pegue no output do setup no CLI

:checkered_flag: :checkered_flag: :checkered_flag: **Tudo pronto, boa!**

---

#### Setup somente do navegador

> **Warning**  
> Essa opção de configuração é menos segura, recomendamos o [primeiro deploy em CLI](#primeiro-deploy-em-cli).

7. [Crie uma conta de serviço](https://console.cloud.google.com/iam-admin/serviceaccounts) para seu projeto do Firebase diretamente no Google Cloud Platform:
    - Nomeie _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Descreva como _A service account with ALL permissions to deploy Cloud Commerce from the GitHub to Firebase_;
    - Continue e selecione a permissão _Acesso rápido > Básico > Proprietário_;

8. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

9. Configure os seguintes secrets no seu repositório do GitHub (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Cole o JSON da chave do Google Cloud gerada
    - `ECOM_STORE_ID`: Copie seu _Store ID_ no [admin da E-Com Plus](https://ecomplus.app/)
    - `ECOM_AUTHENTICATION_ID`: Copie seu _Authentication ID_ no [admin da E-Com Plus](https://ecomplus.app/)
    - `ECOM_API_KEY`: Copie seu _API Key_ no [admin da E-Com Plus](https://ecomplus.app/)
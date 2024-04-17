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

3. Vá para _Criação > Storage_ e clique _Vamos começar_:
    - Pule com o modo de produção padrão e a mesma região (pré-selecinada);

4. Vá para _Criação > Authentication_ e clique em _Vamos começar_:
    - Clique em _Provedores nativos > E-mail/senha_ e ative _Link do e-mail (login sem senha)_;
    - Vá para as configurações do Authentication e adicione o domínio(s) da sua loja na lista de autorizados;
    - Opcionalmente, adicione outros fornecedores por _Smartphone_ (SMS, gera custos adicionais) e/ou redes sociais;

5. Vá para :gear: _> Configurações do projeto_ e edite:
    - _Local padrão dos recursos do GCP_: mesma região do Firestore (`us-east4`);
    - _Configurações públicas > Nome exibido ao público_: O nome da sua loja;
    - _Configurações públicas > E-mail para suporte_ (opcional);
    - Em _Seus aplicativos_ crie um app Web:
        + Insira novamente o nome da loja e ativa Firebase Hosting para o novo app;
        + Copie apenas o valor do objeto `firebaseConfig` e substitua em `functions/ssr/src/scripts/InlineScripts.astro`;
        + Apenas clique em prosseguir nos próximos passos até confirmar e voltar para o console;

6. O plano gratuito do Firebase não é compatível com o envio de solicitações HTTP externas, portanto você precisará fazer upgrade para o plano _Blaze_ (sob demanda) no canto inferior esquerdo do console do Firebase;

7. [Use esse template](https://github.com/ecomplus/store/generate) para gerar um novo repositório para sua loja;

Prossiga com:
- [Melhor maneira usando a linha de comando](#primeiro-deploy-em-cli)
- [Apenas no navegador](#setup-somente-do-navegador) (pode ser mais fácil mas menos seguro, não recomendado)

#### Primeiro deploy em CLI

8. Setup e primeiro deploy pelo terminal com [Firebase CLI](https://firebase.google.com/docs/cli):
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

> [!NOTE]
> Chave de conta criada automaticamente apenas com as permissões necessárias usando gcloud CLI (pule as etapas 6 e 7).

</details>

<details>
<summary>Sem gcloud CLI</summary>

```bash
# Run project configuration and first deploy
FIREBASE_PROJECT_ID={project-id} npm run setup -- --no-gcloud
npm run deploy
```

8. [Crie uma conta de serviço](https://console.cloud.google.com/iam-admin/serviceaccounts) para seu projeto do Firebase diretamente no Google Cloud Platform:
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

9. De volta na lista de contas de serviço, clique nos 3 pontos (ações) and selecione _Gerenciar chaves_, crie e faça o download de uma nova chave JSON para a conta recém criada;

</details>

10. Configure os seguintes secrets no seu repositório do GitHub (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Cole o JSON da chave do Google Cloud gerada
    - `ECOM_AUTHENTICATION_ID`: Pegue no output do setup no CLI
    - `ECOM_API_KEY`: Pegue no output do setup no CLI

:checkered_flag: :checkered_flag: :checkered_flag: **Tudo pronto, boa!**

---

#### Setup somente do navegador

> [!WARNING]
> Essa opção de configuração é menos segura, recomendamos o [primeiro deploy em CLI](#primeiro-deploy-em-cli).

8. [Crie uma conta de serviço](https://console.cloud.google.com/iam-admin/serviceaccounts) para seu projeto do Firebase diretamente no Google Cloud Platform:
    - Nomeie _Cloud Commerce GH Actions (YOUR REPOSITORY)_;
    - Descreva como _A service account with ALL permissions to deploy Cloud Commerce from the GitHub to Firebase_;
    - Continue e selecione a permissão _Acesso rápido > Básico > Proprietário_;

9. Back in the service accounts list, click the 3 dots (actions) and select _Manage keys_, generate and download a JSON key for the created account;

10. Configure os seguintes secrets no seu repositório do GitHub (_Settings > Secrets > Actions_):
    - `FIREBASE_SERVICE_ACCOUNT`: Cole o JSON da chave do Google Cloud gerada
    - `ECOM_STORE_ID`: Copie seu _Store ID_ no [admin da e-com.plus](https://ecomplus.app/)
    - `ECOM_AUTHENTICATION_ID`: Copie seu _Authentication ID_ no [admin da e-com.plus](https://ecomplus.app/)
    - `ECOM_API_KEY`: Copie seu _API Key_ no [admin da e-com.plus](https://ecomplus.app/)

## Práticas recomendadas de produção

O CDN do Firebase Hosting é rápido, mas [não suporta _Stale-While-Revalidate_](https://firebase.google.com/docs/hosting/manage-cache) ([contexto e feature request](https://firebase.uservoice.com/forums/948424-general/suggestions/47179505-hosting-cdn-cache-stale-while-revalidate)) e Hosting proxy + Cloud Functions (mesmo sem cold starts) nunca leva menos que 1s (TTFB provavelmente vai bater ~2s). Nós gostamos de respostas "instantâneas" mas queremos manter views dinâmicas renderizadas em servidor (por menos client-side JS), então stale caching é necessário e portanto precisamos de outra camada de CDN em produção (quando o domínio próprio for apontado).

- Forma **recomemdada** usando [bunny.net](https://bunny.net/) CDN com Perma Cache e Edge Rules para ISR:
    + Obtenha sua chave de API em _account details_ no painel do bunny.net;
    + Salve em um secret chamado `BUNNYNET_API_KEY` no seu repositório do GitHub;
    + Edite _.github/build-and-deploy_ (some 1) e confirme com a mensagem **_[run:bunny-setup]_**.

- OU usando [bunny.net](https://bunny.net/) CDN com Stale Cache para SWR:
    + Pull zone com seu domínio https://_project_.web.app do Firebase Hosting como URL de origem;
    + SSL + Force SSL habilitados (previne redirecionar http://* para o domínio de origem);
    + **_Smart Cache_ desabilitado** (cache para tudo respeitando os cabeçalhos da resposta);
    + Caching _Query String Sort_ habilitado (ótimo para transformações de imagens);
    + Caching _Strip Response Cookies_ habilitado;
    + **[Stale Cache](https://bunny.net/blog/introducing-stale-cache-more-efficient-cache-handling/) _while origin offline_ e _while updating_ habilitados**;
    + Outras configurações de origem e cache podem ser mantidas desabilitadas;
    + Você pode querer desabilitar algumas zonas na configuração de _routing_ dependendo do target da loja.

- OU usando [Cloudflare](https://www.cloudflare.com/) Worker para ISR/SWR:
    + SSL full;
    + Page rule para \*/\* (qualquer rota) com _Cache Level: Cache Everything_;
    + [_Cache Reserve_](https://www.cloudflare.com/products/cache-reserve/) com Tiered Cache;
    + Entrada A no DNS com **proxy ativo** apontando para o IP do seu projeto no Firebase Hosting;
    + Worker _swr_ com o código (_quick edit_) copiado de [`cloud-commerce/packages/ssr/cloudflare/swr-worker.js`](https://raw.githubusercontent.com/ecomplus/cloud-commerce/main/packages/ssr/cloudflare/swr-worker.js).

> [!NOTE]
> Você pode querer remover ou editar a licença padrão (arquivo LICENSE) antes de publicar o conteúdo da sua loja.

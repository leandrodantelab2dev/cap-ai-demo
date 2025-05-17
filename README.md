
# CAP AI Demo

Este repositório contém uma aplicação de demonstração utilizando o **SAP Cloud Application Programming (CAP)** integrada com serviços de **AI** no **SAP BTP**.

## ⚙️ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [CDS CLI](https://cap.cloud.sap/docs/get-started/)
- Acesso ao SAP BTP com os seguintes serviços disponíveis:
  - Destination
  - Authentication (XSUAA)
  - HDI Container (Database)

## ☁️ Acesso ao AI Launchpad
```bash
https://dev-ai-l2d.ai-launchpad.prod.us-east-1.aws.ai-prod.cloud.sap/aic/index.html#/workspaces&/a/
```

## ☁️ Usuário para acesso ao AI Launchpad
```bash
user10@lab2dev.com
@Lab2dev2025#
```

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/leandrodantelab2dev/<nome-do-repositorio>.git
cd <nome-do-repositorio>
```

2. Instale as dependências:

```bash
npm install
```

3. Vincule os serviços do SAP BTP:

```bash
cds bind -2 cap-ai-demo-cap-destination:cap-ai-demo-cap-destination
cds bind -2 cap-ai-demo-cap-auth:cap-ai-demo-cap-auth
cds bind -2 cap-ai-demo-cap-db:cap-ai-demo-cap-db
```

4. Rode o projeto com o perfil `hybrid`:

```bash
cds watch --profile hybrid
```

> 💡 Dica: certifique-se de estar logado no BTP via `cf login` e que os serviços estejam corretamente criados no seu espaço.

## 📁 Estrutura do Projeto

- `srv/` – Serviços e lógica de negócios
- `db/` – Modelos de dados e definições
- `app/` – Frontend (se aplicável)
- `package.json` – Dependências e scripts

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

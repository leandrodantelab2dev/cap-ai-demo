# CAP AI Demo

Este repositório contém uma aplicação de demonstração utilizando o **SAP CAP (Cloud Application Programming)** integrada a serviços de AI via **SAP BTP**.

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de que você tem instalado:

- [Node.js](https://nodejs.org/) (versão 16+)
- [SAP CDS CLI](https://cap.cloud.sap/docs/get-started/)
- Acesso ao **SAP BTP** com os serviços vinculados:
  - cap-ai-demo-cap-destination
  - cap-ai-demo-cap-auth
  - cap-ai-demo-cap-db

## 🚀 Como rodar o projeto localmente

Clone o repositório e siga os passos abaixo:

# Clone o repositório
git clone https://github.com/leandrodantelab2dev/<nome-do-repositorio>.git
cd <nome-do-repositorio>

# Instale as dependências
npm install

# Vincule os serviços do SAP BTP (substitua se necessário)
cds bind -2 cap-ai-demo-cap-destination:cap-ai-demo-cap-destination
cds bind -2 cap-ai-demo-cap-auth:cap-ai-demo-cap-auth
cds bind -2 cap-ai-demo-cap-db:cap-ai-demo-cap-db

# Rode a aplicação em modo de desenvolvimento com perfil híbrido
cds watch --profile hybrid

# API NESTJS

## Resumo

Este projeto é uma aplicação backend desenvolvida em NestJS, que oferece funcionalidades de registro e login de usuário, autenticação e autorização com token JWT, além de uma arquitetura sólida seguindo os princípios do SOLID. Utiliza o banco de dados MongoDB, que é executado em um contêiner Docker para garantir facilidade de uso.

A aplicação foi desenvolvida com foco em boas práticas de programação e qualidade de código, incluindo uma alta cobertura de testes unitários para garantir a robustez do sistema.

## Como rodar o projeto

1. Clone o repositório

```bash
git clone https://github.com/Brendon-Lopes/codex-api
```

2. Navegue até a pasta do projeto

```bash
cd codex-api
```

3. Instale as dependências

```bash
npm install
```

4. Rode o container do banco de dados

```bash
docker-compose up -d
```

5. Rode a aplicação

```bash
npm run start:dev
```

6. Acesse pelo link:
   [http://localhost:3000/api](http://localhost:3000/api)

## Como rodar os testes unitários

1. Rode o comando:

```bash
npm test
```

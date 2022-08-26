# Exemplo prático do Workchopp Supero sobre Arquitetura Hexagonal

## Descrição do projeto

Este projeto foi desenvolvido como exemplo para apresentação durante o Workchopp Supero sobre Arquitetura Hexagonal.
O projeto é composto por duas versões de uma mesma API. Uma delas implementada sem aplicação dos conceitos de Arquitetura Hexagonal e o outro, com a aplicação deste padrão de arquitetura/design.

## Tecnologias utilizadas (requisitos para a execução do projeto)

* Node.js
* Typescript (será instalado via npm)
* Banco de dados PostgresSQL

## Instruções para execução do projeto

* Clonar o repositório para o computador onde deseja executar o projeto.
* Em cada uma das subpastas ("sem-arquitetura-hexagonal" e "com-arquitetura-hexagonal") executar a instrução ``` npm install ```.
* Executar o servidor PostgresSQL e criar duas bases de dados chamadas "workchopp" e "workchopp_test" respectivamente.
* Em cada uma destas duas bases de dados criadas, executar o script "create.sql" disponível na pasta principal do projeto.
* Alterar as credenciais de acesso ao PostgresSQL nos arquivos "sem-arquitetura-hexagonal/src/database/database.ts" e "com-arquitetura-hexagonal/src/infra/database/PostgresqlConnection.ts".
* Para executar a aplicação na pasta "sem-arquitetura-hexagonal" basta acessar a pasta e executar o comando ``` npm start ```.
* Já na pasta "com-arquitetura-hexagonal" é possível executar a aplicação utilizando o framework "express" através do comando ``` npm run start-express ``` ou então, usando o framework "hapi" através do comando ``` npm run start-hapi ```.

## Testando a API

Para teste de ambas as versões da API (com ou sem Arquitetura Hexagonal) é disponibilizado na pasta principal do projeto um arquivo (Workchopp - Arquitetura Hexagonal.postman_collection.json) que corresponde a uma collection do Postman. Esta collection pode ser importada para o Postman e as requests já estão preparadas para a execução (incluindo os parâmetros necessários, que podem trnquilamente ser alterados conforme desejado).

## Créditos

Este projeto foi construído por Reginaldo Rubens da Silva baseado num exemplo disponibilizado por Rodrigo Branas (https://github.com/rodrigobranas).

# CRUD React.js com API Rest

Inicialmente vamos fazer um mock de uma API usando **json-server** e em seguida vamos fazer um mock [mock.api](https://mockapi.io/)  e consumindo em uma aplicação React.js crianda anteriormente.

## Conceitos de uma API REST
Tempo estimado: 30 min
[baixar o pdf de "Conceitos de uma API REST"](https://github.com/totemarcal/cursoHUB/raw/main/APIREST.pdf)

## Simulando uma API REST
Segue abaixo os passa-a-passo para consumir uma API Rest.

1. Criando um arquivo .json
2. Começando com JSON Server
3. Rotas
4. Filtros
5. Paginação
6. Ordenação

### Criando um arquivo .json
Tempo estimado: 10 min

Crie um arquivo com o nome **db.json** com o conteúdo abaixo. Esse arquivos será "mockado" usando o **json-server**. 
~~~ json
{
  "produtos": [
    {
      "id": 2,
      "nome": "X-Búrguer",
      "descricao": "Pão, bife de hambúrguer 90g, 1 fatia de queijo, salada e batata.",
      "preco": 10.5,
      "categoria_id": 1
    },
    {
      "id": 3,
      "nome": "X-Bacon",
      "descricao": "Pão, bife de hambúrguer 90g, 1 fatia de queijo, 2 fatia de bacon, salada e batata.",
      "preco": 12.5,
      "categoria_id": 1
    },
    {
      "id": 4,
      "nome": "X-Tudo",
      "descricao": "Pão, 2 bifes de hambúrguer 90g, 2 fatias de queijo, 4 fatias de bacon, salada e batata.",
      "preco": 14.5,
      "categoria_id": 1
    },
    {
      "id": 5,
      "nome": "Coca cola 350ml",
      "descricao": "",
      "preco": 5.5,
      "categoria_id": 2
    },
    {
      "nome": "Hambúrguer de frango",
      "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
      "preco": 9.5,
      "categoria_id": 1,
      "id": 8
    },
    {
      "nome": "Hambúrguer de frango",
      "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
      "preco": 9.5,
      "categoria_id": 1,
      "id": 9
    },
    {
      "nome": "Hambúrguer de frango",
      "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
      "preco": 9.5,
      "categoria_id": 1,
      "id": 10
    },
    {
      "nome": "Hambúrguer de frango",
      "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
      "preco": 10.5,
      "categoria_id": 1,
      "id": 11
    }
  ],
  "categorias": [
    {
      "id": 1,
      "nome": "Hambúrgueres"
    },
    {
      "id": 2,
      "nome": "Refrigerantes"
    },
    {
      "id": 3
    }
  ]
}
~~~

### Começando com JSON Server

Tempo estimado: 10 min

Instalação do **json-server**. 
> npm install -g json-server 

No diretório que foi criado o arquivo **db.json** inicie o servidor.
> json-server --watch db.json

### Rotas

Tempo estimado: 50 min

O endereço base é [localhost:3000](localhost:3000) mais o recurso que você quer acessar com por exemplo “produtos”. A tabela abaixo exibe todas as rotas criadas automaticamente pelo **json-server**, abra um browser e teste cada url.

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210414_211200.png?raw=true)

Faça o dowload do [Postman](https://www.postman.com/downloads/) e teste as urls abaixo.

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210414_211253.png?raw=true)
#### GET
Exemplo 1: Buscar todos os produtos
GET http://localhost:3000/produtos/
Exemplo 2: Buscar todas as categorias
GET http://localhost:3000/categorias/
Exemplo 3: Buscar apenas um produtos
GET http://localhost:3000/produtos/1
Exemplo 4: Buscar apenas uma categoria
GET http://localhost:3000/categorias/1

#### POST
Exemplo 5: Salvar um produto
POST http://localhost:3000/produtos/
Content-Type: application/json
Body:
~~~ json
{
    "nome": "Hambúrguer de frango",
    "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
    "preco": 9.5,
    "categoria_id": 1
}
~~~
Retorno:
~~~ json
{
    "nome": "Hambúrguer de frango",
    "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
    "preco": 9.5,
    "categoria_id": 1,
    "id": 7
}
~~~
#### PUT
Exemplo 6: Alterar um produto
PUT http://localhost:3000/produtos/1
Content-Type: application/json

Body:
~~~ json
{
    "nome": "Hambúrguer de frango",
    "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
    "preco": 10.5,
    "categoria_id": 1
}
~~~
Retorno:
~~~ json
{
    "nome": "Hambúrguer de frango",
    "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
    "preco": 10.5,
    "categoria_id": 1,
    "id": 1
}
~~~
#### PATCH
Exemplo 7: Alterar apenas o nome de um produto
PATCH http://localhost:3000/produtos/1
Content-Type: application/json

Body:
~~~ json
{
    "nome": "Hambúrguer de frango artezanal"
}
~~~
Retorno:
~~~ json
{
    "nome": "Hambúrguer de frango artezanal",
    "descricao": "Pão, bife de hambúrguer 90g de frango, salada e batata.",
    "preco": 10.5,
    "categoria_id": 1,
    "id": 1
}
~~~
#### DELETE
Exemplo 8: Excluir um produto
DELETE http://localhost:3000/produtos/1
Content-Type: application/json
Retorno:
~~~ json
Status: 200 OK
~~~
### Filtros
Exemplo 9: Filtrar por nome
GET http://localhost:3000/produtos?nome=X-Búrguer
Content-Type: application/json
Retorno:
~~~ json
[
    {
        "id": 2,
        "nome": "X-Búrguer",
        "descricao": "Pão, bife de hambúrguer 90g, 1 fatia de queijo, salada e batata.",
        "preco": 10.5,
        "categoria_id": 1
    }
]
~~~
### Paginação
Exemplo 10: Paginação
GET http://localhost:3000/produtos/?_page=1&_limit=2
~~~ json
[
    {
        "id": 2,
        "nome": "X-Búrguer",
        "descricao": "Pão, bife de hambúrguer 90g, 1 fatia de queijo, salada e batata.",
        "preco": 10.5,
        "categoria_id": 1
    },
    {
        "id": 3,
        "nome": "X-Bacon",
        "descricao": "Pão, bife de hambúrguer 90g, 1 fatia de queijo, 2 fatia de bacon, salada e batata.",
        "preco": 12.5,
        "categoria_id": 1
    }
]
~~~
### Ordenação
Exemplo 11: Ordenação
GET http://localhost:3000/produtos/?_sort=nome&_order=desc
Content-Type: application/json
~~~ json
[...]
~~~
## MockApi
https://mockapi.io/docs 
Tempo estimado: 30 min

1. Para criar um projeto clique no ícone `New project`

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi1.png?raw=true)

2. Informe o nome do projeto
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi2.png?raw=true)
3. Para criar um novo **endpoint** clique no ícone `NEW RESOURCE`
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi3.png?raw=true)
4. Para fazer o mock de dados clique no ícone `DATA` e adicione os dados abaixo:
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi4.png?raw=true)
~~~ json
[
  {
    "id": "27",
    "title": "rrr",
    "description": "rrr",
    "published": false
  },
  {
    "id": "28",
    "title": "Teste",
    "description": "Teste"
  },
  {
    "id": "29",
    "title": "rrtt",
    "description": "rrtt"
  }
]
~~~  
5. Para editar o endpoint clique no ícone `EDIT`. Os campos do `Schema` deve ser `id`, `title` e `description` conforme imagem.
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi5.png?raw=true)

6. Faça teste pelo Postman dos endpoints criados.
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/mockapi6.png?raw=true)

## Referências
JSON Server: https://github.com/typicode/json-server 
Postman: https://www.getpostman.com/

## Projeto Semanal

Tempo estimado: 50 min

1. O líder do projeto deve fazer o cadastro no site https://mockapi.io/docs 
2. O líder do projeto deve criar as entidades que serão utilizadas no projeto

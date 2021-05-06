

## Usando API REST em um projeto REACT.JS
Agora vamos adaptar nossa aplicação para consumir uma API Rest mockada no mockAPI. Neste tutorial vamos utilizar o endpoint https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1/tutorials porém cada um pode criar o seu próprio serviço.

### Clone do Projeto
Faça o clone do projeto

> git clone https://github.com/totemarcal/react-crud-js

### Adicione o arquivo http-common

Faça a instalação do **Axios** no projeto:
> yarn add axios
 
Crie um arquivo chamado **http-common.js** dentro da pasta **src** e adicione o conteúdo abaixo:
~~~ javascript
import axios from "axios";
export default axios.create({
  baseURL: "https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
~~~

### Adicione o arquivo TutorialDataServiceRest
Crie um arquivo chamado **TutorialDataServiceRest.js** dentro da pasta **service** e adicione o conteúdo abaixo:
A primeira linha importa o **axios** criado no arquivo **http-common.js**.  A função `getAll` faz uma requisição `GET`  ao endpoint `/tutorials`. A função `get` faz uma requisição `GET`  ao endpoint `/tutorials` passando o filtro **id**. Em `create`é feito uma requisição `POST` passando o parâmetro `data`no corpo da requisição. A função `update` faz uma requisição `PUT` passando o filtro **id** e o parâmetro `data`no corpo da requisição. Ad funções `delete`e `deleteAll`apagam um registro e todos os registros, respectivamente. Por fim, a função `findByTitle` faz uma requisição `GET`filtrando pelo campo `title`.
~~~ javascript
import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials");
};
const get = id => {
  return http.get(`/tutorials/${id}`);
};
const create = data => {
  return http.post("/tutorials", data);
};
const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};
const remove = id => {
  return http.delete(`/tutorials/${id}`);
};
//Nao tem esse endpoint no mockAPI
const removeAll = () => {
  return http.delete(`/tutorials`);
};
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
~~~
### Alterar o arquivo AddTutorial
Substitua o `import`pelo arquivo criado e a função `saveTutorial` pelo código abaixo:
~~~ javascript
import TutorialDataService from "../services/TutorialDataServiceRest";

...

const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
 ~~~
A função `TutorialDataService.create`retorna uma promises onde o retorno é salvo no state `Tutorial`.


### Alterar o arquivo TutorialList
Adicione o `useEffect` e substitua o `import`pelo arquivo criado. Os imports ficará assim:
~~~ javascript
import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialDataServiceRest";
import { Link } from "react-router-dom";
~~~
Altera adicione as funções `useEffect` e `retrieveTutorials` pelo código abaixo:
~~~ javascript
 useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
~~~
A função `retrieveTutorials` faz uma requisição `GET`e busca todos os registros. A função `useEffect`é chamada todo vez que o componente é carregado.
Altere as funções `deleteTutorial`, `removeAllTutorials` e `findByTitle`. A função `deleteTutorial` remove o registro do `id` passado como parâmetro. A função `removeAllTutorials`remove todos os registros, porém o mockAPI não possui esse endpoint, portanto ele não irá funcionar. A função `findByTitle` faz a busca de um registro com o filtro do `title` digitado no campo de busca.
~~~ javascript
const deleteTutorial = (id) => {
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.remove(id)
      .then(response => {
        console.log(response.data);
        retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  const removeAllTutorials = () => {
    if (window.confirm('Deseja excluir?')){
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
~~~
Altere a construção do **Links** de editar e remover.

~~~ javascript
<td>  
	<Link  to={"/tutorials/" + tutorial.id} className="badge badge warning">Edit</Link>
</td>
<td>  
	<Link  onClick={() =>  deleteTutorial(tutorial.id)} className="badge badge-danger">Remove</Link>
</td>
~~~
### Alterar o arquivo Tutorial
Substitua o `import` pelo arquivo criado. 
~~~ javascript
import TutorialDataService from "../services/TutorialDataServiceRest";
~~~
Crie a função `getTutorial` e faça a chamada dela na função `useEffect`. A função `getTutorial` faz uma requisição `GET`e busca todos os registros. A função `useEffect`é chamada todo vez que o componente é carregado.

~~~ javascript
  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);
~~~
Atualize as funções `updatePublished`, `updateTutorial` e `deleteTutorial`. A função `updatePublished` 

~~~ javascript
const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    if (window.confirm('Deseja excluir?')){
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };
~~~
A função `updatePublished` e `updateTutorial` atualizam o status e os campos `title`e `description` respectivamente, do registro do `id` passado como parâmetro. A função `deleteTutorial` remove o registro do `id` passado como parâmetro.

Altere a construção do **Links** de editar e remover.

~~~ javascript
<Link to="/tutorials">
  <button
    type="submit"
    className="badge badge-success"
    onClick={updateTutorial}
  >
    Update
  </button>
</Link>
~~~
## Repositório

https://github.com/totemarcal/react-crud-js
Branch: crud-react-apirest

## Referências
JSON Server: https://github.com/typicode/json-server 
Postman: https://www.getpostman.com/

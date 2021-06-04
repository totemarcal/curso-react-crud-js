

# CRUD React.js com Bootstrap

Agora daremos continuidade ao projeto criado na aula anterior.

## Tela de Listagem
Tempo Estimado: 40 min

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210412_194146.png?raw=true)

### Criando o component TutorialList
Adicione no arquivo **TutorialList** o código abaixo. O state `searchTitle` é onde fica armazenado o valor que foi digitado na caixa de texto de pesquisa. A função `onChangeSearchTitle` captura o evento da caixa de texto de pesquisa e a função `findByTitle` faz uma filtra os itens da tabela pelo valor do state `searchTitle`.  O state `tutorials` é onde fica armazenado a lista de itens que será exibida na tabela. A função `onChangeSearchTitle` captura o evento da caixa de texto de pesquisa.  O arquivo **TutorialDataService** é responsável por armazenar os dados e possui as funções para manipular os dados. 

 
~~~ javascript
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TutorialDataService from "../services/TutorialDataService";

const TutorialsList = () => {
  
  const [searchTitle, setSearchTitle] = useState("");
  const [tutorials, setTutorials] = useState(TutorialDataService.getAll());

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const deleteTutorial = (id) => {
    
  }

  const removeAllTutorials = () => {
    
  };

  const findByTitle = () => {
    setTutorials(TutorialDataService.getById(searchTitle))
  };

  return (
    <div className="list row">
      <div className="col-md-10">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <h4>Tutorials List</h4>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          { 
            tutorials &&
            tutorials.map((tutorial, index) => (
              <tr>
                <th scope="row">{tutorial.key}</th>
                <td>{tutorial.title}</td>
                <td>{tutorial.description}</td>
                <td> <Link to={"/tutorials/" + tutorial.title}
                  className="badge badge-warning">Edit</Link>
                </td>
                <td> <Link onClick={() => deleteTutorial(tutorial.title)}
                  className="badge badge-danger">Remove</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;
~~~

### Criando o TutorialDataService
Neste exemplo, os dados são mocados em uma lista. No arquivo **TutorialDataService** adicione o código abaixo. A função `getAll` retorna todos os dados e a função `getById` filtra os dados pelos parâmetros. 

~~~ javascript
let PRODUCTS = [
  {title: 'Ola', description: 'Ola', published: 'Published'},
  {title: 'Teste', description: 'Teste', published: 'Published'}
]

const getAll = () => {
  return PRODUCTS;
};

const getById = (title) => {
  if (title === "") return PRODUCTS
  //var filtrado = PRODUCTS.filter((obj) => { return obj.title == title; });  // retorna os objs que são iguais
  //var filtrado = PRODUCTS.filter((obj) => obj.title == title ); // retorna os objs que são iguais
  var filtrado = PRODUCTS.filter((obj) => obj.title.includes(title) ); // retorna os objs que contém 
  return filtrado
};

export default {
  getAll,
  getById
};
~~~

## Tela de Cadastro
Tempo Estimado: 40 min

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210412_144936.png?raw=true)

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210412_145004.png?raw=true)
### Criando o component AddTutorial
Adicione no arquivo **AddTutorial** o código abaixo. O state `tutorial` é onde fica armazenado o valor que foi digitado na tela de cadastro. A função `handleInputChange` captura o evento das caixas de texto de **title** e **Description** e armazena no state `tutorial`.  A função `saveTutorial` armazena o valor em **TutorialDataService** e atribui o valor **true** ao state `submitted`com a função `setSubmitted`. Quando o valor do state `submitted` é **true** a função `return`irá exibir o `</button>` **Add**.

~~~ javascript
import React, { useState } from "react";
import TutorialDataService from "../services/TutorialDataService";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      published: false
    };

    TutorialDataService.create(data);
    setSubmitted(true);
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={saveTutorial}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
         <button type="submit" 
                className="btn btn-success">Submit</button>  
          </form>
        </div>
      )}
    </div>
  );
};
export default AddTutorial;
~~~

### Alterando o TutorialDataService
No arquivo **TutorialDataService** adicione a função `create` e adicione no `export default`. 

~~~ javascript
let PRODUCTS = [
  {title: 'Ola', description: 'Ola', published: 'Published'},
  {title: 'Teste', description: 'Teste', published: 'Published'}
]

const getAll = () => {
  return PRODUCTS;
};

const getById = (title) => {
  if (title === "") return PRODUCTS
  //var filtrado = PRODUCTS.filter((obj) => { return obj.title == title; });  // retorna os objs que são iguais
  //var filtrado = PRODUCTS.filter((obj) => obj.title == title ); // retorna os objs que são iguais
  var filtrado = PRODUCTS.filter((obj) => obj.title.includes(title) ); // retorna os objs que contém 
  return filtrado

};

const create = (data) => {
  return PRODUCTS.push(data);
};

export default {
  getAll,
  create,
  getById
};

~~~

## Tela de Atualização
Tempo Estimado: 40 min

![enter image description here](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210412_194258.png?raw=true)

### Criando o component Tutorial

Adicione no arquivo **Tutorial** o código abaixo. O state `currentTutorial` é onde fica armazenado o valor do produto que será pesquisado na função `getById`.  O state `key` é onde fica armazenado a chave do produto que será alterado. A função `useEffect` é executado no carregamento do componente , faz a pesquisa do produto com `getById` e atualiza o state `currentTutorial` com `setCurrentTutorial`. A função `handleInputChange` captura o evento das caixas de texto de **title** e **Description** e armazena no state `currentTutorial`. A função `updateTutorial` atualiza os campos **title** e **Description** e a função `updatePublished` atualiza o campo **published**. Caso o state `currentTutorial.published` seja **true** será exibida o texto no botão **UnPublish** senão será exibido **Publish**. 

~~~ javascript
import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialDataService";
import { Link } from "react-router-dom";

const Tutorial = props => {
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: "Unpublished",
  };
  const [message, setMessage] = useState("");
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [key, setKey] = useState(props.match.params.id)

  useEffect(()=>{
    const data = TutorialDataService.getById(key)
    console.log(key)
    setCurrentTutorial(data[0])     
  }, [])

  const   handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };
    TutorialDataService.update(key, data);  
    setCurrentTutorial(data)
  };

  const updateTutorial = () => {
    //console.log(currentTutorial)
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: currentTutorial.published
    };  
    TutorialDataService.update(key, data);
    setCurrentTutorial(data)
  };

  const deleteTutorial = () => {
    
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>
          <Link to="/">
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateTutorial}
            >
              Update
            </button>
          </Link>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;

~~~

### Alterando o TutorialDataService
No arquivo **TutorialDataService** adicione a função `update` e adicione no `export default`. 
~~~ javascript
let PRODUCTS = [
  {title: 'Ola', description: 'Ola', published: 'Published'},
  {title: 'Teste', description: 'Teste', published: 'Published'}
]

const getAll = () => {
  return PRODUCTS;
};

const getById = (title) => {
  if (title === "") return PRODUCTS
  //var filtrado = PRODUCTS.filter((obj) => { return obj.title == title; });  // retorna os objs que são iguais
  //var filtrado = PRODUCTS.filter((obj) => obj.title == title ); // retorna os objs que são iguais
  var filtrado = PRODUCTS.filter((obj) => obj.title.includes(title) ); // retorna os objs que contém 
  return filtrado

};

const create = (data) => {
  return PRODUCTS.push(data);
};

const update = (key, data) => {
  console.log(key)
  PRODUCTS.forEach(function(item) {
    if (item.title === key){
      item.title = data.title
      item.description = data.description
      item.published = data.published
    }
  });
  return 
};

export default {
  getAll,
  create,
  update,
  getById
};
~~~

## Remoção de Produtos
Tempo Estimado: 20 min

### Tela de Listagem
Implemente as funções `deleteTutorial` para excluir somente um produto e `removeAllTutorials` para excluir todos.
~~~ javascript
...
  const deleteTutorial = (id) => {
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.remove(id);
    }
  }

  const removeAllTutorials = () => {
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.removeAll();
      setTutorials(TutorialDataService.getAll())
    }
  };
 ...
~~~
### Tela de Atualização
Implemente a função `deleteTutorial` para excluir o produto.
~~~ javascript
...
  const deleteTutorial = () => {
    console.log(currentTutorial)
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.remove(currentTutorial.key);  
    }
  };
...
~~~
### Alterando o TutorialDataService
No arquivo **TutorialDataService** adicione a função `remove` e `removeAll` e adicione no `export default`. 
~~~ javascript
let PRODUCTS = [
  {title: 'Ola', description: 'Ola', published: 'Published'},
  {title: 'Teste', description: 'Teste', published: 'Published'}
]

const getAll = () => {
  return PRODUCTS;
};

const getById = (title) => {
  if (title === "") return PRODUCTS
  //var filtrado = PRODUCTS.filter((obj) => { return obj.title == title; });  // retorna os objs que são iguais
  //var filtrado = PRODUCTS.filter((obj) => obj.title == title ); // retorna os objs que são iguais
  var filtrado = PRODUCTS.filter((obj) => obj.title.includes(title) ); // retorna os objs que contém 
  return filtrado

};

const create = (data) => {
  return PRODUCTS.push(data);
};

const update = (key, data) => {
  console.log(key)
  PRODUCTS.forEach(function(item) {
    if (item.title === key){
      item.title = data.title
      item.description = data.description
      item.published = data.published
    }
  });
  return 
};

const remove = (key) => {
  return PRODUCTS.splice(PRODUCTS.indexOf(key), 1);
};

const removeAll = () => {
  PRODUCTS=[]
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
  getById
};

~~~

## Repositório

https://github.com/totemarcal/react-crud-js
Branch: crud-react-bootstrap

## Referências
https://medium.com/collabcode/roteamento-no-react-com-os-poderes-do-react-router-v4-fbc191b9937d

## Projeto Semanal
Tempo Estimado: 40 min
Implemente os arquivos **AddEntidade1.js**, **Entidade1.js**, **Entidade1List.js** e **EntidadeDataService** para fazer o crud com dados mocados.


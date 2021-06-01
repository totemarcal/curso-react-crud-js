


# Crie um projeto React.js com Github

Acesse ao site [github.com](https://github.com/), caso não tenha uma conta faça uma.

## Criando um projeto
Tempo estimado: 20 min.

Primeiro crie um projeto React com o nome de react-hooks-crud-bootstrap e depois teste.
> npx create-react-app react-hooks-crud-bootstrap
> 
> cd react-hooks-crud-bootstrap
> 
> yarn start

## Adicionando o projeto no Github
Tempo estimado: 20 min.

Um repositório do Git é um armazenamento virtual para projetos. Ele permite que você salve versões do código, que você pode acessar quando precisar.

### Criando um repositório no Github
1. Clique em **New repository**
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/9134d23d26dd12dd3b165ddc6be949ee4ca9e0e5/github1.png?raw=true)
2. Informe o nome do repositório
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/9134d23d26dd12dd3b165ddc6be949ee4ca9e0e5/github2.png?raw=true)
3. Confirme se o repositório foi criado
![enter image description here](https://github.com/totemarcal/cursoHUB/blob/9134d23d26dd12dd3b165ddc6be949ee4ca9e0e5/github3.png?raw=true)

### Enviando o projeto ao repositório

1. Dentro da pasta do projeto **react-hooks-crud-bootstrap** inicialize um projeto git.
> git init
2. O **git add** comando adiciona uma mudança no diretório de trabalho à área de preparação. Ele diz ao Git que você deseja incluir atualizações para um arquivo específico no próximo commit.
> git add .
3. O comando **git commit** captura um instante das mudanças atualmente testadas do projeto. O git add comando é usado para preparar mudanças no projeto que serão armazenadas em um commit.
> git commit -m "first commit"
4. O comando **git branch** seleciona o branch que o projeto irá enviar o projeto.
> git branch -M main
5. O comando **git remote add** permite adicionar um **origin** para o repositório se não existe nenhum. Isso é útil quando se deseja iniciar um repositório localmente com git init e, em seguida, é necessário enviá-lo para um repositório remoto depois.
> git remote add origin https://github.com/totemarcal/projetoNovo.git
6. O comando **git push** é usado para enviar conteúdo do repositório local para um repositório remoto.
> git push -u origin main

## Criando um menu ao projeto
Tempo estimado: 40 min.

### Usando o Bootstrap em um projeto React.js

Material de referência do Bootstrap https://getbootstrap.com/docs/4.2/getting-started/introduction/ 

Faça a instalação do bootstrap no projeto:
> npm install bootstrap

ou
>yarn add bootstrap 

Faça a importação do bootstrap no arquivo **App.js**.

~~~javascript
import  "bootstrap/dist/css/bootstrap.min.css";
~~~
### Estruturando o projeto

Navegue até a pasta **src** do projeto e crie outras duas pastas: **components** e **services**.
Na pasta **components** crie os arquivos: **AddTutorial.js**, **Tutorial.js** e ** TutorialList.js**. Na pasta **services** crie o arquivo **TutorialDataService.js**. 

![](https://github.com/totemarcal/cursoHUB/blob/main/Screenshot_20210410_165814.png?raw=true)

AddTutorial.js
~~~ javascript
import React from "react";
const AddTutorial = () => {
  return (
    <div >    
    </div>
  );
};
export default AddTutorial;
~~~

Tutorial.js
~~~ javascript
import React from "react";
const Tutorial = () => {
  return (
    <div >   
    </div>
  );
};
export default Tutorial;
~~~

TutorialList.js
~~~ javascript
import React from "react";
const TutorialList = () => {
  return (
    <div >    
    </div>
  );
};
export default TutorialList;
~~~

### Criando uma Navegação

#### Adicione um react-router no Index.js
Fça a instalação do react-router-dom.
> yarn add react-router-dom

Adicione o **react-router-dom** no **index.js** do projeto. Deve ser importado um **BrowserRouter** (https://reacttraining.com/react-router/web/api/BrowserRouter), ele é um componente que irá ser responsável por informar pra nossa aplicação que a partir de onde ele é chamado teremos um **roteamento** de **componentes**, por conta disso ele irá ficar em volta tanto do `<App />`.

~~~ javascript
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
~~~

#### Adicione um menu do App.js

O [**Switch**](https://reacttraining.com/react-router/web/api/Switch), é um componente que recebe vários componentes [**Route**](https://reacttraining.com/react-router/web/api/Route)  e dado o caminho que for passado na URL um deles é renderizado. Cada **Route** é uma rota do nosso sistema, e devemos passar pra ele qual vai ser o caminho da url por meio de um atributo `path=""` e dado esse path, um outro atributo com o nosso componente que foi importado chamado `component={ComponenteDoPath}`. O componente [**Link**](https://reacttraining.com/react-router/web/api/Link) passa um parâmetro informando para onde esse link vai apontar `<Link to="{path}">`.

~~~ javascript
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Exemplo Bootstrap
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}
export default App;
~~~

## Clonando um projeto

Tempo estimado: 10 min.

Agora saia do diretório do projeto criado anteriormente e crie uma pasta chama **projetoClone**. Em seguida acesse a pasta.
> cd projetoClone

Se um projeto já foi configurado em um repositório central, o comando clonar é a forma mais comum para os usuários obterem um clone de desenvolvimento local. A url pode ser com o protocolo SSH ou HTTPS.

Faça o clone do projeto abaixo e examine o código que será construído durante a semana.
> git clone https://github.com/totemarcal/react-crud-js

## Fluxo de trabalho de Git Flow

Tempo estimado: 20 min.

O Gitflow Workflow define um modelo de ramificação rigoroso projetado com base no lançamento do projeto. Isto oferece uma estrutura robusta para gerenciar projetos maiores.

O comando **git flow init** cria o workflow no git.

> git flow init

Cada novo **feature** deve residir na própria ramificação, a qual pode ser enviada por **push** para o repositório central para backup/colaboração. No entanto, em vez de serem ramificações da branch `principal`, as ramificações de `feature` usam a ramificação de `develop` como ramificação pai.

1. Criação da ramificação da **feature**:

> git flow feature start feature_branch

2. Fazendo commit em uma feature:

> git push -u origin feature_branch

4. Verifique no Github se a `feature_branch` foi criada

5. Altere o arquivo ** TutorialList.js** 

6. Faça o **git add** e depois **git commit**  

7. Enviando as alterações para a branch `feature_branch`:

> git push -u origin develop

8. O **git flow finish** mescla a `feature_branch` no `develop`, remove a `feature_branch` e volta para o branch `develop`. Finalização da ramificação de **feature**:

> git flow feature finish feature_branch

9. Verifique na branch `develop`  no Github se as alterações existem.

## Projeto Semanal

Tempo Estimado: 40 min

1. Formem times de 3 a 5 pessoas e dialoguem para definir um tema para um trabalho de desenvolvimento de um sistema de cadastros (CRUD). Em seguida, deve ser escolhido o líder do grupo.
2. O líder deve criar um novo projeto React.js com o nome do sistema;
3. O líder deve criar o menu no projeto novo
4. O líder deve criar um repositório no Github e adicionar os outros membros da equipe ao repositório
5. Cada membro da equipe deve fazer o clone do projeto
6. Cada membro da equipe deve criar uma **feature** e fazer o **push**. O líder deve verificar se todas as **features** foram criadas.7. Cada membro deve criar três arquivos **AddEntidade1.js**, **Entidade1.js** e **Entidade1List.js**  e adicionar ** Entidade1List.js** ao menu. Na pasta **services** crie o arquivo **Entidade1DataService.js**. 
8. Cada membro deve fazer **git add*, *git commit** e **git push** na **feature** aberta.
9. Cada membro deve fazer **git flow finish** na **feature** aberta.

## Apresentação

Tempo Estimado: 30 min
Os times devem apresentar até onde conseguiram chegar e tirar dúvidas.

import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialDataServiceRest";
import { Link } from "react-router-dom";

const TutorialsList = () => {
  
  const [searchTitle, setSearchTitle] = useState("");
  const [tutorials, setTutorials] = useState();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

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
                <td> <Link to={"/tutorials/" + tutorial.id}
                  className="badge badge-warning">Edit</Link>
                </td>
                <td> <Link onClick={() => deleteTutorial(tutorial.id)}
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

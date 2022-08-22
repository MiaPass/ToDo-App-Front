import React, { useState } from "react";

import Changes from "../Changes/Options";
import Modify from "../Forms/ModifyTodo";

import "./Card.css";

export default function Cards(data) {
  const todo = data.data;
  // console.log(todo);

  const [openModify, setOpenModify] = useState({ status: false, on: "" });

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpenModify({ status: true, on: id });
  };

  return (
    <div>
      {todo.length === 1 ? (
        <div key={todo._id}>
          <hr />
          <section>
            {openModify.status === true && openModify.on === todo[0]._id ? (
              <Modify setOpenModify={setOpenModify} data={todo[0]} />
            ) : (
              <div className="card-container">
                {todo[0].title ? (
                  <button
                    id="card-title"
                    className="cards-buttons"
                    onClick={(e) => handleClick(e, todo[0]._id)}
                  >
                    {todo[0].title}
                  </button>
                ) : (
                  <></>
                )}

                <hr />

                {todo[0].description ? (
                  <button
                    className="cards-buttons"
                    onClick={(e) => handleClick(e, todo[0]._id)}
                  >
                    {todo[0].description}
                  </button>
                ) : (
                  <></>
                )}

                <hr />
                <Changes data={todo[0]} />
              </div>
            )}
          </section>
          <hr />
        </div>
      ) : (
        todo.map((td) => {
          return (
            <div key={td._id}>
              <hr />
              <section>
                {openModify.status === true && openModify.on === td._id ? (
                  <Modify setOpenModify={setOpenModify} data={td} id={td._id} />
                ) : (
                  <div className="card-container">
                    {td.title ? (
                      <button
                        id="title"
                        className="cards-buttons"
                        onClick={(e) => handleClick(e, td._id)}
                      >
                        {td.title}
                      </button>
                    ) : (
                      <></>
                    )}

                    <hr />

                    {td.description ? (
                      <button
                        className="cards-buttons"
                        onClick={(e) => handleClick(e, td._id)}
                      >
                        {td.description}
                      </button>
                    ) : (
                      <></>
                    )}
                    <hr />
                    <Changes data={td} />
                  </div>
                )}
              </section>

              <hr />
            </div>
          );
        })
      )}
    </div>
  );
}

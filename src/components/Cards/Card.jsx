import React, { useState } from "react";

import Changes from "../Changes/Options";
import Modify from "../Forms/ModifyTodo";

import "./Card.css";

export default function Cards(data) {
  const todo = data.data;
  // console.log(todo);

  const [openModify, setOpenModify] = useState(false);

  return (
    <div>
      {todo.length === 1 ? (
        <div key={todo._id}>
          <hr />
          <section>
            {openModify ? (
              <Modify setOpenModify={setOpenModify} data={todo[0]} />
            ) : (
              <>
                {todo[0].title ? (
                  <button
                    className="cards-buttons"
                    onClick={() => setOpenModify(true)}
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
                    onClick={() => setOpenModify(true)}
                  >
                    {todo[0].description}
                  </button>
                ) : (
                  <></>
                )}

                <hr />
                <Changes data={todo[0]} />
              </>
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
                {openModify ? (
                  <Modify setOpenModify={setOpenModify} data={td} id={td._id} />
                ) : (
                  <>
                    {td.title ? (
                      <button
                        className="cards-buttons"
                        onClick={() => setOpenModify(true)}
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
                        onClick={() => setOpenModify(true)}
                      >
                        {td.description}
                      </button>
                    ) : (
                      <></>
                    )}
                    <hr />
                    <Changes data={td} />
                  </>
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

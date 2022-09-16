import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Changes from '../Changes/Options'
import Modify from '../Forms/Todo/ModifyTodo'

import './Card.css'

export default function Cards(data) {
  const todo = data.data
  // console.log(todo);

  const [openModify, setOpenModify] = useState({ status: false, on: '' })

  const handleClick = (e, id) => {
    e.preventDefault()
    setOpenModify({ status: true, on: id })
  }

  return (
    <div>
      {todo.length === 1 ? (
        <div key={todo._id}>
          <hr />
          <section>
            {openModify.status === true && openModify.on === todo[0]._id ? (
              <Modify setOpenModify={setOpenModify} data={todo[0]} />
            ) : (
              <Card className="card-container">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title>
                    {todo[0].title ? (
                      <Button
                        id="card-title"
                        variant="primary"
                        // className="cards-buttons"
                        onClick={(e) => handleClick(e, todo[0]._id)}
                      >
                        {todo[0].title}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Card.Title>
                  <Card.Text>
                    {todo[0].description ? (
                      <Button
                        // className="cards-buttons"
                        variant="primary"
                        onClick={(e) => handleClick(e, todo[0]._id)}
                      >
                        {todo[0].description}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                // className="text-muted"
                >
                  <Changes data={todo[0]} />
                </Card.Footer>
              </Card>
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
                    <Card className="card-container">
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Card.Title>
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
                        </Card.Title>
                        <Card.Text>
                          {td.description ? (
                            <Button
                              className="cards-buttons"
                              onClick={(e) => handleClick(e, td._id)}
                            >
                              {td.description}
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        <Changes data={td} />
                      </Card.Footer>
                    </Card>
                  </div>
                )}
              </section>

              <hr />
            </div>
          )
        })
      )}
    </div>
  )
}

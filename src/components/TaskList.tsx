import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {                    //aqui chamo a função setTasks para a nova lista ser criada
    setTasks([...tasks, {                             //ela recebe a listagem dos itens já existentes na lista tasks
      id: tasks.length,                               //e um novo objeto {} do tipo Task, que tem como id o tamanho
      title: newTaskTitle,                            //da lista para não ocorrerem repetições de ids, o nome contido
      isComplete: false,                              //no state newTaskTitle e o isComplete começando como falso
    }])
  }

  function handleToggleTaskCompletion(id: number) {   //para a atualização de status do isComplete, a função
    setTasks(                                         //setTasks é chamada, onde dentro dela é feito
      tasks.map((tasks) => tasks.id === id? {         //um map da lista tasks, onde para cada item contido
        id: id,                                       //na lista é feito uma comparação de seu id com o 
        title: tasks.title,                           //id recebido como parâmetro, de modo que quando os valores
        isComplete: !tasks.isComplete,                //são diferentes o item é retornado normalmente e quando
      } : tasks)                                      //são iguais, um novo objeto é criado como valor do isComplete
    )                                                 //sendo o oposto do anterior, e esse novo objeto é retornado
  }

  function handleRemoveTask(id: number) {             //para a remoção de uma task, a função setTasks é chamada
    setTasks(                                         //onde dentro dela é feito um filter da lista tasks
      tasks.filter((tasks) => tasks.id !== id)        //onde são mantidos os itens cujas ids são diferentes
    )                                                 //da id recebida como argumento da função. Como as ids
  }                                                   //são todas diferentes, apenas um item é removido

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
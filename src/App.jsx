import { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from 'uuid';
import Title from "./components/Title";

function App() { 
  // Armazenando um state task
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

    useEffect(() =>{
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
      //ou const fetchTasks = async () => {}
      async function fetchTasks() {
        // Chamar a API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        method: 'GET',
      });

      // Pegar os dados que ela retorna 
      const data = await response.json();

      //Armazenar/Persistir esses dados no state 
      setTasks(data);

      }
      fetchTasks();
    }, [])

    function onTaskClick(taskId) {
      // Criando uma função para alterar o estado de conclusão de uma tarefa 
      const newTasks = tasks.map (task => {
        // preciso atualizar essa tarefa
        if(task.id === taskId) {
          return {...task, isCompleted: !task.isCompleted}
        }
        // não preciso atualizar essa tarefa
        return task;
      });
      // Atualiza o states
      setTasks(newTasks);
    }

    function onDeleteTaskClick(taskId) {
      const newTasks = tasks.filter(task => task.id != taskId)
      setTasks(newTasks);
    }

    function onAddTaskSubmit (title, description) {
      const newTask = {
        id: v4(),
        title: title, 
        description: description,
        isCompleted:false
      };
      // Atualizando lista 
      setTasks([...tasks, newTask])
    }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        {/*Passei a função para o componente Task que renderiza as tarefas */}
        <Tasks tasks={tasks} onTaskClick={onTaskClick} 
        onDeleteTaskClick={onDeleteTaskClick}
        />
      </div> 
    </div>
  );

}

export default App; 
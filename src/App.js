import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Start(props) {
  console.log(props.clockRunning)
  if (props.clockRunning) {
    return (
      <div>
        <button type="button" onClick={props.stopTimer}>Stop</button>
        <button type="button" onClick={props.resetTimer}>End</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <button type="button" onClick={props.stopTimer}>Start</button>
      </div>
    )
  }
}

function Options(props) {
  return (
    <select
      value={props.timerType} onChange={(e) => props.changeTimerType(e.target.value)}
      className="dropdown"
      name="timer type"
      id="timer type">
      <option value="pomodoro">Pomodoro</option>
      <option value="free timer">Free timer</option>
    </select>
  )
}

function Timer(props) {
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [timerMinuts, setTimerMinuts] = useState(0);
  const [timerState, setTimerState] = useState(false);
  const [clockType, setClockType] = useState("pomodoro")
  console.log(timerState);

  function changeTimerState() {
    setTimerState(!timerState);
  }

  function decreaseMinute() {
    setTimerMinuts(timerMinuts - 1);
    setTimerSeconds(59);
  }
  function increaseMinute() {
    setTimerMinuts(timerMinuts + 1);
    setTimerSeconds(0);
  }

  function resetTimer() {
    if (clockType === "pomodoro") {
      changeTimerState();
      setTimerMinuts(25);
      setTimerSeconds(0);
    }
    else {
      changeTimerState();
      setTimerMinuts(0);
      setTimerSeconds(0);
    }

  }

  function establishTimerType(type) {
    setClockType(type);
    console.log("Clock type changed to... ", type)
    if (type === "pomodoro") {
      setTimerMinuts(25);
      setTimerSeconds(0);
    }
    else {
      setTimerMinuts(0)
      setTimerSeconds(0)
    }
  }

  useEffect(() => {
    console.log(timerMinuts, timerSeconds)
    if (timerState) {
      const interval = setInterval(() => {
        if (clockType === "pomodoro") {
          if (timerSeconds === 0) {
            if (timerMinuts === 0) {
              console.log("Ended!")
              resetTimer();
            }
            else {
              decreaseMinute();
            }
          }
          else {
            setTimerSeconds(timerSeconds - 1);
          }
        }
        else {
          if (timerSeconds === 60) {
            increaseMinute();
          }
          else {
            setTimerSeconds(timerSeconds + 1);
          }

        }

      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerState, timerSeconds]);

  return (
    <div>
      <Start clockRunning={timerState} stopTimer={changeTimerState} resetTimer={resetTimer}></Start>
      <Options changeTimerType={establishTimerType} timerType={clockType}></Options>
      {timerMinuts}:{timerSeconds}
    </div>
  )
}

function Links(props) {
  return (
    <div>
      <button type="button">Statistics</button>
      <button type="button">Configuration</button>
    </div>
  )
}

function Header(props) {
  return (
    <div className='App-header'>
      <Timer></Timer>
      <Links></Links>
    </div>
  )
}

function CurrentTask(props) {
  if (Object.keys(props.nameAssignment).length > 0) {
    return (
      <div>
        <h2>Name:{props.nameAssignment.name}</h2>
        <p>Tag:{props.nameAssignment.tag}</p>
        <p>Time:{props.nameAssignment.time}</p>
        <input type="checkbox"></input>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>What are we working on today?</h2>
      </div>
    )
  }
}

function Task(props) {
  return (
    <li>{props.name}</li>
  )
}

/*
Takes in an array of objects (with childdren) iterates over it and returns a hierarchical unordered list.
*/
function HierarchicalUlist(props) {
  console.log("Rendering Ulist....")
  function recurseTasks(entry, previousIndex) {
    let formattedTasks = []
    entry.forEach((object, i) => {
      const currentName = previousIndex ? previousIndex + "-" + i : i.toString();
      console.log(previousIndex, currentName);
      if (!object.children.length) {
        const reference = () => props.onClick(currentName, 0, props.tasks)
        formattedTasks.push(<li key={object.name} name={currentName}><button onClick={reference}>{object.name}</button></li>)
      }
      else {
        formattedTasks.push(<li key={object.name} name={currentName}>{object.name}<ul>{recurseTasks(object.children, currentName)}</ul></li>)
      }
    })
    return formattedTasks;
  }

  const mappedTasks = recurseTasks(props.tasks, "")
  //const mappedTasks = props.tasks.map(currentElement => <Task key={currentElement.name} name={currentElement.name}></Task>)
  console.log(mappedTasks)
  return (
    <ul>
      {mappedTasks}
    </ul>
  )
}

function TaskSection(props) {
  return (
    <div>
      <CurrentTask nameAssignment={props.nameAssignment}></CurrentTask>
      <HierarchicalUlist tasks={props.tasks} onClick={props.onClick}></HierarchicalUlist>
    </div>)
}

function App() {

  const [tasks, setTasks] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState({})

  /* Takes in the unformatted "name" of the react tree, parses it to navigate the information document and returns it iteratively. */
  function returnTask(id, currentIndex, currentTask) { ///Assignment probably needs more optimization
    console.log(`Id is: ${id}`, `Current index is: ${currentIndex}`, `Current task is: ${currentTask}`,)
    if (currentTask[id[currentIndex]].children.length) {
      return (returnTask(id, currentIndex + 2, currentTask[id[currentIndex]].children))
    }
    else {
      return (currentTask[id[currentIndex]])
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        const tasksData = response.data;
        console.log(tasksData);
        setTasks(tasksData);
      })
  }, [])


  return (
    <div className='App'>
      <Header></Header>
      <TaskSection
        tasks={tasks}
        onClick={(id, currentIndex, currentTask) => setCurrentAssignment(returnTask(id, currentIndex, currentTask))}
        nameAssignment={currentAssignment}>
      </TaskSection>
    </div>
  );
}
export default App;

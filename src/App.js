import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Button(props) {
  return (<button type="button" onClick={props.onClick}>{props.name}</button>)
}

function Start(props) {
  console.log("is clock running?", props.clockRunning, props.clockType)
  let buttonName1 = "Stop";
  let buttonName2 = "Finish";


  if (props.clockType === "rest") {
    buttonName2 = "Skip"
    if (!props.clockRunning) {
      if (!props.clockStarted) {
        buttonName1 = "Start"
      }
      else {
        buttonName1 = "Continue"
      }
    }
  }
  else {
    if (!props.clockRunning) {
      if (!props.clockStarted) {
        return (
          <div>
            <Button onClick={props.stopTimer} name="Start"></Button>
          </div>
        )
      }
      else {
        buttonName1 = "Continue"
      }
    }
  }

  return (
    <div>
      <Button onClick={props.stopTimer} name={buttonName1}></Button>
      <Button onClick={props.resetTimer} name={buttonName2}></Button>
    </div>)
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
  const [timerSeconds, setTimerSeconds] = useState(5);
  const [timerMinuts, setTimerMinuts] = useState(0);
  const [timerState, setTimerState] = useState(false);
  const [clockType, setClockType] = useState("pomodoro");
  const [clockStarted, setClockStarted] = useState(false);
  console.log(timerState);

  function changeTimerState() {
    if (clockStarted === false) {
      setClockStarted(true);
    }
    setTimerState(!timerState);
  }

  function setTime(minutes, seconds) {
    setTimerMinuts(minutes);
    setTimerSeconds(seconds);
  }

  function resetTimer() {
    if (clockType === "pomodoro") {
      setTime(25, 0);
      setTimerState(false)
    }
    else if (clockType === "free timer") {
      setTime(0, 0);
      setTimerState(false)
    }
    else {
      setClockType("pomodoro")
      setTime(25, 0);
      setTimerState(false)
    }
    setClockStarted(false)
    console.log("Inside resetTimer, logging timer and clock state", timerState, clockStarted)
  }

  function establishTimerType(type) {
    setClockType(type);
    console.log("Clock type changed to... ", type)
    if (type === "pomodoro") {
      setTime(25, 0)
    }
    else {
      setTime(0, 0)
    }
  }

  useEffect(() => {
    console.log(timerMinuts, timerSeconds)
    if (timerState) {
      const interval = setInterval(() => {
        if (clockType === "pomodoro" || clockType === "rest") {
          if (timerSeconds === 0) {
            if (timerMinuts === 0) {
              ///Insert communication to db
              console.log("Ended!")
              changeTimerState();
              setTime(5, 0)
              setClockType("rest")
              setClockStarted(false)
            }
            else {
              setTime(timerMinuts - 1, 59)
            }
          }
          else {
            setTimerSeconds(timerSeconds - 1);
          }
        }
        else {
          if (timerSeconds === 60) {
            setTime(timerMinuts + 1)
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
      <Start
        clockRunning={timerState}
        stopTimer={changeTimerState}
        resetTimer={resetTimer}
        clockStarted={clockStarted}
        clockType={clockType}>
      </Start>
      <Options changeTimerType={establishTimerType} timerType={clockType}></Options>
      {String(timerMinuts).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
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
  console.log("Rendering Ulist....", props.tasks)
  let formattedTasks = []
  /*function recurseTasks(entry, previousIndex) {
    
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
    */
  function recurseTasks(task) {
    if (task.children.length > 0) {
      let formattedChildren = []
      for(const i of task.children){
        formattedChildren.push(recurseTasks(props.tasks.find(x => x.id === i)))
      }
      console.log("printing formatted children", formattedChildren)
      return (
        <li>{task.name}<ul key={task.id} name={task.name}>{formattedChildren}</ul></li>
      )
    }
    else {
      return(<li key={task.id} name={task.name}><button>{task.name}</button> </li>)
    }
  }

  for (const i of props.tasks) {
    if (i.origin) {
      console.log("iteration of for in hielist", i)
      formattedTasks.push(recurseTasks(i))
    }
  }

  return (
    <ul>
      {formattedTasks}
    </ul>
  );
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

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        const tasksData = response.data;
        console.log(tasksData);
        setTasks(tasksData);
      })
  }, [])
  if(tasks.length>0){
    
  }
  return (
    <div className='App'>
      <Header></Header>
      <TaskSection tasks={tasks} nameAssignment={currentAssignment}></TaskSection>
    </div>
  );
}
export default App;

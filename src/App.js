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
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinuts, setTimerMinuts] = useState(25);
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
    if (clockType === "free timer") {
      props.updateTimeHandler(timerMinuts, timerSeconds)
      setTime(0, 0);
      setTimerState(false)
      
    }
    else {
      const minutesElapsed = timerSeconds? 25-(timerMinuts+1): timerMinuts; 
      props.updateTimeHandler(minutesElapsed, 60-timerSeconds)
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
              if (clockType === "pomodoro") {
                console.log("Ended!")
                changeTimerState();
                setTime(5, 0)
                setClockType("rest")
                setClockStarted(false)
                props.updateTimeHandler(25, 0)
              }
              else {
                resetTimer() //Sets to pomodoro
              }
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
  if (Object.keys(props.currentAssignment).length === 0) {
    return (
      <div className='App-header'>
        <Links></Links>
      </div>
    )
  }
  else {
    return (
      <div className='App-header'>
        <Timer updateTimeHandler={props.updateTimeHandler}></Timer>
        <Links></Links>
      </div>
    )
  }

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
  function recurseTasks(task) {
    if (task.children.length > 0) {
      let formattedChildren = []
      for (const i of task.children) {
        formattedChildren.push(recurseTasks(props.tasks.find(x => x.id === i)))
      }
      console.log("printing formatted children", formattedChildren)
      return (
        <li>{task.name}<ul key={task.id} name={task.name}>{formattedChildren}</ul></li>
      )
    }
    else {
      return (<li key={task.id} name={task.name}><button onClick={() => props.onClick(task.id)}>{task.name} </button> </li>)
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

  const url = 'http://localhost:3001/tasks'

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const tasksData = response.data;
        console.log(tasksData);
        setTasks(tasksData);
      })
  }, [])

  const selectTask = (id) => {
    setCurrentAssignment(tasks.find(x => x.id === id))
  }

  const updateTimeHandler = (minutes, seconds) => {
    console.log("Updating time handler...... by", minutes, seconds)
    const updatedNote = { ...currentAssignment, time: currentAssignment + (minutes * 60) + seconds }
    //Below method needs further optimization
    axios.put(url + '/' + String(currentAssignment.id), updatedNote).then(response => {
      console.log("Sucess, updating tasks")
      setTasks(tasks.map(task => task.id === currentAssignment.id ? response.data : task))
    }).catch(alert("Whoops. Time couldn't be updated"))
  }

  return (
    <div className='App'>
      <Header currentAssignment={currentAssignment} updateTime={updateTimeHandler}></Header>
      <TaskSection tasks={tasks} nameAssignment={currentAssignment} onClick={selectTask}></TaskSection>
    </div>
  );
}
export default App;

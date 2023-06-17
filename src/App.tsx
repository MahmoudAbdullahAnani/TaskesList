import {useRef,useEffect, useState}  from 'react';
import './App.css';

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [task, setTask] = useState<string>("");
  const [listTask, setListTask] = useState<string[]>([]);
  const [errors, setErrors] = useState<string>("");
    const [inputFocus, setInputFocus] = useState<string>("")
  const addList: () => void = () => {
    if (!task) {
      setErrors("يجب كتابة مهمه")
    } else {
      setTask("")
      setListTask([...listTask, task])
    }
    
  }
const currentDate: Date = new Date();
const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
const time: string = currentDate.toLocaleTimeString('en-US', options);
  useEffect(() => {
   if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])
  
  return (
    <div className='App'>
      {inputFocus === "focus" && (<div className='holder'></div>)}
      <h1>Taskify</h1>
      <div className="addTask">
        <input onChange={(e) => {
          setErrors("")
          setTask(e.target.value)
        }} ref={inputRef} value={task} onFocus={()=>setInputFocus("focus")} onBlur={()=>setInputFocus("blur")} placeholder='مهمه...' type="text" />
          <button onClick={addList}>اضافة</button>
      </div>
      <div className="errors">{errors}</div>
      {/* show data */}
      <div className="perantTaskes">
        {
          listTask.map(task => {
            return (
              <div key={task} className="perantTask" title={`${time}`} >
                <textarea  defaultValue={task} > 
                  </textarea>
                <div className="iconsInput">
                  <span onClick={() => {
                    const newList = listTask.filter(taskList => taskList !== task)
                    setListTask(newList);
                  }}>Complete</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App;

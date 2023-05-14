import { useEffect, useRef, useState } from "react";
import "./App.css";
import question from "./mock";

function App() {
  const [Score, setScore] = useState(true);
  const [Start, SetStart] = useState(true);
  const [Index, SetIndex] = useState(0);
  const questions = [question[Index]];
  let [Answer, SetAnswer] = useState([]);
  const refs = useRef([]);
  const [Count, SetCount] = useState(0);
  const [ShowScore, SetShowScore] = useState(false);
  const [timerout, Settimeout] = useState({
    time: {
      seconds: "00",
      minutes: "00",
    },
  });
  let myInterval = null;
  const [TimeOut, SetTimeOut] = useState(null);

  const [SelectAnswer, SetSelectAnswer] = useState("");
const [ti,setTi] = useState(0);
  // start quiz
  const QuizStart = () => {
    SetStart(false);
  };

  useEffect(() => {
    if (Start == false) {
      TimerOut();
      console.log("useeffect");
    }
 
  }, [Start,ti]);

  // timer for quiz 
  const TimerOut = () => {
    const countDownTime = Date.now() + 60000;
    myInterval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = "00";
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        console.log("oveer");
        NotAnswer();
        let time = {
          time: {
            seconds: "00",
            minutes: "00",
          },
        };
        Settimeout({ ...timerout, ...time });

        if (question.length - 1 > Index) {
          setTi(ti+1);
          const array = "";
          SetIndex(pre => pre + 1);
          SetAnswer([...Answer, array]);
        }
      } else {
        console.log("runnning");
        let time = {
          time: {
            seconds: seconds,
            minutes: minutes,
          },
        };
        Settimeout({ ...timerout, ...time });
      }
    }, 1000);
    SetTimeOut(myInterval);
  };

  // do work for if user dont answer in time  timeout 
  const NotAnswer = () => {
    clearInterval(myInterval);

    if (question.length - 1 == Index) {
      setScore(false);
      clearInterval(myInterval);
    }

  };

  //  use for next button
  const StartAnswer = (e) => {
    e.preventDefault();
   
    clearInterval(TimeOut);
    TimerOut();
    let CheckMarked = Marked();
    if (question.length - 1 > Index && CheckMarked.length != 0) {
      SetIndex(Index + 1);
    }
      if (question.length > Index) {
        SetAnswer([...Answer, SelectAnswer]);
      }
    unMarked();
    if (question.length - 1 == Index) {
      setScore(false);
      clearInterval(myInterval);
    }
  };

  // unmarked option
  const unMarked = () => {
    refs.current.map((item) => {
      item.checked = false;
    });
  };

   // find marked option for answer
  const Marked = () => {
    return refs.current.filter((item) => {
      return item.checked == true;
    });
  };

  // finding answer 
  const Check = () => {
    for (let i = 0; i < question.length; i++) {
      console.log(Answer[i] == question[i].correctAnswer);
      if (Answer[i] == question[i].correctAnswer) {
        SetCount((pre) => pre + 1);
      }
    }
    SetShowScore(true);
  };

  // store marked answer in arrray 
  const SelectOption = (e, Ind) => {
    const array = e.target.id;
    SetSelectAnswer(array);
  };

  return (
    <div className="App">
      {Score ? (
        <>
          {Start ? (
            // quiz start button
            <>
            <h3> For Each Question You Have 1 min </h3>
            <button onClick={QuizStart} className="button-28">
              Take Quiz
            </button>
            </>
          ) : (
        // Quiz main area 
            questions.map((items, index) => {
              return (
                <div key={index}>
                  <h1>
                    {timerout.time.minutes}:{timerout.time.seconds}
                  </h1>
                  <h1 className="questionTitle">
                    <span>Q{items.question.id + 1}.</span>
                    {items.question.title}
                  </h1>
                  <div>
                    <div className="optionBox">
                      {items.answers.map((item, indexs) => {
                        return (
                          <div key={indexs} className="optionInput">
                            <input
                              type="radio"
                              onClick={(e) => {
                                SelectOption(e, indexs);
                              }}
                              value={item.value}
                              id={item.value}
                              name={index + "0"}
                              ref={(ref) => (refs.current[indexs] = ref)}
                            />
                            <label htmlFor={index + "0"} className="optionName">
                              {" "}
                              <span>{item.value}.</span>
                              {item.label}
                            </label>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={StartAnswer}
                      className="button-28"
                      type="Submit"
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })
          
          )}
        </>
      ) : (
        // Quiz score Area 
        <>
          <button onClick={Check} className="button-28">
            Check Score
          </button>
          {ShowScore && <h1 className="scoreBox">You Score {Count} Out Of 5</h1>}
        </>
      )}
    </div>
  );
}

export default App;

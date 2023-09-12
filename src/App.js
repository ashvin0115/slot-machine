import { useState } from "react";
import "./App.css";
import BetList from "./component/BetList";
import Panel from "./component/Panel";
import axios from "axios";

const api_url = "http://localhost:5000/";

const value = {
  BELL: 20,
  HEAT: 8,
  DIAMOND: 4,
};

function App() {
  const [bet, setBet] = useState(1);
  const [panel, setPanel] = useState([]);
  const [result, setResult] = useState("");

  const handleSpin = async () => {
    const symbols = await axios.get(`${api_url}play`);
    setPanel(symbols.data);
    const result = symbols.data.every((value) => value === symbols.data[0]);
    if (result) setResult(result);
    else setResult("");
  };

  return (
    <div className="App px-10 py-10">
      <h1 className="text-[48px] py-10">Slot Machine</h1>

      <div className="flex items-start">
        <div className="w-[50%]">
          <Panel panel={panel} />

          <div className="flex items-center">
            <BetList bet={bet} setBet={setBet} setPanel={setPanel} />
            <button
              className="border border-[#E3E1E1] rounded-md w-[160px] h-10 ml-[20px]"
              onClick={handleSpin}
            >
              SPIN
            </button>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="flex items-center justify-center">
            <p className="text-[24px]">Bet: {bet},</p>
            <p className="text-[24px] py-10 ml-10">
              {result ? `Success: ${panel[0]}` : "Fail"}
            </p>
          </div>
          <p className="text-[24px]">
            Result: {result ? value[panel[0]] * bet : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

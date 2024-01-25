import './comps/crash.css'
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import Crash from './comps/crash'
import FanLvl from './comps/FanLvl';
import Lvl from './comps/Lvl';
import AddLvl from './comps/AddLvl';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/Game_Crash' element={<Crash/>} />
          <Route path='/Game_Crash/FanLvl' element={<FanLvl/>} />
          <Route path='/Game_Crash/Lvl/:lvl' element={<Lvl/>} />
          <Route path='/Game_Crash/AddLvl' element={<AddLvl/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


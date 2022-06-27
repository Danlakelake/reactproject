import './assets/css/App.css';

//Import Components
import Navbar from './components/Navbar';
import MainTitle from './components/MainTitle';
import PriceEvoGraph from './components/PriceEvoGraph';
import PresenceGraph from './components/PresenceGraph';
import DataTable from './components/DataTable';


function App() {
  return (
    < div className="App" >
      <Navbar />
      <MainTitle />
      <div className="graphs-cont">
        <PriceEvoGraph />
        <PresenceGraph />
      </div>
      <DataTable />
    </div >
  );
}

export default App;

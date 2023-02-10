import './App.css';
import Options from './pages/entry/Options'
import SummaryForm from './pages/summary/SummaryForm'

function App() {
  return (
    <div className="App">
      <Options optionType={'scoops'}></Options>
      <SummaryForm></SummaryForm>
    </div>
  )
}

export default App;

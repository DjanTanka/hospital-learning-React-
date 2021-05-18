import  { Switch, Route, Redirect } from 'react-router-dom';
import Author from './components/Author/Author.js';
import Registr from './components/Registr/Registr.js';
import Appoint from './components/Appoint/Appoint.js';

function App() { 
  const loca = JSON.parse(localStorage.getItem('userEntered'));
  return (
    <div>
     <Switch>
       <Route path="/author" component={Author}></Route>
       <Route path="/registr" component={Registr}></Route>
       <Route path="/appoint" render = {() => (loca? <Appoint /> : (<Redirect to ='/registr'/>))}></Route>
       <Redirect from="/" to='/author' />
     </Switch>
    </div>
  );
}

export default App;

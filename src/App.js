import  { Switch, Route, Redirect } from 'react-router-dom';
import Author from './components/Author';
import Registr from './components/Registr';
import Appoint from './components/Appoint';

function App() {
  return (
    <div>
     <Switch>
       <Route path="/1" component={Author}></Route>
       <Route path="/2" component={Registr}></Route>
       <Route path="/3" component={Appoint}></Route>
       <Redirect from="/" to='/1' />
     </Switch>
    </div>
  );
}

export default App;

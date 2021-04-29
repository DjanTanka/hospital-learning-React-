import  { Switch, Route, Redirect } from 'react-router-dom';
import Author from './components/Author.js';
import Registr from './components/Registr.js';
import Appoint from './components/Appoint.js';

function App() {
  return (
    <div>
     <Switch>
       <Route path="/author" component={Author}></Route>
       <Route path="/registr" component={Registr}></Route>
       <Route path="/appoint" component={Appoint}></Route>
       <Redirect from="/" to='/author' />
     </Switch>
    </div>
  );
}

export default App;

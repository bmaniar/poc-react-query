import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'

import './App.css';

function App() {
  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/post/:id' render={routerProps => <Post id={routerProps.match.params.id} />} />
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App;

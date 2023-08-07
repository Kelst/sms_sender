import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import Header from './components/header/Header'
import SMSPage from './components/sms/SMSPage';
import HistoryPage from './components/history/HistoryPage';
import StatusPage from './components/status/StatusPage';
let router = createBrowserRouter([
  {
    element:<Header/>,
    children:
[  
  {
    path: "/",
    element:<SMSPage/>
  },
  {
    path:"/history",
    element:<HistoryPage/>
  }
  ,
  {
    path:"/status",
    element:<StatusPage/>
  }]
}
]);
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </>
    // <Router>
    //   <Header/>
    //   <Switch>
    //     <Route exact path="/sms" component={SMSPage} />
    //     <Route exact path="/history" component={HistoryPage} />
    //     <Route exact path="/status" component={StatusPage} />
    //   </Switch>
    // </Router>
    
  )
}

export default App

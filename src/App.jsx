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
import LoginPage from './components/login/Login';
import AuthGuard from './components/auth/AuthGuard';

let router = createBrowserRouter([
  {
    
    element:<Header/>,
    children:
[  

  {
    path: "/sms",
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
  },

],


  
},
{
  path: "/login", 
  element: <LoginPage />
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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './App.css';
import Navbar from './compents/Navbar';
import Homepage from './compents/Homepage';
import Pastelist from './compents/Pastelist';
import Viewpaste from './compents/Viewpaste';

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <Homepage/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <Pastelist/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div className="w-full h-full flex flex-col">
        <Navbar/>
        <Viewpaste/>
      </div>,
    }
  ]
)

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;

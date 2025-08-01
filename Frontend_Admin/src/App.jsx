import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home";
import {AddPost} from "./pages/AddPost";
import { AllPost } from "./pages/AllPost";
import { SignUp } from "./pages/SignUp";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/all-post' element={<AllPost />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

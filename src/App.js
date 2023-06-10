import React from "react";
import Acceuil from "./pages/Accueil";
import Categorie from "./pages/Categorie";
import { BrowserRouter , Route , Routes } from "react-router-dom";
function App() {
  return (
    <div class="w-full h-full">
     {/* <Acceuil /> */}
     <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Acceuil/>} />
          <Route path="/Catégories/:categoryKey" element={ <Categorie/>} />
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

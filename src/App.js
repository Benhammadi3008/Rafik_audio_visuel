import React from "react";
import Acceuil from "./pages/Accueil";
import SousCategorie from "./pages/SousCategorie";
import Article from "./pages/Atricle";
import { BrowserRouter , Route , Routes } from "react-router-dom";
function App() {
  return (
    <div class="w-full h-full">
     {/* <Acceuil /> */}
     <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Acceuil/>} />
          <Route path="/Catégories/:categoryKey" element={ <SousCategorie/>} />
          <Route path="/Catégories/:categoryKey/:SouscategoryKey" element={ <Article/>} />
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

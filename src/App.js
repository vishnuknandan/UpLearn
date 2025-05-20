import React from "react";
import ".//App.css";

import Footer from "./Footer";
import AlphabetCardContainer from "./AlphabetCardContainer";
import Header from "./Header";

// import "./AlphabetCardContainer.css";

const App = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "",
      }}
    >
      <Header />
      <AlphabetCardContainer />
      {/* <Footer /> */}
    </div>
  );
};

export default App;

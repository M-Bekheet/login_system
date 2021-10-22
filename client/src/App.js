import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/Home";
import { loadUser } from "./actions/userActions";

import "antd/dist/antd.dark.css";
import "../src/App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App" theme="dark">
        <Home />
      </div>
    </Provider>
  );
};

export default App;

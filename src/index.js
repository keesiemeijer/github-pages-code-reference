import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import { DataProvider, DataContext } from "./contexts/DataContext";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <DataProvider>
    <DataContext.Consumer>
      {({ fetchData }) => <App fetchData={fetchData} />}
    </DataContext.Consumer>
  </DataProvider>,
  document.getElementById("root")
);
registerServiceWorker();

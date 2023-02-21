import React from 'react';
//import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';
import { QueryClient , QueryClientProvider} from 'react-query';
import App from './App';
import AppDnd from "./AppDnd";
import {RecoilRoot} from "recoil";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client = {queryClient} >
        <AppDnd />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);


import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostContextProvider } from './context/PostContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PostContextProvider>
    <App />
  </PostContextProvider>
);

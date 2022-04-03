import ReactDOM from 'react-dom/client';
import App from './App';

import reset from 'reset';

reset();

ReactDOM
  .createRoot(document.getElementById('root') as Element)
  .render(<App />);

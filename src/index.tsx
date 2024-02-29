import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './app/App'
import { store } from './app/store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
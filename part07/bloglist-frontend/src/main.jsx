import ReactDOM from 'react-dom/client'
import { Container } from '@mui/material'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>
)

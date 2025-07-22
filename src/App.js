import Cart from './components/Cart'
import Password from './components/Password'
import { ModalProvider } from './context/auth-context'

const App = () => {
  return (
    <ModalProvider>
    <Password />
    <Cart />
    </ModalProvider>
  )
}

export default App
import 'react-native-gesture-handler'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import { ApplicationNavigator } from '@/Navigators'
import { Provider as PaperProvider } from 'react-native-paper'
import './Translations'
import Providers from './navigation'



const App = () => {
  return <Providers />
}

/*
const App = () => (
  <StoreProvider store={store}>
    <PaperProvider>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </PaperProvider>
  </StoreProvider>
)
*/

export default App

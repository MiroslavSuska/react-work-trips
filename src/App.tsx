import { DivBody } from './styles/GlobalStyle';
import { Navigation } from './router/Navigation';
import { TripContextProvider } from './context/TripContext';

export default function App() {
  return (
    <TripContextProvider>
      <DivBody>
        <Navigation />
      </DivBody>
    </TripContextProvider>
  );
}

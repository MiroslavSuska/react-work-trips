import { DivBody } from './GlobalStyle';
import { Navigation } from './Navigation';
import { TripContextProvider } from './TripContext';

export default function App() {
  return (
    <TripContextProvider>
      <DivBody>
        <Navigation />
      </DivBody>
    </TripContextProvider>
  );
}

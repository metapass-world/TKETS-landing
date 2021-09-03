import './App.css';
import Box from '@material-ui/core/Box'
import Header from '../components/Header'
import TitleBanner from '../components/TitleBanner';
import DoMoreBanner from '../components/DoMoreBanner';
import CryptographyBanner from '../components/CryptographyBanner';
import PricingBanner from '../components/PricingBanner'
import DesignBanner from '../components/DesignBanner';

function App() {
  return (
    <div className="App-root">
      <Box width="100%">
        <Header />
        <Box>
          <TitleBanner />
          <DoMoreBanner />
          <CryptographyBanner />
          <PricingBanner />
          <DesignBanner />
        </Box>
      </Box>
    </div>
    
  );
}

export default App;

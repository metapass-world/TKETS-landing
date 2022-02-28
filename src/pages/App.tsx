import './App.css';
import Box from '@material-ui/core/Box'
import Header from '../components/Header'
import TitleBanner from '../components/TitleBanner';
import DoMoreBanner from '../components/DoMoreBanner';
import CryptographyBanner from '../components/CryptographyBanner';
import PricingBanner from '../components/PricingBanner'
import DesignBanner from '../components/DesignBanner';
import TeamBanner from '../components/TeamBanner';
import YoutubeBanner from '../components/YoutubeBanner';

function App() {
  return (
    <div className="App-root">
      <Box width="100%">
        <Header />
        <Box>
          <TitleBanner />
          <YoutubeBanner />
          <DoMoreBanner />
          <CryptographyBanner />
          <PricingBanner />
          <TeamBanner />
          <DesignBanner />
        </Box>
      </Box>
    </div>
    
  );
}

export default App;

import React from 'react'
import Margin from '../../hooks'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import YoutubeEmbed from '../YoutubeEmbed';

function YoutubeBanner() {
  return (
    <Box>
      <Margin>
        <Box maxWidth={800} style={{margin: 'auto'}}>
          <YoutubeEmbed embedId="ujnxYCHKJko" />
        </Box>
      </Margin>
    </Box>
    
    
  )
}

export default YoutubeBanner

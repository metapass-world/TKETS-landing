import React from "react";
import './index.css';

interface YoutubeEmbedProps {
  embedId: string
}

const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{borderRadius: 20}}
    />
  </div>
);

export default YoutubeEmbed;
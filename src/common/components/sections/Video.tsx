import { Type_Video } from "@common/types/Type_Video";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import ReactPlayer from "react-player";

const VideoSection = ({ section }: { section: Type_Video }) => {
  const { title, video, body, footer } = section.fields;
  console.log(video);
  return (
    <div className="video-section">
      <div className="wrapper">
        <div className="video">
          <ReactPlayer
            playing
            controls
            width="217px"
            height="250px"
            url={`${video.fields.file.url}`}
          />
        </div>
        <div className="copy">
          <p className="title">{title}</p>
          <h5 className="body">{body}</h5>
          <div className="footer-wrapper">
            <p className="footer">{footer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

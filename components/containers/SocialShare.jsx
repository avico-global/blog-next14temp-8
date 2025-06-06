// components/SocialShare.js
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const SocialShare = ({ url, title }) => {
  return (
    <div className="flex items-center gap-3 mt-3">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={37}   />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={37} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={37}  />
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShare;

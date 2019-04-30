import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

export default (props) => (
  <div className="footer">
    <a href="https://github.com/Kirill255/react-email-confirm">
      <div className="footer__logo">
        <FontAwesomeIcon icon={faGithub} size="3x" color="#fff" />
      </div>
    </a>
  </div>
);

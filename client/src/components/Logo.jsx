import React from "react";

import "./Logo.css";

function Logo(props) {
  return (
    <div className="logo">
      {!props.noIcon && <img src="/logo_bud-green.svg" alt="loyaltree logo" />}
      {!props.noText && (
        <p>
          loyal<span>tree</span>
        </p>
      )}
    </div>
  );
}

export default Logo;

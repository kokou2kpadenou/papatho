import React from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./emoji.css";

export default ({ addEmoji }) => (
  <Picker
    color="#ff0000"
    emojiSize={22}
    emoji=""
    title="Pick your emoji…"
    style={{
      position: "absolute",
      left: "0px",
      bottom: "100%",
      zIndez: "100"
    }}
    onSelect={emoji => {
      addEmoji(emoji.native);
    }}
  />
);

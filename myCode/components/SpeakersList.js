import { data } from "../SpeakerData";
import { useState } from "react";
import Speaker from "./Speaker";

function SpeakersList({ showSessions }) {
  const [speakers, setSpeakers] = useState(data);

  function onFavoriteToggle(id) {
    const currentSpeaker = speakers.find((speaker) => speaker.id === id);
    const updatedSpeaker = {
      ...currentSpeaker,
      favorite: !currentSpeaker.favorite,
    };
    const updatedSpeakers = speakers.map((speaker) => {
      return speaker.id === id ? updatedSpeaker : speaker;
    });
    setSpeakers(updatedSpeakers);
  }

  return (
    <div className="container speakers-list">
      <div className="row">
        {speakers.map((speaker) => {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSessions={showSessions}
              onFavoriteToggle={() => onFavoriteToggle(speaker.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SpeakersList;

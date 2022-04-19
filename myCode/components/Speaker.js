import { useContext, useState } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";
import SpeakerDelete from "./SpeakerDelete";

function Session({ title, room }) {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room}</strong>
    </span>
  );
}

function Sessions() {
  const { eventYear } = useContext(SpeakerFilterContext);
  const { speaker } = useContext(SpeakerContext);
  return (
    <div className="sessionBox card h-250">
      {speaker.sessions
        .filter((session) => session.eventYear === eventYear)
        .map((session) => (
          <Session title={session.title} room={session.room.name} />
        ))}
    </div>
  );
}

function ImageWithFallback({ src, ...props }) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  function onError() {
    if (!error) {
      setImgSrc("/images/speaker-99999.jpg");
      setError(true);
    }
  }

  return <img src={imgSrc} {...props} onError={onError} />;
}

function SpeakerImage() {
  const {
    speaker: { id, first, last },
  } = useContext(SpeakerContext);
  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <ImageWithFallback
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
}

function SpeakerFavorite() {
  const { speaker, updateRecord } = useContext(SpeakerContext);
  const { favorite } = speaker;
  const [isUpdating, setIsUpdating] = useState(false);
  function doneCallback() {
    console.log(
      `In SpeakerFavorite:doneCallback   ${new Date().getMilliseconds()}`
    );
    setIsUpdating(false);
  }

  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setIsUpdating(true);
          updateRecord(
            { ...speaker, favorite: !speaker.favorite },
            doneCallback
          );
        }}
      >
        <i className={favorite ? "fa fa-star orange" : "fa fa-star-o orange"} />{" "}
        Favorite{" "}
        {isUpdating ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
}

function SpeakerDemographics() {
  const { speaker } = useContext(SpeakerContext);
  const { first, last, bio, company, twitterHandle, favorite } = speaker;
  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">
          {bio} {favorite}
        </p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

function Speaker({ speaker, updateRecord, insertRecord, deleteRecord }) {
  const { showSessions } = useContext(SpeakerFilterContext);

  return (
    <SpeakerProvider
      speaker={speaker}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-12 col-md-6 col-lg-4">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions ? <Sessions /> : null}
        <SpeakerDelete />
      </div>
    </SpeakerProvider>
  );
}

export default Speaker;

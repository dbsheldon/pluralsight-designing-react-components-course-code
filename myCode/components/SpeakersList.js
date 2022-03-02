import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import { useRequestDelay, REQUEST_STATUS } from "../hooks/useRequestDelay";
import { data } from "../SpeakerData";

function SpeakersList({ showSessions }) {
  const {
    data: speakers,
    requestStatus,
    error,
    updateRecord,
  } = useRequestDelay(2000, data);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container speakers-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <div className="row">
          {speakers.map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={(doneCallback) =>
                  updateRecord(
                    { ...speaker, favorite: !speaker.favorite },
                    doneCallback
                  )
                }
              />
            );
          })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default SpeakersList;

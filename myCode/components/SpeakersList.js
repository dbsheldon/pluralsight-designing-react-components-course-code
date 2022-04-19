import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import { useRequestRest, REQUEST_STATUS } from "../hooks/useRequestRest";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
  const {
    data: speakers,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();
  const { eventYear, searchQuery } = useContext(SpeakerFilterContext);

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
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakers
            .filter((speaker) => {
              return (
                speaker.first.toLowerCase().includes(searchQuery) ||
                speaker.last.toLowerCase().includes(searchQuery)
              );
            })
            .filter((speaker) =>
              speaker.sessions.find(
                (session) => session.eventYear === eventYear
              )
            )
            .map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default SpeakersList;

import { data } from "../SpeakerData";
import SpeakersList from "../components/SpeakersList";
import Header from "./Header";
import SpeakersToolbar from "./SpeakersToolbar";

function Speakers() {
  return (
    <div className="container-fluid">
      <SpeakersList data={data} />
    </div>
  );
}

export default Speakers;

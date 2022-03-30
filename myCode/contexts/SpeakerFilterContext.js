import useSpeakerFilter from "../hooks/useSpeakerFilter";
import { createContext } from "react";

const SpeakerFilterContext = createContext();

function SpeakerFilterProvider({
  children,
  startingShowSessions = false,
  startingEventYear = "2019",
}) {
  const {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    EVENT_YEARS,
    searchQuery,
    setSearchQuery,
  } = useSpeakerFilter(startingShowSessions, startingEventYear);

  return (
    <SpeakerFilterContext.Provider
      value={{
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        EVENT_YEARS,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </SpeakerFilterContext.Provider>
  );
}

export { SpeakerFilterContext, SpeakerFilterProvider };

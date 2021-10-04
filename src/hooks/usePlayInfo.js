import { BASE_URL } from "assets/data/consts";
import axios from "axios";
import { TokenContext } from "providers/TokenProvider";
import { useState, useEffect, useContext } from "react";
import { PLACEHOLDER_CONTENT_URL } from "assets/data/consts";

const URL = `${BASE_URL}/Media/GetMediaPlayInfo`;

export const usePlayInfo = ({ mediaId, streamType = "TRIAL" }) => {
  const requestBody = {
    MediaId: mediaId,
    StreamType: streamType,
  };

  const { token } = useContext(TokenContext);

  const [error, setError] = useState(null);
  const [contentURL, setContentURL] = useState(null);

  useEffect(() => {
    axios
      .post(
        URL,
        { ...requestBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setContentURL(data.ContentUrl ?? PLACEHOLDER_CONTENT_URL);
      })
      .catch((e) => setError(e));
  }, []);

  return { error, contentURL };
};

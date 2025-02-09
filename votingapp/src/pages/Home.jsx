import { useState, useEffect, useRef } from "react";
import * as fetchOptions from "../utils/fetchOptions.jsx";
import VoteResults from "../components/voteResults.jsx";
import { Alert } from "react-bootstrap";
import Loader from "../components/loader.jsx";

function Home() {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retryCount = useRef(3);
  const timeoutRef = useRef(null);

  const fetchData = async () => {
    // console.log("Retry attempts left:", retryCount.current);
    if (retryCount.current <= 0) {
      console.log("Max retries reached. Stopping fetch.");
      return;
    }

    const response = await fetchOptions.getOptions(
      "127.0.0.1",
      "5000",
      "api/votes"
    );

    if (response.error) {
      retryCount.current -= 1;
      setError(`Attempt ${retryCount.current}: ${response.error.toString()}`);
      setLoading(false);
      if (retryCount.current <= 0) {
        console.log("Max retries reached. Stopping fetch.");
      }
    } else {
      retryCount.current = 3; // Reset retries on success
      setOptions(response);
      setError(null);
      setLoading(false);
    }

    if (retryCount.current > 0) {
      timeoutRef.current = setTimeout(fetchData, 1000);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  if (loading) return Loader;
  if (error)
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );

  return (
    <>
      <VoteResults options={options} />
    </>
  );
}

export default Home;

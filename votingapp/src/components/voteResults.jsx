import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.jsx";

import {
  Card,
  ListGroup,
  Form,
  Button,
  Container,
  Alert,
} from "react-bootstrap";

const VoteResults = ({ options }) => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Check if the user has already voted from localStorage
  useEffect(() => {
    if (!user) {
      //  user logs out we set user to null .trigger rerender
      setSelectedOption(null);
      setHasVoted(false);
      setErrorMessage(null);
      setSuccessMessage(null);
    } else {
      const votedOption = localStorage.getItem("user.voted");
      if (votedOption) {
        setHasVoted(true);
        setSelectedOption(votedOption);
      }
    }
  }, [user]);

  const handleVote = async () => {
    if (!selectedOption) {
      setErrorMessage("Please select an option to vote.");
      return;
    }

    try {
      // Send the vote to the backend with JWT token in the Authorization header
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${user.token}`, // Get token from local storage
        },
        body: JSON.stringify({ option: selectedOption }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(errorText || "Error casting vote");
      } else {
        setSuccessMessage("Vote casted successfully!");
        setHasVoted(true);
        localStorage.setItem("user.voted", selectedOption); // Store voted option in localStorage
      }
    } catch (err) {
      setErrorMessage("Failed to cast vote. Please try again later.");
      console.error("Vote casting error:", err);
    }
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-3">
            Current Votes for Options
          </Card.Title>
          <ListGroup variant="flush">
            {Object.entries(options).map(([key, value]) => (
              <ListGroup.Item
                key={key}
                className="d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{key}</strong>{" "}
                  <span className="badge bg-primary">{value}</span>
                </span>

                {user && !hasVoted && (
                  <Form.Check
                    type="radio"
                    name="vote"
                    checked={selectedOption === key}
                    onChange={() => setSelectedOption(key)}
                    label="Vote"
                  />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {user && !hasVoted && (
            <div className="text-center mt-3">
              <Button
                variant="success"
                onClick={handleVote}
                disabled={!selectedOption || hasVoted}
              >
                {hasVoted ? "Vote Casted" : "Cast Vote"}
              </Button>
            </div>
          )}

          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" className="mt-3">
              {successMessage}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VoteResults;

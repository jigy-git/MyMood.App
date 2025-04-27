import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import { MoodService } from '../../services/mood/mood.service';
import { Mood } from '../../services/mood/mood.dto';
import { useMoods } from '../../contexts/mood.context';
import { useAuth } from '../../contexts/auth.context';

const MoodSubmission: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]); 
  const [selectedMoodId, setSelectedMoodId] = useState<number | null>(null); 
  const [comment, setComment] = useState<string>(''); 
  const [notes, setNotes] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const { availableMoods } = useMoods();// Use context to get available moods and selected mood
  const { isAuthenticated, userId } = useAuth(); // Destructure state from context
  
  useEffect(() => {  
    setMoods(availableMoods);
  }, [availableMoods]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isAuthenticated && selectedMoodId) {
      try {
        const response = await MoodService.submitMood(userId ?? -1, selectedMoodId, comment);
  
        if (response.id.isSuccess) {
          // Display notes for the selected mood after successful submission
          const selectedMood = moods.find((mood) => mood.id === selectedMoodId);
          setNotes(selectedMood?.notes ?? '');
          setErrorMessage(null); // Clear any previous error messages
        } else {
          // If submission fails (isSuccess is false), show the error message
          setErrorMessage(response.id.errorMessage || 'Failed to submit mood. Please try again later.');
        }
      } catch (error) {
        setErrorMessage('Error submitting mood. Please try again later.');
        console.error('Error submitting mood:', error);
      }
    } else {
      setErrorMessage('Please select a mood and enter a comment.');
    }
  };
  

  return (
    <div className="d-flex flex-column justify-content-start" style={{ height: '30vh', paddingLeft: '10%', paddingTop: '5%' }}>
      <div className="w-60">
       <h2 className="mb-4 pb-4">Today's Mood</h2>
      <Form onSubmit={handleSubmit} className="w-60">
        {/* Mood Dropdown */}
         <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={1}> {/* Remove bottom margin */}
            Select Mood
          </Form.Label>
          <Col xs={8}>
            <DropdownButton
              id="moodDropdown"
              title={selectedMoodId ? moods.find((mood) => mood.id === selectedMoodId)?.moodName : 'Select Mood'}
              onSelect={(moodId) => {
                setSelectedMoodId(moodId ? parseInt(moodId) : null);
                setErrorMessage(null); // Reset error message on selection
              }}
            >
              {moods.map((mood) => (
                <Dropdown.Item key={mood.id} eventKey={mood.id.toString()}>
                  {mood.moodName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Form.Group>

        {/* Comment input */}
         <Form.Group as={Row} className="mb-3">
         <Form.Label column xs={1}> 
            Comment
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter your mood comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '40%'}}
            />
          </Col>
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit" className="w-auto mx-auto">
          Submit Mood
        </Button>
      </Form>

      {errorMessage && (
        <div
          className="alert alert-danger mt-3"
          style={{ width: '50%' }}
        >
          {errorMessage}
        </div>
      )}
    
      <div className="mt-3">        
        <p>{notes}</p>
      </div>
      </div>
     
    </div>
  );
};

export default MoodSubmission;

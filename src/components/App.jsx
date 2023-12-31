import React from 'react';
import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOpions';
import Notification from './Notification/Notification';
import Statistics from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countPositiveFeedbacksPercentage = () => {
    if (countTotalFeedbacks() === 0) {
      return 0;
    }
    return Math.round((good / countTotalFeedbacks()) * 100);
  };

  const countTotalFeedbacks = () => {
    let total = good + neutral + bad;
    return total;
  };

  const handleLeaveFeedback = e => {
    const { name } = e.target;
    switch (name) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const options = ['good', 'neutral', 'bad'];
  const total = countTotalFeedbacks();
  const positiveFeedbacks = countPositiveFeedbacksPercentage();

  return (
    <div>
      <Section title="Please leave feedback" />
      <FeedbackOptions
        options={options}
        onLeaveFeedback={handleLeaveFeedback}
      />
      <Section title="Statistics" />
      {total === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positiveFeedbacks}
        />
      )}
    </div>
  );
};

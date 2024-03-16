import { useState } from 'react'
import './App.css'

const cardPairs = [
  { 
    question: 'What is binary?', 
    answer: 'Binary is a number system that only uses two digits: 0 and 1.', 
    image: 'https://www.lifewire.com/thmb/wVyez41W-qWD7AB--Qy43z0FyTM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-binary-and-how-does-it-work-4692749-1-1eaec2e636424e71bb35419ef8d5005b.png', 
    difficulty: 'Easy',  
  },
  { 
    question: 'What is an algorithm?', 
    answer: 'An algorithm is a set of instructions for accomplishing a task.', 
    image: 'https://media.gcflearnfree.org/content/5be1de13686707122ccd266f_11_06_2018/algorithms_illustration.jpg', 
    difficulty: 'Easy',  
  },
  { 
    question: 'What is a data structure?', 
    answer: 'A data structure is a particular way of organizing data in a computer so that it can be used effectively.', 
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Dyu63sMUVL-gYEZISOE2BQ.jpeg', 
    difficulty: 'Medium',  
  },
  { 
    question: 'What is Big O notation?', 
    answer: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.', 
    image: 'https://cdn-media-1.freecodecamp.org/images/1*KfZYFUT2OKfjekJlCeYvuQ.jpeg', 
    difficulty: 'Medium',  
  },
  { 
    question: 'What is a hash table?', 
    answer: 'A hash table, also known as a hash map, is a data structure that implements an associative array abstract data type, a structure that can map keys to values.', 
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*l9eCykFTYwvLZgy62id5Ag.png', 
    difficulty: 'Easy',  
  },
  { 
    question: 'What is recursion in programming?', 
    answer: 'Recursion in programming is a method where the solution to a problem depends on solutions to smaller instances of the same problem.', 
    image: 'https://www.masaischool.com/blog/content/images/size/w2000/2023/01/recursion.png', 
    difficulty: 'Hard',  
  },
  { 
    question: 'What is a deadlock in operating systems?', 
    answer: 'A deadlock is a situation where in a system, different processes are unable to proceed because each is waiting for the other to release resources.', 
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2015/06/deadlock.png', 
    difficulty: 'Hard',  
  },
  { 
    question: 'What is a Turing machine?', 
    answer: 'A Turing machine is a mathematical model of computation that defines an abstract machine, which manipulates symbols on a strip of tape according to a table of rules.', 
    image: 'https://images.newscientist.com/wp-content/uploads/2016/06/29180000/crmt0d.jpg?width=900', 
    difficulty: 'Hard',  
  },
  { 
    question: 'What is P vs NP problem?', 
    answer: 'P vs NP is a major unsolved problem in computer science. It asks whether every problem whose solution can be quickly checked by a computer can also be quickly solved by a computer.', 
    image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*5hGX6TN4bUEZX0FpMxZHfQ.png', 
    difficulty: 'Hard',  
  },
  { 
    question: 'What is quantum computing?', 
    answer: 'Quantum computing is a type of computation that utilizes quantum mechanics to perform computational tasks.', 
    image: 'https://iotbusinessnews.com/WordPress/wp-content/uploads/2023/11/quantum-computing.jpg', 
    difficulty: 'Hard',  
  },
];

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  const currentCard = cardPairs[currentCardIndex];

  const handleNextCard = () => {
    const newIndex = (currentCardIndex + 1) % cardPairs.length;
    setCurrentCardIndex(newIndex);
    setIsFlipped(false);
    setUserInput('');
    setCorrectAnswer(false);
  };

  const handlePreviousCard = () => {
    const newIndex = (currentCardIndex - 1 + cardPairs.length) % cardPairs.length;
    setCurrentCardIndex(newIndex);
    setIsFlipped(false);
    setUserInput('');
    setCorrectAnswer(false);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = () => {
    const formattedUserInput = userInput.trim().toLowerCase();
    const formattedAnswer = currentCard.answer.trim().toLowerCase();
    if (formattedUserInput === formattedAnswer || formattedUserInput.includes(formattedAnswer)) {
      setCorrectAnswer(true);
      setStreak({ ...streak, current: streak.current + 1 });
      if (streak.current >= streak.longest) {
        setStreak({ ...streak, longest: streak.current + 1 });
      }
    } else {
      setCorrectAnswer(false);
      setStreak({ ...streak, current: 0 });
    }
  };

  const handleShuffle = () => {
    // Shuffle cardPairs array
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    setCurrentCardIndex(0);
    setUserInput('');
    setCorrectAnswer(false);
    setStreak({ current: 0, longest: streak.longest });
  };

  return (
    <div className="app">
      <h1>Computer Science questions set</h1>
      <h2>Explore a comprehensive array of Computer Science questions tailored to challenge and enhance your understanding of fundamental concepts and advanced topics alike.</h2>
      <p>Number of questions: 10</p>
      <div className="card-container">
        <div className={`card ${isFlipped ? 'is-flipped' : ''} ${currentCard.difficulty}`} onClick={handleCardClick}>
          <div className="card-inner">
            <div className="card-face card-front">
              <p>Difficulty: {currentCard.difficulty}</p>
              <p>{currentCard.question}</p>
              <img src={currentCard.image} alt={currentCard.question} />
            </div>
            <div className="card-face card-back">
              <h2>Answer:</h2>
              <p>{currentCard.answer}</p>
            </div>
          </div>
        </div>
        <div className="input-container">
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter your guess" />
          <button onClick={handleSubmit}>Submit</button>
          {correctAnswer && <p className="correct-answer">Correct!</p>}
          {!correctAnswer && correctAnswer !== null && <p className="incorrect-answer">Incorrect. Try again!</p>}
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePreviousCard}>Previous</button>
          <button onClick={handleNextCard}>Next</button>
          <button onClick={handleShuffle}>Shuffle</button>
        </div>
      </div>
      <div className="streak-count">
        <p>Current Streak: {streak.current}</p>
        <p>Longest Streak: {streak.longest}</p>
      </div>
    </div>
  );
};

export default App;

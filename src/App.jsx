// import React, { useState, useCallback, useEffect } from "react";
// import yes from "./videos/yes.mp4";
// import no from "./videos/no.mp4";
// import jumpingVideo from "./videos/mario.mp4"; // Background video
// import quizVideo from "./videos/hdfc.mp4"; // First video before quiz

// const questions = [
//   {
//     question: "What is the main benefit of using PayZapp for payments?",
//     options: [
//       "It offers cashback on all transactions",
//       "It allows instant payments securely in just one click",
//       "It automatically saves all card details on your phone",
//       "It supports only credit card payments",
//     ],
//     answer: "It allows instant payments securely in just one click",
//   },
//   {
//     question: "How does PayZapp ensure the security of your card details?",
//     options: [
//       "By storing the details on the user's phone",
//       "By encrypting the details on the website",
//       "By keeping the card details secure with HDFC Bank",
//       "By asking for a new PIN every time",
//     ],
//     answer: "By keeping the card details secure with HDFC Bank",
//   },
//   {
//     question: "What steps are required to register for PayZapp?",
//     options: [
//       "Link your bank account, set a password, and verify your email",
//       "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
//       "Provide card details, set a PIN, and verify via email",
//       "Only provide a mobile number and confirm it",
//     ],
//     answer: "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
//   },
//   {
//     question: "Which of the following services does PayZapp NOT offer?",
//     options: [
//       "Sending money to anyone in your phonebook",
//       "Paying bills and recharges anytime, anywhere",
//       "Automated recurring payments for subscriptions",
//       "Accessing deals on shopping, travel, and movies",
//     ],
//     answer: "Automated recurring payments for subscriptions",
//   },
//   {
//     question: "What is \"SmartBuy and PayZapp Partner Club\" used for?",
//     options: [
//       "Accessing discounts and deals across shopping, travel, and entertainment categories",
//       "Securing your payments further with additional authentication",
//       "Linking more payment options to your account",
//       "Generating a monthly spending report",
//     ],
//     answer: "Accessing discounts and deals across shopping, travel, and entertainment categories",
//   },
// ];

// const speakText = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   utterance.rate = 1;
//   speechSynthesis.speak(utterance);
// };

// const App = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [videoSrc, setVideoSrc] = useState(quizVideo);
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [playingFeedback, setPlayingFeedback] = useState(false);
//   const [score, setScore] = useState(0);
//   const [answeredQuestions, setAnsweredQuestions] = useState([]);

//   useEffect(() => {
//     const videoElement = document.getElementById("mainVideo");

//     // Show questions after the quiz intro video
//     const handleVideoEnd = () => {
//       if (!playingFeedback) {
//         setVideoSrc(jumpingVideo); // Start background video
//         setShowQuestion(true);
//       } else {
//         setPlayingFeedback(false);
//         setVideoSrc(jumpingVideo); // Return to background video
//         if (currentQuestion < questions.length - 1) {
//           setCurrentQuestion(currentQuestion + 1);
//         } else {
//           setQuizCompleted(true);
//           speakText(`Quiz completed! You scored ${score} out of ${questions.length}!`);
//         }
//       }
//     };

//     videoElement.addEventListener("ended", handleVideoEnd);

//     return () => {
//       videoElement.removeEventListener("ended", handleVideoEnd);
//     };
//   }, [currentQuestion, playingFeedback, score]);

//   const handleAnswer = useCallback((option) => {
//     if (answeredQuestions.includes(currentQuestion)) {
//       return; // Prevent answering the same question multiple times
//     }

//     const correct = option === questions[currentQuestion].answer;
//     setPlayingFeedback(true);
//     setVideoSrc(correct ? yes : no);
    
//     // Update answered questions
//     setAnsweredQuestions([...answeredQuestions, currentQuestion]);

//     // Update score if correct
//     if (correct) {
//       setScore(prevScore => prevScore + 1);
//     }

//     // Speak feedback
//     speakText(correct ? "Correct answer!" : "Wrong answer!");
//   }, [currentQuestion, answeredQuestions]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-gray-900">
//       {/* Video container with proper centering */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black">
//         <video
//           id="mainVideo"
//           className="absolute w-full h-full object-contain max-w-full max-h-full"
//           src={videoSrc}
//           autoPlay
//           muted
//         />
//       </div>

//       {/* Gradient overlay to ensure text readability */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30 pointer-events-none"></div>

//       {/* Header */}
//       <div className="absolute top-0 left-0 w-full p-4 bg-blue-600 bg-opacity-80 text-white z-20">
//         <h1 className="text-xl font-bold text-center">HDFC PayZapp Quiz</h1>
//         {showQuestion && !quizCompleted && (
//           <div className="absolute top-4 right-6 bg-blue-700 px-3 py-1 rounded-full text-sm font-bold">
//             Score: {score}/{questions.length}
//           </div>
//         )}
//       </div>

//       {/* Question card */}
//       {showQuestion && !quizCompleted && (
//         <div className="absolute z-20 p-6 border-2 border-blue-400 rounded-lg shadow-lg 
//                       max-w-md w-full bg-white bg-opacity-95 text-center 
//                       top-1/2 right-8 transform -translate-y-1/2
//                       transition-all duration-500 ease-in-out">
//           <h2 className="mb-6 text-xl font-bold text-blue-700">
//             Question {currentQuestion + 1}/{questions.length}
//           </h2>
//           <p className="mb-6 text-lg">
//             {questions[currentQuestion].question}
//           </p>
//           <div className="flex flex-col gap-3">
//             {questions[currentQuestion].options.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => handleAnswer(option)}
//                 disabled={answeredQuestions.includes(currentQuestion)}
//                 className={`px-4 py-3 rounded-md transition-colors duration-200 font-medium
//                           shadow-md hover:shadow-lg
//                           ${answeredQuestions.includes(currentQuestion) && option === questions[currentQuestion].answer
//                             ? 'bg-green-600 text-white' 
//                             : answeredQuestions.includes(currentQuestion)
//                               ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
//                               : 'bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-900'}`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Completion message */}
//       {quizCompleted && (
//         <div className="absolute z-20 p-8 border-2 border-green-400 rounded-lg shadow-xl 
//                       max-w-md w-full bg-white bg-opacity-95 text-center 
//                       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//                       transition-all duration-700 ease-in-out">
//           <div className="text-green-600 text-6xl mb-4">
//             {score === questions.length ? "🎉" : "🏆"}
//           </div>
//           <h1 className="text-3xl font-bold mb-3" style={{ color: score === questions.length ? '#16a34a' : '#2563eb' }}>
//             {score === questions.length ? "Perfect Score!" : "Quiz Completed!"}
//           </h1>
//           <p className="text-lg text-gray-700 mb-2">You scored:</p>
//           <p className="text-4xl font-bold mb-6" style={{ color: score === questions.length ? '#16a34a' : '#2563eb' }}>
//             {score}/{questions.length}
//           </p>
//           {score === questions.length ? (
//             <p className="text-lg text-gray-700 mb-6">Congratulations! You've successfully completed the HDFC PayZapp quiz!</p>
//           ) : (
//             <p className="text-lg text-gray-700 mb-6">Well done! Try again to get a perfect score!</p>
//           )}
//           <button 
//             onClick={() => window.location.reload()}
//             className={`px-6 py-3 text-white rounded-md transition-colors duration-200 font-bold shadow-md
//                       ${score === questions.length ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
//           >
//             Play Again
//           </button>
//         </div>
//       )}

//       {/* Progress indicator */}
//       {showQuestion && !quizCompleted && (
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-64">
//           <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
//             <div 
//               className="bg-blue-600 h-full transition-all duration-500 ease-out"
//               style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




import React, { useState, useCallback, useEffect } from "react";
import yes from "./videos/yes.mp4";
import no from "./videos/no.mp4";
import jumpingVideo from "./videos/mario.mp4"; // Background video
import quizVideo from "./videos/hdfc.mp4"; // First video before quiz

const questions = [
  {
    question: "What is the main benefit of using PayZapp for payments?",
    options: [
      "It offers cashback on all transactions",
      "It allows instant payments securely in just one click",
      "It automatically saves all card details on your phone",
      "It supports only credit card payments",
    ],
    answer: "It allows instant payments securely in just one click",
  },
  {
    question: "How does PayZapp ensure the security of your card details?",
    options: [
      "By storing the details on the user's phone",
      "By encrypting the details on the website",
      "By keeping the card details secure with HDFC Bank",
      "By asking for a new PIN every time",
    ],
    answer: "By keeping the card details secure with HDFC Bank",
  },
  {
    question: "What steps are required to register for PayZapp?",
    options: [
      "Link your bank account, set a password, and verify your email",
      "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
      "Provide card details, set a PIN, and verify via email",
      "Only provide a mobile number and confirm it",
    ],
    answer: "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
  },
  {
    question: "Which of the following services does PayZapp NOT offer?",
    options: [
      "Sending money to anyone in your phonebook",
      "Paying bills and recharges anytime, anywhere",
      "Automated recurring payments for subscriptions",
      "Accessing deals on shopping, travel, and movies",
    ],
    answer: "Automated recurring payments for subscriptions",
  },
  {
    question: "What is \"SmartBuy and PayZapp Partner Club\" used for?",
    options: [
      "Accessing discounts and deals across shopping, travel, and entertainment categories",
      "Securing your payments further with additional authentication",
      "Linking more payment options to your account",
      "Generating a monthly spending report",
    ],
    answer: "Accessing discounts and deals across shopping, travel, and entertainment categories",
  },
];

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
};

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [videoSrc, setVideoSrc] = useState(quizVideo);
  const [showQuestion, setShowQuestion] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [playingFeedback, setPlayingFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectOption, setIncorrectOption] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(Array(questions.length).fill(false));

  useEffect(() => {
    const videoElement = document.getElementById("mainVideo");

    // Show questions after the quiz intro video
    const handleVideoEnd = () => {
      if (!playingFeedback) {
        setVideoSrc(jumpingVideo); // Start background video
        setShowQuestion(true);
      } else {
        setPlayingFeedback(false);
        setVideoSrc(jumpingVideo); // Return to background video
        
        if (incorrectOption) {
          // If wrong answer, allow retry (don't advance to next question)
          setIncorrectOption(null);
        } else {
          // If correct answer, advance to next question
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            // Check if all questions are answered correctly
            if (answeredCorrectly.every(Boolean)) {
              setQuizCompleted(true);
              speakText("Congratulations! You've successfully completed the HDFC PayZapp quiz!");
            } else {
              // Find the first unanswered or incorrect question
              const nextQuestionIndex = answeredCorrectly.findIndex(answered => !answered);
              if (nextQuestionIndex !== -1) {
                setCurrentQuestion(nextQuestionIndex);
              } else {
                // This shouldn't happen, but just in case
                setQuizCompleted(true);
              }
            }
          }
        }
      }
    };

    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentQuestion, playingFeedback, incorrectOption, answeredCorrectly]);

  const handleAnswer = useCallback((option) => {
    if (playingFeedback) return; // Prevent answering during feedback video
    
    const correct = option === questions[currentQuestion].answer;
    setPlayingFeedback(true);
    
    if (correct) {
      // For correct answer
      setVideoSrc(yes);
      setScore(prevScore => prevScore + 1);
      setCorrectAnswers([...correctAnswers, currentQuestion]);
      
      // Mark this question as correctly answered
      const updatedAnswers = [...answeredCorrectly];
      updatedAnswers[currentQuestion] = true;
      setAnsweredCorrectly(updatedAnswers);
      
      speakText("Correct answer!");
    } else {
      // For incorrect answer
      setVideoSrc(no);
      setIncorrectOption(option);
      speakText("Wrong answer! Try again!");
    }
  }, [currentQuestion, correctAnswers, answeredCorrectly, playingFeedback]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Video container with proper centering */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          id="mainVideo"
          className="absolute w-full h-full object-contain max-w-full max-h-full"
          src={videoSrc}
          autoPlay
          // muted
          // loop
          // controls
        />
      </div>

      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30 pointer-events-none hidden"></div>

      {/* Header
      <div className="absolute top-0 left-0 w-full p-4 bg-blue-600 bg-opacity-80 text-white z-20">
        <h1 className="text-xl font-bold text-center">HDFC PayZapp Quiz</h1>
        {showQuestion && !quizCompleted && (
          <div className="absolute top-4 right-6 bg-blue-700 px-3 py-1 rounded-full text-sm font-bold">
            Correct: {correctAnswers.length}/{questions.length}
          </div>
        )}
      </div> */}

      {/* Question card */}
      {showQuestion && !quizCompleted && (
        <div className="absolute z-20 p-6 border-2 border-blue-400 rounded-lg shadow-lg 
                      max-w-md w-full bg-white bg-opacity-95 text-center 
                      top-1/2 right-8 transform -translate-y-1/2
                      transition-all duration-500 ease-in-out">
          <h2 className="mb-6 text-xl font-bold text-blue-700">
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p className="mb-6 text-lg">
            {questions[currentQuestion].question}
          </p>
          <div className="flex flex-col gap-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={playingFeedback || answeredCorrectly[currentQuestion] && option !== questions[currentQuestion].answer}
                className={`px-4 py-3 rounded-md transition-colors duration-200 font-medium
                          shadow-md hover:shadow-lg
                          ${answeredCorrectly[currentQuestion] && option === questions[currentQuestion].answer
                            ? 'bg-green-600 text-white cursor-not-allowed' 
                            : incorrectOption === option
                              ? 'bg-red-600 text-white'
                              : answeredCorrectly[currentQuestion]
                                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-900'}`}
              >
                {option}
              </button>
            ))}
          </div>
          
          {/* Display retry message when needed */}
          {incorrectOption && !playingFeedback && (
            <div className="mt-4 text-red-600 font-medium">
              That answer is incorrect. Please try again!
            </div>
          )}
        </div>
      )}

      {/* Completion message */}
      {quizCompleted && (
        <div className="absolute z-20 p-8 border-2 border-green-400 rounded-lg shadow-xl 
                      max-w-md w-full bg-white bg-opacity-95 text-center 
                      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      transition-all duration-700 ease-in-out">
          <div className="text-green-600 text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            Quiz Successfully Completed!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Congratulations! You've mastered all the information about HDFC PayZapp!
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 
                      transition-colors duration-200 font-bold shadow-md"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Progress indicator - shows only correctly answered questions */}
      {showQuestion && !quizCompleted && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-64">
          <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${(correctAnswers.length / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;


// import React, { useState, useCallback, useEffect } from "react";
// import yes from "./videos/yes.mp4";
// import no from "./videos/no.mp4";
// import jumpingVideo from "./videos/mario.mp4"; // Background video
// import quizVideo from "./videos/hdfc.mp4"; // First video before quiz

// const questions = [
//   {
//     question: "What is the main benefit of using PayZapp for payments?",
//     options: [
//       "It offers cashback on all transactions",
//       "It allows instant payments securely in just one click",
//       "It automatically saves all card details on your phone",
//       "It supports only credit card payments",
//     ],
//     answer: "It allows instant payments securely in just one click",
//   },
//   {
//     question: "How does PayZapp ensure the security of your card details?",
//     options: [
//       "By storing the details on the user's phone",
//       "By encrypting the details on the website",
//       "By keeping the card details secure with HDFC Bank",
//       "By asking for a new PIN every time",
//     ],
//     answer: "By keeping the card details secure with HDFC Bank",
//   },
//   {
//     question: "What steps are required to register for PayZapp?",
//     options: [
//       "Link your bank account, set a password, and verify your email",
//       "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
//       "Provide card details, set a PIN, and verify via email",
//       "Only provide a mobile number and confirm it",
//     ],
//     answer: "Enter email and mobile number, set a secret PIN, and verify using a mobile code",
//   },
//   {
//     question: "Which of the following services does PayZapp NOT offer?",
//     options: [
//       "Sending money to anyone in your phonebook",
//       "Paying bills and recharges anytime, anywhere",
//       "Automated recurring payments for subscriptions",
//       "Accessing deals on shopping, travel, and movies",
//     ],
//     answer: "Automated recurring payments for subscriptions",
//   },
//   {
//     question: "What is \"SmartBuy and PayZapp Partner Club\" used for?",
//     options: [
//       "Accessing discounts and deals across shopping, travel, and entertainment categories",
//       "Securing your payments further with additional authentication",
//       "Linking more payment options to your account",
//       "Generating a monthly spending report",
//     ],
//     answer: "Accessing discounts and deals across shopping, travel, and entertainment categories",
//   },
// ];

// const speakText = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   utterance.rate = 1;
//   speechSynthesis.speak(utterance);
// };

// const App = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [videoSrc, setVideoSrc] = useState(quizVideo);
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [playingFeedback, setPlayingFeedback] = useState(false);
//   const [score, setScore] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState([]);
//   const [incorrectOption, setIncorrectOption] = useState(null);
//   const [answeredCorrectly, setAnsweredCorrectly] = useState(Array(questions.length).fill(false));
//   const [loopVideo, setLoopVideo] = useState(false); // New state to control video looping

//   useEffect(() => {
//     const videoElement = document.getElementById("mainVideo");

//     // Set loop attribute based on video source
//     videoElement.loop = loopVideo;

//     // Show questions after the quiz intro video
//     const handleVideoEnd = () => {
//       if (videoSrc === quizVideo) {
//         // After intro video ends, switch to looping mario video
//         setVideoSrc(jumpingVideo);
//         setLoopVideo(true); // Enable looping for mario video
//         setShowQuestion(true);
//       } else if (playingFeedback) {
//         // After yes/no feedback video ends
//         setPlayingFeedback(false);
//         setVideoSrc(jumpingVideo); // Return to background video
//         setLoopVideo(true); // Enable looping for mario video
        
//         if (incorrectOption) {
//           // If wrong answer, allow retry (don't advance to next question)
//           setIncorrectOption(null);
//         } else {
//           // If correct answer, advance to next question
//           if (currentQuestion < questions.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//           } else {
//             // Check if all questions are answered correctly
//             if (answeredCorrectly.every(Boolean)) {
//               setQuizCompleted(true);
//               speakText("Congratulations! You've successfully completed the HDFC PayZapp quiz!");
//             } else {
//               // Find the first unanswered or incorrect question
//               const nextQuestionIndex = answeredCorrectly.findIndex(answered => !answered);
//               if (nextQuestionIndex !== -1) {
//                 setCurrentQuestion(nextQuestionIndex);
//               } else {
//                 // This shouldn't happen, but just in case
//                 setQuizCompleted(true);
//               }
//             }
//           }
//         }
//       }
//     };

//     videoElement.addEventListener("ended", handleVideoEnd);

//     return () => {
//       videoElement.removeEventListener("ended", handleVideoEnd);
//     };
//   }, [currentQuestion, playingFeedback, incorrectOption, answeredCorrectly, videoSrc, loopVideo]);

//   const handleAnswer = useCallback((option) => {
//     if (playingFeedback) return; // Prevent answering during feedback video
    
//     const correct = option === questions[currentQuestion].answer;
//     setPlayingFeedback(true);
//     setLoopVideo(false); // Disable looping for feedback videos
    
//     if (correct) {
//       // For correct answer
//       setVideoSrc(yes);
//       setScore(prevScore => prevScore + 1);
//       setCorrectAnswers([...correctAnswers, currentQuestion]);
      
//       // Mark this question as correctly answered
//       const updatedAnswers = [...answeredCorrectly];
//       updatedAnswers[currentQuestion] = true;
//       setAnsweredCorrectly(updatedAnswers);
      
//       speakText("Correct answer!");
//     } else {
//       // For incorrect answer
//       setVideoSrc(no);
//       setIncorrectOption(option);
//       speakText("Wrong answer! Try again!");
//     }
//   }, [currentQuestion, correctAnswers, answeredCorrectly, playingFeedback]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-gray-900">
//       {/* Video container with proper centering */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black">
//         <video
//           id="mainVideo"
//           className="absolute w-full h-full object-contain max-w-full max-h-full"
//           src={videoSrc}
//           autoPlay
//           // muted
//           // The loop attribute is now controlled by the loopVideo state via useEffect
//           // controls
//         />
//       </div>

//       {/* Gradient overlay to ensure text readability */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30 pointer-events-none"
//       ></div>

//       {/* Question card */}
//       {showQuestion && !quizCompleted && (
//         <div className="absolute z-20 p-6 border-2 border-blue-400 rounded-lg shadow-lg 
//                       max-w-md w-full bg-white bg-opacity-95 text-center 
//                       top-1/2 right-8 transform -translate-y-1/2
//                       transition-all duration-500 ease-in-out">
//           <h2 className="mb-6 text-xl font-bold text-blue-700">
//             Question {currentQuestion + 1}/{questions.length}
//           </h2>
//           <p className="mb-6 text-lg">
//             {questions[currentQuestion].question}
//           </p>
//           <div className="flex flex-col gap-3">
//             {questions[currentQuestion].options.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => handleAnswer(option)}
//                 disabled={playingFeedback || answeredCorrectly[currentQuestion] && option !== questions[currentQuestion].answer}
//                 className={`px-4 py-3 rounded-md transition-colors duration-200 font-medium
//                           shadow-md hover:shadow-lg
//                           ${answeredCorrectly[currentQuestion] && option === questions[currentQuestion].answer
//                             ? 'bg-green-600 text-white cursor-not-allowed' 
//                             : incorrectOption === option
//                               ? 'bg-red-600 text-white'
//                               : answeredCorrectly[currentQuestion]
//                                 ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
//                                 : 'bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-900'}`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
          
//           {/* Display retry message when needed */}
//           {incorrectOption && !playingFeedback && (
//             <div className="mt-4 text-red-600 font-medium">
//               That answer is incorrect. Please try again!
//             </div>
//           )}
//         </div>
//       )}

//       {/* Completion message */}
//       {quizCompleted && (
//         <div className="absolute z-20 p-8 border-2 border-green-400 rounded-lg shadow-xl 
//                       max-w-md w-full bg-white bg-opacity-95 text-center 
//                       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//                       transition-all duration-700 ease-in-out">
//           <div className="text-green-600 text-6xl mb-4">🎉</div>
//           <h1 className="text-3xl font-bold text-green-600 mb-3">
//             Quiz Successfully Completed!
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Congratulations! You've mastered all the information about HDFC PayZapp!
//           </p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 
//                       transition-colors duration-200 font-bold shadow-md"
//           >
//             Play Again
//           </button>
//         </div>
//       )}

//       {/* Progress indicator - shows only correctly answered questions */}
//       {showQuestion && !quizCompleted && (
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-64">
//           <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
//             <div 
//               className="bg-green-600 h-full transition-all duration-500 ease-out"
//               style={{ width: `${(correctAnswers.length / questions.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
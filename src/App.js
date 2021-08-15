import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";
import EmojiBoard from './EmojiBoard';

import * as fp from "fingerpose";
import iLoveYouGuesture from "./definedGestures/ILoveYou";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let count = 0
  let stopCount = 0

  console.log("reinit")
  const [emojiQueue, setEmojiQueue] = useState([]);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands

    setInterval(() => {
      detect(net);
    }, 20);
  
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          // thumbsDownGesture,
          iLoveYouGuesture
        ]);

        //8 is a high confidence level
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        // console.log(gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          console.log(gesture.gestures[maxConfidence].name);

          //Since the model keeps capturing hand movement, hence constant matching of gesture
          //the counter is used to make emoji showing more stable
          //TODO refactoring it to fire an event once stable gesture is detected
          count++;
          if(count % 5 === 0) {
            setEmojiQueue((emojiQueue) => [
              ...emojiQueue,
              {
                "label": gesture.gestures[maxConfidence].name,
              }
            ]);
          }
          if (count === 1000) {
            count = 0
          }
          
        } else {
          stopCount++;
          if (stopCount % 5 === 0) {
          //when not detecting gesture for sometime, the emoji queue is cleaned.
          //In real use case, gesture detection is a not-so–often event 
            setEmojiQueue([]);
          }
          if (stopCount === 1000) {
            stopCount = 0;
          }
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(runHandpose, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        {emojiQueue.length > 0 ? (
          <EmojiBoard emojiQueue={emojiQueue} />
        ) : (
          ""
        )}

      </header>
    </div>
  );
}

export default App;
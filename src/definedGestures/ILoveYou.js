import * as fp from "fingerpose";

const iLoveYouGesture = new fp.GestureDescription('i_love_you');

//thumb, index, pinky needs to have no curl
iLoveYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
iLoveYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
iLoveYouGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

//middle and ring finger need to be curled
iLoveYouGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
iLoveYouGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);

//index and pinky should have direction 
iLoveYouGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 0.5);
iLoveYouGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 0.5);
iLoveYouGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
iLoveYouGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.2);
iLoveYouGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.2);
iLoveYouGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);

export default iLoveYouGesture;
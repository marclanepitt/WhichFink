/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Time = require('Time')


// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
const friendsList = ['marc', 'naomi', 'ian', 'matt', 'jb', 'jack', 'walsh', 'kyle', 'elijah', 'alec', 'josh', 'danny'];
const friendsMap = generateMaterialMap(friendsList);

const three = Materials.get('three');
const two = Materials.get('two');
const one = Materials.get('one');

const text = Scene.root.find('finishtext');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');

const myPlane = Scene.root.find('plane0');

let numberArray = [one, two, three];
countdown(numberArray, shuffleAndChoose);

function shuffleAndChoose() {
  let iterations = 0;
  let interval = Time.setInterval(() => {
    let keys = Object.keys(friendsMap);
    let randomKey = Math.floor(Math.random() * keys.length);
    myPlane.material = friendsMap[keys[randomKey]];
    if(iterations === 50) {
      Time.clearInterval(interval);
      text.hidden = false;
      text.text = `Congrats! You are ${keys[randomKey]}!`;
    }
    iterations++;
  }, 100);
}

function countdown(numberArray, callback) {
  if(numberArray.length == 0) {
    callback();
  } else {
    Time.setTimeout(() => {
      myPlane.material = numberArray[numberArray.length - 1];
      numberArray.pop();
      countdown(numberArray, callback);
    }, 1000);
  }
}

function generateMaterialMap(friendsList) {
  let map = {};
  for (let friend of friendsList) {
    map[friend] = Materials.get(friend);
  }
  return map;
}
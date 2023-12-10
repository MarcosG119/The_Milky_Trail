const gameLogElement = document.getElementById('gameLog');
const crewCreationElement = document.getElementById('crewCreation');
let crewMembers = [];
let distanceTraveled = 0;
let fuel = 500; // Initial fuel amount

function logMessage(message) {
  setTimeout(() => {}, 2000);
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  gameLogElement.appendChild(messageElement);

}

function startJourney() {
  crewCreationElement.style.display = 'block';
  gameLogElement.innerHTML = '';
  crewMembers = [];
  distanceTraveled = 0;
  fuel = 500;
}

function setCrewNames() {
  const crewMember1 = document.getElementById('crewMember1').value;
  const crewMember2 = document.getElementById('crewMember2').value;
  const crewMember3 = document.getElementById('crewMember3').value;
  const crewMember4 = document.getElementById('crewMember4').value;

  if (crewMember1 && crewMember2 && crewMember3 && crewMember4) {
    crewMembers = [crewMember1, crewMember2, crewMember3, crewMember4];
    crewCreationElement.style.display = 'none';
    simulateJourney();
  } else {
    alert('Please enter names for all crew members.');
  }
}

function handleSpacePirates() {
    logMessage('Space pirates are approaching. What will you do?');
  
    const fightChoice = confirm('Do you want to fight the space pirates? Choosing "Cancel" will not fight.');
  
    if (fightChoice) {
      // User chose to fight
      const victory = Math.random() > 0.5;
  
      if (victory) {
        logMessage('You successfully fought off the space pirates and continue your journey.');
        continueTravel();
      } else {
        logMessage('You lost the fight against the space pirates.');
        removeRandomCrewMember();
        if (crewMembers.length <= 0) {
          logMessage('All crew members are captured. Game over.');
        } else {
          logMessage(`You have ${crewMembers.length} crew members remaining.`);
          continueTravel();
        }
      }
    } else {
      // User chose not to fight
      const escapeSuccess = Math.random() > 0.3;
  
      if (escapeSuccess) {
        logMessage('You chose not to fight. You successfully escaped the space pirates.');
        fuel -= 200; // Deduct fuel for escaping
        logMessage(`Remaining fuel: ${fuel} units.`);
        continueTravel();
      } else {
        logMessage('You chose not to fight, but the space pirates caught up. Prepare to defend!');
        const victory = Math.random() > 0.5;
  
        if (victory) {
          logMessage('You successfully fought off the space pirates and continue your journey.');
          continueTravel();
        } else {
          logMessage('You lost the fight against the space pirates.');
          removeRandomCrewMember();
          if (crewMembers.length <= 0) {
            logMessage('All crew members are captured. Game over.');
          } else {
            logMessage(`You have ${crewMembers.length} crew members remaining.`);
            continueTravel();
          }
        }
      }
    }
  }
  

function haveCrewBaby() {
    const babyName = prompt('Congratulations! It\'s a baby! Please enter a name for the baby:');
  
    if (babyName) {
      logMessage(`The baby is named ${babyName} and joins your crew.`);
      crewMembers.push(babyName);
    } else {
      logMessage('You decide not to name the baby, but they still join your crew.');
      crewMembers.push('Unnamed Baby');
    }
  
    logMessage(`You now have ${crewMembers.length} crew members.`);
    continueTravel();
  }




function handleAsteroidField() {
  logMessage('You encountered an asteroid field.');

  const choice = confirm('Do you want to go around the asteroid field? Choosing "Cancel" will go through it.');

  if (choice) {
    logMessage('You decided to go around the asteroid field, using more fuel.');
    fuel -= 100; // Deduct more fuel for going around
  } else {
    logMessage('You decided to go through the asteroid field.');
  }

  const success = Math.random() > 0.3;

  if (success) {
    logMessage('You safely navigated through the asteroid field.');
    continueTravel();
  } else {
    logMessage('Your spaceship sustained damage from the asteroids.');
    removeRandomCrewMember();
    if (crewMembers.length <= 0) {
      logMessage('Your spaceship was critically damaged. Game over.');
    } else {
      logMessage(`You have ${crewMembers.length} crew members remaining.`);
      continueTravel();
    }
  }
}

function refuelAtPlanet() {
    const refuelSuccess = Math.random() > 0.2;
    fuel = 1000; // Fully replenish fuel
  
    if (refuelSuccess) {
      logMessage('You successfully refueled at the planet. Your fuel is fully replenished.');
    } else {
      logMessage('After refueling, space pirates attack!');
      const victory = Math.random() > 0.5;
  
      if (victory) {
        logMessage('You defeated the space pirates and continue your journey.');
      } else {
        logMessage('You lost the fight against the space pirates.');
        removeRandomCrewMember();
        if (crewMembers.length <= 0) {
          logMessage('All crew members are captured. Game over.');
          return;
        } else {
          logMessage(`You have ${crewMembers.length} crew members remaining.`);
        }
      }
    }
  
    // Higher chance of being attacked by pirates upon leaving the planet
    const leavingEventChance = Math.random();
  
    if (leavingEventChance < 0.7) {
      handleSpacePirates();
    } else {
      logMessage('You leave the planet without encountering any further events.');
      continueTravel();
    }
  }


function continueTravel() {
  distanceTraveled += 100;
  logMessage(`You've traveled ${distanceTraveled} light-years.`);
  fuel -= 50; // Deduct a fixed amount of fuel for each travel
  logMessage(`Remaining fuel: ${fuel} units.`);

  if (fuel <= 0) {
    logMessage('You ran out of fuel. Game over.');
    return;
  }

  if (distanceTraveled >= 1000) {
    logMessage('Congratulations! You completed your space journey.');
  } else {
    simulateJourney();
  }
}

function removeRandomCrewMember() {
  const randomIndex = Math.floor(Math.random() * crewMembers.length);
  const removedMember = crewMembers.splice(randomIndex, 1)[0];
  logMessage(`${removedMember} has died.`);
}



function simulateJourney() {

    const eventChance = Math.random();
  
    if (eventChance < 0.05) {
      // New event: Two crew members have a baby
      logMessage('Two of your crew members are expecting a baby!');
      haveCrewBaby();
    } else if (eventChance < 0.1) {
      // Refueling station event
      logMessage('You encounter a planet with a refueling station!');
      refuelAtPlanet();
    } else if (eventChance < 0.2) {
      // Previous events remain unchanged
      handleSpacePirates();
    } else if (eventChance < 0.3) {
      handleAsteroidField();
    } else {
      continueTravel();
    }
  }
  

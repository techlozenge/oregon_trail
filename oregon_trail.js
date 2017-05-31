(function(){

    'use strict';

    // **************[ TRAVELER ]************** //
    // A traveler has a few properties: an amount of food (number), a name (string), and an isHealthy (boolean).
    function Traveler(name){
        // private internals...
        var name = name;
        var food = 0;
        var isHealthy = true;
        // getters...
        this.getName = function() {
            return name;
        }
        this.getFood = function() {
            return food;
        }
        this.getHealth = function() {
            return isHealthy;
        }
        // setters...
        this.setName = function(newName) {
            name = newName;
        }
        this.setFood = function (newFood) {
            food = newFood;
        }
        this.setHealth = function(newHealth) {
            isHealthy = newHealth;
        }
    } // end Traveler

    // **************[ WAGON ]************** //
    // A wagon has a few properties as well: a passengers list (array) and a capacity (number).
    function Wagon(capacity) {
        // private internal variables...
        var capacity = capacity;      // if capacity is exceeded no new passengers can be added
        var passengers = [];          // what Travelers are on the wagon
        // getters...
        this.getPassengers = function() {
            return passengers;
        }
        this.getCapacity = function() {
            return capacity;
        }
        // setters...
        this.setPassenger = function(newPassenger) {
            console.log("    setPassenger: passengers=" + passengers.length + " capacity=" + capacity);
            if (passengers.length <= capacity) {
                passengers.push(newPassenger);   // welcome aboard, traveler!
                console.log("    setPassenger: passengers=" + passengers.length);
            } else {
                console.log("    The wagon is full so " + newPassenger.name + " is screwed");
            }
        }
        this.setCapacity = function (newCapacity) {
            capacity = newCapacity;
        }
    } // end wagon

    // **********************[ MAKER METHODS ]********************** //

    // Create a new traveler object with the specified name, a random amount of food, and isHealthy = true.
    function makeTraveler(name) {
        let traveler = new Traveler(name);
        traveler.setFood(50);
        traveler.setHealth(true);
        return traveler;
    }

    // Create a new wagon with an empty passenger list and the specified capacity.
    function makeWagon(capacity) {
        let wagon = new Wagon(capacity);   // sets capacity for wagon that cannot be exceeded!
        return wagon;
    }

    // **********************[ METHODS FOR PASSENGER AND WAGON ACTIVITIES ]********************** //

    // 50% chance to increase the traveler's food by 100 (successful hunt), and
    // 50% to increase it by 0 (unsuccessful hunt).
    function hunt(traveler) {
        if (Math.round(Math.random()) == 1) {
            traveler.setFood(traveler.getFood() + 100);
        }
    }

    // Consumes 20 of the traveler's food.
    // If the traveler doesn't have 20 food, the traveler is no longer healthy.
    function eat(traveler) {
        traveler.setFood(traveler.getFood() - 20);
        if (traveler.getFood() < 20) {
            traveler.setHealth(false);
        }

        // NOTE: Not sure which logic is the correct.
        // if (traveler.getFood() < 20) {
        //     traveler.setHealth(false);
        // } else {
        //     traveler.setFood(traveler.getFood() - 20);
        // }
    }

    // Add the traveler to the wagon if there is space. If there is not enough capacity, don't add them.
    function join(wagon, passenger) {
        wagon.setPassenger(passenger);
    }

    // Return true if there is at least one unhealthy person in the wagon. Return false if not.
    function quarantine(wagon) {
        let wagonPassengers = wagon.getPassengers();
        for (let i = 0; i < wagonPassengers.length; i++) {
            //console.log(wagonPassengers[i].getName() + " health is " + wagonPassengers[i].getHealth());
            if (!wagonPassengers[i].getHealth()) {
                console.log("Quartine the wagon and prepare for a slow painful death!!!");
                return true; // if the traveler is not healthy return true
            }
        }
        console.log("This wagon is going to Oregon!!!");
        return false;        // all of the travelers are in the pink!
    }

    // Return the total amount of food among all occupants of the wagon.
    function food(wagon) {
        let ourFood = 0;
        let wagonPassengers = wagon.getPassengers();
        for (let i = 0; i < wagonPassengers.length; i++) {
            console.log(wagonPassengers[i].getName() + "'s Food is " + wagonPassengers[i].getFood());
            ourFood = ourFood + wagonPassengers[i].getFood();
        }
        return ourFood;
    }


    // **************************[ EXECUTION ]************************** //

    // The following code should work once you are finished:
    console.log("======================= START =======================");
    console.log(" ");


    // Create a wagon called 'wagon'
    let wagon = makeWagon(5);
    console.log("Created a new Wagon. The number of passengers this wagon can hold is " + wagon.getCapacity());
    console.log(" ");


    // Create a traveler with the name 'Henrietta' called 'traveler'
    let traveler = makeTraveler('Henrietta');
    console.log("There is a new Traveler named " + traveler.getName());
    console.log(traveler.getName() + " has food of " + traveler.getFood() + " and health is " + traveler.getHealth());
    console.log(" ");
    // Create a traveler with the name 'Juan' called 'traveler2'
    let traveler2 = makeTraveler('Juan');
    console.log("There is a new Traveler named " + traveler2.getName());
    console.log(traveler2.getName() + " has food of " + traveler2.getFood() + " and health is " + traveler2.getHealth());
    console.log(" ");


    console.log(traveler.getName() + " is going hunting to try and add more food to " + traveler.getFood());
    hunt(traveler); // maybe get more food
    console.log(traveler.getName() + "'s food after the hunt is " + traveler.getFood());
    console.log(" ");
    console.log(traveler2.getName() + " is going hunting to try and add more food to " + traveler2.getFood());
    hunt(traveler2); // maybe get more food
    console.log(traveler2.getName() + "'s food after the hunt is " + traveler2.getFood());
    console.log(" ");


    console.log(traveler2.getName() + " is hungry so he'll consume -20 from his stock of " + traveler2.getFood());
    eat(traveler2); // feed juan
    console.log(traveler2.getName() + " has eaten so now his stock is " + traveler2.getFood() + " and his health is " + traveler2.getHealth());
    console.log(traveler2.getName() + " is hungry again so he'll consume -20 from his stock of " + traveler2.getFood());
    eat(traveler2); // juan is hungry
    console.log(traveler2.getName() + " must be hungry. Now his stock is " + traveler2.getFood() + " and his health is " + traveler2.getHealth() + ".");
    console.log("Oh, shit! " + traveler2.getName() + " is hungry again! He's consuming another -20 from  " + traveler2.getFood());
    eat(traveler2); // juan is going to starve and die...
    console.log(traveler2.getName() + " has eaten. Again. Now his stock is " + traveler2.getFood() + " and his health is " + traveler2.getHealth() + ". " + traveler2.getName() + " is stupid. Don't be like " + traveler2.getName() + ".");
    console.log(" ");


    console.log(traveler.getName() + " is joining the wagon!");
    join(wagon, traveler);
    console.log(traveler2.getName() + " is joining the wagon!");
    join(wagon, traveler2);
    console.log(" ");


    console.log(quarantine(wagon)); // print true if someone is sick, false otherwise
    console.log("The total food stocks on our wagon is " + food(wagon)); // print juan's food + henrietta's food


    console.log(" ");
    console.log("======================= END =======================");
})();

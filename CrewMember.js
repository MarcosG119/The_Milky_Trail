class CrewMember{
    constructor(name){
        this.name = name;
        this.age = 0;
        this.food_level = 0;
        this.health = 100;
        this.isSick = false;
        this.skillLevel = 0;
        this.illnesses = [];

    }

    isAlive(){
        if(health > 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    breed(CrewMember){
        genderChance = Math.random();
        if(genderChance < 0.5){
            newCrewMember = new CrewMember()
            
        }
    }
    
}

class femaleCrewMember extends CrewMember{
    constructor(name){
        this.pregnancyLevel = 0;
        this.fertile = true;
        this.repairLevel = 10;
    }

    fellInLove(maleCrewMember){
        console.log(name + " fell in love with " + maleCrewMember.name + " and is now pregnant!");
        pregnancyLevel = 1;
    }

}

class maleCrewMember extends CrewMember{
    constructor(name){
        this.fertile = true;
        this.repairLevel = 25;
    }
}


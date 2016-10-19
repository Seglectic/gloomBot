var fs = require('fs');

//Write Ban to a JSON database
updateJSON = function(func){
  //The default function
  func = func || function(a){
    console.log(a)
  }

  fs.readFile('public/bans.json','utf8',function(error, data){
    if(error){
      //TODO Replace this with something safer and only replace if the file does not exist k?
      data = "[]"
    }
    arr = JSON.parse(data)

    func(arr)

    fs.writeFile('public/bans.json',JSON.stringify(arr),'utf8',function(error,data){
    })
  })
}

samplePerson = {
  name:"Hater",
  duration:15 //In Minutes
}

ban = function(personObj){
  var tmpF = function(arr){
    var nameFound = arr.filter(function(element){
      return typeof element === "object" &&
        element != null &&
        element.hasOwnProperty("name") &&
        element.name === personObj.name
    }).length > 0
    var tmpDuration = personObj.duration*60000
    if(!nameFound){
      //Add a new ban
      arr.push({
        name:personObj.name
        ,duration:tmpDuration //Conversion from minutes to milliseconds
        ,ends:Date.now()+tmpDuration
      })
    }else{
      arr = arr.map(function(element){
        if(element.name === personObj.name){
          element.duration += tmpDuration
          element.ends += tmpDuration
        }
        return element
      })
    }
    //Show off what we did. TODO Remove this when everything is purrfect.
    console.log(arr)
  }
  updateJSON(tmpF)
}

//TODO send out an update to the websocket
//TODO I dunno?
ban(samplePerson)

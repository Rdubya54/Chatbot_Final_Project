'use strict';

const admin=require('firebase-admin');

const {dialogflow,Suggestions} = require('actions-on-google');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const app = dialogflow({debug: true});
const db = admin.firestore();

app.intent('Default Welcome Intent', (conv) => {
  // Do things
});

app.intent('Appointment', (conv) => {
    const time_param=conv.parameters['time'];
    const time=time_param;
    if (time!==""){
    
        return test_appoint(time).then(duplicate_bool => {
            
            console.log("in here!!!--"+duplicate_bool);
            
            return check_for_close(time,duplicate_bool).then(duplicate_bool =>{
                
                console.log("in here again!!!--"+duplicate_bool);
            
                if (duplicate_bool===false){
                    const dialogflowAgentRef = db.collection('test_database').doc("johnny boy");
                    return db.runTransaction(t => {
                      t.set(dialogflowAgentRef, {name: "johnny boyyy",time: time});
                      return Promise.resolve('Write complete');
                    }).then(doc => {
                      conv.add(`Great your appointment has been booked for ${time.date_time}. See you there!`);
                    }).catch(err => {
                      console.log(`Error writing to Firestore: ${err}`);
                      conv.add(`Error writing to database. Try again`);
                    });
                }
                
                else if (duplicate_bool==="closed"){
                    console.log("in closed");
                    conv.add("Sorry we aren't open at that time.");
                }
                    
                else {
                    console.log('dup detected');
                    console.log('dup in else is '+duplicate_bool);
                    conv.add('This appointment has already been booked.');
                }
            });
            
        });
    }
     
    function test_appoint(time){
        return new Promise((resolve,reject)=>{
            var dataRef = db.collection('test_database');
            // Create a query against the collection
            var queryRef = dataRef.where('time', '==', time);
            console.log("in test appoint");
            var duplicate_bool=queryRef.get().then(snapshot =>{
                var duplicate_bool=false;
                console.log("in there - "+duplicate_bool);
                console.log("search time:"+time);
                snapshot.forEach(doc => {
                    duplicate_bool=true;
                    const data = doc.data();
                    console.log("dup - "+data.name);
                    console.log("for each - "+duplicate_bool);
                });
                return duplicate_bool;
            }); 
            resolve(duplicate_bool);
        });
    }
    
    function check_for_close(time,duplicate_bool){
        return new Promise((resolve,reject)=>{
            var holder=time.date_time.toString();
            console.log("Time is "+time);
            console.log("Holder is "+holder);
            var sub=holder.substring(11,13);
            var today=new Date();
            var day=today.getDay();
            console.log('Today is '+day);
            
            if (day>=1 && day<=5){
                console.log("Look at the time"+sub);
                if (sub<8 || sub>19){
                    console.log("Sorry we aren't open at that time.");
                    duplicate_bool="closed";
                }
            }
            resolve(duplicate_bool);
        });
    }
     
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
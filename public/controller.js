(function() {

var config = {
    apiKey: "AIzaSyAhR_WQwOXIKPmj-CoUaR0f4T_YZm_CUFU",
    authDomain: "mu-tech-support.firebaseapp.com",
    databaseURL: "https://mu-tech-support.firebaseio.com",
    projectId: "mu-tech-support",
    storageBucket: "mu-tech-support.appspot.com",
    messagingSenderId: "67101514401"
    };

firebase.initializeApp(config);

var app=angular.module('app',['firebase'])
    app.controller('MyCtrl', function($firebaseArray,$scope){

        $scope.something="hiii";
        $scope.appointment_text="";
        // $scope.time="";

        

        // const db=firebase.firestore();

        // const productsRef=db.collection('test_database');

        // const query = productsRef.where('price', '>=', 10)
        // console.log("dumb")
        // query.get()
        //     .then(products => {

        //         const list=[];

        //         products.forEach(doc =>{
        //             data=doc.data()
        //             console.log("in here")
        //             console.log(data.time)
        //             $scope.time=data.time;
        //             list.push(data.time);
        //             console.log(list);
        //             // document.write(data.time + ' at $' + data.time +'<br>')
        //         })   
        //         return list;
            
        //     }) 
        // $scope.syncArray=list;

        function list(user) {
            return firebase.firestore()
              .collection('test_database')
              .where('date','==', '2018-11-27T00:46:47-06:00')
              //.where('name', '==', 'Tom')
              .get()
              .then(snapshot => {
                const list = [];
          
                snapshot.forEach(doc => {
                  const data = doc.data()
                  data.id = doc.price;
                  list.push(data);
                });
          
                return list;
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });
          }

        list({ uid: 10 }).then((list) => {
            console.log(list);
            $scope.appointment_text="Hi, " + $scope.name + ", your next appointment is schdueled for " + list[0].date +".";
            $scope.time=list[0].date;
            console.log($scope.time);
            $scope.$apply()
          });
            

        // const rootRef=firebase.database().ref().child('angular');
        // console.log(rootRef)
        // const ref=rootRef.child('object');
        // console.log(ref)
        // this.object=$firebaseObject(ref);

        $scope.googleLogin=function(){
            const provider = new firebase.auth.GoogleAuthProvider();
        
            firebase.auth().signInWithPopup(provider)
        
                .then(result =>{
                    const user=result.user;
                    //document.write('Hello ' + user.displayName);
                    localStorage.setItem("user",user.displayName);
                    // console.log(user.displayName)
                    // $scope.name=user.displayName;
                    window.location='view_homepage.html';
                    
                    
                })
                .catch(console.log)

        }

        $scope.name=localStorage.getItem("user");


    });

}());
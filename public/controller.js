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

        $scope.appointment_text="";
        
        var today=new Date();
        var date=today.getFullYear() + "-" + (today.getMonth()+1) + "-" +today.getDate();
        console.log(date)
        function list(user) {
            return firebase.firestore()
              .collection('test_database')
              .get()
              .then(snapshot => {
                const list = [];
          
                snapshot.forEach(doc => {
                  const data = doc.data()
                  data.id = doc.price;
                  list.push(data.time);
                });
          
                return list;
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });
          }

        list({ uid: 10 }).then((list) => {
            console.log(list);
            $scope.appointment_text="Hi, " + $scope.name;
            $scope.time=list[0].date;
            console.log($scope.time);
            $scope.times=list;
            $scope.$apply()
          });
            

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
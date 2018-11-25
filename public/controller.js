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

angular
    .module('app',['firebase'])
    .controller('MyCtrl', function($firebaseObject,$scope){

        $scope.something="hiii";
        $scope.time="";

        const db=firebase.firestore();

        const productsRef=db.collection('test_database');

        const query = productsRef.where('price', '>=', 10)
        console.log("dumb")
        query.get()
            .then(products => {
                products.forEach(doc =>{
                    data=doc.data()
                    console.log("in here")
                    console.log(data.time)
                    $scope.time=data.time;
                    // document.write(data.time + ' at $' + data.time +'<br>')
                })   
            
            }) 
        
            

        // const rootRef=firebase.database().ref().child('angular');
        // console.log(rootRef)
        // const ref=rootRef.child('object');
        // console.log(ref)
        // this.object=$firebaseObject(ref);
    });

}());
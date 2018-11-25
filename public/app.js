//update posts... thorough optimistic updates???
/* function updatePost(e){
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title:e.target.value})
} */

//login user with google
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result =>{
            const user=result.user;
            document.write('Hello ' + user.displayName);
            window.location='homepage.html';
            console.log(user)
        })
        .catch(console.log)
}
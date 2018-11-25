//authenticate user using google
document.addEventListener("DOMContentLoaded",event=>{

    const app=firebase.app();

    const db=firebase.firestore();
    // const productsRef=db.collection('products');

    // const query = productsRef.orderBy('price', 'asc')
    // console.log("dumb")
    // query.get()
    //     .then(products => {
    //         products.forEach(doc =>{
    //             data=doc.data()
    //             console.log(data.name)
    //             document.write(data.name + ' at $' + data.price +'<br>')
    //         })    
    //     })

    // const myPost=db.collection('posts').doc('firstpost');
    // console.log(app)

    // myPost.onSnapshot(doc =>{
    //     const data = doc.data();
    //     document.querySelector('#title').innerHTML=data.title;
    // })

    // myPost.onSnapshot(doc=>{
    //         const data = doc.data();
    //         document.write(data.title + '<br>')
    //         document.write(data.createdAt + '<br>')
    //     })
});

//update posts... thorough optimistic updates???
function updatePost(e){
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title:e.target.value})
}

//login user with google
/* function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result =>{
            const user=result.user;
            document.write('Hello ${user.displayName}');
            console.log(user)
        })
        .catch(console.log)
} */
document.addEventListener("DOMContentLoaded",event=>{

    const app=firebase.app();

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
                document.write(data.time + ' at $' + data.time +'<br>')
            })    
        }) 

    const myPost=db.collection('posts').doc('firstpost');

    myPost.get()
          .then(doc=>{
              const data=doc.data();
              console.log(data)
              console.log(data.title)
              document.write(data.title + '<br>')
        })
       
});
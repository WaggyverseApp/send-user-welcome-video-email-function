const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Todo: replace asterics with user collection
exports.sendNewUserWelcomeVideoEmail = functions.firestore.document('***********/{mUid}').onWrite(async (event) => {
    
   //Todo: replace with your own values 
    const uid = event.after.get('userId');
    const userName = event.after.get('displayName');
    const beforeName = event.before.get ('displayName');

    if (beforeName == userName) {console.log('not new');

}else{

    
    //Todo: create a dynamic video url template and note the string to replace
    //Todo: replace "users" with your user collection created above
    //Todo: replace "New%20User" with your replacement sting
    const userDoc = await admin.firestore().doc(`[users]/${uid}`).get();
    const space = ('%20');
    const userNameString = userName.replace(/\s/g, space);
    const dynamicVideoUrl =  ('################');
    const newVideoUrl = dynamicVideoUrl.replace('New%20User',userNameString);      
    const imageUrl = newVideoUrl.replace('.mp4', '.png');
      
    
    
    const email = userDoc.get('email');  
    
      
  
    //Todo: create a template for your email with following firebase docs
     admin
  .firestore()
  .collection("mail")
  .add({
    to: email ,
    template: {
      name: "newVideo",
      data: {
        username: userName,        
        imageUrl: imageUrl,
        videoUrl: newVideoUrl,
        
      },
    },
  })
  

  end();

    

    }
  
  });
    
  

    

    
    
  

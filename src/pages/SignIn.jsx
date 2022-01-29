import React from 'react';
import firebase from 'firebase/app'
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/Firebase';


const SignIn = () => {
  const signinWithProvider = async (provider) => {
    // 
    // console.log('result' ,result)    
    try{
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider)

      if(additionalUserInfo.isNewUser){
        await database.ref(`/profiles/${user.uid}`).set({
          name : user.displayName,
          createdAt : firebase.database.ServerValue.TIMESTAMP,
        })
      }

      Alert.success('Signed In', 4000)
    } catch(err){
      Alert.error(err.message, 4000)
    }

  }
  const onFacebookSignin = () =>{

    signinWithProvider(new firebase.auth.FacebookAuthProvider())

  };

  const onGoogleSignin = () =>{

    signinWithProvider(new firebase.auth.GoogleAuthProvider())

  };
  

  return (
    <Container>
      <Grid className='mt-page'>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className='text-center'>
                <h2>Welcome to Chat App</h2>
                <p>Progressive Chat-App</p>
              </div>

              <div className='mt-3'>
                <Button block color='blue' onClick={onFacebookSignin}>
                  <Icon icon="facebook" />     Continue With Facebook
                </Button>

                <Button block color='red' onClick={onGoogleSignin}>
                  <Icon icon="google" />     Continue With Google+
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;

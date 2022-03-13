import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import styles from './Chatbox.module.css';


import {FlatList, Text, ScrollView, View, StyleSheet } from 'react-native'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Chatbox = () => {

    const scrollViewRef = useRef();
        
    const [result, setResult] = useState([])
    const [buttonGrayed, setButtonGrayed] = useState(false)
    const [typing, setTyping] = useState(false)

    const [tags, setTags] = useState([]);
    const [text, setText] = useState('')

    useEffect(()=>{
        const result = JSON.parse(localStorage.getItem("chat"));
          setResult(result)

    },[])

    const handleOnPress=()=>{
        const items = (() => {
            const fieldValue = localStorage.getItem('chat');
            return fieldValue === null
              ? []
              : JSON.parse(fieldValue);
          })();
          
          
          items.push({id: Date.now(),"message":text});
          
        
          localStorage.setItem('chat', JSON.stringify(items));

          const result = JSON.parse(localStorage.getItem("chat"));
          console.log("Result",result)
          setResult(result)      
          
    }

    const onTextAreaChange =(v)=>{
        setText(v.target.value);
            setTypingState();

    }

  useEffect(()=>{
    if(text===''){
    setButtonGrayed(true)
    }else
    {setButtonGrayed(false)}
    console.log(buttonGrayed)

  },[text===''])


    const setTypingState=()=>{
   
        setTyping(true)
        wait(3000).then(() => setTyping(false));
        
    }

    const addTag = value => {
        if(text===''){
            return;
        }
        if (value.keyCode === 13) {
          setTags([...tags, text])
          setText('')
          handleOnPress()
        }
      } 

   
    

  return (
    <div className={styles.chatbox}>
        
        <div className={styles.chatBoxHeader}>
            <div className={styles.botprofile}>
            <img src="/botpng.png" width={25} />
            </div>
            <div className={styles.metadata}>
            <p style={{fontSize: 15, marginTop: 0, color: 'gray'}}>Robonet</p>
            <p style={{fontSize: 12, marginTop: -10, color: 'gray'}}>Online</p>
            </div>
            
        </div>

        <div className={styles.chatArea}>
            <ScrollView
             ref={scrollViewRef}      
             onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef.current.scrollToEnd({animated: true})}}
            >        
           { result ? (
                            result.map((elem) => {
                                return (
                                    <View style={{ padding: 15}}>
                                        <View style={looks.outBubble}><Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>You</Text><Text style={{maxWidth: 300}}>{elem?.message}</Text></View>
                                       <View style={looks.inBubble}><Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>Robonet</Text><Text style={{maxWidth: 300}}>{elem?.message}</Text></View>
                                      
                                  </View>
                                )
                            })) : (<View>return</View>)

                        }
                        </ScrollView>

        </div>
        



        <div className={styles.textBoxContainer}>
            <img 
             style={{transform: `${typing ? 'translate(0px,-10px)' : 'translate(0px,10px)'}`, zIndex: 566, position: 'absolute'}}
            className={styles.peekBot} src="/bot.svg" width={25} />
            <textarea 
            style={{zIndex: 567, position: 'relative'}}
            value={text}
            onChange={(v)=>{onTextAreaChange(v)}}
            onKeyUp={addTag}
            className={styles.textBox}
            placeholder="Message"
            >
            </textarea>
            
                <a style={buttonGrayed? {pointerEvents: 'none'}:  {pointerEvents: 'all'}} onClick={handleOnPress} >
               <div className={styles.chatboxFooter}>   
                     <div style={buttonGrayed? {backgroundColor: "lightgray",} : {backgroundColor: "#5392e6"}} className={styles.sendButton}>
                        <p style={{fontSize: 12, color: 'white', textDecoration: 'none'}}>Send</p>
                     </div>
               </div>  
               </a>   
        </div>       
        

        </div>
  )
}

export default Chatbox

const looks = StyleSheet.create({

    inBubble: {
        backgroundColor: '#aef2b5', 
        width: "auto", 
        alignSelf: 'flex-start',
        maxWidth: '70%', 
        height: 'auto', 
        maxHeight: "auto",
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        textAlign: 'left', 
        borderRadius: 5, 
        paddingRight: 5, 
        paddingLeft: 5,
        paddingTop:3, 
        paddingBottom: 3,
        flexDirection: 'column',
        marginBottom: 6,

    },

    outBubble:{
        backgroundColor: '#dfe7eb', 
        width: "auto", 
        alignSelf: 'flex-end',
        maxWidth: '70%', 
        height: "auto", 
        maxHeight: "auto",
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        textAlign: 'left', 
        borderRadius: 5, 
        paddingRight: 5, 
        paddingLeft: 5,
        paddingTop:3, 
        paddingBottom: 3,
        flexDirection: 'column',
        marginBottom: 6,
    },

    activeButton: {
        color: "black"
    },

    inActiveButton: {
        color: 'white'
    }



    
})
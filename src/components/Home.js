import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView , StyleSheet, Modal} from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { firestoreDb } from '../firebase-config';
import {collection, getDocs, onSnapshot, QuerySnapshot} from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
    const [myNotes, setMyNotes] = useState([]);
    const notesCollectionRef = collection(firestoreDb, "notes");
    const [modalvisible, setModalVisible] = useState(false)
    const [modalvisible2, setmodalvisible2] = useState(false)
    const [selected, setSelected] = useState(null)
    const [title, setTitle] = useState(null);
    const [contnet, setContent] = useState(null);
    
    const getNotes = async () =>{
        const data = await getDocs(notesCollectionRef);
        //console.log(data.docs);
        let notes = []
        data.forEach(doc=>{
            //console.log(doc.id, ':', doc.data());
            notes.push({id:doc.id, ...doc.data()})
        })
        setMyNotes(notes);
    }

    

    const handleSubmit = ()=>{
    }

    function handleDetailPress(item){
        setModalVisible(true);
        setSelected(item);
    }

    useEffect(() =>{
        getNotes();
    }, [])
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'end', marginBottom:20}}>
                    <TouchableOpacity onPress={()=>setmodalvisible2(true)}>
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
            </View>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>All notes</Text>
            <FlatList
                data={myNotes}
                renderItem={({item}) =>{
                    return(
                        <View>
                            <TouchableOpacity onPress={()=>handleDetailPress(item)}><Text style={{fontWeight: 'bold', fontSize: 15, padding: 5, border: 'black 1px solid', borderRadius: 2, alignSelf: 'center', marginVertical: 5}}>{item.title}</Text></TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item=>item.id}
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalvisible}
            >
            <View>
                <TouchableOpacity onPress={()=>setModalVisible(false)}>
                    <Ionicons name='close' size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Title: {selected?.title}</Text>
                <Text style={{marginTop: 10}}>Content: {selected?.content}</Text>
            </View>
            </Modal>
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalvisible2}
            >
                <View>
                <TouchableOpacity style={{alignSelf: 'flex-end', paddingVertical:20}} onPress={()=>setmodalvisible2(false)}>
                       <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 30, marginHorizontal: 20}}>Add new notes</Text>
                    <View>
                        <Text style={{fontSize: 30, fontWeight: 'bold', paddingHorizontal: 20}}>Title</Text>
                        <TextInput style={{borderColor:"#cecece", borderWidth:1, padding:10, marginTop: 10, marginBottom:20, paddingHorizontal: 20}} placeholder="Enter the title" onChangeText={(value)=>setTitle(value)}></TextInput>
                        <Text style={{fontSize: 30, fontWeight: 'bold', paddingHorizontal: 20}}>Content</Text>
                        <TextInput style={{borderColor:"#cecece", borderWidth:1, padding:10, marginTop: 10, marginBottom:20, height:200, paddingHorizontal: 20}} placeholder="Enter the content" multiline="true" onChangeText={(value)=>setContent(value)}></TextInput>

                        <TouchableOpacity>
                            <View style={{padding: 15, borderRadius: 5, backgroundColor: 'blue'}}>
                            <Text style={{color: 'white', alignSelf: 'center'}}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>  
        </SafeAreaView>
    )
}





const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 5,
    }
})

export default Home
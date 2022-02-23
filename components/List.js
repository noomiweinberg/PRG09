import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tailwind from "twrnc";
import * as Network from 'expo-network';

import { app } from '../config'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import Item from "./Item";

export default function List({ nav }) {
    const DB = getFirestore(app)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [connected, setConnected] = useState(false)

    async function retrieveNetwork() {
        const network = await Network.getNetworkStateAsync()
        if (network.isConnected) {
            setConnected(true)
        } else {
            setConnected(false)
        }
    }

    async function getList() {
        const list = []
        const collectionFirebase = collection(DB, "Bezienswaardigheden")
        const snapshot = await getDocs(collectionFirebase)
        const collectionList = snapshot.docs.map(doc => list.push({ ...doc.data(), id: doc.id }))
        setList(list)
        setLoading(false)
    }


    //Bezienswaardigheden ophalen (herhalend)
    useEffect(() => {
        retrieveNetwork()
        getList()
    })

    return (
        <View style={tailwind`m-auto`} >
            {connected
                ? <View>
                    <Button title="Monument aanmaken" onPress={() => navigation.navigate('Create')} />
                    <Text style={tailwind`text-center`} >Lijst van Bezienswaardigheden</Text>
                    {list.length < 1 ? <Text style={tailwind`m-auto mt-12 uppercase italic`} >Create a new item!</Text>
                        :
                        <ScrollView style={tailwind`p-2 `} showsVerticalScrollIndicator={false} >
                            {!loading ?
                                list.map((item, i) => {
                                    return <Item key={i} id={item.id} name={item.name} description={item.description} nav={nav} />
                                }) : null}
                        </ScrollView>
                    }
                </View>
                : <Text style={tailwind`text-xl font-bold text-center`}>Not connected...</Text>
            }
        </View>
    )
}

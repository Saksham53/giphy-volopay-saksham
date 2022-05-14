import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet, Dimensions} from "react-native";

import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const baseUrl = "http://api.giphy.com/v1/gifs";
const colors = ["#6ED397","#3383f2", "#f05454", "#ff9292", "#f7ad42"]

const Gifs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    getTrending()
  }, [currentPage]);

  const getTrending = () => {
    const fetchData = async () => {
      console.log("useeffect");
      console.log("useEffect currentPage:", currentPage);
      setIsError(false);
      setIsLoading(true);

      try {
        const giphyApiResponse = await axios(`${baseUrl}/trending`, {
          params: {
            api_key: "V0m6aFhAzUTRn23lWOnmOIKyLHzOoLXR",
          },
        });

        setData(data.concat(giphyApiResponse.data.data));
      } catch (error) {
        setIsError(true);
        console.log(error);
        setTimeout(() => setIsError(false), 5000);
      }
      setIsLoading(false);
    };
    fetchData();
  };

  const loadMoreGifs = () => {
    console.log("load more gifs");
    setPageOffset(pageOffset+50)
    setCurrentPage(currentPage + 1);
    // setIsLoading(true);
  };

  const renderItems = () => {
    if (isLoading) {
      return <Text style={{width:Dimensions.get("window").width * 0.9, flexDirection:'row'}}>
                <Text style={{color:'white', fontSize:18, alignSelf:'center'}}>Loading...</Text>;
              </Text>
    }

    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreGifs}
        renderItem={({ item, index }) => (
          <View style={{...styles.gifContainer,
          backgroundColor:colors[index % colors.length]
          }}>
            <Image
              style={styles.gif}
              source={{
                uri: item.images.fixed_height_small.url,
              }}
            />
          </View>
        )}
      />
    );
  };

  const renderError = () => {
    if (isError) {
      return (
        <View style={{ alignItems: "center" }}>
          <Feather name="alert-triangle" size={60} color="red" />
          <Text style={{ color: "white", fontWeight: "300" }}>
            An error occured, Please try again later.
          </Text>
        </View>
      );
    }
  };

  const handleInput = (text) => {
    setSearch(text);
  };

  const onSearch = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);


    try {
      const giphyApiResponse = await axios(`${baseUrl}/search`, {
        params: {
          api_key: "V0m6aFhAzUTRn23lWOnmOIKyLHzOoLXR",
          q: search
        },
      });

      setData(giphyApiResponse.data.data);
    } catch (error) {
      setIsError(true);
      console.log(error);
      setTimeout(() => setIsError(false), 10000);
    }

    setIsLoading(false);
  };

  const onPress = () => {
    setCurrentPage(currentPage);
  };

  const previousPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage);
      Alert.alert("First Page", "Try going to the Next Page");
      console.log("first page");
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPressTrending = () => {
    console.log("load more gifs");
    getTrending();
  };

  return (
    <View style={styles.container}>
      {renderError()}
      
        <TextInput
          style={styles.searchbox}
          value={search}
          onChangeText={handleInput}
          placeholder="Search all the GIFs and Stickers"
          keyboardType="default"
          onSubmitEditing={onSearch}
        />
        {/* <TouchableOpacity style={styles.searchbutton} onPress={onSearch}>
          <Foundation name="magnifying-glass" size={Dimensions.get("window").height * 0.04} color="purple" />
        </TouchableOpacity> */}
      
      <View style={styles.category}>
        <TouchableOpacity style={styles.iconandtitle} onPress={onPressTrending}>
          <Feather name="trending-up" size={Dimensions.get("window").height * 0.03} color="skyblue" />
          <Text style={styles.title}>Trending</Text>
        </TouchableOpacity>

        {renderItems()}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.currentcontainer}>
            <AntDesign
              onPress={previousPage}
              name="caretleft"
              size={15}
              color="skyblue"
              style={{opacity:0.7}}
            />
            <Text style={styles.pagenumber}>{currentPage}</Text>
            <AntDesign
              onPress={nextPage}
              name="caretright"
              size={15}
              color="skyblue"
              style={{opacity:0.7}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Gifs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1c1c",
        alignItems:'center'
      },
      gifContainer: {
        //backgroundColor: colors[Math.floor(Math.random()*colors.length)],
        height:Dimensions.get("window").width * 0.4,
        borderRadius:7,
        margin:3,
        overflow:'hidden'
      },
    
      gif: {
        height:Dimensions.get("window").width * 0.4,
        width: Dimensions.get("window").width * 0.43,
        borderRadius:7,
        // overlayColor:'black'
      },
      searchbox: {
        borderRadius: 10,
        paddingHorizontal:15,
        height:Dimensions.get("window").height * 0.05,
        marginTop: 20,
        // marginLeft: 10,
        alignSelf:'center',
        width: "90%",
        backgroundColor: "white",
      },
      searchbutton: {
        alignItems: "center",
        alignSelf:'center'
        // marginTop: 20,
        // padding: 10,
      },
      category: {
        flex: 1,
        flexWrap: "wrap",
        padding: 18,
        width:'100%'
      },
      iconandtitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      title: {
        padding: 10,
        fontSize: Dimensions.get("window").height * 0.03,
        color: "#FFFFFF",
        fontWeight: "bold",
        justifyContent:'flex-start'
      },
      footer: {
        backgroundColor: "#1d1c1c",
        paddingBottom:5,
        marginTop:-7
        
      },
      currentcontainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    
      pagenumber: {
        fontSize: 18,
        color: "skyblue",
        paddingHorizontal:10,
        opacity:0.7
      },
  });
import { StyleSheet, Text, View, Animated } from 'react-native'
import React, {useState, useRef} from 'react'

import OnboardingItem from '../components/OnboardingItem'
import { FlatList } from 'react-native'
import slides from '../components/slides.js'
import Paginator from '../components/Paginator'
import NextButton from '../components/NextButton'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import AppContext from '../Globals/AppContext'

const Onboarding = () => {
  const {setViewedOnboarding} = useContext(AppContext)
  const slidesRef = useRef(null);

  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current;

  const scrollTo = async() =>  {
    if(currentIndex < slides.length - 1){
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    }
    else{
      try {
        const value = await AsyncStorage.setItem('@viewedOnboarding', 'true');
        
      } catch (error) {
        console.log('Error @setViewedOnboarding', err)
        
      }finally{
        setViewedOnboarding(true);
      }
    }
  }

  return ( 
    <View style={styles.container}>

       <View style={{flex:3}}> 
        <FlatList data={slides}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (<OnboardingItem item={item}/>)}
          key={({item}) => item.id}
        
          onScroll={Animated.event([{nativeEvent:{contentOffset:{x: scrollX}}}], {
            useNativeDriver:false
          
          })}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        
          
        /> 

      </View> 
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)}/>

    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
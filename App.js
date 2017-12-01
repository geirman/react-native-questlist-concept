/**
 * @flow
 */
// Tutorial: https://medium.com/@antoinehanriat/tips-for-high-perf-animations-with-react-native-scroll-based-animations-d0c895d1835b
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
let teamPhoto = { uri: 'https://www.frogquest.com/images/events/74/optimized/FrogQuest_74_001_604_B0_171007-165557242.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/74/optimized/FrogQuest_74_001_603_A0_171007-160540814.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/73/optimized/FrogQuest_73_001_599_B0_170927-172215575.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/73/optimized/FrogQuest_73_001_598_A0_170927-17225744.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/73/optimized/FrogQuest_73_001_602_E0_170927-172558122.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/73/optimized/FrogQuest_73_001_601_D0_170927-172619373.jpeg' };
// teamPhoto ={ uri: 'https://www.frogquest.com/images/events/73/optimized/FrogQuest_73_001_600_C0_170927-173444296.jpeg' };





const IMAGE_HEIGHT = 300;

export default class App extends Component<{}> {

  scrollAnimatedValue = new Animated.Value(0);



  render() {
    return (
      <View style={styles.container}>
        <Animated.Image source={teamPhoto} style={[styles.teamPhoto, {
          transform: [
            {translateY: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
              outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
              extrapolateRight: 'clamp',
            })},
            {scale: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0],
              outputRange: [2, 1],
              extrapolateRight: 'clamp',
            })},
          ],
        }]}/>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue }} }],
            { useNativeDriver: true },
          )}
          contentContainerStyle={styles.scrollViewContentContainer}
          scrollEventThrottle={8} // target 120fps
        >
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
          <FakeItem />
        </Animated.ScrollView>
      </View>
    );
  }
}

const FakeItem = () => <View style={styles.fakeItemContainer} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContentContainer: {
    marginTop: IMAGE_HEIGHT,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  fakeItemContainer: {
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#dedede',
  },
  teamPhoto: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
  }
});

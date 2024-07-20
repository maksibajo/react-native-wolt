import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Offer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bulletRight} />
      <View style={styles.bulletLeft} />
      <Image source={require('./assets/discount.png')} style={styles.image} />
      <Text style={styles.text}>14 days of no delivery fee</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#28B2F518',
    height: 90,
    borderRadius: 10,
  },
  image: {height: 45, width: 45},
  text: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 20,
    color: '#131928',
  },
  bulletLeft: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 20,
    width: 20,
    right: -10,
    borderRadius: 50,
  },
  bulletRight: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 20,
    width: 20,
    left: -10,
    borderRadius: 50,
  },
});

export default Offer;

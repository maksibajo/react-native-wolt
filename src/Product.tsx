import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProductProps {
  item: string;
}

const Product: React.FC<ProductProps> = ({item}) => {
  return (
    <View style={styles.root}>
      <View style={styles.line} />
      <View style={styles.container}>
        <Text style={styles.title}>{item}</Text>
        <Text style={styles.description} numberOfLines={2}>
          Description and ingredients for {item}
        </Text>
        <Text style={styles.price}>12.82 EUR</Text>
        {['Item 1', 'Item 2', 'Item 6'].includes(item) && (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.popular}>
              <Icon name={'star'} color={'white'} />
              <Text style={styles.popularText}>POPULAR</Text>
            </View>
          </View>
        )}
      </View>
      <Image source={require('./assets/banner.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  line: {
    height: '100%',
    width: 4.5,
    backgroundColor: '#898D9B',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: '100%',
  },
  image: {width: 120, height: 80, borderRadius: 10, marginRight: 15},
  title: {fontSize: 16, marginBottom: 5, fontWeight: '500'},
  description: {color: '#434755', marginBottom: 5},
  price: {color: '#008ACD'},
  popular: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008ACD',
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginTop: 5,
    borderRadius: 50,
  },
  popularText: {color: 'white', fontSize: 11, fontWeight: '500', marginLeft: 1},
});
export default Product;

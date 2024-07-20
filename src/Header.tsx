import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Offer from './Offer';
import {Path, Svg} from 'react-native-svg';

const width = Dimensions.get('window').width;

interface HeaderProps {
  scrollY: SharedValue<number>;
}

const Header: React.FC<HeaderProps> = ({scrollY}) => {
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [80, 100],
      [1, 0],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollY.value,
      [0, 80],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{scale}],
    };
  });

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.logo, logoAnimatedStyle]}>
        <Image style={styles.logoImage} source={require('./assets/logo.png')} />
      </Animated.View>
      <Svg
        height="30"
        width={width}
        viewBox={`0 0 ${width} 30`}
        style={{position: 'absolute', top: -29, zIndex: 1}}>
        <Path d={`M 0 30 Q ${width / 2} 0 ${width} 30`} fill="white" />
      </Svg>
      <Text style={styles.businessName}>McDonald's</Text>
      <Text style={styles.info}>
        <Icon name={'emoticon-happy-outline'} size={15} color={'#434755'} /> 9.0
        {'  •  '}Open until 23:00{'  •  '}Min. order 5 EUR
      </Text>
      <Text style={styles.info}>
        <Icon name={'bike'} color={'#434755'} size={15} /> 0 EUR{'  •  '}
        <Text style={styles.link}>More</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonBig}>
          <Icon name={'bike'} color={'#008ACD'} size={18} />
          <Text style={styles.buttonText}>Delivery 40-50 min</Text>
          <Icon name={'chevron-down'} color={'#008ACD'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name={'account-multiple-plus'} color={'#008ACD'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name={'export'} color={'#008ACD'} size={20} />
        </TouchableOpacity>
      </View>
      <Offer />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 90,
    height: 90,
    position: 'absolute',
    top: -60,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#898D9B',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5.84,
    elevation: 3,
    zIndex: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  businessName: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Gill Sans',
    marginBottom: 5,
  },
  info: {
    color: '#434755',
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#008ACD',
    fontWeight: '700',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonBig: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#28B2F518',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  button: {
    backgroundColor: '#28B2F518',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    height: 40,
  },
  buttonText: {color: '#008ACD', paddingHorizontal: 10, fontWeight: '500'},
});

export default Header;

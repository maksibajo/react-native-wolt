import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, ListRenderItem} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Toolbar from './src/Toolbar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from './src/Header';
import Product from './src/Product';

const HEADER_IMAGE_HEIGHT = 250;
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const CATEGORIES: string[] = [
  'Appetizers',
  'Desserts',
  'Wines',
  'Starters',
  'Packages',
  'Drinks',
  'Sauces',
  'Toppings',
];

interface Section {
  title: string;
  data: string[];
}

const sections: Section[] = CATEGORIES.map(category => {
  const numberOfProducts = getRandomInt(2, 5);
  return {
    title: category,
    data: Array.from(
      {length: numberOfProducts},
      (_, index) => `${category} ${index + 1}`,
    ),
  };
});

const App = () => {
  const listRef = useRef<Animated.FlatList<Section>>(null);
  const scrollY = useSharedValue(0);

  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);

  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 20};

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_IMAGE_HEIGHT],
        [HEADER_IMAGE_HEIGHT, 0],
      ),
    };
  });

  const headerImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, 180], [1.4, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const opacity = interpolate(scrollY.value, [80, 120], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {transform: [{scale}], opacity};
  });

  const renderItem: ListRenderItem<Section> = ({item}) => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Text style={styles.sectionTitle}>{item?.title?.toUpperCase()}</Text>
        {item.data.map(data => (
          <Product key={data} item={data} />
        ))}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<{item: Section}>}) => {
      const firstVisibleItem = viewableItems[0];
      if (firstVisibleItem) {
        setActiveCategory(firstVisibleItem.item.title);
      }
    },
  ).current;

  const scrollToCategory = (index: number) => {
    listRef?.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: HEADER_IMAGE_HEIGHT - 90,
    });
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Toolbar
          activeCategory={activeCategory}
          scrollY={scrollY}
          categories={CATEGORIES}
          onScrollTo={scrollToCategory}
        />
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Animated.Image
            source={require('./src/assets/banner.jpg')}
            style={[styles.headerImage, headerImageStyle]}
          />
        </Animated.View>
        <Animated.FlatList
          ref={listRef}
          data={sections}
          keyExtractor={item => item.title}
          renderItem={renderItem}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: HEADER_IMAGE_HEIGHT}}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListHeaderComponent={<Header scrollY={scrollY} />}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 19,
    paddingVertical: 20,
    paddingHorizontal: 15,
    fontWeight: '700',
  },
  footer: {height: 100},
});

export default App;

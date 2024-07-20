import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ToolbarProps {
  activeCategory: string;
  scrollY: Animated.SharedValue<number>;
  categories: string[];
  onScrollTo: (index: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeCategory,
  scrollY,
  categories,
  onScrollTo,
}) => {
  const {top} = useSafeAreaInsets();

  const listRef = useRef<FlatList<string>>(null);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [120, 160],
      ['transparent', 'white'],
    );
    return {backgroundColor: color};
  });

  const categoriesAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [350, 380],
      [0, 45],
      Extrapolation.CLAMP,
    );
    return {height};
  });

  const categoryItemAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [350, 380],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });

  useEffect(() => {
    const activeIndex = categories.indexOf(activeCategory);
    listRef.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewOffset: 20,
    });
  }, [activeCategory, categories]);

  return (
    <Animated.View
      style={[styles.root, {paddingTop: top + 5}, containerAnimatedStyle]}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.roundedButton}>
          <Icon name={'arrowleft'} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name={'search1'} size={22} color={'#434755'} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundedButton}>
          <Icon name={'hearto'} size={20} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.categoriesContainer, categoriesAnimatedStyle]}>
        <FlatList
          ref={listRef}
          horizontal
          bounces={false}
          data={categories}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'flex-end'}}
          renderItem={({item: category, index}) => (
            <TouchableOpacity key={category} onPress={() => onScrollTo(index)}>
              <Animated.View
                style={[
                  styles.categoryItem,
                  category === activeCategory && styles.categoryItemActive,
                  categoryItemAnimatedStyle,
                ]}>
                <Text
                  style={[
                    styles.categoryItemText,
                    category === activeCategory &&
                      styles.categoryItemTextActive,
                  ]}>
                  {category?.toUpperCase()}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 1,
    shadowColor: '#BBC1CB',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5.84,
    elevation: 3,
  },
  toolbar: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  roundedButton: {
    height: 40,
    width: 40,
    backgroundColor: '#EBEFF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  searchButton: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#EBEFF4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  searchPlaceholder: {
    color: '#434755',
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  categoriesContainer: {
    alignItems: 'flex-end',
  },
  categoryItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 14,
    borderBottomWidth: 3,
    borderColor: 'white',
  },
  categoryItemActive: {
    borderBottomWidth: 3,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: '#008ACD',
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#898D9B',
  },
  categoryItemTextActive: {
    color: '#008ACD',
  },
});

import React, { memo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TVFocusGuideView,
  Animated,
} from "react-native";
import { Pressable as GesturePressable } from "react-native-gesture-handler";
import { Pressable as NativePressable } from "react-native";
import { Movie } from "../mock/movies";
import { useNavigation } from "../navigation/useNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigator";
import { isMetaQuestDevice } from "../util/isMetaQuestDevice";

export type CarouselRow = {
  title: string;
  movies: readonly Movie[];
};

type CarouselGridProps = {
  rows: CarouselRow[];
  itemsPerRow?: number;
  itemWidth?: number;
  itemHeight?: number;
};

const Pressable = isMetaQuestDevice() ? GesturePressable : NativePressable;

const CarouselItem = memo(
  React.forwardRef<
    React.ElementRef<typeof TouchableOpacity>,
    {
      movie: Movie;
      itemWidth?: number;
      itemHeight?: number;
      onPress: () => void;
    }
  >(({ movie, itemWidth = 200, itemHeight = 120, onPress }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
      setIsFocused(true);
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    const handleBlur = () => {
      setIsFocused(false);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.carouselItemWrapper,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Pressable
          ref={ref}
          style={[
            styles.carouselItem,
            {
              width: itemWidth,
              height: itemHeight,
            },
            isFocused && styles.carouselItemFocused,
          ]}
          onPress={onPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onHoverIn={handleFocus}
          onHoverOut={handleBlur}
        >
          <Image
            source={{ uri: movie.poster }}
            style={styles.carouselItemImage}
            resizeMode="cover"
          />
        </Pressable>
      </Animated.View>
    );
  })
);

const CarouselRow = memo(
  ({
    title,
    movies,
    itemWidth = 200,
    itemHeight = 120,
    onItemPress,
  }: {
    title: string;
    movies: readonly Movie[];
    itemWidth?: number;
    itemHeight?: number;
    onItemPress: (movieId: string) => void;
  }) => {
    const firstItemRef =
      useRef<React.ElementRef<typeof TouchableOpacity>>(null);
    const lastItemRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <TVFocusGuideView
          trapFocusLeft
          trapFocusRight
          destinations={[firstItemRef.current, lastItemRef.current]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rowContent}
            style={styles.rowScrollView}
          >
            {movies.map((movie, index) => {
              const isFirst = index === 0;
              const isLast = index === movies.length - 1;
              return (
                <CarouselItem
                  key={movie.id}
                  movie={movie}
                  itemWidth={itemWidth}
                  itemHeight={itemHeight}
                  onPress={() => onItemPress(movie.id.toString())}
                  ref={isFirst ? firstItemRef : isLast ? lastItemRef : null}
                />
              );
            })}
          </ScrollView>
        </TVFocusGuideView>
      </View>
    );
  }
);

export default function CarouselGrid({
  rows,
  itemWidth = 200,
  itemHeight = 120,
}: CarouselGridProps) {
  const navigation = useNavigation();

  const handleItemPress = (
    movieId: string,
    navigator: NativeStackNavigationProp<RootStackParamList>
  ) => {
    console.log("movieId", movieId);
    navigator.navigate("Detail", { id: movieId });
  };

  return (
    <View style={styles.container}>
      {rows.map((row, index) => (
        <CarouselRow
          key={`${row.title}-${index}`}
          title={row.title}
          movies={row.movies}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          onItemPress={(movieId) => handleItemPress(movieId, navigation)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  rowContainer: {
    marginBottom: 30,
  },
  rowTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  rowScrollView: {
    marginHorizontal: 10,
  },
  rowContent: {
    paddingHorizontal: 10,
  },
  carouselItemWrapper: {
    marginHorizontal: 8,
    paddingVertical: 10,
  },
  carouselItem: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "transparent",
  },
  carouselItemFocused: {
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  carouselItemImage: {
    width: "100%",
    height: "100%",
  },
});

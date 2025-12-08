import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { memo, useRef } from "react";
import { useNavigation } from "../navigation/useNavigation";
import { RootStackParamList } from "../navigation/navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Movie, movies } from "../mock/movies";

const Hero = memo(
  ({ onPress, movie }: { onPress: () => void; movie: Movie }) => {
    return (
      <TVFocusGuideView autoFocus>
        <View style={styles.hero}>
          <Image
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
            }}
            source={{
              uri: movie.image,
            }}
          />
          <TouchableOpacity style={styles.playButton} onPress={onPress}>
            <Text style={styles.text}>Play Now</Text>
          </TouchableOpacity>
        </View>
      </TVFocusGuideView>
    );
  }
);

const MovieItem = memo(
  ({
    movie,
    ref,
    onPress,
  }: {
    movie: Movie;
    ref?: React.RefObject<View>;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          overflow: "hidden",
          margin: 10,
        }}
        ref={ref}
        onPress={onPress}
      >
        <Image
          style={{
            width: 200,
            height: 100,
          }}
          source={{
            uri: movie.image,
          }}
        />
      </TouchableOpacity>
    );
  }
);

const MoviesGrid = ({ movies }: { movies: Movie[] }) => {
  const firstItemRef = useRef<View>(null);
  const navigation = useNavigation();

  return (
    <View>
      <TVFocusGuideView trapFocusLeft destinations={[firstItemRef.current]}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              ref={firstItemRef}
              onPress={() => navigateToDetail(movie.id.toString(), navigation)}
            />
          ))}
        </View>
      </TVFocusGuideView>

      <View>
        <TouchableOpacity>
          <Text>Outside Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NavItem = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.RefObject<View>;
}) => {
  return (
    <TouchableOpacity style={styles.navItem} ref={ref}>
      {children}
    </TouchableOpacity>
  );
};

const Nav = () => {
  const about = useRef<View>(null);

  return (
    <TVFocusGuideView trapFocusRight destinations={[about.current]}>
      <View style={styles.nav}>
        <NavItem>
          <Text style={styles.text}>Home</Text>
        </NavItem>
        <NavItem ref={about}>
          <Text style={styles.text}>About</Text>
        </NavItem>
        <NavItem>
          <Text style={styles.text}>Live</Text>
        </NavItem>
        <NavItem>
          <Text style={styles.text}>Settings</Text>
        </NavItem>
      </View>
    </TVFocusGuideView>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TVFocusGuideView autoFocus>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Nav />
          <ScrollView style={{ flex: 1 }}>
            <Hero
              movie={movies[0]}
              onPress={() =>
                navigateToDetail(movies[0].id.toString(), navigation)
              }
            />
            <MoviesGrid movies={Array.from(movies)} />
          </ScrollView>
        </View>
      </TVFocusGuideView>
    </View>
  );
}

const navigateToDetail = (
  id: string,
  navigator: NativeStackNavigationProp<RootStackParamList>
) => {
  navigator.navigate("Detail", { id });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  hero: {
    padding: 20,
    width: "100%",
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  nav: {
    padding: 20,
    borderRadius: 10,
    height: "100%",
    gap: 10,
  },
  navItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "magenta",
  },
});

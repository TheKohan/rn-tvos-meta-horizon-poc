import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { memo, useRef, useMemo } from "react";
import { useNavigation } from "../navigation/useNavigation";
import { RootStackParamList } from "../navigation/navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Movie, movies } from "../mock/movies";
import CarouselGrid, { CarouselRow } from "../components/CarouselGrid";

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
              uri: movie.backgroundImage,
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

  const carouselRows: CarouselRow[] = useMemo(() => {
    return [
      {
        title: "Trending Now",
        movies: movies.slice(0, 5),
      },
      {
        title: "Popular on TV",
        movies: movies.slice(5, 10),
      },
      {
        title: "New Releases",
        movies: movies.slice(10, 15),
      },
      {
        title: "Watch Again",
        movies: movies.slice(15, 20),
      },
      {
        title: "Top Picks for You",
        movies: movies.slice(20, 25),
      },
    ];
  }, []);

  return (
    <View style={styles.container}>
      <TVFocusGuideView autoFocus>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Nav />
          <ScrollView>
            <Hero
              movie={movies[0]}
              onPress={() =>
                navigateToDetail(movies[0].id.toString(), navigation)
              }
            />
            <CarouselGrid rows={carouselRows} />
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
    backgroundColor: "#5c5c5c",
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

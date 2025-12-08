import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TVFocusGuideView,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { Movie, movies } from "../mock/movies";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const movie = useMemo(
    () => movies.find((movie) => movie.id === parseInt(id)) as Movie,
    [id]
  );

  const handlePlay = () => {
    // TODO: Implement play functionality
    console.log("Playing:", movie.title);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TVFocusGuideView autoFocus>
        {/* Hero Section with Backdrop */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: movie.backgroundImage }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={styles.backdropOverlay} />

          {/* Content Overlay */}
          <View style={styles.heroContent}>
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.description}>{movie.description}</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlay}
                  activeOpacity={0.8}
                >
                  <Text style={styles.playButtonText}>▶ Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>+ My List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.infoText}>{movie.description}</Text>
        </View>
      </TVFocusGuideView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: "100%",
    height: SCREEN_HEIGHT,
    maxHeight: 600,
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  backdropOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 40,
    zIndex: 1,
  },
  movieInfo: {
    maxWidth: 600,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 24,
    lineHeight: 24,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 6,
    minWidth: 140,
    alignItems: "center",
  },
  playButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  infoSection: {
    padding: 40,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
  },
});

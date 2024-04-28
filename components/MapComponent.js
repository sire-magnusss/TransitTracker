import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import CombiDetailsModal from "./CombiDetailsModal";
import RideConfirmModal from "./OnBoardItems/RideConfirmModal";
import combisData from "../data/combis";
import SafeViewAndroid from "./SafeViewAndroid";
import TripStatusButton from "./Enroute/TripStatusButton";
import TripStatusModal from "./Enroute/TripStatusModal";
import { decodePolyline, calculateDistance, getBearing } from "../utils/utils";

const GOOGLE_MAPS_APIKEY = "AIzaSyDIw1MqO-GN2-xpmJdPbjAnciuptjbO_d4"; // Use your actual API key

const MapComponent = () => {
  const [route, setRoute] = useState([]);
  const [selectedCombi, setSelectedCombi] = useState(null);
  const [combis, setCombis] = useState([]);
  const [rideModalVisible, setRideModalVisible] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);
  const mapRef = useRef(null);
  const [tripStatusVisible, setTripStatusVisible] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: -24.673483,
    longitude: 25.926074,
  });

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=-24.686971603877858,25.877041155776624&destination=-24.663808910379593,25.980932811887435&key=${GOOGLE_MAPS_APIKEY}`
        );
        const json = await response.json();
        if (json.routes.length && json.routes[0].overview_polyline.points) {
          const points = json.routes[0].overview_polyline.points;
          const decodedCoordinates = decodePolyline(points);
          setRoute(decodedCoordinates);
          mapRef.current?.animateToRegion(
            {
              latitude:
                (json.routes[0].bounds.northeast.lat +
                  json.routes[0].bounds.southwest.lat) /
                2,
              longitude:
                (json.routes[0].bounds.northeast.lng +
                  json.routes[0].bounds.southwest.lng) /
                2,
              latitudeDelta:
                Math.abs(
                  json.routes[0].bounds.northeast.lat -
                    json.routes[0].bounds.southwest.lat
                ) * 1.2,
              longitudeDelta:
                Math.abs(
                  json.routes[0].bounds.northeast.lng -
                    json.routes[0].bounds.southwest.lng
                ) * 1.2,
            },
            2000
          );
          initializeCombis(decodedCoordinates);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchRoute();
  }, []);

  const initializeCombis = (decodedCoordinates) => {
    if (decodedCoordinates.length > 0) {
      const initialPosition = decodedCoordinates[0];
      const initializedCombis = combisData.map((combi, index) => ({
        ...combi,
        position: initialPosition,
        positionIndex: 0,
      }));
      setCombis(initializedCombis);
      startMovement(initializedCombis, decodedCoordinates);
    }
  };

  const startMovement = (initializedCombis, decodedCoordinates) => {
    initializedCombis.forEach((_, index) => {
      setTimeout(() => {
        moveCombi(index, decodedCoordinates);
      }, index * 45000); // Stagger start by 45 seconds for each combi
    });
  };

  const moveCombi = (combiIndex, decodedCoordinates) => {
    // If the ride has been accepted, stop updating combis here and rely on handleAcceptRide to manage position updates
    if (rideAccepted) return;

    const intervalId = setInterval(() => {
      setCombis((prevCombis) => {
        return prevCombis.map((combi, index) => {
          if (index === combiIndex) {
            const newPositionIndex =
              (combi.positionIndex + 1) % decodedCoordinates.length;
            const newPosition = decodedCoordinates[newPositionIndex];
            const distance = calculateDistance(userLocation, newPosition);

            // Trigger ride modal only if not already accepted and no modal is visible
            if (distance <= 50 && !rideModalVisible && !rideAccepted) {
              setRideModalVisible(true);
              setSelectedCombi(combi); // Auto-select this combi for potential boarding
            }

            return {
              ...combi,
              position: newPosition,
              positionIndex: newPositionIndex,
              rotation: getBearing(combi.position, newPosition),
            };
          }
          return combi;
        });
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const handleMarkerPress = (combi) => {
    if (!rideAccepted) {
      // Only allow selecting a combi if no ride has been accepted
      setSelectedCombi(combi);
    }
  };

  const handleAcceptRide = () => {
    if (selectedCombi) {
      // Immediately set the user's location to match the combi's current position
      setUserLocation(selectedCombi.position);
      setRideAccepted(true);
      setCombis([selectedCombi]); // Only show the selected combi
      setRideModalVisible(false);

      // Ensure user's location continuously follows the combi
      const followCombiInterval = setInterval(() => {
        setUserLocation(selectedCombi.position);
      }, 1000); // Update every second to match combi movement

      // Store interval ID if needed for cleanup
      return () => clearInterval(followCombiInterval);
    }
  };

  const handleDeclineRide = () => {
    setRideModalVisible(false);
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -24.67589,
            longitude: 25.92884,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {combis.map(
            (combi, index) =>
              combi.position && (
                <Marker
                  key={index}
                  coordinate={combi.position}
                  rotation={combi.rotation}
                  anchor={{ x: 0.5, y: 0.5 }}
                  flat={true}
                  onPress={() => handleMarkerPress(combi)}
                >
                  <Image
                    source={require("../assets/images/combiicon.png")}
                    style={styles.combiIcon}
                  />
                </Marker>
              )
          )}
          {route.length > 0 && (
            <Polyline
              coordinates={route}
              strokeColor="#41B06E"
              strokeWidth={6}
            />
          )}
          {!rideAccepted && (
            <Marker coordinate={userLocation} title="Your Location">
              <View style={styles.markerIcon}>
                <Image
                  source={require("../assets/images/mapIconUser.png")}
                  style={styles.imageStyle}
                />
              </View>
            </Marker>
          )}
        </MapView>
        {!rideAccepted && selectedCombi && (
          <CombiDetailsModal
            visible={!!selectedCombi && !rideModalVisible}
            onClose={() => setSelectedCombi(null)}
            combi={selectedCombi}
          />
        )}
        <RideConfirmModal
          visible={rideModalVisible}
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
        {tripStatusVisible && (
          <TripStatusModal
            visible={tripStatusVisible}
            onClose={() => setTripStatusVisible(false)}
          />
        )}
        {rideAccepted && (
          <TripStatusButton
            onPress={() => setTripStatusVisible(!tripStatusVisible)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  combiIcon: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },

  markerIcon: {
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 5,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: "contain", // or 'cover' depending on your preference
  },
});

export default MapComponent;

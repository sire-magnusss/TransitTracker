import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import CombiDetailsModal from "./CombiDetailsModal";
import RideConfirmModal from "./OnBoardItems/RideConfirmModal";
import combisData from "../data/combis";
import SafeViewAndroid from "./SafeViewAndroid";
import TripStatusButton from "./Enroute/TripStatusButton";
import TripStatusModal from "./Enroute/TripStatusModal";
import RatingModal from "./RatingModal";
import RouteSelectionScreen from "../screens/RouteSelectionScreen";

const GOOGLE_MAPS_APIKEY = "..."; // Use your actual API key from Google to use Map functionalities

const MapComponent = ({ navigation }) => {
  const [route, setRoute] = useState([]);
  const [selectedCombi, setSelectedCombi] = useState(null);
  const [combi, setCombi] = useState(null);
  const [rideModalVisible, setRideModalVisible] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);
  const mapRef = useRef(null);
  const [tripStatusVisible, setTripStatusVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const userLocation = {
    latitude: -24.673483,
    longitude: 25.926074,
  };

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
          initializeCombi(decodedCoordinates);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchRoute();
  }, []);

  const initializeCombi = (decodedCoordinates) => {
    if (decodedCoordinates.length > 0) {
      const initialPosition = decodedCoordinates[0];
      const combi = {
        ...combisData[0],
        position: initialPosition,
        positionIndex: 0,
      };
      setCombi(combi);
      moveCombi(combi, decodedCoordinates);
    }
  };

  const moveCombi = (combi, decodedCoordinates) => {
    const intervalId = setInterval(() => {
      setCombi((prevCombi) => {
        const newPositionIndex =
          (prevCombi.positionIndex + 1) % decodedCoordinates.length;
        const newPosition = decodedCoordinates[newPositionIndex];
        const distance = calculateDistance(userLocation, newPosition);

        if (distance <= 50) {
          setRideModalVisible(true); // Directly set visibility without checking current state
        }

        if (newPositionIndex === decodedCoordinates.length - 1) {
          clearInterval(intervalId);
          setRatingModalVisible(true);
        }

        return {
          ...prevCombi,
          position: newPosition,
          positionIndex: newPositionIndex,
          rotation: getBearing(prevCombi.position, newPosition),
        };
      });
    }, 1000); // Adjusted to realistic update frequency
    return () => clearInterval(intervalId);
  };

  const handleMarkerPress = (combi) => {
    if (!rideAccepted) {
      setSelectedCombi(combi);
    }
  };

  const handleAcceptRide = () => {
    setRideModalVisible(false);
    setRideAccepted(true);
    setTripStatusVisible(true);
  };

  const handleDeclineRide = () => {
    setRideModalVisible(false);
  };

  const handleRateRide = () => {
    setTimeout(() => {
      navigation.navigate("Drawer", { screen: "RouteSelection" });
      setRatingModalVisible(false);
    }, 3000); // 3-second delay
  };

  function calculateDistance(loc1, loc2) {
    const rad = (x) => (x * Math.PI) / 180;
    const R = 6378137; // Earth’s mean radius in meters
    const dLat = rad(loc2.latitude - loc1.latitude);
    const dLong = rad(loc2.longitude - loc1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(loc1.latitude)) *
        Math.cos(rad(loc2.latitude)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // returns the distance in meters
  }

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
          {combi && combi.position && (
            <Marker
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
        {selectedCombi && (
          <CombiDetailsModal
            visible={!!selectedCombi}
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
        {ratingModalVisible && (
          <RatingModal visible={ratingModalVisible} onRate={handleRateRide} />
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

function getBearing(startPos, endPos) {
  const startLat = startPos.latitude;
  const startLng = startPos.longitude;
  const endLat = endPos.latitude;
  const endLng = endPos.longitude;
  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  return Math.atan2(y, x) * (180 / Math.PI);
}

function decodePolyline(encoded) {
  let poly = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let b;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return poly;
}

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default MapComponent;

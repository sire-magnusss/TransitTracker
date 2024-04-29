import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import CombiDetailsModal from "./CombiDetailsModal";  // Make sure the path is correct

const GOOGLE_MAPS_APIKEY = "AIzaSyDIw1MqO-GN2-xpmJdPbjAnciuptjbO_d4";

const MapComponent = ({ route, navigation }) => {
  const { selectedRoute } = route.params;
  const [mapRoute, setMapRoute] = useState(null);
  const [combiPositions, setCombiPositions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCombi, setSelectedCombi] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchRoute = async (origin, destination) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const json = await response.json();
        if (json.routes.length && json.routes[0].overview_polyline.points) {
          const points = json.routes[0].overview_polyline.points;
          const decodedCoordinates = decodePolyline(points);
          setMapRoute(decodedCoordinates);
          initiateCombiSimulation(decodedCoordinates);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    if (selectedRoute.origin && selectedRoute.destination) {
      fetchRoute(selectedRoute.origin, selectedRoute.destination);
    }
  }, [selectedRoute]);

  const initiateCombiSimulation = (routeCoordinates) => {
    const interval = 2000; // milliseconds between position updates
    const positions = [];
    routeCoordinates.forEach((_, index) => {
      if (index % Math.floor(routeCoordinates.length / 3) === 0) { // placing combis at equal intervals
        setTimeout(() => {
          let combiIndex = 0;
          const combiMoveInterval = setInterval(() => {
            if (combiIndex < routeCoordinates.length) {
              positions[index / Math.floor(routeCoordinates.length / 3)] = routeCoordinates[combiIndex];
              setCombiPositions([...positions]);
              combiIndex++;
            } else {
              clearInterval(combiMoveInterval);
            }
          }, interval);
        }, index * 1000); // staggered start times
      }
    });
  };

  const handleCombiSelect = (combi) => {
    setSelectedCombi(combi);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: (selectedRoute.origin.latitude + selectedRoute.destination.latitude) / 2,
          longitude: (selectedRoute.origin.longitude + selectedRoute.destination.longitude) / 2,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {combiPositions.map((position, index) => (
          <Marker
            key={index}
            coordinate={position}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            onPress={() => handleCombiSelect({ ...selectedRoute.combis[index], position })}
          >
            <Image
              source={require("../assets/images/combiicon.png")}
              style={styles.combiIcon}
            />
          </Marker>
        ))}
        {mapRoute && (
          <Polyline coordinates={mapRoute} strokeColor="#41B06E" strokeWidth={6} />
        )}
      </MapView>
      <CombiDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        combi={selectedCombi}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require("../assets/images/back-icon.png")} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  combiIcon: {
    width: 50,
    height: 40,
    resizeMode: "contain"
  }
});

export default MapComponent;

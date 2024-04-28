import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "AIzaSyDIw1MqO-GN2-xpmJdPbjAnciuptjbO_d4";

const MapComponent = ({ route }) => {
  const { selectedRoute } = route.params;
  const [mapRoute, setMapRoute] = useState(null);
  const [combiPosition, setCombiPosition] = useState(null);
  const [returnCombiPosition, setReturnCombiPosition] = useState(null);
  const mapRef = useRef(null);

  const hardcodedOrigin = {
    latitude: -24.686971603877858,
    longitude: 25.877041155776624,
  };

  const hardcodedDestination = {
    latitude: -24.663808910379593,
    longitude: 25.980932811887435,
  };

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
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    if (selectedRoute.name === "Tlokweng Route 6") {
      fetchRoute(hardcodedOrigin, hardcodedDestination);
    } else if (selectedRoute.origin && selectedRoute.destination) {
      fetchRoute(selectedRoute.origin, selectedRoute.destination);
    }
  }, [selectedRoute]);

  useEffect(() => {
    if (!mapRoute || mapRoute.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < mapRoute.length - 1) {
        const nextPosition = mapRoute[index + 1];
        setCombiPosition(mapRoute[index]);
        setReturnCombiPosition(mapRoute[mapRoute.length - 1 - index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [mapRoute]);

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
        {combiPosition && (
          <Marker
            coordinate={combiPosition}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            title="Combi 1"
          >
            <Image
              source={require("../assets/images/combiicon.png")}
              style={styles.combiIcon}
            />
          </Marker>
        )}
        {returnCombiPosition && (
          <Marker
            coordinate={returnCombiPosition}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            title="Combi 2"
          >
            <Image
              source={require("../assets/images/combiicon.png")}
              style={styles.combiIcon}
            />
          </Marker>
        )}
        {mapRoute && (
          <Polyline coordinates={mapRoute} strokeColor="#41B06E" strokeWidth={6} />
        )}
      </MapView>
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
  combiIcon: {
    width: 50,
    height: 40,
    resizeMode: "contain"
  }
});

export default MapComponent;

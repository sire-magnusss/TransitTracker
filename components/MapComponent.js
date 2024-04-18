import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "AIzaSyDIw1MqO-GN2-xpmJdPbjAnciuptjbO_d4";

const MapComponent = () => {
  const [route, setRoute] = useState(null);
  const [combiPosition, setCombiPosition] = useState(null);
  const [combiRotation, setCombiRotation] = useState(0);
  const mapRef = useRef(null);

  const userPosition = {
    latitude: -24.673680865636495,
    longitude: 25.925682664900226,
  };

  const origin = {
    latitude: -24.686971603877858,
    longitude: 25.877041155776624,
  };

  const destination = {
    latitude: -24.663808910379593,
    longitude: 25.980932811887435,
  };

  const busStopPosition = {
    latitude: -24.673161,
    longitude: 25.925708,
  };

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const json = await response.json();
        if (json.routes.length && json.routes[0].overview_polyline.points) {
          const points = json.routes[0].overview_polyline.points;
          const decodedCoordinates = decodePolyline(points);
          setRoute(decodedCoordinates);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchRoute();
  }, []);

  useEffect(() => {
    if (!route || route.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < route.length - 1) {
        const nextPosition = route[index + 1];
        const currentBearing = getBearing(
          route[index].latitude,
          route[index].longitude,
          nextPosition.latitude,
          nextPosition.longitude
        );
        setCombiPosition(route[index]);
        setCombiRotation(currentBearing);

        mapRef.current?.animateCamera(
          {
            center: route[index],
            pitch: 2,
            heading: currentBearing,
            altitude: 200,
            zoom: 15, // Lower zoom level for broader view
          },
          { duration: 2000 } // Slower animation for smooth transition
        );

        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // Slower combi movement

    return () => clearInterval(interval);
  }, [route]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: 0.5, // Broader initial view
          longitudeDelta: 0.5,
        }}
      >
        <Marker coordinate={origin} title="Game City" />
        <Marker coordinate={destination} title="Tlokweng" />
        <Marker coordinate={userPosition} title="User Stop" />
        {combiPosition && (
          <Marker
            coordinate={combiPosition}
            rotation={combiRotation}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            title="Combi"
          >
            <Image
              source={require("../assets/images/combiicon.png")}
              style={styles.combiIcon}
            />
          </Marker>
        )}
        {route && (
          <Polyline coordinates={route} strokeColor="#41B06E" strokeWidth={6} />
        )}
        <Marker coordinate={busStopPosition} title="Bus Stop">
          <Image
            source={require("../assets/images/stopo.png")}
            style={styles.markerIcon}
          />
        </Marker>
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

function getBearing(startLat, startLng, destLat, destLng) {
  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  return Math.atan2(y, x) * (180 / Math.PI);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  combiIcon: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
});

export default MapComponent;

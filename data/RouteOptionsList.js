// RouteOptionsList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RouteOptionsList = ({ routes, onRouteSelect }) => {
  return (
    <View style={styles.listContainer}>
      {routes.map((route) => (
        <TouchableOpacity key={route.id} style={styles.routeItem} onPress={() => onRouteSelect(route)}>
          <Text style={styles.routeText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  routeItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#253237',
    borderRadius: 5,
  },
  routeText: {
    fontSize: 16,
    color: '#333',
  }
});

export default RouteOptionsList;

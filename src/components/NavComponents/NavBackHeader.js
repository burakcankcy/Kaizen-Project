import {Image, Pressable, Text, View} from 'react-native';
import React, {Component} from 'react';
import {IconButton} from 'react-native-paper';
import {icons} from '../../theme/icons';

export default class NavBackHeader extends Component {
  render() {
    const {props} = this.props;

    return (
      <Pressable
        onPress={() => props.navigation.goBack()}
        style={{position: 'absolute', marginLeft: 10, marginTop: 20}}>
        <Image source={icons.leftArrowIcon} />
      </Pressable>
    );
  }
}

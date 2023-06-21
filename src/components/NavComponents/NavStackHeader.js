import {Image, Pressable, Text, View} from 'react-native';
import React, {Component} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {icons} from '../../theme/icons';

export default class NavStackHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  render() {
    const {login} = this.state;
    const {props} = this.props;
    console.log(login);
    return (
      <View
        style={{
          paddingVertical: 18,
          paddingHorizontal: 15,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <View>
          <Image resizeMode="stretch" source={icons.dahaIcon} />
        </View>
        {login === false ? (
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => this.setState({login: true})}
              style={{marginRight: 10}}
              buttonColor="red"
              mode="contained">
              Giriş Yap
            </Button>
            <Image source={icons.notLoginIcon} />
          </View>
        ) : (
          <Pressable
            onPress={() => this.setState({login: false})}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.loginIcon} />
          </Pressable>
        )}
      </View>
    );
  }
}

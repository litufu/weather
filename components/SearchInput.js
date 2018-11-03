import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,

} from 'react-native';
import PropTypes from 'prop-types'

export default class SearchInput extends React.Component{
  state={text:""}

  static propTypes={
    onSubmit:PropTypes.func.isRequired,
    placeholder:PropTypes.string,
  }

  static defaultProps = {
    placeholder:""
  }

  onSubmit = () =>{
    const {onSubmit} = this.props
    const {text} = this.state
    onSubmit(text)
    this.setState({text:""})
  }

  render(){
    const {text} = this.state
    return(
      <View style={styles.container}>
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          clearButtonMode="always"
          style={styles.textInput}
          onChangeText={text=>this.setState({text})}
          onSubmitEditing={this.onSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
   height: 40,
   width:300,
   marginTop: 20,
   backgroundColor: '#666',
   marginHorizontal: 40,
   paddingHorizontal: 10,
   borderRadius: 5,
  },
  textInput:{
    flex:1,
    color:"white",
  },
})

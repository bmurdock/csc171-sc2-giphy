import React from 'react';
import {TextInput} from 'react-native';
// here we go

export default class DelayInput extends React.Component{
    constructor(props)
    {
        super(props);
        this.searchWaiting = null;
    }

    render()
    {
        // we are expecting to use this component with 3 
        // different props
        const {placeholder, onSearchText, delay} = this.props;
        return (
            <TextInput 
                placeholder={placeholder}
                onChangeText={(text) =>
                {
                    // if there is a timer we need to clear it
                    if(this.searchWaiting)
                    {
                        clearTimeout(this.searchWaiting);
                    }
    
                    // set a new timer
                    this.searchWaiting = setTimeout(() =>
                    {
                        // as soon as timer completes set the timer to null
                        this.searchWaiting  = null;
                        // call the onSearchText function
                        onSearchText(text);
                    }, delay || 2000);
                    // delay || 2000 allows use to define a fallback
                    // of 2000 ms in case the component does not
                    // have a delay prop passed in
                }}
            />
        )
    }
}
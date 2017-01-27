import React, { Component, PropTypes } from 'react';

class requestExample extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      people : {movies: []}
	    };
	}

	componentDidMount() {
		var url = 'https://facebook.github.io/react-native/movies.json'
	    fetch(url, {
	      method: 'get'
	    }).then(function(response) {
	      return response.json()
	    }).then(function(response) {

	      	this.setState({ people: response })
	    }.bind(this));
  	}

	render() {
		//console.log(1,this.state.people.movies)

	    return (
	      <div>
	      	{this.state.people.movies.map((retrievedData, key) => {
	      	return (
	      		<span key={key} className="titles">{retrievedData.title}</span>
	      	)
	      })}</div>
	    );
	}
}


export default requestExample;
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import { config } from 'wmkit/config';

export default class Rating extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    let { maxRating, style, activeOpacity, rating, ...rest } = this.props;

    return (
      <StarRating
        activeOpacity={activeOpacity || 0.8}
        containerStyle={style}
        emptyStar={require('./img/emptyStar.png')}
        emptyStarColor={'#ccc'}
        fullStar={{uri: config.OSS_HOST + '/assets/image/theme/star.png'}}
        maxStars={maxRating}
        rating={rating}
        starSize={12}
        starStyle={{margin:2}}
        {...rest}
      />
    );
  };
}

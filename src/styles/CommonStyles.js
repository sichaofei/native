
import {width, height, scale} from './SizeHelper.js';

module.exports ={
    container: {
        width: width,
        height: height,
        transform: [{translateX: -width * .5}, {translateY: -height * .5}, {scale: scale}, {translateX: width * .5}, {translateY: height * .5}]
    },
      tabBarIcon:{
          width:40,
          height:40,
    }
}
import {PixelRatio,Dimensions} from 'react-native';
const dp2px = dp=>PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = px=>PixelRatio.roundToNearestPixel(px);
let designSize = {width:750,height:1334}; //假设设计尺寸为：750*1334
let pxRatio = PixelRatio.get();
let win_width = Dimensions.get("window").width;
let win_height = Dimensions.get("window").height;
let width = dp2px(win_width);
let height = dp2px(win_height);
let design_scale = designSize.width/width;
height = height*design_scale
let scale = 1/pxRatio/design_scale;

const ptd = (uiElePx) => {
    return uiElePx * win_width / designSize.width;
}

module.exports = {
    width,
    height,
    scale,
    ptd
}
import React from 'react';
import { View } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  G, 
  Path 
} from 'react-native-svg';

export default function Logo({ width = 300, height = 300 }) {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 768 768">
        <Defs>
          <LinearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <Stop offset="0%" stopColor="#007B55" />
            <Stop offset="100%" stopColor="#00AB55" />
          </LinearGradient>
          <LinearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor="#5BE584" />
            <Stop offset="100%" stopColor="#00AB55" />
          </LinearGradient>
          <LinearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor="#5BE584" />
            <Stop offset="100%" stopColor="#00AB55" />
          </LinearGradient>
        </Defs>
        <G fill="#00AB55" fillRule="evenodd" stroke="none" strokeWidth={1} transform="scale(1.5)">
          <Path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <Path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <Path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </G>
      </Svg>
    </View>
  );
}
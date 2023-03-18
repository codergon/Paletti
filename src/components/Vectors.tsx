import Svg, {
  SvgProps,
  Path,
  G,
  Mask,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface VectorProps extends SvgProps {
  color?: string;
  size?: number;
  isDark?: boolean;
}

const Vectors = {
  NoResult: ({style, size = 200}: VectorProps) => (
    <Svg
      style={[style, {width: size, height: size}]}
      fill="none"
      viewBox="0 0 150 150">
      <Path
        d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
        fill="url(#a)"
      />
      <Path
        d="M120 150H30V53a16.018 16.018 0 0 0 16-16h58a15.906 15.906 0 0 0 4.691 11.308A15.89 15.89 0 0 0 120 53v97Z"
        fill="#fff"
      />
      <Path
        d="M75 102c13.255 0 24-10.745 24-24S88.255 54 75 54 51 64.745 51 78s10.745 24 24 24Z"
        fill="#4285F4"
      />
      <Path
        d="M83.485 89.314 75 80.829l-8.485 8.485-2.829-2.829L72.172 78l-8.486-8.485 2.829-2.829L75 75.172l8.485-8.486 2.829 2.829L77.828 78l8.486 8.485-2.829 2.829Z"
        fill="#fff"
      />
      <Path
        d="M88 108H62a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6ZM97 120H53a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
        fill="#DFEAFB"
      />
      <Defs>
        {/* @ts-ignore */}
        <LinearGradient
          id="a"
          x1={75}
          y1={0}
          x2={75}
          y2={150}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E3ECFA" />
          <Stop offset={1} stopColor="#DAE7FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  ),

  EmptySheet: ({style, size = 200}: VectorProps) => (
    <>
      <Svg
        style={[style, {width: size, height: (178 / 150) * size}]}
        fill="none"
        viewBox="0 0 150 178">
        <Path
          d="M75 167c41.421 0 75-33.579 75-75s-33.579-75-75-75S0 50.579 0 92s33.579 75 75 75Z"
          fill="#E3ECFA"
        />
        {/* @ts-ignore */}
        <G filter="url(#a)">
          <Path
            d="M118 60H32a5 5 0 0 0-5 5v105a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V65a5 5 0 0 0-5-5Z"
            fill="#fff"
          />
        </G>
        <Path d="M65 75H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M83 88H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DFEAFB" />
        <Path d="M65 102H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M83 115H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DFEAFB" />
        <Path d="M65 129H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M83 142H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DFEAFB" />
        {/* @ts-ignore */}
        <G filter="url(#b)">
          <Path
            d="M118 9H32a5 5 0 0 0-5 5v30a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V14a5 5 0 0 0-5-5Z"
            fill="#1485FD"
          />
        </G>
        <Path d="M65 20H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M83 33H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#fff" />
        <Defs />
      </Svg>
    </>
  ),

  EmptyList: ({style, size = 200, isDark = false}: VectorProps) => (
    <>
      <Svg
        style={[style, {width: size, height: 0.7 * size}]}
        fill="none"
        viewBox="0 0 200 140">
        <Path
          d="M162 0H42c-5.523 0-10 4.477-10 10v120c0 5.523 4.477 10 10 10h120c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10Z"
          fill={isDark ? '#2e2e2e' : '#F1F1F1'}
        />
        {/* @ts-ignore */}
        <G filter="url(#a)">
          <Path
            d="M11 10.5h135a4.5 4.5 0 0 1 4.5 4.5v25a4.5 4.5 0 0 1-4.5 4.5H11A4.5 4.5 0 0 1 6.5 40V15a4.5 4.5 0 0 1 4.5-4.5Z"
            fill={isDark ? '#333' : '#fff'}
            stroke={isDark ? '#666' : '#DDD'}
          />
        </G>
        <Path d="M75 18H49a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M93 31H49a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DEE9FC" />
        <Path
          d="M33 13H14a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5V18a5 5 0 0 0-5-5Z"
          fill="#2967C4"
        />
        <Path
          d="M21.222 30.78h2l.022-.77c0-1.012.638-1.276 1.54-1.562a4.331 4.331 0 0 0 3.146-4.158A4.152 4.152 0 0 0 23.574 20a4.48 4.48 0 0 0-4.576 4.6h2.068a2.517 2.517 0 0 1 2.51-2.576 2.109 2.109 0 0 1 2.222 2.288 2.278 2.278 0 0 1-1.672 2.134l-.726.288a2.917 2.917 0 0 0-2.2 3.278l.022.768Zm.99 4.754a1.465 1.465 0 0 0 1.518-1.454 1.465 1.465 0 0 0-1.518-1.452 1.468 1.468 0 0 0-1.518 1.452 1.465 1.465 0 0 0 1.518 1.454Z"
          fill="#fff"
        />
        {/* @ts-ignore */}
        <G filter="url(#b)">
          <Path
            d="M54 53.5h135a4.501 4.501 0 0 1 4.5 4.5v25a4.5 4.5 0 0 1-4.5 4.5H54a4.5 4.5 0 0 1-4.5-4.5V58a4.5 4.5 0 0 1 4.5-4.5Z"
            fill={isDark ? '#333' : '#fff'}
            stroke={isDark ? '#666' : '#DDD'}
          />
        </G>
        <Path d="M118 61H92a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M136 74H92a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DEE9FC" />
        <Path
          d="M76 56H57a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5V61a5 5 0 0 0-5-5Z"
          fill="#2967C4"
        />
        <Path
          d="M64.222 73.78h2l.022-.77c0-1.012.638-1.276 1.54-1.562a4.331 4.331 0 0 0 3.146-4.158A4.152 4.152 0 0 0 66.574 63a4.48 4.48 0 0 0-4.576 4.6h2.068a2.517 2.517 0 0 1 2.51-2.576 2.109 2.109 0 0 1 2.222 2.288 2.278 2.278 0 0 1-1.672 2.134l-.726.288a2.917 2.917 0 0 0-2.2 3.278l.022.768Zm.99 4.754a1.465 1.465 0 0 0 1.518-1.454 1.465 1.465 0 0 0-1.518-1.452 1.468 1.468 0 0 0-1.518 1.452 1.465 1.465 0 0 0 1.518 1.454Z"
          fill="#fff"
        />
        {/* @ts-ignore */}
        <G filter="url(#c)">
          <Path
            d="M11 96.5h135a4.501 4.501 0 0 1 4.5 4.5v25a4.5 4.5 0 0 1-4.5 4.5H11a4.5 4.5 0 0 1-4.5-4.5v-25a4.5 4.5 0 0 1 4.5-4.5Z"
            fill={isDark ? '#333' : '#fff'}
            stroke={isDark ? '#666' : '#DDD'}
          />
        </G>
        <Path d="M75 104H49a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z" fill="#B4DAFF" />
        <Path d="M93 117H49a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z" fill="#DEE9FC" />
        <Path
          d="M33 99H14a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5v-19a5 5 0 0 0-5-5Z"
          fill="#2967C4"
        />
        <Path
          d="M21.222 116.78h2l.022-.77c0-1.012.638-1.276 1.54-1.562a4.329 4.329 0 0 0 3.146-4.158 4.148 4.148 0 0 0-2.671-4.023 4.138 4.138 0 0 0-1.685-.267 4.48 4.48 0 0 0-4.576 4.6h2.068a2.519 2.519 0 0 1 2.51-2.576 2.096 2.096 0 0 1 1.634.636 2.108 2.108 0 0 1 .588 1.652 2.278 2.278 0 0 1-1.672 2.134l-.726.288a2.916 2.916 0 0 0-2.2 3.278l.022.768Zm.99 4.754a1.461 1.461 0 0 0 1.398-.884c.078-.18.119-.374.12-.57a1.466 1.466 0 0 0-1.518-1.452 1.459 1.459 0 0 0-1.065.406 1.459 1.459 0 0 0-.453 1.046 1.467 1.467 0 0 0 1.518 1.454Z"
          fill="#fff"
        />
        <Defs />
      </Svg>
    </>
  ),

  EmptyCourse: ({}: VectorProps) => (
    <Svg width={150} height={153} fill="none">
      <Path
        d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
        fill="#E3ECFA"
      />
      {/* @ts-ignore */}
      <G filter="url(#a)">
        <Mask
          id="c"
          // @ts-ignore
          style={{
            maskType: 'alpha',
          }}
          // @ts-ignore
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={150}
          height={150}>
          <Path
            d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
            fill="url(#b)"
          />
        </Mask>
        {/* @ts-ignore */}
        <G mask="url(#c)">
          <Path
            d="M118 43H32a5 5 0 0 0-5 5v105a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V48a5 5 0 0 0-5-5Z"
            fill="#fff"
          />
        </G>
      </G>
      <Path
        d="M66 53H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6ZM66 95H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
        fill="#E1EBFA"
      />
      <Path
        d="M108 68H42a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h66a4 4 0 0 0 4-4V72a4 4 0 0 0-4-4Z"
        stroke="#1485FD"
        strokeWidth={2}
      />
      <Path
        d="M108 109H42a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h66a5 5 0 0 0 5-5v-8a5 5 0 0 0-5-5Z"
        fill="#DFEAFB"
      />
      <Path d="M53 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#fff" />
      <Path d="M75 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#1485FD" />
      <Path d="M97 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#fff" />
      <Path d="M86 88a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="#DFEAFB" />
      <Path
        d="M89.907 104.37c-.8 0-1.547 0-2.227-.043a4.567 4.567 0 0 1-3.884-2.749l-4.219-8.338a1.8 1.8 0 0 1 .182-2.529 1.628 1.628 0 0 1 1.035-.359 1.918 1.918 0 0 1 1.437.714l1.916 2.615.029.034V83.78a1.858 1.858 0 1 1 3.717 0v6.5a1.73 1.73 0 1 1 3.444 0v1.355a1.73 1.73 0 1 1 3.444 0v1.044a1.73 1.73 0 1 1 3.444 0v6.337c-.034 1.949-.915 5.235-4.014 5.235-.225.01-2.131.12-4.3.12l-.004-.001Z"
        fill="#1485FD"
        stroke="#fff"
      />
      <Defs>
        {/* @ts-ignore */}
        <LinearGradient
          id="b"
          x1={75}
          y1={0}
          x2={75}
          y2={150}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E3ECFA" />
          <Stop offset={1} stopColor="#DAE7FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  ),
};

export default Vectors;

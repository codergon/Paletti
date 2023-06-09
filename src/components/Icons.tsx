import {ViewProps} from './Themed';
import {SECONDARY_COLOR} from '@constants/Colors';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

interface IconProps extends ViewProps {
  size?: number;
  fill?: string;
  color?: string;
  strokeWidth?: number;
}

const Icons = {
  Exclude: ({color = SECONDARY_COLOR, size = 24, strokeWidth = 1.7}) => {
    return (
      <Svg
        style={{
          height: size,
          width: size,
        }}
        fill="none"
        viewBox="0 0 24 24">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M9 15.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M15 21.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5ZM15.46 10.96l6 6M13.773 13.773l6 6M10.96 15.46l6 6M7.04 2.54l6 6M4.228 4.227l6 6M2.54 7.039l6 6"
        />
      </Svg>
    );
  },
  Camera: ({color = SECONDARY_COLOR, size = 24, strokeWidth = 1.7}) => {
    return (
      <Svg
        style={{
          height: size,
          width: size,
        }}
        fill="none"
        viewBox="0 0 24 24">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M4 10.765v4.941A3.314 3.314 0 0 0 7.333 19h8.333A3.314 3.314 0 0 0 19 15.706v-4.941a3.314 3.314 0 0 0-3.333-3.294H7.333A3.314 3.314 0 0 0 4 10.765Z"
          clipRule="evenodd"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M11.5 15.706a2.471 2.471 0 1 1 2.5-2.471 2.485 2.485 0 0 1-2.5 2.471Z"
          clipRule="evenodd"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M9 7.471v-.824A1.657 1.657 0 0 1 10.667 5h1.666A1.657 1.657 0 0 1 14 6.647v.824"
        />
      </Svg>
    );
  },
  CaretUpDown: ({color = SECONDARY_COLOR, size = 24, strokeWidth = 0.8}) => {
    return (
      <Svg
        fill="none"
        style={{
          width: size,
          height: size * (9 / 7),
        }}
        viewBox="0 0 7 9">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M6 6 3.5 8 1 6m0-3 2.5-2L6 3"
        />
      </Svg>
    );
  },

  Document: ({color = SECONDARY_COLOR, size = 24, strokeWidth = 1.7}) => {
    return (
      <Svg
        style={{
          height: size,
          width: size,
        }}
        fill="none"
        viewBox="0 0 24 24">
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 5h-5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4Z"
          clipRule="evenodd"
        />
        <Path
          fill={color}
          d="M15.5 9.75a.75.75 0 0 0 0-1.5v1.5Zm-6-1.5a.75.75 0 0 0 0 1.5v-1.5Zm6 4.5a.75.75 0 0 0 0-1.5v1.5Zm-6-1.5a.75.75 0 0 0 0 1.5v-1.5Zm3 4.5a.75.75 0 0 0 0-1.5v1.5Zm-3-1.5a.75.75 0 0 0 0 1.5v-1.5Zm6-6h-6v1.5h6v-1.5Zm0 3h-6v1.5h6v-1.5Zm-3 3h-3v1.5h3v-1.5Z"
        />
      </Svg>
    );
  },

  BodyScan: ({color, size = 22}: {color?: string; size?: number}) => {
    return (
      <Svg
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 24 24">
        <Path
          d="M18.417 1H23v4.583M5.583 23H1v-4.583M1 5.583V1h4.583M23 18.417V23h-4.583"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 7.5c3.315 0 6 1.342 6 3V17H6v-1.5c0-1.658 2.685-3 6-3Z"
          fill={color}
        />
      </Svg>
    );
  },

  Delete: ({size = 16}) => (
    <Svg
      fill="none"
      viewBox="0 0 16 17"
      style={{
        width: size,
        height: size * (17 / 16),
      }}>
      <Path
        d="M7 2.75a.5.5 0 0 0-.5.5v.25h-3a.5.5 0 0 0 0 1h.25V12c0 .827.673 1.5 1.5 1.5h5.5c.827 0 1.5-.673 1.5-1.5V4.5h.25a.5.5 0 0 0 0-1h-3v-.25a.5.5 0 0 0-.5-.5H7ZM4.75 4.5h6.5V12a.5.5 0 0 1-.5.5h-5.5a.5.5 0 0 1-.5-.5V4.5Zm1.125 1a.375.375 0 0 0-.375.375v5.25a.375.375 0 0 0 .75 0v-5.25a.375.375 0 0 0-.375-.375ZM8 5.5c-.276 0-.375.224-.375.5v5c0 .276.099.5.375.5s.375-.224.375-.5V6c0-.276-.099-.5-.375-.5Zm2.125 0a.375.375 0 0 0-.375.375v5.25a.375.375 0 0 0 .75 0v-5.25a.375.375 0 0 0-.375-.375Z"
        fill="#000"
      />
    </Svg>
  ),

  Close: ({size, fill}: IconProps) => (
    <Svg
      height={size || 18}
      width={size || 18}
      viewBox="0 0 18 18"
      fill={fill || '#808080'}>
      <Path d="M1.99.99a1 1 0 0 0-.697 1.717L7.586 9l-6.293 6.293a1 1 0 1 0 1.414 1.414L9 10.414l6.293 6.293a1 1 0 1 0 1.414-1.414L10.414 9l6.293-6.293a1 1 0 1 0-1.414-1.414L9 7.586 2.707 1.293A1 1 0 0 0 1.99.99Z" />
      <Path d="M1.99.99a1 1 0 0 0-.697 1.717L7.586 9l-6.293 6.293a1 1 0 1 0 1.414 1.414L9 10.414l6.293 6.293a1 1 0 1 0 1.414-1.414L10.414 9l6.293-6.293a1 1 0 1 0-1.414-1.414L9 7.586 2.707 1.293A1 1 0 0 0 1.99.99Z" />
    </Svg>
  ),

  SoftStar: ({size = 30, color, style}: IconProps) => (
    <Svg
      style={[
        style,
        {
          width: size,
          height: size,
        },
      ]}
      fill="none"
      viewBox="0 0 30 30">
      <Path
        stroke={color}
        strokeWidth={1.3}
        d="M15 0L15.0029 14.9852L20.7403 1.1418L15.0083 14.9875L25.6066 4.3934L15.0125 14.9917L28.8582 9.25972L15.0148 14.9971L30 15L15.0148 15.0029L28.8582 20.7403L15.0125 15.0083L25.6066 25.6066L15.0083 15.0125L20.7403 28.8582L15.0029 15.0148L15 30L14.9971 15.0148L9.25972 28.8582L14.9917 15.0125L4.3934 25.6066L14.9875 15.0083L1.1418 20.7403L14.9852 15.0029L0 15L14.9852 14.9971L1.1418 9.25972L14.9875 14.9917L4.3934 4.3934L14.9917 14.9875L9.25972 1.1418L14.9971 14.9852L15 0Z"
      />
    </Svg>
  ),

  Search: ({color, style}: IconProps) => (
    <Svg style={style} viewBox="0 0 20 20">
      <Path
        d="M9.58342 18.1253C4.87508 18.1253 1.04175 14.292 1.04175 9.58366C1.04175 4.87533 4.87508 1.04199 9.58342 1.04199C14.2917 1.04199 18.1251 4.87533 18.1251 9.58366C18.1251 14.292 14.2917 18.1253 9.58342 18.1253ZM9.58342 2.29199C5.55841 2.29199 2.29175 5.56699 2.29175 9.58366C2.29175 13.6003 5.55841 16.8753 9.58342 16.8753C13.6084 16.8753 16.8751 13.6003 16.8751 9.58366C16.8751 5.56699 13.6084 2.29199 9.58342 2.29199Z"
        fill={`${color}`}
        stroke={`${color}`}
        strokeWidth={0.1}
      />
      <Path
        d="M18.3333 18.9585C18.175 18.9585 18.0166 18.9002 17.8916 18.7752L16.225 17.1085C15.9833 16.8669 15.9833 16.4669 16.225 16.2252C16.4666 15.9835 16.8666 15.9835 17.1083 16.2252L18.775 17.8919C19.0166 18.1335 19.0166 18.5335 18.775 18.7752C18.65 18.9002 18.4916 18.9585 18.3333 18.9585Z"
        fill={`${color}`}
        stroke={`${color}`}
        strokeWidth={0.1}
      />
    </Svg>
  ),

  SignOut: ({style, size = 20}: IconProps) => (
    <Svg
      style={[
        style,
        {
          width: size,
          height: size,
        },
      ]}
      fill="none"
      viewBox="0 0 32 32">
      <Path
        d="M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12c4.05 0 7.64-2.012 9.813-5.094l-1.625-1.156A9.984 9.984 0 0 1 16 26c-5.535 0-10-4.465-10-10S10.465 6 16 6a9.99 9.99 0 0 1 8.188 4.25l1.625-1.156A11.987 11.987 0 0 0 16 4Zm7.344 7.281-1.438 1.438L24.188 15H12v2h12.188l-2.282 2.281 1.438 1.438 4-4L28.03 16l-.687-.719-3.999-4Z"
        fill="#111"
      />
    </Svg>
  ),

  Google: ({style, size = 20}: IconProps) => (
    <Svg
      style={[
        style,
        {
          width: size,
          height: size,
        },
      ]}
      fill="none"
      viewBox="0 0 20 21">
      <Path
        fill="#4285F4"
        d="M20 10.43c0-.838-.068-1.45-.215-2.085h-9.58v3.787h5.623c-.114.94-.726 2.358-2.086 3.31l-.02.127 3.03 2.347.21.02C18.889 16.157 20 13.538 20 10.432"
      />
      <Path
        fill="#34A853"
        d="M10.204 20.409c2.756 0 5.069-.907 6.758-2.472l-3.22-2.494c-.862.6-2.018 1.02-3.538 1.02-2.698 0-4.988-1.78-5.804-4.24l-.12.01-3.15 2.438-.041.114a10.197 10.197 0 009.115 5.624z"
      />
      <Path
        fill="#FBBC05"
        d="M4.399 12.223a6.282 6.282 0 01-.34-2.019c0-.703.125-1.383.329-2.018l-.006-.135-3.19-2.477-.104.05A10.214 10.214 0 000 10.204c0 1.644.397 3.198 1.088 4.58L4.4 12.223"
      />
      <Path
        fill="#EB4335"
        d="M10.204 3.946c1.917 0 3.21.827 3.946 1.519l2.88-2.812C15.26 1.01 12.96 0 10.204 0 6.214 0 2.767 2.29 1.09 5.624l3.3 2.562c.827-2.46 3.117-4.24 5.815-4.24"
      />
    </Svg>
  ),

  Logo: ({style}: IconProps) => (
    <Svg style={style} fill="none" viewBox="0 0 300 300">
      <Rect width={300} height={300} rx={20} fill="#20A18F" />
      <Path
        d="M62.11 106.563V61.23h54.935c18.007 0 32.608 10.128 32.608 22.667 0 12.514 14.595 22.666 32.607 22.666h55.631V61.23"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 114.785V69.453h54.935c18.007 0 32.608 10.151 32.608 22.666 0 12.539 14.595 22.666 32.607 22.666h55.631V69.453"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 123.037V77.704h54.935c18.007 0 32.608 10.128 32.608 22.666 0 12.539 14.595 22.667 32.607 22.667h55.631V77.704"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 131.283V85.951h54.935c18.007 0 32.608 10.128 32.608 22.666 0 12.539 14.595 22.666 32.607 22.666h55.631V85.951"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 139.535V94.202h54.935c18.007 0 32.608 10.128 32.608 22.666 0 12.539 14.595 22.667 32.607 22.667h55.631V94.202"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 147.781v-45.332h54.935c18.007 0 32.608 10.127 32.608 22.666s14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 156.033V110.7h54.935c18.007 0 32.608 10.128 32.608 22.667 0 12.538 14.595 22.666 32.607 22.666h55.631V110.7"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 164.279v-45.332h54.935c18.007 0 32.608 10.152 32.608 22.666 0 12.539 14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 172.531v-45.333h54.935c18.007 0 32.608 10.128 32.608 22.667 0 12.538 14.595 22.666 32.607 22.666h55.631v-45.333"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 180.777v-45.332h54.935c18.007 0 32.608 10.152 32.608 22.666 0 12.539 14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 189.029v-45.333h54.935c18.007 0 32.608 10.128 32.608 22.667 0 12.538 14.595 22.666 32.607 22.666h55.631v-45.333"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 197.275v-45.332h54.935c18.007 0 32.608 10.127 32.608 22.666s14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 205.527v-45.333h54.935c18.007 0 32.608 10.128 32.608 22.667 0 12.538 14.595 22.666 32.607 22.666h55.631v-45.333"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 213.773v-45.332h54.935c18.007 0 32.608 10.128 32.608 22.666 0 12.539 14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 222.025v-45.332h54.935c18.007 0 32.608 10.127 32.608 22.666 0 12.538 14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 230.271v-45.332h54.935c18.007 0 32.608 10.127 32.608 22.666s14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M62.11 238.523v-45.332h54.935c18.007 0 32.608 10.127 32.608 22.666 0 12.538 14.595 22.666 32.607 22.666h55.631v-45.332"
        stroke="#E5E013"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Path
        d="M105.196 234.597c7.453 0 13.494-6.037 13.494-13.484s-6.041-13.484-13.494-13.484c-7.453 0-13.495 6.037-13.495 13.484s6.042 13.484 13.495 13.484ZM197.087 93.826c7.453 0 13.495-6.037 13.495-13.484s-6.042-13.484-13.495-13.484c-7.453 0-13.495 6.037-13.495 13.484s6.042 13.484 13.495 13.484Z"
        fill="#EBC4BA"
      />
    </Svg>
  ),

  // Socials
  Snapchat: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Path
          fill="#FEFC00"
          d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
        />
        <Path
          fill="#fff"
          d="M30.727 25.729c-3.872-1.874-4.489-4.768-4.516-4.982-.034-.26-.071-.465.216-.729.276-.256 1.503-1.015 1.844-1.253.562-.393.81-.786.627-1.269-.127-.334-.438-.46-.766-.46-.103 0-.206.012-.307.035-.619.134-1.219.444-1.566.527a.545.545 0 0 1-.128.018c-.185 0-.256-.083-.238-.306.044-.675.136-1.994.029-3.226-.146-1.696-.693-2.536-1.341-3.279-.314-.36-1.77-1.908-4.58-1.908-2.811 0-4.266 1.548-4.577 1.904-.65.743-1.197 1.583-1.342 3.278-.106 1.232-.01 2.55.029 3.227.013.212-.052.305-.238.305a.556.556 0 0 1-.127-.017c-.347-.084-.948-.393-1.566-.528a1.418 1.418 0 0 0-.307-.034c-.33 0-.639.128-.767.46-.182.483.064.875.629 1.269.34.238 1.567.996 1.844 1.253.286.264.25.468.216.728-.028.218-.645 3.112-4.516 4.982-.227.11-.613.343.068.718 1.068.59 1.779.527 2.331.883.469.302.192.954.533 1.189.419.29 1.657-.02 3.257.508 1.342.442 2.157 1.69 4.535 1.69 2.38 0 3.218-1.254 4.535-1.69 1.597-.528 2.838-.219 3.258-.508.34-.235.064-.887.533-1.189.552-.356 1.263-.292 2.331-.883.68-.37.293-.603.067-.713Z"
        />
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M31.53 24.574c.376.21.707.462.88.935.195.529.076 1.128-.4 1.636l-.006.008a2.49 2.49 0 0 1-.67.525c-.5.274-1.032.486-1.584.63a.98.98 0 0 0-.297.136c-.094.084-.133.188-.182.318-.038.098-.08.21-.156.34-.131.228-.31.425-.527.575-.516.357-1.096.379-1.71.402h-.002c-.555.022-1.183.046-1.901.283-.29.096-.597.284-.952.503h-.003c-.866.532-2.052 1.258-4.021 1.258-1.972 0-3.15-.724-4.01-1.253-.358-.222-.667-.412-.965-.51-.718-.238-1.348-.262-1.903-.283-.614-.024-1.194-.046-1.71-.402a1.777 1.777 0 0 1-.463-.47c-.12-.174-.175-.321-.221-.445-.05-.13-.088-.234-.183-.317a1.032 1.032 0 0 0-.316-.141 6.925 6.925 0 0 1-1.563-.625 2.533 2.533 0 0 1-.638-.484c-.507-.52-.637-1.137-.438-1.68.226-.613.715-.858 1.228-1.115.088-.044.177-.089.265-.136 1.137-.617 2.027-1.389 2.65-2.299.177-.257.33-.529.46-.813.06-.166.06-.256.018-.34a.567.567 0 0 0-.17-.17 63.078 63.078 0 0 0-.673-.441c-.185-.12-.333-.217-.435-.289-.483-.337-.82-.695-1.031-1.096a2.184 2.184 0 0 1-.106-1.815c.318-.84 1.114-1.362 2.076-1.362a2.867 2.867 0 0 1 .761.1c-.008-.57.005-1.18.056-1.778.181-2.098.916-3.2 1.683-4.078a6.678 6.678 0 0 1 1.714-1.38C17.249 7.838 18.562 7.5 20 7.5c1.438 0 2.757.337 3.92 1.002.642.361 1.22.827 1.711 1.377.767.877 1.502 1.978 1.683 4.077.051.598.064 1.204.055 1.78.052-.014.105-.026.158-.038.198-.042.4-.064.603-.064.962 0 1.756.522 2.076 1.363a2.183 2.183 0 0 1-.108 1.813c-.211.4-.548.758-1.03 1.096-.128.09-.326.219-.577.38l-.003.003c-.141.091-.35.227-.551.36a.525.525 0 0 0-.15.157c-.04.08-.042.168.013.323.13.29.287.569.468.83.636.932 1.553 1.718 2.728 2.34.06.032.12.062.179.092l.162.082c.056.026.121.06.192.1Zm-2.338 2.434c.404-.107.881-.235 1.467-.558.68-.379.294-.611.065-.725-3.871-1.871-4.488-4.765-4.516-4.983l-.003-.026c-.032-.248-.058-.447.22-.702.187-.175.815-.581 1.304-.898.23-.15.43-.279.54-.355.563-.393.81-.786.627-1.27-.128-.331-.437-.46-.766-.46-.104.001-.207.013-.307.035-.365.08-.723.22-1.027.338a4.735 4.735 0 0 1-.54.19.54.54 0 0 1-.127.017c-.186 0-.253-.082-.238-.305l.005-.074c.045-.694.127-1.964.024-3.153-.145-1.695-.692-2.535-1.342-3.278-.311-.356-1.78-1.897-4.58-1.897-2.802 0-4.266 1.548-4.578 1.905-.649.743-1.195 1.583-1.341 3.278-.098 1.132-.025 2.337.018 3.05l.01.177c.013.212-.052.305-.237.305a.55.55 0 0 1-.128-.017c-.142-.035-.327-.107-.538-.19-.304-.118-.663-.259-1.027-.338a1.425 1.425 0 0 0-.308-.034c-.327 0-.638.125-.766.46-.183.482.065.875.628 1.269.11.076.31.206.54.355.49.317 1.116.724 1.304.897.277.256.252.456.22.704l-.004.025c-.027.215-.645 3.108-4.516 4.982-.226.11-.612.343.068.718.584.321 1.06.448 1.463.555.335.088.618.163.869.325.253.163.289.429.322.675.028.21.054.405.21.513.182.126.518.139.97.156.592.023 1.383.053 2.288.352.454.15.849.392 1.264.648.812.498 1.703 1.046 3.273 1.046 1.575 0 2.476-.553 3.29-1.052.412-.253.801-.492 1.245-.639.906-.299 1.697-.33 2.288-.352.452-.017.788-.03.97-.155.156-.108.182-.304.21-.514.033-.246.068-.512.322-.675.25-.161.532-.236.865-.325Z"
          clipRule="evenodd"
        />
      </Svg>
    );
  },
  WhatsApp: ({size = 40}: IconProps) => {
    return (
      <Svg
        style={{
          height: size,
          width: size,
        }}
        fill="none"
        viewBox="0 0 48 48">
        <Circle cx={24} cy={24} r={24} fill="#24D366" />
        <Path
          fill="#fff"
          d="m13 35.109 1.555-5.677a10.934 10.934 0 0 1-1.463-5.477C13.094 17.915 18.01 13 24.051 13a10.89 10.89 0 0 1 7.752 3.213 10.89 10.89 0 0 1 3.207 7.75c-.003 6.04-4.92 10.956-10.959 10.956h-.005c-1.834 0-3.636-.46-5.236-1.334L13 35.11Z"
        />
        <Path
          fill="#24D366"
          d="M24.054 14.85c-5.025 0-9.11 4.085-9.113 9.106 0 1.72.481 3.396 1.393 4.846l.217.344-.92 3.36 3.447-.904.333.197a9.095 9.095 0 0 0 4.636 1.27h.003c5.02 0 9.107-4.085 9.108-9.106a9.05 9.05 0 0 0-2.665-6.442 9.05 9.05 0 0 0-6.44-2.67Z"
        />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M21.312 19.374c-.205-.456-.421-.465-.616-.473-.16-.007-.343-.006-.525-.006-.183 0-.48.068-.73.342-.251.274-.959.937-.959 2.284 0 1.347.982 2.649 1.118 2.832.137.182 1.895 3.035 4.678 4.133 2.313.912 2.784.73 3.286.685.502-.046 1.62-.662 1.848-1.302.228-.64.228-1.187.16-1.302-.069-.114-.251-.182-.525-.32-.274-.136-1.62-.799-1.871-.89-.251-.091-.434-.137-.616.137-.183.274-.707.89-.867 1.073-.16.183-.32.206-.594.07-.273-.138-1.155-.427-2.201-1.36-.814-.726-1.364-1.622-1.524-1.896-.16-.274-.017-.422.12-.559.123-.122.274-.32.411-.48.137-.16.183-.273.274-.456.091-.183.046-.342-.023-.48-.068-.136-.6-1.49-.844-2.032"
          clipRule="evenodd"
        />
      </Svg>
    );
  },
  Twitter: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Path
          fill="#55ACEE"
          d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
        />
        <Path
          fill="#fff"
          d="m19.401 16.256.042.692-.7-.084c-2.546-.325-4.77-1.427-6.659-3.277l-.923-.918-.238.678c-.503 1.511-.182 3.107.868 4.18.56.593.433.678-.532.325-.336-.113-.63-.198-.657-.155-.098.099.237 1.384.503 1.892.364.707 1.105 1.399 1.917 1.808l.685.325-.811.014c-.784 0-.812.014-.728.31.28.919 1.385 1.893 2.616 2.317l.868.297-.756.452a7.876 7.876 0 0 1-3.749 1.045c-.63.014-1.147.07-1.147.113 0 .141 1.707.932 2.7 1.243 2.98.918 6.52.522 9.177-1.046 1.889-1.115 3.777-3.333 4.659-5.48.475-1.143.951-3.234.951-4.236 0-.65.042-.735.825-1.512.462-.452.896-.946.98-1.087.14-.268.125-.268-.588-.028-1.189.423-1.357.367-.77-.269.434-.452.952-1.27.952-1.51 0-.043-.21.027-.448.154-.252.142-.811.353-1.23.48l-.756.24-.686-.465c-.377-.255-.91-.537-1.189-.622-.713-.197-1.805-.17-2.448.057-1.749.635-2.854 2.274-2.728 4.067Z"
        />
      </Svg>
    );
  },
  TikTok: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Path
          fill="#000"
          d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
        />
        <Path
          fill="#25F4EE"
          d="M18.123 17.875v-.778a6.157 6.157 0 0 0-.818-.058c-3.339-.005-6.055 2.714-6.055 6.06a6.059 6.059 0 0 0 2.587 4.965 6.038 6.038 0 0 1-1.627-4.128 6.065 6.065 0 0 1 5.913-6.06Z"
        />
        <Path
          fill="#25F4EE"
          d="M18.27 26.703a2.769 2.769 0 0 0 2.76-2.665l.005-13.202h2.41a4.72 4.72 0 0 1-.076-.836h-3.29l-.004 13.201a2.769 2.769 0 0 1-2.761 2.665c-.462 0-.898-.115-1.285-.32a2.748 2.748 0 0 0 2.24 1.157ZM27.948 15.317v-.734c-.92 0-1.774-.271-2.494-.743a4.574 4.574 0 0 0 2.494 1.477Z"
        />
        <Path
          fill="#FE2C55"
          d="M25.454 13.84a4.552 4.552 0 0 1-1.125-3.004h-.88a4.564 4.564 0 0 0 2.005 3.004ZM17.31 20.327a2.77 2.77 0 0 0-2.766 2.767c0 1.064.605 1.99 1.485 2.452a2.74 2.74 0 0 1-.524-1.615 2.77 2.77 0 0 1 2.765-2.768c.284 0 .56.05.818.13v-3.364a6.157 6.157 0 0 0-.818-.058c-.05 0-.094.004-.143.004v2.581a2.783 2.783 0 0 0-.818-.129Z"
        />
        <Path
          fill="#FE2C55"
          d="M27.948 15.317v2.558a7.83 7.83 0 0 1-4.58-1.472v6.696c0 3.341-2.715 6.064-6.059 6.064-1.289 0-2.49-.409-3.472-1.099A6.048 6.048 0 0 0 18.27 30a6.07 6.07 0 0 0 6.059-6.064v-6.697a7.83 7.83 0 0 0 4.579 1.473v-3.293c-.333 0-.654-.035-.96-.102Z"
        />
        <Path
          fill="#fff"
          d="M23.369 23.099v-6.696a7.83 7.83 0 0 0 4.579 1.472v-2.558a4.573 4.573 0 0 1-2.494-1.477 4.601 4.601 0 0 1-2.01-3.004h-2.41l-.004 13.202a2.769 2.769 0 0 1-2.76 2.665 2.777 2.777 0 0 1-2.245-1.152 2.778 2.778 0 0 1-1.485-2.452 2.77 2.77 0 0 1 2.765-2.768c.284 0 .56.05.818.13V17.88c-3.272.071-5.913 2.758-5.913 6.056 0 1.592.618 3.043 1.627 4.128a6.033 6.033 0 0 0 3.472 1.1c3.339 0 6.06-2.724 6.06-6.065Z"
        />
      </Svg>
    );
  },
  Telegram: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Path
          fill="#08C"
          d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Z"
        />
        <Path
          fill="#fff"
          d="M10.125 19.635c5.369-2.339 8.949-3.88 10.74-4.626 5.114-2.127 6.177-2.497 6.87-2.509.152-.002.493.035.713.214.186.152.238.356.262.5.025.142.055.469.031.724-.277 2.912-1.476 9.979-2.086 13.24-.259 1.38-.767 1.843-1.259 1.889-1.07.098-1.881-.707-2.917-1.386-1.621-1.063-2.537-1.724-4.11-2.761-1.819-1.198-.64-1.857.396-2.933.272-.282 4.984-4.568 5.075-4.956.011-.05.022-.23-.086-.326-.108-.096-.266-.063-.381-.037-.163.037-2.752 1.748-7.768 5.134-.735.505-1.4.751-1.997.738-.658-.014-1.923-.372-2.863-.677-1.153-.375-2.07-.573-1.99-1.21.041-.332.498-.67 1.37-1.018Z"
        />
      </Svg>
    );
  },
  Discord: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Circle cx={20} cy={20} r={20} fill="#5865F2" />
        <Path
          fill="#fff"
          d="M28.33 12.55A19.605 19.605 0 0 0 23.38 11c-.234.425-.446.863-.634 1.311a18.13 18.13 0 0 0-5.495 0c-.189-.448-.4-.886-.635-1.311a19.74 19.74 0 0 0-4.955 1.553C8.527 17.268 7.677 21.866 8.102 26.4a19.832 19.832 0 0 0 6.073 3.101c.491-.673.926-1.386 1.3-2.133-.71-.27-1.395-.602-2.048-.995.172-.126.34-.257.502-.384 1.9.909 3.972 1.38 6.071 1.38 2.099 0 4.172-.471 6.07-1.38.165.137.333.267.503.384-.654.393-1.34.727-2.052.997.373.746.808 1.46 1.3 2.131a19.742 19.742 0 0 0 6.077-3.099c.498-5.256-.851-9.812-3.568-13.852ZM16.013 23.611c-1.183 0-2.161-1.093-2.161-2.437 0-1.344.944-2.446 2.157-2.446 1.214 0 2.184 1.102 2.164 2.446-.021 1.344-.954 2.437-2.16 2.437Zm7.974 0c-1.186 0-2.16-1.093-2.16-2.437 0-1.344.944-2.446 2.16-2.446 1.215 0 2.178 1.102 2.157 2.446-.02 1.344-.951 2.437-2.157 2.437Z"
        />
      </Svg>
    );
  },
  More: ({size = 40}: IconProps) => {
    return (
      <Svg
        fill="none"
        style={{
          height: size,
          width: size,
        }}
        viewBox="0 0 40 40">
        <Circle cx={20} cy={20} r={20} fill="#fff" />
        <Path
          fill="#545454"
          d="M20 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm17 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
        />
      </Svg>
    );
  },
};

export default Icons;

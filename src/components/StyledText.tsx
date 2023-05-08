import {InputProps, Text, TextInput, TextProps} from './Themed';

export function RgText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, {fontFamily: 'NeueMontreal-Regular'}]}
    />
  );
}

export function MdText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, {fontFamily: 'NeueMontreal-Medium'}]}
    />
  );
}

export function BdText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, {fontFamily: 'NeueMontreal-Bold'}]} />
  );
}

export function InputRg(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'NeueMontreal-Regular'}]}
    />
  );
}

export function InputMd(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'NeueMontreal-Medium'}]}
    />
  );
}

export function InputBd(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'NeueMontreal-Bold'}]}
    />
  );
}

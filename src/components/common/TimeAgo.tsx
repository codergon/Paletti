import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import {MdText} from '../StyledText';
import {Style} from 'javascript-time-ago';
import {Text} from 'react-native';

interface TimeProps {
  date: Date;
  verboseDate?: string;
  tooltip: boolean;
  children: string;
}
interface TimeAgoProps {
  date: Date | number;
  timeStyle?: string | Style;
  textStyle?: Text['props']['style'];
}

const TimeAgo = ({
  date,
  timeStyle = 'round-minute',
  textStyle,
}: TimeAgoProps) => {
  function Time({date, verboseDate, tooltip, children}: TimeProps) {
    return <MdText style={textStyle}>{children}</MdText>;
  }

  return <ReactTimeAgo date={date} timeStyle={timeStyle} component={Time} />;
};

export default TimeAgo;

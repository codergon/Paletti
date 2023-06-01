import Loader from './Loader';
import React, {FC, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  loadingState: string;
}

export const LoadingStateSwitcher: FC<Props> = React.memo(
  ({children, loadingState}) => {
    if (loadingState === 'pending') {
      return <Loader />;
    }

    return <>{children}</>;
  },
);

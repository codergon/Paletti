import React, {FC, ReactNode} from 'react';
import {LoadingState} from '../../store/utils/LoadingState';
import Loader from './Loader';

interface Props {
  children: ReactNode;
  loadingState: LoadingState;
}

export const LoadingStateSwitcher: FC<Props> = React.memo(
  ({
    loadingState,

    children,
  }) => {
    if (loadingState === LoadingState.PENDING) {
      return (
        <>
          <Loader />
        </>
      );
    }

    return <>{children}</>;
  },
);

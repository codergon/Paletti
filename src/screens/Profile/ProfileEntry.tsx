import Profile from '.';
import {observer} from 'mobx-react-lite';
import {Fragment, useEffect, useState} from 'react';
import {useStores} from '../../store/RootStore';

type ProfileEntryProps = {
  openColorModal: () => void;
  openSignInModal: () => void;
  openNewColorModal: () => void;
};

const ProfileEntry = observer<ProfileEntryProps>(
  ({openColorModal, openSignInModal, openNewColorModal}) => {
    return (
      <Fragment>
        <Profile
          openColorModal={openColorModal}
          openSignInModal={openSignInModal}
          openNewColorModal={openNewColorModal}
        />
      </Fragment>
    );
  },
);

export default ProfileEntry;

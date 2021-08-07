import React from 'react';
import { withRouter } from 'react-router-dom';

import { getUserAvatar, getUrl } from '../../../../shared/functions';
import CoverImg from '../../../../assets/profile/Cover.png';
import { UName } from '../../../../components/Tools';
import ProfileTabs from './ProfileTabs';
import { TabWrapper } from '../style'; 
import './style.scss';

function Cover({ profile }) {
  function loadImgCover() {
    if (!!profile.cover) {
      return { backgroundImage: `url(${getUrl(profile.cover)})` };
    } else {
      return { backgroundImage: `url(${CoverImg})` };
    }
  }
  return (
    <div className='ProfileCoverWrapper'>
      <div className='ProfileCover'>
        <div className='CoverImage' style={loadImgCover() || {}}>
          <div style={{ height: 'inherit', backgroundColor: '#0005' }}>
            <div className='ProfileCoverBottom'>
              <div className='ProfileCoverUser'>
                <div className='UserImageWrapper'>
                  <img src={getUserAvatar(profile.avatar, profile.gender)} alt='' />
                </div>
                <h2 className='UserName'>
                  <UName style={{color:"black"}} name={profile.name} verified={profile.verified} width={18} />
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabWrapper>
        <ProfileTabs />
      </TabWrapper>
    </div>
  );
}
export default withRouter(Cover);

import React from 'react';

import { AngryIcon, HahaIcon, LikeIcon, LoveIcon, SadIcon, WowIcon, BoostIcon, ShareIcon, CommentIcon } from '../../../assets/reactions';
import './style.scss';

export default ({ reacts, comments, shares, boosts }) => {
  const reactions = [
    { id: 'like', icon: LikeIcon },
    { id: 'love', icon: LoveIcon },
    { id: 'wow', icon: WowIcon },
    { id: 'sad', icon: SadIcon },
    { id: 'haha', icon: HahaIcon },
    { id: 'angry', icon: AngryIcon },
  ];
  return (
    <div className='CommentIconsContainer'>
      <div className='CommentIconsWrapper'>
        {reactions.map(({ id, icon }, index) => (
          <div key={index} className='CommentIcon'>
            <img onMouseEnter={() => {}} src={icon} alt='' />
            <p>{reacts ? reacts[id] : 0}</p>
          </div>
        ))}
        <div className='CommentIcon'>
          <img src={CommentIcon} alt='img' />
          <p>{comments || 0}</p>
        </div>
        <div className='CommentIcon'>
          <img src={ShareIcon} alt='img' />
          <p>{shares || 0}</p>
        </div>
        <div className='CommentIcon'>
          <img src={BoostIcon} alt='img' />
          <p>{boosts || 0}</p>
        </div>
      </div>
    </div>
  );
};

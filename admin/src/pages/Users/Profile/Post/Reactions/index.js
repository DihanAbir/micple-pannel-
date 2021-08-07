import React from 'react';

import { AngryIcon, HahaIcon, LikeIcon, LoveIcon, SadIcon, WowIcon } from '../../../../../assets/reactions';
import CommentIcon from '../../../../../assets/reactions/Comment.png';
import './style.scss';

const reactions = [
  { id: 'like', icon: LikeIcon },
  { id: 'love', icon: LoveIcon },
  { id: 'wow', icon: WowIcon },
  { id: 'sad', icon: SadIcon },
  { id: 'haha', icon: HahaIcon },
  { id: 'angry', icon: AngryIcon },
];

export default ({ reacts, comments, setActive, active }) => {
  return (
    <div className='CommentIconsContainer'>
      <div className='CommentIconsWrapper'>
        {reactions.map(({ id, icon }, index) => (
          <div key={index} className='CommentIcon'>
            <img src={icon} alt='' />
            <p>{reacts ? reacts[id] : 0}</p>
          </div>
        ))}
        <div className='CommentIcon MsgCommentIcon'>
          <img src={CommentIcon} alt='img' onClick={() => setActive(!active)} />
          <p>{comments || 0}</p>
        </div>
      </div>
    </div>
  );
};

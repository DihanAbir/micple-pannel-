import React from 'react';

import School from './School';
import College from './College';
import University from './University';

export default ({ educations }) => {
  return (
    <>
      <h2>Education</h2>
      <School school={educations?.schools || []} />
      <College college={educations?.colleges || []} />
      <University university={educations?.universities || []} />
    </>
  );
};

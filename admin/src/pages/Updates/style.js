import { makeStyles, createStyles } from '@material-ui/core';

export const addImage = makeStyles((theme) =>
  createStyles({
    image: {
      position: 'relative',
      height: 75,
      width: 300,
      display: 'block',
      margin: '20px auto 0',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important',
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
      },
    },
    focusVisible: {},
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
  })
);

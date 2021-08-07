import React, { useState, Fragment } from 'react';
import {
  createStyles,
  makeStyles,
  Dialog,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Close, ArrowUpward, ArrowDownward, Flag, Public, Wc, Today, Schedule, AttachMoney } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

import CardImg from '../../../../assets/payment/Master.png';
import { Countries } from '../../../../shared';
import Terms from './Terms';

const useStyles = makeStyles((theme) =>
  createStyles({
    app: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      height: 'inherit',
    },
    tabs: {
      borderRight: `1px solid #d2d2d2`,
    },
    tab: {
      fontSize: '14px',
      textTransform: 'capitalize',
    },
    tabPanel: { marginTop: 20, marginLeft: 20, flex: 1, minHeight: 600 },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
    form: {
      width: '100%',
    },
    list: {
      width: '100%',
    },
    next: {
      marginTop: 30,
    },
  })
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
function TabPanel({ children, value, index, ...other }) {
  const classes = useStyles();
  return (
    <div className={classes.tabPanel} hidden={value !== index} id={index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

export default ({ open, close }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [country, setCountry] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [terms, setTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [product, setProduct] = useState(false);
  const tabItems = ['Target a Country', 'Choose Privacy', 'Target People', 'Target Age', 'Choose Duration', 'Choose Budget', 'Preview', 'Checkout'];
  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={close} TransitionComponent={Transition}>
      <AppBar className={classes.app}>
        <Toolbar>
          <IconButton edge='start' color='secondary' onClick={close} style={{ backgroundColor: '#fff' }}>
            <Close />
          </IconButton>
          <Typography variant='h4' className={classes.title}>
            Choose your preferences
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' style={{ height: 'inherit' }}>
        <div className={classes.root}>
          <Tabs orientation='vertical' variant='scrollable' value={tab} onChange={(e, t) => setTab(t)} className={classes.tabs}>
            {tabItems.map((item, i) => (
              <Tab key={i} className={classes.tab} label={item} id={i} />
            ))}
          </Tabs>
          <TabPanel value={tab} index={0}>
            {/* Country */}
            <Autocomplete
              options={Countries}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <Fragment>
                  <span>{countryToFlag(option.code)}</span>
                  {option.label}
                </Fragment>
              )}
              onChange={(e, v) => setCountry(v?.label)}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label='Target a country'
                  variant='outlined'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            {/* Privacy */}
            <FormControl variant='outlined' className={classes.form}>
              <InputLabel id='demo-simple-select-outlined-label'>Choose Privacy</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                value={privacy}
                onChange={(e, { props }) => setPrivacy(props.value)}
                label='Choose Privacy'
              >
                <MenuItem value='Public'>Public</MenuItem>
                <MenuItem value='Friends'>Friends</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            {/* People */}
            <FormControl variant='outlined' className={classes.form}>
              <InputLabel id='demo-simple-select-outlined-label'>Target Gender</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                value={gender}
                onChange={(e, { props }) => setGender(props.value)}
                label='Target Gender'
              >
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={3}>
            {/* Age */}
            <FormControl variant='outlined' className={classes.form}>
              <InputLabel id='demo-simple-select-outlined-label'>Target Age</InputLabel>
              <Select labelId='demo-simple-select-outlined-label' value={age} onChange={(e, { props }) => setAge(props.value)} label='Target Age'>
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='18 - 30'>18 - 30</MenuItem>
                <MenuItem value='31 - 40'>31 - 40</MenuItem>
                <MenuItem value='41 - 50'>41 - 50</MenuItem>
                <MenuItem value='51 - 60'>51 - 60</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={4}>
            {/* Duration */}
            <FormControl variant='outlined' className={classes.form}>
              <InputLabel id='demo-simple-select-outlined-label'>Choose Duration</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                value={duration}
                onChange={(e, { props }) => setDuration(props.value)}
                label='Choose Duration'
              >
                <MenuItem value='7 Days'>7 Days</MenuItem>
                <MenuItem value='15 Days'>15 Days</MenuItem>
                <MenuItem value='30 Days'>30 Days</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={5}>
            {/* Budget */}
            <FormControl variant='outlined' className={classes.form}>
              <InputLabel id='demo-simple-select-outlined-label'>Choose Budget</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                value={budget}
                onChange={(e, { props }) => setBudget(props.value)}
                label='Choose Budget'
              >
                <MenuItem value='$ 100'>$ 100</MenuItem>
                <MenuItem value='$ 200'>$ 200</MenuItem>
                <MenuItem value='$ 500'>$ 500</MenuItem>
                <MenuItem value='$ 1000'>$ 1000</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>

          <TabPanel value={tab} index={6}>
            {/* Preview */}
            <List className={classes.list}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Flag />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={country} secondary='Country' />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Public />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={privacy} secondary='Privacy' />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Wc />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={gender} secondary='People' />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Today />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={age} secondary='Age' />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Schedule />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={duration} secondary='Duration' />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoney />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={budget} secondary='Budget' />
              </ListItem>
            </List>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button startIcon={<ArrowUpward />} onClick={() => setTab(tab - 1)}>
                  Back
                </Button>
                <Button endIcon={<ArrowDownward />} onClick={() => setTab(tab + 1)}>
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </TabPanel>
          <TabPanel value={tab} index={7}>
            {/* Checkout */}
            <Autocomplete
              options={Countries}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <Fragment>
                  <span>{countryToFlag(option.code)}</span>
                  {option.label}
                </Fragment>
              )}
              onChange={(e, v) => setCountry(v?.code)}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label='Country/Region'
                  variant='outlined'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
            <div style={{ margin: '20px auto' }}>
              <img alt='' src={CardImg} style={{ height: 50 }} />
            </div>
            <FormControl style={{ display: 'flex', margin: '20px auto' }}>
              <TextField fullWidth label='Card number' variant='outlined' />
            </FormControl>
            <FormControl style={{ display: 'flex', margin: '20px auto', flexDirection: 'row' }}>
              <TextField fullWidth label='Expire date' variant='outlined' />
              <TextField fullWidth label='Security' variant='outlined' />
            </FormControl>
            <FormControl style={{ display: 'flex', margin: '20px auto' }}>
              <FormControlLabel
                control={<Checkbox checked={product} onChange={({ target }) => setProduct(target.checked)} color='primary' />}
                label='Check the payment method for product'
              />
            </FormControl>
            <FormControl style={{ display: 'flex', margin: '20px auto' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreed}
                    onChange={({ target }) => {
                      setAgreed(target.checked);
                      if (!agreed && !terms) {
                        setTerms(true);
                      }
                    }}
                    color='primary'
                  />
                }
                label='Terms and conditions and privacy policy'
              />
            </FormControl>
            <div className={classes.next}>
              <ButtonGroup size='large' variant='contained' color='primary'>
                <Button onClick={() => {}}>Proceed</Button>
              </ButtonGroup>
            </div>
            <Terms
              open={terms}
              close={() => {
                setTerms(false);
                setAgreed(true);
              }}
            />
          </TabPanel>
        </div>
      </Container>
    </Dialog>
  );
};

import React, { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../../shared/constants/Variables";
import { adminHeader } from "../../shared/functions/Token";
import { AuthGuard, Spinner } from "../../shared";
import { getMailInfo, getMails } from "./Hooks";
import { getUrl } from "../../shared/functions";
import { UName, HoverOver } from "../../components/Tools";
import { When } from "../../components";
import "./style.scss";

function Mails() {
  document.title = "Mails";
  const [mail, setMail] = useState(null);
  const statusStates = ["all", "unanswered", "answered"];
  const [headerHight, setHeaderHight] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("unanswered");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const counts = getMailInfo();
  const { boxes, totalMails, working, setBoxes } = getMails(
    status,
    sortBy,
    start,
    end,
    pageIndex
  );
  // console.log(boxes);
  function clearFilter() {
    setStart("");
    setEnd("");
    setSortBy("");
  }
  function deleteMail(id) {
    setMail(null);
    axios
      .delete(`${BACKEND_URL}/mails/${id}`, { headers: adminHeader() })
      .then(() => {
        setBoxes(boxes.filter((i) => i.id !== id));
      })
      .catch((e) => {
        throw e;
      });
  }
  function makeAnswered(boxId, mailId) {
    axios
      .put(
        `${BACKEND_URL}/mails/${boxId}`,
        { id: mailId },
        { headers: adminHeader() }
      )
      .then(() => {
        const updates = boxes.map((i) => {
          if (i.id === boxId) {
            i = {
              ...i,
              mails: i.mails.map((j) => {
                if (j.id === mailId) {
                  j.answered = true;
                }
                return j;
              }),
            };
          }
          return i;
        });
        setBoxes(updates);
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <div className="mails">
      <div ref={(el) => setHeaderHight(el?.clientHeight)} className="header">
        <Grid className="tabs">
          <FormControl>
            <InputLabel id="soryBy">Sort By</InputLabel>
            <Select
              labelId="soryBy"
              value={sortBy}
              onChange={(e, data) => setSortBy(data.props.value)}
            >
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="dbdt">
              <KeyboardDatePicker
                variant="inline"
                label="Start Date"
                format="dd/MM/yyyy"
                value={start || new Date()}
                minDate={new Date("02-25-2020")}
                maxDate={new Date()}
                onChange={(date) => setStart(date)}
              />
              <KeyboardDatePicker
                variant="inline"
                label="End Date"
                format="dd/MM/yyyy"
                value={end || new Date()}
                minDate={new Date("02-25-2020")}
                maxDate={new Date()}
                onChange={(date) => setEnd(date)}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={clearFilter}
          >
            Clear
          </Button>
        </Grid>
        <Paper square>
          <Tabs
            textColor="primary"
            onChange={(e, value) => setStatus(statusStates[value])}
            value={statusStates.indexOf(status)}
          >
            <Tab label={`All (${counts.total})`} />
            <Tab label={`Not Answered (${counts.unanswered})`} />
            <Tab label={`Answered (${counts.answered})`} />
          </Tabs>
        </Paper>
      </div>
      <div
        style={{ height: `calc(100vh - ${headerHight}px)`, opacity: 1 }}
        className="YhdbS"
      >
        {boxes.length > 0 && !working ? (
          <List className="mail-list">
            {boxes.map((item) => (
              <ListItem key={item.id}>
                <div className="mlleft">
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      setMail(item);
                    }}
                    className="name"
                  >
                    <UName
                      name={item?.user?.name}
                      verified={item.user.verified}
                    />{" "}
                    ({item.user.username})
                  </Link>
                  <div className="msg">
                    {item.mails[0].message?.substr(0, 32)}
                  </div>
                  <div className="msg">{` Total mail (${item.mails.length})`}</div>
                  <div className="dev">
                    {item.mails[0].agent.browser} -{" "}
                    {item.mails[0].agent.platform}
                  </div>
                  <div className="loc">
                    <a
                      target="blank"
                      href={`https://www.google.com/maps/@${item.mails[0].location.lat},${item.mails[0].location.lon}`}
                    >
                      {!!item.mails[0].location.city
                        ? `${item.mails[0].location.city}, `
                        : ""}
                      {item.mails[0].location.country} - ({item.mails[0].ip})
                    </a>
                  </div>
                  <div className="date">
                    <When date={item.mails[0].date} />
                  </div>
                </div>
                <ListItemSecondaryAction className="mlright">
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => deleteMail(item.id)}
                  >
                    Delete
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            {!working && (
              <h3 className="notfound text-center text-info">
                No mails found.
              </h3>
            )}
          </>
        )}

        {working && <Spinner height={30} />}

        {boxes.length > 10 && (
          <div className="pgntn">
            <Pagination
              color="primary"
              page={pageIndex}
              onChange={(e, page) => setPageIndex(page)}
              count={Math.round(totalMails / 10)}
            />
          </div>
        )}
      </div>
      <Dialog
        open={!!mail}
        onClose={() => setMail(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent className="mldbhr">
          <div className="left">
            <div className="name">
              
              <UName name={mail?.user?.name} verified={mail?.user?.verified} />
              <div>&#8826;{mail?.user?.username}&#8827;</div>
            </div>
            <div className="time">
              From: <When date={mail?.date} />
            </div>
          </div>
        </DialogContent>
        <DialogContent dividers>
          {mail?.mails?.map((i) => (
            <div
              style={{ borderBottom: "2px dotted green", padding: "10px 0" }}
              key={i.id}
            >
              {!!i.location?.city
                ? `${i.location?.city}, ${i.location?.country}`
                : i.location?.country}{" "}
              (<When date={i.date} />)
              <Divider />
              {!i.answered && (
                <HoverOver title="Make it answered">
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={() => makeAnswered(mail.id, i.id)}
                  >
                    Answered
                  </Button>
                </HoverOver>
              )}
              <div className="msg" style={{ margin: "15px 0" }}>
                {i?.message}
              </div>
              <div style={{ marginTop: 30 }}>
                {i?.image && (
                  <div>
                    <a href={getUrl(i?.image)} target="blank">
                      <img
                        style={{
                          maxHeight: 200,
                          order: "1px solid green",
                          padding: 2,
                          backgroundColor: "forestgreen",
                        }}
                        alt=""
                        src={getUrl(i?.image)}
                      />
                    </a>
                  </div>
                )}
                {i?.file && (
                  <div>
                    <a href={getUrl(i?.file)} target="blank">
                      File
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions className="btmbx">
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => setMail(null)}
          >
            Close
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => deleteMail(mail.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AuthGuard(Mails);
